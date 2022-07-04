const student = {
    inputNewGrade: function(newGrade){
        this.grades.push(newGrade);
    },

    computeAverageGrade: function(){
        if (this.grades === null || this.grades === undefined || this.grades.length === 0){
            return 0;
        }

        return this.grades.reduce((sum, current) => sum + current, 0) / this.grades.length;
    }
};

const stuArr = [];

let stu1 = Object.create(student);
stu1.fname = 'Hong Phuc';
stu1.lname = 'Thai';
stu1.grades = [10, 10, 10];
stu1.inputNewGrade(10);
stuArr.push(stu1);

let stu2 = Object.create(student);
stu2.fname = 'Tan Phat';
stu2.lname = 'Nguyen';
stu2.grades = [9, 10, 9];
stu2.inputNewGrade(10);
stuArr.push(stu2);

console.log(stuArr.reduce((sum, current) => sum + current.computeAverageGrade(),0) / stuArr.length);
// stuArr.forEach(stu => {
//     console.log(stu);
//     console.log(stu.computeAverageGrade());
// });