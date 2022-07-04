//Question 2: Redo question 1 using constructor function

function Student(firstName, lastName, grades) {
    this.firstName = firstName;
    this.lastName = lastName;
    if(grades === null || grades === undefined){
        this.grades = [];
    }else {
        this.grades = grades;
    }
}

Student.prototype.inputNewGrade = function(newGrade){
    this.grades.push(newGrade);
};

Student.prototype.computeAverageGrade = function(){
    if (this.grades === null || this.grades === undefined || this.grades.length === 0){
        return 0;
    }

    return this.grades.reduce((sum, current) => sum + current, 0) / this.grades.length;
}
const stuArr = [];

let stu1 = new Student('Hong Phuc', 'Thai', [10, 10, 10]);
stu1.inputNewGrade(10);
stuArr.push(stu1);

let stu2 = new Student( 'Tan Phat', 'Nguyen', [9, 10, 9]);
stu2.inputNewGrade(10);
stuArr.push(stu2);

console.log(stuArr.reduce((sum, current) => sum + current.computeAverageGrade(),0) / stuArr.length);
// stuArr.forEach(stu => {
//     console.log(stu);
//     console.log(stu.computeAverageGrade());
// });