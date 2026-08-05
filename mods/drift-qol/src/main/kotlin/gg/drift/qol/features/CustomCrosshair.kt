package gg.drift.qol.features

import gg.drift.core.render.ColorUtils
import gg.drift.core.render.RenderHelper
import net.minecraft.client.MinecraftClient
import net.minecraft.client.gui.DrawContext
import net.minecraft.client.option.KeyBinding
import net.minecraft.client.util.InputUtil
import org.lwjgl.glfw.GLFW

object CustomCrosshair {
    var enabled = false
    var shape = "cross"
    var color = "#10B981"
    var size = 2
    var thickness = 1

    val toggleKey = KeyBinding(
        "key.drift.crosshair",
        InputUtil.Type.KEYSYM,
        GLFW.GLFW_KEY_H,
        "category.drift.qol"
    )

    fun update(client: MinecraftClient) {
        if (toggleKey.wasPressed()) {
            enabled = !enabled
        }
    }

    fun render(context: DrawContext) {
        if (!enabled) return
        if (!RenderHelper.hasContext()) return

        val client = MinecraftClient.getInstance()
        if (client.player == null) return

        val sw = client.window.scaledWidth
        val sh = client.window.scaledHeight
        val cx = sw / 2
        val cy = sh / 2
        val col = ColorUtils.fromHex(color)

        when (shape) {
            "cross" -> {
                // Horizontal line
                RenderHelper.drawRect(cx - size, cy - thickness / 2, size * 2, thickness, col)
                // Vertical line
                RenderHelper.drawRect(cx - thickness / 2, cy - size, thickness, size * 2, col)
                // Center dot gap
                RenderHelper.drawRect(cx - 1, cy - 1, 2, 2, 0)
            }
            "dot" -> {
                RenderHelper.drawRect(cx - 1, cy - 1, 2, 2, col)
            }
            "plus" -> {
                RenderHelper.drawRect(cx - size, cy, size * 2, 1, col)
                RenderHelper.drawRect(cx, cy - size, 1, size * 2, col)
            }
            "circle" -> {
                // Approximate circle with small rects
                val r = size
                for (angle in 0..360 step 15) {
                    val rad = Math.toRadians(angle.toDouble())
                    val px = cx + (r * Math.cos(rad)).toInt()
                    val py = cy + (r * Math.sin(rad)).toInt()
                    RenderHelper.drawRect(px, py, 1, 1, col)
                }
            }
        }
    }
}
