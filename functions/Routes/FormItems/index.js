const { app, logger, db } = require("../../setup");

// get a single item using specific id
app.get("/api/form-items/get/:id", (req, res) => {
  (async () => {
    try {
      const itemRef = db.collection("items").doc(req.params.id);
      const doc = await itemRef.get(); // gets doc
      const item = doc.data(); // the actual data of the user

      if (!item.exists) {
        logger.log("Error - No item found");
        return res.status(404).send({ status: "Failed", msg: "No item found" });
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
const preferredId = "myszTIFQHloPy7Xksgw2"; // 'entire package' id

app.get("/api/form-items/getAll", (req, res) => {
  (async () => {
    try {
      const itemsRef = db.collection("items");
      const snapshot = await itemsRef.get();

      if (snapshot.empty) {
        logger.log("No data found");
        return res.status(404).send({ status: "Failed", msg: "No data found" });
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

// get all games
const gamesId = "BhT9GsyGCCs7OsmklyJz";

app.get("/api/form-items/games/getAll", (req, res) => {
  (async () => {
    try {
      const itemsRef = db.collection("items").doc(gamesId).collection("games");
      const snapshot = await itemsRef.get();

      if (snapshot.empty) {
        logger.log("No data found");
        return res.status(404).send({ status: "Failed", msg: "No data found" });
      }

      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // logger.log("Games List", items);
      return res.status(200).send({ status: "Success", data: items });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

module.exports = app;
