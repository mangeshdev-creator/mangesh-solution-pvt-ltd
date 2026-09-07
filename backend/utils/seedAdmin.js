import User from '../models/User.js';

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  await User.findOneAndUpdate(
    { email },
    { $set: { role: 'admin' } },
    { new: true },
  );

  console.log(`Admin access configured for ${email}`);
};
