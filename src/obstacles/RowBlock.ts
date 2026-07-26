import { Row } from "./Row.js";

interface RowBlockOptions {
    numObstacleRows?: number;
    spacing?: number;
    leadIn?: number;
    leadOut?: number;
}

export default abstract class RowBlock {
    protected rows: Row[]
    private index: number = 0;

    constructor(rows: Row[]) {
        this.rows = rows;
    }

    get length(): number {
        return this.rows.length;
    }

    nextRow(): Row | null {
        if (this.index >= this.rows.length) {
            return null;
        }
        return this.rows[this.index++];
    }
}