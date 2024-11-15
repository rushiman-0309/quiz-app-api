const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// // Submit answer for a quiz question
// router.post('/:quiz_id/:question_id/:user_id', resultController.submitAnswer);

// Get results for a quiz
router.get('/:quiz_id/:user_id', resultController.getResults);

module.exports = router;
