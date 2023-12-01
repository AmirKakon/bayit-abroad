const { app, logger } = require("../../setup");
const fetch = require("node-fetch");

const cacheDurationMinutes = 60;
let lastFetchTime = 0;
let cachedExchangeRates = null;

app.get("/api/exchange-rates/usd-to-ils", async (req, res) => {
  const currentTime = Date.now();

  if (
    !cachedExchangeRates ||
    currentTime - lastFetchTime > cacheDurationMinutes * 60 * 1000
  ) {
    try {
      const response = await fetch(
        "https://v6.exchangerate-api.com/v6/32c1a1f34623949a38ddc78f/pair/USD/ILS",
      );
      const exchangeRates = await response.json();

      cachedExchangeRates = exchangeRates.conversion_rate;
      lastFetchTime = currentTime;
    } catch (error) {
      logger.error("Error fetching exchange rates:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  logger.log("Successful cache exchange rate", currentTime);
  res.status(200).json(cachedExchangeRates);
});

module.exports = app;