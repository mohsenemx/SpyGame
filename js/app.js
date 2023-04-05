const startB = document.querySelector("#startB");
const NextB = document.querySelector("#NextB");
const centerDiv = document.querySelector(".center");
const titledDiv = document.querySelector(".titled");
const br1Div = document.querySelector(".br1");

const gameDiv = document.querySelector(".game");
const out1 = document.querySelector("#out1");
const out2 = document.querySelector("#out2");

let gameWord = "";

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
  const numOfPlayers = document.querySelector("#lm1");
  const numOfSpies = document.querySelector("#lm2");
  const totalMinutes = document.querySelector("#lm3");
  centerDiv.style.display = "none";
  titledDiv.style.display = "none";
  br1Div.style.display = "none";
  gameDiv.style.display = "block";

  initg();
  game(numOfPlayers.length, numOfSpies.length, totalMinutes.length);
}
function initg() {
  let rnd = Math.floor(Math.random() * words.length);
  gameWord = words[rnd];
}
function game(players, spies, minutes) {
  if (currentPlayer >= players) {
    last(minutes);
  }

  console.log("gameWord: " + gameWord);
  out1.innerHTML = "It's Player " + currentPlayer + "'s Turn";
  currentPlayer += 1;
}
NextB.addEventListener("click", function () {
  wordDisp();
});
function wordDisp() {
  out1.innerHTML =
    "Your Word is:  " + '<span class="pers">' + gameWord + "</span>";
  game();
}
function last(totalMinutes) {
  gameDiv.style.display = "none";
  var minute = totalMinutes;
  var sec = 60;
  setInterval(function () {
    document.getElementById("timer").innerHTML = minute + ":" + sec;
    sec--;

    if (sec == 00) {
      minute--;
      sec = 60;

      if (minute == 0) {
        out2.innerHTML = "Time's Up!";
      }
    }
  }, 1000);
}
