const inputForWords = document.querySelector(".word-input");
const spanWord = document.querySelector(".word-span");
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

const word = words[Math.floor(Math.random() * words.length)];

let answerArr = [];
for (let i = 0; i < word.length; i++) {
  answerArr.push("_");
}
let remainingLetters = word.length;

inputForWords.addEventListener("input", () => {
  givenLetter = inputForWords.value.toLowerCase();
  console.log(givenLetter);
});
console.log(givenLetter);

while (remainingLetters > 0) {
  spanWord.textContent = answerArr.join(" ");

  if (!guess || guess === null) {
    break;
  } else if (guess.length !== 1) {
    // alert("Please enter only one character!");
  } else {
    for (let k = 0; k < word.length; k++) {
      if (word[k] === guess && answerArr[k] === "_") {
        answerArr[k] = guess;
        remainingLetters--;
      }
    }
  }
}
