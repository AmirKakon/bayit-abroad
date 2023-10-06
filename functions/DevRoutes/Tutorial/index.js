const { dev, logger, db } = require("../../setup");

const baseDB = "userDetails_dev";

// create -> post()
dev.post("/api/tutorial/create", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      // await is the pair of async to tell the
      // function which line to wait until completed.
      await db.collection(baseDB).doc(`/${Date.now()}/`).create({
        id: Date.now(),
        name: req.body.name,
        mobile: req.body.mobile,
      });

      return res.status(200).send({ status: "Success", msg: "Data Saved" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get -> get()
// fetch single data from firestore using specific id
dev.get("/api/tutorial/get/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      const userDetail = await reqDoc.get(); // gets doc
      const response = userDetail.data(); // the actual data of the user

      return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// fetch all user data from firestore
dev.get("/api/tutorial/getAll", (req, res) => {
  (async () => {
    try {
      const query = db.collection(baseDB);
      const response = [];

      await query.get().then((data) => {
        const docs = data.docs;

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

      return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// update -> put()
dev.put("/api/tutorial/update/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.update({
        name: req.body.name,
        mobile: req.body.mobile,
      });

      return res.status(200).send({ status: "Success", msg: "Data Updated" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// delete -> delete()
dev.delete("/api/tutorial/delete/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.delete();

      return res.status(200).send({ status: "Success", msg: "Data Deleted" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

module.exports = dev;
