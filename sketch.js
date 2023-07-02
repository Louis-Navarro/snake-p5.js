var s;
var food;

function setup() {
  createCanvas(400, 400);
  xSnake = int(random(40)) * 10;
  ySnake = int(random(40)) * 10;
  s = new Snake(xSnake, ySnake, 10);

  xFood = int(random(40)) * 10;
  yFood = int(random(40)) * 10;
  food = new Food(xFood, yFood, 10);
  frameRate(20);
}

function draw() {
  background(0);
  s.move();
  s.show();

  food.show();

  if (s.checkDead()) {
    xSnake = int(random(40)) * 10;
    ySnake = int(random(40)) * 10;
    s = new Snake(xSnake, ySnake, 10);
  }

  if (food.checkEaten()) {
    s.pos.push([0, 0]);

    xFood = int(random(40)) * 10;
    yFood = int(random(40)) * 10;
    food = new Food(xFood, yFood, 10);
  }
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      s.dir = "right";
      break;
    case LEFT_ARROW:
      s.dir = "left";
      break;

    case UP_ARROW:
      s.dir = "up";
      break;

    case DOWN_ARROW:
      s.dir = "down";
      break;

    case ESCAPE:
      noLoop();
      break;
  }
}

class Snake {
  constructor(x, y, size, dir = "right") {
    this.pos = [[x, y]];
    this.size = size;
    this.dir = dir;
  }

  moveTail() {
    for (let i = this.pos.length - 1; i > 0; i--) {
      this.pos[i] = JSON.parse(JSON.stringify(this.pos[i - 1]));
    }
  }

  moveHead() {
    switch (this.dir) {
      case "right":
        this.pos[0][0] += this.size;
        break;
      case "left":
        this.pos[0][0] -= this.size;
        break;

      case "up":
        this.pos[0][1] -= this.size;
        break;
      case "down":
        this.pos[0][1] += this.size;
    }

    if (this.pos[0][0] > 400) {
      this.pos[0][0] = 0;
    }
    if (this.pos[0][0] < 0) {
      this.pos[0][0] = 400;
    }
    if (this.pos[0][1] > 400) {
      this.pos[0][1] = 0;
    }
    if (this.pos[0][1] < 0) {
      this.pos[0][1] = 400;
    }
  }

  move() {
    this.moveTail();
    this.moveHead();
  }

  show() {
    fill(255);
    this.pos.forEach((pos) => {
      rect(pos[0], pos[1], this.size, this.size);
    });
  }

  checkDead() {
    const stringFirst = JSON.stringify(this.pos[0]);

    for (let i = 1; i < this.pos.length; i++) {
      if (JSON.stringify(this.pos[i]) === stringFirst) {
        return true;
      }
    }

    return false;
  }
}

class Food {
  constructor(x, y, size) {
    this.pos = [x, y];
    this.size = size;
  }

  show() {
    fill(255, 0, 0);
    rect(this.pos[0], this.pos[1], this.size, this.size);
  }

  checkEaten() {
    if (JSON.stringify(s.pos[0]) === JSON.stringify(this.pos)) {
      return true;
    }

    return false;
  }
}
