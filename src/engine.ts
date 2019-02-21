import EventEmitter from "./event-emitter";
import EngineEvent from "./engine-event";
import Entity from "./entity";
import Id from "./id";

export type RenderCallback = (time: number) => void;

export default class Engine extends EventEmitter {
    protected fps: number;
    protected entities: Map<Id, Entity>;
    protected renderCallback: RenderCallback;
    protected running: boolean;

    public constructor(renderCallback: RenderCallback) {
        super();

        this.fps = 30;
        this.entities = new Map();
        this.renderCallback = renderCallback;
        this.running = false;
    }

    protected render(): void {
        this.renderCallback();
    }

    public start(): this {
        window.requestAnimationFrame((time: number) => {

        });

        return this;
    }

    public getFps(): number {
        return this.fps;
    }

    public setFPS(fps: number): this {
        this.fps = fps;
        this.emit(EngineEvent.FpsChanged);

        return this;
    }
}
