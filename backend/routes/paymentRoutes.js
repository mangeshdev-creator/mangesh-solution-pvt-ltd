import { Router } from 'express';
import { confirmPaymentSession, createPaymentSession, getPaymentSession } from '../controllers/paymentController.js';

const router = Router();
router.post('/session', createPaymentSession);
router.get('/:sessionId', getPaymentSession);
router.post('/:sessionId/confirm', confirmPaymentSession);

export default router;
