import { EmptyCell, SpinningSpikeBallCell, Cell} from "../Cell.js";
import { Row, EmptyRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, resolveFloat, getRandomInt } from "../../utils/utils.js";

interface SpinningSpikeBallRowBlockOptions {
    numBallRows?: number;
    numBallRowsMin?: number;
    numBallRowsMax?: number;
    spikeballSpeed?: number;
    spikeballSpeedMin?: number;
    spikeballSpeedMax?: number;
    spikeballRadius?: number;
    spikeballRadiusMin?: number;
    spikeballRadiusMax?: number;
    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
}

export default class SpinningSpikeBallRowBlock extends RowBlock {
    constructor(options: SpinningSpikeBallRowBlockOptions = {}) {
        const {
            numBallRows, numBallRowsMin = 2, numBallRowsMax = 7, 
            spikeballSpeed, spikeballSpeedMin = Math.PI/2, spikeballSpeedMax = Math.PI,
            spikeballRadius, spikeballRadiusMin = Row.CELL_SIZE * 1.5, spikeballRadiusMax = Row.CELL_SIZE * 3.5,
            spacing, spacingMin = 1, spacingMax = 2
        } = options;

        const count = resolve(numBallRows, numBallRowsMin, numBallRowsMax);

        const rows: Row[] = [];
        for (let i=0; i<count; i++) {
            const idx = getRandomInt(0, Row.WIDTH - 1);
            const cells: Cell[] = Array.from({length: Row.WIDTH}, (_, i) => {
                if (i === idx) {
                    const speed = resolve(spikeballSpeed, spikeballSpeedMin, spikeballSpeedMax);
                    const radius = resolveFloat(spikeballRadius, spikeballRadiusMin, spikeballRadiusMax);
                    const direction = getRandomInt(0, 1) === 0 ? -1 : 1;
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

            const gap = resolve(spacing, spacingMin, spacingMax);
            for (let i=0; i<gap; i++) {
                rows.push(new EmptyRow());
            }
        }

        super(rows);
    }
}