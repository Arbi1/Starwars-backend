const mongoose = require("mongoose");

const StarshipSchema = new mongoose.Schema({
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
  hyperdrive_rating: {
    type: String,
  },
  MGLT: {
    type: String,
  },
  starship_class: {
    type: String,
  },
  pilots: {
    type: [String],
  },
  films: {
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

module.exports = mongoose.model("Starship", StarshipSchema);
