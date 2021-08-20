const edumy = require("../models/edumy");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllCourses = asyncHandler(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  const removeFields = ["sort"];

  removeFields.forEach((val) => delete reqQuery[val]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  const edumy = await edumy.find(JSON.parse(queryStr));

  res.status(200).json({
    success: true,
    data: edumy,
  });
});

exports.createNewCourses = asyncHandler(async (req, res, next) => {
  const edumy = await edumy.create(req.body);

  res.status(201).json({
    success: true,
    data: edumy,
  });
});

exports.updateCoursesById = asyncHandler(async (req, res, next) => {
  let edumy = await edumy.findById(req.params.id);

  if (!edumy) {
    return next(
      new ErrorResponse(`Course with id ${req.params.id} was not found`, 404)
    );
  }

  edummy = await edumy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: edumy,
  });
});

exports.deleteCoursesCoursesById = asyncHandler(async (req, res, next) => {
  let edumy = await edumy.findById(req.params.id);

  if (!edumy) {
    return next(
      new ErrorResponse(`Course with id ${req.params.id} was not found`, 404)
    );
  }

  await edumy.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
