import TextEntity from "./text";
import {Vector} from "../vector";

export default class GenCounterEntity extends TextEntity {
    protected counter: number;

    public constructor() {
        super("Generation ?");

        this.counter = 0;
    }

    public setup(): void {
        this.pos = Vector.merge(this.pos, this.engine.align.bottom);
    }

    public render(): void {
        this.text = `Generation ${this.counter + 1}`;
        super.render();
    }

    public increment(): this {
        this.counter++;

        return this;
    }

    public reset(): this {
        this.counter = 0;

        return this;
    }

    public getGen(): number {
        return this.counter;
    }
}
