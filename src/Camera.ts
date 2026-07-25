export default class Camera {

    y = 0;
    smoothing = 5;

    reset() {
        this.y = 0;
    }

    update(dt: number, targetY: number): void {

        const desiredY = targetY - 120;

        this.y += (desiredY - this.y) * this.smoothing * dt;
    }
}