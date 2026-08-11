import { BoosterCell } from "../Cell.js" 
import { Row, EmptyRow, GapRow } from "../Row.js";
import RowBlock from "../RowBlock.js";
import { resolve, getRandomInt } from "../../utils/utils.js";

interface TunnelRowBlockOptions {
    numTunnels?: number;
    numTunnelsMin?: number;
    numTunnelsMax?: number;

    numObstacleRows?: number;
    numObstacleRowsMin?: number;
    numObstacleRowsMax?: number;

    spacing?: number;
    spacingMin?: number;
    spacingMax?: number;
    leadIn?: number;
    leadOut?: number;

    startIdx?: number;
    gapWidth?: number;
    gapWidthMin?: number;
    gapWidthMax?: number;

    boosterStart?: boolean;
    boosterEnd?: boolean;
    boosterRepeat?: boolean;
    boosterMod?: number;
    boosterImpulse?: number;
    boosterMultiplier?: number;
}

export default class TunnelRowBlock extends RowBlock {
    constructor(options: TunnelRowBlockOptions = {}) {
        const {

            numTunnels,
            numTunnelsMin = 1,
            numTunnelsMax = 1,

            numObstacleRows,
            numObstacleRowsMin = 3,
            numObstacleRowsMax = 7,

            spacing,
            spacingMin = 2,
            spacingMax = 4,
            leadIn = 0,
            leadOut = 0,

            startIdx,
            gapWidth,
            gapWidthMin = 1,
            gapWidthMax = 3,
            
            boosterStart = false,
            boosterEnd = false,
            boosterRepeat = false,
            boosterMod = 5,
            boosterImpulse = 450,
            boosterMultiplier = 1.5

        } = options;

        
        const tunnels = resolve(numTunnels, numTunnelsMin, numTunnelsMax);

        const rows: Row[] = []
        for (let i=0; i< leadIn; i++) {
            rows.push(new EmptyRow())
        }

        for (let t=0; t<tunnels; t++) {
            const count = resolve(numObstacleRows, numObstacleRowsMin, numObstacleRowsMax)
            const width = resolve(gapWidth, gapWidthMin, gapWidthMax);
            const start = resolve(startIdx, 0, Row.WIDTH - width);
            for (let i = 0; i < count; i++) {
                const row = new GapRow({gapStart:start, gapWidth:width})

                if (boosterRepeat && i % boosterMod === 0) {
                    const boosterColumn = start + width * 0.5 - 0.5;
                    row.betweens.push(new BoosterCell({ column: boosterColumn, impulse: boosterImpulse, multiplier: boosterMultiplier }));
                }

                if ((boosterStart && i === 0) || (boosterEnd && i === count-1)) {
                    const boosterColumn = start + width * 0.5 - 0.5;
                    row.betweens.push(new BoosterCell({ column: boosterColumn, impulse: boosterImpulse, multiplier: boosterMultiplier }));
                }

                rows.push(row)
            }

            if (t < tunnels - 1) {
                const space = resolve(spacing, spacingMin, spacingMax);
                for (let j = 0; j < space; j++) {
                    rows.push(new EmptyRow());
                }
            }
        }

        for (let i = 0; i < leadOut; i++) {
            rows.push(new EmptyRow());
        }

        super(rows);

    }
}