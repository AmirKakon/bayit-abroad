const { dev, logger, db } = require("../../setup");

const baseDB = "form-items_dev";
const preferredId = "XkfGiR95lXrZveSxToMl"; // 'entire package' id
const gamesId = "1tRC1jxs6fRXCA69eIal";

//create a form item
dev.post("/api/form-items/create", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      await db
        .collection(baseDB)
        .doc()
        .create({
          name: req.body.name,
          price: {
            nis: req.body.price.nis,
            usd: req.body.price.usd,
          },
        });

      return res.status(200).send({ status: "Success", msg: "Item Saved" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get a single item using specific id
dev.get("/api/form-items/get/:id", (req, res) => {
  (async () => {
    try {
      const itemRef = db.collection(baseDB).doc(req.params.id);
      const doc = await itemRef.get(); // gets doc
      const item = doc.data(); // the actual data of the item

      if (!item.exists) {
        logger.error(`Error - No item found with id: ${req.params.id}`);
        return res.status(404).send({ status: "Failed", msg: `No item found with id: ${req.params.id}` });
      }

      // logger.log("Item:", item);
      return res.status(200).send({ status: "Success", data: item });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get all items
dev.get("/api/form-items/getAll", (req, res) => {
  (async () => {
    try {
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

      const preferredItem = items.find((item) => item.id === preferredId);
      if (preferredItem) {
        items = items.filter((item) => item.id !== preferredId);
        items.unshift(preferredItem);
      }

      // logger.log("Item List", items);
      return res.status(200).send({ status: "Success", data: items });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

//update item
dev.put("/api/form-items/update/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.update({
        name: req.body.name,
        price: {
          nis: req.body.price.nis,
          usd: req.body.price.usd,
        },
      });

      return res.status(200).send({ status: "Success", msg: "Item Updated" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// delete item
dev.delete("/api/form-items/delete/:id", (req, res) => {
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
