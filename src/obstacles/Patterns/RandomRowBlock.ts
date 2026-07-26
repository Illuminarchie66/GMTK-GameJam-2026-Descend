import { Row, EmptyRow, RandomRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve } from "../../utils/utils.js";

interface RandomRowBlockOptions {
    numObstacleRows?: number;
    numObstacleRowsMin?: number;
    numObstacleRowsMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;

    chance?: number;
}

export default class RandomRowBlock extends RowBlock {
    constructor(options: RandomRowBlockOptions = {}) {
        const {
            numObstacleRows,
            numObstacleRowsMin = 2,
            numObstacleRowsMax = 4,

            spacing,
            spacingMin = 1,
            spacingMax = 2,
            leadIn = 0,
            leadOut = 0,

            chance = 0.5
        } = options;
        const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax);
        const rows: Row[] = []

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        for (let i = 0; i< count; i++) {
            rows.push(new RandomRow(chance));

            if (i < count - 1) {
                const space = resolve(spacing, spacingMin, spacingMax)
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