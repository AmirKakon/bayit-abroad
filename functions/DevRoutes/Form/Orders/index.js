const { dev, logger, db, admin, functions } = require("../../../setup");
const nodemailer = require("nodemailer");

const baseDB = "orders_dev";

const gmailEmail = "bayitabroad@gmail.com";
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const adjustDate = (date) => {
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(
    adjustedDate.getMinutes() -
    adjustedDate.getTimezoneOffset(),
  );

  logger.log(date);
  logger.log(adjustedDate);
  return adjustedDate;
};

const getTimestamps = (dateRange) => {
  // Convert the Date object to a Firebase Timestamp
  const fbDeliveryDate =
    admin.firestore.Timestamp.fromDate(adjustDate(dateRange.delivery));

  // Convert the Date object to a Firebase Timestamp
  const fbPickupDate = admin.firestore.Timestamp
    .fromDate(adjustDate(dateRange.pickup));

  // Convert the timestamp string to a JavaScript Date object
  const updated = new Date();
  // Convert the Date object to a Firebase Timestamp
  const fbUpdated = admin.firestore.Timestamp.fromDate(updated);

  return { delivery: fbDeliveryDate, pickup: fbPickupDate, updated: fbUpdated };
};

// create an order
dev.post("/api/form/orders/create", async (req, res) => {
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
      selectedItems: req.body.selectedItems,
      totalPrice: req.body.totalPrice,
      lastUpdated: timestamps.updated,
      created: timestamps.updated,
    };

    // Get a reference to a new document with an auto-generated ID
    const orderRef = db.collection(baseDB).doc();

    // Set the data of the document using the obtained reference
    await orderRef.set(order);

    let totalAmount = 0;

    const selectedItemsList = order.selectedItems
      .map((item) => {
        totalAmount += item.amount;
        return `<li>
          <b><u>${item.name}</u></b>
          <b>Price:</b> $${item.price.usd} / ₪${item.price.nis}
          <b>Amount:</b> ${item.amount}
          </li>`;
      })
      .join("");

    const orderHtml = `
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="left" style="background-color: #2c3c30; padding: 10px">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bayitabroad-jkak.appspot.com/o/logo%2Fbayit-abroad-logo.png?alt=media&token=ca798017-62a0-4190-a1e9-eedaba78f18d"
              alt="BayitAbroad Logo"
              width="100"
              height="100"
              align="left"
              style="vertical-align: middle"
            />
            <h1
              height="100"
              style="color: #c49f79; margin-left: 10px; padding-top: 15px"
            >
              BayitAbroad New Order
            </h1>
          </td>
        </tr>
      </table>

      <table
        width="100%"
        cellspacing="0"
        cellpadding="5"
        style="border: 1px solid #ddd; border-collapse: collapse"
      >
        <tr>
          <td colspan="2" style="background-color: #f2f2f2; padding: 10px">
            <strong>Information</strong>
          </td>
        </tr>
        <tr>
          <td width="30%"><strong>Order Id:</strong></td>
          <td>${orderRef.id}</td>
        </tr>
        <tr>
          <td><strong>Name:</strong></td>
          <td>${order.fullName}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>${order.email}</td>
        </tr>
        <tr>
          <td><strong>Phone:</strong></td>
          <td>${order.phone}</td>
        </tr>
        <tr>
          <td><strong>Delivery Address:</strong></td>
          <td>${order.deliveryAddress}</td>
        </tr>
        <tr>
          <td><strong>Delivery on:</strong></td>
          <td>${order.deliveryDate.toDate().toISOString()}</td>
        </tr>
        <tr>
          <td><strong>Pickup on:</strong></td>
          <td>${order.pickupDate.toDate().toISOString()}</td>
        </tr>

        <tr>
          <td colspan="2" style="background-color: #f2f2f2; padding: 10px">
            <strong>Selected Items</strong>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              ${selectedItemsList}
            </ul>
          </td>
        </tr>
        <!-- Add more item-related rows as needed -->

        <tr>
          <td colspan="2" style="background-color: #f2f2f2; padding: 10px">
            <strong>Additional Notes</strong>
          </td>
        </tr>
        <tr>
          <td colspan="2">${order.notes}</td>
        </tr>
      </table>

      <table
        width="100%"
        cellspacing="0"
        cellpadding="5"
        style="border: 1px solid #ddd; border-collapse: collapse"
      >
        <tr>
          <td colspan="3" style="background-color: #f2f2f2; padding: 10px">
            <strong>Summary</strong>
          </td>
        </tr>
        <tr>
          <td width="30%"><strong>Total:</strong></td>
          <td>$${order.totalPrice.usd} / ₪${order.totalPrice.nis}</td>
        </tr>
        <tr>
          <td width="30%"><strong>Total Amount of Items:</strong></td>
          <td>${totalAmount}</td>
        </tr>
        <tr>
          <td 
            colspan="1" style="background-color: #f2f2f2; padding: 10px"
          >
            <strong>Last Updated:</strong>
          </td>
          <td style="background-color: #f2f2f2">
            ${order.lastUpdated.toDate()}
          </td>
        </tr>
      </table>

    `;

    const mailOptions = {
      from: "orders@bayitabroad.com",
      to: gmailEmail,
      subject: `New Order Placed! Order Id: ${orderRef.id}`,
      html: `${orderHtml}`,
    };

    try {
      await transporter.sendMail(mailOptions);
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
        selectedItems: req.body.selectedItems,
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
