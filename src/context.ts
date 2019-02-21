export default abstract class Context {
    public static fromElement(id: string): CanvasRenderingContext2D {
        const canvas: HTMLCanvasElement | undefined = document.getElementById(id) as HTMLCanvasElement | undefined;

        if (canvas == undefined) {
            throw new Error(`Canvas element with id '${id}' does not exist`);
        }

        return canvas.getContext("2d")!;
    }
}
