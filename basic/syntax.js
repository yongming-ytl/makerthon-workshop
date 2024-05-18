/**
 * To test the file, open your terminal and run:
 * cd basic
 * node syntax.js
 */

// let variable
let a = 1;
a = 2;
console.log("a: "+ a);

// const variable
const b = 1;
console.log("b: "+ b);

// arrow function (method)
const sum = (a, b) => a + b;
console.log("sum: "+ sum(1, 2));

// list
const list = [0, 1, 2, 3];
console.log("list: "+ list);

const filteredList = list.filter((item) => item > 1);
console.log("filteredList: "+ filteredList);

