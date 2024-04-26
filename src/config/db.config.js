const mongoose = require("mongoose");
const { MONGO_URI } = require("./server.config");
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected");
  } catch (err) {
    console.log("Unable to connect to database");
    console.log(err.message);
  }
}
module.exports = { connectDB };
