package gg.drift.hud;

import gg.drift.core.DriftCore;
import gg.drift.core.DriftModule;
import gg.drift.hud.hud.*;
import net.fabricmc.api.ModInitializer;

public class DriftHUD extends DriftModule implements ModInitializer {
    private static DriftHUD instance;

    private FpsCounter fpsCounter;
    private PingDisplay pingDisplay;
    private CpsCounter cpsCounter;
    private CoordinatesDisplay coordinatesDisplay;
    private KeystrokesOverlay keystrokesOverlay;

    public DriftHUD() {
        super("drifthud", "Drift HUD", "0.1.0");
    }

    @Override
    public void onInitialize() {
        instance = this;
        DriftCore.getInstance().getModRegistry().register(this);

        fpsCounter = new FpsCounter();
        pingDisplay = new PingDisplay();
        cpsCounter = new CpsCounter();
        coordinatesDisplay = new CoordinatesDisplay();
        keystrokesOverlay = new KeystrokesOverlay();

        HudRegistry.register(fpsCounter);
        HudRegistry.register(pingDisplay);
        HudRegistry.register(cpsCounter);
        HudRegistry.register(coordinatesDisplay);
        HudRegistry.register(keystrokesOverlay);

        DriftCore.LOGGER.info("Drift HUD module registered with 5 elements");
    }

    @Override
    public void onEnable() {
        DriftCore.LOGGER.info("Drift HUD enabled");
    }

    @Override
    public void onDisable() {
        DriftCore.LOGGER.info("Drift HUD disabled");
    }

    public FpsCounter getFpsCounter() { return fpsCounter; }
    public PingDisplay getPingDisplay() { return pingDisplay; }
    public CpsCounter getCpsCounter() { return cpsCounter; }
    public CoordinatesDisplay getCoordinatesDisplay() { return coordinatesDisplay; }
    public KeystrokesOverlay getKeystrokesOverlay() { return keystrokesOverlay; }

    public static DriftHUD getInstance() {
        return instance;
    }
}
