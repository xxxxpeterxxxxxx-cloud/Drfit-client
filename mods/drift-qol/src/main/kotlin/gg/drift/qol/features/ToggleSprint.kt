package gg.drift.qol.features

import net.minecraft.client.MinecraftClient
import net.minecraft.client.option.KeyBinding
import net.minecraft.client.util.InputUtil
import org.lwjgl.glfw.GLFW

object ToggleSprint {
    var enabled = true
    var sprinting = false
    var sneaking = false

    val toggleKey = KeyBinding(
        "key.drift.toggle_sprint",
        InputUtil.Type.KEYSYM,
        GLFW.GLFW_KEY_V,
        "category.drift.qol"
    )

    val sneakToggleKey = KeyBinding(
        "key.drift.toggle_sneak",
        InputUtil.Type.KEYSYM,
        GLFW.GLFW_KEY_B,
        "category.drift.qol"
    )

    fun update(client: MinecraftClient) {
        if (!enabled) return
        if (client.player == null) return

        if (toggleKey.wasPressed()) {
            sprinting = !sprinting
        }
        if (sneakToggleKey.wasPressed()) {
            sneaking = !sneaking
        }

        // Apply sprint
        if (sprinting && client.player != null) {
            client.player!!.isSprinting = true
        }
    }

    fun reset() {
        sprinting = false
        sneaking = false
    }
}
