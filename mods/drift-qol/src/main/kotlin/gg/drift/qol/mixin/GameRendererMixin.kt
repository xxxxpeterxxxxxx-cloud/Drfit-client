package gg.drift.qol.mixin

import gg.drift.qol.features.ZoomFeature
import net.minecraft.client.render.GameRenderer
import org.spongepowered.asm.mixin.Mixin
import org.spongepowered.asm.mixin.injection.At
import org.spongepowered.asm.mixin.injection.Inject
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable

@Mixin(GameRenderer::class)
class GameRendererMixin {

    @Inject(method = ["getFov"], at = [At("HEAD")], cancellable = true)
    fun onGetFov(camera: net.minecraft.client.render.Camera, tickDelta: Float, changingFov: Boolean, cir: CallbackInfoReturnable<Double>) {
        if (ZoomFeature.zooming && ZoomFeature.enabled) {
            cir.returnValue = ZoomFeature.currentFov
        }
    }
}
