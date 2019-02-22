import EventEmitter from "./event-emitter";
import EngineEvent from "./engine-event";
import Entity from "./entity";
import Id from "./id";
import IVector, {Vector} from "./vector";
import {EntityRenderStrategy} from "./entity-props";
import Alignment from "./alignment";

export type RenderCallback = (time: number) => void;

// TODO: Make use of FPS (instead of window.requestAnimationCallback).
export default class Engine extends EventEmitter {
    public readonly align: Alignment;

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
        this.align = new Alignment(this);

        // Force-bind the render loop.
        this.prepareRender = this.prepareRender.bind(this);
    }

    public get canvasSize(): IVector {
        return {
            x: this.canvas.width,
            y: this.canvas.height
        };
    }

    public registerEntity(entity: Entity): this {
        this.entities.set(entity.id, entity);
        entity.setEngine(this);

        // Invoke the entity's setup method.
        entity.setup();

        return this;
    }

    public createEntity(entityType: any): any {
        const entity: Entity = new entityType();

        // Register the newly created entity automatically.
        this.registerEntity(entity);

        return entity;
    }

    /**
     * Process entities and rendering.
     */
    protected render(time: number): void {
        // Clear canvas.
        this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Invoke all the entities' render function.
        for (const entity of this.entities.values()) {
            entity.prepare(time);

            // Render if the entity is visible.
            if (entity.visible) {
                entity.render(time);
            }

            // Invoke post-render handler.
            entity.postRender(time);

            // Apply entity's velocity to it's position.
            let velocity: IVector = entity.velocity;

            if (entity.renderStrategy == EntityRenderStrategy.Smooth) {
                velocity = {
                    x: entity.velocity.x * entity.getFriction(),
                    y: entity.velocity.y * entity.getFriction()
                };
            }

            entity.pos = Vector.add(entity.pos, velocity);

            // Apply entity speed.
            entity.pos = {
                x: entity.pos.x + entity.getSpeed(),
                y: entity.pos.y + entity.getSpeed()
            };
        }

        // Invoke the render callback.
        if (this.renderCallback !== undefined) {
            this.renderCallback(time);
        }
    }

    protected prepareRender(time: number): void {
        // Invoke the render function.
        this.render(time);

        // Verify the game is still running.
        if (this.running) {
            window.requestAnimationFrame(this.prepareRender);
        }
    }

    public start(): this {
        if (!this.running) {
            this.running = true;
            this.emit(EngineEvent.Started);

            // Being the render loop.
            window.requestAnimationFrame(this.prepareRender);
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

    public getEntity(id: Id): Entity | undefined {
        return this.entities.get(id);
    }

    public hasEntity(id: Id): boolean {
        return this.entities.has(id);
    }

    public removeEntity(id: Id): this {
        if (this.entities.has(id)) {
            this.entities.delete(id);
            this.emit(EngineEvent.EntityRemoved, this.entities.get(id)!);
        }

        return this;
    }

    public findEntitiesByTags(...tags: string[]): Entity[] {
        const result: Entity[] = [];

        for (const [id, entity] of this.entities) {
            for (const tag of tags) {
                if (entity.tags.includes(tag)) {
                    result.push(entity);

                    break;
                }
            }
        }

        return result;
    }

    public findEntitiesOfType(type: any): Entity[] {
        const result: Entity[] = [];

        for (const [id, entity] of this.entities) {
            if (entity instanceof type) {
                result.push(entity);
            }
        }

        return result;
    }
}
