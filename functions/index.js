const { app, dev, functions } = require("./setup");

// app routes
require("./Routes/FormItems");
require("./Routes/FormItems/GameItems");

// // dev routes
require("./DevRoutes/Form/FormItems");
require("./DevRoutes/Form/GameItems");
require("./DevRoutes/Tutorial");

// Export the main app
exports.app = functions.https.onRequest(app);

// Export the dev version
exports.dev = functions.https.onRequest(dev);
