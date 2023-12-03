const spike_img = new Image();
spike_img.src = './spike.png';


class Spikes {
    constructor(x,y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
  
    drawSpikes(ctx) {
        // ctx.beginPath();
        // ctx.fillStyle = "blue";
        // ctx.fillRect(this.character_x_position, this.character_y_position, this.character_width, this.character_height);
        // ctx.stroke();
        ctx.drawImage(spike_img, 113, 192, 203, 57, this.x, this.y, this.width, this.height)
    
      }
  }
  