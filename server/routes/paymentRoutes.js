import express from 'express';
import { createOrder, verifyWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// POST /api/pay → creates a Razorpay order
router.post('/', createOrder);

// POST /api/pay/webhook → receives Razorpay webhook callback
router.post('/webhook', express.json({ type: 'application/json' }), verifyWebhook);

export default router;
