import TextEntity from "./text";
import {Vector} from "../vector";

export default class GenCounterEntity extends TextEntity {
    protected counter: number;

    public constructor() {
        super("Generation ?");

        this.counter = 0;
    }

    public setup(): void {
        this.mergePos(this.engine.align.margin(10).bottom, this.engine.align.left);
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
