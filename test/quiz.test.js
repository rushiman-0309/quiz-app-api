const request = require('supertest');
const app = require('../app');  // Import the app we defined earlier

let quizId;  // This will hold the ID of the created quiz

describe('Quiz API Endpoints', () => {

    // Test for creating a new quiz
    it('Should create a new quiz', async () => {
        const newQuiz = {
            "title": "Dummy Cwuiz",
            "questions": [{
                "text": "What is your current CTC",
                "options": [10, 12, 13, 20],
                "correct_option": 2
            },
            {
                "text": "What is your expected CTC",
                "options": [10, 12, 18, 20],
                "correct_option": 3
            }]
        };

        const response = await request(app).post('/api/quizzes').send(newQuiz);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newQuiz.title);
        expect(response.body.questions.length).toBe(newQuiz.questions.length);
        expect(response.body.questions[0].text).toBe(newQuiz.questions[0].text);

        quizId = response.body.id;  // Save the quiz ID for later tests
    });

    // Test for fetching a quiz
    it('should fetch a quiz by ID', async () => {

        const response = await request(app).get(`/api/quizzes/${quizId}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Dummy Cwuiz');
        expect(response.body.questions.length).toBe(2);
        expect(response.body.questions[0].options).toHaveLength(4);  // Checking that there are 4 options
        expect(response.body.questions[0]).not.toHaveProperty('correct_option'); // Correct answer should not be included
    });

    it('should return error while fetching quiz with invalid ID', async () => {

        const response = await request(app).get(`/api/quizzes/some_rubbish_id`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Quiz not found');
    });
});
