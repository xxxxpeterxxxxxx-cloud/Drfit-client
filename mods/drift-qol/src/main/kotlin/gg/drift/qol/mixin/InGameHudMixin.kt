package gg.drift.qol.mixin

import gg.drift.qol.features.CustomCrosshair
import net.minecraft.client.gui.hud.InGameHud
import net.minecraft.client.gui.DrawContext
import net.minecraft.client.render.RenderTickCounter
import org.spongepowered.asm.mixin.Mixin
import org.spongepowered.asm.mixin.injection.At
import org.spongepowered.asm.mixin.injection.Inject
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo

@Mixin(InGameHud::class)
class InGameHudMixin {

    @Inject(method = ["render"], at = [At("TAIL")])
    fun onRender(context: DrawContext, tickCounter: RenderTickCounter, ci: CallbackInfo) {
        // Crosshair rendering is handled by HudRenderCallback in QoLKeybinds
        // This mixin is reserved for future QoL HUD overlays
    }

    @Inject(method = ["renderCrosshair"], at = [At("HEAD")], cancellable = true)
    fun onRenderCrosshair(context: DrawContext, tickCounter: RenderTickCounter, ci: CallbackInfo) {
        if (CustomCrosshair.enabled) {
            ci.cancel() // Suppress vanilla crosshair when custom is active
        }
    }
}
