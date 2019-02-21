import EntityDisplay from "./position";
import Concept from "./concept";
import IVector, {Vector} from "./vector";
import Drawer from "./drawer";
import Id, {IdGenerator} from "./id";

export default abstract class Entity extends Concept {
    public readonly display: EntityDisplay;
    public readonly pos: IVector;
    public readonly size: IVector;
    public readonly draw: Drawer;
    public readonly id: Id;

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.display = EntityDisplay.Absolute;
        this.pos = Vector.origin;
        this.size = Vector.origin;
        this.draw = new Drawer(this.$, this);
        this.id = IdGenerator.next();
    }

    public tag?: string;

    public abstract render(): void;
}
