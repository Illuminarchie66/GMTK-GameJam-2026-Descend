import Collider from "../../colliders/Collider.js";
import BoxCollider from "../../colliders/BoxCollider.js";
import Player from "../../player/Player.js";
import Entity from "./Entity.js";

export default class Spike extends Entity {
    collider: Collider;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.collider = new BoxCollider(this, this.width/2, this.height/2, this.width, this.height);
    }

    override getCollider() {
        return this.collider;
    }

    override onPlayerCollision(player: Player) {
        player.kill();
    }

    override draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#333333";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}