class Platform {
    constructor(x,y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isScored = false; 
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = "#614194";
      ctx.strokeStyle = "black";
      ctx.roundRect(this.x, this.y, this.width, this.height, [0,0,20,20]);
      ctx.fill();
      ctx.stroke();
    }
  }
  