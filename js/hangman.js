import words from "./words-for-hangman.js";
import { spanWord, restart, alphabet, liItems } from "./declarations.js";
const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
let givenLetter = "";
let wrongGuess = 0;
let word, answerArr, remainingLetters;

startNewGame();

alphabet.addEventListener("pointerdown", touchOnLetter);

restart.addEventListener("click", function handleRestart() {
  startNewGame();
});

function touchOnLetter(e) {
  if (!isGameEnded()) reactToClick(e);
}

function createGameWord() {
  for (let i = 0; i < word.length; i++) {
    answerArr.push("_");
    spanWord.textContent = answerArr.join(" ");
    wrongLetters = [];
  }
}

function startNewGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  word = words[Math.floor(Math.random() * words.length)];
  answerArr = [];
  wrongLetters = [];
  createGameWord();
  remainingLetters = word.length;
  removeClass();
  console.clear();
  wrongGuess = 0;
  alphabet.removeEventListener("pointerdown", touchOnLetter);
  alphabet.addEventListener("pointerdown", touchOnLetter);
}

function removeClass() {
  liItems.forEach((li) => {
    li.classList.remove("used");
  });
}

function reactToClick(e) {
  if (e.target.tagName === "LI") {
    givenLetter = e.target.textContent.toLowerCase();
  }

  let found = false;
  if (word.includes(givenLetter) && !answerArr.includes(givenLetter)) {
    word.split("").forEach((letter, i) => {
      if (letter === givenLetter) {
        found = true;
        answerArr[i] = givenLetter;
        remainingLetters--;
        e.target.classList.add("used");
      }
    });
  } else if (!found) {
    wrongGuess += 1;
    drawTheMan(wrongGuess);

    e.target.classList.add("used");

    if (wrongGuess === 9) {
      alert(`You lost! The word was ${word}.`);
    }
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
  ctx.lineWidth = 3;
  console.log(wrongGuess);
  const scale = 0.7;
  const scaleG = 1; //Size of a man
  const xOffset = 98; //Moving right
  const yOffset = 27; //Moving down

  switch (wrongGuess) {
    case 0:
      ctx.strokeRect(20, 20, 20, 20);
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(0 * scaleG, 120 * scaleG);
      ctx.lineTo(60 * scaleG, 120 * scaleG);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(30 * scaleG, 120 * scaleG);
      ctx.lineTo(30 * scaleG, 20 * scaleG);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(28 * scaleG, 20 * scaleG);
      ctx.lineTo(90 * scaleG, 20 * scaleG);
      ctx.lineTo(90 * scaleG, 35 * scaleG);
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo((40 + xOffset) * scale, (40 + yOffset) * scale);
      ctx.lineTo((20 + xOffset) * scale, (40 + yOffset) * scale);
      ctx.lineTo((20 + xOffset) * scale, (25 + yOffset) * scale);
      ctx.lineTo((40 + xOffset) * scale, (25 + yOffset) * scale);
      ctx.lineTo((40 + xOffset) * scale, (42 + yOffset) * scale);
      ctx.stroke();
      break;
    case 5:
      ctx.beginPath();
      ctx.moveTo((30 + xOffset) * scale, (40 + yOffset) * scale);
      ctx.lineTo((30 + xOffset) * scale, (80 + yOffset) * scale);
      ctx.stroke();
      break;
    case 6:
      ctx.beginPath();
      ctx.moveTo((30 + xOffset) * scale, (60 + yOffset) * scale);
      ctx.lineTo((10 + xOffset) * scale, (50 + yOffset) * scale);
      ctx.stroke();
      break;
    case 7:
      ctx.beginPath();
      ctx.moveTo((30 + xOffset) * scale, (60 + yOffset) * scale);
      ctx.lineTo((50 + xOffset) * scale, (50 + yOffset) * scale);
      ctx.stroke();
      break;
    case 8:
      ctx.beginPath();
      ctx.moveTo((30 + xOffset) * scale, (80 + yOffset) * scale);
      ctx.lineTo((10 + xOffset) * scale, (110 + yOffset) * scale);
      ctx.stroke();
      break;
    case 9:
      ctx.beginPath();
      ctx.moveTo((30 + xOffset) * scale, (80 + yOffset) * scale);
      ctx.lineTo((50 + xOffset) * scale, (110 + yOffset) * scale);
      ctx.stroke();
      break;
    default:
  }
}

function isGameEnded() {
  return remainingLetters === 0 || wrongGuess === 9;
}
