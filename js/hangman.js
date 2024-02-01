import words from "./words-for-hangman.js";
import { spanWord, restart, alphabet, liItems, ctx } from "./declarations.js";

const notVisible = "not-visible";
const visible = "visible";

let givenLetter = "";
let wrongGuess = 0;
let word, answerArr, remainingLetters, wrongLetters;

startNewGame();
alphabet.addEventListener(
  "pointerdown",
  function touchOnLetter(evt) {
    reactToClick(evt);
  },
  { passive: true }
);

// alphabet.addEventListener("click", function clickOnLetter(evt) {
//   evt.preventDefault();
//   reactToClick(evt);
// });

restart.addEventListener("click", function handleRestart() {
  startNewGame();
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  removeClass();
  console.clear();
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
    wrongGuess += 1;
    drawTheMan(wrongGuess);
    if (wrongGuess === 9) {
      alert(`You lost! The word was ${word}.`);
    }
  }

  if (!found && !wrongLetters.includes(givenLetter)) {
    e.target.classList.add("used");
    wrongLetters.push(givenLetter);
    if (!found && !wrongLetters.includes(givenLetter)) {
      wrongGuess += 1;
      drawTheMan(wrongGuess);
      if (wrongGuess === 9) {
        alert(`You lost! The word was ${word}.`);
      }
    }
  }

  spanWord.textContent = answerArr.join(" ");

  if (remainingLetters === 0) {
    spanWord.textContent = answerArr.join(" ");

    if (remainingLetters === 0) {
      alert(`Congratulations! The word was ${word}.`);
      startNewGame();
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
