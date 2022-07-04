const sum = function(arr){
    return arr
            .filter(s => s > 20)
            .reduce((sum, s)=>sum+s, 0)
};

const getNewArray = function(arr){
    return arr
        .filter(s => s.length > 5 && s.includes('a'))
};

console.log(sum([2, 20, 3, 4, 5]));
console.log(sum([1, 2, 3, 30, 40]));
console.log(sum([21, 20, 3, 30, 40]));

console.log(getNewArray(['abc', 'bba111', '111111bbc', 'ccd', 'dda', 'nnnaddd']));