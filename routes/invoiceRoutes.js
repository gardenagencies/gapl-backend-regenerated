import express from 'express';
import path from 'path';
import { generateInvoice } from '../utils/invoiceGenerator.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// GET /api/invoice/:id → generate and download a test invoice
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const filePath = path.join(__dirname, `../invoices/invoice_${id}.pdf`);
  generateInvoice({ invoiceId: id, name: "Test User", amount: 999 }, filePath);

  // Wait a moment for the file to be written before sending
  setTimeout(() => {
    res.download(filePath);
  }, 1000);
});

export default router;
