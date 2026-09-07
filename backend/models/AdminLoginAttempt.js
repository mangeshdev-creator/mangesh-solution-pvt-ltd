import mongoose from 'mongoose';

const adminLoginAttemptSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  successful: { type: Boolean, default: false },
  ipAddress: { type: String },
  userAgent: { type: String },
}, { timestamps: true });

export default mongoose.model('AdminLoginAttempt', adminLoginAttemptSchema);
