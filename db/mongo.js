// Export a function that connects to mongo
const config = require("../utils/config");
const mongoose = require("mongoose");

function connectMongo() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB:", error.message);
    });
}

module.exports = connectMongo;
