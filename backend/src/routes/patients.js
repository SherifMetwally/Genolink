const express = require('express');
const db      = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

// GET /api/patients
// Doctors see their own patients; admins see all
router.get('/', async (req, res) => {
  try {
    let rows;
    if (req.user.role === 'admin') {
      [rows] = await db.execute(
        `SELECT p.*, u.name AS doctor_name
         FROM patients p
         JOIN users u ON u.id = p.doctor_id
         ORDER BY p.created_at DESC`
      );
    } else {
      [rows] = await db.execute(
        'SELECT * FROM patients WHERE doctor_id = ? ORDER BY created_at DESC',
        [req.user.id]
      );
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/patients/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    const patient = rows[0];
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (req.user.role !== 'admin' && patient.doctor_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/patients
router.post('/', async (req, res) => {
  if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const { first_name, last_name, dob, gender, contact_email, contact_phone, notes } = req.body;
  if (!first_name || !last_name) {
    return res.status(400).json({ message: 'first_name and last_name are required' });
  }

  try {
    const doctorId = req.user.role === 'admin' ? (req.body.doctor_id || req.user.id) : req.user.id;
    const [result] = await db.execute(
      `INSERT INTO patients (doctor_id, first_name, last_name, dob, gender, contact_email, contact_phone, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [doctorId, first_name, last_name, dob || null, gender || null, contact_email || null, contact_phone || null, notes || null]
    );
    const [rows] = await db.execute('SELECT * FROM patients WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/patients/:id
router.put('/:id', async (req, res) => {
  try {
    const [existing] = await db.execute('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    const patient = existing[0];
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (req.user.role !== 'admin' && patient.doctor_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { first_name, last_name, dob, gender, contact_email, contact_phone, notes } = req.body;
    await db.execute(
      `UPDATE patients SET first_name=?, last_name=?, dob=?, gender=?, contact_email=?, contact_phone=?, notes=?
       WHERE id=?`,
      [
        first_name   || patient.first_name,
        last_name    || patient.last_name,
        dob          ?? patient.dob,
        gender       ?? patient.gender,
        contact_email  ?? patient.contact_email,
        contact_phone  ?? patient.contact_phone,
        notes          ?? patient.notes,
        req.params.id,
      ]
    );
    const [rows] = await db.execute('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/patients/:id (admin only)
router.delete('/:id', async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    await db.execute('DELETE FROM patients WHERE id = ?', [req.params.id]);
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
