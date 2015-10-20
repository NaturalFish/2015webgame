window.addEventListener('load', drawScreen, false);
window.addEventListener('keydown', onkeydown, false);
window.addEventListener('keyup', onkeyup, false);
window.addEventListener('mousemove', onmousemove, false);
window.addEventListener('mousedown', onmousedown, false);
window.addEventListener('mouseup', onmouseup, false);

var strKeyEventValue = 'None';
var strKeyEventType = 'None';
var strMouseStatus = 'None';
var bMouseClicked = false;
var intMouseX = 480;
var intMouseY = 300;

var bg = new Image();
bg.src = "../resources/img/bg.jpg";
var p = new Image();
p.src = "../resources/img/player.png";

p.addEventListener('load', drawScreen, false);

function onkeydown(e) {
    strKeyEventType = e.type;
    if(e.keyCode) code = e.keyCode;
    strKeyEventValue = code;
    drawScreen();
}

function onkeyup(e) {
    strKeyEventType = e.type;
    if(e.keyCode) code = e.keyCode;
    strKeyEventValue = code;
    drawScreen();
}

function onmousedown(e) {
    strMouseStatus = 'Clicked';
    var theCanvas = document.getElementById('c');
    bMouseClicked = true;
    intMouseX = e.clientX - theCanvas.offsetLeft - 25;
    intMouseY = e.clientY - theCanvas.offsetTop - 25;
    drawScreen();
}

function onmousemove(e) {
    strMouseStatus = "Moving";
    if(bMouseClicked) {
        var theCanvas = document.getElementById('c');
        intMouseX = e.clientX - theCanvas.offsetLeft - 25;
        intMouseY = e.clientY - theCanvas.offsetTop - 25;
        drawScreen();
    }
}

function onmouseup(e) {
    strMouseStatus = 'Not Clicked';
    bMouseClicked = false;
    intMouseX = 480;
    intMouseY = 300;
    drawScreen();
}

function drawScreen() {
	var theCanvas = document.getElementById('c');
	var Context = theCanvas.getContext('2d'); 
    
    Context.drawImage(bg, 0, 0, 1024, 700);
    Context.fillStyle = '#fff';
    Context.font = '24px nanumgothic';
    Context.textBaseline = 'top';
    Context.fillText('입력된 키는 : ' + strKeyEventValue, 5, 5);
    Context.fillText('키 입력상태는 : ' + strKeyEventType, 5, 30);
    Context.fillText('', 5, 55);
    Context.fillText('발생한 마우스 이벤트는 : ' + strMouseStatus, 5, 80);
    Context.fillText('마우스 좌표는 x : ' + intMouseX + ' y : ' + intMouseY, 5, 105);
    Context.drawImage(p, intMouseX, intMouseY);
}