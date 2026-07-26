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

    numObstacleRows?: number;
    numObstacleRowsMin?: number;
    numObstacleRowsMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;
}

export default class BittyRowBlock extends RowBlock {
    constructor(options: BittyRowBlockOptions = {}) {
        const {
            numObstacleRows,
            numObstacleRowsMin = 1,
            numObstacleRowsMax = 1,

            spacing,
            spacingMin = 1,
            spacingMax = 1,
            leadIn = 2,
            leadOut = 2,
        } = options;

        const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax);
        
        const rows: Row[] = [];
        let flip = getRandomInt(0, 1);

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        const space = resolve(spacing, spacingMin, spacingMax);

        for (let i = 0; i < count; i++) {
            const cells: Cell[] = [];
            for (let i=0; i< Row.WIDTH; i++) {
                cells.push((i%2) === flip ? new EmptyCell(i) : new SpikeCell(i));
            }
            rows.push(new Row(cells));
            flip = 1 - flip;

            if (i < count - 1) {
                for (let j=0; j<space; j++) {
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
