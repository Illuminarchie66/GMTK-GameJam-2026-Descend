import InputManager from "./managers/InputManager.js";
import Player from "./player/Player.js";
import Camera from "./Camera.js";
import RowManager from "./managers/RowManager.js";
import World from "./World.js";
import Renderer from "./rendering/Renderer.js";
import WallRenderer from "./rendering/WallRenderer.js";
import BackgroundRenderer from "./rendering/BackgroundRenderer.js";
import HUD from "./ui/HUD.js";
import { sprites, TintedSpriteCache } from "./rendering/Sprite.js";

export enum GameState {
    Ready,
    Starting,
    Playing,
    Dying,
    Resetting
}

export interface GameDetails {
    state: GameState;
    highScore?: number;
    currentScore?: number;
}

export default class Game {
    private lastTimestamp: number | null = null;

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    inputs: InputManager;
    camera: Camera;
    world: World;

    scale: number;
    viewWidth: number;
    viewHeight: number;

    renderer: Renderer;
    gameDetails: GameDetails = {
        state: GameState.Ready
    };

    hud: HUD;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.ctx.imageSmoothingEnabled = false;

        this.inputs = new InputManager();

        this.camera = new Camera();

        this.world = new World({
            camera: this.camera,
            inputs: this.inputs,
            gameDetails: this.gameDetails
        });

        this.viewWidth = World.GAMEPLAY_WIDTH + 2 * World.WALL_WIDTH;
        this.scale = canvas.width / this.viewWidth;
        this.viewHeight = canvas.height / this.scale;

        this.renderer = new Renderer({
            gameDetails: this.gameDetails,
        });
        this.hud = new HUD({
            canvas: this.canvas,
            gameDetails: this.gameDetails
        });

    }

    update(dt: number): void {
        this.inputs.update();
        this.world.update(dt);
        this.renderer.update(this.camera.y);
    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.scale(this.scale, this.scale);
        this.ctx.translate(World.WALL_WIDTH, -this.camera.y);

        this.renderer.drawBackground(this.ctx, this.camera.y);
        this.world.draw(this.ctx);
        this.renderer.draw(this.ctx, this.camera.y);

        this.hud.draw(this.ctx);

        this.ctx.restore();
    }

    gameLoop(timestamp: number): void {
        if (this.lastTimestamp === null)
            this.lastTimestamp = timestamp;

        const dt = (timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        this.update(dt);
        this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    start(): void {
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}