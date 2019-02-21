import Entity from "./entity";

export default abstract class Brain {
    public abstract process(entity: Entity, context: CanvasRenderingContext2D, time: number): void;
}
