function drawScreen() {
	var theCanvas = document.getElementById("gameCanvas");
	var Context = theCanvas.getContext('2d'); //렌더링 컨텍스트 : 2d, 3d
	Context.fillStyle = "#1abc9c";
	Context.fillRect(0, 0, 1000, 700);
}

drawScreen();