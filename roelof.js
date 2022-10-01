
// Methods to make the html avaible in javascript 
let money = document.querySelector('#amount');
let money_input = document.querySelector('.amount_input')
let buttons = document.querySelectorAll(".buttons");
let custom = document.querySelector('#percentage');
let person = document.querySelector('#person');
let form = document.querySelector('.form');
const message = document.getElementById("usernameHint"); 


// Class to hold the variables and functions 
class TipCalculator{

    constructor(amount, tip, persons){
        this.amount = amount; 
        this.tip = tip; 
        this.numberOfPersons = persons ; 
    }
}

let calculator =  new TipCalculator(0.00, 0.00, 1);


// Show ErrorMessage 

setError = (element, errorMessage) => {
    const parent = element.parentElement;
    const paragraph = parent.querySelector('.error')
    paragraph.textContent = errorMessage;
    element.style.border = "3px solid red"; 
}

// Validations


//Do all the checks

const isInputValid = (inputValue, ...validators) => {
    const validationResult = {
      isValid: true,
      errorsMessages: []
    }
    
    validators.forEach(validator => {
      const {isValid, errorMessage} = validator(inputValue)
      if (!isValid) {
        validationResult.isValid = false
        validationResult.errorsMessages.push(errorMessage)
      }
    })
    
    return validationResult
}

// Check if the float is not smaller then zero 


const isNonNegativeFloat = (inputValue) => {
    const value = parseFloat(inputValue); 
    if (value < 0 ){
        return {
            isValid: false,
            errorMessage : 'Must be a postive'
        }
    };
    return {
        isValid : true,
    }
}


// Check if input is not zero 

const isNotZero = (inputValue) => {
    const value = parseFloat(inputValue)
    console.log(value); 
    if (value === 0) {
        return {
            isValid: false, 
            errorMessage: 'Cannot be zero '
        }
    }
    return {
        isValid: true, 
    }
}

// Check if the amount looks like x or x.xx 

const isValidFormatAmount = (inputValue) => {
    reg = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/; 
    const isValid = reg.test(inputValue)
    if (!isValid) {
        return {
            isValid, 
            errorMessage : "Must be a amount",
        }
    }
    return (isValid);  
}

const isValidFormatPercentage = (inputValue) => {
    reg = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/; 
    const isValid = reg.test(inputValue)
    if (!isValid) {
        return {
            isValid, 
            errorMessage : "Must be a percentage",
        }
    }
    return (isValid);  
}
//add eventListeners to the amount field

money.addEventListener('blur', (e) => {
    let input = e.target.value; 
    isValid = isInputValid(input, isNonNegativeFloat, isNotZero, isValidFormatAmount);
    if (!isValid.isvalid){
        setError(money_input, isValid.errorsMessages[0])
    }
});

// let the error message disappear

money.addEventListener('focus',() => {
    setError(money_input, "")
    money_input.style.border = "none"; 
}); 


// add eventListeners to the buttons 

buttons.forEach(function(button){
    button.addEventListener('change', (e) => {
        calculator.tip = e.target.value;
    })
})

// add eventListener to the little inout field next to the buttons
percentage.addEventListener('blur', (e) => {
    let input = e.target.value; 
    isValid = isInputValid(input, isNonNegativeFloat, isNotZero, isValidFormatPercentage);
    if (!isValid.isvalid){
        setError(custom, isValid.errorsMessages[0])
    }
});

// Let the erors disappear

percentage.addEventListener('focus', () => {
    setError(custom, "");
    custom.style.border = "none";  
})

//Add eventListeners to the person input field

person.addEventListener('blur', (e) =>{
   calculator.numberOfPersons = e.target.value; 
 
})








   
