import { BoosterCell } from "../Cell.js";
import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";

interface RandomGapRowBlockOptions {
    numObstacleRows?: number;
    numObstacleRowsMin?: number;
    numObstacleRowsMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;

    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;

    booster?: boolean;
    boosterChance?: number;
    boosterImpulse?: number;
    boosterMultiplier?: number;
}

export default class RandomGapRowBlock extends RowBlock {
    constructor(options: RandomGapRowBlockOptions = {}) {
        const {
            numObstacleRows,
            numObstacleRowsMin = 1,
            numObstacleRowsMax = 1,

            spacing,
            spacingMin = 1,
            spacingMax = 1,
            leadIn = 2,
            leadOut = 2,

            gapWidth,
            gapWidthMin = 2,
            gapWidthMax = 4,

            booster = false,
            boosterChance = 0.5,
            boosterImpulse = 450,
            boosterMultiplier = 1.5
            

        } = options;
        const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax);

        const rows: Row[] = [];

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        for (let i=0; i< count; i++) {
            const width = resolve(gapWidth, gapWidthMin, gapWidthMax);

            const idx = getRandomInt(0, Row.WIDTH - width - 1);
            const row = new GapRow({ gapStart: idx, gapWidth: width });
            if (booster && Math.random() < boosterChance) {
                const boosterColumn = idx + width * 0.5 - 0.5;
                row.betweens.push(new BoosterCell({ column: boosterColumn, impulse: boosterImpulse, multiplier: boosterMultiplier }));
            }
            rows.push(row);

            if (i < count - 1) {
                const space = resolve(spacing, spacingMin, spacingMax);
                for (let j = 0; j < space; j++) {
                    rows.push(new EmptyRow());
                }
            }
        }

        for (let i = 0; i < leadOut; i++) {
            rows.push(new EmptyRow())
        }

        super(rows);
    }
}