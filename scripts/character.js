
const image = new Image(); 
image.src = './img2.png';

const image2 = new Image();
image2.src = './image.png';

class Character {
  constructor(character_x_position, character_y_position, character_width, character_height) {
    this.character_x_position = character_x_position;
    this.character_y_position = character_y_position;
    this.character_height = character_height;
    this.character_width = character_width;
    this.vx = 0;
    this.vy = 0;
    this.isDead = false;

  }

  draw(ctx) {
    // ctx.beginPath();
    // ctx.fillStyle = "blue";
    // ctx.fillRect(this.character_x_position, this.character_y_position, this.character_width, this.character_height);
    // ctx.stroke();
    ctx.drawImage(image2, 46, 1919, 317, 411, this.character_x_position, this.character_y_position, this.character_width, this.character_height)
  }
  draw_space(ctx){
    ctx.drawImage(image, 180,125, 41, 56, this.character_x_position, this.character_y_position, this.character_width, this.character_height);
  }
}
