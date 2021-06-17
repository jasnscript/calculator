let memory = {
    inputString: ['', ''],
    result: null,
    operator: '',
    operatorActive: false,
    decimalCount: 0,
    enterPressed: false,
};

// set up query selectors
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const signButton = document.querySelector('#sign');
const clearAllButton = document.querySelector('#clearAll');
const clearButton = document.querySelector('#clear');
const pointButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#return');

const displayContainer = document.querySelector('#display');
// set up event listeners
numberButtons.forEach(button => button.addEventListener('click', function() {
    storeInputString(button.value);
    console.log(memory.inputString)
}));

operatorButtons.forEach(button => button.addEventListener('click', function() {
    memory.enterPressed = false;
    
    if (!memory.inputString[0] === false && !memory.inputString[1] === true) { // checks if first input is not empty. Prevents operator from being set if nothing has been input yet
        setOperator(button.id)
        setOperatorActive();
        resetDecimalCount();
    }
    if (!memory.inputString[0] === false && !memory.inputString[1] === false) { // allow for operations to be chained one after another without having to press equals button
        setOperatorActive();
        operate();
    }
    if (memory.result != null) { // checks if result key is not null. Allows for operator to be set again to operate on result of last operation
        setOperatorActive();
        setOperator(button.id);
        memory.inputString[0] = memory.result.toString();
        memory.inputString[1] = '';
    }
    console.log(memory.inputString)
    console.log(memory.operator)
}));

signButton.addEventListener('click', function() {
    changeSign();
    console.log(memory.inputString)
});

clearAllButton.addEventListener('click', function() { 
    clearAll();
    console.log(memory)
});

clearButton.addEventListener('click', function() {
    clear();
    console.log(memory.inputString, memory.result, memory.operator);
});

pointButton.addEventListener('click', function() {
    if (memory.decimalCount < 1) {
        storeInputString('.');
        console.log(memory.inputString)
    }
});

equalsButton.addEventListener('click', function() {
    if (!memory.inputString[0] === false && !memory.inputString[1] === false) {
        operate();
        memory.enterPressed = true;
        resetDecimalCount();
        setOperatorInactive();
        console.log(memory.result);
        console.log(memory.inputString)
    }
});

// store value of input by concatenating value of number button
function storeInputString(char) {
    if (memory.enterPressed === true && memory.operatorActive === false) { // clearsAll if user presses new number right after equal
        clearAll();
    }
    if (memory.operatorActive === false) {
        memory.inputString[0] += char;
        updateDisplay(memory.inputString[0]);
    } else {
        memory.inputString[1] += char;
        updateDisplay(memory.inputString[1])
    }
    if (char === '.') {
        memory.decimalCount++;
    }
}

function clearAll() {
    memory = {
        inputString: ['', ''],
        result: null,
        operator: '',
        operatorActive: false,
        decimalCount: 0,
        enterPressed: false,
    };
    clearDisplay();
}

function clear() {
    if (!memory.inputString[0] === false && memory.result === null) {
        if (!memory.inputString[1] === true) { // if second input empty, delete on first
            if (memory.inputString[0].slice(memory.inputString[0].length - 1) === '.') {
                resetDecimalCount();
            }
            memory.inputString[0] = memory.inputString[0].slice(0, -1);  
            updateDisplay(memory.inputString[0]);
        } else if (!memory.inputString[1] === false) { // if second input not empty, delete on second
            if (memory.inputString[1].slice(memory.inputString[1].length - 1) === '.') {
                resetDecimalCount();
            }
            memory.inputString[1] = memory.inputString[1].slice(0, -1);
            updateDisplay(memory.inputString[1]);
        }
    }
    
}

function addNegativeSignInputString0() {
    memory.inputString[0] = memory.inputString[0].replace(/^/, '-');
    updateDisplay(memory.inputString[0]);
}

function removeNegativeSignInputString0(inputString) {
    memory.inputString[0] = memory.inputString[0].slice(1);
    updateDisplay(memory.inputString[0]);
}

function changeSign() {
    if (memory.operatorActive === false) { // change sign of first input if operator hasn't been pressed
        if (memory.inputString[0][0] != '-') { // check if there is already a negative sign
            addNegativeSignInputString0();
        } else {
            removeNegativeSignInputString0();
        }
    } else if (memory.operatorActive === true && !memory.inputString[1] === true) { // change sign of first when operator is pressed but no second input
        if (memory.inputString[0][0] != '-') {
            memory.inputString[0] = memory.inputString[0].replace(/^/, '-');
            updateDisplay(memory.inputString[0]);
        } else {
            memory.inputString[0] = memory.inputString[0].slice(1);
            updateDisplay(memory.inputString[1]);
        }
    } else if (memory.operatorActive === true && !memory.inputString[1] === false) {
        if (memory.inputString[1][0] != '-') { 
            memory.inputString[1] = memory.inputString[1].replace(/^/, '-');
            updateDisplay(memory.inputString[1]);
        } else {
            memory.inputString[1] = memory.inputString[1].slice(1);
            updateDisplay(memory.inputString[1]);
        }
        
    }

    if (memory.enterPressed === true) {
        if (memory.result != null) {
            memory.inputString[0] = memory.result.toString();
        }
        memory.inputString[1] = '';
        memory.result = null;
        if (memory.inputString[0][0] != '-') { 
            memory.inputString[0] = memory.inputString[0].replace(/^/, '-');
            updateDisplay(memory.inputString[0]);
        } else {
            memory.inputString[0] = memory.inputString[0].slice(1);
            updateDisplay(memory.inputString[0]);
        }
        memory.enterPressed = false;
    }
}

function updateDisplay(content) {
    clearDisplay();
    const display = document.createElement('div');
    display.classList.add('displayContent');
    display.textContent = content;
    displayContainer.appendChild(display);
}

function clearDisplay() {
    while (displayContainer.firstChild) {
        displayContainer.removeChild(displayContainer.firstChild);
    }
}

function setOperator(operator) {
    memory.operator = operator;
}

function setOperatorActive() {
    memory.operatorActive = true;
}

function setOperatorInactive() {
    memory.operatorActive = false;
}

function resetDecimalCount() {
    memory.decimalCount = 0;
}
// simple addition
function operate() {
    switch (memory.operator) {
        case '+':
            memory.result = parseFloat(memory.inputString[0]) + parseFloat(memory.inputString[1]);
            break;
        case '-':
            memory.result = parseFloat(memory.inputString[0]) - parseFloat(memory.inputString[1]);
            break;
        case '*':
            memory.result = parseFloat(memory.inputString[0]) * parseFloat(memory.inputString[1]);
            break;
        case '/':
            memory.result = parseFloat(memory.inputString[0]) / parseFloat(memory.inputString[1]);
            break;
    }
    roundDecimal();
    if (memory.result >= 1000000000000 || memory.result <= -1000000000000) {
        updateDisplay(memory.result.toExponential(4));
    } else {
        updateDisplay(memory.result);
    }
}

function roundDecimal() {
    memory.result = Math.round(memory.result * 1000000) / 1000000
}


// key press
document.onkeyup = function(e) {
    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' ||
    e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' ||
    e.key === '9') {
        storeInputString(e.key);
    } else if (e.key === '.') {
        if (memory.decimalCount < 1) {
            storeInputString(e.key);
        }
    }
    
    // switch (e.key) {
    //     case '0':
    //         storeInputString(e.key);
    //         break;
    //     case '1':
    //         storeInputString(e.key);
    //         break;
    //     case '2':
    //         storeInputString(e.key);
    //         break;
    //     case '3':
    //         storeInputString(e.key);
    //         break;
    // }
    // if (e.key == '0') {
    //     storeInputString(e.key);
    // } else if (e.key == 'r') {
    //     changeColorRainbow();
    // } else if (e.key == 'g') {
    //     changeColorGray();
    // } else if (e.key == 'c') {
    //     clearGrid();
    // }
}
