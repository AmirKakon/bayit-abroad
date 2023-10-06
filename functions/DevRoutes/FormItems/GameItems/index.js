const { dev, logger, db } = require("../../../setup");

const baseDB = "form-items_dev";
const gamesDB = "games";
const gamesId = "1tRC1jxs6fRXCA69eIal";

// create a game item
dev.post("/api/form-items/games/create", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      await db
        .collection(baseDB)
        .doc(gamesId)
        .collection(gamesDB)
        .doc()
        .create({
          name: req.body.name,
          price: {
            nis: req.body.price.nis,
            usd: req.body.price.usd,
          },
        });

      return res.status(200).send({ status: "Success", msg: "Game Saved" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get a single game item using specific id
dev.get("/api/form-items/get/:id", (req, res) => {
  (async () => {
    try {
      const itemRef = db
        .collection(baseDB)
        .doc(gamesId)
        .collection(gamesDB)
        .doc(req.params.id);
      const doc = await itemRef.get();
      const item = doc.data();

      if (!item.exists) {
        logger.error(`Error - No game found with id: ${req.params.id}`);
        return res.status(404).send({
          status: "Failed",
          msg: `No game found with id: ${req.params.id}`,
        });
      }

      // logger.log("Item:", item);
      return res.status(200).send({ status: "Success", data: item });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get all games
dev.get("/api/form-items/games/getAll", (req, res) => {
  (async () => {
    try {
      const itemsRef = db.collection(baseDB).doc(gamesId).collection(gamesDB);
      const snapshot = await itemsRef.get();

      if (snapshot.empty) {
        logger.error("No games found");
        return res
          .status(404)
          .send({ status: "Failed", msg: "No games found" });
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

// update game
dev.put("/api/form-items/games/update/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db
        .collection(baseDB)
        .doc(gamesId)
        .collection(gamesDB)
        .doc(req.params.id);
      await reqDoc.update({
        name: req.body.name,
        price: {
          nis: req.body.price.nis,
          usd: req.body.price.usd,
        },
      });

      return res.status(200).send({ status: "Success", msg: "Game Updated" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// delete game
dev.delete("/api/form-items/games/delete/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db
        .collection(baseDB)
        .doc(gamesId)
        .collection(gamesDB)
        .doc(req.params.id);
      await reqDoc.delete();

      return res.status(200).send({ status: "Success", msg: "Game Deleted" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

module.exports = dev;
