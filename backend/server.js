import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { seedCourses } from './utils/seedCourses.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { seedAdmin } from './utils/seedAdmin.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const normalizeOrigin = (origin) => {
  try {
    return new URL(origin).origin;
  } catch {
    return origin;
  }
};
const allowedOrigins = new Set([
  ...(process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map(normalizeOrigin),
  'https://mangeshdev-creator.github.io',
  'https://mangesh-solution-pvt-ltd.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
]);

app.use(cors({
  origin: (origin, callback) => {
    const isLocalNetworkOrigin = /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?$/.test(origin || '');
    if (!origin || allowedOrigins.has(normalizeOrigin(origin)) || isLocalNetworkOrigin) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
}));
app.use(express.json());

app.get('/', (_req, res) => res.json({ message: 'Mangesh Solution API is running' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payments', paymentRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

export const initializeApp = async () => {
  await seedCourses();
  await seedAdmin();
};

if (process.env.VERCEL !== '1') {
  connectDB().then(async () => {
    await initializeApp();
    app.listen(PORT, () => console.log(`Mangesh Solution API running on http://localhost:${PORT}`));
  }).catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
}

export default app;
