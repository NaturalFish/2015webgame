function SoundSystem() {
    this.isLoadComplete         = false;
    this.nowResourceLoadedCount = 0;
    this.intAllResourceCount    = 0;
    this.arrSounds              = new Array();
    
    return this;
}
var soundSystem = new SoundSystem();

SoundSystem.prototype.AddSound = function(fileName) {
    var soundMusic = new Audio();
    soundMusic.src = fileName;
    document.body.appendChild(soundMusic);
    soundMusic.addEventListener("canplaythrough", onLoadSoundComplete, false);
    
    this.arrSounds.push({ name: fileName, sound: soundMusic, isPlayed: false });
    this.intAllResourceCount++;
};

function onLoadSoundComplete() {
    soundSystem.nowResourceLoadedCount++;
    if(soundSystem.nowResourceLoadedCount >= soundSystem.intAllResourceCount) {
        soundSystem.isLoadComplete = true;
    }
}

SoundSystem.prototype.PlaySound = function(fileName) {
    for(var i = 0; i < this.arrSounds.length; ++i) {
        if(this.arrSounds[i].name == fileName) {
            if(this.arrSounds[i].sound.ended == true || this.arrSounds[i].isPlayed == false) {
                this.arrSounds[i].sound.play();
                this.arrSounds[i].isPlayed = true;
                break;
            }
        }
    }
};