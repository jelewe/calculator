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

//global variables
const displayScreen = document.querySelector('.display');
let operation = null; //holds the operation (add, divide, etc) selected
let firstOperand = null; //converts the first previousNum to number & saves it for operation, so previousNum can be cleared for reuse
let numValue = ""; //holds the value of number currently entered
let previousNum = ""; //holds previously entered number value as a string
let total = null;

//keyboard support 
document.addEventListener('keydown', (event) => {
    if(event.key ==  "0") {keyValue()}
    else if(event.key ==  "1") {keyValue()}
    else if(event.key ==  "2") {keyValue()}
    else if(event.key ==  "3") {keyValue()}
    else if(event.key ==  "4") {keyValue()}
    else if(event.key ==  "5") {keyValue()}
    else if(event.key ==  "6") {keyValue()}
    else if(event.key ==  "7") {keyValue()}
    else if(event.key ==  "8") {keyValue()}
    else if(event.key ==  "9") {keyValue()}
    else if(event.key == "Backspace") {backSpace()}
    else if(event.key == ".") {addDecimal()}
    else if(event.key == "Enter") {equalsFunction()}
    else if(event.key == "+") {this.id = "add"; operatorFunction()}
    else if(event.key == "-") {this.id = "subtract"; operatorFunction()}
    else if(event.key == "*") {this.id = "multiply"; operatorFunction()}
    else if(event.key == "/") {this.id = "divide"; operatorFunction()}
})

function keyValue() {
    let keyNum;
    keyNum = event.key;
    if (previousNum.length > 12) {
        return previousNum;
    } else {
        if (total !== null) {
            total = null;
        }
    displayScreen.innerText = previousNum + keyNum;
    previousNum = displayScreen.innerText;
    }
    return previousNum;
};

function displayFunction() {
    if (previousNum.length > 12) {
        return previousNum;
    } else {
        if (total !== null) {
            total = null;
        }
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
    total = null;
    displayScreen.innerText = "";
};

function backSpace() {
    let newText;
    if (total === null) {
        newText = displayScreen.innerText.slice(0,-1);
        displayScreen.innerText = newText;
        previousNum = displayScreen.innerText;
    } else {
        newText = String(total).slice(0,-1);
        displayScreen.innerText = newText
        total = Number(newText);
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
            if (total !== null) {
                total = Math.abs(total);
            }
    } else {
        displayScreen.innerText = "-" + displayScreen.innerText;
            if (previousNum !== "") {
                previousNum = -Math.abs(previousNum);
                previousNum = previousNum.toString();
            } else if (total !== null) {
                total = -Math.abs(total);
            }
    }
};

//stores operation entered to be called upon either when calling equals or entering new integer
function operatorFunction() {
    if (total !== null) {
            firstOperand = total;
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
    return firstOperand;
};

function equalsFunction() {
    let secondOperand = Number(previousNum);
    previousNum = "";
    if (operation == "add") {
        add(firstOperand,secondOperand);
    } else if (operation == "subtract") {
        subtract(firstOperand,secondOperand);
    } else if (operation == "multiply") {
       multiply(firstOperand,secondOperand);
    }else if (operation == "divide" ) {
        if (secondOperand === 0) {
            displayScreen.innerText = "beep boop cannot compute";
        } else {
        divide(firstOperand,secondOperand);
        }
    }
    operation = null;
    event.preventDefault();
};

//operation functions below
function add(num1, num2) {
    let sum = num1 + num2;
    sum = String(sum).slice(0,13);
    displayScreen.innerText = sum;
    total = Number(sum);
    return total;
};

function subtract(num1, num2) {
    let difference = num1 - num2;
    difference = String(difference).slice(0,13);
    displayScreen.innerText = difference;
    total = Number(difference);
    return total;
};

function multiply(num1, num2) {
    let product = num1 * num2;
    product = String(product).slice(0,13);
    displayScreen.innerText = product;
    total = Number(product)
    return total;
};

function divide(num1,num2) {
    let quotient = num1 / num2;
    quotient = String(quotient).slice(0,13);
    displayScreen.innerText = quotient;
    total = Number(quotient);
    return total;
};

displayScreen.innerText = `..........(^_^)...........`