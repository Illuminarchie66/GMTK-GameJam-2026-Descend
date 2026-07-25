import { Sprite, sprites } from "../rendering/Sprite.js";
import Animation from "../rendering/Animation.js";
import Player from "./Player.js";
import { getRandomInt, getRandomElement, clamp } from "../utils/utils.js";

export const playerAnimations = {

    fall: [
        sprites.playerFall1,
        sprites.playerFall2,
        sprites.playerFall3,
        sprites.playerFall4,
    ],

    left: [
        sprites.playerLeft1,
        sprites.playerLeft2,
    ],

    right: [
        sprites.playerRight1,
        sprites.playerRight2,
    ],

    dive: [
        sprites.playerDive1,
        sprites.playerDive2,
    ]

};

export interface DeathParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
}

export interface WindLine {
    x: number;
    y: number;
    length: number;
    speed: number;
    life: number;
    maxLife: number;
}

export default class PlayerRenderer {
    deathPalette: string[] = ["#9cf4f5", "#ae5430", "#1e74fd", "#fee4b3"]
    deathParticles: DeathParticle[] = [];
    
    windLines: WindLine[] = [];
    windSpawnTimer: number = 0;

    fall = new Animation(playerAnimations.fall, 0.4);
    left = new Animation(playerAnimations.left, 0.3)
    right = new Animation(playerAnimations.right, 0.3)
    dive = new Animation(playerAnimations.dive, 0.1)

    update(dt: number, player: Player) {
        this.fall.update(dt);
        this.left.update(dt);
        this.right.update(dt);
        this.dive.update(dt);

        this.updateWind(dt, player);
        this.updateDeathParticles(dt);
    }

    getCurrentSprite(player: Player): Sprite {
        if (player.isBoosting) {
            return this.dive.getSprite();
        }

        if (player.moveRight && player.moveLeft) {
            return this.fall.getSprite();
        }

        if (player.moveRight) {
            return this.right.getSprite();
        }

        if (player.moveLeft) {
            return this.left.getSprite();
        }

        if (player.moveDown) {
            return this.dive.getSprite();
        }

        return this.fall.getSprite();

    }

    playerExplode(player: Player) {
        this.deathParticles = [];
        const count = getRandomInt(20, 40);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 100 + Math.random() * 50;

            this.deathParticles.push({
                x: player.x + (Math.random() - 0.5) * player.spriteWidth * 0.1,
                y: player.y + (Math.random() - 0.5) * player.spriteHeight * 0.1,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 3,
                color: getRandomElement(this.deathPalette),
                life: 0.5
            })
        }
    }

    updateDeathParticles(dt: number) {
        const gravity = 200;
        const drag = 0.99;

        for (const p of this.deathParticles) {
            p.vy += gravity * dt;
            p.vx *= drag;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
        }

        this.deathParticles = this.deathParticles.filter(p => p.life > 0);
    }

    drawDeath(ctx: CanvasRenderingContext2D, player: Player): void {
        for (const p of this.deathParticles) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.translate(p.x, p.y);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        }
    }

    drawSpawn(ctx: CanvasRenderingContext2D, player: Player): void {
        const sprite = sprites.playerFall1;
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.scale(player.spawnScale, player.spawnScale);
        sprite.draw(
            ctx,
            -player.spriteWidth/2,
            -player.spriteHeight/2,
            player.spriteWidth,
            player.spriteHeight
        );
        ctx.restore();
    }

    updateWind(dt: number, player: Player) {
        for (const w of this.windLines) {
            w.y -= w.speed * dt;
            w.life -= dt / w.maxLife;
        }
        this.windLines = this.windLines.filter(w => w.life > 0);

        if (!player.falling || !player.alive) return;

        const fallRatio = clamp(
            (player.dy - player.fallSpeedUp) / (player.fallSpeedDown - player.fallSpeedUp), 0, 1
        );

        const spawnChance = (0.1 + fallRatio*0.35)*(1 - player.boostIntensity*0.8);

        this.windSpawnTimer -= dt;
        if (this.windSpawnTimer <= 0 && Math.random() < spawnChance) {
            this.windSpawnTimer = 0.03;
            this.windLines.push({
                x: player.x + (Math.random() - 0.5) * player.spriteWidth * 1.6,
                y: player.y - player.spriteHeight /2 - Math.random() * 1,
                length: 10 + fallRatio * 10,
                speed: 200 + fallRatio * 100,
                life: 1,
                maxLife: 0.25 + Math.random() * 0.15
            });
        }
    }

    drawWind(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineCap = "round";
        ctx.lineWidth = 1.5;

        for (const w of this.windLines) {
            ctx.globalAlpha = w.life * 0.6;
            ctx.beginPath();
            ctx.moveTo(w.x, w.y);
            ctx.lineTo(w.x, w.y + w.length);
            ctx.stroke();
        }
        ctx.restore();
    }

    drawTrail(ctx: CanvasRenderingContext2D, player: Player): void {
        if (player.trail.length === 0) return;

        for (let i = 0; i < player.trail.length - 1; i++) {
            const point = player.trail[i];
            if (point.intensity < 0.02) continue;

            const age = i / player.trail.length;
            const alpha = point.intensity * (1 - age) * 0.55;
            if (alpha < 0.01) continue;
            
            const hue = (performance.now() / 4 + i*18) % 360;
            const size = player.spriteWidth * (0.9 - age * 0.5) * (0.4 + point.intensity * 0.4);
            
            ctx.beginPath();
            //ctx.rect(point.x - size / 2, point.y - size / 2, size, size);
            ctx.ellipse(point.x, point.y, size / 2, size / 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${alpha})`;
            ctx.fill();
        }
    }

    draw(ctx: CanvasRenderingContext2D, player: Player) {
        this.drawTrail(ctx, player);
        this.drawWind(ctx);

        const sprite = this.getCurrentSprite(player);

        sprite.draw(
            ctx,
            player.x - player.spriteWidth / 2,
            player.y - player.spriteHeight / 2,
            player.spriteWidth,
            player.spriteHeight
        )

    }
}