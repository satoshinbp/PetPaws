const express = require('express');
const router = express.Router();
const petController = require('../controller/petController');

router.post('api/pet', petController.petCreate);

module.exports = router;
