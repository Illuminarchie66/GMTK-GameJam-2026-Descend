import { EmptyCell, SpikeCell, SpikeBallCell, SpinningSpikeBallCell, BoosterCell, Cell} from "../Cell.js";
import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt, getRandomElement } from "../../utils/utils.js";

interface TestRowBlockOptions {

}

export default class TestRowBlock extends RowBlock {
    constructor(options: TestRowBlockOptions = {}) {
        const rows: Row[] = [];
        for (let i=0; i<2; i++) {
            rows.push(new EmptyRow());
        }
        // const cells: Cell[] = new EmptyRow().cells;
        // const idx = getRandomInt(1, Row.WIDTH - 2);
        // cells[idx] = new BoosterCell(idx);
        const row = new EmptyRow();
        row.betweens.push(new BoosterCell({column: getRandomElement([2.25, 4.5, 6.75])}));
        rows.push(row);
        for (let i=0; i<0; i++) {
            rows.push(new EmptyRow());
        }
        
        super(rows);
    }
}
