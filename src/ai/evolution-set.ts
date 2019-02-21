import AiNode from "./node";

export interface EvolutionSetOpts {
    readonly nodesPerGeneration: number;
    readonly evolutionTime: number;
}

const DefaultEvolutionSetOpts: EvolutionSetOpts = {
    evolutionTime: 5000,
    nodesPerGeneration: 50
};

export default class EvolutionSet {
    protected readonly options: EvolutionSetOpts;
    protected readonly nodes: AiNode[];

    public constructor(options: Partial<EvolutionSetOpts>) {
        this.options = {
            ...DefaultEvolutionSetOpts,
            ...options
        };
    }

    public registerNde(node: AiNode): this {
        if (!this.nodes.includes(node)) {
            this.nodes.push(node);
        }

        return this;
    }

    public nextGeneration(): this {
        let bestNode: AiNode = null;

        for (const node of this.nodes) {
            // Replace existing best node if applicable.
            if (bestNode === null || node.fitness > bestNode.fitness) {
                bestNode = node;
            }

            // Destroy the node.
            node.destroy();
        }

        // TODO

        return this;
    }
}
