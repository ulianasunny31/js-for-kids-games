import words from "./words-for-hangman.js";
import {
  inputForWords,
  spanWord,
  form,
  restart,
  wrongLetterSpan,
} from "./declarations.js";

const notVisible = "not-visible";
const visible = "visible";

let givenLetter = "";

let word, answerArr, remainingLetters, wrongLetters;

startNewGame();

form.addEventListener("submit", function handleSubmit(e) {
  e.preventDefault();
  givenLetter = inputForWords.value;
  console.log("submitted");

  if (!givenLetter || givenLetter === null || givenLetter.length !== 1) {
    alert("Please enter only one character!");
    return;
  }

  let found = false;
  for (let k = 0; k < word.length; k++) {
    if (word[k] === givenLetter && answerArr[k] === "_") {
      answerArr[k] = givenLetter;
      remainingLetters--;
      found = true;
    }
  }

  if (!found && !wrongLetters.includes(givenLetter)) {
    wrongLetters.push(givenLetter);
  }
  wrongLetterSpan.classList.replace(notVisible, visible);
  wrongLetterSpan.textContent = wrongLetters.join(", ");

  spanWord.textContent = answerArr.join(" ");

  if (remainingLetters === 0) {
    alert("You won!");
  }

  inputForWords.value = "";
});

restart.addEventListener("click", function handleRestart() {
  startNewGame();
});

function createGameWord() {
  for (let i = 0; i < word.length; i++) {
    answerArr.push("_");
    spanWord.textContent = answerArr.join(" ");
  }
}

function startNewGame() {
  word = words[Math.floor(Math.random() * words.length)];
  answerArr = [];
  wrongLetters = [];
  createGameWord();
  remainingLetters = word.length;
}
