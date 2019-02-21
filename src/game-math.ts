import IVector from "./vector";

export default class GameMath {
    /**
     * Compute the distance between two points.
     */
    public static distanceBetween(pointA: IVector, pointB: IVector) {
        return Math.sqrt(((pointA.x - pointB.x) ** 2) + ((pointA.y - pointB.y) ** 2));
    }
}
