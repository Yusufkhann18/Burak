// X - task
function countOccurrences(obj: object, key: string): number {
  let count = 0;

  for (const [property, value] of Object.entries(obj)) {
    if (property === key) {
      count++;
    }

    if (typeof value === "object" && value !== null) {
      count += countOccurrences(value, key);
    }
  }

  return count;
}

console.log(
  countOccurrences(
    {
      model: "Bugatti",
      steer: {
        model: "HANKOOK",
        size: 30,
      },
    },
    "model",
  ),
); // 2

// w-task
// function chunkArray<T>(arr: T[], size: number): T[][] {
//   if (!Number.isInteger(size) || size <= 0) {
//     throw new Error("Bo‘lak uzunligi musbat butun son bo‘lishi kerak.");
//   }

//   const result: T[][] = [];

//   for (let i = 0; i < arr.length; i += size) {
//     result.push(arr.slice(i, i + size));
//   }

//   return result;
// }

// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));
// [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
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
