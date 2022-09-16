let money = document.querySelector('.amount'); 
let inputAmountDiv = document.querySelector('.bill_input')
let error_amount = document.querySelector('.error_amount');
let tip  = document.querySelector('.tipPerPerson');
let total = document.querySelector('.totalPerPerson');
let buttons = document.querySelectorAll('buttons')

class TipCalculator{

    constructor(amount, tip, persons){
        this.amount = amount; 
        this.tip = tip; 
        this.numberOfPersons = persons ; 
    }

    formattedAmount(amount) {
        return  new Intl.NumberFormat(
            'en-us',
            {
                style: 'currency',
                currency: 'USD'
            }
    ).format(amount)}; 

    calculatePerPerson() {
        // check if all the data is there 
        if (calculator.amount === "0.00"){
            return
        }
        // convert to floats
        let ftip = parseFloat(calculator.tip);
        let famount = parseFloat(calculator.amount);
        let fpersons = parseInt(calculator.numberOfPersons); 
        // calculateTipPerPerson
        let tipPerPerson = (famount * ftip)/fpersons;
        // display the outcome
        tip.innerHTML = this.formattedAmount(tipPerPerson);
        // calculateTotalPerPerson
        let totalPerPerson = (famount + tipPerPerson)/fpersons; 
        //display the outcome 
        total.innerHTML = this.formattedAmount(totalPerPerson);  
    }

   displayError(text, inputfield, errorfield) {
        if (text === ""){
            inputfield.style.border = "none"
            errorfield.innerHTML = "" ; 
        }
        else {
            inputfield.style.border = "2px solid red"
            errorfield.innerHTML = "<i class='fa-sharp fa-solid fa-circle-exclamation'></i>" + " "  + text;  
        }
    }

    isValidFormat() {
        var reg = /\d{1,10}(\.\d{1,2})?/;
        if (!reg.test(this.amount)){
           this.displayError('Is not valid amount', inputAmountDiv, error_amount);
           return false;  
        }
        this.displayError("", inputAmountDiv, error_amount);
        return true; 
    }

    isNotNull() {
        if (this.amount === "0"){
            this.displayError('It is not allowed to be zero', inputAmountDiv, error_amount);
            return false;
        } 
        this.displayError("", inputAmountDiv, error_amount); 
        return true; 
    }

    isNotNegative() {
        let number = parseFloat(this.amount);
        if (number < 0){
            this.displayError("Amount cannot be negative", inputAmountDiv, error_amount);
            return false; 
        }
        this.displayError("", inputAmountDiv, error_amount); 
        return true;  
    }

    validateAmountInput() {
        return (this.isValidFormat() && this.isNotNull()) && this.isNotNegative(); 
    }
}

let calculator =  new TipCalculator(0.00, 0.00, 1); 

//add eventListener to the amount input 

money.addEventListener('blur', () => {
    calculator.amount = money.value; 
    isValid = calculator.validateAmountInput();
    if (!isValid){
        calculator.amount = "0.00";
        console.log(calculator); 
        money.value = calculator.amount; 
    } else {
        calculator.calculatePerPerson();
    }  
});

//add eventListeners to the buttons

buttons.forEach('click', () => {
    // add value to the object
    // calculate  
})







