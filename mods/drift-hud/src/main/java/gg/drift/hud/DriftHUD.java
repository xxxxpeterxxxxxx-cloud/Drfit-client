package gg.drift.hud;

import gg.drift.core.DriftCore;
import gg.drift.core.DriftModule;
import net.fabricmc.api.ModInitializer;

public class DriftHUD extends DriftModule implements ModInitializer {
    private static DriftHUD instance;

    public DriftHUD() {
        super("drifthud", "Drift HUD", "0.1.0");
    }

    @Override
    public void onInitialize() {
        instance = this;
        DriftCore.getInstance().getModRegistry().register(this);
        DriftCore.LOGGER.info("Drift HUD module registered");
    }

    @Override
    public void onEnable() {
        DriftCore.LOGGER.info("Drift HUD enabled");
    }

    @Override
    public void onDisable() {
        DriftCore.LOGGER.info("Drift HUD disabled");
    }

    public static DriftHUD getInstance() {
        return instance;
    }
}
