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
