import Entity from "../entity";

export default class DotEntity extends Entity {
    public render(): void {
        this.draw.rect();
    }
}
