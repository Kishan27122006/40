class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    bike1 = createSprite(400,400)
    bike1.addImage("bike1",bike1_img);
    bike2 = createSprite(800,800)
    bike2.addImage("bike2",bike2_img);
    bikes = [bike1, bike2];
  }

  play(){
    form.hide();
   
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      image(r, 0,-displayHeight*4,displayWidth, displayHeight*5);

      var index = 0

      var x = 175
      var y;

      for(var plr in allPlayers){

     index = index + 1

     x = 200 + (index * 200) + allPlayers[plr].xPos;

     y =  displayHeight - allPlayers[plr].distance

     bikes[index-1].x = x;

     bikes[index-1].y = y
     textAlign(CENTER);
     textSize(20);
     text(allPlayers[plr].name, bikes[index - 1].x, bikes[index - 1].y + 75);
          
     

     if (index === player.index){
     
      bikes[index - 1].shapeColor="red"
      camera.position.x = displayWidth/2;
      camera.position.y = bikes[index-1].y;
    }
     }
    }
    
    if(player.distance < 2150){
      if(keyIsDown(38) && player.index !== null){
          yVel += 0.9;
          if(keyIsDown(37)){
              xVel -= 0.2;
          }
          if(keyIsDown(39)){
              xVel += 0.2;
          }
      }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
          yVel -= 0.1;
          xVel *= 0.9;
      }else{
          yVel *= 0.985;
          xVel *= 0.985;
      }
    }
    

    player.distance += yVel;
    yVel *= 0.98;
    player.xPos += xVel;
    xVel *= 0.985;
    player.update();
   
    drawSprites();
  }
}
  

