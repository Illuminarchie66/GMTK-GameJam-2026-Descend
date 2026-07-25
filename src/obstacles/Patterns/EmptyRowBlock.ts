import { EmptyRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve } from "../../utils/utils.js";

interface EmptyRowBlockOptions {
    numRows?: number;
    numRowsMin?: number;
    numRowsMax?: number;
}

export default class EmptyRowBlock extends RowBlock {
    constructor(options: EmptyRowBlockOptions = {}) {
        const { numRows, numRowsMin = 5, numRowsMax = 5 } = options;
        const count = resolve(numRows, numRowsMin ?? 1, numRowsMax ?? 5);
        super(Array.from({ length: count }, () => new EmptyRow()));
    }
}