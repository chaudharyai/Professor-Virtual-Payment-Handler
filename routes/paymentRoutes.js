const express = require('express');
const { createOrder, capturePayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/capture-payment', capturePayment);

module.exports = router;
