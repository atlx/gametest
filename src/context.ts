export default abstract class Context {
    public static findCanvas(id: string): HTMLCanvasElement {
        const canvas: HTMLCanvasElement | undefined = document.getElementById(id) as HTMLCanvasElement | undefined;

        if (canvas == undefined) {
            throw new Error(`Canvas element with id '${id}' does not exist`);
        }

        return canvas;
    }

    public static fromElement(id: string): CanvasRenderingContext2D {
        return this.findCanvas(id).getContext("2d")!;
    }
}
