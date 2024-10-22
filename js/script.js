class Display {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.currentvalue = '0';
    }

    update(value) {
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
        if (this.currentvalue === '0') {
            this.currentvalue = value
        } else {
            this.currentvalue = this.currentvalue + value;
        }
        this.render();
    }

}

class Button {
    constructor(element, action) {
        this.element = element;
        this.action = action;
        this.init();
    }

    init() {
        this.element.addEventListener('click', () => {
            this.onClick();
        });
    }

    onClick() {
        this.action();
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
        switch (value) {
            case 'AC':
                this.clear();
                break;
            case '±':
                this.toggleSign();
                break;
            case '%':
                this.percent();
                break;
            case '+':
                this.setOperation(new Addition());
                break;
            case '-':
                this.setOperation(new Substraction());
                break;
            case 'X':
                this.setOperation(new Multiplication());
                break;
            case '÷':
                this.setOperation(new Division());
                break;
            case '=':
                this.calculate();
                break;
            default:
                this.handleInput(value);
                break;
        }
    }

    handleInput(value) {
        if (this.isNewInput) {
            this.display.update(value)
            this.isNewInput = false;
        } else {
            if (this.display.currentvalue === '0' && value === '0') {
                return;
            }
            this.display.append(value);
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
        let currenValue = parseFloat(this.display.currentvalue);
        currenValue = -currenValue;
        this.display.update(currenValue.toString());
    }

    percent() {
        let currenValue = parseFloat(this.display.currentvalue);
        currenValue = currenValue / 100;
        this.display.update(currenValue.toString());
    }

    setOperation(operation) {
        if (this.currentOperation) {
            this.calculate()
        }
        this.value1 = parseFloat(this.display.currentvalue);
        this.currentOperation = operation;
        this.display.clear();
        this.isNewInput = true;
    }

    calculate() {
        if (!this.currentOperation || this.value1 === null) {
            return;
        }
        this.value2 = parseFloat(this.display.currentvalue);

        let result;

        try {
            result = this.currentOperation.execute(this.value1, this.value2)
        } catch (error) {
            return 'Error';
        }

        this.display.update(result.toString())
        this.value1 = result;
        this.currentOperation = null;
        this.value2 = null;
        this.isNewInput = true;
    }
}

// interface operation
class Operation {
    constructor() {
        if (this.constructor === Operation) {
            throw new Error(" no se puede instanciar la clase abrtracta operation")
        }
    }

    execute(value1, value2) {
        throw new Error("Método abstracto execute() debe ser implementado")
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
        if (value2 === 0) {
            throw new Error("División por 0 no está permitida");
        }
        return value1 / value2;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calculatorInstance = new Calculator(new Display());

    const buttonElements = document.querySelectorAll('.button');

    buttonElements.forEach(buttonElement => {
        const value = buttonElement.getAttribute('data-value');
        new Button(buttonElement, () => calculatorInstance.pressButton(value));
    });
});
