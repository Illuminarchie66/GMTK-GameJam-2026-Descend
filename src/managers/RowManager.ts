import { Row } from "../obstacles/Row.js";
import Entity from "../obstacles/Entities/Entity.js";
import RowBlock from "../obstacles/RowBlock.js";
import EmptyRowBlock from "../obstacles/Patterns/EmptyRowBlock.js";
import RandomRowBlock from "../obstacles/Patterns/RandomRowBlock.js";
import RandomGapRowBlock from "../obstacles/Patterns/RandomGapRowBlock.js";
import RandomGapChainRowBlock from "../obstacles/Patterns/RandomGapChainBlockRow.js";
import TunnelRowBlock from "../obstacles/Patterns/TunnelRowBlock.js";
import InsOutsRowBlock from "../obstacles/Patterns/InsOutsRowBlock.js";
import BittyRowBlock from "../obstacles/Patterns/BittyRowBlock.js";
import DiagonalRowBlock from "../obstacles/Patterns/DiagonalRowBlock.js";
import ZigzagRowBlock from "../obstacles/Patterns/ZigzagRowBlock.js";
import MovingSpikeBallRowBlock from "../obstacles/Patterns/MovingSpikeBallRowBlock.js";
import MovingSpikeBallGapRowBlock from "../obstacles/Patterns/MovingSpikeBallGapRowBlock.js";
import SpinningSpikeBallRowBlock from "../obstacles/Patterns/SpinningSpikeBallRowBlock.js";
import AlternatingSpinningSpikeBallRowBlock from "../obstacles/Patterns/AlternatingSpinningSpikeBallRowBlock.js";
import BoosterRowBlock from "../obstacles/Patterns/BoosterRowBlock.js";
import BoosterChainRowBlock from "../obstacles/Patterns/BoosterChainRowBlock.js"
import TestRowBlock from "../obstacles/Patterns/TestRowBlock.js";
import { getRandomInt, getRandomFloat, getWeightedChoice } from "../utils/utils.js";

import World from "../World.js";
import { GameDetails } from "../Game.js";

class RowBlockFactory {
    constructor() {}

    createEasyBlock(block?:number): RowBlock {
        const randomBlock = block ?? getRandomInt(0, 16);
        switch (randomBlock) {
            case 0:
                return new RandomRowBlock( { 
                    numObstacleRowsMin: 2, 
                    numObstacleRowsMax: 5,
                    spacingMin: 2, 
                    spacingMax: 4, 
                    chance: 0.7 
                } )

            case 1:
                return new RandomGapRowBlock( { 
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,
                    spacingMin: 5,
                    spacingMax: 7,
                    gapWidthMin: 3,
                    gapWidthMax: 5,
                } )
            case 2:
                return new RandomGapRowBlock( { 
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,
                    spacingMin: 4,
                    spacingMax: 5,
                    gapWidthMin: 2,
                    gapWidthMax: 4,
                } )
            case 3:
                return new RandomGapRowBlock( { 
                    numObstacleRowsMin: 5,
                    numObstacleRowsMax: 10,
                    spacingMin: 8,
                    spacingMax: 10,
                    gapWidthMin: 3,
                    gapWidthMax: 4,
                    booster: true,
                    boosterChance: 0.5,
                    leadOut: 5
                } )
            case 4:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 15,

                    spacingMin: 2,
                    spacingMax: 3,

                    gapWidthMin: 2,
                    gapWidthMax: 3,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 4
                } )
            case 5:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 15,

                    spacingMin: 5,
                    spacingMax: 5,
                    leadOut: 5,

                    gapWidthMin: 3,
                    gapWidthMax: 4,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 20,
                    booster: true,
                    boosterMod: 3
                } )
            case 6:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 15,

                    spacingMin: 0,
                    spacingMax: 0,

                    gapWidthMin: 4,
                    gapWidthMax: 5,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 10,
                } )
            case 7:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 10,
                    numObstacleRowsMax: 18,

                    spacingMin: 0,
                    spacingMax: 0,

                    gapWidthMin: 5,
                    gapWidthMax: 5,

                    downWeight: 3,
                    turnWeight: 1,
                    momentumBonus: 20,

                    booster: true,
                    boosterMod: 10
                } )
            case 8:
                return new TunnelRowBlock( { 
                    numTunnelsMin:1,
                    numTunnelsMax:3,

                    numObstacleRowsMin: 4,
                    numObstacleRowsMax: 7,

                    spacingMin: 3,
                    spacingMax: 4,

                    gapWidthMin: 2,
                    gapWidthMax: 3
                } )
            case 9:
                return new InsOutsRowBlock( { 
                    numObstacleRowsMin:3,
                    numObstacleRowsMax:7,

                    spacingMin: 3,
                    spacingMax: 4,

                    gapStart: 3,
                    gapWidth: 4,

                } )
            case 10:
                return new DiagonalRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 14,

                    spacing: 0,

                    gapWidthMin: 3,
                    gapWidthMax: 4,

                } )
            case 11:
                return new MovingSpikeBallRowBlock({
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,

                    spacingMin: 2,
                    spacingMax: 3,
                    
                    spikeballSpeed: getRandomInt(100, 300),
                });
            case 12:
                return new MovingSpikeBallRowBlock({
                numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,

                    spacingMin: 2,
                    spacingMax: 2,
                    spikeballIndex: getRandomInt(0, Row.WIDTH - 1),

                    spikeballSpeed: getRandomInt(200, 400),
                });
            case 13:
                return new MovingSpikeBallGapRowBlock({
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,

                    spacing: getRandomInt(3, 4),

                    gapWidthMin: 4,
                    gapWidthMax: 6,

                    spikeballSpeedMin: 100,
                    spikeballSpeedMax: 200
                })
            case 14:
                return new BoosterRowBlock({
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,

                    spacingMin: 6,
                    spacingMax: 12,
                    leadOut: 5,

                    possiblePos: [2.25, 4.5, 6.75]
                })
            case 15:
                return new BoosterRowBlock({
                numObstacleRowsMin: 4,
                numObstacleRowsMax: 6,

                spacingMin: 2,
                spacingMax: 4,
                leadOut: 5,

                possiblePos: [1, 2.25, 4.5, 6.75, 8]
            })
            case 16: 
                return new SpinningSpikeBallRowBlock({
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 5,

                    spacingMin: 2,
                    spacingMax: 3,

                    spikeballSpeedMin: Math.PI*0.5,
                    spikeballSpeedMax: Math.PI*0.5,

                    spikeballRadiusMin:Row.CELL_SIZE * 2,
                    spikeballRadiusMax:Row.CELL_SIZE * 4
                })

            default:
                return new EmptyRowBlock({ numRowsMin: 5, numRowsMax: 7 });
        }

    }

    createMediumBlock(block?:number): RowBlock {
        const randomBlock = block ?? getRandomInt(0, 19);
        switch (randomBlock) {
            case 0:
                return new RandomRowBlock( { 
                    numObstacleRowsMin: 2, 
                    numObstacleRowsMax: 5,
                    spacingMin: 2, 
                    spacingMax: 3, 
                    chance: 0.5 
                } )
            case 1:
                return new RandomGapRowBlock( { 
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,
                    spacingMin: 4,
                    spacingMax: 4,
                    gapWidthMin: 2,
                    gapWidthMax: 3,
                } )
            case 2:
                return new RandomGapRowBlock( { 
                    numObstacleRowsMin: 5,
                    numObstacleRowsMax: 10,
                    spacingMin: 8,
                    spacingMax: 10,
                    gapWidthMin: 2,
                    gapWidthMax: 3,
                    booster: true,
                    boosterChance: 0.75,
                    leadOut: 5
                } )
            case 3:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 17,

                    spacingMin: 2,
                    spacingMax: 2,

                    gapWidthMin: 2,
                    gapWidthMax: 3,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 4
                } )
            case 4:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 17,

                    spacingMin: 1,
                    spacingMax: 2,

                    gapWidthMin: 2,
                    gapWidthMax: 3,

                    downWeight: 0,
                    turnWeight: 3,
                    momentumBonus: 1
                } )
            case 5:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 15,

                    spacingMin: 4,
                    spacingMax: 5,
                    leadOut: 5,

                    gapWidthMin: 2,
                    gapWidthMax: 3,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 20,
                    booster: true,
                    boosterMod: 4
                } )
            case 6:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 15,

                    spacingMin: 5,
                    spacingMax: 5,
                    leadOut: 10,

                    gapWidthMin: 3,
                    gapWidthMax: 3,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 20,
                    booster: true,
                    boosterMod: 2
                } )
            case 7:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 15,

                    spacingMin: 7,
                    spacingMax: 7,
                    leadOut: 10,

                    gapWidthMin: 3,
                    gapWidthMax: 3,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 20,
                    booster: true,
                    boosterMod: 1
                } )
            case 8:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 15,

                    spacingMin: 2,
                    spacingMax: 2,

                    gapWidthMin: 1,
                    gapWidthMax: 1,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 5,
                } )
            case 9:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 7,
                    numObstacleRowsMax: 15,

                    spacingMin: 0,
                    spacingMax: 0,

                    gapWidthMin: 3,
                    gapWidthMax: 4,

                    downWeight: 1,
                    turnWeight: 10,
                    momentumBonus: 20,
                } )
            case 10:
                return new TunnelRowBlock( { 
                    numTunnelsMin:1,
                    numTunnelsMax:5,

                    numObstacleRowsMin: 4,
                    numObstacleRowsMax: 7,

                    spacingMin: 8,
                    spacingMax: 10,
                    leadOut: 10,

                    gapWidthMin: 2,
                    gapWidthMax: 3,

                    boosterStart: true,
                    boosterEnd: true
                } )
            case 11:
                return new TunnelRowBlock( { 
                    numTunnelsMin:1,
                    numTunnelsMax:5,

                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,

                    spacingMin: 5,
                    spacingMax: 5,

                    gapWidthMin: 1,
                    gapWidthMax: 1,

                } )
            case 12:
                return new InsOutsRowBlock( { 
                    numObstacleRowsMin:3,
                    numObstacleRowsMax:5,

                    spacingMin: 2,
                    spacingMax: 2,

                    gapStart: getRandomInt(3, 6),
                    gapWidthMin: 3,
                    gapWidthMax: 5

                } )
            case 13:
                return new BittyRowBlock( { 
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 5,

                    spacingMin: 2,
                    spacingMax: 2,

                } )
            case 14:
                return new DiagonalRowBlock( { 
                    numObstacleRowsMin: 12,
                    numObstacleRowsMax: 16,

                    spacing: 0,

                    gapWidthMin: 2,
                    gapWidthMax: 3

                } )
            case 15:
                return new ZigzagRowBlock( { 
                    segmentsMin: 3,
                    segmentsMax: 5,

                    numObstacleRowsPerSegmentMin: 8,
                    numObstacleRowsPerSegmentMax: 14,

                    spacing: 0,

                    gapWidthMin: 4,
                    gapWidthMax: 4,

                    swingMin: 4,
                    swingMax: Row.WIDTH - 1,

                    booster: true,
                    boosterMod: 15
                } )   
            case 16:
                return new MovingSpikeBallRowBlock({
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 5,

                    spacingMin: 2,
                    spacingMax: 3,
                    spikeballIndex: getRandomInt(0, Row.WIDTH - 1),

                    spikeballSpeed: getRandomInt(300, 400),
                });

            case 17:
                return new MovingSpikeBallGapRowBlock({
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,

                    spacing: getRandomInt(3, 4),

                    gapWidthMin: 3,
                    gapWidthMax: 4,

                    spikeballSpeedMin: 100,
                    spikeballSpeedMax: 100
                })
            case 18:
                return new BoosterChainRowBlock({
                    numObstacleRowsMin:6,
                    numObstacleRowsMax:7,

                    spacingMin: 8,
                    spacingMax: 10,
                    leadOut: 6,

                    possiblePos: [1,2,3,4,5,6,7,8,9],
                    idxDistanceMin: 1,
                    idxDistanceMax: 2
                })
            case 19:
                return new SpinningSpikeBallRowBlock({
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 5,

                    spacingMin: 2,
                    spacingMax: 3,

                    spikeballIndex: getRandomInt(4, 6),
                    spikeballDirection: getRandomInt(0, 1) === 0 ? -1 : 1,
                    spikeballSpeed: getRandomFloat(Math.PI*0.5, Math.PI*1.5),

                    spikeballRadiusMin:Row.CELL_SIZE * 3,
                    spikeballRadiusMax:Row.CELL_SIZE * 3
                })
            

            default:
                return new EmptyRowBlock({ numRowsMin: 5, numRowsMax: 7 });
        }

    }

    createHardBlock(block?:number): RowBlock {
        const randomBlock = block ?? getRandomInt(0, 10);
        switch (randomBlock) {
            case 0:
                return new RandomRowBlock( { 
                    numObstacleRowsMin: 3, 
                    numObstacleRowsMax: 7,
                    spacingMin: 3, 
                    spacingMax: 3, 
                    chance: 0.25 
                } )
            case 1:
                return new RandomGapRowBlock( { 
                    numObstacleRowsMin: 4,
                    numObstacleRowsMax: 7,
                    spacingMin: 4,
                    spacingMax: 4,
                    gapWidthMin: 1,
                    gapWidthMax: 2,
                } )
            case 2: 
                return new RandomGapRowBlock( { 
                    numObstacleRowsMin: 6,
                    numObstacleRowsMax: 12,
                    spacingMin: 7,
                    spacingMax: 10,
                    gapWidthMin: 2,
                    gapWidthMax: 2,
                    booster: true,
                    boosterChance: 1,
                    leadOut: 5
                } )
            case 3:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 15,

                    spacingMin: 5,
                    spacingMax: 5,
                    leadOut: 10,

                    gapWidthMin: 2,
                    gapWidthMax: 3,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 20,
                    booster: true,
                    boosterMod: 1
                } )
            case 4:
                return new RandomGapChainRowBlock( { 
                    numObstacleRowsMin: 8,
                    numObstacleRowsMax: 15,

                    spacingMin: 1,
                    spacingMax: 1,

                    gapWidthMin: 2,
                    gapWidthMax: 2,

                    downWeight: 1,
                    turnWeight: 3,
                    momentumBonus: 5,
                } )
            case 5:
                return new BittyRowBlock( { 
                    numObstacleRowsMin: 2,
                    numObstacleRowsMax: 3,

                    spacingMin: 1,
                    spacingMax: 1,

                } )
            case 6:
                return new ZigzagRowBlock( { 
                    segmentsMin: 5,
                    segmentsMax: 7,

                    numObstacleRowsPerSegmentMin: 5,
                    numObstacleRowsPerSegmentMax: 10,

                    spacing: 0,

                    gapWidthMin: 3,
                    gapWidthMax: 3,

                    swingMin: 7,
                    swingMax: Row.WIDTH - 1,

                } )
            case 7:
                return new ZigzagRowBlock( { 
                    segmentsMin: 5,
                    segmentsMax: 7,

                    numObstacleRowsPerSegmentMin: 12,
                    numObstacleRowsPerSegmentMax: 16,

                    spacing: 0,

                    gapWidthMin: 4,
                    gapWidthMax: 4,

                    swingMin: 6,
                    swingMax: Row.WIDTH - 1,

                    booster: true,
                    boosterMod: 25,
                    boosterImpulse: 600,
                    boosterMultiplier: 1.6
                } )
            case 8:
                return new TunnelRowBlock( { 
                    numTunnelsMin:1,
                    numTunnelsMax:5,

                    numObstacleRowsMin: 21,
                    numObstacleRowsMax: 21,

                    spacingMin: 11,
                    spacingMax: 12,
                    leadIn: 0,
                    leadOut: 10,

                    gapWidthMin: 2,
                    gapWidthMax: 2,

                    boosterRepeat: true,
                    boosterMod: 5,
                    boosterImpulse: 950,
                    boosterMultiplier: 2
                } )
            case 9:
                return new MovingSpikeBallRowBlock({
                    numObstacleRowsMin: 5,
                    numObstacleRowsMax: 10,

                    spacing: getRandomInt(1, 2),
                    spikeballIndex: getRandomInt(0, Row.WIDTH - 1),

                    spikeballSpeed: getRandomInt(300, 500),
                });
            case 10:
                return new MovingSpikeBallGapRowBlock({
                    numObstacleRowsMin: 3,
                    numObstacleRowsMax: 6,

                    spacing: getRandomInt(3, 4),

                    gapWidthMin: 5,
                    gapWidthMax: 5,

                    spikeballSpeedMin: 400,
                    spikeballSpeedMax: 400
                })
            
            default:
                return new EmptyRowBlock({ numRowsMin: 5, numRowsMax: 7 });
        }
    }

}

class RowGenerator {
    private currentBlock: RowBlock | null = null;
    first: boolean = true;
    alternate: boolean = true;
    gameDetails: GameDetails;
    rowBlockFactory: RowBlockFactory = new RowBlockFactory();


    constructor(gameDetails: GameDetails) {
        this.gameDetails = gameDetails;
    }

    nextRow(): Row {
        while(true) {

            if (this.currentBlock === null) {
                this.currentBlock = this.generateBlock();
                if (this.currentBlock instanceof EmptyRowBlock) {
                    this.gameDetails.numBlocks = (this.gameDetails.numBlocks ?? 0) + 1;
                }
            }

            const row = this.currentBlock.nextRow();

            if (row) {
                return row;
            }

            this.currentBlock = null;
        }
    }

    getDifficultyDistribution() {
        if (this.gameDetails.numBlocks === undefined) {
            return { easy: 1, medium: 0, hard: 0 };
        } else if (this.gameDetails.numBlocks < 3) {
            return { easy: 1, medium: 0, hard: 0 };
        } else if (this.gameDetails.numBlocks < 6) {
            return { easy: 0.7, medium: 0.3, hard: 0 };
        } else if (this.gameDetails.numBlocks < 10) {
            return { easy: 0.4, medium: 0.6, hard: 0 };
        } else if (this.gameDetails.numBlocks < 15) {
            return { easy: 0.3, medium: 0.6, hard: 0.1 };
        } else if (this.gameDetails.numBlocks < 20) {
            return { easy: 0.1, medium: 0.7, hard: 0.2 };
        } else if (this.gameDetails.numBlocks < 25) {
            return { easy: 0, medium: 0.75, hard: 0.25 };
        } else if (this.gameDetails.numBlocks < 35) {
            return { easy: 0, medium: 0.7, hard: 0.3 };
        } else if (this.gameDetails.numBlocks < 40) {
            return { easy: 0, medium: 0.6, hard: 0.4 };
        } else {
            return { easy: 0, medium: 0.5, hard: 0.5 };
        }
    }

    private generateBlock(): RowBlock {

        if (this.first) {
            this.first = false;
            return new EmptyRowBlock({ numRows: 25 });
        }

        this.alternate = !this.alternate;
        if (this.alternate) {
            return new EmptyRowBlock({ numRowsMin: 5, numRowsMax: 7 });
        } else {
            const distribution = this.getDifficultyDistribution();
            const group = getWeightedChoice(distribution);
            console.log("Generating block with distribution:", distribution, "Selected group:", group);

            switch (group) {
                case "easy":
                    return this.rowBlockFactory.createEasyBlock();
                case "medium":
                    return this.rowBlockFactory.createMediumBlock();
                case "hard":
                    return this.rowBlockFactory.createHardBlock();
            }

        }
    }
}


export default class RowManager {

    rows: Row[] = [];
    gameDetails: GameDetails;
    generator: RowGenerator;

    maxRows = 25;
    loadDistance = World.GAMEPLAY_HEIGHT + 10*Row.ROW_HEIGHT;
    unloadDistance = 10 * Row.ROW_HEIGHT;

    constructor(gameDetails: GameDetails) {
        this.gameDetails = gameDetails;
        this.generator = new RowGenerator(gameDetails);

        let lastY = 0;
        for (let i = 0; i < this.maxRows; i++) {
            const row = this.generator.nextRow();
            row.setY(lastY + Row.ROW_HEIGHT);
            this.rows.push(row);
            lastY = row.y;
        }
    }

    update(cameraY: number): { added: Entity[], removed: Entity[] } {

        let added: Entity[] = [];
        let removed: Entity[] = [];

        while (
            this.rows.length > 0 &&
            this.rows[0].y + Row.ROW_HEIGHT < cameraY - this.unloadDistance
        ) {
            const removedRow = this.rows.shift();

            if (removedRow) {
                removed.push(...removedRow.entities);
            }
        }

        while (
            this.rows.length > 0 &&
            this.rows[this.rows.length - 1].y < cameraY + this.loadDistance
        ) {
            const row = this.generator.nextRow();
            row.setY(this.rows[this.rows.length - 1].y + Row.ROW_HEIGHT);
            this.rows.push(row);
            added.push(...row.entities);
        }

        return { added, removed };
    }


    draw(ctx: CanvasRenderingContext2D): void {
        for (const row of this.rows) {
            row.draw(ctx);
        }
    }
}