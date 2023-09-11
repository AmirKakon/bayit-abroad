// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

exports.getItem = onRequest(async (req, res) => {
  const itemId = req.query.itemId;
  const itemRef = db.collection("items").doc(itemId);

  const doc = await itemRef.get();
  if (!doc.exists) {
    logger.log("Error - No data found");
  } else {
    logger.log("Document:", doc.data());
  }
  // Send back a message that we've successfully written the message
  res.json(doc.data());
});

exports.getAllItems = onRequest(async (req, res) => {
  try {
    const itemsRef = db.collection("items");
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

    res.status(200).json(items);
  } catch (error) {
    logger.error("Error fetching data: ", error);
    res.status(500).send("Error fetching data");
  }
});
