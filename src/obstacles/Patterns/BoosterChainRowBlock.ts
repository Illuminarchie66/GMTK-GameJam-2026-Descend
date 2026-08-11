import { BoosterCell } from "../Cell.js";
import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt, getRandomElement, clamp } from "../../utils/utils.js";

interface BoosterChainRowBlockOptions {
    numObstacleRows?: number;
    numObstacleRowsMin?: number;
    numObstacleRowsMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;

    possiblePos?: number[];
    idxDistance?: number;
    idxDistanceMin?: number;
    idxDistanceMax?: number;
}

export default class BoosterChainRowBlock extends RowBlock {
    constructor(options: BoosterChainRowBlockOptions = {}) {
        const {
            numObstacleRows,
            numObstacleRowsMin = 1,
            numObstacleRowsMax = 1,

            spacing,
            spacingMin = 6,
            spacingMax = 12,
            leadIn = 5,
            leadOut = 5,

            possiblePos = [2.25, 4.5, 6.75],
            idxDistance,
            idxDistanceMin = 1,
            idxDistanceMax = 2

        } = options;
        const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax);

        const rows: Row[] = [];
        let posIdx = getRandomInt(0, possiblePos.length-1);

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        for (let i=0; i< count; i++) {

            const row = new EmptyRow();
            const pos = possiblePos[posIdx];
            row.betweens.push(new BoosterCell({column: pos}));
            rows.push(row);

            const dist = resolve(idxDistance, idxDistanceMin, idxDistanceMax);
            
            if (posIdx === possiblePos.length-1) {
                posIdx -= dist;
            } else if (posIdx === 0) {
                posIdx += dist;
            } else {
                if (Math.random() > 0.5) {
                    posIdx -=dist;
                } else {
                    posIdx += dist;
                }
            }
            posIdx = clamp(posIdx, 0, possiblePos.length-1)

            if (i < count - 1) {
                const space = resolve(spacing, spacingMin, spacingMax);
                for (let j = 0; j < space; j++) {
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