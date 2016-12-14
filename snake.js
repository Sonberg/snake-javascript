function Snake() {
    this.x = offset;
    this.y = offset;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.direction = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.show = function() {
        fill(255);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    this.eat = function(pos) {
        if (this.x < pos.x + scl && this.x + scl > pos.x && this.y < pos.y + scl && scl + this.y > pos.y) {
            this.total++;
            $(".score").html(this.total);
            return true;
        } else {
            return false;
        }
    }
    
    this.death = function () {
      $("#death").fadeIn();
      noLoop();
      this.x = constrain(this.x, 0, width - scl);
      this.y = constrain(this.y, 0, height - scl);
      
    }
    
    this.reset = function() {
      this.x = offset;
      this.y = offset;
      this.xspeed = 1;
      this.yspeed = 0;
      this.total = 0;
      this.tail = [];
    }

    this.update = function() {
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
        
        
        var newX = this.x + this.xspeed * scl;
        var newY = this.y + this.yspeed * scl;
        
        // Collision with wall
        if (newX < 0 || newY < 0 || newY > height - scl || newX > width - scl) {
            this.death();
        } 
        
        // Collision with tail
        for (i = 0; i < this.tail.length - 1; i++) {
            if (newX < this.tail[i].x + scl && newX + scl > this.tail[i].x && newY < this.tail[i].y + scl && scl + newY > this.tail[i].y) {
              this.death();
            }
        }
        
        this.x = newX;
        this.y = newY;
        this.show();
    }
}