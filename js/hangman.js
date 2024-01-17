const inputForWords = document.querySelector(".word-input");
const spanWord = document.querySelector(".word-span");
const form = document.querySelector(".hanggame-form");
const restart = document.querySelector(".restart-btn");
let givenLetter = "";

const words = [
  "apple",
  "cat",
  "university",
  "flower",
  "pretty",
  "football",
  "song",
  "lamp",
  "phone",
  "table",
  "dragon",
];
let word, answerArr, remainingLetters;

startNewGame();

form.addEventListener("submit", function handleSubmit(e) {
  e.preventDefault();
  givenLetter = inputForWords.value;
  console.log("submitted");

  if (!givenLetter || givenLetter === null || givenLetter.length !== 1) {
    alert("Please enter only one character!");
    return;
  }

  for (let k = 0; k < word.length; k++) {
    if (word[k] === givenLetter && answerArr[k] === "_") {
      answerArr[k] = givenLetter;
      remainingLetters--;
    }
  }

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
  createGameWord();
  remainingLetters = word.length;
}
