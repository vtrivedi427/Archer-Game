const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var Archer, ArcherImg
var arrow, arrows = []
var ArrowImg
var angle=60
function preload() {
  bgImg = loadImage("assets/bg.png")

  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")

  ArcherImg =loadAnimation("assets/Archer.webp")

  ArrowImg=loadImage("assets/Arrow.png")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  
  //background image
 /* bg = createSprite(165, 485, 1, 1);
  bg.addImage(bgImg);
  bg.scale = 1.3
*/
  //creating top and bottom grounds
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon     
  balloon = createSprite(290, 250, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.2;

  Archer = createSprite(70, 330, 50, 50)
  Archer.addAnimation("person", ArcherImg)
  Archer.scale = 0.19

var arrow = new Arrow(Archer.x, Archer.y);
  arrow.display()

}

function draw() {

  background("black");
  image(bgImg,0,0,1200,600)

    push();
    translate(Archer.x-5, Archer.y-15);
    rotate(angle);
    imageMode(CENTER);
   image(ArrowImg,0,0,30,30)
    pop();

  //making the hot air balloon jump
  if (keyDown("space")) {
    balloon.velocityY = -0.07;

  }

  //adding gravity
  balloon.velocityY = balloon.velocityY - 0.005;
  if (balloon.y <= 0) {
    gameOver()
  }

  drawSprites();

}
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var arrow = new Arrow(Archer.x, Archer.y);
    arrow.display()
    arrow.trajectory = [];
    console.log(arrow)
    
    //arrow.Body.setAngle(arrow.body, Archer.angle);
    arrows.push(arrow);
    arrow.shoot()

  }
  if (keyCode==RIGHT_ARROW) {
    angle=angle+5
  }
  if (keyCode==LEFT_ARROW) {
    angle=angle-5
  }


  
}
function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "assets/balloon1.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
