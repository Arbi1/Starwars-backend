const express = require("express");
const colors = require("colors");
const appRoutes = require("./routes/routes");
const db = require("./config/db.js");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");
dotenv.config({ path: "./config/config.env" });
const cors = require("cors");
db();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());

app.use("/api/v1", appRoutes);
app.use(errorHandler);
const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`.yellow.bold)
);

// Handle unhandled rejection promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //Close server & exit process
  server.close(() => process.exit(1));
});
