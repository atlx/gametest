import EventEmitter from "./event-emitter";
import EngineEvent from "./engine-event";
import Entity from "./entity";
import Id from "./id";

export default class Engine extends EventEmitter {
    protected fps: number;
    protected entities: Map<Id, Entity>;

    public constructor() {
        super();

        this.fps = 30;
        this.entities = new Map();
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
