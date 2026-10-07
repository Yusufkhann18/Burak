// /*
// Project Standards:
//   -- Logging Standards
//   -- Naming Standards
//         function,method ,variable=> Camel Case
//         class => Pascal case
//         folder=>KEBAB
//         css=>SNAKE CASE
//   -- Error handling

// */
// /* Rest api
//    graph api
//    traditional api
//  */
// /*

// Q - TASK;

// const obj = { name: "BMW", model: "M3" };
// const str = "model";

// const hasProperty = <T extends object>(obj: T, str: string): boolean => {
//   for (const key of Object.keys(obj)) {
//     if (key === str) {
//       return true;
//     }
//   }
//   return false;
// };

// console.log(hasProperty(obj, str));

// P-TASK
// const obj = { a: 10, b: 20 };

// const objectToArray = (obj: any) => {
//   let result = [];

//   for (const key of Object.keys(obj)) {
//     result.push([key, obj[key]]);
//   }

//   return result;
// };

// console.log(objectToArray(obj));

// O-TASK

// const calculateSumOfNumbers = (array: any[]) => {
//   let i = 0;
//   let result = 0;
//   for (i; i < array.length; i++) {
//     const save = typeof array[i];
//     if (save === "number") {
//       result += array[i];
//     }
//   }
//   return result;
// };

// console.log(calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]));

// N-TASK

// const palindromCheck = (str: string): boolean => {
//   const reversedStr = str.split("").reverse().join("");
//   return str === reversedStr;
// };

// console.log(palindromCheck("dad")); // true
// console.log(palindromCheck("son")); // false

// const palindromeCheck = (str: string) => {
//   let result = "";

//   for (let i = 0; i < str.length; i++) {
//     result = str[i] + result;
//   }

//   console.log("before:", str);
//   console.log("after:", result);
//   console.log("Result:", str === result);
// };

// palindromeCheck("dad");

// M-TASK

// interface type_array {
//   number: number;
//   square: number;
// }

// const getSquareNumbers = (array: number[]): type_array[] => {
//   const result: type_array[] = [];
//   let i = 0;
//   for (i; i < array.length; i++) {
//     let num = array[i];
//     let square = num * num;

//     let obj: type_array = {
//       number: num,
//       square: square,
//     };

//     result[i] = obj;
//   }

//   return result;
// };

// console.log(getSquareNumbers([1, 2, 3]));

// R-task

function calculate(str: string): number {
  return str.split("+").reduce((sum, num) => sum + Number(num), 0);
}

console.log(calculate("1+3")); // 4
console.log(calculate("10+20+5")); // 35
