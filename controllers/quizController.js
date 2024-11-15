const Quiz = require('../models/quiz');
const Question = require('../models/question');
const { all } = require('../routes/quizRoutes');
let { quizzes } = require('../data/quiz');

exports.createQuiz = (req, res) => {
    try {
        const { title, questions } = req.body;

        // Validate input
        if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const newQuestions = questions.map(q => new Question(q.text, q.options, q.correct_option));
        const newQuiz = new Quiz(title, newQuestions);

        quizzes.set(newQuiz.id, newQuiz);
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).send({ "error": error })
        console.error(error)
    }
};

exports.getQuiz = (req, res) => {
    try {
        if (!quizzes.has(req.params.id)) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        const quiz = quizzes.get(req.params.id);

        // Return questions without the correct answer
        const quizWithoutAnswers = {
            ...quiz,
            questions: quiz.questions.map(q => {
                const { correct_option, ...rest } = q;
                return rest;
            })
        };

        res.status(200).json(quizWithoutAnswers);

    } catch (error) {
        res.status(500).send({ "error": error })
        console.error(error)
    }
};