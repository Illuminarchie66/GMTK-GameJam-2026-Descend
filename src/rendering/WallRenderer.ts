import { Sprite, TintedSpriteCache, TILE_SIZE, sprites } from "./Sprite.js";
import { GameDetails, GameState } from "../Game.js";
import { pingPong } from "../utils/utils.js";

interface WallLayer {
    tileSize: number;

    top: number;
    bottom: number;

    update(cameraY: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    reset(): void;
}

export default class WallRenderer {

    layers: WallLayer[];
    gameDetails: GameDetails;
    spriteCache: TintedSpriteCache;


    constructor(gameDetails: GameDetails, spriteCache: TintedSpriteCache) {
        this.gameDetails = gameDetails;
        this.spriteCache = spriteCache;

        this.layers = [
            new BackgroundWallLayer(this.spriteCache),
            new SideWallLayer()
        ];
    }


    update(cameraY: number) {
        if (this.gameDetails.state === GameState.Ready) {
            this.reset();
            return;
        }

        for (const layer of this.layers) {
            layer.update(cameraY);
        }
    }


    drawBackground(ctx: CanvasRenderingContext2D) {
        this.layers[0].draw(ctx);
    }


    draw(ctx: CanvasRenderingContext2D) {
        this.layers[1].draw(ctx);
    }

    reset() {
        for (const layer of this.layers) {
            layer.reset();
        }
    }

}

class BackgroundWallLayer implements WallLayer {

    spriteCache: TintedSpriteCache;

    tileSize = 32;
    top = 0;
    bottom = 0;
    buffer = 2;
    numTiles = 50;
    startDepth = 16;

    constructor(spriteCache: TintedSpriteCache) {
        this.bottom = this.top + this.numTiles;
        this.spriteCache = spriteCache;
    }


    update(cameraY:number){
        this.top = Math.floor(cameraY / this.tileSize) - this.buffer;
        this.bottom = this.top + this.numTiles;
    }


    draw(ctx:CanvasRenderingContext2D){

        for(let y=this.top; y<this.bottom; y++){
            if (y === this.startDepth) {
                for(let x=-1; x<20; x++){
                    sprites.wallBackgroundTop.draw(
                        ctx,
                        x*this.tileSize,
                        y*this.tileSize,
                        this.tileSize+1,
                        this.tileSize+1
                    );
                }
            } else if (y > this.startDepth) {

                for(let x=-1; x<20; x++){
                    
                    const depth = pingPong(
                        Math.floor((y - this.startDepth) * 0.1),
                        this.spriteCache.length
                    );

                    const tile = this.spriteCache.get(depth);

                    ctx.drawImage(
                        tile,
                        x*this.tileSize,
                        y*this.tileSize,
                        this.tileSize+1,
                        this.tileSize+1
                    );
                    
                }

            }
        }

        
    }

    reset() {
        this.top = 0;
        this.bottom = this.top + this.numTiles;
    }
}

class SideWallLayer implements WallLayer {

    tileSize = TILE_SIZE;
    top = 0;
    bottom = 0;
    buffer = 5;
    numTiles = 50;
    startDepth = 15;

    constructor(){
        this.bottom = this.top + this.numTiles;
    }

    update(cameraY:number){
        this.top = Math.floor(cameraY / this.tileSize) - this.buffer;
        this.bottom = this.top + this.numTiles;
    }


    draw(ctx:CanvasRenderingContext2D){
        
        for(let y=this.top; y<this.bottom; y++){
            
            if (y === this.startDepth) {
                sprites.wallLeftTop.draw(
                    ctx,
                    500,
                    y*this.tileSize,
                    this.tileSize+1,
                    this.tileSize+1
                );

                sprites.wallRightTop.draw(
                    ctx,
                    -32,
                    y*this.tileSize,
                    this.tileSize+1,
                    this.tileSize+1
                );
            } else if (y > this.startDepth) {
                sprites.wallLeft.draw(
                    ctx,
                    500,
                    y*this.tileSize,
                    this.tileSize+1,
                    this.tileSize+1
                );

                sprites.wallRight.draw(
                    ctx,
                    -32,
                    y*this.tileSize,
                    this.tileSize+1,
                    this.tileSize+1
                );
            }
        }
    }

    reset() {
        this.top = 0;
        this.bottom = this.top + this.numTiles;
    }
}
