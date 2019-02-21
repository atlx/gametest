export default interface IVector {
    readonly x: number;
    readonly y: number;
}

export abstract class Vector {
    public static get origin(): IVector {
        return {
            x: 0,
            y: 0
        };
    }
}
