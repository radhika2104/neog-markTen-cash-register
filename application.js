document.addEventListener('DOMContentLoaded',function(){

    var billAmount = document.querySelector('#billAmount');
    var nextButton = document.querySelector('#btn-next');
    var billMessage = document.querySelector('#billMessage');
    var cashDiv = document.querySelector('#div-cash');
    var cashAmount = document.querySelector('#cashAmount');
    var cashMessage = document.querySelector('#cashMessage');
    var checkButton = document.querySelector('#btn-check');
    var tableDataNotes = document.querySelectorAll('.td-Notes');
    var returnNotesTable  = document.querySelector("#table-return");
    const notes = [2000,500,100,20,10,5,1]
   

    // Inorder to show initial display, hide all HTML elements required later on processing
    hideElement(billMessage)
    hideElement(cashDiv)
    hideElement(cashMessage)
    hideElement(checkButton)
    hideElement(returnNotesTable)

    

    
    function hideElement(element){
        // Helper function to hide element
        element.style.display = 'none';
    }
    function showElement(element){
         // Helper function to show element
        element.style.display = 'block';
    }

    function billMessageHandler(msg){
         // Helper function to show error for billAmount element
        billMessage.innerText = msg;
        showElement(billMessage);
    }

    function cashMessageHandler(msg){
        // Helper function to show error for cashAmount element
        cashMessage.innerText = msg;
        showElement(cashMessage);
    }

    function notesToBeReturned(returnAmount){
        // Helper function to determine notes to be returned
        
        for (var i = 0; i < notes.length ;i++)
        {
            // Current currency's notes required will be the integer value on division 
            var currentNoteCount = Math.trunc(returnAmount / notes[i]);
            // Remainder will be the value left to be returned for next loop
            returnAmount = returnAmount % notes[i];
            // Update the currency's count in table data
            tableDataNotes[i].innerText = currentNoteCount;

        }
    };


    nextButton.addEventListener("click", function billAmountHandler() {
        // On click of next button, check if billAmount is valid and process cash to be paid if successfull
        
        var bAmount = Number(billAmount.value)
        
        // Error checking
        if (parseFloat(bAmount) === 0) {
            msg = 'Error: Enter a numeric value to proceed!'
            billMessageHandler(msg);
            
        }
        else if (isNaN(bAmount) === true){
            msg = 'Error: Please enter a Number only!'
            billMessageHandler(msg);
            
        }
        else if (bAmount < 0){
            msg = 'Error: Please enter a bill amount greater than 0!'
            billMessageHandler(msg);
            
        } else{
            hideElement(nextButton);
            hideElement(billMessage);
            hideElement(cashMessage);
            showElement(cashDiv);
            showElement(checkButton);

        }
    });

    checkButton.addEventListener("click", function checkHandler() {
        // Error checks for bill and cash amount, on success, show return change table to user
        hideElement(returnNotesTable);
        var cAmount = Number(cashAmount.value);
        var bAmount = Number(billAmount.value);
        if (parseFloat(cAmount) === 0 ){
            msg = 'Error: Enter a numeric value  of cash paid to proceed!'
            cashMessageHandler(msg);
            
        }
        else if (parseFloat(bAmount) === 0){
            msg = 'Error: Enter a numeric value  of bill Amount to proceed!'
            cashMessageHandler(msg);
            
        }
        else if (isNaN(bAmount) === true || isNaN(cAmount) === true){
            msg = 'Error: Please enter a valid number only!'
            cashMessageHandler(msg);
            
        } else if (cAmount <= 0 || bAmount <= 0){
            msg = 'Error: Please enter values greater than 0!'
            cashMessageHandler(msg);
        }
        else if (cAmount < bAmount) {
            msg = 'Error: Cash paid should be atleast equal to the bill Amount!'
            cashMessageHandler(msg);
            
        } else{
            var returnAmount = cAmount - bAmount;  
            notesToBeReturned(returnAmount);
            // Show relevant divs and hide errors
            showElement(returnNotesTable);
            hideElement(billMessage);
            hideElement(cashMessage);
            
        }     
    });

});
