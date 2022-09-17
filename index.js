let allClearButton = document.querySelector('.allClear').addEventListener('click', allClear);

let operation = null; //holds the operation (add, divide, etc) selected
let firstOperand = null; //converts the first previousNum to number & saves it for operation, so previousNum can be cleared for reuse
let operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(operator => {
        operator.addEventListener('click', operatorFunction)
    });

let equalButton = document.querySelector('.equals').addEventListener('click', equalsFunction);
let secondOperand = null; //holds the second number entered so it can be operated on, and previousNum can be cleared for reuse

let numValue = ""; //this variable holds the value of number currently entered
let previousNum = ""; //this variable holds previously entered number value as a string
let displayScreen = document.querySelector('.display');
let digits = document.querySelectorAll('.digit');
    digits.forEach(digit => {
        digit.addEventListener('click', displayFunction)
});

//displays digits selected, based off fibonacci algorithm
function displayFunction() {
    if (previousNum.length > 22) {
        return previousNum;
    } else {
    numValue = this.value;
    displayScreen.innerText = previousNum + numValue;
    previousNum = displayScreen.innerText;
    }
    return previousNum;
};

function allClear() {
    previousNum ="";
    firstOperand =null;
    secondOperand = null;
    operation = null;
    displayScreen.innerText ="";
};

//stores operation entered to be called upon pressing '='
function operatorFunction() {
    if (firstOperand !== null) {
            equalsFunction();
            operation = this.id;
    } else {
        operation = this.id;
        firstOperand = Number(previousNum);
        previousNum = "";
        if (operation === "divide") {
            displayScreen.innerText = `${firstOperand} ÷`;
        } else if (operation=== "multiply") {
            displayScreen.innerText = `${firstOperand} ×`;
         } else if (operation === "subtract") {
            displayScreen.innerText = `${firstOperand} -`;
        } else {
            displayScreen.innerText = `${firstOperand} +`;
        }
    }
};

//calls correct operation function and clears previous value variable so user can enter more numbers without having to 'all clear'
function equalsFunction() {
    let secondOperand = Number(previousNum);
    previousNum = "";
    if (operation === "add") {
        add(firstOperand,secondOperand);
    } else if (operation === "subtract") {
        subtract(firstOperand,secondOperand);
    } else if (operation === "multiply") {
       multiply(firstOperand,secondOperand);
    }else {
        if (secondOperand === 0) {
            displayScreen.innerText = "beep boop cannot compute";
        } else {
        divide(firstOperand,secondOperand);
        }
    }
};

//operation functions below
function add(num1, num2) {
    let sum;
    sum = num1 + num2;
    displayScreen.innerText = sum;
    firstOperand = sum;
    console.log(firstOperand);
    return firstOperand;
};

function subtract(num1, num2) {
    let difference;
    difference = num1 - num2;
    displayScreen.innerText = difference;
    firstOperand = difference;
    console.log(firstOperand);
    return firstOperand;
};

function multiply(num1, num2) {
    let product;
    product = num1 * num2;
    displayScreen.innerText = product;
    firstOperand = product;
    console.log(firstOperand);
    return firstOperand;
};

function divide(num1,num2) {
    let quotient;
    quotient = num1 / num2;
    displayScreen.innerText = quotient;
    firstOperand = quotient;
    console.log(firstOperand);
    return firstOperand;
};