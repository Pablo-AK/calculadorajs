class CalcController {
    constructor() {
        this._operation = [];
        this._lastOperator = '';
        this._lastNumber = '';
        this._dateEl = document.querySelector(".data");
        this._timeEl = document.querySelector(".hora");
        this._currentDate;
        this._displayCalcEl = document.querySelector("#displayCalc");
        this.initButtonsEvents();
        this.setDisplayDateTime();
        this.initialize();


    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

        this.setLastNumberToDisplay();


    }

    execBtn(value) {


        switch (value) {

            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'sub':
                this.addOperation('-');
                break;
            case 'div':
                this.addOperation('/');
                break;
            case 'multi':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':

                this.addOperation(parseInt(value));

                break;

            default:
                console.log("teste");
                break;
        }
    }

    clearAll() {

        this._operation = [];
        this._lastNumber = '';
        this._lastOperation = '';
        this.setLastNumberToDisplay();
    }
    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {
        return (['+', '-', '/', '*', '%'].indexOf(value) > -1);

    }
    pushOperator(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

            console.log(this._operation);
        } else {

        }
    }
    getResult() {

        return eval(this._operation.join(""));
    }


    getLastItem(isOperator = true) {
        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {


            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;

            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }



    calc() {
        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];

            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {


            last = this._operation.pop();
            this._lastNumber = this.getResult();


        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);
        }


        let result = this.getResult();

        if (last == '%') {

            result /= 100;
            this._operation = [result];
        } else {


            this._operation = [result];

            if (last) this._operation.push(last);
        }


        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);
        if (!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }

    addOperation(value) {


        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else {
                this.pushOperator(value);
                this.setLastNumberToDisplay();
            }

        } else {
            if (this.isOperator(value)) {
                this.pushOperator(value);
            } else {

                let newValue = this.getLastOperation().toString() + value.toString();

                this.setLastOperation((newValue));

                this.setLastNumberToDisplay();
            }

        }

    }

    addDot(){
        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
        
        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperator('0.');

        }else{
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }



    initButtonsEvents() {

        let buttons = document.querySelectorAll("button");

        buttons.forEach((btn, index) => {
            btn.addEventListener('click', e => {

                let textBtn = btn.className.replace("btn-", "");

                this.execBtn(textBtn);
            });

        })

    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }




    setError() {
        this.displayCalc = "Error";
    }




    get diplayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(valor) {
        this._timeEl.innerHTML = valor;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(valor) {
        this._dateEl.innerHTML = valor;
    }
    get currentDate() {
        return new Date();
    }

    set currentDate(valor) {
        this._currentDate = valor;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        if (value.toString().length > 10) {
            this.setError();
            return false;
        }

        this._displayCalcEl.innerHTML = value;
    }





}