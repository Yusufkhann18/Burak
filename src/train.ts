// Z-TASK

// const sumEvens = (arr: number[]) => {
//   let result = 0;
//   for (const ele of arr) {
//     if (ele % 2 === 0) {
//       result += ele;
//     }
//   }
//   return result;
// };
// console.log(sumEvens([2, 3, 5, 4, 1]));

// Y-TASK
// const findIntersection = (arr1: number[], arr2: number[]): number[] => {
//   const result: number[] = [];
//   const a: number[] = [];
//   for (const ele of arr1) {
//     if (arr2.includes(ele)) {
//       result.push(ele);
//     }
//   }

//   return result;
// };

// console.log(findIntersection([1, 2, 3], [3, 2, 0]));
// // X-task

// const countOccurrences = (obj: any, str: string) => {
//   let count = 0;
//   for (const key in obj) {
//     if (key === str) {
//       count++;
//     }
//     if (typeof obj[key] == "object" && obj[key] !== null) {
//       for (const key2 in obj[key]) {
//         if (key2 === str) {
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// };
// console.log(
//   countOccurrences(
//     {
//       model: "Bugatti",
//       steer: { model: "HANKOOK", size: 30 },
//       door: { model: "HANKOOK", size: 30 },
//     },
//     "model",
//   ),
// );

// // w-TASK
// const chunkArray = (arr: number[], num: number) => {
//   const result = [];
//   for (let i = 0; i <= arr.length; i += num) {
//     const slice = arr.slice(i, i + num);
//     result.push(slice);
//   }
//   return result;
// };

// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));

// V-TASK
// OBJECT version
// const countChars = (arr: any) => {
//   const splitted = arr.split("").sort();
//   let result: any = {};
//   let count = 1;
//   for (let i = 0; i < splitted.length; i++) {
//     if (splitted[i] === splitted[i + 1]) {
//       count++;
//     } else {
//       result[splitted[i]] = count;
//       count = 1;
//     }
//   }
//   return result;
// };
// console.log(countChars("Hello"));

//  STRIGN VERSION
// const countChars = (arr: any) => {
//   const splitted = arr.split("").sort().join("");
//   let result = "";
//   let count = 1;
//   for (let i = 0; i < splitted.length; i++) {
//     if (splitted[i] === splitted[i + 1]) {
//       count++;
//     } else {
//       result += splitted[i] + count;
//       count = 1;
//     }
//   }
//   return result;
// };
// console.log(countChars("Hello"));

// U-task

// const sumOdds = (number: number) => {
//   let count = 0;
//   for (let i = 0; i < number; i++) {
//     if (i % 2 !== 0) {
//       count++;
//     }
//   }

//   return count;
// };
// console.log(sumOdds(9));

// T-TASK
// const mergeSortedArrays = (arr1: number[], arr2: number[]) =>
//   arr1.concat(arr2).sort((a, b) => a - b);

// // Testing
// console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));
// const mergeSortedArrays = (arr1: number[], arr2: number[]) => {
//   const result: number[] = [];

//   for (const ele of arr1) {
//     result.push(ele);
//   }
//   for (const ele of arr2) {
//     result.push(ele);
//   }

//   result.sort((a, b) => a - b);

//   const final = `[${result.join(", ")}]`;

//   return final;
// };

// console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));

// S-TASK

// const calculate = (num: number[]): string => {
//   const sorted: number[] = num.sort((a, b) => a - b);

//   let result: number[] = [];
//   let i: number = 0;

//   for (i; i < sorted.length - 1; i++) {
//     let current: number = sorted[i];
//     let next: number = sorted[i + 1];

//     for (let a: number = current + 1; a < next; a++) {
//       result.push(a);
//     }
//   }

//   return result.toString();
// };

// console.log(calculate([5, 0, 1]));

//

// R-task
// const calculate = (str: string) => {
//   const splitted = str.split("+");
//   let result = 0;
//   console.log(splitted);
//   for (const i of splitted) {
//     const num = parseInt(i);
//     result += num;
//   }
//   return result;
// };

// console.log(calculate("1+3+5223123+7+213231"));

// Q-TASK

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

//     throw new Error("Bo‘lak uzunligi musbat butun son bo‘lishi kerak.");


// Imported practice implementations from burak-develop.
/*
Project Standards:
1. Logging Standards
2. Naming Standards:
  camelCase: functions, methods, variables
  PascalCase: classes
  kebab-case: folders, files
  snake_case: css
3. Error Handling
*/

/*
API Turlari:
1. Traditional API
2. Rest API
3. GraphQL API
4...
*/

/*
Traditional Front-end Dev: SSR with EJS
Modern Front-end Dev: SPA with REACT
*/

/*
SESSIONlar xislatlari:
1. request join
2. self destroy
*/

/*
VALIDATIONS:
1. Front-End Validation
2. Back-End Validation
3. Data-Base Validaion
*/

// MITASK-Z
// Define the Function
function sumEvens(arr: number[]): number {
  return arr.reduce((sum, num) => num % 2 === 0 ? sum + num : sum, 0);
}

// Testing
console.log(sumEvens([1, 2, 3])); // 2
console.log(sumEvens([1, 2, 3, 4, 5, 6])); // 12

// MITASK-Y
// Define the Function
function findIntersection(arr1: number[], arr2: number[]) {
  const set1 = new Set(arr1);
  return arr2.filter(item => set1.has(item));
}

// Testing
console.log(findIntersection([1, 2, 3], [3, 2, 0])); // [3, 2]


// MITASK-X
// Define the Function
function countOccurrences(obj: Record<string, any>, keyToFind: string): number {
  let count = 0;

  // Return 0 if the input is not a valid object or is null
  if (typeof obj !== 'object' || obj === null) {
      return count;
  }

  for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          // Increment count if the key matches
          if (key === keyToFind) {
              count++;
          }

          // Recursively search if the value is a nested object
          if (typeof obj[key] === 'object' && obj[key] !== null) {
              count += countOccurrences(obj[key], keyToFind);
          }
      }
  }

  return count;
}

// Example Usage:
const carData = {
  model: 'Bugatti',
  steer: {
      model: 'HANKOOK',
      size: 30,
      details: {
          model: 'X-Version'
      }
  }
};

// Testing
console.log(countOccurrences(carData, 'model')); // Output: 3


// MITASK-W
// Define the Function
function chunkArray(arr: number[], num: number): number[][]{
  const multArr: number[][] = [];
  let start = 0;
  let end = num;
  const loopNum = Math.ceil(arr.length/num);

  for (let i = 0; i < loopNum; i++){
      multArr.push(arr.slice(start, end));
      start = end;
      end += num;
  }
  return multArr;
}

function chunkArray2(arr: number[], num: number): number[][]{
  const multArr: number[][] = [];

  for (let i = 0; i < arr.length; i += num){
      multArr.push(arr.slice(i, i + num));
  }
  return multArr;
}

// Testing
// console.log(chunkArray([1,2,3,4,5,6,7,8,9,10], 4));
// console.log(chunkArray2([1,2,3,4,5,6,7,8,9,10], 4));

// MITASK-V
// Define the Function
function countChars(str: string){
  let obj: Record<string, number> = {};
  for (const char of str){
      if (char in obj){
          obj[char] += 1;
      } else {
          obj[char] = 1;
      }
  }
  return obj;
}

// Testing
// console.log(countChars("hello")); // { h: 1, e: 1, l: 2, o: 1 }
// console.log(countChars("successfully")); // { s: 3, u: 2, c: 2, e: 1, f: 1, l: 2, y: 1 }

// MITASK-U
// Define the Function
// The best
const sumOddsBitwise = (num: number): number => num >> 1;
// Really good
const sumOdds = (num: number): number => Math.floor(num/2);

// Testing
// console.log(sumOdds(9))  // 4 odds
// console.log(sumOddsBitwise(11)) // 5 odds

// MITASK-T
// Define the Function
const mergeSortedArrays = (arr1: number[], arr2: number[]) =>
  (arr1.concat(arr2)).sort((a, b) => a - b);

// Testing
// console.log(mergeSortedArrays([0,3,4,31], [4,6,30])); // [0,3,4,4,6,30,31]
// console.log(mergeSortedArrays([1,3,5,7,9], [2,4,6,8])); // [1,2,3,4,5,6,7,8,9]

// MITASK-S
// Define the Function
const missingNumber = (arr: number[]) => {
  arr.sort((a, b) => a - b);

  let first = arr[0];
  let last = arr[arr.length-1];

  while (first < last){
    if (!arr.includes(first)){
      return first;
    }
    first++
  }
  return arr.length;
};

// Testing
// console.log(missingNumber([3, 0, 1])); // 2 is missing
// console.log(missingNumber([3, 4, 6, 2, 5, 9, 7, 1])); // 8 is missing
// console.log(missingNumber([0, 1, 2, 3])); // none is missing; returns n-th
// console.log(missingNumber([4, 5, 8, 7])); // 6 is missing

// WRONG SOLUTION
const missingNumbers = (arr: number[]) => {

  let first = arr[0];
  let last = arr[arr.length-1];
  let newArr = [];

  if ( first > last ) {
    while ( first >= last ) {
      newArr.push( first );
      first--;
    }
  } else if ( first < last ) {
    while( first <= last ) {
      newArr.push( first );
      first++;
    }
  } else {
    return "Invalid argument: First and last elements cannot be equal."
  }
  return newArr;
}

// Testing
// console.log(missingNumbers([3, 0, 1])); // [ 3, 2, 1 ]
// console.log(missingNumbers([5, 3, 1])); // [ 5, 4, 3, 2, 1 ]
// console.log(missingNumbers([5, 0, 1])); // [ 5, 4, 3, 2, 1 ]
// console.log(missingNumbers([1, 0, 0, 5])); // [ 1, 2, 3, 4, 5 ]
// console.log(missingNumbers([5, 0, 0, 0, 5])); // Invalid argument...


// MITASK-R
// Define the Function
// ikta bir-xonali son va qo'shish; 1+2
const calculate1 = (str: string): number => Number(str[0])+Number(str[2]);

// ikta ko'p-xonali son va qo'shish 10+20
const calculate2 = (str: string): number => {
  const [a, b] = str.split('+');
  return Number(a) + Number(b);
};

// ko'p ko'p-xonali son va ko'p qo'shish; 10+2+3
const calculate3 = (str: string): number => {
  const arr = str.split('+');
  let sum = 0;
  for(const char of arr){
    sum += Number(char);
  }
  return(sum);
};

// Testing
// console.log(calculate1("1+2")); // 3
// console.log(calculate2("10+20")); // 30
// console.log(calculate3("10+2+3")); // 15


// MITASK-Q
// Define the Function
const hasProperty = (obj: object, str: string): boolean => str in obj;

// Define the car object
const carObj = {name: "BMW", model: "M3"};

// Testing
// console.log(hasProperty(carObj, "name"))
// console.log(hasProperty(carObj, "model"))
// console.log(hasProperty(carObj, "year"))
// console.log(hasProperty(carObj, "price"))

// MITASK-P
// Define the interface
interface myObj{
  a: number;
  b: number;
}
// Define the function
function objectToArray(obj: myObj){
  let newArr = [];
  for (let [key, value] of Object.entries(obj)){
    newArr.push([key, value]);
  }
  return newArr;
}

// Define the object
const obj = {a: 10, b: 20}

// Testing
//console.log(objectToArray(obj))


// MITASK-O
// Function declaratioin
function calculateSumOfNumbers(arr: unknown[]): number{
  let sum = 0;
  for (const elem of arr){
    if(typeof elem === 'number'){
      sum += elem
    }
  }
  return sum
}

// Array examples
const arr0926 = [10, "10", {son: 10}, true, 35]  // 45
const arr0927 = [5, "10", 15, {son: 10}, false, 25, true, 35] // 80

// Testing
//console.log(calculateSumOfNumbers(arr0926))
//console.log(calculateSumOfNumbers(arr0927))


// MITASK-N
// Function Declaration

// 3rd attampt
function palindromeCheck(str: string): boolean{
  return str.split("").reverse().join("") === str
}

// 2rd attampt
function palindromeCheck2(str: string): boolean{
  const reverseStr: string = str.split("").reverse().join("");
  return reverseStr === str;
}

// 1rd attampt
function palindromeCheck3(str: string): boolean{
  let arr: string[] = str.split("");
  const arr_length: number = arr.length;
  let new_arr = [];
  for (let i = 0; i < arr_length; i++){
      new_arr.push(arr.pop())
  }
  return new_arr.join("") === str;
}

// // Testing
// // palindromeCheck 1
// console.log(palindromeCheck("dad")) // true
// console.log(palindromeCheck("son")) // false

// // palindromeCheck 2
// console.log(palindromeCheck2("radar")) // true
// console.log(palindromeCheck2("camera")) // false

// // palindromeCheck 3
// console.log(palindromeCheck3("2002")) // true
// console.log(palindromeCheck3("2001")) // false

// New array
const arr0920 = [1, 2, 3, 4];

// Define the structure of the objects inside final array
interface NumberSquare {
    number: number;
    square: number;
  }

  // Add types to the parameter (number[]) and return type (NumberSquare[])
  function getSquareNumbers(arr: number[]): NumberSquare[] {
    let newArr: NumberSquare[] = [];

    for (const elem of arr) {
      // Initialize the object matching interface shape directly
      let newObj: NumberSquare = {
        number: elem,
        square: elem * elem
      };

      newArr.push(newObj);
    }

    return newArr;
  }


// Testing
// console.log(getSquareNumbers(arr0920));

export {};
