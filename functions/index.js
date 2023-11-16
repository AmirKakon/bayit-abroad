const { app, dev, functions } = require("./setup");

// app routes
require("./Routes/Form/FormItems");
require("./Routes/Form/GameItems");

require("./ExchangeRates");

// // dev routes
require("./DevRoutes/Form/FormItems");
require("./DevRoutes/Form/GameItems");
require("./DevRoutes/Form/Orders");

require("./DevRoutes/Tutorial");

// Export the main app
exports.app = functions.https.onRequest(app);

// Export the dev version
exports.dev = functions.https.onRequest(dev);
