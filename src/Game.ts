import InputManager from "./managers/InputManager.js";
import Player from "./player/Player.js";
import Camera from "./Camera.js";
import RowManager from "./managers/RowManager.js";
import World from "./World.js";
import Renderer from "./rendering/Renderer.js";
import WallRenderer from "./rendering/WallRenderer.js";
import BackgroundRenderer from "./rendering/BackgroundRenderer.js";
import Bar from "./ui/Bar.js";
import WorldText from "./ui/WorldText.js";
import { sprites, TintedSpriteCache } from "./rendering/Sprite.js";
import { Action } from "./managers/InputManager.js";

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
    numBlocks?: number;
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
    uiWidth: number;

    renderer: Renderer;
    gameDetails: GameDetails = {
        state: GameState.Ready
    };

    worldText: WorldText;
    hud: Bar;
    paused: boolean = false;

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

        this.renderer = new Renderer({
            gameDetails: this.gameDetails,
        });
        this.worldText = new WorldText({
            canvas: this.canvas,
            gameDetails: this.gameDetails
        });
        this.hud = new Bar({
            canvas: this.canvas,
            gameDetails: this.gameDetails,
            camera: this.camera
        });

        this.viewWidth = World.GAMEPLAY_WIDTH + 2 * World.WALL_WIDTH;
        this.uiWidth = Bar.HUD_WIDTH;

        this.scale = (canvas.width - this.uiWidth) / this.viewWidth;
        this.viewHeight = canvas.height / this.scale;

    }

    resize() {
        this.scale = (this.canvas.width - this.uiWidth) / this.viewWidth;
        this.viewHeight = this.canvas.height / this.scale;
    }

    update(dt: number): void {
        this.inputs.update();
        this.world.update(dt);
        this.renderer.update(this.camera.y);
        this.hud.update(dt);
    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const gameplayPixelWidth = this.canvas.width - this.uiWidth;

        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.rect(0, 0, gameplayPixelWidth, this.canvas.height);
        this.ctx.clip();

        this.ctx.scale(this.scale, this.scale);
        this.ctx.translate(World.WALL_WIDTH, -this.camera.y);

        this.renderer.drawBackground(this.ctx, this.camera.y);
        this.world.draw(this.ctx);
        this.renderer.draw(this.ctx, this.camera.y);
        this.worldText.draw(this.ctx);

        this.ctx.restore();

        this.hud.draw(this.ctx);
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