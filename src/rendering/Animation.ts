import { Sprite } from "./Sprite";

export default class Animation {

    frames: Sprite[];
    frameTime: number;

    currentFrame: number = 0;
    timer: number = 0;

    constructor(frames: Sprite[], frameTime: number) {
        this.frames = frames;
        this.frameTime = frameTime;
    }

    update(dt: number) {
        this.timer += dt;

        if (this.timer >= this.frameTime) {
            this.timer -= this.frameTime;

            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
    }

    getSprite(): Sprite {
        return this.frames[this.currentFrame];
    }

    reset() {
        this.currentFrame = 0;
        this.timer = 0;
    }

}