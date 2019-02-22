import Util from "./util";

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

    public static random(min: number, max: number): IVector {
        return {
            x: Util.getRandomInt(min, max),
            y: Util.getRandomInt(min, max)
        };
    }

    public static inverse(vector: IVector): IVector {
        return {
            x: -vector.x,
            y: -vector.y
        };
    }

    public static randomlyInverse(vector: IVector): IVector {
        return {
            x: Util.randomlyInverse(vector.x),
            y: Util.randomlyInverse(vector.y)
        };
    }

    /**
     * Combine two vectors into a single vector by adding its coordinates.
     */
    public static add(vectorA: IVector, vectorB: IVector): IVector {
        return {
            x: vectorA.x + vectorB.x,
            y: vectorA.y + vectorB.y
        };
    }

    public static fromSingle(value: number): IVector {
        return {
            x: value,
            y: value
        };
    }

    public static increment(vector: IVector, by: number): IVector {
        return Vector.add(vector, Vector.fromSingle(by));
    }

    /**
     * Merge two (possibly) partial vectors into a single vector.
     */
    public static merge(vectorA: Partial<IVector>, vectorB: Partial<IVector>): IVector {
        return {
            x: (vectorA.x || 0) + (vectorB.x || 0),
            y: (vectorA.y || 0) + (vectorB.y || 0)
        };
    }
}
