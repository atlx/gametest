enum EngineEvent {
    /**
     * The engine's FPS target was modified.
     */
    FpsChanged = "fpsChanged",

    /**
     * The render loop was stopped.
     */
    Stopped = "stopped",

    /**
     * The render loop was started.
     */
    Started = "started",

    /**
     * An entity was destroyed and is no longer being tracked and rendered.
     */
    EntityRemoved = "entityRemoved"
}

export default EngineEvent;
