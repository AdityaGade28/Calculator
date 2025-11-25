// This file contains the JavaScript code that implements the calculator's functionality.

const display = document.getElementById('display');
const preview = document.getElementById('preview');
let currentInput = '0';
let operator = '';
let firstOperand = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function updatePreview() {
    if (firstOperand !== null && operator) {
        preview.value = `${firstOperand} ${operator}`;
    } else {
        preview.value = '';
    }
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else if (number === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += number;
        }
    }
    updateDisplay();
}

function chooseOperator(op) {
    if (op === '=') {
        calculate();
        return;
    }
    
    if (currentInput === '') return;
    
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        firstOperand = operate(operator, firstOperand, parseFloat(currentInput));
        currentInput = firstOperand.toString();
    }
    
    operator = op;
    shouldResetDisplay = true;
    updatePreview();
}

function operate(op, a, b) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? 0 : a / b;
        default: return b;
    }
}

function calculate() {
    if (operator === '' || firstOperand === null) return;
    
    const result = operate(operator, firstOperand, parseFloat(currentInput));
    currentInput = parseFloat(result.toFixed(10)).toString();
    operator = '';
    firstOperand = null;
    shouldResetDisplay = true;
    updateDisplay();
    updatePreview();
}

function clear() {
    currentInput = '0';
    operator = '';
    firstOperand = null;
    shouldResetDisplay = false;
    updateDisplay();
    updatePreview();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

// Event Listeners
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.innerText));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => chooseOperator(button.dataset.op));
});

document.getElementById('clear').addEventListener('click', clear);
document.getElementById('backspace').addEventListener('click', backspace);
document.getElementById('toggle-sign').addEventListener('click', toggleSign);

updateDisplay();