const { app, functions} = require("./setup");
require("./Routes/Tutorial"); // This will register the routes

exports.app = functions.https.onRequest(app);
