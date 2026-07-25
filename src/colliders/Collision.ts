import BoxCollider from "./BoxCollider.js";
import CircleCollider from "./CircleCollider.js";
import Collider from "./Collider.js";

export default class Collision {
    static test(a: Collider, b: Collider): boolean {
        if (a instanceof CircleCollider && b instanceof CircleCollider)
            return this.circleCircle(a, b);

        if (a instanceof BoxCollider && b instanceof BoxCollider)
            return this.boxBox(a, b);

        if (a instanceof CircleCollider && b instanceof BoxCollider)
            return this.circleBox(a, b);

        if (a instanceof BoxCollider && b instanceof CircleCollider)
            return this.circleBox(b, a);

        return false;
    }

    static circleCircle(a: CircleCollider, b: CircleCollider): boolean {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const radius = a.radius + b.radius;
        return dx*dx + dy*dy <= radius*radius;
    }

    static boxBox(a: BoxCollider, b: BoxCollider): boolean {
        return (Math.abs(a.x - b.x) * 2 < a.width + b.width) && (Math.abs(a.y - b.y) * 2 < a.height + b.height);
    }

    static circleBox(circle: CircleCollider, box: BoxCollider): boolean {
        const circleDistanceX = Math.abs(circle.x - box.x);
        const circleDistanceY = Math.abs(circle.y - box.y);

        if (circleDistanceX > (box.width / 2 + circle.radius)) { return false; }
        if (circleDistanceY > (box.height / 2 + circle.radius)) { return false; }

        if (circleDistanceX <= (box.width / 2)) { return true; }
        if (circleDistanceY <= (box.height / 2)) { return true; }

        const cornerDistance_sq = (circleDistanceX - box.width / 2) ** 2 + (circleDistanceY - box.height / 2) ** 2;
        return (cornerDistance_sq <= (circle.radius ** 2));
    }
}