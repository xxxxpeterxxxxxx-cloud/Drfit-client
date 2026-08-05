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
    private ComboCounter comboCounter;
    private ReachDisplay reachDisplay;

    public DriftHUD() {
        super("drifthud", "Drift HUD", "0.2.0");
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
        comboCounter = new ComboCounter();
        reachDisplay = new ReachDisplay();

        HudRegistry.register(fpsCounter);
        HudRegistry.register(pingDisplay);
        HudRegistry.register(cpsCounter);
        HudRegistry.register(coordinatesDisplay);
        HudRegistry.register(keystrokesOverlay);
        HudRegistry.register(comboCounter);
        HudRegistry.register(reachDisplay);

        DriftCore.LOGGER.info("Drift HUD v0.2.0 registered with 7 elements");
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
    public ComboCounter getComboCounter() { return comboCounter; }
    public ReachDisplay getReachDisplay() { return reachDisplay; }

    public static DriftHUD getInstance() {
        return instance;
    }
}
