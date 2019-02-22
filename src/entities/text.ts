import Entity from "../entity";
import {Vector} from "../vector";

export default class TextEntity extends Entity {
    public text: string;
    public fontSize: number;

    public constructor(text: string, fontSize: number = 17) {
        super();

        this.text = text;
        this.fontSize = fontSize;

        // Force-bind the render method.
        this.render = this.render.bind(this);
    }

    public render(): void {
        this.$.font = `${this.fontSize}px monospace`;
        this.$.fillStyle = this.color;
        this.$.fillText(this.text, this.pos.x, this.pos.y);
    }
}
