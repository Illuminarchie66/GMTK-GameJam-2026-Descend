import { Row, EmptyRow, RandomRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve } from "../../utils/utils.js";

interface RandomRowBlockOptions {
    numRows?: number;
    numRowsMin?: number;
    numRowsMax?: number;
    chance?: number;
}

export default class RandomRowBlock extends RowBlock {
    constructor(options: RandomRowBlockOptions = {}) {
        const { numRows, numRowsMin = 4, numRowsMax = 6, chance = 0.5 } = options;
        const count = resolve(numRows, numRowsMin, numRowsMax);
        const rows: Row[] = []
        for (let i = 0; i < count; i++) {
            rows.push(i % 2 === 1 ? new RandomRow(chance) : new EmptyRow());
        }
        super(rows);
    }
}