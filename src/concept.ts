export default abstract class Concept {
    protected readonly $: CanvasRenderingContext2D;

    public constructor(context: CanvasRenderingContext2D) {
        this.$ = context;
    }
}
