// // test/question.test.js

// const request = require('supertest');
// const app = require('../app');  // Import the app we defined earlier

// let quizId;
// let questionId;

// describe('Question API Endpoints', () => {
//     // Test for adding a question to a quiz
//     it('should add a question to a quiz', async () => {
//         const newQuiz = {
//             "title": "Dummy Cwuiz",
//             "questions": [{
//                 "text": "What is your current CTC",
//                 "options": [10, 12, 13, 20],
//                 "correct_option": 2
//             },
//             {
//                 "text": "What is your expected CTC",
//                 "options": [10, 12, 18, 20],
//                 "correct_option": 3
//             }]
//         };

//         const res = await request(app).post('/api/quizzes').send(newQuiz);
//         quizId = res.body.id;  // Save the quiz ID for later tests
//         console.log(`quizId: ${quizId}`)
//         const newQuestion = {
//             "text": 'What is the chemical symbol for water?',
//             "options": ['O2', 'CO2', 'H2O', 'N2'],
//             "correct_option": 2,
//         };

//         const response = await request(app).post(`/api/questions/${quizId}`).send(newQuestion);

//         console.log(response.error)
//         expect(response.status).toBe(201);
//         expect(response.body.text).toBe(newQuestion.text);
//         expect(response.body.options).toEqual(newQuestion.options);
//         expect(response.body.correct_option).toBe(newQuestion.correct_option);
//         questionId = response.body.id;  // Save the question ID for later tests
//     });

// });
