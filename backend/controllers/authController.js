import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AdminLoginAttempt from '../models/AdminLoginAttempt.js';
import { sendAdminLoginAlert, sendPasswordResetEmail, sendWelcomeEmail } from '../utils/sendEmail.js';

const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  if (!name || !email || !phone || !password || !confirmPassword) return res.status(400).json({ message: 'All fields are required' });
  if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(409).json({ message: 'Email is already registered' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, phone, password: passwordHash });
  let emailSent = false;
  try {
    emailSent = await sendWelcomeEmail({ name: user.name, email: user.email });
  } catch (error) {
    console.error('Welcome email failed:', error.message);
  }

  res.status(201).json({ token: tokenFor(user._id), emailSent, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const user = await User.findOne({ email: email.toLowerCase() });
  const isAdminLoginAttempt = req.headers['x-admin-login'] === 'true';
  const passwordMatches = user ? await bcrypt.compare(password, user.password) : false;
  const successful = Boolean(user && passwordMatches && user.role === 'admin' && !user.blocked);

  if (isAdminLoginAttempt) {
    await AdminLoginAttempt.create({
      email: email.toLowerCase(),
      successful,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });
    sendAdminLoginAlert({ email, successful, ipAddress: req.ip }).catch((error) => {
      console.error('Admin login alert failed:', error.message);
    });
  }

  if (!user || !passwordMatches) return res.status(401).json({ message: 'Invalid email or password' });
  if (user.blocked) return res.status(403).json({ message: 'Your account has been blocked by an administrator' });
  res.json({ token: tokenFor(user._id), user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
};

export const me = async (req, res) => res.json({ user: req.user });

export const listUsers = async (_req, res) => {
  const users = await User.find().select('name email phone role blocked createdAt').sort({ createdAt: -1 });
  res.json(users);
};

export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  if (!['student', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
  const primaryAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const targetUser = await User.findById(req.params.userId);
  if (!targetUser) return res.status(404).json({ message: 'User not found' });
  if (targetUser.email === primaryAdminEmail) return res.status(400).json({ message: 'Primary admin cannot be changed' });

  const user = await User.findByIdAndUpdate(req.params.userId, { role }, { new: true })
    .select('name email phone role blocked createdAt');
  res.json(user);
};

export const updateUserBlockStatus = async (req, res) => {
  const { blocked } = req.body;
  if (typeof blocked !== 'boolean') return res.status(400).json({ message: 'Invalid blocked status' });
  const primaryAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const targetUser = await User.findById(req.params.userId);
  if (!targetUser) return res.status(404).json({ message: 'User not found' });
  if (targetUser.email === primaryAdminEmail) return res.status(400).json({ message: 'Primary admin cannot be blocked' });

  const user = await User.findByIdAndUpdate(req.params.userId, { blocked }, { new: true })
    .select('name email phone role blocked createdAt');
  res.json(user);
};

export const listAdminLoginAttempts = async (_req, res) => {
  const attempts = await AdminLoginAttempt.find().sort({ createdAt: -1 }).limit(50);
  res.json(attempts);
};

export const requestPasswordReset = async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  const genericMessage = 'If an account exists for this email, a password reset link has been sent.';
  if (!email) return res.status(200).json({ message: genericMessage });

  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ message: genericMessage });

  const rawToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';
  try {
    await sendPasswordResetEmail({
      name: user.name,
      email: user.email,
      resetUrl: `${frontendUrl}/reset-password/${rawToken}`,
    });
  } catch (error) {
    console.error('Password reset email failed:', error.message);
  }

  res.json({ message: genericMessage });
};

export const resetPassword = async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) return res.status(400).json({ message: 'Reset link is invalid or expired' });

  const { password, confirmPassword } = req.body;
  if (!password || password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
  if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ message: 'Password reset successful' });
};
