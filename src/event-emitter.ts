export type EventHandler = (...args: any[]) => void;

export default abstract class EventEmitter {
    protected handlers: Map<string, EventHandler[]>;

    public constructor() {
        this.handlers = new Map();
    }

    public on(event: string, handler: EventHandler): this {
        if (this.handlers.has(event) && this.handlers.get(event)!.includes(handler)) {
            this.handlers.get(event)!.push(handler);
        }

        this.handlers.set(event, [handler]);

        return this;
    }

    public emit(event: string, ...args: any[]): this {
        if (this.handlers.has(event)) {
            for (const handler of this.handlers.get(event)!) {
                handler(...args);
            }
        }

        return this;
    }
}
