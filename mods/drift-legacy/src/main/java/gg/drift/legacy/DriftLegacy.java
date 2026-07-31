package gg.drift.legacy;

import gg.drift.core.DriftCore;
import gg.drift.core.DriftModule;
import net.fabricmc.api.ModInitializer;

public class DriftLegacy extends DriftModule implements ModInitializer {
    private static DriftLegacy instance;

    public DriftLegacy() {
        super("driftlegacy", "Drift Legacy", "0.1.0");
    }

    @Override
    public void onInitialize() {
        instance = this;
        DriftCore.getInstance().getModRegistry().register(this);
        DriftCore.LOGGER.info("Drift Legacy (1.8.9) module registered");
    }

    @Override
    public void onEnable() {
        DriftCore.LOGGER.info("Drift Legacy enabled");
    }

    @Override
    public void onDisable() {
        DriftCore.LOGGER.info("Drift Legacy disabled");
    }

    public static DriftLegacy getInstance() {
        return instance;
    }
}
