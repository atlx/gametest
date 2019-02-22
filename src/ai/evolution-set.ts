import AiNode from "./node";
import Util from "../util";
import Id from "../id";

export type SpawnCallback = () => AiNode;

export type NodeMutator = (node: AiNode) => AiNode;

export enum GeneType {
    Speed,
    Acceleration,
    Direction,
    Velocity
}

export interface IGene {
    readonly chance: number;
    readonly type: any;
    readonly value: any;
}

export interface EvolutionSetOpts {
    readonly populationSize: number;
    readonly evolutionTime: number;
    readonly mutationFactor: number;
    readonly strandLength: number;
}

const DefaultEvolutionSetOpts: EvolutionSetOpts = {
    /**
     * The maximun time a generation may live for.
     */
    evolutionTime: 5000,

    /**
     * The amount of nodes that will be spawned each new generation.
     */
    populationSize: 50,

    /**
     * The percentage representing the probability of a mutation occurring.
     */
    mutationFactor: 5,

    strandLength: 50
};

export default class EvolutionSet {
    protected readonly options: EvolutionSetOpts;
    protected readonly population: AiNode[];
    protected readonly breedingPool: Map<Id, number>;

    protected gen!: number;
    protected interval?: number;

    public constructor(options?: Partial<EvolutionSetOpts>) {
        this.options = {
            ...DefaultEvolutionSetOpts,
            ...options
        };

        this.population = [];
        this.breedingPool = new Map();

        // Apply default property values.
        this.reset();
    }

    public reset(): this {
        this.population.length = 0;
        this.gen = 0;

        return this;
    }

    public getGen(): number {
        return this.gen;
    }

    public begin(spawnCallback: SpawnCallback): this {
        // Stop running evolution if applicable.
        this.stop();

        const cycle = () => {
            this.nextGen(spawnCallback);
        };

        this.interval = setInterval(cycle, this.options.evolutionTime);

        // Invoke cycle initially.
        cycle();

        return this;
    }

    public stop(): this {
        if (this.interval !== undefined) {
            clearInterval(this.interval);
        }

        return this;
    }

    protected nextGen(spawnCallback: SpawnCallback): this {
        if (this.population.length === 0 && this.gen !== 0) {
            throw new Error("The evolution set contains no nodes");
        }

        if (this.gen !== 0) {
            // Measure, mutate, and destroy existing nodes.
            for (const node of this.population) {
                const fitness: number = node.fitness;

                this.breedingPool.set(node.id, fitness);

                // Destroy node if applicable.
                if (!Util.chance(fitness)) {
                    node.destroy();
                    this.breedingPool.delete(node.id);
                    this.population.splice(this.population.indexOf(node), 1);
                }

                // Mutate if applicable.
                if (Util.chance(this.options.mutationFactor)) {
                    node.brain.mutate();
                }
            }
        }

        // Spawn nodes.
        for (let i: number = 0; i < this.options.populationSize; i++) {
            const node: AiNode = spawnCallback();

            this.population.push(node);

            return this;
        }

        return this;
    }
}
