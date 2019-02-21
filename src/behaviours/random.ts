import Behaviour from "../behaviour";
import Entity from "../entity";
import {Vector} from "../vector";

export default class RandomBehaviour extends Behaviour {
    public readonly speedMultiplier: number;

    public constructor(speedMultiplier: number = 1) {
        super();

        this.speedMultiplier = speedMultiplier;
    }

    public process(entity: Entity): void {
        entity.velocity = Vector.randomlyInverse(Vector.random(1, 2));
    }
}
