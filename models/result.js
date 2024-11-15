class Result {
    answers = [];
    score = {
        correctAnswers: 0,
        incorrectAnswers: 0
    }
    constructor(quiz_id, user_id, answer) {
        this.quiz_id = quiz_id;
        this.user_id = user_id;
        this.pushAnswer(answer);
    }

    pushAnswer = function (answer) {
        if (this.answers.find(ans => ans.question_id === answer.question_id)) {
            throw new Error("The answer cannot be changed now!")
        } else {
            answer.is_correct ? this.score.correctAnswers++ : this.score.incorrectAnswers++;
            this.answers.push(answer);
        }
    }
}

module.exports = Result;
