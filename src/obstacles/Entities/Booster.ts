import Collider from "../../colliders/Collider.js";
import BoxCollider from "../../colliders/BoxCollider.js";
import Player from "../../player/Player.js";
import Entity from "./Entity.js";
import { Row } from "../Row.js";

export default class Booster extends Entity {
    collider: Collider;
    width: number;
    impulse: number; 
    multiplier: number;
    height: number = Row.ROW_HEIGHT/4;

    constructor(x: number, y: number, width: number = Row.CELL_SIZE*1.5, impulse: number = 450, multiplier: number = 1.5) {
        super(x, y);
        this.width = width;
        this.collider = new BoxCollider(this, 0, 0, this.width + 5, this.height);
        this.impulse = impulse;
        this.multiplier = multiplier;
    }

    override getCollider() {
        return this.collider;
    }

    override onPlayerCollision(player: Player) {
        player.boost({impulse: this.impulse, multiplier: this.multiplier});
    }

    drawRingHalf(ctx: CanvasRenderingContext2D, start: number, end: number) {
        ctx.beginPath();
        ctx.ellipse(
            this.x,
            this.y,
            this.width / 2,
            this.height / 2,
            0,
            start,
            end
        );

        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.stroke();

        const gradient = ctx.createLinearGradient(
            this.x - this.width / 2,
            this.y,
            this.x + this.width / 2,
            this.y
        );

        gradient.addColorStop(0, "#ff004c80");
        gradient.addColorStop(0.25, "#ffcc0080");
        gradient.addColorStop(0.5, "#00ff8880");
        gradient.addColorStop(0.75, "#00aaff80");
        gradient.addColorStop(1, "#cc00ff80");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    override draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.1)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 5;
        this.drawRingHalf(ctx, Math.PI, 2*Math.PI);
        ctx.shadowColor = "transparent";
        ctx.restore();
    }

    override postPlayerDraw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawRingHalf(ctx, 0, Math.PI);
        ctx.restore();
    }
}