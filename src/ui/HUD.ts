import { GameDetails, GameState } from "../Game.js";
import World from "../World.js";

interface HUDOptions {
    canvas: HTMLCanvasElement;
    gameDetails: GameDetails;
    font?: string;
    color?: string;
}

export default class HUD {
    private canvas: HTMLCanvasElement;
    gameDetails: GameDetails;

    font: string;
    color: string;

    constructor({
        canvas, 
        gameDetails,
        font = '20px "SilkScreen"', 
        color = "#000000"
    }: HUDOptions) {
        this.canvas = canvas;
        this.gameDetails = gameDetails;
        this.font = font;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(`Press 'Space' to descend.`, 100, 50 );
        if (this.gameDetails.highScore) {
            ctx.fillText(`High Score: ${this.gameDetails.highScore}`, 150, 80 );
            ctx.fillText(`Last Score: ${this.gameDetails.currentScore}`, 150, 110 );
        }
    }
}