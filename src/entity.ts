import {EntityDisplay, EntityColor} from "./entity-props";
import Concept from "./concept";
import IVector, {Vector} from "./vector";
import Drawer from "./drawer";
import Id, {IdGenerator} from "./id";
import {Color} from "./color";

export default abstract class Entity extends Concept {
    public readonly draw: Drawer;
    public readonly id: Id;

    public pos: IVector;
    public size: IVector;
    public display: EntityDisplay;
    public tags: string[];
    public color: EntityColor;

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.display = EntityDisplay.Absolute;
        this.pos = Vector.origin;
        this.size = Vector.origin;
        this.draw = new Drawer(this.$, this);
        this.id = IdGenerator.next();
        this.tags = [];
        this.color = Color.White;

        // Invoke the (possibly) inherited setup function.
        this.setup();
    }

    public setup(): void {
        //
    }

    public abstract render(time: number): void;
}
