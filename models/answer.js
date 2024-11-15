class Answer {
    constructor(question_id, selected_option, is_correct) {
        this.question_id = question_id;
        this.selected_option = selected_option;
        this.is_correct = is_correct;
    }
}

module.exports = Answer;
