import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email) {
    console.warn('ADMIN_EMAIL is required to configure admin access');
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.role !== 'admin') {
      existingUser.role = 'admin';
      await existingUser.save();
    }
    console.log(`Admin access configured for ${email}`);
    return;
  }

  if (!password) {
    console.warn('ADMIN_PASSWORD is required to create the primary admin account');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({
    name: 'Administrator',
    email,
    phone: '0000000000',
    password: passwordHash,
    role: 'admin',
  });
  console.log(`Admin account created for ${email}`);
};
