import words from "./words-for-hangman.js";
import {
  spanWord,
  restart,
  wrongLetterSpan,
  alphabet,
  liItems,
} from "./declarations.js";

const notVisible = "not-visible";
const visible = "visible";

let givenLetter = "";

let word, answerArr, remainingLetters, wrongLetters;

startNewGame();
alphabet.addEventListener("touchstart", function touchOnLetter(evt) {
  evt.preventDefault();
  reactToClick(evt);
});

alphabet.addEventListener("click", function clickOnLetter(evt) {
  evt.preventDefault();
  reactToClick(evt);
});

restart.addEventListener("click", function handleRestart() {
  startNewGame();
});

function createGameWord() {
  for (let i = 0; i < word.length; i++) {
    answerArr.push("_");
    spanWord.textContent = answerArr.join(" ");
    wrongLetterSpan.classList.replace(visible, notVisible);
    wrongLetters = [];
    wrongLetterSpan.textContent = wrongLetters.join(", ");
  }
}

function startNewGame() {
  word = words[Math.floor(Math.random() * words.length)];
  answerArr = [];
  wrongLetters = [];
  createGameWord();
  remainingLetters = word.length;
  removeClass();
}

function removeClass() {
  liItems.forEach((li) => {
    li.classList.remove("used");
  });
}

function reactToClick(e) {
  if (e.target.tagName === "LI") {
    givenLetter = e.target.textContent.toLowerCase();
    console.log(givenLetter);
  }

  let found = false;
  for (let k = 0; k < word.length; k++) {
    if (word[k] === givenLetter && answerArr[k] === "_") {
      answerArr[k] = givenLetter;
      remainingLetters--;
      found = true;
      e.target.classList.add("used");
    }
  }

  if (!found && !wrongLetters.includes(givenLetter)) {
    e.target.classList.add("used");
  }

  spanWord.textContent = answerArr.join(" ");

  if (remainingLetters === 0) {
    spanWord.textContent = answerArr.join(" ");

    if (remainingLetters === 0) {
      alert(`Congratulations! The word was ${word}.`);
    }
  }
}
