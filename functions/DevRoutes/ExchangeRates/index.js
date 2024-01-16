const { dev, logger, functions } = require("../../setup");
const fetch = require("node-fetch");

const cacheDurationMinutes = 60;
let lastFetchTime = 0;
let cachedExchangeRates = null;

const exchangeRateApiKey = functions.config().exchangerateapi.key;

const fetchExchangeRate = async () => {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/pair/USD/ILS`,
  );
  const exchangeRates = await response.json();

  cachedExchangeRates = exchangeRates.conversion_rate;
  lastFetchTime = Date.now();

  return cachedExchangeRates;
};

dev.get("/api/exchange-rates/usd-to-ils", async (req, res) => {
  try {
    const rate = await fetchExchangeRate();
    res.status(200).send({ status: "Success", rate });
  } catch (error) {
    logger.error("Error fetching exchange rate:", error);
    res.status(500).send({ status: "Error", rate: cachedExchangeRates ?? 0 });
  }
});

const getExchangeRate = async () => {
  try {
    const currentTime = Date.now();

    if (
      !cachedExchangeRates ||
      currentTime - lastFetchTime > cacheDurationMinutes * 60 * 1000
    ) {
      return await fetchExchangeRate();
    } else {
      return cachedExchangeRates;
    }
  } catch (error) {
    logger.error("Error fetching exchange rates:", error);
    throw new Error("Failed to fetch exchange rates");
  }
};

module.exports = { dev, getExchangeRate };
