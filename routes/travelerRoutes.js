const express = require('express');
const travelerController = require('../controllers/travelerController');
const router = express.Router();

router
  .route('/')
  .get(travelerController.getAllTravelers)
  .post(travelerController.createTraveler);

router
  .route('/:id')
  .get(travelerController.getTraveler)
  .patch(travelerController.updateTraveler)
  .delete(travelerController.deleteTraveler);

module.exports = router;