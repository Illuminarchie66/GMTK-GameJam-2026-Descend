import { GameDetails, GameState } from "../Game.js";
import World from "../World.js";

interface WorldTextOptions {
    canvas: HTMLCanvasElement;
    gameDetails: GameDetails;
    font?: string;
    color?: string;
}

export default class WorldText {
    private canvas: HTMLCanvasElement;
    gameDetails: GameDetails;

    font: string;
    color: string;

    constructor({
        canvas, 
        gameDetails,
        font = '20px "SilkScreen"', 
        color = "#000000"
    }: WorldTextOptions) {
        this.canvas = canvas;
        this.gameDetails = gameDetails;
        this.font = font;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const highScore = World.WORLD_DEPTH - (this.gameDetails.highScore ?? 0);
        const lastScore = World.WORLD_DEPTH - (this.gameDetails.currentScore ?? 0);

        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(`Press 'Space' to descend.`, 100, 50 );
        if (this.gameDetails.highScore) {
            ctx.fillText(`High Score: ${highScore}`, 150, 80 );
            ctx.fillText(`Last Score: ${lastScore}`, 150, 110 );
        }
    }
}