import { Router } from 'express';
import { createPayment, getPaymentStatus, paymentCallback } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.post('/create', protect, createPayment);
router.get('/:orderId/status', protect, getPaymentStatus);
router.post('/callback', paymentCallback);

export default router;
