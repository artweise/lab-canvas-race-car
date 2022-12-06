// another aproach with object

const myGameArea = {
  canvas: document.querySelector("#canvas"),
  start: function () {
    this.canvas.width = this.width; //already done in html
    this.canvas.height = this.height; //already done in html
    this.ctx = canvas.getContext("2d");
    // call updateGameArea() every 20 milliseconds
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

// Class approach

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

class carGameArea {
  constructor() {
    this.ctx = null;
    this.background = null;
    this.player = null;
    // this.interval = null;
  }

  startGame() {
    const canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    const car = new Car(45, 100, 250, 450);
    this.player = car;
    const playBoard = new Image();
    playBoard.src = "./images/road.png";
    playBoard.onload = () => {
      this.background = playBoard;
      this.updateCanvas();
      this.drawPlayer();
    };
  }

  drawPlayer() {
    this.player.drawCar();
  }

  updateCanvas() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, 500, 700);
      this.ctx.drawImage(this.background, 0, 0, 500, 700);
      this.drawPlayer();
    }, 20);
  }
}

class Car {
  constructor(width, height, posX, posY) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    // this.speedX = speedX;
    // this.speedY = speedY;
    this.img = this.createCar();
  }

  createCar() {
    const car = new Image();
    car.src = "./images/car.png";
    ctx.drawImage(car, this.posX, this.posY, this.width, this.height);
    return car;
  }

  drawCar() {
    ctx.drawImage(this.img, this.posX - 22, this.posY, this.width, this.height);
  }

  moveRight() {
    this.posX += 10;
  }
  moveLeft() {
    this.posX -= 10;
  }

  move(event) {
    switch (event) {
      case "ArrowRight":
        if (this.posX <= 410) this.moveRight();
        break;
      case "ArrowLeft":
        if (this.posX >= 90) this.moveLeft();
        console.log(this.posX);
        break;
    }
  }
}

class MyObstacles {
  constructor(width, height, color, posX, posY) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    // new speed properties
    this.speedX = 0;
    this.speedY = 0;
    this.element = this.createObstacles();
  }

  newPos() {
    this.posX += this.speedX;
    this.posY += this.speedY;
  }

  createObstacles() {
    const element = new Image();
    element.src = "./images/snowball-1.png";
    ctx.drawImage(element, this.posX, this.posY, this.width, this.height);
    return element;
  }
  drawObstacles() {
    ctx.drawImage(this.element, this.posX, this.posY, this.width, this.height);
  }
}

let time = 0;

let obstacles = [];
function updateObstacles() {
  for (i = 0; i < obstacles.length; i++) {
    //to move the obstacles, just adding sth to the y axis. To make it more difficult, we need add more
    obstacles[i].posY += 1;
    obstacles[i].drawObstacles();
  }
  time++;
  if (time % 400 === 0) {
    let x = 430;
    let minGap = 0;
    let maxGap = 330;
    let gap = Math.floor(Math.random() * (maxGap + minGap - 1) + minGap);
    obstacles.push(new MyObstacles(100, 100, gap, -100));
    // console.log(obstacles);
  }
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    const game = new carGameArea();
    game.startGame();
    document.addEventListener("keydown", (e) => {
      game.player.move(e.key);
    });
    document.addEventListener("keyup", (e) => {
      this.player.speedX = 0;
      this.player.speedY = 0;
    });
    // console.log("started");
  };
};

// const roadImage = new Image();
// roadImage.src = "./images/road.png";
// console.log(roadImage, "where is the road???");

// const myGameArea = {
//   canvas: document.querySelector("#canvas"),
//   frame: 0,
//   image: roadImage,
//   startGame() {
//     this.ctx = this.canvas.getContext("2d");
//     this.width = this.canvas.width;
//     this.heigh = this.canvas.height;
//     this.interval = setInterval(updateGameArea, 20);
//   },
//   drawGameBoard() {
//     // const roadImage = new Image();
//     // roadImage.src = "./images/road.png";
//     this.ctx.drawImage(roadImage, 0, 0, this.width, this.height);
//   },
//   clearGame() {
//     this.ctx.clearRect(0, 0, this.width, this.height);
//   },
//   stopGame() {
//     clearInterval(this.interval);
//   },
//   gameScores() {},
// };

// class Car {
//   constructor(width, height, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//   }
// }

// starter code

// window.onload = () => {
//   document.getElementById('start-button').onclick = () => {
//     startGame();
//   };

//   function startGame() {}
// };
