let money = document.querySelector('#amount');
let money_input = document.querySelector('#amount-input')


class TipCalculator{

    constructor(amount, tip, persons){
        this.amount = amount; 
        this.tip = tip; 
        this.numberOfPersons = persons ; 
    }

    //Validation functions
    
    //Validate format amount 

    validateFormatAmount = () => {
        var reg = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
        return reg.test(this.amount);
         
    }

    isNotNull = () => {
        return parseFloat(this.amount) !== 0 ; 
    }

    //Display Error Messages 
    displayErrorMessage =  (error) => {
        let error = document.createClass('error');
        error.innerHTML = error;
        error.insertBefore('money_input');  
    }

    //validate amount input 

    validateAmount = () => {
        if (!this.validateFormatAmount() && this.isNotNull()) {
            displayErrorMessage('invalid input'); 
        }; 
    }

    
}

let calculator =  new TipCalculator(0.00, 0.00, 1); 

//add eventListener to the amount input 

money.addEventListener('blur', (e) => {
    // set entered amount in the class 
    calculator.amount = e.target.value; 
    // Validate the input
    calculator.validateAmount(); 

})

//add eventListeners to the buttons









   
