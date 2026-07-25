import { Transform } from "../Transform.js";
import Collider from "./Collider.js";
import Collision from "./Collision.js";

export default class BoxCollider extends Collider {
    
    constructor(
        public owner: Transform,
        public offsetX: number,
        public offsetY: number,
        public width: number,
        public height: number
    ) {
        super();
        this.owner = owner;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = width;
        this.height = height;
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

        ctx.strokeRect(
            this.x - this.width/2,
            this.y - this.height/2,
            this.width,
            this.height
        );
    }
}