import { Transform } from "../Transform.js";
import Collider from "./Collider.js";
import Collision from "./Collision.js";

class CompoundCollider extends Collider {
    constructor(
        public owner: Transform,
        public colliders: Collider[]
    ) {
        super();
        this.owner = owner;
        this.colliders = colliders;
    }

    get x() {
        return this.owner.x;
    }

    get y() {
        return this.owner.y;
    }

    overlaps(other: Collider|null): boolean {
        if(other === null)
            return false;

        if (this.active === false || other.active === false)
            return false;

        for (const collider of this.colliders) {
            if (collider.overlaps(other)) {
                return true;
            }
        }
        
        return false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (const collider of this.colliders) {
            collider.draw(ctx);
        }
    }
}