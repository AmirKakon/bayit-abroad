const { dev, logger, db } = require("../../../setup");
const { getExchangeRate } = require("../../ExchangeRates");

const baseDB = "form-items_dev";
const preferredId = "XkfGiR95lXrZveSxToMl"; // 'entire package' id

// create a form item
dev.post("/api/form/form-items/create", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      await db.collection(baseDB).doc().create({
        name: req.body.name,
        price: req.body.price,
      });

      return res.status(200).send({ status: "Success", msg: "Item Saved" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get a single item using specific id
dev.get("/api/form/form-items/get/:id", (req, res) => {
  (async () => {
    try {
      // Fetch the exchange rate
      const exchangeRate = await getExchangeRate();

      const itemRef = db.collection(baseDB).doc(req.params.id);
      const doc = await itemRef.get(); // gets doc
      const item = doc.data(); // the actual data of the item

      if (!item) {
        logger.error(`Error - No item found with id: ${req.params.id}`);
        return res.status(404).send({
          status: "Failed",
          msg: `No item found with id: ${req.params.id}`,
        });
      }

      // update price
      if (item.price !== null && item.price !== undefined) {
        item.price = {
          usd: item.price,
          nis: Math.ceil(item.price * exchangeRate),
        };
      }

      return res.status(200).send({ status: "Success", data: item });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

dev.get("/api/form/form-items/getAll", async (req, res) => {
  try {
    // Fetch the exchange rate
    const exchangeRate = await getExchangeRate();

    const itemsRef = db.collection(baseDB);
    const snapshot = await itemsRef.get();

    if (snapshot.empty) {
      logger.error("No items found");
      return res.status(404).send({ status: "Failed", msg: "No items found" });
    }

    let items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Iterate through items and modify the price property
    items.forEach((item) => {
      if (item.price !== null && item.price !== undefined) {
        item.price = {
          usd: item.price,
          nis: Math.ceil(item.price * exchangeRate),
        };
      }
    });

    const preferredItem = items.find((item) => item.id === preferredId);
    if (preferredItem) {
      items = items.filter((item) => item.id !== preferredId);
      items.unshift(preferredItem);
    }

    // Send the mutated items as a response
    return res.status(200).send({ status: "Success", data: items });
  } catch (error) {
    console.error("Function error:", error);
    return res.status(500).send({ status: "Failed", msg: error.message });
  }
});

// update item
dev.put("/api/form/form-items/update/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.update({
        name: req.body.name,
        price: req.body.price,
      });

      return res.status(200).send({ status: "Success", msg: "Item Updated" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// delete item
dev.delete("/api/form/form-items/delete/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.delete();

      return res.status(200).send({ status: "Success", msg: "Item Deleted" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

module.exports = dev;
