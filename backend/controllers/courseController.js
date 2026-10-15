import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import { v2 as cloudinary } from 'cloudinary';
import { randomUUID } from 'node:crypto';

const configureCloudinary = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return false;
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  return true;
};

export const getCourses = async (_req, res) => res.json(await Course.find().select('-notes').sort({ frontendId: 1 }));

export const getCourse = async (req, res) => {
  const course = await Course.findOne({ frontendId: Number(req.params.id) }).select('-notes');
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

export const createCourse = async (req, res) => {
  const { title, duration, level, description } = req.body;
  if (![title, duration, level, description].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ message: 'Course title, duration, level, and description are required' });
  }

  const latestCourse = await Course.findOne().sort({ frontendId: -1 }).select('frontendId');
  const course = await Course.create({
    frontendId: (latestCourse?.frontendId || 0) + 1,
    icon: '📘',
    title: title.trim(),
    duration: duration.trim(),
    level: level.trim(),
    price: 0,
    description: description.trim(),
  });
  res.status(201).json(course);
};

export const createNoteUploadSignature = async (_req, res) => {
  if (!configureCloudinary()) {
    return res.status(503).json({ message: 'Course notes storage is not configured. Set the Cloudinary environment variables.' });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = `mangesh-solution/course-notes/${randomUUID()}.pdf`;
  const params = { public_id: publicId, timestamp, type: 'authenticated' };
  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);
  res.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    ...params,
    signature,
  });
};

export const addCourseNote = async (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  const publicId = typeof req.body.publicId === 'string' ? req.body.publicId : '';
  const expectedPrefix = 'mangesh-solution/course-notes/';
  if (!title || !publicId.startsWith(expectedPrefix) || !publicId.endsWith('.pdf')) {
    return res.status(400).json({ message: 'A note title and a valid uploaded PDF are required' });
  }
  if (!configureCloudinary()) {
    return res.status(503).json({ message: 'Course notes storage is not configured. Set the Cloudinary environment variables.' });
  }

  const course = await Course.findOne({ frontendId: Number(req.params.id) });
  if (!course) return res.status(404).json({ message: 'Course not found' });

  try {
    const asset = await cloudinary.api.resource(publicId, { resource_type: 'raw', type: 'authenticated' });
    if (asset.format !== 'pdf') {
      return res.status(400).json({ message: 'Only PDF course notes are supported' });
    }
  } catch (error) {
    console.error('Cloudinary note verification failed:', error.message);
    const assetNotFound = error.http_code === 404;
    return res.status(assetNotFound ? 400 : 502).json({
      message: assetNotFound
        ? 'Uploaded PDF could not be verified. Please upload it again.'
        : 'Course notes storage could not verify the upload. Please try again.',
    });
  }

  course.notes.push({ title, publicId, format: 'pdf' });
  await course.save();
  res.status(201).json(course);
};

export const getCourseNoteDownload = async (req, res) => {
  const course = await Course.findOne({ frontendId: Number(req.params.id) });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  const enrollment = await Enrollment.findOne({
    course: course._id,
    status: 'confirmed',
    $or: [{ user: req.user._id }, { email: req.user.email }],
  });
  if (!enrollment) return res.status(403).json({ message: 'Enroll in this course to access its notes' });

  const note = course.notes.id(req.params.noteId);
  if (!note) return res.status(404).json({ message: 'Course note not found' });
  if (!configureCloudinary()) {
    return res.status(503).json({ message: 'Course notes storage is not configured' });
  }

  const url = cloudinary.url(note.publicId, {
    resource_type: 'raw',
    type: 'authenticated',
    sign_url: true,
    secure: true,
  });
  res.json({ url });
};
