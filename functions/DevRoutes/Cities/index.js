const { dev, logger } = require("../../setup");
const fetch = require("node-fetch");

const cacheDurationHours = 24 * 60;
let lastFetchTime = 0;
let cachedCities = null;

const pageSize = 100; // Number of cities to send at a time

dev.get("/api/cities/getAll", async (req, res) => {
  const currentTime = Date.now();
  const searchTerm = req.query.search ? req.query.search.toLowerCase() : "";
  const page = req.query.page ? parseInt(req.query.page) : 1;

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

  const filteredCities = cachedCities.filter((city) =>
    city.label.toLowerCase().includes(searchTerm),
  );

  // Calculate start and end indices for pagination
  const start = (page - 1) * pageSize;
  const end = page * pageSize;

  logger.log("Successful cached cities", currentTime);
  res.status(200).json(filteredCities.slice(start, end));
});

module.exports = { dev };
