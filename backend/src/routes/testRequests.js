const express = require('express');
const db      = require('../db');
const { authenticate } = require('../middleware/auth');
const { requireRole }  = require('../middleware/role');

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
    res.json(req_row);
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

// PATCH /api/test-requests/:id/status — admin updates status
router.patch('/:id/status', requireRole('admin'), async (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  try {
    const [existing] = await db.execute('SELECT id FROM test_requests WHERE id = ?', [req.params.id]);
    if (!existing[0]) return res.status(404).json({ message: 'Test request not found' });

    await db.execute('UPDATE test_requests SET status = ? WHERE id = ?', [status, req.params.id]);
    const [rows] = await db.execute('SELECT * FROM test_requests WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
