import Engine from "./engine";
import IVector from "./vector";

export default class Alignment {
    protected readonly engine: Engine;

    protected marginSize: number;
    protected paddingSize: number;

    public constructor(engine: Engine) {
        this.engine = engine;
        this.marginSize = 0;
        this.paddingSize = 0;
    }

    public margin(margin: number): this {
        this.marginSize = margin;

        return this;
    }

    public padding(padding: number): this {
        this.paddingSize = padding;

        return this;
    }

    public get bottom(): Partial<IVector> {
        return {
            y: this.engine.canvasSize.y - this.marginSize
        };
    }
}
