import { Row } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { buildDiagonalRows } from "./DiagonalRowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";

interface ZigzagRowBlockOptions {
    segments?: number;
    segmentsMin?: number;
    segmentsMax?: number;
    numRowsPerSegment?: number;
    numRowsPerSegmentMin?: number;
    numRowsPerSegmentMax?: number;
    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;
    swingMin?: number;
    swingMax?: number;
}

export default class ZigzagRowBlock extends RowBlock {
    constructor(options: ZigzagRowBlockOptions = {}) {
        const {
            segments, segmentsMin = 3, segmentsMax = 5,
            numRowsPerSegment, numRowsPerSegmentMin = 3, numRowsPerSegmentMax = 8,
            gapWidth, gapWidthMin = 2, gapWidthMax = 3,
            swingMin = 4, swingMax = Row.WIDTH - 1
        } = options;

        const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
        const maxStart = Row.WIDTH - width;
        const segmentCount = resolve(segments, segmentsMin, segmentsMax);
        const rows: Row[] = [];
        let currentStart = getRandomInt(0, maxStart);
        let goingRight = Math.random() < 0.5;

        for (let s=0; s < segmentCount; s++) {
            const swing = getRandomInt(Math.min(swingMin, maxStart), Math.min(swingMax, maxStart));
            const rawTarget = goingRight ? currentStart + swing : currentStart - swing;
            const target = Math.max(0, Math.min(maxStart, rawTarget));

            const { rows: segmentRows, endGapStart } = buildDiagonalRows({
                numRowsMin: numRowsPerSegmentMin,
                numRowsMax: numRowsPerSegmentMax,
                gapWidth: width,
                pathStart: currentStart,
                pathEnd: target
            });

            rows.push(...segmentRows);
            currentStart = endGapStart;
            goingRight = !goingRight;
        }

        super(rows);
    }
}