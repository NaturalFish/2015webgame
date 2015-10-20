function FrameCounter() {
    this.lastFps     = 0;
    this.frameCount  = 0;
    this.lastTime    = 0;
    
    return 0;
}

var frameCounter = new FrameCounter();

FrameCounter.prototype.countFrame = function() {
    this.frameCount++;          //실행 횟수 카운트
    var tmpDate = new Date();   //시간 저장
    if(this.lastTime + 1000 < tmpDate.getTime()) {
        //저장한 시간 이후 1초 지났으면
        this.lastFps = this.frameCount;
        this.frameCount = 0;
        this.lastTime = tmpDate.getTime();
    }
    delete tmpDate;
};