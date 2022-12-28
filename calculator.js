var operator;
var num1 = 0;
var num2 = 0;
var firstComputed = false;
var secondComputed = false;

function updateResScreen() {
    const res_screen = document.querySelector(".result-screen");
    if (!firstComputed) {
        res_screen.innerText = num1;
    } else {
        res_screen.innerText = num2;
    }
}

function appendDigit(digit) {
    if (!firstComputed) {
        num1 = num1 * 10 + digit;
    } else {
        secondComputed = true;
        num2 = num2 * 10 + digit;
    }

    console.log(`${digit} button was clicked`);
    updateResScreen()
}

function removeDigit() {
    let number;
    if (!firstComputed) {
        number = num1;
    } else {
        number = num2;
    }

    number = Math.trunc(number / 10);

    if (!firstComputed) {
        num1 = number;
    } else {
        num2 = number;
    }

    console.log("A digit was removed");
    updateResScreen();
}

function clearNum() {
    if (!firstComputed) {
        num1 = 0;
    } else {
        num2 = 0;
    }

    console.log("A number was cleared");
    updateResScreen()
}

function setOperator(operation) {
    // Edge case where user types in 2 + 2 then types in + again. We should now set num1 = 4 and num2 = 0 and operator = +
    if (secondComputed) {
        computeOperation();
    }

    firstComputed = true;
    operator = operation;

    console.log(`Operator is set to ${operator}`);
    updateResScreen()
}

function computeOperation() {
    // If we do not have values for both num1 and num2
    if (!firstComputed || !secondComputed || typeof(operator) == undefined) {
        operator = undefined;
        console.log("Undefined computation");
    } else {
        num1 = operator(num1, num2);
        num2 = 0;
        firstComputed = false;
        secondComputed = false;
        operator = undefined;
        console.log(`computeOperation result is ${num1}`);
    }
    updateResScreen()
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return Math.floor(x / y);
}

function addEventListenerHelper(selector, event, handler) {
    // Select all elements matching the selector
    const elements = document.querySelectorAll(selector);
  
    // Add an event listener to each element
    elements.forEach(element => {
      element.addEventListener(event, handler);
    });
}

// Event Listeners
function addEventListeners() {

    // Create event listener for c button
    addEventListenerHelper("#c-button", "click", () => {clearNum()});

    // Create event listener for back-tick
    addEventListenerHelper("#back-tick", "click", () => {removeDigit()});

    // Create event listener for equal sign button 
    addEventListenerHelper(".equal-sign", "click", () => {computeOperation()});

    // Create event listener for division button
    addEventListenerHelper(".division-button", "click", () => {setOperator(divide)});

    // Create event listener for multiply button 
    addEventListenerHelper(".multiply-button", "click", () => {setOperator(multiply)});

    // Create event listener for subtract button 
    addEventListenerHelper(".subtract-button", "click", () => {setOperator(subtract)});

    // Create event listener for addition button 
    addEventListenerHelper(".add-button", "click", () => {setOperator(add)});

    // Select all buttons with the "calculator-button" class
    const num_buttons = document.querySelectorAll(".number-button");
  
    // Add an event listener to each number button
    num_buttons.forEach(num_button => {
        num_button.addEventListener("click", () => {
            appendDigit(parseInt(num_button.innerText));
          });
    });
}

document.addEventListener("DOMContentLoaded", addEventListeners);