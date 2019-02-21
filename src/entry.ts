import Engine from "./engine";
import EngineEvent from "./engine-event";
import DotEntity from "./entities/dot";
import Context from "./context";

// Create the engine and link the canvas.
const engine: Engine = new Engine(Context.fromElement("game"), () => {
    console.log("Rendering");
});

// Setup event listeners.
engine.on(EngineEvent.Started, () => {
    engine.createEntity(DotEntity);
});

// Start the engine.
engine.start();

// Output the engine object for development support.
console.log(engine);
