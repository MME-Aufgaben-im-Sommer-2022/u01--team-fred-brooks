/* eslint-env browser */
//#############################################################
//                         import                             #
//#############################################################
import WordList from "./wordlist/WordList.js";

//#############################################################
//                         variables                          #
//#############################################################
var numOfWords = 0;
var correctAnswers = 0;
let defaultTime = 59;
const wordInput = document.querySelector(".word-input");
let firstHit = true;

//#############################################################
//                            private                         #
//#############################################################

function wordCompare(jsonData) {
    /* Compares the entries from the user input data,
     result-list, with the data of jsonData, an ordered list
      of pairs of words with counts; if a word from the jsonData
       is entered, the event shows the word an its count in the
        corpus.*/
    let resultList = Array.from(document.body.querySelectorAll(".result-list"));
    wordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && wordInput.value != "") {
            for (let i = 0; i < jsonData.length; i++) {
                if (jsonData[i].word === wordInput.value) {
                    if (resultList.includes(wordInput.value)) {
                        console.log("duplicate");
                    } else {
                        resultList.unshift(wordInput.value);
                        document.getElementsByClassName("result-list")[0].innerHTML += 
                            '<li><span class="count">' + jsonData[i].count + '</span>'
                                + '<span class="word">' + jsonData[i].word + '</span></li>';
                        correctAnswers++;
                        console.log("entered");
                    }
                }
            }
            wordInput.value = "";
}});
}

function onWordlistAvailable(wordlist) {
    /* Logs the first 10 entries from the received word list
     and throws an error if import doesn't work.*/
    try {
    console.log("### WordList received ###");
    console.log(wordlist.slice(0, 10));
    numOfWords += wordlist.length;
    wordCompare(wordlist);  }
    catch(error) {
        alert("Function onWordlistAvailable: Import error !");
      }
}

function countDown() {
    /* Starts the countdown for 60 seconds for the user input
     and ends it with a statement.*/
    try {
    const interval = setInterval(function() {
        if (defaultTime >= 0) {
            if (defaultTime < 10) {
                document.getElementsByClassName('timer-output')[0].innerHTML = "00:0" + defaultTime;
            } else {
                document.getElementsByClassName('timer-output')[0].innerHTML = "00:" + defaultTime;
            }
            defaultTime--;
        } else {
            document.getElementsByClassName('timer-output')[0].innerHTML = "";
            wordInput.value = "";
            document.getElementsByClassName('word-input')[0].disabled = true;
            clearInterval(interval);
            scoreCounter();
            console.log("Game over");
        }
    },1000)
}catch(error) {
    alert("Function countdown: time event error!");
  }
}

// Score-Function
function scoreCounter() {
    let coveredPercent = (correctAnswers/numOfWords) * 100;
    coveredPercent = coveredPercent.toFixed(2);
    document.getElementsByClassName('score')[0].innerHTML
    += "Congratulations! You remembered " + correctAnswers 
    + " words from Romeo and Juliet. These are ~" + coveredPercent
    + " percent of all unique words Shakespeare used to write the play!";
}

//#############################################################
//                            public                          #
//#############################################################

function init() {/*This function reads and the
 romeo-and-juliet-word-list.json and loads it as class object
  Wordlist.*/
try {
    WordList.loadList().then(onWordlistAvailable);
}
catch(error) {
    alert("Function init: import error!");
}
}

function startGame() { /* Starts game with enter input and
 calls function countdown.*/
    try {
    wordInput.addEventListener("keydown", function(event)
    {
    if (firstHit) {
        console.log("Game started");
        countDown();
        firstHit = false;
    }
    });
    }
    catch(error) {
        alert("Function startGame: event error !");
      }
}

//#############################################################
//                            run                             #
//#############################################################

init();
startGame();