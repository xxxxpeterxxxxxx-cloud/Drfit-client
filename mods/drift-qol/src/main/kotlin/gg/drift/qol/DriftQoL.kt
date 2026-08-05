package gg.drift.qol

import gg.drift.core.DriftCore
import gg.drift.core.DriftModule
import gg.drift.core.config.DriftConfig
import gg.drift.qol.features.*
import net.fabricmc.api.ModInitializer

class DriftQoL : DriftModule("driftqol", "Drift QoL", "0.2.0"), ModInitializer {

    companion object {
        lateinit var instance: DriftQoL
            private set
        var config: DriftConfig.QolConfig = DriftConfig.QolConfig()
    }

    override fun onInitialize() {
        instance = this
        DriftCore.getInstance().modRegistry.register(this)
        DriftCore.LOGGER.info("Drift QoL module registered")
    }

    override fun onEnable() {
        DriftCore.LOGGER.info("Drift QoL enabled")
        loadConfig()
        QoLKeybinds.register()
    }

    override fun onDisable() {
        DriftCore.LOGGER.info("Drift QoL disabled")
        ToggleSprint.reset()
        ZoomFeature.reset()
        val client = net.minecraft.client.MinecraftClient.getInstance()
        Fullbright.reset(client)
    }

    private fun loadConfig() {
        val cm = DriftCore.getInstance().configManager
        config = cm.loadConfig("qol", DriftConfig.QolConfig::class.java, DriftConfig.QolConfig())

        // Apply config to features
        ToggleSprint.enabled = config.toggleSprint
        ZoomFeature.enabled = config.zoom.enabled
        ZoomFeature.targetFov = config.zoom.fov.toDouble()
        Fullbright.enabled = config.fullbright
        CustomCrosshair.enabled = config.customCrosshair.enabled
        CustomCrosshair.shape = config.customCrosshair.shape
        CustomCrosshair.color = config.customCrosshair.color
        CustomCrosshair.size = config.customCrosshair.size
    }

    fun saveConfig() {
        val cm = DriftCore.getInstance().configManager
        config.toggleSprint = ToggleSprint.enabled
        config.zoom.enabled = ZoomFeature.enabled
        config.zoom.fov = ZoomFeature.targetFov.toInt()
        config.fullbright = Fullbright.enabled
        config.customCrosshair.enabled = CustomCrosshair.enabled
        config.customCrosshair.shape = CustomCrosshair.shape
        config.customCrosshair.color = CustomCrosshair.color
        config.customCrosshair.size = CustomCrosshair.size
        cm.saveConfig("qol", config)
    }
}
