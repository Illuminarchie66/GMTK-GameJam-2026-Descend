import { Row, EmptyRow, GapRow, InverseGapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";


interface InsOutsRowBlockOptions {
    numObstacleRows?: number;
    numObstacleRowsMin?: number;
    numObstacleRowsMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;

    gapStart?: number;
    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;
}

export default class InsOutsRowBlock extends RowBlock {
    constructor(options: InsOutsRowBlockOptions = {}) {
        const { 
            numObstacleRows,
            numObstacleRowsMin = 1,
            numObstacleRowsMax = 1,

            spacing,
            spacingMin = 1,
            spacingMax = 1,
            leadIn = 2,
            leadOut = 2,

            gapStart,
            gapWidth,
            gapWidthMin = 2,
            gapWidthMax = 4,

        } = options;
        const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax);
        const width = resolve(gapWidth, gapWidthMin, gapWidthMax);

        const rows: Row[] = [];

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        let flip = getRandomInt(0, 1);

        for (let i=0; i<count; i++) {
            const start = resolve(gapStart, 0, Row.WIDTH - width - 1);
            const RowType = flip === 0 ? GapRow : InverseGapRow;
            rows.push(new RowType({gapStart: start, gapWidth: width}));
            flip = 1 - flip;

            if (i < count - 1) {
                const space = resolve(spacing, spacingMin, spacingMax);
                for (let j=0; j<space; j++) {
                    rows.push(new EmptyRow())
                }
            }
        }

        for (let i = 0; i < leadOut; i++) {
            rows.push(new EmptyRow())
        }

        super(rows);
    }   
}