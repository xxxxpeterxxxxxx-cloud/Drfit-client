package gg.drift.perf;

import gg.drift.core.DriftCore;
import gg.drift.core.DriftModule;
import net.fabricmc.api.ModInitializer;

public class DriftPerf extends DriftModule implements ModInitializer {
    private static DriftPerf instance;

    public DriftPerf() {
        super("driftperf", "Drift Performance", "0.1.0");
    }

    @Override
    public void onInitialize() {
        instance = this;
        DriftCore.getInstance().getModRegistry().register(this);
        DriftCore.LOGGER.info("Drift Performance module registered");
    }

    @Override
    public void onEnable() {
        DriftCore.LOGGER.info("Drift Performance enabled");
    }

    @Override
    public void onDisable() {
        DriftCore.LOGGER.info("Drift Performance disabled");
    }

    public static DriftPerf getInstance() {
        return instance;
    }
}
