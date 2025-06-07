import razorpay from '../utils/razorpay.js';
import crypto from 'crypto';

export const createOrder = async (req, res) => {
  const { amount, currency = "INR", receipt = "txn_" + Date.now() } = req.body;

  const options = {
    amount: amount * 100, // Razorpay expects paise
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(201).json(order);
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

export const verifyWebhook = (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const shasum = crypto.createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  const isValid = shasum === req.headers["x-razorpay-signature"];

  if (isValid) {
    console.log("✅ Verified payment from Razorpay webhook:", req.body);
    // TODO: Save payment to DB, trigger invoice, notify user
    res.status(200).json({ status: "ok" });
  } else {
    console.warn("❌ Invalid Razorpay webhook signature");
    res.status(400).json({ status: "invalid signature" });
  }
};
