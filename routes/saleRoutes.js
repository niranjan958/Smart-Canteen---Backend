const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.post('/', saleController.createSale);
router.get('/', saleController.getSales);
router.get('/:id/invoice', saleController.getInvoice);

module.exports = router;