window.addEventListener('load', init, false);
window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

var intPlayerX;
var intPlayerY;
var intervalID;
var Canvas; 
var bg;                         //배경
var p;                          //플레이어
var ball;                       //적
var Context;
var uaaa;
var fsz = 1;
var intTime = 0;
var launchDir = 'u';
var beforeKeyState = 'up';      //이전 키눌림 상태
var nowKeyState = 'up';         //현재 키눌림 상태
var fps = 30;                   //초당 프레임
var playerSpeed = 20;           //플레이어 속도
var Game_STATE_READY = 0;
var Game_STATE_GAME = 1;
var Game_STATE_OVER = 2;
var gameState = Game_STATE_READY;
var arrBalls = new Array();     //적들이 저장될 배열
var arrUaaa = new Array();      //'으아아아'가 저장될 배열
var isKeyDown = new Array();    //키가 눌렸는지

//게임 시작, 재시작시 리셋
function reset() {
    Canvas = document.getElementById('c');
    Context = Canvas.getContext('2d');
    
    intPlayerX = 480;
    intPlayerY = 300;
    uaaa = {};
    arrUaaa = [];       //모든 배열 비우기
    arrBalls = [];
    
    bg = new Image();
    bg.src = "../resources/img/bg.jpg";
    p = new Image();
    p.src = "../resources/img/player.png";
    ball = new Image();
    ball.src = "../resources/img/ball.png";
}

//로드 되었을 때 실행
function init() {
    reset();
    bgm = new Audio();
    bgm.src = "../resources/sound/bgm.mp3";
    bgm.loop = true;
    bgm.play();
    
    intervalID = setInterval(update, 1000 / fps);
}

//키가 눌린 상태에 따른 효과
function game() {
    if(gameState == Game_STATE_READY) {
        if(isKeyDown[9]) {  //탭
            onGameStart();
        }
    }
    else if(gameState == Game_STATE_GAME) { 
        moveBall();         //적들 움직이기 시작
        if(isKeyDown[13]) { //엔터
            onGameOver();
        }
        if(isKeyDown[32]) { //스페이스 바
            var rndClr = new Array();   //랜덤 색
            ++fsz;                      //누르고 있을 동안 폰트 크기 증가
            for(var i = 0; i < 3; ++i) {
                rndClr.push(Math.floor(Math.random() * 16).toString(16));   //랜덤 색 설정
            }
            uaaa = {
                x: intPlayerX,
                y: intPlayerY,
                color: "#" + rndClr[0] + rndClr[1] + rndClr[2],
                fontSize: fsz,
                launchDir: launchDir
            };  //누르고 있을동안 출력될 '으아아아'
        }
        if(isKeyDown[37]) {
            intPlayerX -= playerSpeed;  //좌
        }
        if(isKeyDown[38]) {
            intPlayerY -= playerSpeed;  //상
        }
        if(isKeyDown[39]) {
            intPlayerX += playerSpeed;  //우
        }
        if(isKeyDown[40]) {
            intPlayerY += playerSpeed;  //하
        } 
    }
    else if(gameState == Game_STATE_OVER) {
        if(isKeyDown[82]) {     //R
            onReady();
        }
    }
}

//keydown 이벤트
function onKeyDown(e) {
    isKeyDown[e.keyCode] = true;    //누른 키에 true 저장
    switch(e.keyCode) {
        case 9 : e.returnValue = false; break;
        case 32 : nowKeyState = 'down'; break;
        case 37 : launchDir = 'l'; break;
        case 38 : launchDir = 'u'; break;
        case 39 : launchDir = 'r'; break;
        case 40 : launchDir = 'd'; break;
    }
}

//keyup 이벤트
function onKeyUp(e) {
    isKeyDown[e.keyCode] = false;
    if(e.keyCode == 32)
        nowKeyState = 'up';
}

//준비
function onReady() {
    reset();
    gameState = Game_STATE_READY;
}

//게임 시작
function onGameStart() {
    makeBall();
    gameState = Game_STATE_GAME;
}

//게임 오버
function onGameOver() {
    gameState = Game_STATE_OVER;
    bgm.pause();
}

//적 생성
function makeBall() {
    for(var i = 0; i < 10; ++i) {
        var ballType = randomNextInt(4);
        var intX, intY, intGoX, intGoY;
        switch(ballType) {
            case 1 :
                intX = 0;
                intY = randomNextInt(Canvas.height);
                intGoX = randomNextInt(2);
                intGoY = -3 + randomNextInt(5);
                break;
            case 2 :
                intX = randomNextInt(Canvas.width);
                intY = 0;
                intGoX = -3 + randomNextInt(5);
                intGoY = randomNextInt(2);
                break;
            case 3 :
                intX = Canvas.width;
                intY = randomNextInt(Canvas.height);
                intGoX = -1 * randomNextInt(2);
                intGoY = 3 + randomNextInt(5);
                break;
            case 4 :
                intX = randomNextInt(Canvas.width);
                intY = Canvas.height;
                intGoX = 3 + randomNextInt(5);
                intGoY = -1 * randomNextInt(2);
                break;
        };
        arrBalls.push({
            x : intX,
            y : intY,           //랜덤으로 설정된 조건으로 푸시
            go_x : intGoX,
            go_y : intGoY
        });
    }
}

//적 이동
function moveBall() {
    for(var i = 0; i < arrBalls.length; ++i) {
        arrBalls[i].x += arrBalls[i].go_x * 3;
        arrBalls[i].y += arrBalls[i].go_y * 3;
        
        //화면 밖으로 나갔을 때 다시 들어오게 만들기
        if(arrBalls[i].x < 0 || arrBalls[i].x > Canvas.width || arrBalls[i].y < 0 || arrBalls[i].y > Canvas.height) {
            var ballType = randomNextInt(4);
            switch(ballType) {
                case 1 :
                    arrBalls[i].x = 0;
                    arrBalls[i].y = randomNextInt(Canvas.height);
                    arrBalls[i].go_x = randomNextInt(2);
                    arrBalls[i].go_y = -3 + randomNextInt(5);
                    break;
                case 2 :
                    arrBalls[i].x = randomNextInt(Canvas.width);
                    arrBalls[i].y = 0;
                    arrBalls[i].go_x = -3 + randomNextInt(5);
                    arrBalls[i].go_y = randomNextInt(2);
                    break;
                case 3 :
                    arrBalls[i].x = Canvas.width;
                    arrBalls[i].y = randomNextInt(Canvas.height);
                    arrBalls[i].go_x = -1 * randomNextInt(2);
                    arrBalls[i].go_y = 3 + randomNextInt(5);
                    break;
                case 4 :
                    arrBalls[i].x = randomNextInt(Canvas.width);
                    arrBalls[i].y = Canvas.height;
                    arrBalls[i].go_x = 3 + randomNextInt(5);
                    arrBalls[i].go_y = -1 * randomNextInt(2);
                    break;
            };
        }
        if(isCollisionWithPlayer(arrBalls[i].x, arrBalls[i].y)) {
            onGameOver();
        }
//        if(isCollisionWithUaaa(arrBalls[i].x, arrBalls[i].y)) {
//            arrBalls.pop(i);
//        }
    }
}

//1 ~ x 사이의 난수 리턴
function randomNextInt(x) {
    return 1 + Math.floor(Math.random() * x);
}

//(x, y)를 가진 오브젝트가 플레이어와 충돌했는지
function isCollisionWithPlayer(x, y) {
    if(intPlayerX < x && intPlayerX + 50 > x + 30 && intPlayerY < y && intPlayerY + 50 > y + 30) {
        return true;
    }
    return false;
}

//function isCollisionWithUaaa(x, y) {
//    for(var i = 0; i < arrUaaa.length; ++i) {
//        if(arrUaaa[i].x < x && x < arrUaaa[i].x + arrUaaa[i].fontSize * 4 && arrUaaa[i].y < y && y < arrUaaa[i].x + arrUaaa[i].fontSize)
//            return true;
//    }
//    return false;
//}

//캔버스 출력
function drawScreen() {
	var Context = Canvas.getContext('2d'); 
    Context.drawImage(bg, 0, 0, Canvas.width, Canvas.height);
    
    if(gameState == Game_STATE_READY) {
        Context.fillStyle = '#fff';
        Context.font = '24px 궁서체';
        Context.textBaseline = 'top';
        Context.fillText('호진이 으아아아 발사기', 100, 50);
        Context.fillText('누르다 탭 시작하기 위해', 100, 250);
    }
    else if(gameState == Game_STATE_GAME) {
        Context.fillStyle = '#fff';
        Context.font = '24px 궁서체';
        Context.fillText('누르다 엔터 끝내기 위해', 100, 50);
        Context.fillText('해보자 누르기 스페이스 바', 100, 80);
        
        //스페이스 바를 누르고 있을 동안 출력
        if(nowKeyState == 'down') {
            Context.font = uaaa.fontSize + 'px 궁서체';
            Context.fillStyle = '#fff';
            Context.fillText('으아아아', uaaa.x, uaaa.y);
        }
        
        //스페이스 바를 떼었을 때 '으아아아'를 발사
        for(var i = 0; i < arrUaaa.length; ++i) {
            Context.font = arrUaaa[i].fontSize + 'px 궁서체';
            Context.fillStyle = '#fff';
            switch(arrUaaa[i].launchDir) {
                case 'l' : arrUaaa[i].x -= arrUaaa[i].fontSize; break;
                case 'u' : arrUaaa[i].y -= arrUaaa[i].fontSize; break;
                case 'r' : arrUaaa[i].x += arrUaaa[i].fontSize; break;
                case 'd' : arrUaaa[i].y += arrUaaa[i].fontSize; break;
            }
            Context.fillText('으아아아', arrUaaa[i].x, arrUaaa[i].y);
        }
            
        Context.drawImage(p, intPlayerX, intPlayerY);               //플레이어 출력
        for(var i = 0; i < arrBalls.length; ++i) {
            Context.drawImage(ball, arrBalls[i].x, arrBalls[i].y);  //적 출력
        }
    }
    else if(gameState == Game_STATE_OVER) {
        Context.fillStyle = '#fff';
        Context.font = '30px 궁서체';
        Context.textBaseline = 'top';
        Context.fillText('누르다 R 다시 시작하기 위해', 100, 50);
        for(var i = 0; i < arrBalls.length; ++i) {
            Context.drawImage(ball, arrBalls[i].x, arrBalls[i].y);
        }
    }
}

//초당 fps만큼 게임 업데이트
function update() {
    game();
    intTime += 1000 / fps;
    if(intTime % 5000 == 0) {
        for(var i = 0; i < 5; ++i) {
            var ballType = randomNextInt(4);
            var intX, intY, intGoX, intGoY;
            switch(ballType) {
                case 1 :
                    intX = 0;
                    intY = randomNextInt(Canvas.height);
                    intGoX = randomNextInt(2);
                    intGoY = -3 + randomNextInt(5);
                    break;
                case 2 :
                    intX = randomNextInt(Canvas.width);
                    intY = 0;
                    intGoX = -3 + randomNextInt(5);
                    intGoY = randomNextInt(2);
                    break;
                case 3 :
                    intX = Canvas.width;
                    intY = randomNextInt(Canvas.height);
                    intGoX = -1 * randomNextInt(2);
                    intGoY = 3 + randomNextInt(5);
                    break;
                case 4 :
                    intX = randomNextInt(Canvas.width);
                    intY = Canvas.height;
                    intGoX = 3 + randomNextInt(5);
                    intGoY = -1 * randomNextInt(2);
                    break;
            };
            arrBalls.push({
                x : intX,
                y : intY,           //랜덤으로 설정된 조건으로 푸시
                go_x : intGoX,
                go_y : intGoY
            });
        }
    }
    
    if(intPlayerX <= 0) {
        intPlayerX = 0;
    }
    if(intPlayerX >= Canvas.width - 50) {
        intPlayerX = Canvas.width - 50;
    }                                           //벽과 충돌 처리
    if(intPlayerY <= 0) {
        intPlayerY = 0;
    }
    if(intPlayerY >= Canvas.height - 50) {
        intPlayerY = Canvas.height - 50;
    }
    
    console.log(beforeKeyState + ' ' + nowKeyState);
    drawScreen();
    
    if(beforeKeyState == 'up' && nowKeyState == 'down') {
        beforeKeyState = 'down';
    }
    //키를 막 떼었을 때
    if(beforeKeyState == 'down' && nowKeyState == 'up') {
        arrUaaa.push(uaaa);
        beforeKeyState = 'up';
        fsz = 1;    //폰트 크기 초기화
    }
}