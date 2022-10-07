
// Methods to make the html avaible in javascript 
let money = document.querySelector('#amount');
let money_input = document.querySelector('.amount_input')
let buttons = document.querySelectorAll(".buttons");
let custom = document.querySelector('#percentage');
let person = document.querySelector('#person');
let person_input = document.querySelector('.person_input');
let tipPerPerson = document.querySelector('.tipPerPerson');
let totalPerPerson = document.querySelector('.totalPerPerson');
let button = document.querySelector('.btn');    

// Class to hold the variables and functions 
class TipCalculator{

    constructor(amount, tip, persons){
        this.amount = amount; 
        this.tip = tip; 
        this.numberOfPersons = persons ; 
    }
}

let calculator =  new TipCalculator(0.00, 0.00, 0);

// Show ErrorMessage 

setError = (element, errorMessage) => {
    const parent = element.parentElement;
    const paragraph = parent.querySelector('.error')
    paragraph.textContent = errorMessage;
    element.classList.add('error_border');  
}

// Format output as currency 

let dollarUS = Intl.NumberFormat('en-us', {
    style: "currency", 
    currency: "USD",
}); 


//Calculations 

const calculateTotalPerPerson = () =>{
    
    // Doe niks al het bedrag of aantal personen niet ingevuld is
    
   console.log("im calculating "); 

    if (calculator.amount === 0 || calculator.numberOfPersons === 0) {
        return 
    }

    // Convert all values to integers or floats 
    let amount = parseFloat(calculator.amount); 
    let persons = parseInt(calculator.numberOfPersons);
    let tip = parseFloat(calculator.tip);  
    
    // calculate the tip per person 

    let outcome = (amount * ( 1 + tip)) / persons;
    
    totalPerPerson.innerHTML = dollarUS.format(outcome); 
}

const calculateTipPerPerson = () => {

    // Doe niks al het bedrag of aantal personen niet ingevuld is
    
     if (calculator.amount === 0 || calculator.numberOfPersons === 0) {
        return 
    }

    // Convert all values to integers or floats 
    let amount = parseFloat(calculator.amount); 
    let persons = parseInt(calculator.numberOfPersons);
    let tip = parseFloat(calculator.tip);  
    
    // calculate the tip per person 

    let outcome = (amount * tip) / persons;
    
    tipPerPerson.innerHTML = dollarUS.format(outcome);   
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
    return {
        isValid: true,
        
    }
}

// Check if percentage is of format of x of x.xx
const isValidFormatPercentage = (inputValue) => {
    reg = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/; 
    const isValid = reg.test(inputValue)
    if (!isValid) {
        return {
            isValid, 
            errorMessage : "Must be a percentage",
        }
    }
    return {
        isValid : true,
    }  
}

//Check if person is only a integer 

const isValidFormatPerson = (inputValue) => {
    reg = /^[0-9]*$/;
    const isValid = reg.test(inputValue);
    if (!isValid) {
        return {
            isValid,
            errorMessage: "Can only be a integer",
        }
    }
    return {
        isValid : true,
    }
}

//add eventListeners to the amount field

money.addEventListener('blur', (e) => {
    let input = e.target.value; 
    isValid = isInputValid(input, isNonNegativeFloat, isNotZero, isValidFormatAmount);
    if (!isValid.isValid){
        setError(money_input, isValid.errorsMessages[0])
    } else {
        calculator.amount = input; 
        calculateTotalPerPerson();
        calculateTipPerPerson() 
    }
});

// let the error message disappear

money.addEventListener('focus',() => {
    setError(money_input, "")
    money_input.classList.remove('error_border'); 
    money.value = "" ;
    money_input.style.border = "2px solid hsl(172, 67%, 45%)";   
}); 


// add eventListeners to the buttons 

buttons.forEach(function(button){
    button.addEventListener('change', (e) => {
        calculator.tip = e.target.value;

        custom.value = "Custom" ;

        calculateTotalPerPerson();
        calculateTipPerPerson(); 

    })
})

// add eventListener to the little inout field next to the buttons
percentage.addEventListener('blur', (e) => {
    let input = e.target.value; 
    isValid = isInputValid(input, isNonNegativeFloat, isNotZero, isValidFormatPercentage);
    if (!isValid.isValid){
        setError(custom, isValid.errorsMessages[0])
       } else {
        // unset the button 
        selected_button = document.querySelector('input[name="percentage"]:checked');
        if (selected_button != null){
            selected_button.checked = false;
  
        }
        
        
        // set the values and calculate from it 
        let parsed_input = (parseFloat(input)/100).toString();
        calculator.tip = parsed_input; 
        calculateTotalPerPerson();
        calculateTipPerPerson();  
       }
    
});

// Let the erors disappear

percentage.addEventListener('focus', () => {
    setError(custom, "");
    custom.classList.remove('error_border')
    custom.value="";
})

//Add eventListeners to the person input field

person.addEventListener('blur', (e) =>{
   let input = e.target.value;  
   isValid = isInputValid(input, isNonNegativeFloat, isNotZero, isValidFormatPerson);
   if (!isValid.isValid){
    setError(person_input, isValid.errorsMessages[0])
   } else {
    calculator.numberOfPersons = input; 
    calculateTotalPerPerson();
    calculateTipPerPerson();  
   }
})

person.addEventListener('focus', () => {
    setError(person_input, "");
    person_input.classList.remove('error_border')
    person.value = "" ;
})

// Add eventListener to the button to reset things

button.addEventListener('click', () => {
    
    // set object to standard 

    calculator.amount = "0"; 
    calculator.numberOfPersons = "0"; 
    calculator.tip = "0";
    
    // change screen

    amount_input.innerhtml = "0";
    
    selected_button = document.querySelector('input[name="percentage"]:checked');
    if (selected_button != null){
        selected_button.checked = false;

    }

    custom.innerHTML = "Custom"; 
    person_input.innerHTML = "0"
})







   
