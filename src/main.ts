import Game from "./Game.js";
import Assets from "./rendering/Assets.js";

const UI_WIDTH = 150;

let game: Game;

function resize() {

    const aspect = 1 / 2;

    let gameplayWidth = window.innerWidth - UI_WIDTH;
    let gameplayHeight = window.innerHeight;

    if (gameplayWidth / gameplayHeight > aspect) {
        gameplayWidth = gameplayHeight * aspect;
    } else {
        gameplayHeight = gameplayWidth / aspect;
    }

    canvas.width = gameplayWidth + UI_WIDTH;
    canvas.height = gameplayHeight;
    if (game)
        game.resize();
}

const canvas = document.getElementById("gameCanvas")! as HTMLCanvasElement;

resize();
window.addEventListener("resize", resize);

await Assets.load();

game = new Game(canvas);
game.start();