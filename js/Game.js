class Game {
  constructor() {
    this.resetTitle = createElement("h2")
    this.resetButton = createButton("")
  }

  // read the gameState from the database
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width/2-50, height-100)
    car1.addImage("car1", car1_img)

    car2 = createSprite(width/2+50, height-100)
    car2.addImage("car2", car2_img)

  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
     
    this.resetButton.position(width/2 + 230, 100)
    this.resetTitle.html("Reset Game.")
    this.resetTitle.position(width/2 + 200, 40)
    
  }
  // write the gamestate in the database
      update(state){
        database.ref("/").update({
          gameState: state 
        })
      }

  play() {
    this.handleElements()
    Player.getPlayersInfo()
    this.handleResetButton()

    if(allPlayers !== undefined){
      image(track, 0, - height*5, width, height*6)
      drawSprites()
    }
    
    
  }

  handleResetButton(){
    this.resetButton.mousePressed(()=>{
    database.ref("/").set({
    playerCount:0, 
    gameState: 0,
    players:{}
    })
    window.location.reload()
    })
  }

}
