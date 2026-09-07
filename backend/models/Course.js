import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  frontendId: { type: Number, required: true, unique: true },
  icon: String,
  title: { type: String, required: true, trim: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
