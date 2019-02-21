import {EntityDisplay, EntityColor} from "./entity-props";
import IVector, {Vector} from "./vector";
import Drawer from "./drawer";
import Id, {IdGenerator} from "./id";
import {Color} from "./color";
import Behaviour from "./behaviour";
import Engine from "./engine";

export default abstract class Entity {
    public readonly draw: Drawer;
    public readonly id: Id;

    public pos: IVector;
    public size: IVector;
    public display: EntityDisplay;
    public tags: string[];
    public color: EntityColor;
    public behaviours: Behaviour[];

    protected readonly engine: Engine;
    protected readonly $: CanvasRenderingContext2D;

    public constructor(engine: Engine) {
        this.engine = engine;
        this.$ = engine.getContext();

        // Set default entity properties.
        this.display = EntityDisplay.Absolute;
        this.pos = Vector.origin;
        this.size = Vector.origin;
        this.draw = new Drawer(this.$, this);
        this.id = IdGenerator.next();
        this.tags = [];
        this.color = Color.White;
        this.behaviours = [];

        // Invoke the (possibly) inherited setup function.
        this.setup();
    }

    public setup(): void {
        //
    }

    /**
     * Prepare the entity to be rendered. Invoked by the engine.
     */
    public prepare(time: number): void {
        // Process all behaviours.
        for (const behaviour of this.behaviours) {
            behaviour.process(this, this.$, time);
        }
    }

    /**
     * Remove the node from the engine.
     */
    public destroy(): void {
        this.engine.removeEntity(this.id);
    }

    /**
     * Render the entity onto the canvas.
     */
    public abstract render(time: number): void;

    /**
     * Translate the position of the entity in a relative manner.
     */
    public translate(pos: Partial<IVector>): this {
        this.pos = {
            x: this.pos.x + (pos.x || 0),
            y: this.pos.y + (pos.y || 0)
        };

        return this;
    }
}
