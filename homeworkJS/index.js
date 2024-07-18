
// FUNCTIONS ------------------------------------------------------------------
// Напишіть функцію, яка приймає два числа і повертає їх суму.

function sumNumbers (num1, num2){
    return num1 + num2
}
// console.log(sumNumbers(4,2))


// Напишіть функцію, яка приймає рядок і повертає його в верхньому регістрі.
function toUpper (someString){
    return someString.toUpperCase()
}
// console.log(toUpper('word'))


// Напишіть функцію, яка приймає масив чисел і повертає новий масив з квадратами цих чисел.
function square(arr){
    return arr.map(e => e*e)
}
// console.log(square([1, 4, 5]))


// async/await-----------------------------------------------------------------------------------
// Створіть асинхронну функцію, яка повертає "Hello, World!" через 1 секунду.
// Викличте цю функцію і виведіть результат в консоль.
// Використовуйте try/catch для обробки помилки в асинхронній функції, яка кидає помилку.
function resolveAfterOneSecond(){
    return new Promise((resolve) => {
        setTimeout(function(){
            resolve('Hello, world!')
        }, 1000)
    })
}


async function aThinkFunc(){
    try{
        let result =  await resolveAfterOneSecond()
        console.log(result)
    }
    catch(err){
        console.error(err, "something went wrong")
    }
}
// aThinkFunc()


// Variables and Data Types---------------------------------------

// Створіть змінну, яка зберігає ім'я користувача. Виведіть значення цієї змінної в консоль.
const myName = 'Nikita'
// console.log(myName)

// Створіть змінну, яка зберігає вік користувача. Перетворіть цю змінну на рядок і виведіть тип цієї змінної в консоль.
const myAge = 23
const strAge = toString(myAge)
// console.log(typeof strAge)

// Створіть змінну, яка зберігає число "10" і додайте до нього рядок "20". Виведіть результат і його тип.
const num = 10 
const sum = num + '20'
// console.log(sum)



// Arrays ------------------------------------------------------
// Створіть масив з трьох імен. Додайте нове ім'я до кінця масиву і виведіть його.
const namesArray = ['mike', 'Jhon', 'Tom']
namesArray.push('Teo')
const namesArrayTwo = [...namesArray, 'Luke']
// console.log(namesArray)
// console.log(namesArrayTwo)

// Видаліть перший елемент масиву і виведіть його.
namesArray.shift()
// console.log(namesArray)

// Знайдіть індекс елемента зі значенням "John" в масиві ["Mike", "John", "Sara"].
const newArr = ["Mike", "John", "Sara"]
const nameIndex = newArr.findIndex(el => el === "John")
// console.log(nameIndex)

// Promises -------------------------------------------------
// Створіть проміс, який резолвиться через 2 секунди з повідомленням "Promise resolved!".
function resolveAfterTwoSeconds() {
    return new Promise((resolve) =>{
        setTimeout(function(){
            resolve("Promise resolved")
        }, 2000)
    })
}
// Використовуйте then для виведення повідомлення, коли проміс буде резолвлено.
resolveAfterTwoSeconds()
    .then(result => console.log(result))
// Створіть проміс, який відхиляється з помилкою "Promise rejected!" та обробіть цю помилку за допомогою catch.
function rejectPromise(){
    return new Promise((reject) => {
        reject(new Error('something went wrong'))
    })
}


rejectPromise()
.then(result => console.log(result))
.catch((err) => console.log(err))

// Objects --------------------------------------------------
// Створіть об'єкт, який представляє книгу з властивостями title, author та year.
const book = {
    title: 'Some book',
    year: '1944',
    author: 'Leo DiCaprio'
}
// Додайте нову властивість genre до об'єкта книги.
book.genre = "fantasy"

// Видаліть властивість year з об'єкта книги.

delete book.year

// console.log(book)