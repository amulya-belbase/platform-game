

const fireImage = new Image();
fireImage.src = "./fire.png";

class Fire {
    constructor(sx, sy, swidth, sheight, x, y, width, height) {
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
  
    draw_fire(ctx) { 
        ctx.drawImage(fireImage, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height) ;
      }
  }
