class Student{
    constructor(studentId) {
        this.studentId = studentId;
        this.answers = [];
    }

    addAnswer(question){
        this.answers.push(question);
    }
}

class Question{
    constructor(qid, answer) {
        this.qid = qid;
        this.answer = answer;
    }

    checkAnswer(answer){
        if(this.answer === answer )
            return true;

        return false;
    }
}

class Quiz{
    constructor(questions, students) {
        this.questions = questions;
        this.students = students;
    }

    scoreStudentBySid(sid){
        if(this.students === null || this.students === undefined || this.students.length === 0){
            return 0;
        }

        let result = 0;

        for(let x = 0; x < this.students.length; x++) {
            if (this.students[x].studentId === sid) {
                for (let i = 0; i < this.students[x].answers.length; i++) {
                    for (let j = 0; j < this.questions.length; j++) {
                        if (this.students[x].answers[i].qid === this.questions[j].qid) {
                            if (this.students[x].answers[i].answer === this.questions[j].answer) {
                                result++;
                            }
                            break;
                        }
                    }
                }
            }
        }

        return result;
    }

    getAverageScore(){
        if(this.students === null || this.students === undefined || this.students.length === 0){
            return 0;
        }

        let result = 0;

        this.students.forEach((stu) => result += this.scoreStudentBySid(stu.studentId))
        return result / this.students.length;
    }
}

const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));
const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));
const students = [student1, student2];
const questions =[new Question(1, 'b'), new Question(2, 'a'), new
Question(3, 'b')];
const quiz = new Quiz(questions, students);
let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); //Expected Result: 3
let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); //Expected Result: 2
let average = quiz.getAverageScore();
console.log(average); //Expected Reuslt: 2.5