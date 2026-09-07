import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/contactController.js';
import { adminOnly, protect } from '../middleware/auth.js';
const router = Router();
router.post('/', createMessage);
router.get('/', protect, adminOnly, getMessages);
export default router;
