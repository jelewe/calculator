//button selectors below
const allClearButton = document.querySelector('.allClear').addEventListener('click', allClear);
const backButton = document.querySelector('#backspace').addEventListener('click', backSpace);
const decimalButton = document.querySelector('#decimal').addEventListener('click', addDecimal);
const signButton = document.querySelector('#sign').addEventListener('click',changeSign);
const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(operator => {
        operator.addEventListener('click', operatorFunction)
    });
const equalButton = document.querySelector('.equals').addEventListener('click', equalsFunction);
const digits = document.querySelectorAll('.digit');
    digits.forEach(digit => {
        digit.addEventListener('click', displayFunction)
});

//global variables defined below
const displayScreen = document.querySelector('.display');
let operation = null; //holds the operation (add, divide, etc) selected
let firstOperand = null; //converts the first previousNum to number & saves it for operation, so previousNum can be cleared for reuse
let numValue = ""; //this variable holds the value of number currently entered
let previousNum = ""; //this variable holds previously entered number value as a string

//displays digits selected
function displayFunction() {
if (previousNum.length > 12) {
        return previousNum;
    } else {
    numValue = this.value;
    displayScreen.innerText = previousNum + numValue;
    previousNum = displayScreen.innerText;
    }
    return previousNum;
};

function allClear() {
    previousNum = "";
    firstOperand = null;
    operation = null;
    displayScreen.innerText = "";
};

function backSpace() {
    let newText;
    if (firstOperand === null) {
        newText = displayScreen.innerText.slice(0,-1);
        displayScreen.innerText = newText;
        previousNum = displayScreen.innerText;
    } else {
        newText = String(firstOperand).slice(0,-1);
        displayScreen.innerText = newText
        firstOperand = Number(newText);
    }
};

function addDecimal() {
    if (previousNum.includes(".")) {
        return;
    } else {
        displayScreen.innerText = previousNum + ".";
        previousNum = displayScreen.innerText;
    }
};

function changeSign() {
    if (displayScreen.innerText.includes("-")) {
        displayScreen.innerText = displayScreen.innerText.replace(/\W/, "");
            if (firstOperand !== null) {
                firstOperand = Math.abs(firstOperand);
            }
    } else {
        displayScreen.innerText = "-" + displayScreen.innerText;
            if (previousNum !== "") {
                previousNum = -Math.abs(previousNum);
                previousNum = previousNum.toString();
            } else if (firstOperand !== null) {
                firstOperand = -Math.abs(firstOperand);
            }
    }
};

//stores operation entered to be called upon either when pressing '=' or entering new integer
function operatorFunction() {
    if (firstOperand !== null) {
            equalsFunction();
            operation = this.id;
    } else {
        operation = this.id;
        if (previousNum.includes(".")) {
            firstOperand = parseFloat(previousNum);
        } else {
            firstOperand = Number(previousNum);
        }
        previousNum = "";
    }
};

function equalsFunction() {
    let secondOperand = Number(previousNum);
    previousNum = "";
    if (operation === "add") {
        add(firstOperand,secondOperand);
    } else if (operation === "subtract") {
        subtract(firstOperand,secondOperand);
    } else if (operation === "multiply") {
       multiply(firstOperand,secondOperand);
    }else if (operation === "divide" ) {
        if (secondOperand === 0) {
            displayScreen.innerText = "beep boop cannot compute";
        } else {
        divide(firstOperand,secondOperand);
        }
    }
    operation = null;
};

//operation functions below
function add(num1, num2) {
    let sum;
    sum = num1 + num2;
    if (sum.length < 13) {
        displayScreen.innerText = sum;
    } else {
        sum = String(sum).slice(0,13);
        displayScreen.innerText = sum;
    }; 
    firstOperand = Number(sum);
    return firstOperand;
};

function subtract(num1, num2) {
    let difference;
    difference = num1 - num2;
    if (difference.length < 13) {
        displayScreen.innerText = difference
    } else {
        difference = String(difference).slice(0,13);
        displayScreen.innerText = difference;
    }; 
    firstOperand = Number(difference);
    return firstOperand;
};

function multiply(num1, num2) {
    let product;
    product = num1 * num2;
    if (product.length < 13) {
        displayScreen.innerText = product;
    } else {
        product = String(product).slice(0,13);
        displayScreen.innerText = product;
    }; 
    firstOperand = Number(product)
    return firstOperand;
};

function divide(num1,num2) {
    let quotient;
    quotient = num1 / num2;
    if (quotient.length < 13) {
        displayScreen.innerText = quotient;
    } else {
        quotient = String(quotient).slice(0,13);
        displayScreen.innerText = quotient;
    }; 
    firstOperand = Number(quotient);
    return firstOperand;
};

displayScreen.innerText = `........(^_^).........`;