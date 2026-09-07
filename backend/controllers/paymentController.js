import crypto from 'node:crypto';
import Course from '../models/Course.js';
import PaymentSession from '../models/PaymentSession.js';

export const createPaymentSession = async (req, res) => {
  const { name, email, phone, courseId } = req.body;
  if (!name || !email || !phone || !courseId) {
    return res.status(400).json({ message: 'Payment details are required' });
  }

  const course = await Course.findOne({ frontendId: Number(courseId) });
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const session = await PaymentSession.create({
    sessionId: crypto.randomUUID(),
    name,
    email,
    phone,
    courseId: Number(courseId),
    courseTitle: course.title,
    coursePrice: course.price,
  });

  res.status(201).json({ sessionId: session.sessionId, courseTitle: course.title, coursePrice: course.price });
};

export const getPaymentSession = async (req, res) => {
  const session = await PaymentSession.findOne({ sessionId: req.params.sessionId });
  if (!session) return res.status(404).json({ message: 'Payment session not found' });
  res.json(session);
};

export const confirmPaymentSession = async (req, res) => {
  const session = await PaymentSession.findOne({ sessionId: req.params.sessionId });
  if (!session) return res.status(404).json({ message: 'Payment session not found' });

  if (session.status !== 'paid') {
    session.status = 'paid';
    session.transactionId = `DEMO-${Date.now()}`;
    await session.save();
  }

  res.json({ status: session.status, transactionId: session.transactionId });
};
