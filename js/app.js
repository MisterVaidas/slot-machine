'use strict'

let balance = 0; // initialize balance
let lastWin = 0;
let spinning = false;



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

// animations 


const images = [
  "/images/spin1.png",
  "/images/spin2.png",
  "/images/spin3.png",
  "/images/spin4.png",
  "/images/spin5.png",
  "/images/spin6.png",
  "/images/spin7.png",
  "/images/spin8.png",
  "/images/spin9.png",
  "/images/spin10.png",
  "/images/spin11.png",
  "/images/spin12.png",
  "/images/spin13.png",
  "/images/spin14.png",
  "/images/spin15.png",
  "/images/spin16.png",
  "/images/spin17.png",
  "/images/spin18.png",
  "/images/spin19.png",
  "/images/spin20.png",
  "/images/spin21.png",
  "/images/spin22.png",
  "/images/spin23.png",
  "/images/spin24.png",
  "/images/spin25.png",
  "/images/spin26.png",
  "/images/spin27.png",
  "/images/spin28.png"
];

var x = 0; //these variable set the image in the array that is the starting point of the animation
var y = 0;
var z = 0;


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

function populateReel(reelIndex, reels, randomFruits) {
    setTimeout(() => {
        let slots = reels[reelIndex].querySelectorAll('.symbol');
        slots.forEach((slot, index) => {
            slot.querySelector('img').src = randomFruits[reelIndex][index];
        });
    }, 1000 * (reelIndex + 1));
}

let animate1 = function() {
 // animation function for reel1
 document.getElementById("img").src = images[x]; //displays the image at position [x]
 x++; //increases [x] by 1
 if (images.length == x) {
   // checks if x == last image in the animation array
   x = 0; // if it is then the animation starts again from position [0]
 }
 document.getElementById("img2").src = images[x]; //displays the image at position [x+1]
 x++;
 if (images.length == x) {
   x = 0;
 }
 document.getElementById("img3").src = images[x]; //displays the image at position [x+2]
 x++;
 if (images.length == x) {
   x = 0;
 }
};

let animate2 = function() {
// animation function for reel2
document.getElementById("img4").src = images[y];
y++;
if (images.length == y) {
  y = 0;
}
document.getElementById("img5").src = images[y];
y++;
if (images.length == y) {
  y = 0;
}
document.getElementById("img6").src = images[y];
y++;
if (images.length == y) {
  y = 0;
}
};

let animate3 = function() {
 // animation function for reel3
 document.getElementById("img7").src = images[z];
 z++;
 if (images.length == z) {
   z = 0;
 }
 document.getElementById("img8").src = images[z];
 z++;
 if (images.length == z) {
   z = 0;
 }
 document.getElementById("img9").src = images[z];
 z++;
 if (images.length == z) {
   z = 0;
 }
};

let Animate1, Animate2, Animate3;
let interval1, interval2, interval3;

function spinReels() { // spin reels function
  displayMessage('');

  clearInterval(interval1);
  clearInterval(interval2);
  clearInterval(interval3);

    interval1 = setInterval(animate1, 30);
    interval2 = setInterval(animate2, 30);
    interval3 = setInterval(animate3, 30);

    //setTimeout(stopAnimation, 3000);
  
}
  // Hide the animation
  function stopAnimation1() {
    clearInterval(interval1);
    document.getElementById("img").style.display = "none";
    document.getElementById("img2").style.display = "none";
    document.getElementById("img3").style.display = "none";

    let randomFruits = populateReel();

    document.getElementById("reel").src = randomFruits;
    document.getElementById("reel").style.display = "block";

    spinning = false;
}

  function stopAnimation2() {
    clearInterval(interval2);
    document.getElementById("img4").style.display = "none";
    document.getElementById("img5").style.display = "none";
    document.getElementById("img6").style.display = "none";

    let randomFruits = populateReel();

    document.getElementById("reel").src = randomFruits;
    document.getElementById("reel").style.display = "block";

    spinning = false;
  }

  function stopAnimation3() {
    clearInterval(interval3);
    document.getElementById("img7").style.display = "none";
    document.getElementById("img8").style.display = "none";
    document.getElementById("img9").style.display = "none";

    let randomFruits = populateReel();

    document.getElementById("reel").src = randomFruits;
    document.getElementById("reel").style.display = "block";

    spinning = false;

  }
  // Show the symbols
  /*let slots = document.querySelectorAll('.symbol');
  slots.forEach(slot => slot.style.display = "block");
}*/

function spin() {
  

  if (spinning) {
    return;
  }

  document.getElementById("img").style.display = "block";
  document.getElementById("img2").style.display = "block";
  document.getElementById("img3").style.display = "block";

  document.getElementById("img4").style.display = "block";
  document.getElementById("img5").style.display = "block";
  document.getElementById("img6").style.display = "block";

  document.getElementById("img7").style.display = "block";
  document.getElementById("img8").style.display = "block";
  document.getElementById("img9").style.display = "block";

  spinning = true;
  // Start animations
  spinReels();

    setTimeout(stopAnimation1, 1000); // Stop Animate1 after 3 seconds
    setTimeout(stopAnimation2, 2000); // Stop Animate2 after 3.5 seconds
    setTimeout(stopAnimation3, 3000); // Stop Animate3 after 4 seconds
    setTimeout(function() { spinning = false; }, 3100);

//stopAnimation();
//setTimeout(stopAnimation, 3000);
}



    if (currentBet > 0 && balance >= currentBet) {
        balance -= currentBet; // deduct bet from the balance
        updateBalanceDisplay();
        madeSpin = true;

        // Set up spinning message
        let dots = '';
        spinInterval = setInterval(() => {
            dots = dots.length < 3 ? dots + '.' : '';
            displayMessage('Spinning' + dots);
        }, 500); 

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

        for (let i = 0; i < reels.length; i++) {
            populateReel(i, reels, randomFruits);
        }

        canPlaceBet = true; // allow bet changes

    } else if (currentBet === 0) {
        displayMessage('You must place a bet first.');
    } else {
        displayMessage('You dont have enough credits. Please add more!');
    }

    setTimeout(checkForWin, 3500);



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