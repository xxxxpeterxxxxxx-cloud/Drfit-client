package gg.drift.qol.features

import net.fabricmc.fabric.api.client.event.lifecycle.v1.ClientTickEvents
import net.fabricmc.fabric.api.client.keybinding.v1.KeyBindingHelper
import net.fabricmc.fabric.api.client.rendering.v1.HudRenderCallback
import net.minecraft.client.MinecraftClient
import net.minecraft.client.option.KeyBinding
import gg.drift.core.render.RenderHelper

object QoLKeybinds {
    private var registered = false

    fun register() {
        if (registered) return
        registered = true

        // Register all keybindings
        KeyBindingHelper.registerKeyBinding(ToggleSprint.toggleKey)
        KeyBindingHelper.registerKeyBinding(ToggleSprint.sneakToggleKey)
        KeyBindingHelper.registerKeyBinding(ZoomFeature.zoomKey)
        KeyBindingHelper.registerKeyBinding(Fullbright.toggleKey)
        KeyBindingHelper.registerKeyBinding(CustomCrosshair.toggleKey)

        // Tick event for updating features each frame
        ClientTickEvents.END_CLIENT_TICK.register { client ->
            ToggleSprint.update(client)
            ZoomFeature.update(client)
            Fullbright.update(client)
            CustomCrosshair.update(client)
        }

        // Render crosshair on HUD
        HudRenderCallback.EVENT.register { context, _ ->
            RenderHelper.setContext(context as net.minecraft.client.gui.DrawContext)
            CustomCrosshair.render(context)
            RenderHelper.clearContext()
        }
    }
}
