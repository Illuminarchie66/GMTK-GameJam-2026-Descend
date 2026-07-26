import { EmptyCell, SpikeBallCell, Cell} from "../Cell.js";
import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomElement } from "../../utils/utils.js";

interface MovingSpikeBallGapRowBlockOptions {
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

    spikeballIndex?: number;
    spikeballSpeed?: number;
    spikeballDirection?: number;
    spikeballSpeedMin?: number;
    spikeballSpeedMax?: number;
}

export default class MovingSpikeBallGapRowBlock extends RowBlock {
    constructor(options: MovingSpikeBallGapRowBlockOptions = {}) {
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

            spikeballIndex,
            spikeballSpeed,
            spikeballDirection,
            spikeballSpeedMin = 100,
            spikeballSpeedMax = 300
        } = options;
        
        const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax);

        const rows: Row[] = [];

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        for (let i=0; i<count; i++) {
            const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
            const leftIdx = resolve(spikeballIndex, 0, Row.WIDTH - width);
            const rightIdx = leftIdx + width;
            let cells: Cell[] = new GapRow({gapStart: leftIdx, gapWidth: width}).cells;

            const speed = resolve(spikeballSpeed, spikeballSpeedMin, spikeballSpeedMax);
            const spikeBallIdx = getRandomElement([leftIdx, rightIdx]);
            const direction = spikeballDirection ?? getRandomElement([-1, 1]);
            cells[spikeBallIdx] = new SpikeBallCell({
                column: spikeBallIdx, 
                speed: speed, 
                direction: direction, 
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