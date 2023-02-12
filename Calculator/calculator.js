class Calculator {

    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;

        this.clear();
    }

    clear() {
        this.previousOperandElement = '';
        this.currentOperandElement = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperandElement = this.currentOperandElement.toString().slice(0, -1);
    }

    appendNumber(number) {
        
        if (this.currentOperandElement.includes('.') && number === '.') return;

        this.currentOperandElement = this.currentOperandElement.toString() + number.toString();
    }

    chooseOperation(operation) {

        if (this.currentOperandElement === '') return;

        if (this.previousOperandElement != '') {

            this.compute();
        }

        this.operation = operation;
        this.previousOperandElement = this.currentOperandElement;
        this.currentOperandElement = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperandElement);
        const current = parseFloat(this.currentOperandElement);

        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {

            case '+': 

                computation = prev + current;
                break;

            case '-': 

                computation = prev - current;
                break;

            case 'x': 

                computation = prev * current;
                break;

            case '/': 

                computation = prev / current;
                break;

            default: 

                return;
        }

        this.currentOperandElement = computation;
        this.operation = undefined;
        this.previousOperandElement = '';

    }

    getDisplayNumber(number) {

        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperand.innerText = this.getDisplayNumber(this.currentOperandElement);

        if (this.operation != null) {
            this.previousOperand.innerText = `${this.getDisplayNumber(this.previousOperandElement)} ${this.operation}`;
        } else {
            this.previousOperand.innerText = '';
        }
    }
}


const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');


const calc = new Calculator(previousOperand, currentOperand);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    });
});

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    });
}); 

equalBtn.addEventListener('click', (button) => {
    calc.compute();
    calc.updateDisplay();
});

allClearBtn.addEventListener('click', (button) => {
    calc.clear();
    calc.updateDisplay();
});

deleteBtn.addEventListener('click', (button) => {
    calc.delete();
    calc.updateDisplay();
});
