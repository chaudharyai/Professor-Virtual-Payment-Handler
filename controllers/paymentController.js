const paypal = require('../utils/paypalClient');

const createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: 'Amount and currency are required.' });
  }

  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: currency, value: amount } }]
    });

    const order = await paypal.client.execute(request);
    res.json({ status: 'success', orderID: order.result.id });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Failed to create order. Please try again.' });
  }
};

const capturePayment = async (req, res) => {
  const { orderID } = req.body;

  if (!orderID) {
    return res.status(400).json({ error: 'Order ID is required.' });
  }

  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const capture = await paypal.client.execute(request);

    if (capture.result.status === 'COMPLETED') {
      res.json({ status: 'success', details: capture.result });
    } else {
      res.status(400).json({ status: 'failure', details: capture.result });
    }
  } catch (error) {
    console.error('Error capturing payment:', error.message);
    res.status(500).json({ error: 'Failed to capture payment. Please try again.' });
  }
};

module.exports = { createOrder, capturePayment };
