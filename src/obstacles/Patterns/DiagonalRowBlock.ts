import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";

interface DiagonalPathOptions {
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

    pathStart?: number;
    pathEnd?: number;
}

export function buildDiagonalRows(options: DiagonalPathOptions = {}): {rows: Row[]; endGapStart: number} {
    const {
        numObstacleRows,
        numObstacleRowsMin = 8,
        numObstacleRowsMax = 14,

        spacing,
        spacingMin = 1,
        spacingMax = 1,
        leadIn = 2,
        leadOut = 2,

        gapWidth,
        gapWidthMin = 2,
        gapWidthMax = 4,

        pathStart,
        pathEnd
    } = options;

    const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
    const maxStart = Row.WIDTH - width;
    const start = pathStart ?? getRandomInt(0, maxStart);
    const end = pathEnd ?? getRandomInt(0, maxStart);
    
    const targetCount = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax);

    const maxStepPerRow = Math.max(1, width-1);
    const delta = end - start;
    const minRowsForSlope = Math.ceil(Math.abs(delta) / maxStepPerRow) + 3;
    const count = Math.max(targetCount, minRowsForSlope);

    const rows: Row[] = [];
    let lastGapStart = start;

    for (let i = 0; i < leadIn; i++) {
        rows.push(new EmptyRow())
    }

    for (let i=0; i < count; i++) {
        const t = count === 1 ? 0 : i / (count - 1);
        lastGapStart = Math.round(start + delta * t);
        rows.push(new GapRow({gapStart: lastGapStart, gapWidth: width}));
        if (i < count - 1) {
            const space = resolve(spacing, spacingMin, spacingMax);
            for (let j=0; j < space; j++) {
                rows.push(new EmptyRow());
            }
        }
    }

    for (let i = 0; i < leadOut; i++) {
        rows.push(new EmptyRow());
    }

    return {rows, endGapStart: lastGapStart};
}

export default class DiagonalRowBlock extends RowBlock {
    constructor(options: DiagonalPathOptions = {}) {
        super(buildDiagonalRows(options).rows);
    }
}

// class DiagonalRowBlock2 extends RowBlock {
//     rows: Row[] = [];

//     constructor(numRows: number) {
//         super(numRows);
//         this.rows = this.generatePath();
//     }

//     generatePath(): Row[] {
//         let pathStart;
//         let pathEnd;
//         if (Math.random() < 0.5) {
//             pathStart = getRandomInt(0, (Row.WIDTH -1) / 2);
//             pathEnd = getRandomInt((Row.WIDTH -1) / 2, Row.WIDTH - 1);
//         } else {
//             pathStart = getRandomInt((Row.WIDTH -1) / 2, Row.WIDTH - 1);
//             pathEnd = getRandomInt(0, (Row.WIDTH -1) / 2);
//         }
        
//         // we draw a line from start to end over num rows
//         const grid = Array.from({length: this.numRows}, () => Array(Row.WIDTH).fill(false));
//         // start is (0, pathStart), end is (numRows - 1, pathEnd)
//         const dy = this.numRows - 1;
//         const dx = pathEnd - pathStart;
//         const steps = Math.max(Math.abs(dx), Math.abs(dy));
//         if (steps === 0) {
//             grid[0][pathStart] = true;
//         }

//         const y_inc = dy / steps;
//         const x_inc = dx / steps;

//         let y = 0;
//         let x = pathStart;
//         for (let i = 0; i <= steps; i++) {
//             grid[Math.round(y)][Math.round(x)] = true;
//             y += y_inc;
//             x += x_inc;
//         }

//         const path: Row[] = [];
//         for (let i = 0; i < this.numRows; i++) {
//             const rowCells: Cell[] = [];
//             for (let j = 0; j < Row.WIDTH; j++) {
//                 if (grid[i][j]) {
//                     rowCells.push(new EmptyCell(j));
//                 } else {
//                     rowCells.push(new SpikeCell(j));
//                 }
//             }
//             path.push(new Row(rowCells));
//         }
//         return path;
//     }

//     nextRow(): Row | null {
//         if (this.currentRow >= this.numRows) {
//             return null;
//         }

//         const row = this.rows[this.currentRow];
//         this.currentRow++;
//         return row;

//     }
// }
