package gg.drift.legacy;

import net.fabricmc.api.ModInitializer;
import java.util.logging.Logger;

public class DriftLegacy implements ModInitializer {
    public static final Logger LOGGER = Logger.getLogger("Drift Legacy");
    private static DriftLegacy instance;

    @Override
    public void onInitialize() {
        instance = this;
        LOGGER.info("Drift Legacy (1.8.9) initialized");
        LOGGER.info("  Features: ToggleSprint (V), Zoom (C), FPS, Ping, CPS, Keystrokes");
    }

    public static DriftLegacy getInstance() {
        return instance;
    }
}
