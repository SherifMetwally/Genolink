const express = require('express');
const bcrypt  = require('bcryptjs');
const db      = require('../db');
const { authenticate } = require('../middleware/auth');
const { requireRole }  = require('../middleware/role');

const router = express.Router();
router.use(authenticate, requireRole('admin'));

// ─── Doctor Management ───────────────────────────────────────────────────────

// GET /api/admin/doctors
router.get('/doctors', async (_req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT u.id, u.name, u.email, u.role, u.is_active, u.created_at,
              d.license_number, d.specialty, d.phone
       FROM users u
       LEFT JOIN doctors d ON d.user_id = u.id
       WHERE u.role = 'doctor'
       ORDER BY u.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/doctors — create a new doctor account
router.post('/doctors', async (req, res) => {
  const { name, email, password, license_number, specialty, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email, and password are required' });
  }

  try {
    const [existing] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing[0]) return res.status(409).json({ message: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, hash, 'doctor']
    );
    await db.execute(
      'INSERT INTO doctors (user_id, license_number, specialty, phone) VALUES (?, ?, ?, ?)',
      [result.insertId, license_number || null, specialty || null, phone || null]
    );

    const [rows] = await db.execute(
      `SELECT u.id, u.name, u.email, u.role, u.is_active, u.created_at,
              d.license_number, d.specialty, d.phone
       FROM users u LEFT JOIN doctors d ON d.user_id = u.id
       WHERE u.id = ?`,
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/admin/doctors/:id — update doctor info or toggle active
router.patch('/doctors/:id', async (req, res) => {
  const { name, email, is_active, license_number, specialty, phone } = req.body;
  try {
    const [users] = await db.execute("SELECT id FROM users WHERE id = ? AND role = 'doctor'", [req.params.id]);
    if (!users[0]) return res.status(404).json({ message: 'Doctor not found' });

    if (name !== undefined || email !== undefined || is_active !== undefined) {
      const fields = [];
      const vals   = [];
      if (name      !== undefined) { fields.push('name=?');      vals.push(name); }
      if (email     !== undefined) { fields.push('email=?');     vals.push(email); }
      if (is_active !== undefined) { fields.push('is_active=?'); vals.push(is_active ? 1 : 0); }
      vals.push(req.params.id);
      await db.execute(`UPDATE users SET ${fields.join(', ')} WHERE id=?`, vals);
    }

    if (license_number !== undefined || specialty !== undefined || phone !== undefined) {
      await db.execute(
        'INSERT INTO doctors (user_id, license_number, specialty, phone) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE license_number=VALUES(license_number), specialty=VALUES(specialty), phone=VALUES(phone)',
        [req.params.id, license_number || null, specialty || null, phone || null]
      );
    }

    const [rows] = await db.execute(
      `SELECT u.id, u.name, u.email, u.role, u.is_active, u.created_at,
              d.license_number, d.specialty, d.phone
       FROM users u LEFT JOIN doctors d ON d.user_id = u.id WHERE u.id = ?`,
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── Test Catalog ────────────────────────────────────────────────────────────

// GET /api/admin/test-catalog
router.get('/test-catalog', async (_req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM test_catalog ORDER BY category, name');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/test-catalog
router.post('/test-catalog', async (req, res) => {
  const { name, description, category } = req.body;
  if (!name) return res.status(400).json({ message: 'name is required' });

  try {
    const [result] = await db.execute(
      'INSERT INTO test_catalog (name, description, category) VALUES (?, ?, ?)',
      [name, description || null, category || null]
    );
    const [rows] = await db.execute('SELECT * FROM test_catalog WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/admin/test-catalog/:id
router.patch('/test-catalog/:id', async (req, res) => {
  const { name, description, category, is_active } = req.body;
  try {
    const [existing] = await db.execute('SELECT * FROM test_catalog WHERE id = ?', [req.params.id]);
    if (!existing[0]) return res.status(404).json({ message: 'Test not found' });

    await db.execute(
      'UPDATE test_catalog SET name=?, description=?, category=?, is_active=? WHERE id=?',
      [
        name        ?? existing[0].name,
        description ?? existing[0].description,
        category    ?? existing[0].category,
        is_active   !== undefined ? (is_active ? 1 : 0) : existing[0].is_active,
        req.params.id,
      ]
    );
    const [rows] = await db.execute('SELECT * FROM test_catalog WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── Dashboard stats ─────────────────────────────────────────────────────────

// GET /api/admin/stats
router.get('/stats', async (_req, res) => {
  try {
    const [[{ total_doctors }]]  = await db.execute("SELECT COUNT(*) AS total_doctors  FROM users WHERE role='doctor' AND is_active=1");
    const [[{ total_patients }]] = await db.execute('SELECT COUNT(*) AS total_patients FROM patients');
    const [[{ total_requests }]] = await db.execute('SELECT COUNT(*) AS total_requests FROM test_requests');
    const [[{ pending }]]        = await db.execute("SELECT COUNT(*) AS pending FROM test_requests WHERE status='pending'");
    const [[{ processing }]]     = await db.execute("SELECT COUNT(*) AS processing FROM test_requests WHERE status='processing'");
    const [[{ completed }]]      = await db.execute("SELECT COUNT(*) AS completed FROM test_requests WHERE status='completed'");
    res.json({ total_doctors, total_patients, total_requests, pending, processing, completed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
