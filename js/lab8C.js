//Question 3: Add a new method named sort() without parameters

Array.prototype.mySort = function(){
    let arr = this;
    let len = arr.length;

    for (let i = len - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (arr[j - 1] > arr[j]) {
                let temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}

console.log([11, 5, 1, 4, 7, 2].mySort());