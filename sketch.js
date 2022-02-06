var balloon,balloonImage1,balloonImage2;
var hypoticBall, database;
var height;
var position;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {

   database=firebase.database();
  console.log(database);
  createCanvas(500,500);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  balloon.shapeColor = "blue";

  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);


  textSize(20); 
}

// function to display UI
function draw() {
  background("white");
  if(position !== undefined);
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  } 
  else if(keyDown(DOWN_ARROW)){
    writePosition(0, +1);
  } 

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x':position.x + x ,
    'y': position.y + y
  })
}

function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}

function readPosition(data){
  postion = data.val();
  console.log(position.x);
  hypoticBall.x = postion.x;
  hypoticBall.y = position.y;
}

//CHOOSE THE CORRECT UPDATEHEIGHT FUNCTION
// function updateHeight(x,y){
//   database.ref('balloon/height').set({
//     'x': height.x ,
//     'y': height.y 
//   })
// }

// function updateHeight(x,y){
//   database.ref('balloon/height')({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }


// function updateHeight(x,y){
//   database.ref('balloon/height').set({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }


// function updateHeight(x,y){
//   database.ref().set({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }




//CHOOSE THE CORRECT READHEIGHT FUNCTION
// function readHeight(data){
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

// function readHeight(data){
//   height = data.val();
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

// function readHeight(data){
//   height = data.val();
// }

// function readHeight(){
//   height = val();
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function showError(){
  console.log("Error in writing to the database");
}