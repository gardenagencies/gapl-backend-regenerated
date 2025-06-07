import express from 'express';
import { createOrder, verifyWebhook } from '../controllers/paymentController.js';
const router = express.Router();

router.post('/', createOrder);
router.post('/webhook', express.json({ type: 'application/json' }), verifyWebhook);

export default router;
