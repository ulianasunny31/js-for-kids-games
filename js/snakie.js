//Declarations
import { keyNames, scoreInput } from "./declarations.js";
const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let score = 0;
let block = 10;
const blockWidth = width / block;
const blockHeight = height / block;

//the game
drawGameBorder();
drawGAMEOVERtext();
//Snake creation

//Apple point creation
//Functions
function drawGameBorder() {
  ctx.fillStyle = "000000";
  ctx.fillRect(0, 0, width, block);
  ctx.fillRect(0, height - block, width, block);
  ctx.fillRect(0, 0, block, height);
  ctx.fillRect(width - block, 0, block, height);
}

function drawGAMEOVERtext() {
  //   clearInterval(intervalID);
  ctx.font = "40px Courier";
  ctx.fillStyle = "#FF9F29";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GAME OVER", width / 2, height / 2);
}
