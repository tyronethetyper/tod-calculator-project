function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

let num_1;
let num_2;
let operator;
let result;
let final_result;
let operating = false;

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
let displayInt = Number(document.getElementsByTagName("p")[0].textContent);

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
clearButton.addEventListener('click', clear)

function numberClick(event) {
    const button = event.target;
    const number = button.textContent;
    if (displayInt === 0) {
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
    console.log(`Num 1: ${num_1}`)
    console.log(`Num 2: ${num_2}`)
    console.log(`Result: ${result}`)
}

function equalsClick(event) {
    operating = false;
    if (!num_2) {
        num_2 = displayInt;
        result = operate(operator, num_1, num_2);
    }
    else {
        num_2 = displayInt;
        result = operate(operator, result, num_2);
    }
    displayNumber.textContent = `${result}`;
}

function clear(event) {
    num_1 = null;
    num_2 = null;
    result = null;
    displayInt = 0;
    displayNumber.textContent = "0";
}