import { Router } from 'express';
import { createEnrollment, deleteEnrollment, getEnrollments, getMyEnrollments } from '../controllers/enrollmentController.js';
import { adminOnly, protect } from '../middleware/auth.js';
const router = Router();
router.post('/', protect, createEnrollment);
router.get('/me', protect, getMyEnrollments);
router.get('/', protect, adminOnly, getEnrollments);
router.delete('/:enrollmentId', protect, adminOnly, deleteEnrollment);
export default router;
