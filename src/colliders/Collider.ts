export default abstract class Collider {
    active: boolean = true;

    abstract overlaps(other: Collider|null): boolean;

    abstract draw(ctx: CanvasRenderingContext2D): void;
}