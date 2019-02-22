import Entity from "../entity";

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
        this.$.fillStyle = this.color;
        this.$.fillText(this.text, this.pos.x, this.pos.y);
    }
}
