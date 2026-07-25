import { TILE_SIZE, sprites } from "./Sprite.js";

export default class BackgroundRenderer {
    constructor() {}

    draw(ctx: CanvasRenderingContext2D) {
        sprites.mountainBackground.draw(
            ctx,
            -32, 0,
            1920/2, 1080/2
        );
    }
}