const { app, dev, functions } = require("./setup");

// app routes
require("./Routes/FormItems");

// // dev routes
require("./DevRoutes/FormItems");
require("./DevRoutes/FormItems/GameItems");
require("./DevRoutes/Tutorial");

// Export the main app
exports.app = functions.https.onRequest(app);

// Export the dev version
exports.dev = functions.https.onRequest(dev);
