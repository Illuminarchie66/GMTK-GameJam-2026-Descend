import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt, getWeightedChoice } from "../../utils/utils.js";

interface RandomGapChainRowBlockOptions {
    numRows?: number;
    numRowsMin?: number;
    numRowsMax?: number;
    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;
    rowGap?: number;
    rowGapMin?: number;
    rowGapMax?: number;
    downWeight?: number;
    turnWeight?: number;
    momentumBonus?: number;
}

export default class RandomGapChainRowBlock extends RowBlock {
    constructor(options: RandomGapChainRowBlockOptions = {}) {
        const {
            numRows, numRowsMin = 8, numRowsMax = 15, 
            gapWidth, gapWidthMin = 2, gapWidthMax = 3, 
            rowGap, rowGapMin = 1, rowGapMax = 2, 
            downWeight = 1, turnWeight = 3, momentumBonus = 4 
        } = options;

        const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
        const turns = resolve(numRows, numRowsMin, numRowsMax);

        let start = getRandomInt(0, Row.WIDTH - width);
        let lastDirection: "down" | "left" | "right" = "down";

        const rows: Row[] = [
            new GapRow({gapStart: start, gapWidth: width})
        ]

        for (let i=0; i < turns; i++) {
            const spacing = resolve(rowGap, rowGapMin, rowGapMax);
            for (let j=0; j < spacing; j++) {
                rows.push(new EmptyRow());
            }

            // we determine weights by momentum, where it should be more likely to turn (as by turnWeight) and more likely to go the same as the last direction
            const weights: Record<string, number> = { down: downWeight };
            if (start + width < Row.WIDTH) {
                weights.right = turnWeight + (lastDirection === "right" ? momentumBonus : 0);
            }
            if (start > 0) {
                weights.left = turnWeight + (lastDirection === "left" ? momentumBonus : 0);
            }

            const dir = getWeightedChoice(weights) as "down" | "left" | "right";
            if (dir === "down")
                start = start;
            if (dir === "right")
                start = start + 1;
            if (dir === "left")
                start = start - 1;

            lastDirection = dir;
            rows.push(new GapRow({gapStart: start, gapWidth: width}));
        }

        super(rows);
    }
}