import words from "./words-for-hangman.js";
import { spanWord, restart, alphabet, liItems, ctx } from "./declarations.js";

const notVisible = "not-visible";
const visible = "visible";

let givenLetter = "";
let wrongGuess = 0;
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
  context.clearRect(0, 0, canvas.width, canvas.height);
});

function createGameWord() {
  for (let i = 0; i < word.length; i++) {
    answerArr.push("_");
    spanWord.textContent = answerArr.join(" ");
    wrongLetters = [];
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

    if (word[k] !== givenLetter) {
      wrongGuess++;
      drawTheMan(wrongGuess);
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

function drawTheMan(wrongGuess) {
  ctx.lineWidth = 4;

  switch (wrongGuess) {
    case 0:
      ctx.strokeRect(20, 20, 20, 20);
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(30, 40);
      ctx.lineTo(30, 80);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(30, 80);
      ctx.lineTo(10, 110);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(30, 80);
      ctx.lineTo(50, 110);
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(30, 60);
      ctx.lineTo(10, 50);
      ctx.stroke();
      break;
    case 5:
      ctx.beginPath();
      ctx.moveTo(30, 60);
      ctx.lineTo(50, 50);
      ctx.stroke();
      break;
    default:
  }
}
