import Entity from "./entity";

export default abstract class Brain {
    protected entity!: Entity;

    public abstract process(entity: Entity, context: CanvasRenderingContext2D, time: number): void;

    public postRender(time: number): void {
        //
    }

    public setEntity(entity: Entity): this {
        this.entity = entity;

        return this;
    }

    public clone(): Brain {
        return Object.assign({}, this);
    }
}
