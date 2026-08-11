import { GameDetails } from "../Game.js";
import World from "../World.js"
import { GameState } from "../Game.js";
import Camera from "../Camera.js";

interface HUDOptions {
    canvas: HTMLCanvasElement;
    gameDetails: GameDetails;
    camera: Camera;
    font?: string;
}

export default class Bar {
    static HUD_WIDTH = 150;
    barWidth = 15;
    barHeight = 1100;
    barX = 700;
    barY = 100;
    resetTimer: number = 0;
    resetDuration: number = 1.5;
    barColor: string = "#ffffff";
    barBorderColor: string = "#466666";
    iconColor: string = "#9cf4f5";
    iconBorderColor: string = "#000000";
    textColor: string = "#ffffff";

    private canvas: HTMLCanvasElement;
    gameDetails: GameDetails;
    camera: Camera;

    font: string;

    constructor({
        canvas, 
        gameDetails,
        camera,
        font = '24px "SilkScreen"', 
    }: HUDOptions) {
        this.canvas = canvas;
        this.gameDetails = gameDetails;
        this.camera = camera;
        this.font = font;
    }

    update(dt: number): void {
        if (this.gameDetails.state === GameState.Resetting) {
            this.resetTimer += dt;
        } else {
            this.resetTimer = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let positionY = this.barY;

        if (this.gameDetails.state === GameState.Playing || this.gameDetails.state === GameState.Dying) {
            const depth = this.gameDetails.currentScore ?? 0;
            const percentage = depth / (World.WORLD_DEPTH ?? 1);
            positionY = Math.min(this.barY + this.barHeight * percentage, this.barY + this.barHeight);
        } else if (this.gameDetails.state === GameState.Resetting) {
            const t = Math.min(1, this.resetTimer / this.resetDuration);
            const achievedDepth = this.gameDetails.currentScore ?? 0;
            const percentageOfBar = achievedDepth / (World.WORLD_DEPTH ?? 1);
            positionY = this.barY + this.barHeight * percentageOfBar * (1-t);
        }

        const displayDepth = World.WORLD_DEPTH - (this.gameDetails.currentScore ?? 0);

        ctx.fillStyle = "#1b1b1b";
        ctx.fillRect(
            this.canvas.width - Bar.HUD_WIDTH,
            0,
            Bar.HUD_WIDTH,
            this.canvas.height
        );

        const panelLeft = this.canvas.width - Bar.HUD_WIDTH;
        this.barX = panelLeft + (Bar.HUD_WIDTH - this.barWidth) / 2;
        this.barHeight = Math.ceil((this.canvas.height - 2 * this.barY)/100)*100;

        ctx.font = this.font;
        ctx.fillStyle = this.textColor;
        const textString = `${displayDepth}m`;
        const textWidth = ctx.measureText(textString).width;
        ctx.fillText(textString, this.barX - textWidth/2, this.barY-20 );

        ctx.beginPath();
        ctx.rect(this.barX, this.barY, this.barWidth, this.barHeight);
        ctx.fillStyle = this.barColor;
        ctx.fill(); 
        ctx.closePath();
        ctx.strokeStyle = this.barBorderColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let i = 1; i < this.barHeight / 100; i++) {
            const tickY = this.barY + i * 100;
            ctx.beginPath();
            ctx.moveTo(this.barX + 2, tickY);
            ctx.lineTo(this.barX + this.barWidth - 2, tickY);
            ctx.strokeStyle = this.barBorderColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(
            this.barX + this.barWidth / 2, 
            positionY, 
            10, 
            0, Math.PI * 2
        );
        ctx.fillStyle = this.iconColor;
        ctx.fill();
        ctx.closePath();

        ctx.arc(
            this.barX + this.barWidth / 2, 
            positionY, 
            10, 
            0, Math.PI * 2
        );
        ctx.strokeStyle = this.iconBorderColor;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}