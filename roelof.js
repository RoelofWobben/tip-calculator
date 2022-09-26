
// Methods to make the html avaible in javascript 
let money = document.querySelector('#amount');
let money_input = document.querySelector('#amount-input')
let error = document.querySelector(".errormessage");
let buttons = document.querySelectorAll(".buttons");
let custom = document.querySelector('#percentage');
let person = document.querySelector('#person');


// Class to hold the variables and functions 
class TipCalculator{

    constructor(amount, tip, persons){
        this.amount = amount; 
        this.tip = tip; 
        this.numberOfPersons = persons ; 
    }
}

let calculator =  new TipCalculator(0.00, 0.00, 1); 

//add eventListener to the amount input 



// Add invalid eventListener so the error message can be shown or hidden after a (in)valid input 
money.addEventListener('invalid', (e) => {
    console.log('invalid')
    //show error because aria-live is set to true 
    money.setAttribute('aria-invalid', 'true')
}); 

   

//add eventListeners to the buttons

buttons.forEach(function(button){
    button.addEventListener('change', (e) => {
        calculator.tip = e.target.value;
        //add class to selected button 

    })
})

// add eventListener to the little inout field next to the buttons
percentage.addEventListener('enter', (e) => {
    calculator.tip = e.target.value;
     
}); 

//Add eventListeners to the person input field

person.addEventListener('blur', (e) =>{
   calculator.numberOfPersons = e.target.value; 
 
})







   
