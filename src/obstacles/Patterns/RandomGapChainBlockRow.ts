import { BoosterCell } from "../Cell.js";
import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt, getWeightedChoice } from "../../utils/utils.js";

interface RandomGapChainRowBlockOptions {

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

    downWeight?: number;
    turnWeight?: number;
    momentumBonus?: number;

    booster?: boolean;
    boosterMod?: number;
    boosterImpulse?: number;
    boosterMultiplier?: number;
}

export default class RandomGapChainRowBlock extends RowBlock {
    constructor(options: RandomGapChainRowBlockOptions = {}) {
        const {
            numObstacleRows,
            numObstacleRowsMin = 8,
            numObstacleRowsMax = 15,

            spacing,
            spacingMin = 1,
            spacingMax = 1,

            leadIn = 0,
            leadOut = 0,

            gapWidth,
            gapWidthMin = 2,
            gapWidthMax = 3,

            downWeight = 1,
            turnWeight = 3,
            momentumBonus = 4,

            booster = false,
            boosterMod = 6,
            boosterImpulse = 450,
            boosterMultiplier = 1.5

        } = options;

        const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax)
        const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
        
        const rows: Row[] = [];

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        let start = getRandomInt(0, Row.WIDTH - width);
        let lastDirection: "down" | "left" | "right" = "down";
        const space = resolve(spacing, spacingMin, spacingMax);

        for (let i = 0; i < count; i++) {
            const row = new GapRow({gapStart: start, gapWidth: width})

            if (i%boosterMod === 0 && booster) {
                const boosterColumn = start + width * 0.5 - 0.5;
                row.betweens.push(new BoosterCell({ column: boosterColumn, impulse: boosterImpulse, multiplier: boosterMultiplier }));
            }

            rows.push(row);
            
            if (i < count - 1) {
                for (let j = 0; j < space; j++) {
                    rows.push(new EmptyRow());
                }
                
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
            }
        
        }

        for (let i=0; i<leadOut; i++) {
            rows.push(new EmptyRow())
        }

        super(rows);
    }
}