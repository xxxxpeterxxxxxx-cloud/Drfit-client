package gg.drift.perf;

import gg.drift.core.DriftCore;
import gg.drift.core.DriftModule;
import gg.drift.core.config.DriftConfig;
import net.fabricmc.api.ModInitializer;

public class DriftPerf extends DriftModule implements ModInitializer {
    private static DriftPerf instance;
    public static DriftConfig.PerfConfig config = new DriftConfig.PerfConfig();

    public DriftPerf() {
        super("driftperf", "Drift Performance", "0.2.0");
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
        loadConfig();
    }

    @Override
    public void onDisable() {
        DriftCore.LOGGER.info("Drift Performance disabled");
    }

    private void loadConfig() {
        config = DriftCore.getInstance().getConfigManager()
            .loadConfig("perf", DriftConfig.PerfConfig.class, new DriftConfig.PerfConfig());
        DriftCore.LOGGER.info("Performance config loaded: sodium={}, lithium={}, ferritecore={}, iris={}",
            config.sodium, config.lithium, config.ferriteCore, config.iris);
    }

    public static DriftPerf getInstance() {
        return instance;
    }
}
