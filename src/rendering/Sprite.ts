import Assets from "./Assets.js";

export const TILE_SIZE = 32;

export class Sprite {

    constructor(
        public image: HTMLImageElement,
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {}

    draw(
        ctx: CanvasRenderingContext2D,
        dx: number,
        dy: number,
        dw: number = this.width,
        dh: number = this.height
    ) {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height,
            dx,
            dy,
            dw,
            dh
        );
    }

    drawImage(
        ctx: CanvasRenderingContext2D,
        image: CanvasImageSource,
        dx:number,
        dy:number,
        width:number,
        height:number
    ){
        ctx.drawImage(
            image,
            dx,
            dy,
            width,
            height
        );
    }
}

export class TintedSpriteCache {

    sprites: HTMLCanvasElement[] = [];

    constructor(
        sprite: Sprite,
        count: number,
        getFilter: (index: number) => string
    ) {

        for (let i = 0; i < count; i++) {

            const canvas = document.createElement("canvas");

            canvas.width = sprite.width;
            canvas.height = sprite.height;

            const ctx = canvas.getContext("2d")!;

            ctx.imageSmoothingEnabled = false;

            ctx.filter = getFilter(i);

            sprite.draw(ctx, 0, 0);

            ctx.filter = "none";

            this.sprites.push(canvas);
        }
    }

    get(index:number): HTMLCanvasElement {
        return this.sprites[index];
    }

    get length(): number {
        return this.sprites.length;
    }
}

export const sprites = {

    mountainBackground: new Sprite(
        Assets.mountainBackground,
        0, 0,
        1920, 1080
    ),

    wallRightTop: new Sprite(
        Assets.dirtCave,
        64, 0,
        32, 32
    ),

    wallRight: new Sprite(
        Assets.dirtCave,
        64, 32,
        32, 32
    ),

    wallLeftTop: new Sprite(
        Assets.dirtCave,
        0, 0,
        32, 32
    ),

    wallLeft: new Sprite(
        Assets.dirtCave,
        0, 32,
        32, 32
    ),

    wallBackgroundTop: new Sprite(
        Assets.dirtCave,
        160, 64,
        32, 32
    ),

    wallBackground: new Sprite(
        Assets.dirtCave,
        96, 64,
        32, 32
    ),

    spikeLone: new Sprite(
        Assets.dirtCave,
        192, 64,
        32, 32
    ),

    spikeLeft: new Sprite(
        Assets.dirtCave,
        160, 32,
        32, 32
    ),

    spikeMiddle: new Sprite(
        Assets.dirtCave,
        192, 32,
        32, 32
    ),

    spikeRight: new Sprite(
        Assets.dirtCave,
        224, 32,
        32, 32
    ),

    playerFall1: new Sprite(
        Assets.playerSprite,
        0, 0,
        32, 32
    ),

    playerFall2: new Sprite(
        Assets.playerSprite,
        32, 0,
        32, 32
    ),

    playerFall3: new Sprite(
        Assets.playerSprite,
        64, 0,
        32, 32
    ),

    playerFall4: new Sprite(
        Assets.playerSprite,
        96, 0,
        32, 32
    ),

    playerDive1: new Sprite(
        Assets.playerSprite,
        0, 32,
        32, 32
    ),

    playerDive2: new Sprite(
        Assets.playerSprite,
        32, 32,
        32, 32
    ),

    playerLeft1: new Sprite(
        Assets.playerSprite,
        0, 64,
        32, 32
    ),

    playerLeft2: new Sprite(
        Assets.playerSprite,
        32, 64,
        32, 32
    ),

    playerRight1: new Sprite(
        Assets.playerSprite,
        64, 64,
        32, 32
    ),

    playerRight2: new Sprite(
        Assets.playerSprite,
        96, 64,
        32, 32
    )

}