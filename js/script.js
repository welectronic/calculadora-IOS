class Display {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.currentvalue = '0';
    }

    update(value){
        this.currentvalue = value;
        this.render();
    }

    render() {
        this.displayElement.textContent = this.currentvalue;
    }

    clear(){
        this.currentvalue = '0';
        this.render();
    }

    append(value) {
        if (this.currentvalue === '0'){
            this.currentvalue = value
        } else {
            this.currentvalue = this.currentvalue + value;
        }
        this.render();
    }

}

class Button {
    constructor(element,action){
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
        this.currentOperation =null;
        this.value1 = null;
        this.value2 = null;
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
                this.display.append(value);
                break;
        }
    }

    clear() {
        this.display.clear();
        this.currentOperation =null;
        this.value1 = null;
        this.value2 = null;
    }

    toggleSign(){

    }

    percent(){

    }

    setOperation(operation) {
        if (this.currentOperation) {
            this.calculate()
        }
        this.value1 = parseFloat(this.display.currentvalue);
        this.currentOperation =operation;
        this.display.clear();
    }
}
