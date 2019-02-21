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
    Started = "started"
}

export default EngineEvent;
