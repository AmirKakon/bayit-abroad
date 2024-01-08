const { dev, logger } = require("../../setup");
const fetch = require("node-fetch");

const cacheDurationHours = 24 * 60;
let lastFetchTime = 0;
let cachedCities = null;

const filterByCountry = ["USA", "GBR", "ESP", "FRA"];

dev.get("/api/cities/getAll", async (req, res) => {
  const currentTime = Date.now();

  if (
    !cachedCities ||
    currentTime - lastFetchTime > cacheDurationHours * 60 * 1000
  ) {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries",
      );
      const data = await response.json();

      // Flatten the nested array structure
      cachedCities = data.data
        .filter((location) => filterByCountry.includes(location.iso3))
        .flatMap((location) =>
          location.cities.map((city) => ({
            value: `${city} (${location.country})`,
            label: `${city} (${location.country})`,
          })),
        );

      lastFetchTime = currentTime;
      return res.status(200).send({
        status: "Success",
        cities: cachedCities,
      });
    } catch (error) {
      logger.error("Error fetching cities:", error);
      return res.status(500).send({
        status: "Error",
        cities: cachedCities ?? [],
      });
    }
  }

  logger.log("Successful cached cities", currentTime);
  res.status(200).json(cachedCities);
});

module.exports = { dev };
