import { EmptyCell, SpikeBallCell, Cell} from "../Cell.js";
import { Row, EmptyRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve } from "../../utils/utils.js";

interface MovingSpikeBallRowBlockOptions {
    spikeballIndex?: number;
    numBallRows?: number;
    numBallRowsMin?: number;
    numBallRowsMax?: number;
    spikeballSpeed?: number;
    spikeballSpeedMin?: number;
    spikeballSpeedMax?: number;
    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
}

export default class MovingSpikeBallRowBlock extends RowBlock {
    constructor(options: MovingSpikeBallRowBlockOptions = {}) {
        const {
            spikeballIndex, 
            numBallRows, numBallRowsMin = 2, numBallRowsMax = 5, 
            spikeballSpeed, spikeballSpeedMin = 100, spikeballSpeedMax = 300,
            spacing, spacingMin = 2, spacingMax = 3
        } = options;

        const count = resolve(numBallRows, numBallRowsMin, numBallRowsMax);

        const rows: Row[] = [];
        for (let i=0; i<count; i++) {
            const idx = resolve(spikeballIndex, 0, Row.WIDTH - 1);
            const cells: Cell[] = Array.from({length: Row.WIDTH}, (_, i) => {
                if (i === idx) {
                    const speed = resolve(spikeballSpeed, spikeballSpeedMin, spikeballSpeedMax);
                    return new SpikeBallCell({
                        column: i, 
                        speed: speed
                    });
                } else {
                    return new EmptyCell(i);
                }
            });
            rows.push(new Row(cells));

            const gap = resolve(spacing, spacingMin, spacingMax);
            for (let i=0; i<gap; i++) {
                rows.push(new EmptyRow());
            }
        }

        super(rows);
    }
}