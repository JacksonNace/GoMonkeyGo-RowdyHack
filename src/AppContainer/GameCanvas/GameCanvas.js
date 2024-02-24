import React, { Component } from 'react';
import './GameCanvas.css';
import character from '../../img/DefaultRun.PNG';
import mushroom from '../../img/mushroom2.png';


class GameCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      STAGE_WIDTH : 1200,
      STAGE_HEIGHT : 600,
      TIME_PER_FRAME : 33, //this equates to 30 fps
      GAME_FONTS : "bold 20px sans-serif",  
      COUNTER_X : 100,
      COUNTER_Y : 100,

      CHAR_WIDTH : 1000,
      CHAR_HEIGHT : 960,
      CHAR_START_X : 0,
      CHAR_START_Y : 0,
      CHAR_SPEED : 5,
      IMAGE_START_NORTH_Y : 0,
      IMAGE_START_EAST_Y : 96,
      IMAGE_START_SOUTH_Y : 192,
      IMAGE_START_WEST_Y : 288, 
      IMAGE_START_X : 0,
      IMAGE_START_Y : 98,
      SPRITE_WIDTH : 5,

      TEXT_PRELOADING : 'Loading ...', 
      TEXT_PRELOADING_X : 200, 
      TEXT_PRELOADING_Y : 200
    };

    this.charX = this.state.CHAR_START_X;
    this.charY = this.state.CHAR_START_Y;

    this.currX = this.state.IMAGE_START_X;
    this.currY = this.state.IMAGE_START_EAST_Y;

    //---------------
    //Preloading ...
    //---------------
    //Preload Art Assets
    // - Sprite Sheet    
    this.mushroomImage = new Image();
    this.mushroomImage.ready = false;
    this.mushroomImage.src = mushroom;
    
    this.charImage = new Image();
    this.charImage.ready = false;
    this.charImage.onload = this.imageLoaded.bind(this);
    this.charImage.src = character;
  }

  componentDidMount() {
    this.stage = this.myGameCanvas;
    this.stage.width = this.state.STAGE_WIDTH;
    this.stage.height = this.state.STAGE_HEIGHT;

    this.counter = 0;
    this.ctx = this.stage.getContext("2d");
    this.ctx.fillStyle = "white";
    this.ctx.font = this.state.GAME_FONTS;
    
    this.ctx.fillRect(0,0,this.stage.width, this.stage.height);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(this.state.TEXT_PRELOADING, this.state.TEXT_PRELOADING_X, this.state.TEXT_PRELOADING_Y);

  }

  imageLoaded() {
    this.facing = "E"; 
    this.isMoving = false;
    
    setInterval(
      this.update.bind(this), 
      this.state.TIME_PER_FRAME
    );

    document.addEventListener("keydown", this.keyDownHandler.bind(this), false); 
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false); 
  }

  //------------
  //Game Loop
  //------------
  update() { 
    this.counter++;
    
    //Clear Canvas
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, this.stage.width, this.stage.height);

    if (this.isMoving)
    {
      if (this.facing == "E")
      {
        this.charX += this.state.CHAR_SPEED;
        this.currY = this.state.IMAGE_START_EAST_Y;
      }

      
      this.currX += this.state.CHAR_WIDTH;
      
      if (this.currX >= this.state.SPRITE_WIDTH)
        this.currX = 0;
    }
    
    //Draw Image
    this.ctx.drawImage(
      this.charImage, 
      this.currX, 
      this.currY,
      this.state.CHAR_WIDTH,
      this.state.CHAR_HEIGHT,
      this.charX,
      this.charY,
      this.state.CHAR_WIDTH,
      this.state.CHAR_HEIGHT
    );

    this.ctx.drawImage(
      this.mushroomImage, 
      0, 
      0,
      46,
      45,
      600, //x
      245, //y
      46,
      45
    );    
    
  }

  //------------
  //Key Handlers
  //------------
  keyDownHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);
    if (keyPressed == "D")
    {   
      this.facing = "E";
      this.isMoving = true;
    }
  }

  keyUpHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);
    console.log("keyPressed is "+keyPressed);
    if (keyPressed === "D")
    {
      this.isMoving = true;
    }
  }

  render() {
    return (
      <div className="GameCanvas">
      <canvas ref={(ref) => this.myGameCanvas = ref} />
      </div>
      );
  }
}

export default GameCanvas;
