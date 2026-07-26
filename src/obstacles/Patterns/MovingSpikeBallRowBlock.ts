import { EmptyCell, SpikeBallCell, Cell} from "../Cell.js";
import { Row, EmptyRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { getRandomElement, resolve } from "../../utils/utils.js";

interface MovingSpikeBallRowBlockOptions {
    numObstacleRows?: number;
    numObstacleRowsMin?: number;
    numObstacleRowsMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;

    spikeballIndex?: number;
    spikeballSpeed?: number;
    spikeballDirection?: number;
    spikeballSpeedMin?: number;
    spikeballSpeedMax?: number;
}

export default class MovingSpikeBallRowBlock extends RowBlock {
    constructor(options: MovingSpikeBallRowBlockOptions = {}) {
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
            const idx = resolve(spikeballIndex, 0, Row.WIDTH - 1);

            const cells: Cell[] = Array.from({length: Row.WIDTH}, (_, i) => {
                if (i === idx) {
                    const speed = resolve(spikeballSpeed, spikeballSpeedMin, spikeballSpeedMax);
                    const direction = spikeballDirection ?? getRandomElement([-1, 1]);
                    return new SpikeBallCell({
                        column: i, 
                        speed: speed,
                        direction: direction
                    });
                } else {
                    return new EmptyCell(i);
                }
            });

            rows.push(new Row(cells));

            if (i < count - 1) {
                const space = resolve(spacing, spacingMin, spacingMax);
                for (let i=0; i<space; i++) {
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