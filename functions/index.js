const cors = require("cors")({ origin: true });

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

exports.getItem = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const itemId = req.query.itemId;
      const itemRef = db.collection("items").doc(itemId);
      const doc = await itemRef.get();
      if (!doc.exists) {
        logger.log("Error - No data found");
        res.status(404).send("No data found");
      } else {
        logger.log("Item:", doc.data());
        res.json(doc.data());
      }
    } catch (error) {
      logger.error("Error fetching item: ", error);
      res.status(500).send("Error fetching item");
    }
  });
});

const preferredId = "myszTIFQHloPy7Xksgw2"; // 'entire package' id

exports.getAllItems = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const itemsRef = db.collection("items");
      const snapshot = await itemsRef.get();

      if (snapshot.empty) {
        logger.log("No data found");
        res.status(404).send("No data found");
        return;
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

      logger.log("Item List", items);
      res.status(200).json(items);
    } catch (error) {
      logger.error("Error fetching data: ", error);
      res.status(500).send("Error fetching data");
    }
  });
});

const gamesId = "BhT9GsyGCCs7OsmklyJz";

exports.getAllGames = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const itemsRef = db.collection("items").doc(gamesId).collection("games");
      const snapshot = await itemsRef.get();

      if (snapshot.empty) {
        logger.log("No data found");
        res.status(404).send("No data found");
        return;
      }

      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      logger.log("Games List", items);
      res.status(200).json(items);
    } catch (error) {
      logger.error("Error fetching data: ", error);
      res.status(500).send("Error fetching data");
    }
  });
});
