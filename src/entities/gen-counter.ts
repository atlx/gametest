import TextEntity from "./text";

export default class GenCounterEntity extends TextEntity {
    protected counter: number;

    public constructor() {
        super("Generation ?");

        this.counter = 0;
    }

    public setup(): void {
        this.pos = {
            x: 100,
            y: 500
        };
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
