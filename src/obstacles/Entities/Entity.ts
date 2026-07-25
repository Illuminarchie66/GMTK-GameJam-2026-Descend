import Collider from "../../colliders/Collider.js";
import Player from "../../player/Player.js";
import { Transform } from "../../Transform.js";

export default abstract class Entity implements Transform {

    x: number;
    y: number;

    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }

    update(dt:number):void {}

    draw(ctx:CanvasRenderingContext2D):void {}

    postPlayerDraw(ctx:CanvasRenderingContext2D):void {}

    getCollider():Collider|null {
        return null;
    }

    onPlayerCollision(player:Player){}
}