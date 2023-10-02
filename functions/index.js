const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bayitabroad-jkak-default-rtdb.firebaseio.com",
});

const express = require("express");
const cors = require("cors");

//Main App
const app = express();
app.use(cors({ orgin: true }));

//Main database reference
const db = admin.firestore();

//Routes
app.get("/", (req, res) => {
  return res.status(200).send("Root Get Call");
});

//create -> post()
app.post("/api/create", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      //await is the pair of async to tell the function which line to wait until completed.
      await db.collection("userDetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        name: req.body.name,
        mobile: req.body.mobile,
      });

      return res.status(200).send({ status: "Sucess", msg: "Data Saved" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

//get -> get()
//fetch single data from firestore using specific id
app.get("/api/get/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(req.params.id); //reference
      let userDetail = await reqDoc.get(); //gets doc
      let response = userDetail.data(); //the actual data of the user

      return res.status(200).send({ status: "Sucess", data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

//fetch all user data from firestore
app.get("/api/getAll", (req, res) => {
  (async () => {
    try {
      const query = db.collection("userDetails");
      let response = [];

      await query.get().then((data) => {
        let docs = data.docs;

        docs.map((doc) => {
          const selectedItem = {
            id: doc.data().id,
            name: doc.data().name,
            mobile: doc.data().mobile,
          };

          response.push(selectedItem);
        });
        return response
      });

      return res.status(200).send({ status: "Sucess", data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

//update -> put()
app.put("/api/update/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(req.params.id); //reference
      await reqDoc.update({
        name:req.body.name,
        mobile: req.body.mobile,
      })

      return res.status(200).send({ status: "Sucess", msg: "Data Updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

//delete -> delete()

//exports the api to firebase functions
exports.app = functions.https.onRequest(app);
