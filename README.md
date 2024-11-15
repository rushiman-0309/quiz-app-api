# Quiz App API
Author - Rushikesh Manwatkar | Version 1.0.0

## Requirements
- Node.js

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the server: `npm run start`
4. API will be running on `http://localhost:3000`
5. To run tests: `npm run test`

## API Endpoints
- `POST /api/quizzes`: Create a new quiz.
- `GET /api/quizzes/:id`: Get a quiz by ID.
- `POST /api/results/:quiz_id/:question_id/:user_id`: Submit an answer for a quiz question.
- `GET /api/results/:quiz_id/:user_id`: Get results for a user in a quiz.

## Usage
- The sample requests are available in the `.test.js` files in the `/test` folder
- Before runing npm run test comment the following code 
`app.listen(PORT, () => console.log("Server running on ", url));`
## Known Issues
- In-memory storage, data will be lost on server restart.
- The score is not calulated, just shown as correct and incorect answers.