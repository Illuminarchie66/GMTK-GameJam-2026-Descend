import { GameDetails } from "../Game.js";
import WallRenderer from "./WallRenderer";
import BackgroundRenderer from "./BackgroundRenderer";
import { sprites, TintedSpriteCache } from "./Sprite";

interface RendererOptions {
    gameDetails: GameDetails;
}

export default class Renderer {

    wallRenderer: WallRenderer;
    backgroundRenderer: BackgroundRenderer;
    gameDetails: GameDetails;
    spriteCache: TintedSpriteCache;

    constructor({
        gameDetails
    }: RendererOptions) {
        this.gameDetails = gameDetails;
        this.spriteCache = new TintedSpriteCache(
            sprites.wallBackground,
            200, (i) => {

                const hue = i * 3;
                const saturate = 1 + i * 0.05;

                return `
                    hue-rotate(${hue}deg)
                    saturate(${saturate})
                    brightness(1.05)
                `;
            }
        );
        this.wallRenderer = new WallRenderer(this.gameDetails, this.spriteCache);
        this.backgroundRenderer = new BackgroundRenderer();
    }

    update(cameraY: number): void {
        this.wallRenderer.update(cameraY);
    }

    drawBackground(ctx: CanvasRenderingContext2D, cameraY: number): void {
        this.backgroundRenderer.draw(ctx);
        this.wallRenderer.drawBackground(ctx);
    }

    draw(ctx: CanvasRenderingContext2D, cameraY: number): void {
        this.wallRenderer.draw(ctx);
    }

}