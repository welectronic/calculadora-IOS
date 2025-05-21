class Display {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.currentvalue = '0';
        this.maxLength = 9; // Max digits for standard input
    }

    update(value) {
        let numValue = parseFloat(value);
        if (value.includes('e')) { // Already in scientific notation
            this.currentvalue = value;
        } else if (value.length > 15 || (Math.abs(numValue) > 999999999 && value.length > this.maxLength) || (Math.abs(numValue) < 0.0000001 && numValue !== 0 && value.length > this.maxLength && value.includes('.'))) {
            // Switch to scientific notation if too large, too small (and decimal), or too many characters for precise float
            // iOS typically uses up to 9 significant digits for scientific notation.
            this.currentvalue = numValue.toExponential(6); 
        } else if (value.length > this.maxLength && value.includes('.')) {
             // If it has a decimal and exceeds maxLength, try toPrecision
             this.currentvalue = parseFloat(value).toPrecision(this.maxLength);
        } else if (value.length > this.maxLength && !value.includes('.')) {
             // If it's an integer and too long, it's likely too big, switch to scientific
             this.currentvalue = numValue.toExponential(6);
        } else {
            this.currentvalue = value;
        }
        // Ensure the final currentvalue (especially after toExponential/toPrecision) doesn't exceed an absolute overall limit (e.g. 15-20 chars)
        if (this.currentvalue.length > 15) {
            this.currentvalue = parseFloat(this.currentvalue).toExponential(6); // Final check
        }
        this.render();
    }

    render() {
        this.displayElement.textContent = this.currentvalue;
    }

    clear() {
        this.currentvalue = '0';
        this.render();
    }

    append(value) {
        if (this.currentvalue.includes('e')) return; // Don't append to scientific notation
        if (value === '.' && this.currentvalue.includes('.')) return; 

        if (this.currentvalue === '0' && value !== '.') {
            this.currentvalue = value;
        } else if (this.currentvalue.length < this.maxLength) {
            this.currentvalue += value;
        }
        // Note: Strict adherence to maxLength. If it's "123456789", cannot append "."
        // to make "123456789.". iOS might allow this then immediately convert or error.
        // For now, this is simpler and stricter.
        this.render();
    }
}

class Button {
    constructor(element, action) {
        this.element = element;
        this.action = action;
        this.element.addEventListener('click', () => this.action());
    }
}

class Operation {
    execute(value1, value2) {
        throw new Error("Método abstracto execute() debe ser implementado");
    }
}

class Addition extends Operation {
    execute(value1, value2) {
        return value1 + value2;
    }
}

class Substraction extends Operation {
    execute(value1, value2) {
        return value1 - value2;
    }
}

class Multiplication extends Operation {
    execute(value1, value2) {
        return value1 * value2;
    }
}

class Division extends Operation {
    execute(value1, value2) {
        if (value2 === 0) throw new Error("División por 0 no está permitida");
        return value1 / value2;
    }
}

const Operations = {
    '+': Addition,
    '-': Substraction,
    'X': Multiplication,
    '÷': Division
};

class Calculator {
    constructor(display) {
        this.display = display;
        this.currentOperation = null;
        this.value1 = null;
        this.value2 = null;
        this.isNewInput = true;
        this.isDirtyEntry = false; // Added for AC/C
        this.lastOperation = null; // Added for = repetition
        this.lastValue2 = null;    // Added for = repetition
        this.acButtonElement = document.querySelector('[data-value="AC"]'); // Cache AC button
        this.updateAcButtonLabel('AC'); // Initial state
    }

    updateAcButtonLabel(label) {
        if (this.acButtonElement) {
            this.acButtonElement.textContent = label;
        }
    }

    operationsMap = {
        'AC': () => this.clear(),
        '±': () => this.toggleSign(),
        '%': () => this.percent(),
        '+': () => this.setOperation(new Operations['+']()),
        '-': () => this.setOperation(new Operations['-']()),
        'X': () => this.setOperation(new Operations['X']()),
        '÷': () => this.setOperation(new Operations['÷']()),
        '=': () => this.calculate(),
        '.': () => this.handleDecimalPoint()
    };

    pressButton(value) {
        if (this.display.currentvalue === 'Error') this.clear();

        const operation = this.operationsMap[value];
        if (operation) return operation();

        return this.handleNumberInput(value);
    }

    handleNumberInput(value) {
        if (this.isNewInput) {
            this.display.update(value);
        } else {
            this.display.append(value);
        }
        this.isNewInput = false; // Explicitly set
        this.isDirtyEntry = true;
        this.updateAcButtonLabel('C');
    }

    handleDecimalPoint() {
        if (!this.display.currentvalue.includes('.')) {
            this.display.append('.');
            this.isNewInput = false; // Explicitly set
            this.isDirtyEntry = true;
            this.updateAcButtonLabel('C');
        }
    }

    clear() {
        if (this.display.currentvalue !== '0' && !this.isNewInput) { // Condition for "C"
            this.display.update('0');
            this.isNewInput = true; 
            this.updateAcButtonLabel('AC'); 
        } else { // Condition for "AC"
            this.display.clear(); 
            this.currentOperation = null;
            this.value1 = null;
            this.value2 = null;
            this.isNewInput = true;
            this.lastOperation = null;
            this.lastValue2 = null;
            this.updateAcButtonLabel('AC');
        }
        this.isDirtyEntry = false; 
    }

    toggleSign() {
        let currentValue = parseFloat(this.display.currentvalue);
        this.display.update((-currentValue).toString());
        this.isDirtyEntry = true; // Value changed by toggleSign
        this.updateAcButtonLabel('C'); // Reflect change in AC/C button
    }

    percent() {
        let displayVal = parseFloat(this.display.currentvalue);
        if (this.value1 !== null && this.currentOperation !== null) {
            if (this.currentOperation instanceof Addition || this.currentOperation instanceof Substraction) {
                displayVal = (this.value1 * displayVal) / 100;
            } else { // Multiplication, Division
                displayVal = displayVal / 100;
            }
        } else { // Standalone percentage
            displayVal = displayVal / 100;
        }
        this.display.update(displayVal.toString());
        this.isNewInput = true; 
    }

    setOperation(operation) {
        if (this.isNewInput && this.currentOperation && this.value1 !== null) {
            this.currentOperation = operation;
            return; 
        }

        if (this.currentOperation) { 
            this.calculate();
        }
        
        this.value1 = parseFloat(this.display.currentvalue);
        this.currentOperation = operation;
        this.isNewInput = true; 
        this.isDirtyEntry = false; 
        this.updateAcButtonLabel('AC'); 
        this.lastOperation = null; 
        this.lastValue2 = null;
    }

    calculate() {
        let result;
        if (this.currentOperation && this.value1 !== null) { 
            this.value2 = parseFloat(this.display.currentvalue);
            result = this.tryExecuteOperation();
            this.display.update(result.toString());

            this.lastOperation = this.currentOperation; 
            this.lastValue2 = this.value2;

            if (result !== 'Error') this.value1 = result;
            this.currentOperation = null;
        } else if (this.lastOperation && this.value1 !== null && this.lastValue2 !== null) { 
            this.value1 = parseFloat(this.display.currentvalue); 
            this.currentOperation = this.lastOperation; 
            this.value2 = this.lastValue2; 
            
            result = this.tryExecuteOperation();
            this.display.update(result.toString());

            if (result !== 'Error') this.value1 = result;
            this.currentOperation = null; 
        } else {
            return; 
        }
       
        this.isNewInput = true;
        this.isDirtyEntry = false;
        this.updateAcButtonLabel('AC'); 
    }

    // Función auxiliar para ejecutar la operación con manejo de errores
    tryExecuteOperation() {
        try {
            return this.currentOperation.execute(this.value1, this.value2);
        } catch (error) {
            return 'Error';
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const calculatorInstance = new Calculator(new Display());
    const buttonElements = document.querySelectorAll('.button');

    buttonElements.forEach(buttonElement => {
        const value = buttonElement.getAttribute('data-value');
        new Button(buttonElement, () => calculatorInstance.pressButton(value));
    });
    console.log('¡Bienvenido a la calculadora!');
});


