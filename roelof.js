
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
    console.log(parent); 
    const paragraph = parent.querySelector('.error')
    console.log(paragraph); 
    paragraph.textContent = errorMessage;
}

// Validations 
inputLowerZero = (number) =>{
    console.log(number < 0); 
    return number < 0 ; 
}

inputZero = (number) => {
    return number === 0; 
}


checkValidityAmount = (number) => {
    let input = parseFloat(number); 
   
   // check if amount is lower then zero 
   if (inputLowerZero(input)) {
     setError(money_input, "Cannot be lower then zero");
     money_input.style.border = "3px solid red";
     return false;  
   }
   
   // check if amount is zero 

   if (inputZero(input)) {
     setError(money_input, "Cannot be zero")
     money_input.style.border = "3px solid red";
    return false;   
   }

   //check if input is of format x or x.yz 
   reg = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/; 
   if (!reg.test(input)){
     setError(money_input, "is not a amount");
     money_input.style.border = "3px solid red";
     return false;    
   }

   //if everything is not false , it schould be a valid input 

   return true; 
}

checkValidityPercentage = (number) => {

    let valid = true;
    let input = parseFloat(number); 

   // check if amount is lower then zero 
   if (inputLowerZero(input)) {
     setError(custom, "Cannot be lower then zero");
     custom.style.border = "3px solid red";
     return false;  
   }
   
   // check if amount is zero 

   if (inputZero(input)) {
     setError(custom, "Cannot be zero")
     custom.style.border = "3px solid red";
     return false;  
   }

   //check if input is of format x or x.yz 
   reg = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/; 
   if (!reg.test(input)){
     setError(custom, "is not a percentage");
     custom.style.border = "3px solid red";
     return false;
   }

   return true; 
}

//add eventListeners to the amount field

money.addEventListener('blur', (e) => {
    let input = e.target.value; 
    if (checkValidityAmount(input)){
        calculator.amount = input; 
    }
});

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
    if (checkValidityPercentage(e.target.value)) {
        calculator.tip = e.target.value; 
    }; 
});

percentage.addEventListener('focus', () => {
    setError(custom, "");
    custom.style.border = "none";  
})

//Add eventListeners to the person input field

person.addEventListener('blur', (e) =>{
   calculator.numberOfPersons = e.target.value; 
 
})








   
