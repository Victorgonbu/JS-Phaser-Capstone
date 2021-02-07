export default class Model {
    constructor() {
        this._soundOn = true;
        this._musicOn = true;
        this._bgMusicPlaying = false;

    }

    get gameOptions() {
        return {
            platformSpeedRange: [300, 400],
            spawnRange: [80, 300],
            platformSizeRange: [90, 300],
            platformHeightRange: [-10, 10],
            platformHeighScale: 10,
            platformVerticalLimit: [0.4, 0.8],
            playerGravity: 900,
            jumpForce: 400,
            playerStartPosition: 200,
            jumps: 2
        }
    }

    set musicOn(value) {
        this._musicOn = value;
    }

    get musicOn() {
        return this._musicOn;
    }

    set soundOn(value) {
        this._soundOn = value;
    }
    
    get soundOn() {
        return this._soundOn;
    }

    set bgMusicPlaying(value) {
        this._bgMusicPlaying = value;
    }

    get bgMusicPlaying() {
        return this._bgMusicPlaying;
    }
}