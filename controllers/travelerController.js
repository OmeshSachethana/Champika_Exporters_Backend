const Traveler = require('../models/Traveler');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllTravelers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Traveler.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const travelers = await features.query;

  res.status(200).json({
    status: 'success',
    results: travelers.length,
    data: {
      travelers,
    },
  });
});

exports.getTraveler = catchAsync(async (req, res, next) => {
  const traveler = await Traveler.findById(req.params.id);

  if (!traveler) {
    return next(new AppError('No traveler found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      traveler,
    },
  });
});

exports.createTraveler = catchAsync(async (req, res, next) => {
  const newTraveler = await Traveler.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      traveler: newTraveler,
    },
  });
});

exports.updateTraveler = catchAsync(async (req, res, next) => {
  const traveler = await Traveler.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!traveler) {
    return next(new AppError('No traveler found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      traveler,
    },
  });
});

exports.deleteTraveler = catchAsync(async (req, res, next) => {
  const traveler = await Traveler.findByIdAndDelete(req.params.id);

  if (!traveler) {
    return next(new AppError('No traveler found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});