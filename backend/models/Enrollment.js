import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'submitted', 'paid'], default: 'pending' },
  transactionId: { type: String, trim: true },
}, { timestamps: true });

export default mongoose.model('Enrollment', enrollmentSchema);
