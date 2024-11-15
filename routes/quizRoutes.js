const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Create a new quiz
router.post('/', quizController.createQuiz);

// Get quiz by ID
router.get('/:id', quizController.getQuiz);

// router.get('/', quizController.getAllQuiz)

module.exports = router;
