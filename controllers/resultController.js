const Result = require('../models/result');
const Answer = require('../models/answer');
let { quizzes } = require('../data/quiz');
let { results } = require('../data/results');

exports.submitAnswer = (req, res) => {
    try {
        if (!quizzes.has(req.params.quiz_id)) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        const quiz = quizzes.get(req.params.quiz_id);

        const question = quiz.questions.find(q => q.id === req.params.question_id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const { selected_option } = req.body;
        if (selected_option === undefined || selected_option < 0 || selected_option >= 4) {
            return res.status(400).json({ message: 'Invalid option' });
        }

        const is_correct = selected_option === question.correct_option;
        const answer = new Answer(question.id, selected_option, is_correct);
        const key = `${req.params.quiz_id}_${req.params.user_id}`;

        if (results.has(key)) {
            const result = results.get(key);
            result.pushAnswer(answer);
        } else {
            const result = new Result(req.params.quiz_id, req.params.user_id, answer);
            results.set(key, result);
        }

        res.status(200).json({
            is_correct,
            correct_answer: question.options[question.correct_option],
        });

    } catch (err) {
        res.status(500).json({ error: err })
        console.error(err)
    }
};

exports.getResults = (req, res) => {
    try {
        const key = `${req.params.quiz_id}_${req.params.user_id}`
        const userResults = results.get(key)
        if (!userResults) {
            throw new Error('Results not found');
        }
        res.status(200).json(userResults);
    } catch (error) {
        res.status(500).send({ "error": error })
        console.error(error)
    }
};
