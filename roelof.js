let money = document.querySelector('.amount'); 
let inputAmountDiv = document.querySelector('.bill_input')
let error_amount = document.querySelector('.error_amount'); 


class TipCalculator{

    constructor(amount, tip, persons){
        this.amount = amount; 
        this.tip = tip; 
        this.numberOfPersons = persons ; 
    }

    displayAmountError(text) {
        //make border red
        if (text === ""){
            inputAmountDiv.style.border = "none"
        }
        else {
            inputAmountDiv.style.border = "2px solid red"
        }
        error_amount.innerHTML = "<i class='fa-sharp fa-solid fa-circle-exclamation'></i>" + " "  + text;  
    }

    isValidFormat() {
        var reg = /\d{1,10}(\.\d{1,2})?/;
        if (!reg.test(this.amount)){
           this.displayAmountError('Is not valid amount');
           return false;  
        }
        this.displayAmountError("");
        return true; 
    }

    isNotNull() {
        if (this.amount === "0"){
            this.displayAmountError('It is not allowed to be zero');
            return false;
        } 
        this.displayAmountError("")
        return true; 
    }

    isNotNegative() {
        let number = parseFloat(this.amount);
        if (number < 0){
            this.displayAmountError("Amount cannot be negative");
            return false; 
        }
        this.displayAmountError(""); 
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
    calculator.validateAmountInput(); 
}); 







