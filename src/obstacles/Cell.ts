import { Row } from "./Row.js";
import Entity from "./Entities/Entity.js";
import Spike from "./Entities/Spike.js";
import { SpikeBall, HorizontalMoveSpikeBall, PivotSpikeBall } from "./Entities/SpikeBall.js";
import Booster from "./Entities/Booster.js";
import World from "../World.js";

export class Cell {
    column: number;

    constructor(column: number) {
        this.column = column;
    }

    createEntities(y:number): Entity[] {
        return [];
    }

}

export class EmptyCell extends Cell {}

export class SpikeCell extends Cell {

    override createEntities(y: number): Entity[] {
        const x = this.column * Row.CELL_SIZE;
        return [
            new Spike(x, y, Row.CELL_SIZE, Row.ROW_HEIGHT)
        ];
    }

}

interface SpikeBallCellOptions {
    column: number;
    speed?: number;
    direction?: number;
    leftEnd?: number;
    rightEnd?: number;
}

export class SpikeBallCell extends Cell {
    speed: number;
    direction: number;
    leftEnd: number;
    rightEnd: number;

    constructor({
        column, 
        speed = 150, 
        direction = 1, 
        leftEnd = 0, 
        rightEnd = World.GAMEPLAY_WIDTH
    }: SpikeBallCellOptions) {
        super(column);
        this.speed = speed;
        this.direction = direction;
        this.leftEnd = leftEnd;
        this.rightEnd = rightEnd;
    }

    override createEntities(y: number): Entity[] {
        const x = this.column * Row.CELL_SIZE + Row.CELL_SIZE / 2;
        const radius = Row.CELL_SIZE / 2;
        return [
            new HorizontalMoveSpikeBall(x, y + Row.ROW_HEIGHT / 2, radius, this.speed, this.direction, this.leftEnd, this.rightEnd)
        ];
    }
}

interface PivotSpikeBallCellOptions {
    column: number;
    speed?: number;
    pivotRadius?: number;
    direction?: number;
    angle?: number;
}

export class SpinningSpikeBallCell extends Cell {
    speed: number;
    pivotRadius: number;
    direction: number;
    angle: number;

    constructor({
        column, 
        speed = 5, 
        pivotRadius = Row.CELL_SIZE * 2, 
        direction = 1, 
        angle = 0
    }: PivotSpikeBallCellOptions) {
        super(column);
        this.speed = speed;
        this.pivotRadius = pivotRadius;
        this.direction = direction;
        this.angle = angle;
    }

    override createEntities(y: number): Entity[] {
        const x = this.column * Row.CELL_SIZE + Row.CELL_SIZE / 2;
        const radius = Row.CELL_SIZE / 2;
        return [
            new PivotSpikeBall(x, y + Row.ROW_HEIGHT / 2, radius, this.speed, this.pivotRadius, this.direction, this.angle)
        ];
    }
}

interface BoosterCellOptions {
    column: number;
    width?: number;
    impulse?: number;
    multiplier?: number;
}

export class BoosterCell extends Cell {
    width: number;
    impulse: number;
    multiplier: number;

    constructor({
        column, 
        width = Row.CELL_SIZE * 1.5, 
        impulse = 450, 
        multiplier = 1.5
    }: BoosterCellOptions) {
        super(column);
        this.width = width;
        this.impulse = impulse;
        this.multiplier = multiplier;
    }

    override createEntities(y: number): Entity[] {
        const x = this.column * Row.CELL_SIZE + Row.CELL_SIZE / 2;
        return [
            new Booster(x, y + Row.ROW_HEIGHT / 2, this.width, this.impulse, this.multiplier)
        ];
    }
}