import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateInvoice = (data, path) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(path));
    doc.fontSize(20).text('GAPL Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice ID: ${data.invoiceId}`);
    doc.text(`Name: ${data.name}`);
    doc.text(`Amount: ₹${data.amount}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.end();
};
