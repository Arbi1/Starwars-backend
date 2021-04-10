const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/asyncHandler");
const axios = require("axios");
const Starship = require("../models/Starship");
const _ = require("lodash");

exports.starshipHandler = asyncHandler(async (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    if (req.query.name) {
      const starship = await Starship.findOne({ name: req.query.name }).select(
        "-_id -__v"
      );
      res.send(starship);
    }
  } else {
    const starships = await Starship.find({}).select("-_id -__v");

    res.send({ count: starships.length, results: starships });
  }
});

exports.changeStarshipCount = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const starship = await Starship.findOne({ name });
  if (_.isEmpty(starship)) {
    return next(new ErrorResponse("No starship with specified name"));
  }
  if (req.body.action && req.body.number) {
    switch (req.body.action) {
      case "increment":
        starship.count += +req.body.number;
        starship.save();
        res.send("count incremented");
        break;
      case "decrement":
        if (starship.count - req.body.number < 0) {
          return next(new ErrorResponse("Cannot decrement"));
        } else {
          starship.count -= +req.body.number;
          starship.save();
          res.send("count decremented");
        }
        break;
      case "set":
        starship.count = +req.body.number;
        starship.save();
        res.send("count set");
        break;
      default:
        return next(new ErrorResponse("Action is not allowed"));
    }
  } else {
    return next(new ErrorResponse("Body should have an action and number"));
  }
});

exports.proxyHandler = asyncHandler(async (req, res, next) => {
  const response = await axios.get(`${process.env.BASE_URL}${req.originalUrl}`);
  res.send(response.data);
});
