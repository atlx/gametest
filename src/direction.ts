import IVector from "./vector";
import Util from "./util";

export default abstract class Direction {
    public static get topLeft(): IVector {
        return {
            x: -1,
            y: 1
        };
    }

    public static get topRight(): IVector {
        return {
            x: 1,
            y: 1
        };
    }

    public static get bottomLeft(): IVector {
        return {
            x: -1,
            y: -1
        };
    }

    public static get bottomRight(): IVector {
        return {
            x: 1,
            y: -1
        };
    }

    public static get up(): IVector {
        return {
            x: 0,
            y: 1
        };
    }

    public static get down(): IVector {
        return {
            x: 0,
            y: -1
        };
    }

    public static get right(): IVector {
        return {
            x: 1,
            y: 0
        };
    }

    public static get left(): IVector {
        return {
            x: -1,
            y: 0
        };
    }

    protected static randomMap: Map<number, IVector> = new Map([
        [0, Direction.topLeft],
        [1, Direction.topRight],
        [2, Direction.bottomLeft],
        [3, Direction.bottomRight],
        [4, Direction.left],
        [5, Direction.right],
        [6, Direction.up],
        [7, Direction.down]
    ]);

    public static random(): IVector {
        return this.randomMap.get(Util.getRandomInt(0, 7))!;
    }
}
