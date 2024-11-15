const uuid = require('uuid');
class Question {
    constructor(text, options, correct_option) {
        this.id = uuid.v4();
        this.text = text;
        this.options = options; // Array of 4 options
        this.correct_option = correct_option; // Index of correct answer
    }
}

module.exports = Question;
