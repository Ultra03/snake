var headRow, headCol, snakeDir, bodyRows, bodyCols, snakeLen, foodrow, foodCol;

function setup() {
  createCanvas(401, 401);
  frameRate(15);
  
  bodyRows = [];
  bodyCols = [];
  headRow = 10;
  headCol = 10;
  snakeDir = "RIGHT";
  snakeLen = 10;
  foodRow = floor(random(0,39));
  foodCol = floor(random(0,39));
}

function draw() {
  background(0,0,255);
  //drawGrid();
  
  push();
  fill(0,220,0);
  drawSnakeBody();
  drawSnakeHead();
  pop();
  
  push();
  fill(255,0,0);
  drawFood();
  pop();
  
  moveSnake();
  
  if(headOverlapsFood()) {
    growSnake();
    newFoodLocation();
  }
  
  if(bodyOverlaps(headRow, headCol) || !snakeInBounds()) {
    noLoop();
  }
}

/*
function drawGrid() {
  push();
  fill(255);
  stroke(0);
  for(let r = 0; r < 40; r++) {
    for(let c = 0; c < 40; c++) {
      rect(c * 10, r * 10, 10, 10);
    }
  }
  pop();
}
*/

function drawCell(row,col) {
  rect(col * 10, row * 10, 10, 10);
}

function drawSnakeHead(){
  drawCell(headRow,headCol);
}

function moveSnake() {
  bodyRows.push(headRow);
  bodyCols.push(headCol);
  switch(snakeDir) {
    case "RIGHT":
      headCol++;
      break;
    
    case "LEFT":
      headCol--;
      break;
      
    case "UP":
      headRow--;
      break;
      
    case "DOWN":
      headRow++;
      break;
  }
  
  if(bodyRows.length > snakeLen) {
    bodyRows.splice(0,1);
    bodyCols.splice(0,1);
  }
}

function keyPressed() {
  switch(keyCode) {
    case RIGHT_ARROW:
      snakeDir = "RIGHT";
      break;
      
    case LEFT_ARROW:
      snakeDir = "LEFT";
      break;
      
    case UP_ARROW:
      snakeDir = "UP";
      break;
    
    case DOWN_ARROW:
      snakeDir = "DOWN";
      break;
  }
  
  if(keyCode == ESCAPE) {
    reset();
  }
}

function drawSnakeBody() {
  for(let i = 0; i < bodyRows.length; i++) {
    drawCell(bodyRows[i],bodyCols[i]);
  }
}

function drawFood() {
  drawCell(foodRow,foodCol);
}

function headOverlapsFood() {
  if(headRow == foodRow && headCol == foodCol) {
    return true;
  } else {
    return false;
  }
}

function growSnake() {
  snakeLen += 3;
}

function newFoodLocation() {
  foodRow = floor(random(0,39));
  foodCol = floor(random(0,39));
}

function bodyOverlaps(row, col) {
  
  for(let i = 0; i < bodyRows.length; i++) {
    if(bodyRows[i] == headRow && bodyCols[i] == headCol) {
      return true;
    }
  }
  
  return false;
}

function snakeInBounds() {
  if(headRow >= 0 && headRow < 40 && headCol >= 0 && headCol < 40) {
    return true;
  } else {
    return false;
  }
}

function reset() {
  bodyRows = [];
  bodyCols = [];
  headRow = 10;
  headCol = 10;
  snakeDir = "RIGHT";
  snakeLen = 10;
  foodRow = floor(random(0,39));
  foodCol = floor(random(0,39));
  
  loop();
}
