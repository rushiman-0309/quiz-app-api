const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Submit answer for a quiz question
router.post('/:quiz_id/:question_id/:user_id', resultController.submitAnswer);

module.exports = router;
