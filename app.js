const express = require('express');
const bodyParser = require('body-parser');

//use express routing 
const quizRoutes = require('./routes/quizRoutes');
const resultRoutes = require('./routes/resultRoutes');
const submitRoutes = require('./routes/submitRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/submit', submitRoutes);


app.get("/", (req, res) => {
    let homePageData = {
        availableMethods: {
            "POST /api/quizzes": "Create a new quiz.",
            "GET /api/quizzes/:id": "Get a quiz by ID.",
            "POST /api/results/:quiz_id/:question_id/:user_id": "Submit an answer for a quiz question.",
            "GET /api/results/:quiz_id/:user_id": "Get results for a user in a quiz."
        }
    }
    res.status(200).send(homePageData);
})

const url = `http://localhost:${PORT}`
app.listen(PORT, () => console.log("Server running on ", url));

module.exports = app;