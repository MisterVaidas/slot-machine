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

const reelList1 = [];

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
  this.src0 = src0;
  this.name1 = name1;
  this.src1 = src1;
  this.name2 = name2;
  this.src2 = src2;
  this.name3 = name3;
  this.src3 = src3;
  this.name4 = name4;
  this.src4 = src4;
  this.name5 = name5;
  this.src5 = src5;
  reelList1.push(this);
  console.log(reelList1);
}

function renderReels() {
  img1.setAttribute("src", reelList1[0].src0);
  img2.setAttribute("src", reelList1[0].src1);
  img3.setAttribute("src", reelList1[0].src2);
  img4.setAttribute("src", reelList1[0].src3);
  img5.setAttribute("src", reelList1[0].src4);
  img6.setAttribute("src", reelList1[0].src5);
  img7.setAttribute("src", reelList1[0].src0);
  img8.setAttribute("src", reelList1[0].src1);
  img9.setAttribute("src", reelList1[0].src2);
  img10.setAttribute("src", reelList1[0].src3);
  img11.setAttribute("src", reelList1[0].src4);
  img12.setAttribute("src", reelList1[0].src5);
  img13.setAttribute("src", reelList1[0].src0);
  img14.setAttribute("src", reelList1[0].src1);
  img15.setAttribute("src", reelList1[0].src2);
  img16.setAttribute("src", reelList1[0].src3);
  img17.setAttribute("src", reelList1[0].src4);
  img18.setAttribute("src", reelList1[0].src5);
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
