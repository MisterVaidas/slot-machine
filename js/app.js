"use strict";

let balance = 0; // initialize balance
let lastWin = 0;

function Fruit(name, value, image) {
  this.name = name;
  this.value = value;
  this.image = image;
}

const seven = new Fruit("seven", 10, "/images/seven.png");
const melon = new Fruit("melon", 9, "/images/melon.png");
const plum = new Fruit("plum", 8, "/images/plum.png");
const banana = new Fruit("banana", 7, "/images/banana.png");
const bar = new Fruit("bar", 6, "/images/bar.png");
const orange = new Fruit("orange", 7, "/images/orange.png");
const horseshoe = new Fruit("horseshoe", 7, "/images/horseshoe.png");
const strawberry = new Fruit("strawberry", 7, "/images/strawberry.png");
const bell = new Fruit("bell", 7, "/images/bell.png");
const lemon = new Fruit("lemon", 7, "/images/lemon.png");
const apple = new Fruit("apple", 7, "/images/apple.png");
const cherry = new Fruit("cherry", 7, "/images/cherry.png");
const crown = new Fruit("crown", 7, "/images/crown.png");

const fruits = [
  seven,
  melon,
  plum,
  banana,
  bar,
  orange,
  horseshoe,
  strawberry,
  bell,
  lemon,
  apple,
  cherry,
  crown,
];

var images = new Array();
images = [
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
  "/images/spin28.png",
];

setInterval("Animate1()", 60);
setInterval("Animate2()", 60);
setInterval("Animate3()", 60);

var x = 1;
var y = 3;
var z = 6;

function Animate1() {
  document.getElementById("img").src = images[x];
  x++;
  if (images.length == x) {
    x = 0;
  }
  document.getElementById("img2").src = images[x + 1];
  x++;
  if (images.length == x) {
    x = 0;
  }
  document.getElementById("img3").src = images[x + 2];
  x++;
  if (images.length == x) {
    x = 0;
  }
}

function Animate2() {
  document.getElementById("img4").src = images[y];
  y++;
  if (images.length == y) {
    y = 0;
  }
  document.getElementById("img5").src = images[y + 1];
  y++;
  if (images.length == y) {
    y = 0;
  }
  document.getElementById("img6").src = images[y + 2];
  y++;
  if (images.length == y) {
    y = 0;
  }
}

function Animate3() {
  document.getElementById("img7").src = images[z];
  z++;
  if (images.length == z) {
    z = 0;
  }
  document.getElementById("img8").src = images[z + 1];
  z++;
  if (images.length == z) {
    z = 0;
  }
  document.getElementById("img9").src = images[z + 2];
  z++;
  if (images.length == z) {
    z = 0;
  }
}

// Function to prompt user to enter deposit amount
function enterDeposit() {
  let deposit = prompt("Please enter you deposit amount between 1 and 100: ");
  deposit = parseInt(deposit, 10); // Parse the deposit to an number

  if (isNaN(deposit) || deposit < 1 || deposit > 100) {
    // validate deposit amount
    alert("Invalid deposit amount! Please try again");
    return enterDeposit();
  }

  balance += deposit; // update the balance and return deposit
  updateBalanceDisplay();
  return deposit;
}

let reels = document.querySelectorAll(".reel");
reels.forEach((reel) => {
  let slots = reel.querySelectorAll(".symbol");
  slots.forEach((slot) => {
    let randomIndex = Math.floor(Math.random() * fruits.length);
    slot.querySelector("img").src = fruits[randomIndex].image;
  });
});

// Function to update balance display
function updateBalanceDisplay() {
  document.getElementById("balance").textContent = balance;
}

enterDeposit();

let currentBet = 0; // initialize current bet
let canPlaceBet = true; // initialize bet placement status
let madeSpin = false;

// Function to handle betting
function placeBet(lines) {
  if (canPlaceBet) {
    if (balance >= lines) {
      // check if user have enough money
      currentBet = lines; // update current bet
      updateBetDisplay(); // update display bet
      canPlaceBet = false; // prevent further bet changes
      madeSpin = false; // reset madeSpin
    } else {
      alert("You dont have enough credits to place this bet");
    }
  } else {
    alert("You already placed a bet. Please reset a bet or spin the reels");
  }
}

function updateBetDisplay() {
  document.getElementById("bet").textContent = currentBet;
}

// function to reset bet
function resetBet() {
  if (!madeSpin) {
    // if reels spined
    currentBet = 0; // reset current bet

    canPlaceBet = true; // Allow bet changes
    updateBetDisplay();
  } else {
    alert("You already made a spin");
  }
}

function checkForWin() {
  let reels = document.querySelectorAll(".reel");
  let slots = Array.from(reels).map((reel) => reel.querySelectorAll(".symbol"));

  let linesToCheck = [];
  if (currentBet >= 1) linesToCheck.push(1);
  if (currentBet >= 2) linesToCheck.push(0);
  if (currentBet === 3) linesToCheck.push(2);

  for (let i of linesToCheck) {
    let line = slots.map((slot) => {
      let imageSrc = slot[i].querySelector("img").src;
      let imageName = imageSrc.split("/").pop().split(".")[0];
      return fruits.find((fruit) => fruit.name === imageName);
    });

    if (line.every((fruit) => fruit.name === line[0].name)) {
      // check if all symbols are the same
      balance += line[0].value * currentBet;
      updateBalanceDisplay();
      alert("You won " + line[0].value * currentBet + " credits!");

      lastWin = line[0].value * currentBet;
      document.querySelector("#last-win").textContent =
        "Last Win: " + lastWin + " credits";
    }
  }
}

function spinReels() {
  // spin reels function

  if (currentBet > 0) {
    if (balance >= currentBet) {
      balance -= currentBet; // deduct bet from the balance
      updateBalanceDisplay();
      madeSpin = true;

      let reels = document.querySelectorAll(".reel");
      reels.forEach((reel) => {
        let slots = reel.querySelectorAll(".symbol");
        slots.forEach((slot) => {
          let randomIndex = Math.floor(Math.random() * fruits.length);
          slot.querySelector("img").src = fruits[randomIndex].image;
        });
      });
      canPlaceBet = true; // allow bet changes
    } else {
      alert("You dont have enough credits. Please add more!");
    }
  } else {
    alert("You must place a bet first.");
  }

  setTimeout(checkForWin, 2000);
}

function addCredits(amount) {
  if (balance === 0) {
    balance += amount;
    updateBalanceDisplay();
  } else {
    alert("You still have credits. Play until you run out before adding more");
  }
}

document.querySelector("#add-credits").addEventListener("click", function () {
  if (balance === 0) {
    let amount;

    do {
      amount = parseInt(
        prompt("Please enter amount you want to add between 1 and 100")
      );
      if (isNaN(amount) || amount < 1 || amount > 100) {
        alert("Invalid input! Please enter a number from 1 to 100");
      }
    } while (isNaN(amount) || amount < 1 || amount > 100);

    addCredits(amount);
  } else {
    alert("You still have credits. Play until you run out before adding more.");
  }
});
