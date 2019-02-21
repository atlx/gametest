import Brain from "../brain";
import IVector, {Vector} from "../vector";
import Entity from "../entity";
import Direction from "../direction";

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

    /**
     * @param {number} instLength The amount of random instructions to create.
     */
    public constructor(instLength: number, increment?: number) {
        super();

        this.insts = AiBrain.createRandomInsts(instLength, increment);
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
}
