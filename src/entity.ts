import {EntityDisplay, EntityColor, EntityRenderStrategy} from "./entity-props";
import IVector, {Vector} from "./vector";
import Drawer from "./drawer";
import Id, {IdGenerator} from "./id";
import {Color} from "./color";
import Behaviour from "./behaviour";
import Engine from "./engine";
import Brain from "./brain";

export default abstract class Entity {
    public readonly draw: Drawer;
    public readonly id: Id;

    public renderStrategy: EntityRenderStrategy;
    public pos: IVector;
    public size: IVector;
    public velocity: IVector;
    public display: EntityDisplay;
    public tags: string[];
    public color: EntityColor;
    public behaviours: Behaviour[];
    public brain?: Brain;
    public visible: boolean;
    public zPosition: number;

    protected friction: number;
    protected speed: number;

    protected readonly engine: Engine;
    protected readonly $: CanvasRenderingContext2D;

    public constructor(engine: Engine) {
        this.engine = engine;
        this.$ = engine.getContext();

        // Set default entity properties.
        this.renderStrategy = EntityRenderStrategy.Smooth;
        this.display = EntityDisplay.Absolute;
        this.pos = Vector.origin;
        this.size = Vector.origin;
        this.velocity = Vector.origin;
        this.draw = new Drawer(this.$, this);
        this.id = IdGenerator.next();
        this.tags = [];
        this.color = Color.White;
        this.behaviours = [];
        this.speed = 1;
        this.friction = 1;
        this.visible = true;
        this.zPosition = 1;

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
        // Process brain if applicable.
        if (this.brain !== undefined) {
            this.brain.process(this, this.engine.getContext(), time);
        }

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

    public getSpeed(): number {
        if (this.speed == 1) {
            return 0;
        }

        return this.speed;
    }

    public setSpeed(speed: number): this {
        if (speed < 1) {
            speed = 1;
        }

        this.speed = speed;

        return this;
    }

    public getFriction(): number {
        return this.friction;
    }

    public setFriction(friction: number): this {
        if (friction < 1) {
            friction = 1;
        }

        this.friction = 1;

        return this;
    }

    public clone(): Entity {
        return Object.assign({}, this);
    }
}
