const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const logger = functions.logger;

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bayitabroad-jkak-default-rtdb.firebaseio.com",
});

const app = express();
const dev = express();

// Apply the CORS middleware to both app and dev
app.use(cors({ orgin: true }));
dev.use(cors({ orgin: true }));

const db = admin.firestore();
const dbDev = admin.firestore("develop")

module.exports = { app, dev, functions, logger, db, dbDev };
