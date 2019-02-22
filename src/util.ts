export default abstract class Util {
    /**
     * Returns either 1 or -1.
     */
    public static getRandomInverse(): number {
        return Util.getRandomInt(-1, 1) || 1;
    }

    /**
     * Randomly converts input number to either positive or negative.
     */
    public static randomlyInverse(input: number): number {
        return input * Util.getRandomInverse();
    }

    /**
     * Generate a random integer number between the specified range.
     */
    public static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static chance(percentage: number = 50): boolean {
        if (percentage < 1) {
            percentage = 1;
        }
        else if (percentage > 99) {
            percentage = 99;
        }

        return Util.getRandomInt(0, 100 - Math.round(percentage * 100)) === 0;
    }
}
