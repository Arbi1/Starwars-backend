const Starship = require("../models/Starship");
const Vehicle = require("../models/Vehicle");
const axios = require("axios");
const _ = require("lodash");

exports.populateStarships = async () => {
  let isNextNull = false;
  const starships = await Starship.find({});
  if (_.isEmpty(starships)) {
    for (let i = 1; !isNextNull; i++) {
      const response = await axios.get(
        `${process.env.BASE_URL}/api/starships/?page=${i}`
      );
      if (response.data.next === null) {
        isNextNull = true;
      }
      await Starship.create(response.data.results);
    }
  }
};

exports.populateVehicles = async () => {
  let isNextNull = false;
  const vehicles = await Vehicle.find({});
  if (_.isEmpty(vehicles)) {
    for (let i = 1; !isNextNull; i++) {
      const response = await axios.get(
        `${process.env.BASE_URL}/api/vehicles/?page=${i}`
      );
      if (response.data.next === null) {
        isNextNull = true;
      }
      await Vehicle.create(response.data.results);
    }
  }
};
