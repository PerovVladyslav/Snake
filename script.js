let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    
  ];
  let dx=10;
  let dy=0;
const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = "white";
const SNAKE_COLOR = 'lightgreen';
const SNAKE_BORDER_COLOR = 'darkgreen';
const FOOD_COLOR = 'red';
const FOOD_BORDER_COLOR = 'darkred';

var gameCanvas = document.getElementById('gameCanvas');
var ctx = gameCanvas.getContext("2d");

function DrawElements() {
  this.color = function(fillStyleColor, strokestyleColor){
     ctx.fillStyle = fillStyleColor;
     ctx.strokestyle = strokestyleColor;
     
  }
  this.paint = function(x,y,w,h){
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
  }

}

var snakePart = new drawSnakePart();
var canvasPaint = new DrawElements();



canvasPaint.color(CANVAS_BACKGROUND_COLOR, CANVAS_BORDER_COLOR);
canvasPaint.paint(0,0,gameCanvas.width,gameCanvas.height);
moving();
document.addEventListener("keydown", changeDirection);
dx = 10;
// Change horizontal velocity to 10
dy = 0;
foodCreate();


function advanceSnake(){
  var head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };
  snake.unshift(head);
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    foodCreate();

  } else {

    snake.pop();
  }

}
function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

  
  function drawSnakePart() {
    DrawElements.call(this)
    var paintSnake = this.paint;
    this.paint = function(snakePart){
    paintSnake.call(this)
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }


  }
  
function drawSnake() {
    snakePart.color(SNAKE_COLOR,SNAKE_BORDER_COLOR);
    snake.forEach(snakePart.paint);


  }  

  function moving(){
    if (didGameEnd()) return;


    setTimeout(function(){
      clearCanvas();
      drawFood();
      advanceSnake();
      drawSnake();
      moving();
    },100);
  }
 
  function changeDirection(event){
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    const keyPress = event.keyCode;
    const goingUP = dy === -10;
    const goingDown = dy === 10;
    const goingLeft = dx === -10;
    const goingRight = dx === 10;

    if(keyPress === LEFT_KEY && !goingRight)
    {
      dx=-10; 
      dy = 0;
    }
    if(keyPress === RIGHT_KEY && !goingLeft)
    {
      dx=10;
      dy = 0;
    } if(keyPress === UP_KEY && !goingDown)
    {
      dx=0;
      dy = -10;
    } if(keyPress === DOWN_KEY && !goingUP)
    {
      dx= 0;
      dy = 10;
    }

  }

  function randomTen(min, max){
    return Math.floor((Math.random() * (max - min)  + min)/10)*10;

  }

  function foodCreate(){
       foodX = randomTen(0,gameCanvas.width - 10);
       foodY = randomTen(0,gameCanvas.height - 10);

      snake.forEach(function isFoodOnSnake(part){
        const foodIsOnSnake = part.x == foodX && part.y ==foodY;
        if(foodIsOnSnake)
        {
          foodCreate();
        }
      });
  }

     
  var drawFoods = new DrawElements();
  
  function drawFood(){
    DrawElements.call(this)
    drawFoods.color(FOOD_COLOR, FOOD_BORDER_COLOR);
    drawFoods.paint(foodX, foodY, 10, 10);
  }

  function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
      const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y
      if (didCollide) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;
    //moving();
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    
  }