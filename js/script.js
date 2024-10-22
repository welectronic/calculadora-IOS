class Display {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.currentvalue = '0';
        this.maxLength = 13;
    }

    update(value) {

        if (value.includes('.') && value.length > this.maxLength) {
            value = parseFloat(value).toPrecision(this.maxLength - 1);
        } else if (value.length > this.maxLength) {
            value = value.slice(0, this.maxLength);
        }

        this.currentvalue = value;
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

        if (this.currentvalue.length >= this.maxLength) return;
        this.currentvalue = (this.currentvalue === '0' && value !== '.') ? value : this.currentvalue + value;
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

class Calculator {
    constructor(display) {
        this.display = display;
        this.currentOperation = null;
        this.value1 = null;
        this.value2 = null;
        this.isNewInput = true;
    }

    pressButton(value) {
        if (value === 'AC') return this.clear();
        if (this.display.currentvalue === 'Error') this.clear();

        switch (value) {
            case '±': return this.toggleSign();
            case '%': return this.percent();
            case '+': case '-': case 'X': case '÷': return this.setOperation(new Operations[value]());
            case '=': return this.calculate();
            case '.': return this.handleDecimalPoint();
            default: return this.handleNumberInput(value);
        }
    }

    handleNumberInput(value) {
        if (this.isNewInput) {
            this.display.update(value);
            this.isNewInput = false;
        } else {
            this.display.append(value);
        }
    }

    handleDecimalPoint() {
        if (!this.display.currentvalue.includes('.')) {
            this.display.append('.');
            this.isNewInput = false;
        }
    }

    clear() {
        this.display.clear();
        this.currentOperation = null;
        this.value1 = null;
        this.value2 = null;
        this.isNewInput = true;
    }

    toggleSign() {
        let currentValue = parseFloat(this.display.currentvalue);
        this.display.update((-currentValue).toString());
    }

    percent() {
        let currentValue = parseFloat(this.display.currentvalue);
        this.display.update((currentValue / 100).toString());
    }

    setOperation(operation) {
        if (this.currentOperation) this.calculate();
        this.value1 = parseFloat(this.display.currentvalue);
        this.currentOperation = operation;
        this.isNewInput = true;
    }

    calculate() {
        if (!this.currentOperation || this.value1 === null) return;

        this.value2 = parseFloat(this.display.currentvalue);
        try {
            const result = this.currentOperation.execute(this.value1, this.value2);
            this.display.update(result.toString());
            this.value1 = result;
        } catch (error) {
            this.display.update('Error');
        }

        this.currentOperation = null;
        this.value2 = null;
        this.isNewInput = true;
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
document.addEventListener('DOMContentLoaded', () => {
    const calculatorInstance = new Calculator(new Display());
    const buttonElements = document.querySelectorAll('.button');

    buttonElements.forEach(buttonElement => {
        const value = buttonElement.getAttribute('data-value');
        new Button(buttonElement, () => calculatorInstance.pressButton(value));
    });
});
