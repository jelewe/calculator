let allClearButton = document.querySelector('.allClear').addEventListener('click', allClear);

let decimalButton = document.querySelector('#decimal').addEventListener('click', addDecimal);

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
    if (previousNum.length > 14) {
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

function addDecimal() {
    if (displayScreen.innerText.includes(".")) {
        return;
    } else {
        displayScreen.innerText = previousNum + ".";
        previousNum = displayScreen.innerText;
    }
}

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

//clears 'previousNum' & 'operation' so user can input more numbers/operations without having to 'all clear' or have operation defined by first operation entered - then calls current operation function
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
    if (sum.length < 15) {
        displayScreen.innerText = sum;
    } else {
        sum = String(sum).slice(0,15);
        displayScreen.innerText = sum;
    }; 
    firstOperand = Number(sum);
    return firstOperand;
};

function subtract(num1, num2) {
    let difference;
    difference = num1 - num2;
    if (difference.length < 15) {
        displayScreen.innerText = difference
    } else {
        difference = String(difference).slice(0,15);
        displayScreen.innerText = difference;
    }; 
    firstOperand = Number(difference);
    return firstOperand;
};

function multiply(num1, num2) {
    let product;
    product = num1 * num2;
    if (product.length < 15) {
        displayScreen.innerText = product;
    } else {
        product = String(product).slice(0,15);
        displayScreen.innerText = product;
    }; 
    firstOperand = Number(product)
    return firstOperand;
};

function divide(num1,num2) {
    let quotient;
    quotient = num1 / num2;
    if (quotient.length < 15) {
        displayScreen.innerText = quotient;
    } else {
        quotient = String(quotient).slice(0,15);
        displayScreen.innerText = quotient;
    }; 
    firstOperand = Number(quotient);
    return firstOperand;
};
