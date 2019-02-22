import AiBrain from "./brain";
import Id from "../id";

export default interface AiNode {
    readonly id: Id;
    readonly fitness: number;
    readonly brain: AiBrain;

    destroy(): void;
}
