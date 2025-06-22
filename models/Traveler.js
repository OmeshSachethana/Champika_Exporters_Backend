const mongoose = require('mongoose');

const travelerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
  },
  passportNumber: {
    type: String,
    required: [true, 'Please provide your passport number'],
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide your date of birth'],
  },
  gender: {
    type: String,
    required: [true, 'Please specify your gender'],
    enum: ['male', 'female', 'other'],
  },
  nationality: {
    type: String,
    required: [true, 'Please provide your nationality'],
  },
  contactPhone: {
    type: String,
    required: [true, 'Please provide your contact phone number'],
  },
  address: {
    type: String,
    required: [true, 'Please provide your address'],
  },
  destinationCountry: {
    type: String,
    required: [true, 'Please specify your destination country'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for better query performance
travelerSchema.index({ passportNumber: 1 });
travelerSchema.index({ createdAt: -1 });

const Traveler = mongoose.model('Traveler', travelerSchema);

module.exports = Traveler;