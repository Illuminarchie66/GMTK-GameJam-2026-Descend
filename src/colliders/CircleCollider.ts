import { Transform } from "../Transform.js";
import Collider from "./Collider.js";
import Collision from "./Collision.js";

export default class CircleCollider extends Collider {
    constructor(
        public owner: Transform,
        public offsetX: number,
        public offsetY: number,
        public radius: number
    ) {
        super();
        this.owner = owner;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.radius = radius;
    }

    get x() {
        return this.owner.x + this.offsetX;
    }

    get y() {
        return this.owner.y + this.offsetY;
    }

    overlaps(other: Collider|null): boolean {
        if(other === null)
            return false;

        if (this.active === false || other.active === false)
            return false;

        return Collision.test(this, other);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "lime";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}