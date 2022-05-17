/* eslint-env browser */

import WordList from "./wordlist/WordList.js";

function init() {
    WordList.loadList().then(onWordlistAvailable);
}

function onWordlistAvailable(wordlist) {
    console.log("### WordList received ###");
    // Prints the first 10 entries from the received word list
    console.log(wordlist.slice(0, 10));
    // TODO: Start your implementation here

}

init();

// Countdown-Function
let defaultTime = 5;
const wordInput = document.querySelector(".word-input");
let firstHit = true;

function startGame() { 
    wordInput.addEventListener("keydown", function(event)
    {
    if (firstHit) {
        console.log("Game started");
        countDown();
        firstHit = false;
    }
    });
}

function countDown() {
    setInterval(function() {
        if (defaultTime >= 0) {
            if (defaultTime < 10) {
                document.getElementsByClassName('timer-output')[0].innerHTML = "00:0" + defaultTime;
            } else {
                document.getElementsByClassName('timer-output')[0].innerHTML = "00:" + defaultTime;
            }
            defaultTime--;
        } else {
            clearInterval();
            document.getElementsByClassName('timer-output')[0].innerHTML = "";
            document.getElementsByClassName('word-input')[0].disabled = true;
        }
    },1000)
}

startGame();



