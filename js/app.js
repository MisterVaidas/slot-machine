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
  const orange = new Fruit('orange', 5, '/images/orange.png');
  const horseshoe = new Fruit('horseshoe', 4, '/images/horseshoe.png');
  const strawberry = new Fruit('strawberry', 3, '/images/strawberry.png');
  const bell = new Fruit('bell', 2, '/images/bell.png');
  const lemon = new Fruit('lemon', 1, '/images/lemon.png');

const fruits = [seven, melon, plum, banana, bar, orange, horseshoe, strawberry, bell, lemon];

// Function to prompt user to enter deposit amount
function enterDeposit() {
    document.getElementById('depositModal').style.display = 'block';
}
   
    document.getElementById('submitDeposit').addEventListener('click', function() {
        let deposit = document.getElementById('depositAmount').value;
        deposit = parseInt(deposit, 10); // Parse the deposit to an number

        if(isNaN(deposit) || deposit < 1 || deposit > 100) { // validate deposit amount
            document.getElementById('depositError').textContent = 'Invalid deposit amount! Please try again';
            return;

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
        document.getElementById('depositError').textContent = '';
    });

    function displayMessage(msg) {
        document.getElementById('message').textContent = msg;

    }
    displayMessage('Welcome to Fruity Party! Place your bet and press SPIN. Good luck!');


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
            displayMessage('You dont have enough credits to place this bet');
        }
     } else {
        displayMessage('You already placed a bet. Please reset a bet or spin the reels');
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
        displayMessage('You already made a spin');
    }
  }

  function checkForWin() {
    clearInterval(spinInterval); // Stop the spinning message
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
            balance += line[0].value; // * currentBet;
            updateBalanceDisplay();
            displayMessage('You won ' + (line[0].value * currentBet) + ' credits!');

            lastWin = line[0].value * currentBet;
            document.querySelector('#last-win').textContent = "Last Win: " + lastWin + ' credits';

        } else {
            displayMessage('No win, try again.');
        }
    }
}

let spinInterval;


  function spinReels() { // spin reels function
    displayMessage('');

    if (currentBet > 0 && balance >= currentBet) {
        balance -= currentBet; // deduct bet from the balance
        updateBalanceDisplay();
        madeSpin = true;

    // Set up spinning message
        let dots = '';
        spinInterval = setInterval(() => {
        dots = dots.length < 3 ? dots + '.' : '';
        displayMessage('Spinning' + dots);
    }, 500); // Interval time can be modified to control speed of animation

     // spin the reels with delay
     setTimeout(() => spinReel(0), 1000);
     setTimeout(() => spinReel(1), 2000);
     setTimeout(() => {
         spinReel(2);
         setTimeout(checkForWin, 2000); // Check for win after all reels have stopped spinning
     }, 3000);
            //balance -= currentBet; // deduct bet from the balance
           // updateBalanceDisplay();
           // madeSpin = true;
            canPlaceBet = true; // allow bet changes
        

        let reels = document.querySelectorAll('.reel');
        let randomFruits = [];

        reels.forEach((reel, index) => {
            randomFruits[index] = [];
            let slots = reel.querySelectorAll('.symbol');
            slots.forEach((slot) => {
                let randomIndex = Math.floor(Math.random() * fruits.length);
                randomFruits[index].push(fruits[randomIndex].image);
            });
        });

        setTimeout(() => {
            let slots = reels[0].querySelectorAll('.symbol');
            slots.forEach((slot, index) => {
                slot.querySelector('img').src = randomFruits[0][index];
            });
        }, 1000);

        setTimeout(() => {
            let slots = reels[1].querySelectorAll('.symbol');
            slots.forEach((slot, index) => {
                slot.querySelector('img').src = randomFruits[1][index];
            });
        }, 2000);

        setTimeout(() => {
            let slots = reels[2].querySelectorAll('.symbol');
            slots.forEach((slot, index) => {
                slot.querySelector('img').src = randomFruits[2][index];
            });
        }, 3000);

    } else if (currentBet === 0) {
        displayMessage('You must place a bet first.');
    

    } else {
        displayMessage('You dont have enough credits. Please add more!');
    }

    setTimeout(checkForWin, 3500);
}

function addCredits() {
    document.getElementById('addCreditsModal').style.display = 'block';
}

document.querySelector('#add-credits').addEventListener('click', function() {

    if (balance === 0) {
        addCredits();

    } else {
        displayMessage('You can only add credits if you run out');

    }
});

document.getElementById('submitAddCredits').addEventListener('click', function() {
    let amount = document.getElementById('addCreditsAmount').value;
    amount = parseInt(amount, 10);

    if(isNaN(amount) || amount < 1 || amount > 100) { // validate deposit amount
        document.getElementById('addCreditsError').textContent = 'Invalid input! Please enter a number from 1 to 100';
        return;
}

balance += amount;
updateBalanceDisplay();

document.getElementById('addCreditsError').textContent = '';
document.getElementById('addCreditsModal').style.display = 'none';

});
  
