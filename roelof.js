
// Methods to make the html avaible in javascript 
let money = document.querySelector('#amount');
let money_input = document.querySelector('.amount_input')
let error = document.querySelector(".errormessage");
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

//add eventListeners to the buttons

money.addEventListener('blur', (e) => {
    money.checkValidity();
    let checked = money.validationMessage.trim()
    message.hidden = checked === "";
});


money.addEventListener('focus', (e) => {
   document.getElementById("usernameHint").hidden = true;
});

buttons.forEach(function(button){
    button.addEventListener('change', (e) => {
        calculator.tip = e.target.value;
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







   
