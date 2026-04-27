const express = require('express');
const db      = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

// GET /api/test-catalog — readable by all authenticated users (doctors need this for dropdowns)
router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, name, description, category, is_active FROM test_catalog WHERE is_active = 1 ORDER BY category, name'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
