package gg.drift.qol

import gg.drift.core.DriftCore
import gg.drift.core.DriftModule
import net.fabricmc.api.ModInitializer

class DriftQoL : DriftModule("driftqol", "Drift QoL", "0.1.0"), ModInitializer {

    companion object {
        lateinit var instance: DriftQoL
            private set
    }

    override fun onInitialize() {
        instance = this
        DriftCore.getInstance().modRegistry.register(this)
        DriftCore.LOGGER.info("Drift QoL module registered")
    }

    override fun onEnable() {
        DriftCore.LOGGER.info("Drift QoL enabled")
    }

    override fun onDisable() {
        DriftCore.LOGGER.info("Drift QoL disabled")
    }
}
