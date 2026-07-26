import Entity from "./Entities/Entity.js";
import { Cell, EmptyCell, SpikeCell, SpikeBallCell } from "./Cell.js";
import { getRandomInt } from "../utils/utils.js";

export class Row {
    static ROW_HEIGHT = 50;
    static CELL_SIZE = 50;
    static WIDTH = 10;

    y: number = 0;
    cells: Cell[];
    betweens: Cell[];
    entities: Entity[] = [];

    constructor(cells?: Cell[], betweens?: Cell[]) {
        this.cells = cells ?? Array.from(
            { length: Row.WIDTH }, (_, i) => new EmptyCell(i)
        );
        this.betweens = betweens ?? [];
    }

    setY(y: number) {
        this.y = y;
        this.entities = this.createEntities();
    }

    createEntities(): Entity[] {
        const entities: Entity[] = [];
        this.betweens.forEach((cell, _) => {
            const x = cell.column * Row.CELL_SIZE;
            entities.push(...cell.createEntities(this.y))
        });

        this.cells.forEach((cell, i) => {
            const x = i * Row.CELL_SIZE;
            entities.push(...cell.createEntities(this.y))
        })
        return entities;
    }

    draw(ctx: CanvasRenderingContext2D): void {}
}

export class EmptyRow extends Row {
    constructor() {
        super();
    }
}

export class RandomRow extends Row {

    constructor(chance: number = 0.5) {
        let allSpikes = true;
        const cells: Cell[] = Array.from(
            { length: Row.WIDTH }, (_, i) => {
                const cellType = Math.random() > chance ? SpikeCell : EmptyCell;
                if (cellType instanceof EmptyCell) {
                    allSpikes = false;
                }
                return new cellType(i);
            }
        );

        if (allSpikes) {
            const idx = getRandomInt(0, cells.length-1);
            cells[idx] = new EmptyCell(idx) 
        }

        super(cells);
    }
}

interface GapRowOptions {
    gapStart?: number|null;
    gapWidth?: number|null;
    gapWidthMin?: number;
    gapWidthMax?: number;
}

export class GapRow extends Row {
    constructor({
        gapStart = null, 
        gapWidth = null, 
        gapWidthMin = 1, 
        gapWidthMax = 3
    }: GapRowOptions) {
        gapWidth = gapWidth ?? getRandomInt(gapWidthMin, gapWidthMax);
        gapStart = gapStart ?? getRandomInt(0, Row.WIDTH - gapWidth - 1);
        
        const cells: Cell[] = Array.from(
            { length: Row.WIDTH }, (_, i) => {
                if (i >= gapStart && i < gapStart + gapWidth) {
                    return new EmptyCell(i);
                } else {
                    return new SpikeCell(i);
                }
            }
        );

        super(cells);
    }
}

export class InverseGapRow extends Row {
    constructor({
        gapStart = null, 
        gapWidth = null, 
        gapWidthMin = 1, 
        gapWidthMax = 3
    }: GapRowOptions) {
        gapWidth = gapWidth ?? getRandomInt(gapWidthMin, gapWidthMax);
        gapStart = gapStart ?? getRandomInt(0, Row.WIDTH - gapWidth - 1);
        
        const cells: Cell[] = Array.from(
            { length: Row.WIDTH }, (_, i) => {
                if (i >= gapStart && i < gapStart + gapWidth) {
                    return new SpikeCell(i);
                } else {
                    return new EmptyCell(i);
                }
            }
        );

        super(cells);
    }
}