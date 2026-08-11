```
npm init -y
npm install --save-dev typescript
npx tsc --init

{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "sourceMap": true
  }
}

npx tsc
```
that generates the dist js file to use.

Alternatively for dev, we use vite:
```
npm install --save-dev vite
update package.json:

{
  "name": "breakout-game",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "^...",
    "vite": "^..."
  }
}

npm run dev
```

numObstacleRows : number of rows which have obstacle elements
spacing: number of empty rows between each obstacle row
leadIn; number of empty rows at the start 
leadOut: number of empty rows at the end
gap: width of the horitzontal gap in the row

# Easy:
new RandomRowBlock( { 
                numObstacleRowsMin: 2, 
                numObstacleRowsMax: 5,
                spacingMin: 2, 
                spacingMax: 4, 
                chance: 0.7 
            } )
new RandomGapRowBlock( { 
                numObstacleRowsMin: 3,
                numObstacleRowsMax: 6,
                spacingMin: 5,
                spacingMax: 7,
                gapWidthMin: 3,
                gapWidthMax: 5,
            } )
new RandomGapRowBlock( { 
                numObstacleRowsMin: 3,
                numObstacleRowsMax: 6,
                spacingMin: 4,
                spacingMax: 5,
                gapWidthMin: 2,
                gapWidthMax: 4,
            } )
new RandomGapRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new TunnelRowBlock( { 
                numTunnelsMin:1,
                numTunnelsMax:3,

                numObstacleRowsMin: 4,
                numObstacleRowsMax: 7,

                spacingMin: 3,
                spacingMax: 4,

                gapWidthMin: 2,
                gapWidthMax: 3
            } )
new InsOutsRowBlock( { 
                numObstacleRowsMin:3,
                numObstacleRowsMax:7,

                spacingMin: 3,
                spacingMax: 4,
                leadIn: 2,
                leadOut: 2,

                gapStart: 3,
                gapWidth: 4,

            } )
new DiagonalRowBlock( { 
                numObstacleRowsMin: 8,
                numObstacleRowsMax: 14,

                spacing: 0,
                leadIn: 2,
                leadOut: 2,

                gapWidthMin: 3,
                gapWidthMax: 4,

            } )

# Medium:
new RandomRowBlock( { 
                numObstacleRowsMin: 2, 
                numObstacleRowsMax: 5,
                spacingMin: 2, 
                spacingMax: 3, 
                chance: 0.5 
            } )
new RandomGapRowBlock( { 
                numObstacleRowsMin: 3,
                numObstacleRowsMax: 6,
                spacingMin: 4,
                spacingMax: 4,
                gapWidthMin: 2,
                gapWidthMax: 3,
            } )
new RandomGapRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new TunnelRowBlock( { 
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
new TunnelRowBlock( { 
                numTunnelsMin:1,
                numTunnelsMax:5,

                numObstacleRowsMin: 3,
                numObstacleRowsMax: 6,

                spacingMin: 5,
                spacingMax: 5,

                gapWidthMin: 1,
                gapWidthMax: 1,

            } )
new InsOutsRowBlock( { 
                numObstacleRowsMin:3,
                numObstacleRowsMax:5,

                spacingMin: 2,
                spacingMax: 2,
                leadIn: 2,
                leadOut: 2,

                gapStart: getRandomInt(3, 6),
                gapWidthMin: 3,
                gapWidthMax: 5

            } )
new BittyRowBlock( { 
                numObstacleRowsMin: 3,
                numObstacleRowsMax: 5,

                spacingMin: 2,
                spacingMax: 2,
                leadIn: 2,
                leadOut: 2,

            } )
new DiagonalRowBlock( { 
                numObstacleRowsMin: 12,
                numObstacleRowsMax: 16,

                spacing: 0,
                leadIn: 2,
                leadOut: 2,

                gapWidthMin: 2,
                gapWidthMax: 3

            } )
new ZigzagRowBlock( { 
                segmentsMin: 3,
                segmentsMax: 5,

                numObstacleRowsPerSegmentMin: 8,
                numObstacleRowsPerSegmentMax: 14,

                spacing: 0,
                leadIn: 2,
                leadOut: 2,

                gapWidthMin: 4,
                gapWidthMax: 4,

                swingMin: 4,
                swingMax: Row.WIDTH - 1,

                booster: true,
                boosterMod: 15
            } )


# Hard:
new RandomRowBlock( { 
                numObstacleRowsMin: 3, 
                numObstacleRowsMax: 7,
                spacingMin: 3, 
                spacingMax: 3, 
                chance: 0.25 
            } )
new RandomGapRowBlock( { 
                numObstacleRowsMin: 4,
                numObstacleRowsMax: 7,
                spacingMin: 4,
                spacingMax: 4,
                gapWidthMin: 1,
                gapWidthMax: 2,
            } )
new RandomGapRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new RandomGapChainRowBlock( { 
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
new BittyRowBlock( { 
                numObstacleRowsMin: 2,
                numObstacleRowsMax: 3,

                spacingMin: 1,
                spacingMax: 1,
                leadIn: 2,
                leadOut: 2,

            } )
new ZigzagRowBlock( { 
                segmentsMin: 5,
                segmentsMax: 7,

                numObstacleRowsPerSegmentMin: 5,
                numObstacleRowsPerSegmentMax: 10,

                spacing: 0,
                leadIn: 2,
                leadOut: 2,

                gapWidthMin: 3,
                gapWidthMax: 3,

                swingMin: 7,
                swingMax: Row.WIDTH - 1,

            } )
new ZigzagRowBlock( { 
                segmentsMin: 5,
                segmentsMax: 7,

                numObstacleRowsPerSegmentMin: 12,
                numObstacleRowsPerSegmentMax: 16,

                spacing: 0,
                leadIn: 2,
                leadOut: 2,

                gapWidthMin: 4,
                gapWidthMax: 4,

                swingMin: 6,
                swingMax: Row.WIDTH - 1,

                booster: true,
                boosterMod: 25,
                boosterImpulse: 600,
                boosterMultiplier: 1.6
            } )
new TunnelRowBlock( { 
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


RandomRowBlock 
RandomGapRowBlock 
RandomGapChainRowBlock 
TunnelRowBlock 
InsOutsRowBlock 
BittyRowBlock 
DiagonalRowBlock 
ZigzagRowBlock 
MovingSpikeBallRowBlock 
MovingSpikeBallGapRowBlock 

BoosterRowBlock
BoosterChainRowBlock

SpinningSpikeBallRowBlock 
AlternatingSpinningSpikeBallRowBlock 