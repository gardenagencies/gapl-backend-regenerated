import razorpay from '../utils/razorpay.js';
import crypto from 'crypto';

export const createOrder = async (req, res) => {
    const { amount, currency = "INR", receipt } = req.body;
    const options = {
        amount: amount * 100,
        currency,
        receipt,
    };
    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: "Razorpay order creation failed", error: err });
    }
};

export const verifyWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac("sha256", secret)
        .update(JSON.stringify(req.body))
        .digest("hex");

    if (shasum === req.headers["x-razorpay-signature"]) {
        console.log("✅ Verified payment:", req.body);
        // TODO: Save payment & trigger invoice logic
        res.status(200).json({ status: "ok" });
    } else {
        res.status(400).json({ status: "invalid signature" });
    }
};
