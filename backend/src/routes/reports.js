const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const db      = require('../db');
const { authenticate } = require('../middleware/auth');
const { requireRole }  = require('../middleware/role');

const router = express.Router();
router.use(authenticate);

// Multer — store PDFs in uploads/ with a unique filename
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, '../../uploads');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') return cb(null, true);
    cb(new Error('Only PDF files are allowed'));
  },
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});

// GET /api/reports — list reports visible to the current user
router.get('/', async (req, res) => {
  try {
    let rows;
    if (req.user.role === 'admin') {
      [rows] = await db.execute(
        `SELECT r.*, tr.patient_id, p.first_name, p.last_name,
                tc.name AS test_name, u.name AS doctor_name,
                uploader.name AS uploaded_by_name
         FROM reports r
         JOIN test_requests tr ON tr.id  = r.test_request_id
         JOIN patients      p  ON p.id   = tr.patient_id
         JOIN test_catalog  tc ON tc.id  = tr.test_id
         JOIN users         u  ON u.id   = tr.doctor_id
         JOIN users         uploader ON uploader.id = r.uploaded_by
         ORDER BY r.uploaded_at DESC`
      );
    } else {
      [rows] = await db.execute(
        `SELECT r.*, tr.patient_id, p.first_name, p.last_name,
                tc.name AS test_name
         FROM reports r
         JOIN test_requests tr ON tr.id  = r.test_request_id
         JOIN patients      p  ON p.id   = tr.patient_id
         JOIN test_catalog  tc ON tc.id  = tr.test_id
         WHERE tr.doctor_id = ?
         ORDER BY r.uploaded_at DESC`,
        [req.user.id]
      );
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/reports/:testRequestId — admin uploads a PDF report
router.post('/:testRequestId', requireRole('admin'), upload.single('report'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const { testRequestId } = req.params;
  try {
    // Verify test request exists
    const [trRows] = await db.execute('SELECT id FROM test_requests WHERE id = ?', [testRequestId]);
    if (!trRows[0]) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Test request not found' });
    }

    // Upsert: replace existing report if one already exists
    const [existing] = await db.execute(
      'SELECT id, file_path FROM reports WHERE test_request_id = ?',
      [testRequestId]
    );
    if (existing[0]) {
      try { fs.unlinkSync(path.join(__dirname, '../../uploads', path.basename(existing[0].file_path))); } catch (_) {}
      await db.execute(
        'UPDATE reports SET file_path=?, original_name=?, uploaded_by=?, uploaded_at=NOW() WHERE id=?',
        [req.file.filename, req.file.originalname, req.user.id, existing[0].id]
      );
    } else {
      await db.execute(
        'INSERT INTO reports (test_request_id, file_path, original_name, uploaded_by) VALUES (?, ?, ?, ?)',
        [testRequestId, req.file.filename, req.file.originalname, req.user.id]
      );
      // Auto-set request status to completed
      await db.execute(
        "UPDATE test_requests SET status='completed' WHERE id=?",
        [testRequestId]
      );
    }

    const [rows] = await db.execute(
      'SELECT * FROM reports WHERE test_request_id = ?',
      [testRequestId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    if (req.file) try { fs.unlinkSync(req.file.path); } catch (_) {}
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reports/:id/download — authenticated PDF download
router.get('/:id/download', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT r.*, tr.doctor_id FROM reports r
       JOIN test_requests tr ON tr.id = r.test_request_id
       WHERE r.id = ?`,
      [req.params.id]
    );
    const report = rows[0];
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (req.user.role !== 'admin' && report.doctor_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const filePath = path.join(__dirname, '../../uploads', report.file_path);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found on disk' });

    res.setHeader('Content-Disposition', `attachment; filename="${report.original_name || report.file_path}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.sendFile(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
