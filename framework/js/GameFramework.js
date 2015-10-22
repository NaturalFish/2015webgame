window.addEventListener("load", onPageLoadComplete, false);

var rect_x = 100;
var rect_y = 100;

function onPageLoadComplete() {
    fps = 60;
    
    soundSystem.AddSound("shoot.mp3");
    game_state = new TestState();
    setInterval(gameLoop, 1000 / fps);
}

function gameLoop() {
    Update();
    Render();
    frameCounter.CountFrame();
}

function changeGameState(nextGameState) {
    if(nextGameState.Update == undefined)
        return;
    if(nextGameState.Render == undefined)
        return;
    game_state = nextGameState;
}

function TestState() {
    var sprite_img = new Image();
    sprite_img.src = "sprite.png";
    this.testObject = new SpriteAnimation(sprite_img, 23, 38, 8, 10);
    return this;
}

TestState.prototype.Render = function() {
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");
    this.testObject.Render(Context);
};

TestState.prototype.Update = function() {
    this.testObject.Update();
    if(inputSystem.isKeyDown(37)) {
        this.testObject.x -= 10;
    }
    if(inputSystem.isKeyDown(39)) {
        this.testObject.x += 10;
    }
};

function Update() {
//    if(inputSystem.isKeyDown(37)) {
//        rect_x -= 10;
//    }
//    if(inputSystem.isKeyDown(39)) {
//        rect_x += 10;
//    }
//    if(inputSystem.isKeyDown(38)) {
//        rect_y -= 10;
//    }
//    if(inputSystem.isKeyDown(40)) {
//        rect_y += 10;
//    }
    game_state.Update();
}

function Render() {
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    Context.fillStyle = "#fff";
    Context.fillRect(0, 0, 800, 600);
//    
//    Context.fillStyle = "#fff";
//    Context.font = "15px Arial";
//    Context.textBaseline = "top";
//    Context.fillText("FPS : " + frameCounter.lastFps, 10, 10);
//    
//    Context.fillStyle = "#ff0";
//    Context.fillRect(rect_x, rect_y, 40, 40);
    game_state.Render();
}