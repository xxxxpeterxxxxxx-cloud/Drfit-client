package gg.drift.core;

import net.fabricmc.api.ModInitializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DriftCore implements ModInitializer {
    public static final String MOD_ID = "driftcore";
    public static final Logger LOGGER = LoggerFactory.getLogger("Drift Client");

    private static DriftCore instance;

    private ConfigManager configManager;
    private ModRegistry modRegistry;
    private EventBus eventBus;

    @Override
    public void onInitialize() {
        instance = this;
        LOGGER.info("Drift Client core initializing...");

        this.eventBus = new EventBus();
        this.configManager = new ConfigManager();
        this.modRegistry = new ModRegistry();

        configManager.load();
        modRegistry.registerCoreModules();

        LOGGER.info("Drift Client core initialized. {} modules registered.", modRegistry.getModuleCount());
    }

    public static DriftCore getInstance() {
        return instance;
    }

    public ConfigManager getConfigManager() {
        return configManager;
    }

    public ModRegistry getModRegistry() {
        return modRegistry;
    }

    public EventBus getEventBus() {
        return eventBus;
    }
}
