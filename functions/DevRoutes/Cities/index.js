const { dev, logger, db, admin } = require("../../setup");
const fetch = require("node-fetch");
const { FieldValue } = admin.firestore;

const baseDB = "cities_dev";

const cacheDurationHours = 24 * 60;
let lastFetchTime = 0;
let cachedCities = null;

const pageSize = 100; // Number of cities to send at a time

dev.get("/api/cities/getAll", async (req, res) => {
  const currentTime = Date.now();
  const { search = "", page = "1" } = req.query;
  const searchTerm = search.toLowerCase();
  const pageNumber = parseInt(page);

  if (
    !cachedCities ||
    currentTime - lastFetchTime > cacheDurationHours * 60 * 1000
  ) {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries",
      );
      const { data } = await response.json();

      cachedCities = data.flatMap(({ cities, country }) =>
        cities.map((city) => ({
          value: `${city} (${country})`,
          label: `${city} (${country})`,
        })),
      );

      lastFetchTime = currentTime;
    } catch (error) {
      logger.error("Error fetching cities:", error);
    } finally {
      res.status(200).send({
        status: "Success",
        cities: cachedCities ?? [],
      });
    }
  }

  const sortedCities = cachedCities.sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  const filteredCities = sortedCities.filter((city) =>
    city.label.toLowerCase().startsWith(searchTerm),
  );

  const start = (pageNumber - 1) * pageSize;
  const end = pageNumber * pageSize;

  logger.log("Successful cached cities", currentTime);
  res.status(200).json(filteredCities.slice(start, end));
});

dev.post("/api/cities/add/:city", async (req, res) => {
  const { city: cityName } = req.params;
  const cityRef = db.collection(baseDB).doc(cityName);

  try {
    await db.runTransaction(async (t) => {
      const doc = await t.get(cityRef);

      if (!doc.exists) {
        t.set(cityRef, { name: cityName, count: 1 });
      } else {
        t.update(cityRef, { count: FieldValue.increment(1) });
      }
    });

    res.status(200).send({ status: "Success", msg: "City Added" });
  } catch (error) {
    logger.error("Error Adding City", error);
    res.status(500).send({ status: "Failed", msg: error });
  }
});

module.exports = { dev };
