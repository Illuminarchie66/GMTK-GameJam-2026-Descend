import Game from "./Game.js";
import Assets from "./rendering/Assets.js";

function resize(){

    const aspect = 1/2;

    let width = window.innerWidth;
    let height = window.innerHeight;

    if(width/height > aspect){
        width = height * aspect;
    }
    else{
        height = width / aspect;
    }

    canvas.width = width;
    canvas.height = height;
}


const canvas = document.getElementById("gameCanvas")! as HTMLCanvasElement;

resize();
window.addEventListener("resize", resize);

await Assets.load();

const game = new Game(canvas);
game.start();