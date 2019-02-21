import Entity from "../entity";
import GameMath from "../game-math";
import {Flag} from "../entry";
import AiNode from "../ai/node";
import AiBrain from "../ai/brain";

export default class DotEntity extends Entity implements AiNode {
    public brain!: AiBrain;

    public get distanceToFlag(): number {
        return GameMath.distanceBetween(this.pos, Flag.pos);
    }

    public get fitness(): number {
        return 1 / (this.distanceToFlag ** 2);
    }

    public setup(): void {
        this.size = {
            x: 3,
            y: 3
        };

        this.speed = 1;
        this.friction = 0.98;
        this.brain = new AiBrain(100_000, 3);
    }

    public render(): void {
        this.draw.circle();
    }
}
