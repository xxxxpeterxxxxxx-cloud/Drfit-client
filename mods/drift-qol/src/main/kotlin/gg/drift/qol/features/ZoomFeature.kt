package gg.drift.qol.features

import net.minecraft.client.MinecraftClient
import net.minecraft.client.option.KeyBinding
import net.minecraft.client.util.InputUtil
import org.lwjgl.glfw.GLFW
import kotlin.math.max
import kotlin.math.min

object ZoomFeature {
    var enabled = true
    var targetFov = 30.0
    var defaultFov = 70.0
    var currentFov = 70.0
    var zooming = false
    private var wasZooming = false

    val zoomKey = KeyBinding(
        "key.drift.zoom",
        InputUtil.Type.KEYSYM,
        GLFW.GLFW_KEY_C,
        "category.drift.qol"
    )

    fun update(client: MinecraftClient) {
        if (!enabled) return

        zooming = zoomKey.isPressed
        defaultFov = client.options.getFov().value.toDouble()

        if (zooming) {
            currentFov = animateFov(currentFov, targetFov, 0.15f)
        } else {
            currentFov = animateFov(currentFov, defaultFov, 0.15f)
        }

        // Smooth zoom — set FOV via mixin instead of directly
        // The mixin intercepts getFov() and returns our value when zooming
    }

    private fun animateFov(current: Double, target: Double, speed: Float): Double {
        val diff = target - current
        if (kotlin.math.abs(diff) < 0.5) return target
        return current + diff * speed
    }

    fun getZoomFov(default: Double): Double {
        if (!enabled) return default
        return currentFov
    }

    fun reset() {
        currentFov = defaultFov
        zooming = false
    }
}
