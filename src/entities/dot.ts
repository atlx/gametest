import Entity from "../entity";

export default class DotEntity extends Entity {
    public setup(): void {
        this.size = {
            x: 40,
            y: 40
        };
    }

    public render(): void {
        this.draw.rect();
    }
}
