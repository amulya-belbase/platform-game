function collisionDetection(rect1, rect2) {
  return (
    rect1.character_x_position <= rect2.x + rect2.width &&
    rect1.character_x_position + rect1.character_width >= rect2.x &&
    rect1.character_y_position + rect1.character_height <= rect2.y + rect2.height &&
    rect1.character_y_position + rect1.character_height >= rect2.y
  );
}

function getRandom(min,max){
    return min + Math.random() * (max - min);
}