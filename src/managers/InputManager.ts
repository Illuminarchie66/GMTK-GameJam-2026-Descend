export enum Action {
    MoveLeft,
    MoveRight,
    MoveUp,
    MoveDown,
    Interact,
    Escape
}

export default class InputManager {

    private current = new Map<Action, boolean>();
    private previous = new Map<Action, boolean>();

    constructor() {
        for (const action of Object.values(Action).filter(v => typeof v === "number") as Action[]) {
            this.current.set(action, false);
            this.previous.set(action, false);
        }

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

    }

    private setAction(action: Action, value: boolean) {
        this.current.set(action, value);
    }

    private onKeyDown(e: KeyboardEvent) {
        if (e.key === "ArrowRight")
            this.setAction(Action.MoveRight, true);

        if (e.key === "d")
            this.setAction(Action.MoveRight, true);

        if (e.key === "ArrowLeft")
            this.setAction(Action.MoveLeft, true);

        if (e.key === "a")
            this.setAction(Action.MoveLeft, true);

        if (e.key === "ArrowUp")
            this.setAction(Action.MoveUp, true);

        if (e.key === "w")
            this.setAction(Action.MoveUp, true);

        if (e.key === "ArrowDown")
            this.setAction(Action.MoveDown, true);

        if (e.key === "s")
            this.setAction(Action.MoveDown, true);

        if (e.key === " ")
            this.setAction(Action.Interact, true);

        if (e.key === "Escape")
            this.setAction(Action.Escape, true);
    }

    private onKeyUp(e: KeyboardEvent) {
        if (e.key === "ArrowRight")
            this.setAction(Action.MoveRight, false);

        if (e.key === "d")
            this.setAction(Action.MoveRight, false);

        if (e.key === "ArrowLeft")
            this.setAction(Action.MoveLeft, false);

        if (e.key === "a")
            this.setAction(Action.MoveLeft, false);

        if (e.key === "ArrowUp")
            this.setAction(Action.MoveUp, false);

        if (e.key === "w")
            this.setAction(Action.MoveUp, false);

        if (e.key === "ArrowDown")
            this.setAction(Action.MoveDown, false);

        if (e.key === "s")
            this.setAction(Action.MoveDown, false);

        if (e.key === " ")
            this.setAction(Action.Interact, false);

        if (e.key === "Escape")
            this.setAction(Action.Escape, false);
    }

    isHeld(action: Action): boolean {
        return this.current.get(action)!;
    }

    wasPressed(action: Action): boolean {
        return this.current.get(action)! && !this.previous.get(action)!;
    }

    wasReleased(action: Action): boolean {
        return !this.current.get(action)! && this.previous.get(action)!;
    }

    update() {
        for (const [action, pressed] of this.current) {
            this.previous.set(action, pressed);
        }
    }
}
