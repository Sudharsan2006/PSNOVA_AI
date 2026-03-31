require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const setupSwagger = require('./swagger');

// ── Routes ────────────────────────────────────────────────────────────
const teamRoutes    = require('./routes/team');
const contactRoutes = require('./routes/contact');
const chatRoutes    = require('./routes/chat');
const statsRoutes   = require('./routes/stats');

// ── App ───────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ── Database ──────────────────────────────────────────────────────────
connectDB();

// ── Security Middleware ───────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://teamai.vercel.app',
  'https://psnovaai.sudharsanrv.dev',
];

// Also allow any Vercel preview deployment URL (*.vercel.app)
const vercelPreviewRegex = /^https:\/\/[\w-]+\.vercel\.app$/;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (vercelPreviewRegex.test(origin)) return callback(null, true);
      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

// ── General Rate Limiter ──────────────────────────────────────────────
app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests. Try again later.' },
  })
);

// ── Body Parser ───────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Logger ────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ── Health Check ──────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ── API Routes ────────────────────────────────────────────────────────
app.use('/api/team',    teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat',    chatRoutes);
app.use('/api/stats',   statsRoutes);

// ── Swagger Docs ──────────────────────────────────────────────────────
setupSwagger(app);

// ── 404 Handler ───────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

// ── Global Error Handler ──────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message,
  });
});

// ── Start ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║        🚀 Team AI Backend Server         ║
╠══════════════════════════════════════════╣
║  ● Server  : http://localhost:${PORT}       ║
║  ● Env     : ${(process.env.NODE_ENV || 'development').padEnd(28)}║
║  ● Docs    : http://localhost:${PORT}/api/docs║
╚══════════════════════════════════════════╝
  `);
});

module.exports = app;
