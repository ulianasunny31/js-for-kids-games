import { mapImage } from "./declarations.js";
let clicks = 0;
let target;

startNewGame();

$(mapImage).click(function (evt) {
  clicks++;

  let distance = getDistance(evt, target);
  let hint = getHint(distance);
  $(".distance").text(hint);

  if (distance < 13) {
    alert(`Found the treasure in ${clicks} clicks!`);
    startNewGame();
  }
});

function getRandomNumber(size) {
  return Math.floor(Math.random() * size);
}

function getDistance(evt, target) {
  let X = evt.offsetX - target.x;
  let Y = evt.offsetY - target.y;
  return Math.sqrt(X ** 2 + Y ** 2);
}

function getHint(gap) {
  if (gap < 17) {
    $(".distance").css("background-color", "#D2691E");
    $(".distance").css("color", "#FFFFFF");

    return "Boiling hot!!!";
  } else if (gap < 27) {
    $(".distance").css("background-color", "#FFD700");
    $(".distance").css("color", "#333333");

    return "Really hot!";
  } else if (gap < 45) {
    $(".distance").css("background-color", "#F5E5B8");
    $(".distance").css("color", "#8B4513");

    return "Hot ;)";
  } else if (gap < 80) {
    $(".distance").css("background-color", "#FFFACD"); //fon
    $(".distance").css("color", "#006400");

    return `That's warm!`;
  } else if (gap < 160) {
    $(".distance").css("background-color", "#ADD8E6");
    $(".distance").css("color", "#717070");

    return "Cold.";
  } else if (gap < 320) {
    $(".distance").css("background-color", "#C0C0C0");
    $(".distance").css("color", "#000080");

    return "Really cold, bro.";
  } else {
    $(".distance").css("background-color", "#4682B4");
    $(".distance").css("color", "#FFFFFF");

    return "Freezing :|";
  }
}

function setNewTarget() {
  const width = mapImage.width;
  const height = mapImage.height;

  target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height),
  };
}

function startNewGame() {
  clicks = 0;
  setNewTarget();
  $(".distance").text("");
  $(".distance").css("background-color", "#f9fcfe");
}
