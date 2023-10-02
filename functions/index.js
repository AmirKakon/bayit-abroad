const { app, functions } = require("./setup");
require("./Routes/FormItems");

exports.app = functions.https.onRequest(app);
