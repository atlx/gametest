import Engine from "./engine";
import EngineEvent from "./engine-event";
import Context from "./context";
import DotEntity from "./entities/dot";
import FlagEntity from "./entities/flag";

// Export the flag for global use.
export let Flag: FlagEntity = null as any;

let spawnInterval: number | undefined = undefined;

// Create the engine and link the canvas.
const engine: Engine = new Engine(Context.findCanvas("game"), () => {
    console.log("Rendering");
});

// Setup event listeners.
engine.on(EngineEvent.Started, () => {
    // Clear spawn interval if applicable.
    if (spawnInterval !== undefined) {
        clearInterval(spawnInterval);
    }

    // Create and assign the global flag.
    Flag = engine.createEntity(FlagEntity);

    spawnInterval = setInterval(() => {
        engine.createEntity(DotEntity);
    }, 3000);
});

// Start the engine.
engine.start();

// Output the engine object for development support.
console.log(engine);
