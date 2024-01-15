const { dev, logger, functions } = require("../../setup");
const fetch = require("node-fetch");

const cacheDurationMinutes = 60;
let lastFetchTime = 0;
let cachedExchangeRates = null;

const exchangeRateApiKey = functions.config().exchangerateapi.key;
const apibaseurl = functions.config().apibaseurl.dev;

dev.get("/api/exchange-rates/usd-to-ils", async (req, res) => {
  const currentTime = Date.now();

  if (
    !cachedExchangeRates ||
    currentTime - lastFetchTime > cacheDurationMinutes * 60 * 1000
  ) {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/pair/USD/ILS`,
      );
      const exchangeRates = await response.json();

      cachedExchangeRates = exchangeRates.conversion_rate;
      lastFetchTime = currentTime;
      return res.status(200).send({
        status: "Success",
        rate: cachedExchangeRates,
      });
    } catch (error) {
      logger.error("Error fetching exchange rate:", error);
      return res.status(500).send({
        status: "Error", rate: cachedExchangeRates ?? 0,
      });
    }
  }

  logger.log("Successful cached exchange rate", currentTime);
  res.status(200).json(cachedExchangeRates);
});

const getExchangeRate = async () => {
  try {
    const currentTime = Date.now();

    if (
      !cachedExchangeRates ||
      currentTime - lastFetchTime > cacheDurationMinutes * 60 * 1000
    ) {
      const response = await fetch(
        `${apibaseurl}/api/exchange-rates/usd-to-ils`,
      );
      const exchangeRateData = await response.json();

      if (exchangeRateData.rate !== 0) {
        cachedExchangeRates = exchangeRateData.rate;
        lastFetchTime = currentTime;
        return cachedExchangeRates;
      } else {
        throw new Error("Failed to fetch exchange rates");
      }
    } else {
      return cachedExchangeRates;
    }
  } catch (error) {
    logger.error("Error fetching exchange rates:", error);
    throw new Error("Failed to fetch exchange rates");
  }
};

module.exports = { dev, getExchangeRate };
