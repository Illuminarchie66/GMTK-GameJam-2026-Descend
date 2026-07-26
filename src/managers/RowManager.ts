import { Row } from "../obstacles/Row.js";
import Entity from "../obstacles/Entities/Entity.js";
import RowBlock from "../obstacles/RowBlock.js";
import EmptyRowBlock from "../obstacles/Patterns/EmptyRowBlock.js";
import RandomRowBlock from "../obstacles/Patterns/RandomRowBlock.js";
import RandomGapRowBlock from "../obstacles/Patterns/RandomGapRowBlock.js";
import RandomGapChainRowBlock from "../obstacles/Patterns/RandomGapChainBlockRow.js";
import TunnelRowBlock from "../obstacles/Patterns/TunnelRowBlock.js";
import InsOutsRowBlock from "../obstacles/Patterns/InsOutsRowBlock.js";
import BittyRowBlock from "../obstacles/Patterns/BittyRowBlock.js";
import DiagonalRowBlock from "../obstacles/Patterns/DiagonalRowBlock.js";
import ZigzagRowBlock from "../obstacles/Patterns/ZigzagRowBlock.js";
import MovingSpikeBallRowBlock from "../obstacles/Patterns/MovingSpikeBallRowBlock.js";
import MovingSpikeBallGapRowBlock from "../obstacles/Patterns/MovingSpikeBallGapRowBlock.js";
import SpinningSpikeBallRowBlock from "../obstacles/Patterns/SpinningSpikeBallRowBlock.js";
import AlternatingSpinningSpikeBallRowBlock from "../obstacles/Patterns/AlternatingSpinningSpikeBallRowBlock.js";
import BoosterRowBlock from "../obstacles/Patterns/BoosterRowBlock.js";
import BoosterChainRowBlock from "../obstacles/Patterns/BoosterChainRowBlock.js"
import TestRowBlock from "../obstacles/Patterns/TestRowBlock.js";
import { getRandomInt } from "../utils/utils.js";

import World from "../World.js";

class RowGenerator {
    private currentBlock: RowBlock | null = null;
    first: boolean = true;
    alternate: boolean = false;

    nextRow(): Row {
        while(true) {

            if (this.currentBlock === null) {
                this.currentBlock = this.generateBlock();
            }

            const row = this.currentBlock.nextRow();

            if (row) {
                return row;
            }

            this.currentBlock = null;
        }
    }

    private generateBlock(): RowBlock {

        if (this.first) {
            this.first = false;
            return new EmptyRowBlock({ numRows: 20 });
        }

        if (this.alternate) {
            this.alternate = false;
            return new EmptyRowBlock({ numRowsMin: 5, numRowsMax: 7 });
        } else {
            this.alternate = true
            return new BittyRowBlock( { 
                numObstacleRowsMin: 2,
                numObstacleRowsMax: 5,

                spacingMin: 1,
                spacingMax: 3,
                leadIn: 2,
                leadOut: 2,

            } )
            //return new ZigzagRowBlock({spacing: 0, gapWidthMin: 3});
            //return new RandomGapRowBlock({booster: true, boosterChance: 0.5});
        }
    }
}


export default class RowManager {

    rows: Row[] = [];
    generator: RowGenerator = new RowGenerator();

    maxRows = 25;
    loadDistance = World.GAMEPLAY_HEIGHT + 10*Row.ROW_HEIGHT;
    unloadDistance = 10 * Row.ROW_HEIGHT;

    constructor() {
        let lastY = 0;
        for (let i = 0; i < this.maxRows; i++) {
            const row = this.generator.nextRow();
            row.setY(lastY + Row.ROW_HEIGHT);
            this.rows.push(row);
            lastY = row.y;
        }
    }

    update(cameraY: number): { added: Entity[], removed: Entity[] } {

        let added: Entity[] = [];
        let removed: Entity[] = [];

        while (
            this.rows.length > 0 &&
            this.rows[0].y + Row.ROW_HEIGHT < cameraY - this.unloadDistance
        ) {
            const removedRow = this.rows.shift();

            if (removedRow) {
                removed.push(...removedRow.entities);
            }
        }

        while (
            this.rows.length > 0 &&
            this.rows[this.rows.length - 1].y < cameraY + this.loadDistance
        ) {
            const row = this.generator.nextRow();
            row.setY(this.rows[this.rows.length - 1].y + Row.ROW_HEIGHT);
            this.rows.push(row);
            added.push(...row.entities);
        }

        return { added, removed };
    }


    draw(ctx: CanvasRenderingContext2D): void {
        for (const row of this.rows) {
            row.draw(ctx);
        }
    }
}