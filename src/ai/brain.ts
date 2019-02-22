import Brain from "../brain";
import IVector, {Vector} from "../vector";
import Entity from "../entity";
import Direction from "../direction";
import Util from "../util";
import AiNode from "./node";

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

    protected entity!: Entity & AiNode;
    protected insts: IVector[];
    protected mutationQueue: number[];
    protected increment?: number;
    protected counter: number;
    protected lastFitness: number;

    /**
     * @param {number} instLength The amount of random instructions to create.
     */
    public constructor(instLength: number, increment?: number) {
        super();

        this.increment = increment;
        this.mutationQueue = [];
        this.insts = AiBrain.createRandomInsts(instLength, this.increment);
        this.counter = 0;
        this.lastFitness = -1;
    }

    public process(node: Entity & AiNode): void {
        const inst: IVector | undefined = this.insts[++this.counter];

        if (inst == undefined) {
            // Destroy entity after using up all instructions.
            node.destroy();

            return;
        }

        node.translate(inst);
        this.lastFitness = node.fitness;
    }

    public postRender(): void {
        // Add bad instruction to mutation queue.
        if (this.lastFitness !== -1 && this.entity.fitness < this.lastFitness) {
            this.mutationQueue.push(this.counter);
        }
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
        for (let i: number = 0; i < this.mutationQueue.length; i++) {
            if (Util.chance()) {
                this.insts[this.mutationQueue[i]] = Vector.increment(Direction.random(), this.increment || 0);
            }
        }

        return this;
    }
}
