  var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var x = canvas.width/2;
var y = canvas.height-10;
var dx = 0.9;
var dy = 0.9;
var ballRadius = 3;

var paddleHeight = 3;
var paddleWidth = 50;
var paddleX = (canvas.width-paddleWidth) / 2;

var brickRowCount = 7;
var brickColumnCount = 11;
var brickWidth = 25;
var brickHeight = 7;
var brickPadding = 1;
var brickOffsetTop = 12;
var brickOffsetLeft = 8;

var score = 0;
var lives = 3;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#f2f2f2";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight-4, paddleWidth, paddleHeight);
    ctx.fillStyle = "#f2f2f2";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                if(c==0 || r==0 || c==brickColumnCount-1 || r==brickRowCount-1)
                {ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#ff751a";
                ctx.fill();
                ctx.closePath();}
                if(c==1 || r==1 || c==brickColumnCount-2 || r==brickRowCount-2)
                {ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#ffff33";
                ctx.fill();
                ctx.closePath();}
                if(c==2 || r==2 || c==brickColumnCount-3 || r==brickRowCount-3)
                {ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0044cc";
                ctx.fill();
                ctx.closePath();}
                if(c==3 || r==3 || c==brickColumnCount-4 || r==brickRowCount-4)
                {ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#1aff1a";
                ctx.fill();
                ctx.closePath();}
                
                }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

 if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
}
if(y + dy < ballRadius) {
    dy = -dy;
} 
else if(y + dy > canvas.height-ballRadius-4-paddleHeight) {
    if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-10;
        dx = 0.9;
        dy = -0.9;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }
    x += dx/2;
    y += dy/2;

    
}

document.addEventListener("mousemove", mouseMoveHandler, false);



function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
  }

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x+ballRadius && x < b.x+brickWidth+ballRadius && y > b.y+ballRadius && y < b.y+brickHeight+ballRadius) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        clearInterval(interval);
                }
            }
        }
    }
}
}

function drawScore() {
    ctx.font = "9px Convergence";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(+score, 8, 9);
}

function drawLives() {
  ctx.font = "9px Convergence";
  ctx.fillStyle = "#f2f2f2";
  for(i=lives;i>0;i--)
  {  
     ctx.fillText("_", canvas.width-6-(8*i), 5);
  }
}
var interval = setInterval(draw, 10);


