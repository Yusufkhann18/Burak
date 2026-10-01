/*
Project Standards:
  -- Logging Standards
  -- Naming Standards
        function,method ,variable=> Camel Case 
        class => Pascal case              
        folder=>KEBAB
        css=>SNAKE CASE
  -- Error handling
      
*/
/* Rest api
   graph api
   traditional api
 */

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

//Q-task

function hasProperty(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

console.log(hasProperty({ name: "BMW", model: "M3" }, "model")); // true
console.log(hasProperty({ name: "BMW", model: "M3" }, "year")); // false
