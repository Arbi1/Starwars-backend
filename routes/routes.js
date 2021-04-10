const express = require("express");
const router = express.Router();
const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

module.exports = router;
