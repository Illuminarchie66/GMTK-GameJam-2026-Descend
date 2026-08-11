import InputManager from "../managers/InputManager.js";
import { Action } from "../managers/InputManager.js";
import BoxCollider from "../colliders/BoxCollider.js";
import { Transform } from "../Transform.js";
import { clamp } from "../utils/utils.js";
import World from "../World.js";
import { sprites } from "../rendering/Sprite.js"
import PlayerRenderer from "./PlayerRenderer.js";

interface PlayerOptions {
    inputs: InputManager;
    x: number;
}

interface TrailPoint {
    x: number;
    y: number;
    intensity: number;
}

interface BoostOptions {
    impulse?: number;
    multiplier?: number;
}

export default class Player implements Transform {
    private inputs: InputManager;
    renderer: PlayerRenderer = new PlayerRenderer();

    x: number;
    y: number;
    collider: BoxCollider;
    dx: number = 0;
    dy: number = 200;

    falling = false;
    alive = true;
    spawned = false;

    moveLeft = false;
    moveRight = false;
    moveUp = false;
    moveDown = false;
    
    horizontalSpeed: number = 250;
    colliderWidth: number = 25;
    colliderHeight: number = 25;
    spriteWidth: number = 50;
    spriteHeight: number = 50;

    fallSpeed: number = 200;
    fallSpeedDown: number = 400;
    fallSpeedUp: number = 100;

    boostImpulseStrength: number = 450;
    boostImpulseDecay: number = 4;
    boostImpulseMax: number = 900;

    boostPeakMultiplier: number = 1.5;
    boostMultiplierDecay: number = 2.2;
    boostMultiplierMax: number = 3;

    boostImpulse: number = 0;
    speedMultiplier: number = 1;

    trail: TrailPoint[] = [];
    maxTrailLength: number = 20;

    spawnScale = 0;
    spawnTimer = 0;
    spawnDuration = 0.5;

    deathScale = 1;
    deathTimer = 0;
    deathDuration = 0.5;

    spawnDepth: number = 160;

    noKill: boolean = true;

    constructor({ inputs, x }: PlayerOptions) {
        this.inputs = inputs;
        this.x = x;
        this.y = this.spawnDepth;
        this.collider = new BoxCollider(this, 0, 0, this.colliderWidth, this.colliderHeight);
    }

    reset(x:number) {

        this.x = x;
        this.y = this.spawnDepth;

        this.dx = 0;
        this.dy = 200;

        this.falling = false;

        this.alive = true;

        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;

        this.spawned = false;
        this.spawnTimer = 0;
        this.spawnScale = 0;

        this.deathScale = 1;

        this.boostImpulse = 0;
        this.speedMultiplier = 1;
        this.trail = [];
    }

    kill() {
        if (this.noKill) return;
        this.startDeath();
    }

    boost(options: BoostOptions = {}) {
        const impulse = options.impulse ?? this.boostImpulseStrength;
        const multiplier = options.multiplier ?? this.boostPeakMultiplier;
        this.boostImpulse = Math.min(this.boostImpulse + impulse, this.boostImpulseMax);
        this.speedMultiplier = Math.min(
            Math.max(this.speedMultiplier, 1) + (multiplier - 1),
            this.boostMultiplierMax
        );
    }

    get isBoosting(): boolean {
        return this.boostImpulse > 1 || this.speedMultiplier > 1.02;
    }

    get boostIntensity(): number {
        const impulseFactor = this.boostImpulse / this.boostImpulseStrength;
        const multiplierFactor = (this.speedMultiplier - 1) / (this.boostPeakMultiplier - 1);
        return Math.min(1, Math.max(impulseFactor, multiplierFactor));
    }

    launch() {
        this.startFalling();
        this.boost({
            impulse: this.boostImpulseStrength * 2,
            multiplier: this.boostPeakMultiplier
        });
    }

    startSpawn() {
        this.spawnTimer = 0;
        this.spawnScale = 0;
        this.spawned = false;
        this.alive = true;
    }

    startFalling() {
        this.falling = true;
    }

    startDeath() {
        this.alive = false;
        this.falling = false;
        this.dx = 0;
        this.dy = 0;

        this.deathTimer = 0;
        this.renderer.playerExplode(this);
    }

    updateSpawn(dt:number) {

        this.spawnTimer += dt;

        const progress =
            this.spawnTimer / this.spawnDuration;

        this.spawnScale = Math.min(1, progress);

        if(this.spawnScale >= 1) {
            this.spawned = true;
        }
    }

    updateFalling(dt: number) {

        if (this.inputs.isHeld(Action.MoveRight)) {
            this.moveRight = true;
        } else {
            this.moveRight = false;
        }
        
        if (this.inputs.isHeld(Action.MoveLeft)) {
            this.moveLeft = true;
        } else {
            this.moveLeft = false;
        }

        if (this.inputs.isHeld(Action.MoveUp)) {
            this.moveUp = true;
        } else {
            this.moveUp = false;
        }

        if (this.inputs.isHeld(Action.MoveDown)) {
            this.moveDown = true;
        } else {
            this.moveDown = false;
        }
        
        if (this.moveRight && this.moveLeft) {
            this.dx = 0;
        } else if (this.moveRight) {
            this.dx = this.horizontalSpeed;
        } else if (this.moveLeft) {
            this.dx = -this.horizontalSpeed;
        }

        let targetDy = this.fallSpeed;
        if (this.moveDown) {
            targetDy = this.fallSpeedDown;
        } else if (this.moveUp) {
            targetDy = this.fallSpeedUp;
        }

        this.dy = targetDy * this.speedMultiplier + this.boostImpulse;

        this.x += this.dx * dt * Math.pow(this.speedMultiplier, 1.2);
        this.x = clamp(this.x, this.colliderWidth/2, World.GAMEPLAY_WIDTH - this.colliderWidth/2);
        this.y += this.dy * dt;

        this.boostImpulse -= this.boostImpulse * this.boostImpulseDecay * dt;
        if (this.boostImpulse < 2)
            this.boostImpulse = 0;

        this.speedMultiplier += (1 - this.speedMultiplier) * this.boostMultiplierDecay * dt;
        if (Math.abs(this.speedMultiplier - 1) < 0.01)
            this.speedMultiplier = 1;

        this.updateTrail();

        this.dx = 0;
    }

    updateTrail() {
        this.trail.unshift({ x: this.x, y: this.y, intensity: this.boostIntensity });
        if (this.trail.length > this.maxTrailLength) {
            this.trail.pop();
        }
    }

    updateDeath(dt: number) {
        this.deathTimer += dt;
        const progress = this.deathTimer / this.deathDuration;
        this.deathScale = Math.max(0, 1 - progress);
    }

    update(dt: number): void {
        this.renderer.update(dt, this);

        if (!this.spawned) {
            this.updateSpawn(dt);
            return;
        }

        if (!this.alive) {
            this.updateDeath(dt);
            return;
        }

        if (this.falling) {
            this.updateFalling(dt);
        }
    }


    draw(ctx: CanvasRenderingContext2D): void {
        console.log

        if(!this.spawned) {
            this.renderer.drawSpawn(ctx, this);
            return;
        }

        if(!this.alive) {
            this.renderer.drawDeath(ctx, this);
            return;
        }

        this.renderer.draw(ctx, this);

    }

}