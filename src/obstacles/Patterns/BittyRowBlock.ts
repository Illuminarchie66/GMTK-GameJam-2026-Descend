import { EmptyCell, SpikeCell, Cell} from "../Cell.js";
import { Row, EmptyRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";

interface BittyRowBlockOptions {
    patternCount?: number;
    patternCountMin?: number;
    patternCountMax?: number;
    patternLength?: number;
    patternLengthMin?: number;
    patternLengthMax?: number;
    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
}

export default class BittyRowBlock extends RowBlock {
    constructor(options: BittyRowBlockOptions = {}) {
        const {
            patternCount, patternCountMin = 2, patternCountMax = 6,
            patternLength, patternLengthMin = 1, patternLengthMax = 1,
            spacing, spacingMin = 2, spacingMax = 3
        } = options;

        const count = resolve(patternCount, patternCountMin, patternCountMax);
        const rows: Row[] = [];
        let flip = getRandomInt(0, 1);

        for (let p = 0; p < count; p++) {
            const length = resolve(patternLength, patternLengthMin, patternLengthMax);
            const cells: Cell[] = [];
            for (let i=0; i< Row.WIDTH; i++) {
                cells.push((i%2) === flip ? new EmptyCell(i) : new SpikeCell(i));
            }
            rows.push(new Row(cells));
            flip = 1 - flip;

            const gap = resolve(spacing, spacingMin, spacingMax);
            
            for (let g=0; g<gap; g++) {
                rows.push(new EmptyRow());
            }
        }

        super(rows);
    }

}
