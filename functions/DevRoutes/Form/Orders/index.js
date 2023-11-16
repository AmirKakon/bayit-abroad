const { dev, logger, db, admin } = require("../../../setup");
const nodemailer = require("nodemailer");

const baseDB = "orders_dev";

const gamesId = "1tRC1jxs6fRXCA69eIal";

const gmailEmail = "bayitabroad@gmail.com";
const gmailPassword = "azja uaxq usfp tmif";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const getTimestamps = (dateRange) => {
  // Convert the timestamp string to a JavaScript Date object
  const deliveryDate = new Date(dateRange.delivery);
  // Convert the Date object to a Firebase Timestamp
  const fbDeliveryDate = admin.firestore.Timestamp.fromDate(deliveryDate);

  // Convert the timestamp string to a JavaScript Date object
  const pickupDate = new Date(dateRange.pickup);
  // Convert the Date object to a Firebase Timestamp
  const fbPickupDate = admin.firestore.Timestamp.fromDate(pickupDate);

  // Convert the timestamp string to a JavaScript Date object
  const updated = new Date();
  // Convert the Date object to a Firebase Timestamp
  const fbUpdated = admin.firestore.Timestamp.fromDate(updated);

  return { delivery: fbDeliveryDate, pickup: fbPickupDate, updated: fbUpdated };
};

const getSelectedItems = (items) => {
  const itemsMap = [];
  items.forEach((item) => {
    if (item.id === gamesId) {
      item.games.forEach((game) => {
        itemsMap.push(`${game.name}: $${game.price.usd}`);
      });
    } else {
      itemsMap.push(`${item.name} : $${item.price.usd}`);
    }
  });
  console.log(itemsMap);
  return itemsMap;
};

// create an order
dev.post("/api/form/orders/create", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const timestamps = getTimestamps(req.body.dateRange);

      const order = {
        fullName: req.body.fullName,
        notes: req.body.additionalNotes,
        deliveryDate: timestamps.delivery,
        pickupDate: timestamps.pickup,
        deliveryAddress: req.body.deliveryAddress,
        email: req.body.email,
        phone: req.body.phoneNumber,
        selectedItems: getSelectedItems(req.body.selectedItems),
        totalPrice: req.body.totalPrice,
        lastUpdated: timestamps.updated,
        created: timestamps.updated,
      };

      const selectedItemsList = order.selectedItems
        .map((item) => `<li>${item}</li>`)
        .join("");

      const orderHtml = `
        <p><strong>Name:</strong> ${order.fullName}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.deliveryAddress}</p>
        <p><strong>Delivery on:</strong> ${order.deliveryDate.toDate()}</p>
        <p><strong>Pickup on:</strong> ${order.pickupDate.toDate()}</p>
        <p><strong>Selected items:</strong></p>
        <ul>${selectedItemsList}</ul>
        <p><strong>Total:</strong> $${order.totalPrice.usd}</p>
      `;

      await db.collection(baseDB).doc().create(order);

      const mailOptions = {
        from: "orders@bayitabroad.com",
        to: gmailEmail,
        subject: "New Order Placed",
        html: `<p>A new order was placed.</p>${orderHtml}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        logger.log("Email notification sent successfully.");
      } catch (error) {
        logger.error("Error sending email:", error);
      }

      return res.status(200).send({ status: "Success", msg: "Order Saved" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get a single order using specific id
dev.get("/api/form/orders/get/:id", (req, res) => {
  (async () => {
    try {
      const orderRef = db.collection(baseDB).doc(req.params.id);
      const doc = await orderRef.get(); // gets doc
      const order = doc.data(); // the actual data of the order

      if (!order) {
        logger.error(`Error - No order found with id: ${req.params.id}`);
        return res.status(404).send({
          status: "Failed",
          msg: `No order found with id: ${req.params.id}`,
        });
      }

      return res.status(200).send({ status: "Success", data: order });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get all orders
dev.get("/api/form/orders/getAll", (req, res) => {
  (async () => {
    try {
      const ordersRef = db.collection(baseDB);
      const snapshot = await ordersRef.get();

      if (snapshot.empty) {
        logger.error("No orders found");
        return res
          .status(404)
          .send({ status: "Failed", msg: "No orders found" });
      }

      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).send({ status: "Success", data: orders });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// update order
dev.put("/api/form/orders/update/:id", (req, res) => {
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
        notes: req.body.additionalNotes,
        deliveryDate: timestamps.delivery,
        pickupDate: timestamps.pickup,
        deliveryAddress: req.body.deliveryAddress,
        email: req.body.email,
        phone: req.body.phoneNumber,
        selectedItems: [],
        lastUpdated: timestamps.updated,
      });

      return res.status(200).send({ status: "Success", msg: "Order Updated" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// delete order
dev.delete("/api/form/orders/delete/:id", (req, res) => {
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

module.exports = dev;
