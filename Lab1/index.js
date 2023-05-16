// a) Create an arrow function named “mySum”. 
//    (1) Your function should accept an arbitrary number of arguments using the REST operator.
//    (2) Your function should return the sum of all of its inputs.
const mySumCopy = (...args) => {
    let total = 0;
    for (const arg of args) {
        total += arg;
    }
    return total;
}

// b) Put this function in a different module and export it. 
//    Then, in this module, import the module that contains your function and call it from this module.
import { mySum } from "./mySum.js";
console.log(`Sum of (1, 2, 3): ${mySum(1, 2, 3)}`);

// c) Create an array of numbers named “myArr”. 
//    Your array may have any length (try different lengths to test it). 
const myArr = [1, 3, 5];
const myArr2 = [2, 4, 6, 8, 10];

// d) Call your function passing as arguments the members of myArr array using the SPREAD operator. 
//    Assign the result to a “result” variable and console log it.
const result = mySum(...myArr)
console.log(`result, sum of [1, 3, 5]: ${result}`)

const result2 = mySum(...myArr2)
console.log(`result2, sum of [2, 4, 6, 8, 10]: ${result2}`)

// e) Create a new array named “mySecondArr”. 
//    Map the contents of your myArr array to mySecondArr array using an anonymous function 
//    that multiplies each member of myArr by 2.
const mySecondArr = [];
myArr.map(num => mySecondArr.push(num * 2));
console.log(`mySecondArr: ${mySecondArr}`);

const mySecondArr2 = [];
myArr2.map(num => mySecondArr2.push(num * 2));
console.log(`mySecondArr2: ${mySecondArr2}`);

// f) Filter the contents of your mySecondArr using an anonymous function 
//    that console logs the numbers above average number (you’ll need to find the average first).
const avg = mySum(...mySecondArr) / mySecondArr.length;
console.log(`Average of mySecondArr: ${avg}`)
console.log(`Filtered mySecondArr: ${mySecondArr.filter(num => num > avg)}`);

const avg2 = mySum(...mySecondArr2) / mySecondArr2.length;
console.log(`Average of mySecondArr2: ${avg2}`)
console.log(`Filtered mySecondArr2: ${mySecondArr2.filter(num => num > avg2)}`);

// g) Use setTimeout() function. Pass it a callback function as a parameter that console logs “Goodbye” after 3 seconds.
setTimeout(() => {
    console.log('Goodbye')
}, 3000)

// h) Create an “Employee” object that has the following key-value pairs: “name”, “email”, “department” and “startDate”.  
const Employee ={
    name: 'Jane',
    email: 'aaa@com',
    department: 'Web Development',
    startDate: '2023-05-16'
}
console.log(`Employee: ${JSON.stringify(Employee)}`)

// i) Destructure your object to create a new object, called “Person”, 
//    that only has name and email keys (and the corresponding values).
const {name, email} = Employee;
const Person = {
    name: name,
    email: email
}
console.log(`Person: ${JSON.stringify(Person)}`)