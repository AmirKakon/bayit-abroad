const { dev, logger, db } = require("../../../setup");
const { getExchangeRate } = require("../../ExchangeRates");

const baseDB = "form-items_dev";
const gamesDB = "games";
const gamesId = "1tRC1jxs6fRXCA69eIal";

// create a game item
dev.post("/api/form/game-items/create", (req, res) => {
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
          price: req.body.price,
        });

      return res.status(200).send({ status: "Success", msg: "Game Saved" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get a single game item using specific id
dev.get("/api/form/game-items/get/:id", (req, res) => {
  (async () => {
    try {
      // Fetch the exchange rate
      const exchangeRate = await getExchangeRate();

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

      // update price
      if (item.price) {
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

// get all games
dev.get("/api/form/game-items/getAll", (req, res) => {
  (async () => {
    try {
      // Fetch the exchange rate
      const exchangeRate = await getExchangeRate();

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

      // Iterate through items and modify the price property
      items.forEach((item) => {
        if (item.price) {
          item.price = {
            usd: item.price,
            nis: Math.ceil(item.price * exchangeRate),
          };
        }
      });

      // logger.log("Games List", items);
      return res.status(200).send({ status: "Success", data: items });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// update game
dev.put("/api/form/game-items/update/:id", (req, res) => {
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
        price: req.body.price,
      });

      return res.status(200).send({ status: "Success", msg: "Game Updated" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// delete game
dev.delete("/api/form/game-items/delete/:id", (req, res) => {
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
