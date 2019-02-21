import Concept from "./concept";

export default abstract class Behaviour extends Concept {
    public abstract process(): void;
}
