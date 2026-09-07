import Course from '../models/Course.js';

export const getCourses = async (_req, res) => res.json(await Course.find().sort({ frontendId: 1 }));
export const getCourse = async (req, res) => {
  const course = await Course.findOne({ frontendId: Number(req.params.id) });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};
