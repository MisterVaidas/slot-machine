'use strict'

let balance = 0; // initialize balance

// Function to prompt user to enter deposit amount
function enterDeposit() {
    let deposit = prompt('Please enter you deposit amount between 1 and 100: ');
    deposit = parseInt(deposit, 10); // Parse the deposit to an number
  
    if(isNaN(deposit) || deposit < 1 || deposit > 100) { // validate deposit amount
      alert('Invalid deposit amount! Please try again');
      return enterDeposit();
    }
  
    balance += deposit; // update the balance and return deposit
    updateBalanceDisplay();
    return deposit;
  }

  // Function to update balance display
  function updateBalanceDisplay() {
    document.getElementById('balance').textContent = balance;
  }

  enterDeposit();

  let currentBet = 0; // initialize current bet
  let canPlaceBet = true; // initialize bet placement status
  let madeSpin = false;
  
  // Function to handle betting
  function placeBet(lines) {
    if (canPlaceBet) {
        if (balance >= lines) { // check if user have enough money
            currentBet = lines; // update current bet
            updateBetDisplay(); // update display bet
            canPlaceBet = false; // prevent further bet changes
            madeSpin = false; // reset madeSpin
        } else {
            alert('You dont have enough money to place this bet');
        }
     } else {
        alert('You already placed a bet. Please reset a bet or spin the reels');
     }

    }

  function updateBetDisplay() {
    document.getElementById('bet').textContent = currentBet;
  }

  // function to reset bet
  function resetBet() {
    if (!madeSpin) { // if reels spined
        currentBet = 0; // reset current bet
        
        canPlaceBet = true; // Allow bet changes
        updateBetDisplay();
    } else {
        alert('You already made a spin');
    }
  }

  const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; // the array of symbols

  function spinReels() { // spin reels function
    if (currentBet > 0) {
        if (balance >= currentBet) {
            balance -= currentBet; // deduct bet from the balance
            updateBalanceDisplay();
            madeSpin = true;
        

        let reels = document.querySelectorAll('.reel');
        reels.forEach((reel) => {
            let slots = reel.querySelectorAll('.symbol');
            slots.forEach((slot) => {
                let randomIndex = Math.floor(Math.random() * symbols.length);
                slot.textContent = symbols[randomIndex];
            });
        });
        canPlaceBet = true; // allow bet changes
    } else {
        alert('You dont have enough money to place this bet');
    }

    } else {
        alert('You must place a bet first.');
    }
}

function addCredits(amount) {
    if (balance === 0) {
        balance += amount;
        updateBalanceDisplay();
    } else {
        alert('You still have credits. Play until you run out before adding more');

    }
}

document.querySelector('#add-credits').addEventListener('click', function() {
    if (balance === 0) {
    let amount = parseInt(prompt('Please enter amount you want to add between 1 and 100'));
    if (amount >= 1 && amount <= 100) {
        addCredits(amount);
    } else {
        alert('Invalid input! Please enter a number from 1 to 100');
    }
    } else {
        alert('You still have credits. Play until you run out before adding more.')
    } 
});
  
