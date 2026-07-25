import { Row, EmptyRow, GapRow, InverseGapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";


interface InsOutsRowBlockOptions {
    transitions?: number;
    transitionsMin?: number;
    transitionsMax?: number;
    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;
    gapStart?: number;
    spacingMin?: number;
    spacingMax?: number;
}

export default class InsOutsRowBlock extends RowBlock {
    constructor(options: InsOutsRowBlockOptions = {}) {
        const { 
            transitions, transitionsMin = 2, transitionsMax = 4, 
            gapWidth, gapWidthMin = 3, gapWidthMax = 5, gapStart, 
            spacingMin = 2, spacingMax = 3 
        } = options;
        
        const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
        const start = gapStart ?? getRandomInt(0, Row.WIDTH - width);
        const count = resolve(transitions, transitionsMin, transitionsMax);
        const rows: Row[] = [
            new GapRow({gapStart: start, gapWidth: width})
        ];

        for (let i = 0; i < count; i++) {
            const spacing = getRandomInt(spacingMin, spacingMax);
            for (let j = 0; j < spacing; j++) {
                rows.push(new EmptyRow());
            }

            const RowType = i% 2 === 0 ? GapRow : InverseGapRow;
            rows.push(new RowType({gapStart: start, gapWidth: width}));
        }

        super(rows);
    }   
}