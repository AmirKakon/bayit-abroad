const { dev, logger, db, admin } = require("../../setup");
const fetch = require("node-fetch");
const { FieldValue } = admin.firestore;

const baseDB = "cities_dev";

const cacheDurationHours = 24 * 60;
let lastFetchTime = 0;
let cachedCities = null;

const pageSize = 100; // Number of cities to send at a time

const fetchCities = async () => {
  const response = await fetch("https://countriesnow.space/api/v0.1/countries");
  const { data } = await response.json();

  cachedCities = data.flatMap(({ cities, country }) =>
    cities.map((city) => ({
      value: `${city} (${country})`,
      label: `${city} (${country})`,
    })),
  );

  lastFetchTime = Date.now();

  return cachedCities;
};

// get list of cities
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
      await fetchCities();
    } catch (error) {
      logger.error("Error fetching cities:", error);
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
  res
    .status(200)
    .send({ status: "Success", data: filteredCities.slice(start, end) });
});

// add city to db or update count of city
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

// get list of cities sorted by count
dev.get("/api/cities/getAllSorted", async (req, res) => {
  try {
    const citiesRef = db.collection(baseDB);
    const snapshot = await citiesRef.orderBy("count", "desc").get();

    const cities = [];
    snapshot.forEach((doc) => {
      cities.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).send({ status: "Success", data: cities });
  } catch (error) {
    logger.error("Error fetching sorted cities:", error);
    res.status(500).send({ status: "Failed", msg: error });
  }
});

module.exports = { dev };
