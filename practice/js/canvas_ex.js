window.addEventListener("load", drawScreen, true);

function drawScreen() {
	var theCanvas = document.getElementById("c");
	var Context = theCanvas.getContext('2d'); //렌더링 컨텍스트 : 2d, 3d
	var gradient = Context.createLinearGradient(0, 0, 170, 0);
    
    Context.lineWidth = 5;
	Context.beginPath();
	Context.moveTo(20, 120);
	Context.lineTo(70, 60);
    Context.strokeStyle = 'green';
	Context.stroke();
    
    Context.beginPath();
	Context.moveTo(70, 60);
	Context.lineTo(100, 140);
	Context.strokeStyle = 'green';
	Context.stroke();
    
    Context.beginPath();
	Context.moveTo(90, 110);
	Context.lineTo(120, 80);
	Context.strokeStyle = 'green';
	Context.stroke();

    Context.beginPath();
	Context.moveTo(120, 80);
	Context.lineTo(150, 140);
	Context.strokeStyle = 'green';
	Context.stroke();

	Context.beginPath();
	Context.arc(140, 42, 30, 1 * Math.PI, 2 * Math.PI, true);
	//시작점(x, y) , 반지름, 시작각도, 끝각도, 반시계방향
	Context.fillStyle = '#dd0';
	Context.fill();
    
    gradient.addColorStop('0', 'magenta');
	gradient.addColorStop('0.5', 'blue');
	gradient.addColorStop('1', 'red');
    Context.strokeStyle = gradient;
    Context.lineWidth = 5;
    Context.strokeRect(20, 40, 160, 100);
    
    Context.beginPath();
    Context.arc(300, 200, 80, 0, 4 * Math.PI, true);
    Context.fillStyle = '#999';
	Context.fill();
    
    Context.beginPath();
    Context.fillRect(210, 280, 180, 300);
}