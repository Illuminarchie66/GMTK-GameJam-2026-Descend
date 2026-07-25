import { BoosterCell } from "../Cell.js";
import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";

interface RandomGapRowBlockOptions {
    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;
    leadIn?: number;
    leadOut?: number;
}

export default class RandomGapRowBlock extends RowBlock {
    constructor(options: RandomGapRowBlockOptions = {}) {
        const { gapWidth, gapWidthMin = 2, gapWidthMax = 4, leadIn = 2, leadOut = 2 } = options;
        const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
        const idx = getRandomInt(0, Row.WIDTH - width - 1);
        const rows: Row[] = [];
        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow());
        }
        const row = new GapRow({ gapStart: idx, gapWidth: width });
        if (Math.random() < 0.5) {
            const boosterColumn = idx + width * 0.5 - 0.5;
            row.betweens.push(new BoosterCell({ column: boosterColumn }));
        }
        rows.push(row);
        
        for (let i = 0; i < leadOut; i++) {
            rows.push(new EmptyRow());
        }
        super(rows);
    }
}