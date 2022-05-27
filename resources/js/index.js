/* eslint-env browser */

import WordList from "./wordlist/WordList.js";

let numOfWords = 0,
    correctAnswers = 0,
    defaultTime = 59;
var firstHit = true;
const wordInput = document.querySelector(".word-input");

function init() {
/* This function reads and the
   romeo-and-juliet-word-list.json and loads it as class object Wordlist. */

    WordList.loadList().then(onWordlistAvailable);
    startGame();
}

function startGame() { 
/* Starts game with enter input and
   calls function countdown. */
    wordInput.addEventListener("keydown", function(event)
    {
    if (firstHit) {
        countDown();
        firstHit = false;
    }
    });
}

init();


function wordCompare(jsonData) {
    /* Compares the entries from the user input data,
       result-list, with the data of jsonData, an ordered list
       of pairs of words with counts; if a word from the jsonData
       is entered, the event shows the word an its count in the corpus. */
    let resultList = Array.from(document.body.querySelectorAll(".result-list"));
    wordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && wordInput.value !== "") {
            for (let i = 0; i < jsonData.length; i++) {
                if (jsonData[i].word === wordInput.value && !resultList.includes(wordInput.value)) {
                    resultList.unshift(wordInput.value);
                    document.getElementsByClassName("result-list")[0].innerHTML += 
                        '<li><span class="count">' + jsonData[i].count + '</span>'
                            + '<span class="word">' + jsonData[i].word + '</span></li>';
                    correctAnswers++;
                }
            }
            wordInput.value = "";
}});
}

function onWordlistAvailable(wordlist) {
    /* Logs the first 10 entries from the received word list
       and throws an error if import doesn't work. */
    
    numOfWords += wordlist.length;
    wordCompare(wordlist);  
    
}

function countDown() {
    /* Starts the countdown for 60 seconds for the user input
       and ends it with a statement. */
    
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
        }
    },1000);

}

function scoreCounter() {
    let coveredPercent = (correctAnswers/numOfWords) * 100;
    coveredPercent = coveredPercent.toFixed(2);
    document.getElementsByClassName('score')[0].innerHTML
    += "Congratulations! You remembered " + correctAnswers 
    + " words from Romeo and Juliet. These are ~" + coveredPercent
    + " percent of all unique words Shakespeare used to write the play!";
}
