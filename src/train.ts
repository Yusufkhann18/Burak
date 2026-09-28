/* Project Standards:
- Logging standards
- Naming standards:
function, method, variable = CAMEL
class => PASCAL folder => KEBAB css => SNAKE
- Error handling standards
*/

/* 
Traditinal Api
Rest Api
GraphQL Api
...
*/












// M TASK

// function getSquareNumbers(arr: number[]){
//     let result: { number: number; square: number }[] = [];
//     for (let i = 0; i < arr.length; i++) {
//        let number = arr[i];
//         let square = number * number;
//        result.push({ number, square });

       
//     }
//     return result;
// }

// console.log(getSquareNumbers([1, 2, 3, 4, 5])); 

//N-TASK

// Shunday function yozing, u string qabul qilsin va string palindrom yani togri oqilganda ham, 
// orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin. 
// MASALAN: palindromCheck("dad") return true; palindromCheck("son") return false.

// function palindromCheck(str: string): boolean {
//     const reversedStr = str.split("").reverse().join("");
//     return str === reversedStr;
// }

// console.log(palindromCheck("dad")); // true
// console.log(palindromCheck("son")); // false    

// O TASK

function calculateSumOfNumbers(arr: any[]): number {
    let sum = 0;

    for (const value of arr) {
        if (typeof value === "number") {
            sum += value;
        }
    }

    return sum;
}

console.log(
    calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]) //45 
);

