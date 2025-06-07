import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { generateInvoice } from '../utils/invoiceGenerator.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// GET /api/invoice/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, `../invoices/invoice_${id}.pdf`);

  generateInvoice({ invoiceId: id, name: "Test User", amount: 999 }, filePath);

  // delay to ensure file is written before sending
  setTimeout(() => {
    res.download(filePath);
  }, 1000);
});

export default router;
