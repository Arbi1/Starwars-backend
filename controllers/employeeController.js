const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/asyncHandler");
const Employee = require("../models/Employee");

exports.getEmployees = asyncHandler(async (req, res, next) => {
  const date = new Date(req.query.date);
  const allMjek = await Employee.find({
    position: "MJEK",
    startDate: { $lte: date },
  });
  const allInfermier = await Employee.find({
    position: "INFERMIER",
    startDate: { $lte: date },
  });
  const allSanitar = await Employee.find({
    position: "SANITAR",
    startDate: { $lte: date },
  });
  if (allMjek.length < 3 || allInfermier.length < 3 || allSanitar.length < 3) {
    next(new ErrorResponse("Not enough staff on specified date!", 400));
    return;
  }
  const allEmployees = await Employee.find({});
  if (allEmployees) {
    res.status(200).json({
      success: true,
      data: allEmployees,
    });
  } else {
    next(
      new ErrorResponse("Something went wrong while fetching employees!", 400)
    );
  }
});

exports.getEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    const date = new Date(req.query.date);
    if (date < employee.startDate) {
      next(
        new ErrorResponse("Employee hadn't started in specified date!", 400)
      );
      return;
    }
    const employees = await Employee.find({
      position: employee.position,
      startDate: { $lte: date },
    });
    if (employees.length < 3) {
      next(new ErrorResponse("Not enough staff!", 400));
      return;
    }
    const daysOfWork = date.getDate();
    const workHours = Math.round(daysOfWork / (employees.length / 3)) * 8;
    const salary = workHours * employee.payPerHour;
    const response = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      position: employee.position,
      payPerHour: employee.payPerHour,
      workHours: employee.workHours,
      startDate: employee.startDate,
    };
    res.status(200).json({
      success: true,
      data: { ...response, workHours, salary },
    });
  } else {
    next(
      new ErrorResponse(
        "Something went wrong while fetching the employee!",
        500
      )
    );
  }
});

exports.createEmployee = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, position, payPerHour } = req.body;

  const startDate = new Date(req.body.startDate);

  if (startDate.getDate() !== 1) {
    next(new ErrorResponse("Please enter a valid start date!", 400));
    return;
  }

  const resultMjek = await Employee.find({ position: "MJEK" }).sort({
    payPerHour: 1,
  });
  let maxMjek;
  resultMjek.length !== 0
    ? (maxMjek = resultMjek[0].payPerHour)
    : (maxMjek = Infinity);

  const resultInfermier = await Employee.find({
    position: "INFERMIER",
  }).sort({
    payPerHour: 1,
  });
  let maxInfermier;

  resultInfermier.length !== 0
    ? (maxInfermier = resultInfermier[0].payPerHour)
    : (maxInfermier = Infinity);

  const resultSanitar = await Employee.find({ position: "SANITAR" }).sort({
    payPerHour: 1,
  });
  let maxSanitar;

  resultSanitar.length !== 0
    ? (maxSanitar = resultSanitar[0].payPerHour)
    : (maxSanitar = 0);

  if (
    (position === "MJEK" &&
      req.body.payPerHour > maxInfermier &&
      req.body.payPerHour > maxSanitar) ||
    (position === "INFERMIER" &&
      req.body.payPerHour < maxMjek &&
      req.body.payPerHour > maxSanitar) ||
    (position === "SANITAR" &&
      req.body.payPerHour < maxMjek &&
      req.body.payPerHour < maxInfermier)
  ) {
    const employee = await Employee.create({
      firstName,
      lastName,
      position,
      payPerHour,
      startDate,
    });
    if (employee) {
      res.status(200).json({
        success: true,
        data: employee,
      });
    } else {
      next(
        new ErrorResponse("Something went wrong during Employee creation!", 400)
      );
    }
  } else {
    next(new ErrorResponse("The record cannot be stored like that", 400));
  }
});

exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const date = new Date(req.query.date);

  const evaluation = isEndOfMonth(date);

  if (evaluation) {
    const result = await Employee.findByIdAndDelete(id);
    if (!result) {
      next(new ErrorResponse("No employee with specified id!", 400));
      return;
    }

    res.status(200).json({
      success: true,
    });
  } else {
    next(new ErrorResponse("Employee cannot be deleted!", 400));
  }
});

function isEndOfMonth(date) {
  const copy = new Date(Number(date));
  copy.setDate(copy.getDate() + 1);
  if (copy.getMonth() === date.getMonth() + 1) {
    return true;
  } else {
    return false;
  }
}
