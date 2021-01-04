var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,360);
  
  monkey = createSprite(80,350,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,1300,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  //console.log(ground);
  
  invisibleground = createSprite(400,350,1300,10);
  invisibleground.velocityX = -4;
  invisibleground.x = ground.width/2;
  invisibleground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {
  background("white");
  stroke("black");
  textSize(15);
  fill("black");
  text("Survival Time:"+score,470,30);
  score = score+Math.round(getFrameRate()/50)
  
  if(keyDown("space")&&monkey.y>310){
    monkey.velocityY = -14;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    foodGroup.destroyEach();
    score = 0;
  }
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }

  monkey.collide(ground);
  
  drawSprites();
  food();
  obstacle();
}

function food(){
  if(frameCount%80===0){
    var food = createSprite(400,315,20,20);
    food.y = Math.round(random(200,240));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -4;
    food.lifetime = 100;
    food.depth = monkey.depth;
    monkey.depth = monkey.depth+1;  
    foodGroup.add(food);
    }
  }

function obstacle(){
if(frameCount%160===0){
  var obstacle = createSprite(700,320,20,20);
  obstacle.addImage(obstaceImage);
  obstacle.scale = 0.15;
  obstacle.velocityX = -4;
  obstacle.lifetime = 200;
  obstacle.depth = monkey.depth;
  monkey.depth = monkey.depth+1;
  obstacleGroup.add(obstacle);
    obstacle.collide(invisibleground)
}
}





