import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateInvoice = (data, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text('GAPL Invoice', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice ID: ${data.invoiceId}`);
    doc.text(`Customer Name: ${data.name}`);
    doc.text(`Amount Paid: ₹${data.amount}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);

    doc.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });
};
