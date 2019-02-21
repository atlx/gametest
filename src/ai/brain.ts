import Brain from "../brain";
import IVector, {Vector} from "../vector";
import Entity from "../entity";
import Direction from "../direction";
import Util from "../util";

export default class AiBrain extends Brain {
    /**
     * Creates an array with random instructions of the specified length.
     */
    public static createRandomInsts(length: number, increment: number = 0): IVector[] {
        const result: IVector[] = [];

        for (let i: number = 0; i < length; i++) {
            result.push(Vector.increment(Direction.random(), increment));
        }

        return result;
    }

    protected insts: IVector[];
    protected increment?: number;

    /**
     * @param {number} instLength The amount of random instructions to create.
     */
    public constructor(instLength: number, increment?: number) {
        super();

        this.increment = increment;
        this.insts = AiBrain.createRandomInsts(instLength, this.increment);
    }

    public process(entity: Entity): void {
        const inst: IVector | undefined = this.insts.pop();

        if (inst == undefined) {
            // Destroy entity after using up all instructions.
            entity.destroy();

            return;
        }

        entity.translate(inst);
    }

    public getInsts(): IVector[] {
        // Clone instructions array to prevent returning reference.
        return [...this.insts];
    }

    public setInsts(insts: IVector[]): this {
        this.insts = insts;

        return this;
    }

    public mutate(): this {
        for (let i: number = 0; i < this.insts.length; i++) {
            if (Util.chance()) {
                this.insts[i] = Vector.increment(Direction.random(), this.increment || 0);
            }
        }

        return this;
    }
}
