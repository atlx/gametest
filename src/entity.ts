import EntityDisplay from "./position";
import Concept from "./concept";
import IVector, {Vector} from "./vector";
import Drawer from "./drawer";

export default abstract class Entity extends Concept {
    public readonly display: EntityDisplay = EntityDisplay.Absolute;
    public readonly pos: IVector = Vector.origin;
    public readonly size: IVector = Vector.origin;
    public readonly draw: Drawer = new Drawer(this.$, this);

    public tag?: string;

    public abstract render(): void;
}
