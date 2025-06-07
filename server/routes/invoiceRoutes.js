import express from 'express';
import path from 'path';
import { generateInvoice } from '../utils/invoiceGenerator.js';

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const filePath = path.resolve(`invoices/invoice_${id}.pdf`);
    generateInvoice({ invoiceId: id, name: "John Doe", amount: 999 }, filePath);
    res.download(filePath);
});

export default router;
