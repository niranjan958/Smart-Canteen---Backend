const { Sale, SaleItem, Item } = require('../models');
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

exports.createSale = async (req, res) => {
  const { companyName, cart } = req.body;
  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const invoiceNo = `INV-${Date.now()}`;

  const sale = await Sale.create({ companyName, totalAmount, invoiceNo });

  for (let c of cart) {
    await SaleItem.create({
      SaleId: sale.id,
      itemName: c.name,
      quantity: c.quantity,
      price: c.price,
      subtotal: c.price * c.quantity
    });
    await Item.decrement('stock', { by: c.quantity, where: { id: c.id } });
  }

  res.json({ success: true, saleId: sale.id, invoiceNo });
};

exports.getSales = async (req, res) => {
  const sales = await Sale.findAll({
    include: SaleItem,
    order: [['createdAt', 'DESC']]
  });
  res.json(sales);
};

exports.getInvoice = async (req, res) => {
  const sale = await Sale.findByPk(req.params.id, { include: SaleItem });
  const doc = new PDFDocument();
  const stream = new PassThrough();

  const chunks = [];
  stream.on('data', chunk => chunks.push(chunk));
  stream.on('end', () => {
    res.set('Content-Type', 'application/pdf');
    res.send(Buffer.concat(chunks));
  });

  doc.pipe(stream);

  doc.fontSize(20).text('Smart Canteen Invoice', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Invoice No: ${sale.invoiceNo}`);
  doc.text(`Company: ${sale.companyName}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  let y = doc.y;
  sale.SaleItems.forEach(item => {
    doc.text(`${item.itemName} x ${item.quantity} @ ₹${item.price} = ₹${item.subtotal}`, 50, y);
    y += 20;
  });

  doc.fontSize(16).text(`Total: ₹${sale.totalAmount}`, { align: 'right' });
  doc.end();
};