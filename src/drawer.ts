import Entity from "./entity";
import Concept from "./concept";

export default class Drawer extends Concept {
    protected entity: Entity;

    public constructor(context: CanvasRenderingContext2D, entity: Entity) {
        super(context);

        this.entity = entity;
    }

    public rect(): this {
        this.$.fillStyle = this.entity.color;
        this.$.fillRect(this.entity.pos.x, this.entity.pos.y, this.entity.size.x, this.entity.size.y);

        return this;
    }
}
