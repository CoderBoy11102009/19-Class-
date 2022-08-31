var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var iBlockGroup, iBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 400, 50, 50)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.4
  doorGroup = new Group();
  climberGroup = new Group();
  iBlockGroup = new Group();
  ghost.setCollider("rectangle", 0, 25, 200, 255)
}

function draw() {
  background("black");
  if (gameState === "play") {
    if (keyDown("space")) {
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY + 0.5

    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 5
    }

    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 5
    }

    if (tower.y > 400) {
      tower.y = 300
    }

    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }

    if (iBlockGroup.isTouching(ghost) || ghost.y>= 605) {
      ghost.velocityY = 0
      ghost.destroy();
      gameState = "end"
    }

    ghost.debug = false

    spawnDoor();
    drawSprites();
  }
  else if(gameState === "end"){
    fill(rgb(155, mouseY, 99))
    textSize(30)
    text ("Game Over",250, 300)
  }

}
// Write a function to spawn Doors
function spawnDoor() {
  if (frameCount % 150 == 0) {
    door = createSprite(Math.round(random(100, 500)), 0, 10, 10);
    climber = createSprite(door.x, 50, 10, 10)
    iBlock = createSprite(climber.x, 80, 100, 30)
    door.velocityY = 2
    climber.velocityY = 2
    iBlock.velocityY = 2
    door.addImage("door", doorImg)
    climber.addImage("climber", climberImg)
    door.lifetime = 300
    climber.lifetime = 300
    iBlock.lifetime = 300
    ghost.depth = door.depth + 1
    iBlock.visible = false
    doorGroup.add(door);
    climberGroup.add(climber);
    iBlockGroup.add(iBlock);
  }
}







