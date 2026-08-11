import Player from "./player/Player";
import Camera from "./Camera";
import RowManager from "./managers/RowManager";
import InputManager from "./managers/InputManager";
import { Action } from "./managers/InputManager";
import Entity from "./obstacles/Entities/Entity";
import WallRenderer from "./rendering/WallRenderer";
import { GameState, GameDetails } from "./Game";
import { WindLine } from "./player/PlayerRenderer";

interface WorldConfig {
    camera: Camera;
    inputs: InputManager;
    gameDetails: GameDetails;
}

export default class World {
    static WORLD_DEPTH: number = 100000;
    static GAMEPLAY_WIDTH: number = 500;
    static GAMEPLAY_HEIGHT: number = 1000;
    static WALL_WIDTH: number = 32;

    rows: RowManager;
    entities: Entity[] = [];
    
    player: Player;
    targetY: number = 0;

    camera: Camera;
    inputs: InputManager;
    gameDetails: GameDetails;
    
    deathTimer: number = 0;

    resetTimer: number = 0;
    resetDuration: number = 1.5;
    resetStartY: number = 0;
    
    colliderDebug: boolean = false;
    
    constructor({camera, inputs, gameDetails}: WorldConfig) {
        this.camera = camera;
        this.inputs = inputs;
        this.gameDetails = gameDetails;

        this.rows = new RowManager(this.gameDetails);

        for (const row of this.rows.rows) {
            this.entities.push(...row.entities);
        }

        this.player = new Player({
            inputs: this.inputs,
            x: World.GAMEPLAY_WIDTH / 2
        });
        this.gameDetails.numBlocks = 0;

    }

    startSpawning() {
        this.gameDetails.state = GameState.Starting;
        this.player.startSpawn();
    }

    startRun() {
        this.gameDetails.state = GameState.Playing;
        this.player.spawned = true;
        this.player.launch();
    }

    startDeath() {
        this.gameDetails.state = GameState.Dying;
        this.deathTimer = 0;
        this.player.falling = false;
    }

    startReset() {
        this.gameDetails.state = GameState.Resetting;
        this.gameDetails.highScore = Math.max(this.gameDetails.highScore ?? 0, this.gameDetails.currentScore ?? 0);
        this.resetStartY = this.camera.y;
        this.resetTimer = 0;
    }

    reset() {
        this.entities = [];

        this.rows = new RowManager(this.gameDetails);
        for (const row of this.rows.rows) {
            this.entities.push(...row.entities);
        }

        this.player.reset(World.GAMEPLAY_WIDTH / 2);
        this.gameDetails.numBlocks = 0;
    }

    update(dt: number): void {
        switch(this.gameDetails.state) {
            case GameState.Ready:
                this.updateReady(dt);
                break;

            case GameState.Starting:
                this.updateStarting(dt);
                break;

            case GameState.Playing:
                this.updatePlaying(dt);
                break;

            case GameState.Dying:
                this.updateDying(dt);
                break;

            case GameState.Resetting:
                this.updateResetting(dt);
                break;
        }
    }

    updateReady(dt: number): void {
        if (this.inputs.isHeld(Action.Interact)) {
            this.startSpawning();
        }
    }

    updateStarting(dt: number): void {
        this.gameDetails.currentScore = 0;
        this.player.update(dt);
        if (this.player.spawnScale >= 1) {
            this.startRun();
        }
    }

    updatePlaying(dt: number): void {
        this.player.update(dt);
        for (const entity of this.entities) {
            entity.update(dt);
        }

        this.camera.update(dt, this.player.y);
        const { added, removed } =  this.rows.update(this.camera.y);
        this.entities.push(...added);
        if (removed.length > 0) {
            const r = new Set(removed);
            this.entities = this.entities.filter(e => !r.has(e));
        }

        this.gameDetails.currentScore = Math.floor(this.player.y);

        this.checkCollisions();
    }

    updateDying(dt: number): void {
        this.player.update(dt);
        if (this.player.deathScale <= 0) {
            this.startReset();
        }
    }

    updateResetting(dt: number): void {
        this.resetTimer += dt;

        const t = Math.min(1, this.resetTimer / this.resetDuration);
        this.camera.y = this.resetStartY * (1 - t*t*t);

        if (t >= 1) {
            this.reset();
            this.gameDetails.state = GameState.Ready;
        }
    }

    checkCollisions(): void {

        if(!this.player.spawned)
            return;

        if(!this.player.alive)
            return;

        for (const entity of this.entities) {
            const collider = entity.getCollider();

            if (!collider)
                continue;

            if (this.player.collider.overlaps(collider)) {
                entity.onPlayerCollision(this.player);

                if (!this.player.alive)
                    this.startDeath();
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.rows.draw(ctx);

        for (const entity of this.entities) {
            entity.draw(ctx);
        }

        this.player.draw(ctx);

        for (const entity of this.entities) {
            entity.postPlayerDraw(ctx);
        }
    
        if (this.colliderDebug) {
            for (const entity of this.entities) {
                const collider = entity.getCollider();
                if (collider) {
                    collider.draw(ctx);
                }
            }

            this.player.collider.draw(ctx);
        }
    }
}
