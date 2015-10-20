window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

function InputSystem() {
    this.isKeyPressed = [];
    return this;
}

var inputSystem = new InputSystem();

function onKeyDown(e) {
    inputSystem.isKeyPressed[e.keyCode] = true;
}

function onKeyUp(e) {
    inputSystem.isKeyPressed[e.keyCode] = false;
}

InputSystem.prototype.isKeyDown = function(keyCode) {
    if(this.isKeyPressed[keyCode] == true)
        return true;
    else
        return false;
}