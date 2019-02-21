import Entity from "../entity";
import RandomBehaviour from "../behaviours/random";
import GameMath from "../game-math";
import {Flag} from "../entry";
import AiNode from "../ai/node";

export default class DotEntity extends Entity implements AiNode {
    public get distanceToFlag(): number {
        return GameMath.distanceBetween(this.pos, Flag.pos);
    }

    public get fitness(): number {
        return this.distanceToFlag;
    }

    public setup(): void {
        this.size = {
            x: 5,
            y: 5
        };

        this.behaviours.push(new RandomBehaviour(5));
    }

    public render(): void {
        this.draw.rect();
    }
}
