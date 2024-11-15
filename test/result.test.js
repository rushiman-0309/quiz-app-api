const request = require('supertest');
const app = require('../app');
const { json } = require('body-parser');

let quizId;
let questionId;
let user_id = 'rushi10'

beforeAll(async () => {
    // Create a quiz first to add questions
    const newQuiz = {
        "title": 'Math Quiz',
        "questions": [
            {
                "text": 'What is 2 + 2?',
                "options": ['3', '4', '5', '6'],
                "correct_option": 1,
            },
        ],
    };

    const response = await request(app).post('/api/quizzes').send(newQuiz);
    quizId = response.body.id;
    questionId = response.body.questions[0].id;
});

describe('Result API Endpoints', () => {

    // Test for submitting an answer
    it('should submit an answer and return feedback', async () => {
        const userAnswer = {
            "selected_option": 1,  // Correct answer
        };
        const response = await request(app)
            .post(`/api/submit/${quizId}/${questionId}/${user_id}`)
            .send(userAnswer);
        expect(response.status).toBe(200);
        expect(response.body.is_correct).toBe(true);
        expect(response.body.correct_answer).toBe('4');
    });

    it('should return error if user_id not provided while submiting answer', async () => {
        const userAnswer = {
            "selected_option": 1,  // Correct answer
        };
        const response = await request(app)
            .post(`/api/submit/${quizId}/${questionId}`)
            .send(userAnswer);
        expect(response.status).toBe(404);
    });

    // Test for fetching results
    it('should get results for a user', async () => {
        const resultResponse = await request(app).get(`/api/results/${quizId}/${user_id}`);
        expect(resultResponse.status).toBe(200);
        expect(JSON.stringify(resultResponse.body.score)).toBe(JSON.stringify({
            correctAnswers: 1,
            incorrectAnswers: 0
        }));  // Since the user answered the question correctly
        expect(resultResponse.body.answers.length).toBe(1);  // One question in the quiz
        expect(resultResponse.body.answers[0].is_correct).toBe(true);
    });

    it('should return error if user_id not provided', async () => {
        const resultResponse = await request(app).get(`/api/results/${quizId}`);
        expect(resultResponse.status).toBe(404);
    });

});
