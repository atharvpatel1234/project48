var gameState = 0;
var score =  0;

function preload(){
  bgimage = loadImage("pad_screenshot.png");
  jake1image = loadImage("Jake1.webp");
  jake2image = loadImage("images.jpg");
  trackimage = loadImage("track.jpg");
  coinimage = loadImage("coin image.png");
  bg1image = loadImage("bg1.png");
  trainimage = loadImage("Trainimage.png");
  jake3image = loadImage("jake3image.jpg");
  gameoverimage = loadImage("gameoverimage.png");
  coin2image = loadImage("coin2image.png");
  winimage = loadImage("win.webp");

 coinsound = loadSound("coin.wav");
 bgsound = loadSound("bgsound.mp3");
 bonuscoinsound = loadSound("bonuscoinsound.wav");
}



function setup() {
  createCanvas(displayWidth,displayHeight-100);
  bgsound.loop();
  bg = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
  bg.addImage(trackimage)
  bg.velocityY = 10;

  jake = createSprite(displayWidth/2,displayHeight-150,50,50)
  jake.addImage(jake1image)
  //jake.addImage(jake3image)
  jake.scale = 0.7;
  jake.setCollider("rectangle",0,0,50,110);

  coinGroup = new Group();
  TrainGroup = new Group();
  bonuscoinGroup = new Group(); 

  edges = createEdgeSprites()
}


function draw() {
  background(bg1image);  
  if(gameState === 0){
    drawSprites();
  if(keyDown(RIGHT_ARROW)){
    jake.x = jake.x+14;
  }
  if(keyDown(LEFT_ARROW)){
    jake.x = jake.x-14;
  }
  if(bg.y>displayHeight/2){
    bg.y = 200
  }
  spawnCoin();
  spawnTrain()
  spawnbonuscoin();

  if(jake.isTouching(coinGroup)){
    coinGroup[0].destroy();
    coinsound.play();
    
    score = score+1;
  }
  if(TrainGroup.isTouching(jake)){
    gameState = 1;
  }
  if(jake.isTouching(bonuscoinGroup)){
    bonuscoinGroup[0].destroy();
    bonuscoinsound.play();
    score = score+5;
  }
  if(score>=100){
    gameState = 2;
  }
}
if(gameState === 2){
  background(winimage);
  bgsound.stop();
}
if(gameState === 1){
  jake.x = displayWidth/2;
  jake.y = displayHeight/2;
  jake.addImage(jake3image)
  jake.velocityY = 0;
  bg.velocityY  = 0;
  coinGroup.setVelocityYEach(0)
  TrainGroup.setVelocityEach(0)
  coinGroup.destroyEach();
  TrainGroup.destroyEach();
  textSize(30)
  image(gameoverimage,displayWidth/2-400,displayHeight/2-200);
}
  jake.collide(edges[0]);
  jake.collide(edges[1]);
  textSize(30)
  fill("red");
  text('Score :'+score,50,150)
  
}

function spawnCoin(){
 //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      var coin = createSprite(600,120,40,40);
      coin.x = Math.round(random(displayWidth/2-200,displayWidth/2+300));
      coin.addImage(coinimage);
      coin.scale = 0.2;
      coin.velocityY = 8;
      
       //assign lifetime to the variable
      coin.lifetime = 200;
      
      //adjust the depth
      coin.depth =jake.depth+1;
      
      //add each cloud to the group
      coinGroup.add(coin);
      
      
    }
  }
    function spawnTrain(){
      if(frameCount % 150 === 0 ){
        Train = createSprite(displayWidth/2,0,30,30);
        Train.addImage(trainimage)
        Train.velocityY = 5;
        Train.scale = 0.5;
        Train.x = Math.round(random(displayWidth/2-200,displayWidth/2+300));
        TrainGroup.add(Train);
        Train.lifetime = 150;
        Train.setCollider("rectangle",50,0,100,100)
    }}
    function spawnbonuscoin(){
      //write code here to spawn the clouds
         if (frameCount % 100 === 0) {
           var bonuscoin = createSprite(600,-10,40,40);
           bonuscoin.x = Math.round(random(displayWidth/2-200,displayWidth/2+300));
           bonuscoin.addImage(coin2image);
           bonuscoin.scale = 0.4;
           bonuscoin.velocityY = 12;
           
            //assign lifetime to the variable
           bonuscoin.lifetime = 200;
           
           //adjust the depth
           bonuscoin.depth =jake.depth+1;
           
           //add each cloud to the group
           bonuscoinGroup.add(bonuscoin);
           
           
         
       }
}