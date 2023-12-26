const { app, dev, functions } = require("./setup");

// app routes
require("./Routes/Form/FormItems");
require("./Routes/Form/GameItems");
// require("./Routes/ExchangeRates");

// // dev routes
require("./DevRoutes/Form/FormItems");
require("./DevRoutes/Form/Orders");
require("./DevRoutes/Form/Payments");
require("./DevRoutes/ExchangeRates");

require("./DevRoutes/Tutorial");

// Export the main app
exports.app = functions.https.onRequest(app);

// Export the dev version
exports.dev = functions.https.onRequest(dev);
