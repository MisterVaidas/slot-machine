'use strict'

let balance = 0; // initialize balance

// Function to prompt user to enter deposit amount
function enterDeposit() {
    let deposit = prompt('Please enter you deposit amount between 1 and 100: ');
    deposit = parseInt(deposit, 10); // Parse the deposit to an integer
  
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
  
  // Function to handle betting
  function placeBet(lines) {
    if (canPlaceBet) {
        if (balance >= lines) { // check if user have enough money
            currentBet = lines; // update current bet
            balance -= lines; // subtract bet from the balance
            updateBalanceDisplay(); // upadte display balance
            updateBetDisplay(); // update display bet
            canPlaceBet = false; // prevent further bet changes
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
    if (!canPlaceBet) { // If a bet has been placed
        balance += currentBet // refund the bet
        currentBet = 0; // reset current bet
        updateBalanceDisplay();
        updateBetDisplay();
        canPlaceBet = true; // Allow bet changes
    }
  }

  function spinReels() {
    if (currentBet > 0) {
        canPlaceBet = true; // allow bet changes
    } else {
        alert('You must place a bet first.');
    }
  }
  
