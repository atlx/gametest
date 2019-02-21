import EventEmitter from "./event-emitter";
import EngineEvent from "./engine-event";
import Entity from "./entity";
import Id from "./id";

export type RenderCallback = (time: number) => void;

// TODO: Make use of FPS (instead of window.requestAnimationCallback).
export default class Engine extends EventEmitter {
    protected readonly renderCallback?: RenderCallback;
    protected readonly entities: Map<Id, Entity>;
    protected readonly canvas: HTMLCanvasElement;
    protected readonly $: CanvasRenderingContext2D;

    protected fps: number;
    protected running: boolean;
    protected gameLoopInterval?: number;

    public constructor(canvas: HTMLCanvasElement, renderCallback?: RenderCallback) {
        super();

        this.canvas = canvas;
        this.$ = this.canvas.getContext("2d")!;
        this.fps = 30;
        this.entities = new Map();
        this.renderCallback = renderCallback;
        this.running = false;

        // Force-bind the render loop.
        this.renderLoop = this.renderLoop.bind(this);
    }

    public registerEntity(entity: Entity): this {
        this.entities.set(entity.id, entity);

        return this;
    }

    public createEntity(entityType: any): any {
        const entity: Entity = new entityType(this);

        // Register the newly created entity automatically.
        this.registerEntity(entity);

        return entity;
    }

    protected render(time: number): void {
        // Clear canvas.
        this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Invoke all the entities' render function.
        for (const entity of this.entities.values()) {
            entity.prepare(time);
            entity.render(time);
        }

        // Invoke the render callback.
        if (this.renderCallback !== undefined) {
            this.renderCallback(time);
        }
    }

    protected renderLoop(time: number): void {
        // Invoke the render function.
        this.render(time);

        // Verify the game is still running.
        if (this.running) {
            window.requestAnimationFrame(this.renderLoop);
        }
    }

    public start(): this {
        if (!this.running) {
            this.running = true;
            this.emit(EngineEvent.Started);

            // Being the render loop.
            window.requestAnimationFrame(this.renderLoop);
        }

        return this;
    }

    public stop(): this {
        if (this.running) {
            this.running = false;
            this.emit(EngineEvent.Stopped);
        }

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

    public getContext(): CanvasRenderingContext2D {
        return this.$;
    }

    public hasEntity(id: Id): boolean {
        return this.entities.has(id);
    }

    public removeEntity(id: Id): this {
        this.entities.delete(id);

        return this;
    }
}
