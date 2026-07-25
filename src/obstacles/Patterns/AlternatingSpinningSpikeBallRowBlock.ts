import { EmptyCell, SpinningSpikeBallCell, Cell} from "../Cell.js";
import { Row, EmptyRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, resolveFloat, getRandomInt } from "../../utils/utils.js";

interface AlternatingSpinningSpikeBallRowBlockOptions {
    numRows?: number;
    spikeballSpeed?: number;
    spikeballRadius?: number;
    spacing?: number;
}

export default class AlternatingSpinningSpikeBallRowBlock extends RowBlock {

    constructor(options: AlternatingSpinningSpikeBallRowBlockOptions = {}) {

        const {
            numRows = 8,
            spikeballSpeed = Math.PI / 2,
            spikeballRadius = Row.CELL_SIZE * 2,
            spacing = 1
        } = options;

        const rows: Row[] = [];

        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {

            const ballColumns =
                rowIndex % 2 === 0
                    ? [2, 7]
                    : [4];

            const cells: Cell[] = Array.from(
                { length: Row.WIDTH },
                (_, column) => {

                    if (ballColumns.includes(column)) {
                        const direction = rowIndex % 2 === 0 ? 1 : -1;

                        return new SpinningSpikeBallCell({
                            column: column,
                            speed: spikeballSpeed,
                            pivotRadius: spikeballRadius,
                            direction: direction
                    });
                    }

                    return new EmptyCell(column);
                }
            );

            rows.push(new Row(cells));

            for (let i = 0; i < spacing; i++) {
                rows.push(new EmptyRow());
            }
        }

        super(rows);
    }
}