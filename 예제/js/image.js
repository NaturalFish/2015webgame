var imgBg = new Image();
imgBg.src = "../resources/img/bg.jpg";

var imgP = new Image();
imgP.src = "../resources/img/player.png";

imgP.addEventListener('load', drawScreen, false);

function drawScreen() {
	var theCanvas = document.getElementById('c');
	var Context = theCanvas.getContext('2d'); 
    
    Context.drawImage(imgBg, 0, 0);
    Context.drawImage(imgP, 350, 250);
}

drawScreen();