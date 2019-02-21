import Concept from "./concept";

export default abstract class Brain extends Concept {
    public abstract process(): void;
}
