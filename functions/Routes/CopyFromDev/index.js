const { app, logger, db } = require("../../setup");

// Function to get all items from the source collection
const getAllItemsFromSource = async (sourceCollection) => {
  const snapshot = await db.collection(sourceCollection).get();
  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  logger.log(items);
  return items;
};

// Function to create an item in the destination collection
const createItemInDestination = async (destinationCollection, item) => {
  const id = item.id;

  try {
    delete item.id;

    // Use set with specified document ID
    await db.collection(destinationCollection).doc(id).set(item);
    console.log(`Item created successfully with ID: ${id}`);
    return null; // Return null for success
  } catch (error) {
    console.error(`Failed to create item. Error: ${error}`);
    return id || "Unknown"; // Return the item ID for failure
  }
};

// Endpoint to copy items from the source to destination collection
app.post("/api/copy/:source/to/:destination/copyAll", async (req, res) => {
  try {
    const { source, destination } = req.params;

    // Fetch all items from the source collection
    const sourceItems = await getAllItemsFromSource(source);

    // Create each item in the destination collection
    const errors = [];

    sourceItems.forEach(async (sourceItem) => {
      const errorItemID = await createItemInDestination(
        destination,
        sourceItem,
      );
      if (errorItemID) {
        errors.push(errorItemID);
      }
    });

    if (errors.length > 0) {
      return res.status(500).send({ status: "Partial failure", errors });
    } else {
      return res
        .status(200)
        .send({ status: "Success", msg: "All items copied successfully" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error.message });
  }
});

module.exports = app;
