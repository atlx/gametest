import Behaviour from "../behaviour";
import Entity from "../entity";
import Util from "../util";

export default class RandomBehaviour extends Behaviour {
    public readonly speedMultiplier: number;

    public constructor(speedMultiplier: number = 1) {
        super();

        this.speedMultiplier = speedMultiplier;
    }

    public process(entity: Entity): void {
        entity.translate({
            x: Util.randomlyInverse(Math.random() * this.speedMultiplier),
            y: Util.randomlyInverse(Math.random() * this.speedMultiplier)
        });
    }
}
