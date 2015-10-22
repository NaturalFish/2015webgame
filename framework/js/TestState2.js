function TestState2() {
    return this;
}

TestState2.prototype.Update = function() {
    
};

TestState2.prototype.Render = function() {
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");
    Context.fillText("State 2", 200, 300);
}