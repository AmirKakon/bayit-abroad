const { dev, logger, db } = require("../../../setup");
const { getExchangeRate } = require("../../ExchangeRates");
const { checkRequiredParams } = require("../../Utilities");

const baseDB = "form-items_dev";

const convertPrice = (price, exchangeRate) => {
  if (price !== null && price !== undefined) {
    return {
      usd: price,
      nis: Math.ceil(price * exchangeRate),
    };
  }
  return price;
};

// create a form item
dev.post("/api/form/form-items/create", async (req, res) => {
  try {
    checkRequiredParams(["name", "price", "category"], req.body);

    await db.collection(baseDB).doc().create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    });

    return res.status(200).send({ status: "Success", msg: "Item Saved" });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

// get a single item using specific id
dev.get("/api/form/form-items/get/:id", async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);

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

    item.price = convertPrice(item.price, exchangeRate);

    return res.status(200).send({ status: "Success", data: item });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
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

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Iterate through items and modify the price property
    items.forEach((item) => {
      item.price = convertPrice(item.price, exchangeRate);
    });

    // Group items by category
    const groupedItems = items.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    // Sort items within each category by name
    Object.keys(groupedItems).forEach((category) => {
      groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    // Send the mutated items as a response
    return res.status(200).send({ status: "Success", data: groupedItems });
  } catch (error) {
    console.error("Function error:", error);
    return res.status(500).send({ status: "Failed", msg: error.message });
  }
});

// update item
dev.put("/api/form/form-items/update/:id", async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);
    checkRequiredParams(["name", "price", "category"], req.body);

    const reqDoc = db.collection(baseDB).doc(req.params.id);
    await reqDoc.update({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    });

    return res.status(200).send({ status: "Success", msg: "Item Updated" });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

// delete item
dev.delete("/api/form/form-items/delete/:id", async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);

    const reqDoc = db.collection(baseDB).doc(req.params.id);
    await reqDoc.delete();

    return res.status(200).send({ status: "Success", msg: "Item Deleted" });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

module.exports = { dev };
