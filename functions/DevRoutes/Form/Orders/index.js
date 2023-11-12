const { dev, logger, db, admin } = require("../../../setup");

const baseDB = "orders_dev";

// create an order
dev.post("/api/form/orders/create", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      // Convert the timestamp string to a JavaScript Date object
      const deliveryDate = new Date(req.body.deliveryDate);
      // Convert the Date object to a Firebase Timestamp
      const fbDeliveryDate = admin.firestore.Timestamp.fromDate(deliveryDate);

      // Convert the timestamp string to a JavaScript Date object
      const pickupDate = new Date(req.body.pickupDate);
      // Convert the Date object to a Firebase Timestamp
      const fbPickupDate = admin.firestore.Timestamp.fromDate(pickupDate);

      // Convert the timestamp string to a JavaScript Date object
      const timestamp = new Date(req.body.timestamp);
      // Convert the Date object to a Firebase Timestamp
      const fbTimestamp = admin.firestore.Timestamp.fromDate(timestamp);

      await db.collection(baseDB).doc().create({
        fullName: req.body.fullName,
        notes: req.body.notes,
        deliveryDate: fbDeliveryDate,
        pickupDate: fbPickupDate,
        deliveryAddress: req.body.deliveryAddress,
        email: req.body.email,
        phone: req.body.phone,
        selectedItems: [],
        timestamp: fbTimestamp,
      });

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
      // Convert the timestamp string to a JavaScript Date object
      const deliveryDate = new Date(req.body.deliveryDate);
      // Convert the Date object to a Firebase Timestamp
      const fbDeliveryDate = admin.firestore.Timestamp.fromDate(deliveryDate);

      // Convert the timestamp string to a JavaScript Date object
      const pickupDate = new Date(req.body.pickupDate);
      // Convert the Date object to a Firebase Timestamp
      const fbPickupDate = admin.firestore.Timestamp.fromDate(pickupDate);

      // Convert the timestamp string to a JavaScript Date object
      const timestamp = new Date(req.body.timestamp);
      // Convert the Date object to a Firebase Timestamp
      const fbTimestamp = admin.firestore.Timestamp.fromDate(timestamp);

      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.update({
        fullName: req.body.fullName,
        notes: req.body.notes,
        deliveryDate: fbDeliveryDate,
        pickupDate: fbPickupDate,
        deliveryAddress: req.body.deliveryAddress,
        email: req.body.email,
        phone: req.body.phone,
        selectedItems: [],
        timestamp: fbTimestamp,
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
