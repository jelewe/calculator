let allClearButton = document.querySelector('.allClear').addEventListener('click', allClear);

let operation = ""; //this variable holds the operation (add, divide, etc) selected
let firstOperand = ""; //this value holds the previous number so previousNum can be cleared for reuse
let operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(operator => {
        operator.addEventListener('click', operatorFunction)
    });

let equalButton = document.querySelector('.equals').addEventListener('click', equalsFunction);
let secondOperand = ""; //this value holds the second number entered so previousNum can be cleared for reuse

let displayValue = ""; //this variable holds the value of number currently entered
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
    displayValue = this.value;
    displayScreen.innerText = previousNum + displayValue;
    previousNum = displayScreen.innerText;
    }
    return previousNum;
};

function allClear() {
    previousNum ="";
    firstOperand ="";
    secondOperand = "";
    operation = "";
    displayScreen.innerText ="";
};

//stores operation entered to be called upon pressing '='
function operatorFunction() {
    firstOperand = Number(previousNum);
    previousNum = "";
    if (this.className === "operator divide") {
        displayScreen.innerText = `${firstOperand} ÷`;
        operation = "divide";
        return operation;
    } else if (this.className === "operator multiply") {
        displayScreen.innerText = `${firstOperand} ×`;
        operation = "multiply";
        return operation;
    } else if (this.className === "operator subtract") {
        displayScreen.innerText = `${firstOperand} -`;
        operation = "subtract";
        return operation;
    } else {
        displayScreen.innerText = `${firstOperand} +`;
        operation = "add"
        return operation;
    }
};

//calls correct operation function and clears previous value variable so user can enter more numbers without having to 'all clear'
function equalsFunction() {
    let secondOperand = Number(previousNum);
    if (operation === "add") {
        add(firstOperand,secondOperand);
    } else if (operation === "subtract") {
        subtract(firstOperand,secondOperand);
    } else if (operation === "multiply") {
       multiply(firstOperand,secondOperand);
    }else {
        divide(firstOperand,secondOperand);
    }
    previousNum = "";
};

//operation functions below
function add(num1, num2) {
    let sum;
    sum = num1 + num2;
    displayScreen.innerText = sum;
};

function subtract(num1, num2) {
    let difference;
    difference = num1 - num2;
    displayScreen.innerText = difference;
};

function multiply(num1, num2) {
    let product;
    product = num1 * num2;
    displayScreen.innerText = product;
};

function divide(num1,num2) {
    let quotient;
    quotient = num1 / num2;
    displayScreen.innerText = quotient;
};