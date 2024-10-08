const { app, dev, functions } = require("./setup");

// app routes
require("./Routes/CopyFromDev");
require("./Routes/Form/FormItems");
require("./Routes/Orders");
require("./Routes/ExchangeRates");
require("./Routes/Cities");

// // dev routes
require("./DevRoutes/Form/FormItems");
require("./DevRoutes/Orders");
require("./DevRoutes/ExchangeRates");
require("./DevRoutes/Cities");
require("./DevRoutes/User");
require("./DevRoutes/Auth");

require("./DevRoutes/Tutorial");

// Export the main app
exports.app = functions.https.onRequest(app);

// Export the dev version
exports.dev = functions.https.onRequest(dev);
