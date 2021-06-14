var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var bike1,bike2,bikes;
var bike1_img,bike2_img,c1
var coin,i 

function preload(){
  bike1_img=loadImage("images/bike1.png")
  bike2_img=loadImage("images/bike2.png")
  c1= loadImage("images/c.png")

}

function setup(){
  createCanvas(displayWidth,displayHeight)
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  yVel = 0;
  xVel = 0;
  coin=createGroup();

  xSet = false;
  game = new Game();
  game.getState();
  game.start();
  for(i=0;i<5;i++)
  {
    w=random(200,950);
    h=random(-height*4,height-300);
  c = createSprite(w,h);
  c.addImage("c",c1);
  coin.add(c);
 }
}



function draw(){

  background(200, 200, 255);


  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  
  if(gameState === 1){
    game.end();
  }
}
