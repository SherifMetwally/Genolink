const express = require('express');
const db      = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

const VALID_STATUSES = ['pending', 'processing', 'completed', 'cancelled'];

// GET /api/test-requests
router.get('/', async (req, res) => {
  try {
    let rows;
    const baseQuery = `
      SELECT tr.*,
             p.first_name, p.last_name,
             tc.name AS test_name, tc.category,
             u.name  AS doctor_name
      FROM test_requests tr
      JOIN patients    p  ON p.id  = tr.patient_id
      JOIN test_catalog tc ON tc.id = tr.test_id
      JOIN users       u  ON u.id  = tr.doctor_id
    `;
    if (req.user.role === 'admin') {
      [rows] = await db.execute(baseQuery + ' ORDER BY tr.created_at DESC');
    } else {
      [rows] = await db.execute(
        baseQuery + ' WHERE tr.doctor_id = ? ORDER BY tr.created_at DESC',
        [req.user.id]
      );
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/test-requests/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT tr.*,
              p.first_name, p.last_name,
              tc.name AS test_name, tc.category, tc.description AS test_description,
              u.name  AS doctor_name,
              r.id    AS report_id, r.original_name AS report_file
       FROM test_requests tr
       JOIN patients     p  ON p.id   = tr.patient_id
       JOIN test_catalog tc  ON tc.id  = tr.test_id
       JOIN users        u  ON u.id   = tr.doctor_id
       LEFT JOIN reports r  ON r.test_request_id = tr.id
       WHERE tr.id = ?`,
      [req.params.id]
    );
    const req_row = rows[0];
    if (!req_row) return res.status(404).json({ message: 'Test request not found' });
    if (req.user.role !== 'admin' && req_row.doctor_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const [statusNotes] = await db.execute(
      `SELECT sn.id, sn.status, sn.note, sn.created_at, u.name AS created_by_name, u.role AS created_by_role
       FROM status_notes sn
       JOIN users u ON u.id = sn.created_by
       WHERE sn.test_request_id = ?
       ORDER BY sn.created_at DESC`,
      [req.params.id]
    );

    res.json({ ...req_row, status_notes: statusNotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/test-requests/:id/notes — list status notes for a request
router.get('/:id/notes', async (req, res) => {
  try {
    const [existing] = await db.execute('SELECT id, doctor_id FROM test_requests WHERE id = ?', [req.params.id]);
    const tr = existing[0];
    if (!tr) return res.status(404).json({ message: 'Test request not found' });
    if (req.user.role !== 'admin' && tr.doctor_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const [rows] = await db.execute(
      `SELECT sn.id, sn.status, sn.note, sn.created_at, u.name AS created_by_name, u.role AS created_by_role
       FROM status_notes sn
       JOIN users u ON u.id = sn.created_by
       WHERE sn.test_request_id = ?
       ORDER BY sn.created_at DESC`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/test-requests — doctor submits a request
router.post('/', async (req, res) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ message: 'Only doctors can submit test requests' });
  }
  const { patient_id, test_id, notes } = req.body;
  if (!patient_id || !test_id) {
    return res.status(400).json({ message: 'patient_id and test_id are required' });
  }

  try {
    // Verify patient belongs to this doctor
    const [patients] = await db.execute(
      'SELECT id FROM patients WHERE id = ? AND doctor_id = ?',
      [patient_id, req.user.id]
    );
    if (!patients[0]) return res.status(403).json({ message: 'Patient not found or access denied' });

    // Verify test exists and is active
    const [tests] = await db.execute(
      'SELECT id FROM test_catalog WHERE id = ? AND is_active = 1',
      [test_id]
    );
    if (!tests[0]) return res.status(400).json({ message: 'Test not found or inactive' });

    const [result] = await db.execute(
      'INSERT INTO test_requests (patient_id, doctor_id, test_id, notes) VALUES (?, ?, ?, ?)',
      [patient_id, req.user.id, test_id, notes || null]
    );
    const [rows] = await db.execute('SELECT * FROM test_requests WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/test-requests/:id/status — admin or owning doctor updates status
// Optional body.note is stored as a status note (multiple notes allowed per request)
router.patch('/:id/status', async (req, res) => {
  const { status, note } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  try {
    const [existing] = await db.execute(
      'SELECT id, doctor_id, status AS current_status FROM test_requests WHERE id = ?',
      [req.params.id]
    );
    const tr = existing[0];
    if (!tr) return res.status(404).json({ message: 'Test request not found' });

    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.role === 'doctor' && tr.doctor_id === req.user.id;
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await db.execute('UPDATE test_requests SET status = ? WHERE id = ?', [status, req.params.id]);

    // Always record a status-change history row; note text is optional
    const noteText = typeof note === 'string' ? note.trim() : '';
    await db.execute(
      'INSERT INTO status_notes (test_request_id, status, note, created_by) VALUES (?, ?, ?, ?)',
      [req.params.id, status, noteText || null, req.user.id]
    );

    const [rows] = await db.execute('SELECT * FROM test_requests WHERE id = ?', [req.params.id]);
    const [statusNotes] = await db.execute(
      `SELECT sn.id, sn.status, sn.note, sn.created_at, u.name AS created_by_name, u.role AS created_by_role
       FROM status_notes sn
       JOIN users u ON u.id = sn.created_by
       WHERE sn.test_request_id = ?
       ORDER BY sn.created_at DESC`,
      [req.params.id]
    );

    res.json({ ...rows[0], status_notes: statusNotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/test-requests/:id/notes — add an optional note without changing status
router.post('/:id/notes', async (req, res) => {
  const noteText = typeof req.body.note === 'string' ? req.body.note.trim() : '';
  if (!noteText) {
    return res.status(400).json({ message: 'note is required when adding without a status change' });
  }

  try {
    const [existing] = await db.execute(
      'SELECT id, doctor_id, status FROM test_requests WHERE id = ?',
      [req.params.id]
    );
    const tr = existing[0];
    if (!tr) return res.status(404).json({ message: 'Test request not found' });

    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.role === 'doctor' && tr.doctor_id === req.user.id;
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const [result] = await db.execute(
      'INSERT INTO status_notes (test_request_id, status, note, created_by) VALUES (?, ?, ?, ?)',
      [req.params.id, tr.status, noteText, req.user.id]
    );

    const [rows] = await db.execute(
      `SELECT sn.id, sn.status, sn.note, sn.created_at, u.name AS created_by_name, u.role AS created_by_role
       FROM status_notes sn
       JOIN users u ON u.id = sn.created_by
       WHERE sn.id = ?`,
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
