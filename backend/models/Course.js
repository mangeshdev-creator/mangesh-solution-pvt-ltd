import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  frontendId: { type: Number, required: true, unique: true },
  icon: String,
  title: { type: String, required: true, trim: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  notes: [{
    title: { type: String, required: true, trim: true },
    publicId: { type: String, required: true },
    format: { type: String, default: 'pdf' },
    uploadedAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
