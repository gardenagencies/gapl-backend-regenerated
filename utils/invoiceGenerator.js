import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateInvoice = (data, filePath) => {
  const doc = new PDFDocument();

  // Save the PDF to a file
  doc.pipe(fs.createWriteStream(filePath));

  // Header
  doc.fontSize(20).text('GAPL Invoice', { align: 'center' });
  doc.moveDown();

  // Invoice details
  doc.fontSize(12).text(`Invoice ID: ${data.invoiceId}`);
  doc.text(`Customer Name: ${data.name}`);
  doc.text(`Amount Paid: ₹${data.amount}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  
  doc.end();
};
