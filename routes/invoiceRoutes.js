import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { generateInvoice } from '../utils/invoiceGenerator.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// GET /api/invoice/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, `../invoices/invoice_${id}.pdf`);

  // ✅ Ensure invoices folder exists
  const invoicesDir = path.join(__dirname, '../invoices');
  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir);
  }

  generateInvoice({ invoiceId: id, name: "Test User", amount: 999 }, filePath);

  setTimeout(() => {
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(500).send("❌ Failed to generate invoice PDF");
    }
  }, 1000);
});

export default router;
