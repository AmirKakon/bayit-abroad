const dayjs = require("dayjs");
const { app, logger, db, admin, functions } = require("../../setup");
const nodemailer = require("nodemailer");
const getOrderEmailTemplate = require("./orderEmailTemplate");

const baseDB = "orders";

const gmailEmail = "bayitabroad@gmail.com";
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const getTimestamps = (dateRange) => {
  // Convert the Date object to a Firebase Timestamp
  const fbDeliveryDate = admin.firestore.Timestamp.fromDate(
    new Date(dateRange.delivery),
  );

  // Convert the Date object to a Firebase Timestamp
  const fbReturnDate = admin.firestore.Timestamp.fromDate(
    new Date(dateRange.return),
  );

  // Convert the Date object to a Firebase Timestamp
  const fbUpdated = admin.firestore.Timestamp.now();

  return { delivery: fbDeliveryDate, return: fbReturnDate, updated: fbUpdated };
};

const setOrder = (doc) => {
  const order = {
    id: doc.id,
    ...doc.data(),
  };

  // Perform data manipulation for each order
  order.dateRange = {
    delivery: dayjs.unix(order.deliveryDate._seconds).format("ddd MMM D YYYY"),
    return: dayjs.unix(order.returnDate._seconds).format("ddd MMM D YYYY"),
  };

  // Remove unnecessary properties
  delete order.deliveryDate;
  delete order.returnDate;

  return order;
};

// create an order
app.post("/api/orders/create", async (req, res) => {
  try {
    let url = "";
    const timestamps = getTimestamps(req.body.dateRange);

    const order = {
      fullName: req.body.fullName,
      additionalNotes: req.body.additionalNotes,
      deliveryDate: timestamps.delivery,
      returnDate: timestamps.return,
      deliveryAddress: req.body.deliveryAddress,
      email: req.body.email,
      phone: req.body.phone,
      selectedItems: req.body.selectedItems,
      totalPrice: req.body.totalPrice,
      lastUpdated: timestamps.updated,
      created: timestamps.updated,
      weeks: req.body.weeks,
      status: req.body.status,
    };

    // Get a reference to a new document with an auto-generated ID
    const orderRef = db.collection(baseDB).doc();

    // Set the data of the document using the obtained reference
    await orderRef.set(order).then(() => {
      url = `${req.body.baseUrl}/orders/${orderRef.id}/thankyou?first=false`;
    });
    const subtotal = {
      usd: order.totalPrice.usd * order.weeks,
      nis: order.totalPrice.nis * order.weeks,
    };

    const fullOrder = {
      id: orderRef.id,
      subtotal,
      totalQuantity: 0,
      ...order,
    };

    const orderHtml = getOrderEmailTemplate(fullOrder, url);

    const internalMailOptions = {
      from: "orders@bayitabroad.com",
      to: gmailEmail,
      subject: `New Order Placed! Tracking Number: ${orderRef.id}`,
      html: `${orderHtml}`,
    };

    const externalMailOptions = {
      from: gmailEmail,
      to: order.email,
      subject: `New Order Placed! Tracking Number: ${orderRef.id}`,
      html: `${orderHtml}`,
    };

    try {
      await Promise.all([
        transporter.sendMail(internalMailOptions),
        transporter.sendMail(externalMailOptions),
      ]);
      logger.log("Email notification sent successfully.");
    } catch (error) {
      logger.error("Error sending email:", error);
    }

    // Return the ID of the created document in the response
    return res
      .status(200)
      .send({ status: "Success", msg: "Order Saved", orderId: orderRef.id });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

// get a single order using specific id
app.get("/api/orders/get/:id", async (req, res) => {
  try {
    const orderRef = db.collection(baseDB).doc(req.params.id);
    const doc = await orderRef.get();

    if (!doc.exists) {
      logger.error(`Error - No order found with id: ${req.params.id}`);
      return res.status(404).send({
        status: "Failed",
        msg: `No order found with id: ${req.params.id}`,
      });
    }

    const order = setOrder(doc);

    return res.status(200).send({ status: "Success", data: order });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

// get all orders
app.get("/api/orders/getAll", async (req, res) => {
  try {
    const ordersRef = db.collection(baseDB);
    const snapshot = await ordersRef.get();

    if (snapshot.empty) {
      logger.error("No orders found");
      return res.status(404).send({ status: "Failed", msg: "No orders found" });
    }

    const orders = snapshot.docs.map((doc) => {
      const order = setOrder(doc);
      return order;
    });

    return res.status(200).send({ status: "Success", data: orders });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

// update order
app.put("/api/orders/update/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const timestamps = getTimestamps(req.body.dateRange);

      const reqDoc = db.collection(baseDB).doc(req.params.id);

      if (!reqDoc) {
        logger.error(`Error - No order found with id: ${req.params.id}`);
        return res.status(404).send({
          status: "Failed",
          msg: `No order found with id: ${req.params.id}`,
        });
      }

      await reqDoc.update({
        fullName: req.body.fullName,
        additionalNotes: req.body.additionalNotes,
        deliveryDate: timestamps.delivery,
        returnDate: timestamps.return,
        deliveryAddress: req.body.deliveryAddress,
        email: req.body.email,
        phone: req.body.phone,
        selectedItems: req.body.selectedItems,
        lastUpdated: timestamps.updated,
        weeks: req.body.weeks,
        status: req.body.status,
      });

      return res.status(200).send({ status: "Success", msg: "Order Updated" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// delete order
app.delete("/api/orders/delete/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.delete();

      return res.status(200).send({ status: "Success", msg: "Order Deleted" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

module.exports = { app };
