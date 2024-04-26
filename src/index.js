const express = require("express");
const apiRouter = require("./routes");
require("dotenv").config();
const { connectDB } = require("./config/db.config");
const { PORT } = require("./config/server.config");
const errorHandler = require("./utils/errorHandler");
const app = express();
app.use(express.json());
app.use("/api", apiRouter);
app.use(errorHandler);

app.listen(PORT, async function () {
  console.log(`Server is running in port ${PORT}`);
  await connectDB();
});
