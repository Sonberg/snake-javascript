var s,
    food,
    foodColor = {
      r: 255,
      g: 0,
      b: 100
    },
    scl = 14,
    w = window.innerWidth,
    h = window.innerHeight;
    
  window.$ = window.jQuery = require('jquery');
  console.log( [$, jQuery ]);

function setup() {
    s = new Snake();
    createCanvas(w, h);
    frameRate(30);
    noLoop();
    randomLocation();
    
    window.onresize = function(event) {
      $("#freeze").addClass("paused");
      noLoop();
      resizeCanvas(window.innerWidth, window.innerHeight);
    };
}

function draw() {  
  background(20); 
  if (s.eat(food)) {
    randomLocation();
  }
  s.update();
  
  // Draw food
  fill(foodColor.r, foodColor.g, foodColor.b);
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
  if (keyCode === 32) {
    if ($("#freeze").hasClass("paused") || $("#death").is(":visible")) {
      $("#freeze").removeClass("paused");
      
      if ($("#death").is(":visible")) {
        $("#death").fadeOut();
        s.reset();
      }
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
  foodColor.r = Math.floor(Math.random() * 256);
  foodColor.b = Math.floor(Math.random() * 256);
  foodColor.g = Math.floor(Math.random() * 256);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
  food.x = constrain(food.x, scl, width - scl*2);
  food.y = constrain(food.y, scl, height - scl*2);
}

/*
To do
Death
Random color for food
*/