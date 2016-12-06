var s,
    food,
    scl = 10,
    w = window.innerWidth,
    h = window.innerHeight;

function setup() {
    s = new Snake();
    createCanvas(w, h);
    frameRate(30);
    noLoop();
    randomLocation();
}

function draw() {  
  background(20); 
  if (s.eat(food)) {
    randomLocation();
  }
  s.update();
  
  // Draw food
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed(e) {
  if (keyCode === UP_ARROW) {
    if (s.yspeed != 1) {
      s.direction(0, -1);
    }
  } else if (keyCode === DOWN_ARROW) {
    if (s.yspeed != -1) {
      s.direction(0, 1);
    }
  } else if (keyCode === LEFT_ARROW) {
    if (s.xspeed != 1) {
      s.direction(-1, 0);
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (s.xspeed != -1) {
      s.direction(1, 0);
    }
  }
  console.log(e);
  if (keyCode === 32) {
    if ($("#freeze").hasClass("paused")) {
      $("#freeze").removeClass("paused");
      loop();
    } else {
      $("#freeze").addClass("paused");
      noLoop();
    }
  }
}


function randomLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
  //food = {x: floor(random(600/scl)), y: floor(random(600/scl))};
}

/*
To do
Death
Random color for food
*/