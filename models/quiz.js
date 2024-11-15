const uuid = require('uuid');
class Quiz {
    constructor(title, questions) {
        this.id = uuid.v4();
        this.title = title;
        this.questions = questions; // An array of Question objects
    }
}

module.exports = Quiz;
