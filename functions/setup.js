const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const logger = functions.logger;

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bayitabroad-jkak-default-rtdb.firebaseio.com",
});

const app = express();
app.use(cors({ orgin: true }));

const db = admin.firestore();

module.exports = { app, functions, logger, db };
