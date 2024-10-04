function add(a, b) {
    return Math.round((a + b) * 1000000) / 1000000; 
}

function subtract(a, b) {
    return Math.round((a - b) * 1000000) / 1000000;
}

function divide(a, b) {
    return Math.round((a / b) * 1000000) / 1000000;
}

function multiply(a, b) {
    return Math.round((a * b) * 1000000) / 1000000;
}

let num_1;
let num_2 = null;
let operator;
let result;
let final_result;
let operating = false;
let numbers = 0;

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    }
    else if (operator === "-") {
        return subtract(a, b);
    }
    else if (operator === "/") {
        return divide(a, b);
    }
    else if (operator === "*") {
        return multiply(a, b);
    }
}

const displayNumber = document.getElementsByTagName("p")[0];
let displayInt = null;

const buttons = Array.from(document.getElementsByClassName("number"));
buttons.forEach(button => {
    button.addEventListener('click', numberClick);
})

const operators = Array.from(document.getElementsByClassName("operator"));
operators.forEach(operator => {
    operator.addEventListener('click', operatorClick);
})

const equalsButton = document.getElementsByClassName("equals")[0];
equalsButton.addEventListener('click', equalsClick);

const clearButton = document.getElementsByClassName("clear")[0];
clearButton.addEventListener('click', clear);

const decimalButton = document.getElementsByClassName("point")[0];
decimalButton.addEventListener('click', addDecimal);

const percentButton = document.getElementsByClassName("percentage")[0];
percentButton.addEventListener('click', percentage);

const plusMinusButton = document.getElementsByClassName("plusMinus")[0];
plusMinusButton.addEventListener('click', plusMinus);

function numberClick(event) {
    const button = event.target;
    const number = button.textContent;
    (numbers >= 1) ? numbers++ : numbers;
    if (displayInt === null || displayInt === 0) {
        displayNumber.textContent = number;
        displayInt = Number(displayNumber.textContent);
    }
    else if (displayNumber.textContent.length > 9) {
        return;
    }
    else {
        displayNumber.textContent = displayNumber.textContent + number;
        displayInt = Number(displayNumber.textContent);
    }
}

function operatorClick(event) {

    if (!num_1 && !result) {
        num_1 = Number(displayNumber.textContent);
    }
    else if (num_1 && !operating && !result) {
        num_2 = displayInt;
        result = operate(operator, num_1, num_2);
        displayNumber.textContent = `${result}`;
        operating = true;
    }
    else if (operating) {
        num_2 = displayInt;
        result = operate(operator, result, num_2);
        displayNumber.textContent = `${result}`;
    }
    operator = event.target.textContent;
    displayInt = 0;
    numbers++;
}

function equalsClick(event) {
    operating = false;
    if (!operator || numbers < 2) {
        return;
    }
    if (!num_2) {
        num_2 = Number(displayNumber.textContent);
        result = operate(operator, num_1, num_2);
    }
    else {
        num_2 = displayInt;
        result = operate(operator, result, num_2);
    }
    if (result === Infinity) {
        displayNumber.textContent = `Not possible!`;
        return;
    }
    displayNumber.textContent = `${result}`;
}

function clear(event) {
    num_1 = null;
    num_2 = null;
    result = null;
    displayInt = null;
    numbers = 0;
    displayNumber.textContent = "0";
}

function addDecimal(event) {
    let display = displayNumber.textContent;
    if (display.includes(".")) {
        return;
    }
    displayNumber.textContent = display + ".";
    displayInt = displayNumber.textContent;
}

function percentage(event) {
    let number = displayNumber.textContent;
    number = number / 100;
    displayNumber.textContent = number;
    displayInt = number;
}

function plusMinus(event) {
    let number = displayNumber.textContent;
    number *= -1;
    displayNumber.textContent = number;
    displayInt = number;
}