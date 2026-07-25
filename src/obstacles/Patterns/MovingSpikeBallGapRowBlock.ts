import { EmptyCell, SpikeBallCell, Cell} from "../Cell.js";
import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomElement } from "../../utils/utils.js";

interface MovingSpikeBallGapRowBlockOptions {
    startIndex?: number;
    numBallRows?: number;
    numBallRowsMin?: number;
    numBallRowsMax?: number;
    spikeballSpeed?: number;
    spikeballSpeedMin?: number;
    spikeballSpeedMax?: number;
    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;
}

export default class MovingSpikeBallGapRowBlock extends RowBlock {
    constructor(options: MovingSpikeBallGapRowBlockOptions = {}) {
        const {
            startIndex, 
            numBallRows, numBallRowsMin = 2, numBallRowsMax = 5, 
            spikeballSpeed, spikeballSpeedMin = 100, spikeballSpeedMax = 300,
            spacing, spacingMin = 2, spacingMax = 3,
            gapWidth, gapWidthMin = 2, gapWidthMax = 4,
        } = options;
        
        const count = resolve(numBallRows, numBallRowsMin, numBallRowsMax);

        const rows: Row[] = [];
        for (let i=0; i<count; i++) {
            const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
            const leftIdx = resolve(startIndex, 0, Row.WIDTH - width);
            const rightIdx = leftIdx + width;
            let cells: Cell[] = new GapRow({gapStart: leftIdx, gapWidth: width}).cells;

            const speed = resolve(spikeballSpeed, spikeballSpeedMin, spikeballSpeedMax);
            const spikeBallIdx = getRandomElement([leftIdx, rightIdx]);
            cells[spikeBallIdx] = new SpikeBallCell({
                column: spikeBallIdx, 
                speed: speed, 
                direction: 1, 
                leftEnd: leftIdx * Row.CELL_SIZE, 
                rightEnd: rightIdx * Row.CELL_SIZE
            });
            
            rows.push(new Row(cells));

            const space = resolve(spacing, spacingMin, spacingMax);
            for (let i=0; i<space; i++) {
                rows.push(new EmptyRow());
            }
        }

        super(rows);
    }
}