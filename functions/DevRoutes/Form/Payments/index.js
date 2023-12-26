const { dev, logger, functions } = require("../../../setup");
const stripeKey = functions.config().stripe.secretkey;
const stripe = require("stripe")(stripeKey);

// Route to create a payment intent
dev.post("/api/form/payment", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to confirm the payment
dev.post("/confirm-payment", async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    res.json({ paymentIntent });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = dev;
