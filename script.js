document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const formulaDisplay = document.getElementById('formula');
    const standardMode = document.getElementById('standardMode');
    const scientificMode = document.getElementById('scientificMode');
    const standardButtons = document.querySelector('.standard-buttons');
    const scientificButtons = document.querySelector('.scientific-buttons');
    
    let currentInput = '0';
    let currentOperation = null;
    let previousInput = '';
    let shouldResetDisplay = false;
    let formula = '0';
    let isTypingSecondNumber = false;

    // Mode switching
    standardMode.addEventListener('click', () => {
        standardMode.classList.add('active');
        scientificMode.classList.remove('active');
        standardButtons.style.display = 'grid';
        scientificButtons.style.display = 'none';
    });

    scientificMode.addEventListener('click', () => {
        scientificMode.classList.add('active');
        standardMode.classList.remove('active');
        standardButtons.style.display = 'grid';
        scientificButtons.style.display = 'grid';
    });

    // Standard calculator functions
    function updateDisplay() {
        display.value = currentInput;
        formulaDisplay.textContent = formula;
    }

    function handleNumber(num) {
        if (shouldResetDisplay) {
            currentInput = '0';
            shouldResetDisplay = false;
            isTypingSecondNumber = true;
        }
        currentInput = currentInput === '0' ? num : currentInput + num;
        updateFormula();
        updateDisplay();
    }

    function updateFormula() {
        if (previousInput && currentOperation) {
            if (isTypingSecondNumber) {
                formula = `${previousInput} ${currentOperation} ${currentInput}`;
            } else {
                formula = `${previousInput} ${currentOperation}`;
            }
        } else {
            formula = currentInput;
        }
    }

    function handleOperator(op) {
        if (currentInput === '0') return;
        
        if (previousInput !== '') {
            calculate();
        }
        
        currentOperation = op;
        previousInput = currentInput;
        shouldResetDisplay = true;
        isTypingSecondNumber = false;
        updateFormula();
        updateDisplay();
    }

    function calculate() {
        if (currentOperation === null || shouldResetDisplay) return;
        
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch (currentOperation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
        }

        formula = `${previousInput} ${currentOperation} ${currentInput} =`;
        currentInput = result.toString();
        currentOperation = null;
        previousInput = '';
        shouldResetDisplay = true;
        isTypingSecondNumber = false;
        updateDisplay();
    }

    // Scientific calculator functions
    function handleScientificOperation(op) {
        const num = parseFloat(currentInput);
        let result;

        switch (op) {
            case 'sin':
                result = Math.sin(num * Math.PI / 180);
                formula = `sin(${num}°) =`;
                break;
            case 'cos':
                result = Math.cos(num * Math.PI / 180);
                formula = `cos(${num}°) =`;
                break;
            case 'tan':
                result = Math.tan(num * Math.PI / 180);
                formula = `tan(${num}°) =`;
                break;
            case '√':
                result = Math.sqrt(num);
                formula = `√(${num}) =`;
                break;
            case 'x²':
                result = num * num;
                formula = `${num}² =`;
                break;
            case 'log':
                result = Math.log10(num);
                formula = `log(${num}) =`;
                break;
            case 'ln':
                result = Math.log(num);
                formula = `ln(${num}) =`;
                break;
            case 'π':
                result = Math.PI;
                formula = 'π =';
                break;
            case 'e':
                result = Math.E;
                formula = 'e =';
                break;
            case 'x!':
                result = factorial(num);
                formula = `${num}! =`;
                break;
            case '1/x':
                result = 1 / num;
                formula = `1/${num} =`;
                break;
            case '|x|':
                result = Math.abs(num);
                formula = `|${num}| =`;
                break;
        }

        currentInput = result.toString();
        updateDisplay();
    }

    function factorial(n) {
        if (n < 0) return NaN;
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // Event Listeners
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => handleNumber(button.textContent));
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => handleOperator(button.textContent));
    });

    document.querySelector('.equals').addEventListener('click', calculate);

    document.querySelector('.clear').addEventListener('click', () => {
        currentInput = '0';
        previousInput = '';
        currentOperation = null;
        shouldResetDisplay = false;
        isTypingSecondNumber = false;
        formula = '0';
        updateDisplay();
    });

    document.querySelector('.decimal').addEventListener('click', () => {
        if (shouldResetDisplay) {
            currentInput = '0';
            shouldResetDisplay = false;
            isTypingSecondNumber = true;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateFormula();
            updateDisplay();
        }
    });

    document.querySelectorAll('.sci-operator').forEach(button => {
        button.addEventListener('click', () => handleScientificOperation(button.textContent));
    });

    // Initialize display
    updateDisplay();
});