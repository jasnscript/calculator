// function that populate the display with number of button selected
const buttonNumber = document.querySelectorAll('.number');
buttonNumber.forEach(button => {
    button.addEventListener('click', () => display(button.value));
});

function display(numberText) {
    const displayContainer = document.querySelector('#display');
    const displayNumber = document.createElement('div');

    clearDisplay(displayContainer); // clear previous children in display node

    displayNumber.classList.add('selectedNumber');
    displayNumber.textContent = numberText;
    displayContainer.appendChild(displayNumber);
}

function storeValue(value) {

};

function clearDisplay(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild); 
    };
};

// function that takes two numbers and operates on them 
function operate(operator, num1, num2) {
    switch (operator) {
        case 'add':
            return add(num1, num2);
        case 'subtract':
            return subtract(num1, num2);
        case 'multiply':
            return multiply(num1, num2);
        case 'divide':
            return divide(num1, num2);   
    }
}

// functions for simple math operation
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}
