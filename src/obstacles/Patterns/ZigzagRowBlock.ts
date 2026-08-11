import { Row, EmptyRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { buildDiagonalRows } from "./DiagonalRowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";

interface ZigzagRowBlockOptions {
    segments?: number;
    segmentsMin?: number;
    segmentsMax?: number;

    numObstacleRowsPerSegment?: number;
    numObstacleRowsPerSegmentMin?: number;
    numObstacleRowsPerSegmentMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;
    
    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;

    swingMin?: number;
    swingMax?: number;

    booster?: boolean;
    boosterMod?: number;
    boosterImpulse?: number;
    boosterMultiplier?: number;
}

export default class ZigzagRowBlock extends RowBlock {
    constructor(options: ZigzagRowBlockOptions = {}) {
        const {
            segments,
            segmentsMin = 3,
            segmentsMax = 5,

            numObstacleRowsPerSegment,
            numObstacleRowsPerSegmentMin = 8,
            numObstacleRowsPerSegmentMax = 14,

            spacing,
            spacingMin = 1,
            spacingMax = 1,
            leadIn = 2,
            leadOut = 2,

            gapWidth,
            gapWidthMin = 2,
            gapWidthMax = 4,

            swingMin = 4,
            swingMax = Row.WIDTH - 1,

            booster = false,
            boosterMod = 6,
            boosterImpulse = 450,
            boosterMultiplier = 1.5
            
        } = options;

        const segmentCount = resolve(segments, segmentsMin, segmentsMax);
        const width = resolve(gapWidth, gapWidthMin, gapWidthMax);        
        const maxStart = Row.WIDTH - width;

        const rows: Row[] = [];
        let currentStart = getRandomInt(0, maxStart);
        let goingRight = Math.random() < 0.5;

        for (let i = 0; i < leadIn; i++) {
            rows.push(new EmptyRow())
        }

        for (let s=0; s < segmentCount; s++) {
            const swing = getRandomInt(Math.min(swingMin, maxStart), Math.min(swingMax, maxStart));
            const rawTarget = goingRight ? currentStart + swing : currentStart - swing;
            const target = Math.max(0, Math.min(maxStart, rawTarget));

            const count = resolve(numObstacleRowsPerSegment, numObstacleRowsPerSegmentMin, numObstacleRowsPerSegmentMax)
            const space = resolve(spacing, spacingMin, spacingMax);

            const { rows: segmentRows, endGapStart } = buildDiagonalRows({
                numObstacleRows: count,
                gapWidth: width,
                spacing: space,
                pathStart: currentStart,
                pathEnd: target,
                leadIn: 0,
                leadOut: 0,
                booster: booster,
                boosterMod: boosterMod,
                boosterImpulse: boosterImpulse,
                boosterMultiplier: boosterMultiplier
            });

            rows.push(...segmentRows);
            currentStart = endGapStart;
            goingRight = !goingRight;
        }

        for (let i = 0; i < leadOut; i++) {
            rows.push(new EmptyRow())
        }

        super(rows);
    }
}