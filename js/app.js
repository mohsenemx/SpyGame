const startB = document.querySelector("#startB");
const NextB = document.querySelector("#NextB");

const centerDiv = document.querySelector(".center");
const titledDiv = document.querySelector(".titled");
const gameDiv = document.querySelector(".game");

const out1 = document.querySelector("#out1");
const out2 = document.querySelector("#out2");

let numOfPlayers = 00;
let numOfSpies = 00;
let totalMinutes = 00;
let buttonCkeckL = true;
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
  let rnd = Math.floor(Math.random() * words.length);
  gameWord = words[rnd];
  console.log("gameWord: " + gameWord);

  numOfPlayers = document.querySelector("#lm1").valueAsNumber;
  numOfSpies = document.querySelector("#lm2").valueAsNumber;
  totalMinutes = document.querySelector("#lm3").valueAsNumber;

  for (let i = 0; i < numOfSpies; i++) {
    let rndf = Math.floor(Math.random() * (numOfPlayers + 1));

    if (spies.indexOf(rndf) == -1) spies.push(rndf);
    console.log("spies: " + spies);
  }

  game();
}

function game() {
  out1.innerHTML = "It's Player " + currentPlayer + "'s Turn";
  if (currentPlayer > numOfPlayers) {
    last(totalMinutes);
  } else {
    if (!spies.includes(currentPlayer)) {
      out1.innerHTML = "You are the Spy";
    } else {
      out1.innerHTML =
        "Your Word is:  " + '<span class="pers">' + gameWord + "</span>";
    }

    currentPlayer += 1;
  }
}

function last(totalMinutes) {
  gameDiv.style.display = "none";
  let sec = totalMinutes * 60;
  const interval = setInterval(function () {
    document.getElementById("timer").innerHTML =
      Math.floor(sec / 60) + ":" + (sec % 60);
    sec--;

    if (sec <= 00) {
      out2.innerHTML = "Time's Up!";
      clearInterval(interval);
    }
  }, 1000);
}
