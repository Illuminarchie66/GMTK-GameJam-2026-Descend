export default class Assets {
    static mountainBackground = new Image();
    static dirtCave = new Image();
    static crystalCave = new Image();
    static playerSprite = new Image();

    static async load() {
        await Promise.all([
            this.loadImage(
                this.mountainBackground,
                "assets/landscape.png"
            ),
            this.loadImage(
                this.dirtCave,
                "assets/dirt_cave.png"
            ),
            this.loadImage(
                this.crystalCave,
                "assets/crystal_cave.png"
            ),
            this.loadImage(
                this.playerSprite,
                "assets/dee.png"
            ),
            this.loadFont(
                "SilkScreen",
                "assets/fonts/slkscr.ttf"
            )
        ]);
    }

    private static loadImage(
        image: HTMLImageElement,
        src: string
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            image.src = src;
            image.onload = () => resolve();
            image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
    }

    private static async loadFont(
        fontName: string,
        src: string
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const font = new FontFace(
                fontName,
                'url(' + src + ')'
            );

            font.load().then(() => {
                document.fonts.add(font);
                resolve();
            }).catch((error) => {
                reject(new Error(`Failed to load font: ${fontName} from ${src}. Error: ${error}`));
            });
        });
    }
}