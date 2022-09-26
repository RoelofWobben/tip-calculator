let money = document.querySelector('#amount');
let money_input = document.querySelector('#amount-input')
let error = document.querySelector(".errormessage");
let buttons = document.querySelectorAll(".buttons");
let custom = document.querySelector('#percentage');
let person = document.querySelector('#person');

money.noValidate = true;

class TipCalculator{

    constructor(amount, tip, persons){
        this.amount = amount; 
        this.tip = tip; 
        this.numberOfPersons = persons ; 
    }
}

let calculator =  new TipCalculator(0.00, 0.00, 1); 

//add eventListener to the amount input 

money.addEventListener('invalid', (e) => {
    
    //show error if needed
    if (money.checkValidity()){
        error.setAttribute('aria-invalid', 'false')
    } else {
        error.setAttribute('aria-invalid', 'true')
    }

    // set entered amount in the class 
    calculator.amount = e.target.value; 
});

//add eventListeners to the buttons

buttons.forEach(function(button){
    button.addEventListener('click', (e) => {
        calculator.tip = e.target.value;
        //add class to selected button 

    })
})

percentage.addEventListener('enter', (e) => {
    calculator.tip = e.target.value;
     
}); 

person.addEventListener('blur', (e) =>{
   calculator.numberOfPersons = e.target.value; 
 
})







   
