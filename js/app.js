'use strict'

let balance = 0; // initialize balance
let lastWin = 0;

function Fruit(name, value, image) {

    this.name = name;
    this.value = value;
    this.image = image;
  }

  const seven = new Fruit('seven', 10, '/images/seven.png');
  const melon = new Fruit('melon', 9, '/images/melon.png');
  const plum = new Fruit('plum', 8, '/images/plum.png');
  const banana = new Fruit('banana', 7, '/images/banana.png');
  const bar = new Fruit('bar', 6, '/images/bar.png');
  const orange = new Fruit('orange', 7, '/images/orange.png');
  const horseshoe = new Fruit('horseshoe', 7, '/images/horseshoe.png');
  const strawberry = new Fruit('strawberry', 7, '/images/strawberry.png');
  const bell = new Fruit('bell', 7, '/images/bell.png');
  const lemon = new Fruit('lemon', 7, '/images/lemon.png');

const fruits = [seven, melon, plum, banana, bar, orange, horseshoe, strawberry, bell, lemon];

// Function to prompt user to enter deposit amount
function enterDeposit() {
    document.getElementById('depositModal').style.display = 'block';
}
   
    document.getElementById('submitDeposit').addEventListener('click', function() {
        let deposit = document.getElementById('depositAmount').value;
        deposit = parseInt(deposit, 10); // Parse the deposit to an number

        if(isNaN(deposit) || deposit < 1 || deposit > 100) { // validate deposit amount
            alert('Invalid deposit amount! Please try again');
            return enterDeposit();

        }

        let reels = document.querySelectorAll('.reel');
        reels.forEach((reel) => {
            let slots = reel.querySelectorAll('.symbol');
            slots.forEach((slot) => {
                let randomIndex = Math.floor(Math.random() * fruits.length);
                slot.querySelector('img').src = fruits[randomIndex].image;
            });
            });

        balance += deposit; // update the balance and return deposit
        updateBalanceDisplay();

        document.getElementById('depositModal').style.display = 'none';

    });

    

 
  

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
            alert('You dont have enough credits to place this bet');
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

  


   // the array of symbols

 

  function checkForWin() {
    let reels = document.querySelectorAll('.reel');
    let slots = Array.from(reels).map(reel => reel.querySelectorAll('.symbol'));

    let linesToCheck = [];
    if (currentBet >= 1) linesToCheck.push(1);
    if (currentBet >= 2) linesToCheck.push(0);
    if (currentBet === 3) linesToCheck.push(2);

       for (let i of linesToCheck) {
        let line = slots.map(slot => {
            let imageSrc = slot[i].querySelector('img').src;
            let imageName = imageSrc.split('/').pop().split('.')[0];
            return fruits.find(fruit => fruit.name === imageName);

        });

        if (line.every(fruit => fruit.name === line[0].name)) { // check if all symbols are the same
            balance += line[0].value * currentBet;
            updateBalanceDisplay();
            alert('You won ' + (line[0].value * currentBet) + ' credits!');

            lastWin = line[0].value * currentBet;
            document.querySelector('#last-win').textContent = "Last Win: " + lastWin + ' credits';

        }
    }
}

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
                let randomIndex = Math.floor(Math.random() * fruits.length);
                slot.querySelector('img').src = fruits[randomIndex].image;
            });
        });
        canPlaceBet = true; // allow bet changes
    } else {
        alert('You dont have enough credits. Please add more!');
    }

    } else {
        alert('You must place a bet first.');
    }

    setTimeout(checkForWin, 2000);
}

function addCredits() {
    if (balance === 0) {
        document.getElementById('addCreditsModal').style.display = 'block';
    } else {
        alert('You still have credits. Play until you run out before adding more');

    }
}

document.querySelector('#add-credits').addEventListener('click', addCredits);
   document.getElementById('submitAddCredits').addEventListener('click', function() {
    let amount = document.getElementById('addCreditsAmount').value;
    amount = parseInt(amount, 10);
   
   
        if (isNaN(amount) || amount < 1 || amount > 100) {
        alert('Invalid input! Please enter a number from 1 to 100');
        return;
        }

        balance += amount;
        updateBalanceDisplay();

        document.getElementById('addCreditsModal').style.display = 'none';

});
  
