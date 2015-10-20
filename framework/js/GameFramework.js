window.addEventListener("load", onPageLoadComplete, false);

var rect_x = 100;
var rect_y = 100;

function onPageLoadComplete() {
    var fps = 60;
    setInterval(gameLoop, 1000 / fps);
}

function gameLoop() {
    Update();
    Render();
    frameCounter.countFrame();
}

function Update() {
    if(inputSystem.isKeyDown(37)) {
        rect_x -= 10;
    }
    if(inputSystem.isKeyDown(39)) {
        rect_x += 10;
    }
    if(inputSystem.isKeyDown(38)) {
        rect_y -= 10;
    }
    if(inputSystem.isKeyDown(40)) {
        rect_y += 10;
    }
}

function Render() {
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");
    
    Context.fillStyle = "#700";
    Context.fillRect(0, 0, 800, 600);
    
    Context.fillStyle = "#fff";
    Context.font = "15px Arial";
    Context.textBaseline = "top";
    Context.fillText("FPS : " + frameCounter.lastFps, 10, 10);
    
    Context.fillStyle = "#ff0";
    Context.fillRect(rect_x, rect_y, 40, 40);
}