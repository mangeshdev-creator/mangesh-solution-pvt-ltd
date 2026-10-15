import { Router } from 'express';
import {
  addCourseNote,
  createCourse,
  createNoteUploadSignature,
  getCourse,
  getCourseNoteDownload,
  getCourses,
} from '../controllers/courseController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = Router();
router.get('/', getCourses);
router.post('/', protect, adminOnly, createCourse);
router.post('/notes/upload-signature', protect, adminOnly, createNoteUploadSignature);
router.get('/:id/notes/:noteId/download-url', protect, getCourseNoteDownload);
router.post('/:id/notes', protect, adminOnly, addCourseNote);
router.get('/:id', getCourse);
export default router;
