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