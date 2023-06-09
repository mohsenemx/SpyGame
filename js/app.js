const startB = document.querySelector("#startB");
const NextB = document.querySelector("#NextB");
const ShowB = document.querySelector("#ShowB");
const HideB = document.querySelector("#HideB");

const centerDiv = document.querySelector(".center");
const titledDiv = document.querySelector(".titled");
const gameDiv = document.querySelector(".game");

const out1 = document.querySelector("#out1");
const out2 = document.querySelector("#out2");
const out11 = document.querySelector("#out11");

// Class for language selection, unused for now
class lang {
  constructor(lang) {
    if (lang == "en") {
      const words = {};
      const sentences = {
        youarespy: "You are a spy",
        youword: "Your Wors is: ",
        whosspy: "Who's the Spy?",
      };
    } else {
      const sentences = {
        youarespy: "شما جاسوس هستید",
        youword: "کلمه شما: ",
        whosspy: "جاسوس کیه؟",
      };
    }
  }
}

let numOfPlayers = 0;
let numOfSpies = 0;
let totalMinutes = 0;
let gameWord = "";
let spies = [];
let currentPlayer = 1;
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then((res) => console.log(""))
      .catch((err) => console.log("", err));
  });
}
startB.addEventListener("click", function () {
  draw();
});

function draw() {
  centerDiv.style.display = "none";
  titledDiv.style.display = "none";
  gameDiv.style.display = "block";

  initg();
}

function initg() {
  let rnd = Math.floor(Math.random() * (words.length + 1));
  gameWord = words[rnd];
  /*console.log("gameWord: " + gameWord);*/

  numOfPlayers = document.querySelector("#lm1").valueAsNumber;
  numOfSpies = document.querySelector("#lm2").valueAsNumber;
  totalMinutes = document.querySelector("#lm3").valueAsNumber;
  let numOfSpies2 = numOfSpies;

  for (let i = 1; i <= numOfSpies2; i++) {
    let rndf = Math.floor(Math.random() * (numOfPlayers - 1)) + 1;

    if (!spies.includes(rndf)) spies.push(rndf);
    else numOfSpies2++;
    /*console.log("spies: " + spies);*/
  }
}

NextB.addEventListener("click", function () {
  game();
});
ShowB.addEventListener("click", function () {
  show();

  HideB.style.display = "block";
  ShowB.style.display = "none";
});

HideB.addEventListener("click", function () {
  out1.innerHTML = "Click Show or Click Next";

  HideB.style.display = "none";
  ShowB.style.display = "block";
});
function game() {
  if (currentPlayer > numOfPlayers) {
    last(totalMinutes);
  } else {
    out1.innerHTML = "Click Show or Click Next";
    out11.innerHTML = "Player " + currentPlayer;
  }
}
function show() {
  if (spies.includes(currentPlayer) == 1) {
    out1.innerHTML = "You are the spy";
  } else {
    out1.innerHTML =
      "Your Word is " + '<span class="pers">' + gameWord + "</span>";
  }
  currentPlayer += 1;
}
function last(totalMinutes) {
  gameDiv.style.display = "none";
  let sec = totalMinutes * 60;
  const interval = setInterval(function () {
    document.getElementById("timer").innerHTML =
      Math.floor(sec / 60) + ":" + (sec % 60);
    sec--;

    if (sec < 0) {
      out2.innerHTML = "Time's Up!";
      document.getElementById("timer").style.display = "none";
      clearInterval(interval);
    }
  }, 1000);
}
