const { getAuth } = require("firebase-admin/auth");
const { app, logger } = require("../../setup");
const { checkRequiredParams } = require("../Utilities");

// const baseDB = "users";

// sign up a user
app.post("/api/user/signupViaEmail", async (req, res) => {
  try {
    checkRequiredParams(["name", "email", "password"], req.body);

    const user = await getAuth().createUser({
      displayName: req.body.name,
      email: req.body.email,
      emailVerified: false,
      password: req.body.password,
    });

    return res
      .status(200)
      .send({ status: "Success", msg: "Sign Up Successful", userId: user.uid });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

// get a user by id
app.get("/api/user/get/:id", async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);

    const user = await getAuth().getUser(req.params.id);

    if (!user) {
      logger.error(`Error - No user found with id: ${req.params.id}`);
      return res.status(404).send({
        status: "Failed",
        msg: `No user found with id: ${req.params.id}`,
      });
    }

    return res.status(200).send({ status: "Success", user: user.toJSON() });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

// update user
app.put("/api/user/update/:id", async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);
    checkRequiredParams(["name", "email"], req.body);

    await getAuth().updateUser(req.params.id, {
      displayName: req.body.name,
      email: req.body.email,
    });

    return res.status(200).send({ status: "Success", msg: "User Updated" });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

// delete user
app.delete("/api/user/delete/:id", async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);

    await getAuth().deleteUser(req.params.id);

    return res.status(200).send({ status: "Success", msg: "User Deleted" });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
});

module.exports = { app };
