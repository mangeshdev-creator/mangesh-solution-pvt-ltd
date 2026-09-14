import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import { sendEnrollmentEmail } from '../utils/sendEmail.js';

export const createEnrollment = async (req, res) => {
  const { name, email, phone, courseId, transactionId } = req.body;
  if (!name || !email || !phone || !courseId || !transactionId) return res.status(400).json({ message: 'Enrollment and payment details are required' });
  const course = await Course.findOne({ frontendId: Number(courseId) });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  const existingEnrollment = await Enrollment.findOne({ email: email.toLowerCase(), course: course._id });
  if (existingEnrollment) {
    return res.status(409).json({ message: 'You are already enrolled in this course' });
  }
  const enrollment = await Enrollment.create({
    name,
    email,
    phone,
    user: req.user?._id,
    course: course._id,
    status: 'pending',
    paymentStatus: 'submitted',
    transactionId: transactionId.trim(),
  });
  let emailSent = false;
  try {
    emailSent = await sendEnrollmentEmail({
      name,
      email,
      courseTitle: course.title,
      coursePrice: course.price,
      transactionId: transactionId.trim(),
    });
  } catch (error) {
    console.error('Enrollment email failed:', error.message);
  }

  res.status(201).json({ message: 'Payment details submitted for verification', emailSent, enrollment });
};

export const getEnrollments = async (_req, res) => {
  const enrollments = await Enrollment.find().populate('course', 'title price duration').sort({ createdAt: -1 });
  res.json(enrollments);
};

export const getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({
    $or: [{ user: req.user._id }, { email: req.user.email }],
  }).populate('course', 'title price duration').sort({ createdAt: -1 });

  res.json(enrollments);
};
