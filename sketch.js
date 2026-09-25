let url = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet'
let font = ''
let url1 = 'https://fonts.googleapis.com/css2?family=Syne+Tactile&display=swap" rel="stylesheet'
let font1 = ''

let scene = "title";
let submitBtn;
let inputEl;
let oldManLine = "";

// images
let titleImg;
let grownBoyImg;
let huggingBoyImg;
let heartBoyImg;
let pickingApplesImg;
let appleFallImg;
let stumpManImg;
let cutImg;
let happyImg;
let gif_1;


let clicks = 0;
let angle = 0;
let textS = 20;
let imgH = 300; // default image height

let stumpStep = 0;        
let stumpAlpha = 0;       // current fade-in amount for active line
let stepStart = 0;        // when the current step began, for timing the pause

let userOffers = []; // takes user inputs
let final = false; // needed for checking if it is the final user input scene in order to change tree response

async function setup() {

    // load images
    titleImg = await loadImage("assets/title.png");
    grownBoyImg = await loadImage("assets/grownBoy.png");
    huggingBoyImg = await loadImage("assets/huggingBoy.png");
    heartBoyImg = await loadImage("assets/heartBoy.png");
    pickingApplesImg = await loadImage("assets/pickingApples.png");
    appleFallImg = await loadImage("assets/boy.jpeg");
    stumpManImg = await loadImage("assets/stumpMan2.jpeg");
    cutImg = await loadImage("assets/cut.jpeg");
    happyImg = await loadImage("assets/happy.jpeg");
    gif_1 = await loadImage("assets/apple.gif");

    // load font
    font = await loadFont(url);
    font1 = await loadFont(url1);

    // size of window
    createCanvas(windowWidth, windowHeight); 

    // for user prompt
    inputEl = createInput("");
    inputEl.hide();
    submitBtn = createButton("Take");
    submitBtn.mouseClicked(handleOffer);
    submitBtn.hide();

    imageMode(CENTER); // centers
    textAlign(CENTER, CENTER); // centers
    windowResized(); //called if resized
}

function draw() {
    background(255); //white background
    
    // navigates scenes
    if (scene === "title") drawTitle();
    else if (scene === "stumpMan") drawStumpMan();
    else if (scene === "huggingBoy") drawHuggingBoy();
    else if (scene === "appleFall") drawAppleFall();
    else if (scene === "grownBoy") drawGrownBoy();
    else if (scene === "pickingApples") drawPickingApples();
    else if (scene === "cut") drawCut();
    else if (scene === "end") drawEnd();
}

function mousePressed() {
    // clicks progress scenes
    if (clicks < 1){
        if (isClicked(width/2, height/2 - 50, 200, 200)){ //passed in coordinates of gif
            clicks++;
            scene = "stumpMan";
        }
    } else if (clicks == 1 && scene === "stumpMan" && isClicked(width/2 + 200, height/2 - 130, 100, 100) && stumpStep === 3) { // click something to go to next scene
        scene = "huggingBoy";
        clicks++;
    } else if (clicks == 2 && scene === "huggingBoy" && isClicked(width/2 + 150, height/2 - 200, 100, 100)) {
        scene = "appleFall";
        clicks++;
    } else if (clicks == 3 && scene === "appleFall" && isClicked(width/2 + 100, height/2 - 100, 100, 100)) {
        scene = "grownBoy";
        clicks++;
        inputEl.hide();
        submitBtn.hide();
        userOffers = [];
    } else if (clicks == 4 && scene === "grownBoy" && isClicked(width/2 + 100, height/2 - 100, 100, 100)) {
        scene = "pickingApples";
        clicks++;
        inputEl.hide();
        submitBtn.hide();
        userOffers = [];
    } else if (clicks == 5 && scene === "pickingApples" && isClicked(width/2 + 100, height/2 - 100, 100, 100)) {
        scene = "cut";
        final = true;
        clicks++;
    } else if (clicks == 6 && scene === "cut" && isClicked(width/2 + 100, height/2 - 100, 100, 100)) {
        scene = "end";
        clicks++;
        inputEl.hide();
        submitBtn.hide();
        userOffers = [];
     } else if (clicks == 7 && scene === "end" && isClicked(width/2 + 100, height/2 - 100, 100, 100)){
        //reset and repeat
        clicks = 0;
        scene = "title";
        stumpStep = 0;
        stumpAlpha = 0;
        final = false;
     }
}

function drawTitle() {
  background(255); //white
  
  // apple
  image(gif_1, width/2, height/2 - 50, 200, 200);
  
  // text
  fill(40);
  textSize(50);
  textFont(font1);
  text("take me", width / 2, height / 2 + 100);

}

function drawStumpMan() {
  background(255); //white
  drawImg(stumpManImg, width / 2, height / 2 - 50);
  oldManLine = '"I took everything from this tree. I want to go back to the beginning and change the things I did."';
  drawOldManLine(oldManLine);
  image(gif_1, width/2 + 200, height/2 - 130, 100, 100);
  
  // code for fading in tree's intro (got help from online, but had to edit for my proj)
    if (stumpStep === 0) {
        stumpStep = 1;
        stumpAlpha = 0;
        stepStart = millis(); // tracks time started
    }

    // fade the current line in
    if (stumpAlpha < 255) stumpAlpha += 2;   // higher number = faster fade

    fill(40, stumpAlpha);
    textFont(font1);
    textSize(24);

    if (stumpStep === 1) {
        // once fully visible, wait, then move on
        if (stumpAlpha >= 255 && millis() - stepStart > 1500) { // checks if 1.5 seconds passed
            stumpStep = 2;
            stumpAlpha = 0;
            stepStart = millis();
        }
    } else if (stumpStep === 2) {
        text('Then the tree said, "I can take you there."', width / 2, height /2 + 270);
        if (stumpAlpha >= 255 && millis() - stepStart > 1000) { // checks if 1 second passed
            stumpStep = 3; 
            stumpAlpha = 0; // next line will start invisible
            stepStart = millis(); // tracking
        }
    } else if (stumpStep === 3) {
        fill(40, 255); // line 2 now stays fully visible
        text('Then the tree said, "I can take you there."', width / 2, height /2 + 270);
        fill(40, stumpAlpha); // fade in after
        text('"Once there was a little boy..."', width / 2, height / 2 + 310);
    } 

}

function drawHuggingBoy() {
    background(255);
    drawImg(huggingBoyImg, width / 2 - 200, height / 2);
    image(gif_1, width/2 + 150, height/2 - 200, 100, 100);

    // story line
    fill(40);
    textFont(font1);
    textSize(textS);
    text('"...I loved him.\nAnd everyday he would come\nand he would gather my leaves\nand make them into crowns\nand play king of the forest.\nHe would climb up my trunk\nand swing from my branches"', width / 2 + 150, height / 2);  

    //old man line
    oldManLine = '"She loved me."';
    drawOldManLine(oldManLine);
}

function drawAppleFall() {
    background(255);
    drawImg(appleFallImg, width / 2 - 200, height / 2);
    image(gif_1, width/2 + 100, height/2 - 100, 100, 100);

    //input
    inputEl.position(width / 2, height / 2 + 80);
    inputEl.size(200, 30);
    submitBtn.position(width / 2 + 210, height / 2 + 80);
    inputEl.show();
    submitBtn.show();

    // story line
    fill(40);
    textFont(font1);
    textSize(textS);
    text('\n"...and he took my apples.\nI was happy. I said,\nWhat else can I give you, little boy?"', width / 2 + 100, height / 2);
    
    //old man line
    oldManLine = '"No. I took too much from her."';
    drawOldManLine(oldManLine);

    fill(40);
    textSize(textS - 4);
    textFont(font1)
    // offers (puts wants in string for tree reply)
    for (let i = 0; i < userOffers.length; i++) {
        text(userOffers[i], width / 2, height / 2 - 50 + i * 40, width * 0.6, 40);
    }
}

function drawGrownBoy() {
    background(255);
    drawImg(grownBoyImg, width / 2 - 200, height / 2);
    image(gif_1, width/2 + 100, height/2 - 100, 100, 100);

    //input
    inputEl.position(width / 2, height / 2 + 80);
    inputEl.size(200, 30);
    submitBtn.position(width / 2 + 210, height / 2 + 80);
    inputEl.show();
    submitBtn.show();

    // story line
    fill(40);
    textFont(font1);
    textSize(textS);
    text('\n"He left for a long time.\nBut one day he came back.\nHe said he wanted money.\nWhat else can I give you, little boy?"', width / 2 + 100, height / 2);
    
    //old man line
    oldManLine = '"I needed more. I was selfish."';
    drawOldManLine(oldManLine);

    fill(40);
    textSize(textS - 4);
    textFont(font1)

    // offers (puts wants in string for tree reply)
    for (let i = 0; i < userOffers.length; i++) {
        text(userOffers[i], width / 2, height / 2 - 50 + i * 40, width * 0.6, 40);
    }
}



function drawPickingApples() {
    background(255);
    drawImg(pickingApplesImg, width / 2 - 200, height / 2)
    image(gif_1, width/2 + 100, height/2 - 100, 100, 100);
    // story line
    fill(40);
    textFont(font1);
    textSize(textS);
    text('\n"He took all my apples.\nI was happy."', width / 2 + 100, height / 2);

    // old man line
    oldManLine = '"I never thanked her once."';
    drawOldManLine(oldManLine);
}

function drawCut() {
    background(255);
    drawImg(cutImg, width / 2 - 200, height / 2, 100);
    image(gif_1, width/2 + 130, height/2 - 100, 100, 100);

    //input
    inputEl.position(width / 2, height / 2 + 80);
    inputEl.size(200, 30);
    submitBtn.position(width / 2 + 210, height / 2 + 80);
    inputEl.show();
    submitBtn.show();

    // story line
    fill(40);
    textFont(font1);
    textSize(textS);
    text('\n"He needed more from me, and so I gave it.\nWhat else can I give you little boy?"', width / 2 + 100, height / 2);
    
    //old man line
    oldManLine = '"I took it all."';
    drawOldManLine(oldManLine);

    fill(40);
    textSize(textS - 4);
    textFont(font1)

    // offers (puts wants in string for tree reply)
    for (let i = 0; i < userOffers.length; i++) {
        text(userOffers[i], width / 2, height / 2 - 50 + i * 40, width * 0.6, 40);
    }
}

function drawEnd(){
    background(255);
    drawImg(happyImg, width / 2 - 200, height / 2, 200)
    image(gif_1, width/2 + 100, height/2 - 100, 100, 100);
    // story line
    fill(40);
    textFont(font1);
    textSize(textS);
    text('\n"You took everything,\nbut I was happy.\nBut really, I was not.\nBecause I loved you."', width / 2 + 100, height / 2);

    // old man line
    oldManLine = '"I am so sorry."';
    drawOldManLine(oldManLine);
}

// changes canvas size to match window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// makes old man line wavy
function drawOldManLine(line) {

    angle += 0.02;

    fill(40);
    textFont(font);
    textSize(18);
    textAlign(LEFT, CENTER);   // align text to the left for individual letter positioning
    
    // help from online/ai to make text oscillate in this pattern (also used info from lab)
    let pH = 3; // amplitude of oscillation
    let space = 3; // space between letters
    let cx = width / 2 - textWidth(line) / 2; // starting x position for the first letter
    for (let i = 0; i < line.length; i++) { //drawing each letter
        let offset = sin(angle + i * 0.5) * pH; // multiply by pH to increase amount of pixels oscillated
        text(line[i], cx, height/2+200+ offset); // oscillate each character's y position
        cx += textWidth(line[i]) + space; // add a small space between characters(2 pixels)
    }

    textAlign(CENTER, CENTER);
}

 // trying to make function to keep images from changing size when window is resized, got help from ai for this
function drawImg(img, x, y,h=imgH) {
    let w = img.width * (h / img.height);   // keeps the image's original proportions
    image(img, x, y, w, h);
}

// checks if user clicks apple
function isClicked(x,y,w,h){
    // code from class but edited for dif gif positions
    if (
        mouseX > x - w/2 &&
        mouseX < x + w/2 &&
        mouseY > y - h/2 &&
        mouseY < y + h/2 
        ) 
    {return true;
    } else return false;
}
 // got basis for this code online, had to edit for my project
function handleOffer() {
    let typed = inputEl.value().trim();
    if (typed === "") return;

    let response;
     if (typed.toLowerCase().includes("apple") && final===false) {
            response = '"Yes, you can have my apples."';
        } else if(final===false) {
            response = '"You can sell my apples to get ' + typed + '."';
        } else if(final===true){
            response = '"Take everything"';
        }

    userOffers.push(response);
    inputEl.value("");        // clear the box so user can type again
    inputEl.elt.focus();      // keep focus so user can keep typing without reclicking
}