import mongoose from 'mongoose';

const paymentSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  courseId: { type: Number, required: true },
  courseTitle: { type: String, required: true },
  coursePrice: { type: String, required: true },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  transactionId: { type: String, trim: true },
}, { timestamps: true });

export default mongoose.model('PaymentSession', paymentSessionSchema);
