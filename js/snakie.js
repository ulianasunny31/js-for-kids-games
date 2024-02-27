// //Declarations
import { keyNames, scoreInput } from "./declarations.js";
const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let score = 0;
let block = 15;
const blockWidth = width / block;
const blockHeight = height / block;

//the game
drawGameBorder();
let snakie = new Snakie();
snakie.draw();
//Snake creation

//Apple point creation

class Block {
  constructor(column, row) {
    this.column = column;
    this.row = row;
  }

  drawSquare(color) {
    const x = this.column * block;
    const y = this.row * block;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, block, block);
  }

  circle(x, y, radius, fill) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }

  drawCircle(color) {
    const pointX = this.column * block + block / 2;
    const pointY = this.row * block + block / 2;
    ctx.fillStyle = color;
    this.circle(pointX, pointY, block / 2, true);
  }

  equal(otherBlock) {
    return this.column === otherBlock.column && this.row === otherBlock.row;
  }
}

class Snakie {
  constructor() {
    this.body = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
    this.direction = "right";
    this.nextDirection = "right";
  }

  draw() {
    for (let i = 0; i < this.body.length; i++) {
      this.body[i].drawSquare("3F497F");
    }
  }
}

//Functions
function drawGameBorder() {
  ctx.fillStyle = "#000000";
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
