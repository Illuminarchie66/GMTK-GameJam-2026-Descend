import { EmptyCell, SpinningSpikeBallCell, Cell} from "../Cell.js";
import { Row, EmptyRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, resolveFloat, getRandomInt } from "../../utils/utils.js";

interface SpinningSpikeBallRowBlockOptions {
    numObstacleRows?: number;
    numObstacleRowsMin?: number;
    numObstacleRowsMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;

    spikeballIndex?: number;
    spikeballDirection?: number;
    spikeballSpeed?: number;
    spikeballSpeedMin?: number;
    spikeballSpeedMax?: number;

    spikeballRadius?: number;
    spikeballRadiusMin?: number;
    spikeballRadiusMax?: number;
}

export default class SpinningSpikeBallRowBlock extends RowBlock {
    constructor(options: SpinningSpikeBallRowBlockOptions = {}) {
        const {
            numObstacleRows,
            numObstacleRowsMin = 1,
            numObstacleRowsMax = 1,

            spacing,
            spacingMin = 1,
            spacingMax = 1,
            leadIn = 2,
            leadOut = 2,

            spikeballIndex,
            spikeballDirection,
            spikeballSpeed,
            spikeballSpeedMin = 100,
            spikeballSpeedMax = 300,

            spikeballRadius,
            spikeballRadiusMin = Row.CELL_SIZE * 2,
            spikeballRadiusMax = Row.CELL_SIZE * 4
        } = options;

        const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax);

        const rows: Row[] = [];

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        for (let i=0; i<count; i++) {
            const idx = resolve(spikeballIndex, 0, Row.WIDTH - 1);
            const cells: Cell[] = Array.from({length: Row.WIDTH}, (_, i) => {
                if (i === idx) {
                    const speed = resolve(spikeballSpeed, spikeballSpeedMin, spikeballSpeedMax);
                    const radius = resolveFloat(spikeballRadius, spikeballRadiusMin, spikeballRadiusMax);
                    const direction = spikeballDirection ?? (getRandomInt(0, 1) === 0 ? -1 : 1);
                    return new SpinningSpikeBallCell({
                        column: i, 
                        speed: speed, 
                        pivotRadius: radius, 
                        direction: direction
                    });
                } else {
                    return new EmptyCell(i);
                }
            });
            rows.push(new Row(cells));

            const space = resolve(spacing, spacingMin, spacingMax);
            for (let i=0; i<space; i++) {
                rows.push(new EmptyRow());
            }
        }

        for (let i = 0; i < leadOut; i++) {
            rows.push(new EmptyRow())
        }

        super(rows);
    }
}