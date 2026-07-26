import { BoosterCell } from "../Cell.js";
import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt, getRandomElement } from "../../utils/utils.js";

interface BoosterRowBlockOptions {
    numObstacleRows?: number;
    numObstacleRowsMin?: number;
    numObstacleRowsMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;

    possiblePos?: number[];
}

export default class BoosterRowBlock extends RowBlock {
    constructor(options: BoosterRowBlockOptions = {}) {
        const {
            numObstacleRows,
            numObstacleRowsMin = 1,
            numObstacleRowsMax = 1,

            spacing,
            spacingMin = 6,
            spacingMax = 12,
            leadIn = 2,
            leadOut = 2,

            possiblePos = [2.25, 4.5, 6.75]

        } = options;
        const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax);

        const rows: Row[] = [];

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        for (let i=0; i< count; i++) {

            const row = new EmptyRow();
            row.betweens.push(new BoosterCell({column: getRandomElement(possiblePos)}));
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