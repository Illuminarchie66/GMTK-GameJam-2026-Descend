import Collider from "../../colliders/Collider.js";
import CircleCollider from "../../colliders/CircleCollider.js";
import Player from "../../player/Player.js";
import Entity from "./Entity.js";
import World from "../../World.js";

export class SpikeBall extends Entity {
    collider: Collider;
    radius: number;

    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
        this.collider = new CircleCollider(this, 0, 0, this.radius);
    }

    override getCollider() {
        return this.collider;
    }

    override onPlayerCollision(player: Player) {
        player.kill();
    }

    override draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#333333";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

export class HorizontalMoveSpikeBall extends SpikeBall {
    speed: number;
    direction: number = 1;
    leftEnd: number;
    rightEnd: number;

    constructor(
        x: number, y: number, radius: number, speed: number, 
        direction: number = 1, leftEnd: number = 0, rightEnd: number = World.GAMEPLAY_WIDTH
    ) {
        super(x, y, radius);
        this.speed = speed;
        this.direction = direction;
        this.leftEnd = leftEnd;
        this.rightEnd = rightEnd;
    }

    override update(dt: number) {
        // if reaches end of screen, reverse direction
        if (this.x + this.radius >= this.rightEnd) {
            this.direction = -1;
        }

        if (this.x - this.radius <= this.leftEnd) {
            this.direction = 1;
        }

        this.x += this.speed * this.direction * dt;
    }
}

export class PivotSpikeBall extends SpikeBall {
    speed: number;
    pivotRadius: number;
    direction: number = 1;
    angle: number = 0;
    centerX: number;
    centerY: number;

    constructor(x: number, y: number, radius: number, speed: number, pivotRadius: number, direction: number = 1, angle: number = 0) {
        super(x, y, radius);
        this.centerX = x;
        this.centerY = y;
        this.speed = speed;
        this.pivotRadius = pivotRadius;
        this.angle = angle;
        this.direction = direction;
    }

    override update(dt: number) {
        this.angle += this.direction * this.speed * dt;
        this.x = this.pivotRadius * Math.cos(this.angle) + this.centerX;
        this.y = this.pivotRadius * Math.sin(this.angle) + this.centerY;
    }

    override draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#333333";

        // ball
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // pivot point
        ctx.fillStyle = "#333333";
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, 5, 0, Math.PI * 2);
        ctx.fill();

        // line from pivot to ball
        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.centerX, this.centerY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}