require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const authRoutes        = require('./routes/auth');
const patientRoutes     = require('./routes/patients');
const testRequestRoutes = require('./routes/testRequests');
const reportRoutes      = require('./routes/reports');
const adminRoutes       = require('./routes/admin');
const testCatalogRoutes = require('./routes/testCatalog');

const app  = express();
const PORT = process.env.PORT || 4000;

// CORS
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3001').split(',');
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());

// Static access to uploaded reports (protected via route handler, not static middleware)
// The /uploads folder is intentionally NOT served statically — download is gated by auth.

// Routes
app.use('/api/auth',          authRoutes);
app.use('/api/patients',      patientRoutes);
app.use('/api/test-requests', testRequestRoutes);
app.use('/api/reports',       reportRoutes);
app.use('/api/admin',         adminRoutes);
app.use('/api/test-catalog',  testCatalogRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Genolink API running on http://localhost:${PORT}`);
});
