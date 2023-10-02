const { app, db } = require("../../setup");

//create -> post()
app.post("/api/tutorial/create", (req, res) => {
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
app.get("/api/tutorial/get/:id", (req, res) => {
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
app.get("/api/tutorial/getAll", (req, res) => {
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
        return response;
      });

      return res.status(200).send({ status: "Sucess", data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

//update -> put()
app.put("/api/tutorial/update/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(req.params.id); //reference
      await reqDoc.update({
        name: req.body.name,
        mobile: req.body.mobile,
      });

      return res.status(200).send({ status: "Sucess", msg: "Data Updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

//delete -> delete()
app.delete("/api/tutorial/delete/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(req.params.id); //reference
      await reqDoc.delete();

      return res.status(200).send({ status: "Sucess", msg: "Data Deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

module.exports = app;