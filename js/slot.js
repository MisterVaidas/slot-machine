"use strict";

const reelNameList = [];
console.log(reelNameList);
const reelSymbolList = [];
console.log(reelSymbolList);
const reelList = [];
console.log(reelList);

const img1 = document.querySelector("#reel1 img:first-child");
const img2 = document.querySelector("#reel1 img:nth-child(2)");
const img3 = document.querySelector("#reel1 img:nth-child(3)");
const img4 = document.querySelector("#reel1 img:nth-child(4)");
const img5 = document.querySelector("#reel1 img:nth-child(5)");
const img6 = document.querySelector("#reel1 img:nth-child(6)");
const img7 = document.querySelector("#reel2 img:first-child");
const img8 = document.querySelector("#reel2 img:nth-child(2)");
const img9 = document.querySelector("#reel2 img:nth-child(3)");
const img10 = document.querySelector("#reel2 img:nth-child(4)");
const img11 = document.querySelector("#reel2 img:nth-child(5)");
const img12 = document.querySelector("#reel2 img:nth-child(6)");
const img13 = document.querySelector("#reel3 img:first-child");
const img14 = document.querySelector("#reel3 img:nth-child(2)");
const img15 = document.querySelector("#reel3 img:nth-child(3)");
const img16 = document.querySelector("#reel3 img:nth-child(4)");
const img17 = document.querySelector("#reel3 img:nth-child(5)");
const img18 = document.querySelector("#reel3 img:nth-child(6)");

function Reel(
  name0,
  src0,
  name1,
  src1,
  name2,
  src2,
  name3,
  src3,
  name4,
  src4,
  name5,
  src5
) {
  this.name0 = name0;
  reelNameList.push(name0);
  this.src0 = src0;
  reelSymbolList.push(src0);
  this.name1 = name1;
  reelNameList.push(name1);
  this.src1 = src1;
  reelSymbolList.push(src1);
  this.name2 = name2;
  reelNameList.push(name2);
  this.src2 = src2;
  reelSymbolList.push(src2);
  this.name3 = name3;
  reelNameList.push(name3);
  this.src3 = src3;
  reelSymbolList.push(src3);
  this.name4 = name4;
  reelNameList.push(name4);
  this.src4 = src4;
  reelSymbolList.push(src4);
  this.name5 = name5;
  reelNameList.push(name5);
  this.src5 = src5;
  reelSymbolList.push(src5);
  reelList.push(this);
}

function renderReels() {
  img1.setAttribute("src", reelSymbolList[0]);
  img2.setAttribute("src", reelSymbolList[1]);
  img3.setAttribute("src", reelSymbolList[2]);
  img4.setAttribute("src", reelSymbolList[3]);
  img5.setAttribute("src", reelSymbolList[4]);
  img6.setAttribute("src", reelSymbolList[5]);
  img7.setAttribute("src", reelSymbolList[0]);
  img8.setAttribute("src", reelSymbolList[1]);
  img9.setAttribute("src", reelSymbolList[2]);
  img10.setAttribute("src", reelSymbolList[3]);
  img11.setAttribute("src", reelSymbolList[4]);
  img12.setAttribute("src", reelSymbolList[5]);
  img13.setAttribute("src", reelSymbolList[0]);
  img14.setAttribute("src", reelSymbolList[1]);
  img15.setAttribute("src", reelSymbolList[2]);
  img16.setAttribute("src", reelSymbolList[3]);
  img17.setAttribute("src", reelSymbolList[4]);
  img18.setAttribute("src", reelSymbolList[5]);
}
const reel1 = new Reel(
  "Apple",
  "/images/editedApple.png",
  "Banana",
  "/images/editedBanana.png",
  "Bar",
  "/images/editedBar.png",
  "Bell",
  "/images/editedBell.png",
  "Cherry",
  "/images/editedCherry.png",
  "Crown",
  "/images/editedCrown.png"
);

renderReels();

let balance = 0; // initialize balance
let lastWin = 0;

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

let symbols = reelSymbolList;

// Object to store the values of the symbols
let symbolValues = {
  img1: 10,
  img2: 9,
  img3: 8,
  img4: 7,
  img5: 6,
  img6: 5,
  img7: 10,
  img8: 9,
  img9: 8,
  img10: 7,
  img11: 6,
  img12: 5,
  img13: 10,
  img14: 9,
  img15: 8,
  img16: 7,
  img17: 6,
  img18: 5,
};

function checkForWin() {
  let reels = document.querySelectorAll(reels);
  let slots = Array.from(reels).map((reel) => reel.querySelectorAll(".symbol"));
  console.log(slots);
  // mapped to new constructor function array

  let linesToCheck = [];
  if (currentBet >= 1) linesToCheck.push(1);
  if (currentBet >= 2) linesToCheck.push(0);
  if (currentBet === 3) linesToCheck.push(2);

  /* let totalWin = 0;

    for (let i of linesToCheck) {
        let line = slots.map(slot => slot[i].textContent); // Get the symbols on the line
        if (line.every(symbol => symbol === line[0])) { // Check if all symbols are the same
            // If they are, the user wins. Add the symbol's value to totalWin.
            totalWin += symbolValues[line[0]] * currentBet;
        }
    }

    if (totalWin > 0) {
        // Add totalWin to the balance
        balance += totalWin;
        updateBalanceDisplay(); // Update displayed balance

        // Update last win
        lastWin = totalWin;
        document.querySelector('#last-win').textContent = "Last Win: " + lastWin + " credits";

        alert("You won " + totalWin + " credits!");
    }
}*/

  //   for (let i of linesToCheck) {
  //     let line = slots.map((slot) => slot[i].textContent); // Get the symbols on the line
  //     if (line.every((symbol) => symbol === line[0])) {
  //       // check if all symbols are the same
  //       balance += symbolValues[line[0]] * currentBet;
  //       updateBalanceDisplay();
  //       alert("You won " + symbolValues[line[0]] * currentBet + " credits!");

  //       lastWin = symbolValues[line[0]] * currentBet;
  //       document.querySelector("#last-win").textContent =
  //         "Last Win: " + lastWin + " credits";
  //     }
  //   }
  // }

  function spinReels() {
    // spin reels function

    if (currentBet > 0) {
      if (balance >= currentBet) {
        balance -= currentBet; // deduct bet from the balance
        updateBalanceDisplay();
        madeSpin = true;

        let reels = document.querySelectorAll("#reel1, #reel2, #reel3");
        reels.forEach((reel) => {
          let slots = reel.querySelectorAll(".symbol");
          slots.forEach((slot) => {
            let randomIndex = Math.floor(Math.random() * symbols.length);
            slot.textContent = symbols[randomIndex];
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
      alert(
        "You still have credits. Play until you run out before adding more"
      );
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
      alert(
        "You still have credits. Play until you run out before adding more."
      );
    }
  });
}
