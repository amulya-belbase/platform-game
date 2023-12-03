var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// BACKGROUND SPRITE
const back_image = new Image();
back_image.src = "./background.png";
function background_draw(ctx) {
  ctx.drawImage(back_image, 0, 0, 1024, 720);
}


// VARIABLES INITIALIZATION AND PLAYER OBJECT INSTANTIATION
let score = 0;
const player = new Character(200, 0, 38, 50);
const spikes = [];
const platforms = [];
const fireball = [];
let platform_timer = 0;
let spike_timer = 0;

// GENERATES RANDOM PLATFORMS
function generatePlatform() {
  const platform = new Platform(getRandom(0, canvas.width), 0, 100, 20);
  platforms.push(platform);
}

// GENERATE FIREPLACE (NOT RANDOM)
function generateFire(){
  const fireItem1 = new Fire(50, 35, 127, 167, 20, canvas.height-80, 80, 80);
  const fireItem2 = new Fire(770, 456, 178, 146, canvas.width-100, canvas.height-80, 80, 80);
  const fireItem3 = new Fire( 350, 232, 164, 164, 450, canvas.height-80, 80, 80);
  fireball.push(fireItem1, fireItem2, fireItem3);
}       

// GENERATES RANDOM SPIKES
function generateSpikes() {
  const spike = new Spikes(getRandom(0, canvas.width), 0, 100, 20);
  spikes.push(spike);
}

//TO DRAW SCORE COUNTER
function drawScore() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 30);
}

// ======================================================================================================================================================== //

// MAIN DRAW FUNCTION THAT GETS CALLED BY ANIMATION FRAME
function draw_character() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  background_draw(ctx);
  drawScore();
  generateFire();

  player.draw(ctx);
  platforms.forEach((platform) => platform.draw(ctx));
  spikes.forEach((spike) => spike.drawSpikes(ctx));
  fireball.forEach((fireItem) => fireItem.draw_fire(ctx));



  // for horizontal movement
  if (keys.A || keys.D) {
    player.vx = keys.A ? -SPEED : SPEED;
  } else {
    player.vx = 0; // to limit the movement (not infinite)
  }

  // to set horizontal boundary
  if (player.character_x_position + player.character_width >= canvas.width) {
    player.character_x_position = canvas.width - player.character_width;
  } else if (player.character_x_position < 0) {
    player.character_x_position = 0;
  }
  player.character_x_position += player.vx;

  // to set vertical boundary, if player goes up to the top, position is set to top:0
  if (player.character_y_position < 0) {
    player.character_y_position = 0;
  }

  // if space is pressed, jump height is decreased from vertical velocity and then added to vertical position
  if (keys.SPACE) {
    player.draw_space(ctx);
    player.vy -= JUMP_HEIGHT;
    player.character_y_position += player.vy;
  }

  // gravity is added to vetical velocty and then added to y-position
  player.character_y_position += player.vy;
  player.vy += GRAVITY;


  // grounding the character
  if (player.character_y_position > canvas.height - player.character_height) {
    player.character_y_position = canvas.height - player.character_height;
    player.vy = 0;
  }

  // detecting the collision between platform and character
  platforms.forEach((platform) => {
    if (collisionDetection(player, platform)) {
      if (player.vy > 0) {
        player.vy = 0;
        player.character_y_position =
          platform.y - player.character_height - 0.01;
        if (!platform.isScored) {
          // to check whether or not the platform has been landed on, if it has, set the isScored value to true and increment score by 1
          platform.isScored = true;
          score++;
        }
      }
    }
    platform.y += 1;
  });

  // detecting the collision between spike and the player
  fireball.forEach((fireitem) => {
    if (collisionDetection(player, fireitem)) {
      player.isDead = true;
      if (player.vy > 0) {
        player.vy = 0;
        player.character_y_position = fireitem.y - player.character_height - 0.01;
        player.isDead = true; // player isDead status is set to true
      }
    }
  });

// detecting the collision between fireplace and the player
  spikes.forEach((spike) => {
    if (collisionDetection(player, spike)) {
      if (player.vy > 0) {
        player.vy = 0;
        player.character_y_position = spike.y - player.character_height - 0.01;
        player.isDead = true; // player isDead status is set to true
      }
    }
    spike.y += 1;
  });

  // to generate platform at a certain interval
  platform_timer++;
  if (platform_timer % 300 === 0) {
    generatePlatform();
    platform_timer = 0;
  }

  // to generate spikes at a certain interval
  spike_timer++;
  if (spike_timer % 1000 === 0) {
    generateSpikes();
    spike_timer = 0;
  }

  // checks if the player isDead, if not -> continues, if dead -> displays message
  if (!player.isDead) {
    requestAnimationFrame(draw_character);
  } else {
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("You died!!! Press R to restart", 200, 350);
  }
}

// event listener to see if the user presses R for restart, if pressed, executes to_restart() function
document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    to_restart();
  }
});

// restarts the game by resetting the values
function to_restart() {
  player.isDead = false;
  score = 0;
  player.character_y_position = canvas.height - player.character_height;
  player.character_x_position = 300;
  requestAnimationFrame(draw_character);
}

draw_character();
