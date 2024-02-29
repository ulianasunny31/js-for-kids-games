// //Declarations
import { keyNames, scoreSpan } from "./declarations.js";
const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let score = 0;
let block = 18;
const blockWidth = width / block;
const blockHeight = height / block;
let intervalID;
scoreSpan.innerHTML = ` ${score}`;
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
//Snake creation
class Snakie {
  constructor() {
    this.body = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
    this.direction = "right";
    this.nextDirection = "right";
  }

  draw() {
    for (let i = 0; i < this.body.length; i++) {
      this.body[i].drawSquare("#3F497F");
    }
  }

  move() {
    let head = this.body[0];
    let newHead;

    this.direction = this.nextDirection;

    switch (this.direction) {
      case "right":
        newHead = new Block(head.column + 1, head.row);
        break;

      case "down":
        newHead = new Block(head.column, head.row + 1);
        break;

      case "left":
        newHead = new Block(head.column - 1, head.row);
        break;

      case "up":
        newHead = new Block(head.column, head.row - 1);
        break;
    }

    if (this.checkingCollision(newHead)) {
      drawGAMEOVERtext();
      return;
    }

    this.body.unshift(newHead); // Add the new head to the beginning of the

    if (newHead.equal(apple.position)) {
      score++;
      scoreSpan.innerHTML = ` ${score}`;
      apple.move();
    } else {
      this.body.pop(); // Remove the last element from the body array
    }
  }

  checkingCollision(head) {
    let collisionLeft = head.column === 0;
    let collisionRight = head.column === blockWidth - 1;
    let collisionTop = head.row === 0;
    let collisionBottom = head.row === blockHeight - 1;

    const collision =
      collisionTop || collisionBottom || collisionLeft || collisionRight;

    let collisionBody = false;

    for (let i = 0; i < this.body.length; i++) {
      if (head.equal(this.body[i])) {
        collisionBody = true;
        break;
      }
    }

    return collision || collisionBody;
  }

  setNormalDirection(newDirection) {
    console.log("Setting direction to:", newDirection);
    if (this.direction === "up" && newDirection == "down") {
      return;
    } else if (this.direction === "down" && newDirection === "up") {
      return;
    } else if (this.direction === "right" && newDirection === "left") {
      return;
    } else if (this.direction === "left" && newDirection === "right") {
      return;
    }

    this.nextDirection = newDirection;
  }

  reset() {
    this.body = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
    this.direction = "right";
    this.nextDirection = "right";
  }
}

//Apple point creation
class Apple {
  constructor() {
    this.position = new Block(10, 10);
  }

  draw() {
    this.position.drawCircle("#B8405E");
  }

  move() {
    //25 blocks total, 23 game blocks, +1 to beat math random function
    let randomColumn = Math.floor(Math.random() * (blockWidth - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (blockHeight - 2)) + 1;
    this.position = new Block(randomColumn, randomRow);
  }

  reset() {
    this.position = new Block(10, 10);
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
  clearInterval(intervalID);
  ctx.font = "40px Courier";
  ctx.fillStyle = "#FF9F29";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GAME OVER", width / 2, height / 2);
}

function doTheGame() {
  ctx.clearRect(0, 0, width, height);
  snakie.move();
  snakie.draw();
  apple.draw();
  drawGameBorder();
}

function startTheGame() {
  intervalID = setInterval(doTheGame, 110);
}

function restartAll() {
  clearInterval(intervalID);
  apple.reset();
  snakie.reset();
  doTheGame();
  score = 0;
}

//the game
const snakie = new Snakie();
const apple = new Apple();

drawGameBorder();

document.addEventListener("keydown", function (event) {
  let key = keyNames[event.code];

  if (key !== undefined && key !== "start") {
    snakie.setNormalDirection(key);
  }

  if (key === "start") {
    if (!intervalID) {
      startTheGame();
    } else {
      restartAll();
      startTheGame();
    }
  }
});
