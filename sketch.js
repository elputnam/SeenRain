// Failure to Load: Illuminated Umbrellas

//photos
let base;
let alley1;
let alley2;
let Laurel;
let stone;
let sil = 1;
let flick = 1;

let shadows = [];
let sign = [];
let sky = [];

let alp1 = 0;
let colour = 180;
let shade = 0;

// Tiles configuration
let tiles = [];
let cols = 5;
let rows = 5;
let w, h;

// Order of tiles
let board = [];

function preload(){
  base = loadImage('assets/SeenRain_base.png');
  alley1 = loadImage('assets/SeenRain_alley1.png');
  alley2 = loadImage('assets/SeenRain_alley2.png');
  Laurel = loadImage('assets/SeenRain_LaurelSide.png');
  stone = loadImage('assets/SeenRain_stones.png')
  for (let i = 1; i < 3; i++){
    shadows[i] = loadImage("assets/SeenRain_Laurel" + i + ".png");
  }
  for (let j = 1; j < 3; j++){
    sign[j] = loadImage("assets/SeenRain_sign" + j + ".png");
  }
  for (let k = 1; k < 6; k++){
    sky[k] = loadImage("assets/SeenRain_sky" + k + ".png")
  }
}

function setup() {
  createCanvas(base.width, base.height);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  frameRate(6);

  // pixel dimensions of each tiles
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(stone, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }
}

function draw() {
  background(random(360), 100, 100);

  //base
  push();
  tint(255, random(70,100));
  image(base, 0, 0);
  pop();

  //alleys
  blend(alley1, 0, 0, alley1.width, alley1.height, 0, 0, width, height, EXCLUSION);
  //umbrellas
  for (let j = 1; j < sky.length; j++){
    push();
    tint(random(255));
    image(sky[j], 0, 0);
    pop();
   }
  blend(alley2, 0, 0, alley2.width, alley2.height, 0, 0, width, height, EXCLUSION);

   //signs
   push();
   tint(random(255));
   image(sign[flick], 0, -200);
   if (frameCount%int(random(5))==0){
     if (flick == 1){
       flick = 2;
     } else {
       flick = 1;
     }
   }
   pop();

     // shadows
  push();
  tint(shade, random(70,100))
  translate(-400, 0);
  
  for (i = 0; i < 5; i++){
    image(shadows[sil], 200*i+random(-10,10), random(-5,5));
  }
  
    if (frameCount%int(random(5))==0){
      if (sil == 1){
        sil = 2;
  
      } else {
        sil = 1;
      }
    }
    pop();

  //tile shuffle
  push();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = int(random(25));
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        tint(random(255), alp1);
        let img = tiles
        [tileIndex].img;
        img.filter(INVERT);
        image(img, x, y, w, h);
      }
    }
  }
  pop();

  
 //umbrellas x2
 for (let m = 1; m < sky.length; m++){
  push();
  scale(1,-1)
  tint(random(360), 100, 100, alp1);
  image(sky[m], random(-20,20), -height + random(-20,20));
  pop();
 }

  

  //Laurels
  for (let k = 0; k < 5; k++){
  push();
    tint(colour, random(100), random(100), alp1)
    image(Laurel, 20*k+random(-5,5), 20*k+random(-5,5));
    pop();
  }
  for (let l = 0; l < 5; l++){
  push();
    scale(-1, 1);
    tint(colour+180, random(100), random(100), alp1)
    image(Laurel, -width+20*l+random(-5,5), 20*l+random(-5,5));
    pop();
  }


  //scene shift
  if (frameCount%int(random(10,20))==0){
    colour = random(180);
    if (alp1 == 0){
      alp1 = 100;
      shade = 255;
      
    } else {
      alp1 = 0;
      shade = 0;
  
    }
  }
   
    
  }


class Tile {
  constructor(i, img) {
    this.index = i;
    this.img = img;    
  }
}
