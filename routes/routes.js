const express = require("express");
const router = express.Router();
const {
  starshipHandler,
  proxyHandler,
  changeStarshipCount,
} = require("../controllers/appControllers");

router.get("/api/starships", starshipHandler);
router.post("/api/starships", changeStarshipCount);

router.use("/api", proxyHandler);

module.exports = router;
