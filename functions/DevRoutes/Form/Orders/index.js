const dayjs = require("dayjs");
const { dev, logger, db, admin, functions } = require("../../../setup");
const nodemailer = require("nodemailer");

const baseDB = "orders_dev";

const gmailEmail = "bayitabroad@gmail.com";
const gmailPassword = functions.config().gmail.password;
const bayitAbroadLogoUrl =
  "https://firebasestorage.googleapis.com/v0/b/bayitabroad-jkak.appspot.com/o/logo%2Fbayit-abroad-logo.png?alt=media&token=ca798017-62a0-4190-a1e9-eedaba78f18d";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const setDateString = (date) => {
  const d = dayjs(date);
  const formatedD = d.format("ddd MMM D YYYY");
  return formatedD;
};

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

// create an order
dev.post("/api/form/orders/create", async (req, res) => {
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
    };

    // Get a reference to a new document with an auto-generated ID
    const orderRef = db.collection(baseDB).doc();

    // Set the data of the document using the obtained reference
    await orderRef.set(order).then(() => {
      url = `${req.body.currentURL}/orders/${orderRef.id}/thankyou`;
    });

    let totalQuantity = 0;
    const subtotal = {
      usd: order.totalPrice.usd * order.weeks,
      nis: order.totalPrice.nis * order.weeks,
    };

    const selectedItemsList = order.selectedItems
      .map((item) => {
        totalQuantity += item.quantity;
        return `<tr style="border: 1px solid #ddd;">
          <td style="padding-left: 10px">${item.name}</td>
          <td style="text-align: center">&#36;${item.price.usd}</td>
          <td style="text-align: center">&#8362;${item.price.nis}</td>
          <td style="text-align: center">${item.quantity}</td>
          <td style="text-align: center">
          &#36;${item.price.usd * item.quantity}
          </td>
          <td style="text-align: center">
          &#8362;${item.price.nis * item.quantity}
          </td>
        </tr>`;
      })
      .join("");

    const orderHtml = `
    <table width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="left" style="background-color: #2c3c30; padding: 10px">
        <img src="${bayitAbroadLogoUrl}"
        alt="BayitAbroad Logo"
        width="100"
        height="100"
        align="left"
        style="vertical-align: middle">
        <h1 style="color: #c49f79; margin-left: 10px; padding-top: 15px"
        >BayitAbroad New Order</h1>
      </td>
    </tr>
  </table>
  
  <!-- Information Table -->
  <table
  width="100%"
  cellspacing="0"
  cellpadding="5"
  style="border: 1px solid #ddd; border-collapse: collapse">
    <tr>
      <td colspan="2" style="background-color: #f2f2f2; padding: 10px">
        <strong>Information</strong>
      </td>
    </tr>
    <tr>
      <td width="30%"><strong>Tracking Number:</strong></td>
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
      <td>${setDateString(order.deliveryDate.toDate())}</td>
    </tr>
    <tr>
      <td><strong>Return on:</strong></td>
      <td>${setDateString(order.returnDate.toDate())}</td>
    </tr>
  </table>
  
  <!-- Items Table -->
  <table
  width="100%"
  cellspacing="0"
  cellpadding="5"
  style="border: 1px solid #ddd; border-collapse: collapse">
    <tr>
      <td style="background-color: #f2f2f2; padding: 10px">
        <strong>Items</strong>
      </td>
      <td colspan="2" style="background-color: #f2f2f2; text-align: center">
        <strong>Price per Item</strong>
      </td>
      <td style="background-color: #f2f2f2; text-align: center">
        <strong>Quantity</strong>
      </td>
      <td colspan="2" style="background-color: #f2f2f2; text-align: center">
        <strong>Total</strong>
      </td>
    </tr>
    ${selectedItemsList}
    <tr style"border: 1px solid #ddd;">
      <td colspan="4"><strong>Total per Week:</strong></td>
      <td style="text-align: center">
      <strong>&#36;${order.totalPrice.usd}</strong>
      </td>
      <td style="text-align: center">
      <strong>&#8362;${order.totalPrice.nis}</strong>
      </td>
    </tr>
    <tr style"border: 1px solid #ddd;">
      <td colspan="3"></td>
      <td colspan="3"><strong>x${order.weeks} Weeks</strong></td>
    </tr>
    <tr style"border: 1px solid #ddd;">
      <td colspan="3"><strong>Subtotal:</strong></td>
      <td style="text-align: center"><strong>${totalQuantity}</strong></td>
      <td style="text-align: center"><strong>&#36;${subtotal.usd}</strong></td>
      <td style="text-align: center">
      <strong>&#8362;${subtotal.nis}</strong>
      </td>
    </tr>
    <tr style"border: 1px solid #ddd;">
      <td colspan="6" style="background-color: #f2f2f2; padding: 10px">
        <strong>Additional Notes</strong>
      </td>
    </tr>
    <tr>
      <td colspan="6">${order.additionalNotes}</td>
    </tr>
    <tr>
      <td style="background-color: #f2f2f2; padding: 10px">
        <strong>Last Updated:</strong>
      </td>
      <td colspan="5" style="background-color: #f2f2f2">
      ${order.lastUpdated.toDate()}
      </td>
    </tr>
  </table>
  
  <!-- Additional Notes -->
  <br />
  <br />
  <p>&#42; Please note that delivery is only in Jerusalem. Drop off
  is dependent on our availability and your preference.
  <br />
  &#42; Payment will be available after confirmation of the order
  by our team. Payment options include cash, bit, or PayPal.
  </p>
  <br />
  <a href="${url}" style="
  display: block;
  padding: 10px;
  background-color: #2c3c30;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  margin: 10px auto;
  width: 100%;
  max-width: 300px;">View Order</a>
    `;

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
      await transporter.sendMail(internalMailOptions);
      await transporter.sendMail(externalMailOptions);
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
        additionalNotes: req.body.additionalNotes,
        deliveryDate: timestamps.delivery,
        returnDate: timestamps.return,
        deliveryAddress: req.body.deliveryAddress,
        email: req.body.email,
        phone: req.body.phone,
        selectedItems: req.body.selectedItems,
        lastUpdated: timestamps.updated,
        weeks: req.body.weeks,
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
