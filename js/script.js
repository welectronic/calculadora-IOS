class Display {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.currentvalue = '0';
        this.maxLength = 9;
    }

    _isScientific(valueString) {
        return valueString.toString().includes('e');
    }

    _shouldConvertToScientific(valueString, numValue) {
        const valueStr = valueString.toString();
        if (this._isScientific(valueStr)) {
            return false;
        }
        const absNumValue = Math.abs(numValue);
        const standardDisplayLimit = this.maxLength;
        if (valueStr.length > 15) {
            return true;
        }
        if (absNumValue >= Math.pow(10, standardDisplayLimit)) {
            return true;
        }
        if (numValue !== 0 && absNumValue < Math.pow(10, -(standardDisplayLimit - 1))) {
            return true;
        }
        if (!valueStr.includes('.') && valueStr.length > standardDisplayLimit) {
            return true;
        }
        if (valueStr.includes('.')) {
           const integerPart = valueStr.split('.')[0];
           if (integerPart.length > standardDisplayLimit && !(integerPart.length === standardDisplayLimit + 1 && integerPart.startsWith('-'))) {
                return true;
           }
        }
        return false;
    }

    update(value) {
        let displayStr = value.toString();
        const numValue = parseFloat(displayStr);

        if (this._isScientific(displayStr)) {
            if (displayStr.length > 15) {
                displayStr = numValue.toExponential(6);
            }
        } else if (this._shouldConvertToScientific(displayStr, numValue)) {
            displayStr = numValue.toExponential(6);
        } else {
            if (displayStr.includes('.') && displayStr.length > this.maxLength) {
                let precisionValue = numValue.toPrecision(this.maxLength);
                if (this._isScientific(precisionValue)) {
                    if (precisionValue.length > 15) {
                        precisionValue = parseFloat(precisionValue).toExponential(6);
                    }
                } else { 
                    if (precisionValue.length > this.maxLength) {
                        let tempNumStr = parseFloat(precisionValue).toString();
                        if (tempNumStr.length > this.maxLength) {
                            if (this._shouldConvertToScientific(tempNumStr, parseFloat(tempNumStr))) {
                                precisionValue = parseFloat(tempNumStr).toExponential(6);
                            } else {
                                precisionValue = tempNumStr.slice(0, this.maxLength);
                            }
                        } else {
                             precisionValue = tempNumStr;
                        }
                    }
                }
                displayStr = precisionValue;
            } else if (!displayStr.includes('.') && displayStr.length > this.maxLength) {
                displayStr = displayStr.slice(0, this.maxLength);
            }
        }

        if (displayStr.length > 15) {
            const finalNumValue = parseFloat(displayStr);
            if (!isNaN(finalNumValue)) {
                 displayStr = finalNumValue.toExponential(6);
            } else {
                displayStr = displayStr.slice(0, 15);
            }
        }

        this.currentvalue = displayStr;
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
        if (this.currentvalue.includes('e')) return;
        if (value === '.' && this.currentvalue.includes('.')) return;

        if (this.currentvalue === '0' && value !== '.') {
            this.currentvalue = value;
        } else if (this.currentvalue.length < this.maxLength) {
            this.currentvalue += value;
        }
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

class OperationFactory {
    constructor() {
        this.operationsMap = {
            '+': Addition,
            '-': Substraction,
            'X': Multiplication,
            '÷': Division
        };
    }

    create(symbol) {
        const OperationClass = this.operationsMap[symbol];
        if (OperationClass) {
            return new OperationClass();
        }
        return null; 
    }
}

class CalculatorUIUpdater {
    constructor(acButtonElement) {
        if (!acButtonElement) {
            throw new Error("AC button element is required for CalculatorUIUpdater.");
        }
        this.acButtonElement = acButtonElement;
    }

    updateAcButtonLabel(label) {
        if (this.acButtonElement) {
            this.acButtonElement.textContent = label;
        }
    }
}

class Calculator {
    constructor(display, uiUpdater, operationFactory) {
        this.display = display;
        this.uiUpdater = uiUpdater;
        this.operationFactory = operationFactory;
        this.currentOperation = null;
        this.value1 = null;
        this.value2 = null;
        this.isNewInput = true;
        this.isDirtyEntry = false;
        this.lastOperation = null;
        this.lastValue2 = null;
        this.uiUpdater.updateAcButtonLabel('AC');

        this.operationsMap = {
            'AC': () => this.clear(),
            '±': () => this.toggleSign(),
            '%': () => this.percent(),
            '+': () => this.setOperation(this.operationFactory.create('+')),
            '-': () => this.setOperation(this.operationFactory.create('-')),
            'X': () => this.setOperation(this.operationFactory.create('X')),
            '÷': () => this.setOperation(this.operationFactory.create('÷')),
            '=': () => this.calculate(),
            '.': () => this.handleDecimalPoint()
        };
    }

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
        this.isNewInput = false;
        this.isDirtyEntry = true;
        this.uiUpdater.updateAcButtonLabel('C');
    }

    handleDecimalPoint() {
        if (!this.display.currentvalue.includes('.')) {
            this.display.append('.');
            this.isNewInput = false;
            this.isDirtyEntry = true;
            this.uiUpdater.updateAcButtonLabel('C');
        }
    }

    clear() {
        if (this.display.currentvalue !== '0' && !this.isNewInput) {
            this.display.update('0');
            this.isNewInput = true;
            this.uiUpdater.updateAcButtonLabel('AC');
        } else {
            this.display.clear();
            this.currentOperation = null;
            this.value1 = null;
            this.value2 = null;
            this.isNewInput = true;
            this.lastOperation = null;
            this.lastValue2 = null;
            this.uiUpdater.updateAcButtonLabel('AC');
        }
        this.isDirtyEntry = false;
    }

    toggleSign() {
        let currentValue = parseFloat(this.display.currentvalue);
        this.display.update((-currentValue).toString());
        this.isDirtyEntry = true;
        this.uiUpdater.updateAcButtonLabel('C');
    }

    percent() {
        let displayVal = parseFloat(this.display.currentvalue);
        if (this.value1 !== null && this.currentOperation !== null) {
            if (this.currentOperation instanceof Addition || this.currentOperation instanceof Substraction) {
                displayVal = (this.value1 * displayVal) / 100;
            } else {
                displayVal = displayVal / 100;
            }
        } else {
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
        this.uiUpdater.updateAcButtonLabel('AC');
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
        this.uiUpdater.updateAcButtonLabel('AC');
    }

    tryExecuteOperation() {
        try {
            return this.currentOperation.execute(this.value1, this.value2);
        } catch (error) {
            return 'Error';
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const display = new Display();
    const acButtonElement = document.querySelector('[data-value="AC"]');
    if (!acButtonElement) {
        console.error("AC button DOM element not found. UIUpdater will not work.");
    }
    const uiUpdater = new CalculatorUIUpdater(acButtonElement);
    const operationFactory = new OperationFactory();
    
    const calculatorInstance = new Calculator(display, uiUpdater, operationFactory);

    const buttonElements = document.querySelectorAll('.button');
    buttonElements.forEach(buttonElement => {
        const value = buttonElement.getAttribute('data-value');
        new Button(buttonElement, () => calculatorInstance.pressButton(value));
    });
    console.log('¡Bienvenido a la calculadora!');
});


