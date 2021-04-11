const express = require("express");
const router = express.Router();
const {
  starshipHandler,
  proxyHandler,
  changeStarshipCount,
  vehicleHandler,
  changeVehicleCount,
} = require("../controllers/appControllers");

router.get("/api/starships", starshipHandler);
router.post("/api/starships", changeStarshipCount);

router.get("/api/vehicles", vehicleHandler);
router.post("/api/vehicles", changeVehicleCount);

router.use("/", proxyHandler);

module.exports = router;
