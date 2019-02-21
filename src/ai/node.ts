import AiBrain from "./brain";

export default interface AiNode {
    readonly fitness: number;
    readonly brain: AiBrain;

    destroy(): void;
}
