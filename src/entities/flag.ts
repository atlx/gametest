import Entity from "../entity";
import {Color} from "../color";

export default class FlagEntity extends Entity {
    public setup(): void {
        this.size = {
            x: 10,
            y: 10
        };

        this.pos = {
            x: 600,
            y: 500
        };

        this.color = Color.Red;
    }

    public render(): void {
        this.draw.circle();
    }
}
