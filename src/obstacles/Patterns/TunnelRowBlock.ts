import { Row, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";

interface TunnelRowBlockOptions {
    numRows?: number;
    numRowsMin?: number;
    numRowsMax?: number;
    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;
}

export default class TunnelRowBlock extends RowBlock {
    constructor(options: TunnelRowBlockOptions = {}) {
        const { numRows, numRowsMin = 3, numRowsMax = 7, gapWidth, gapWidthMin = 1, gapWidthMax = 3 } = options;
        const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
        const start = getRandomInt(0, Row.WIDTH - width - 1);
        const count = resolve(numRows, numRowsMin, numRowsMax);

        super(Array.from({ length: count}, () => new GapRow({ gapStart: start, gapWidth: width })));
    }
}