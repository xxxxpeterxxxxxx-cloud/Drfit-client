package gg.drift.qol.features

import net.minecraft.client.MinecraftClient
import net.minecraft.client.option.KeyBinding
import net.minecraft.client.util.InputUtil
import org.lwjgl.glfw.GLFW

object Fullbright {
    var enabled = false
    private var originalGamma = 1.0

    val toggleKey = KeyBinding(
        "key.drift.fullbright",
        InputUtil.Type.KEYSYM,
        GLFW.GLFW_KEY_G,
        "category.drift.qol"
    )

    fun update(client: MinecraftClient) {
        if (toggleKey.wasPressed()) {
            enabled = !enabled
            applyGamma(client)
        }
    }

    fun applyGamma(client: MinecraftClient) {
        if (enabled) {
            // Save original and set to max
            originalGamma = client.options.gamma.value
            client.options.gamma.value = 15.0
        } else {
            // Restore
            client.options.gamma.value = originalGamma
        }
    }

    fun reset(client: MinecraftClient) {
        if (enabled) {
            client.options.gamma.value = originalGamma
            enabled = false
        }
    }
}
