const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  model: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  cost_in_credits: {
    type: String,
  },
  length: {
    type: String,
  },
  max_atmosphering_speed: {
    type: String,
  },
  crew: {
    type: String,
  },
  passengers: {
    type: String,
  },
  cargo_capacity: {
    type: String,
  },
  consumables: {
    type: String,
  },
  vehicle_class: {
    type: String,
  },
  pilots: {
    type: String,
  },
  films: {
    type: [String],
  },
  pilots: {
    type: [String],
  },
  edited: {
    type: String,
  },
  url: {
    type: String,
  },
  count: {
    default: 1,
    type: Number,
  },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
