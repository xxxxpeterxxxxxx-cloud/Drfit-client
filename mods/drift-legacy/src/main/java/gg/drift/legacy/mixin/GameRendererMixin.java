package gg.drift.legacy.mixin;

import gg.drift.legacy.features.LegacyZoom;
import net.minecraft.client.render.GameRenderer;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

@Mixin(GameRenderer.class)
public class GameRendererMixin {

    @Inject(method = "getFov", at = @At("HEAD"), cancellable = true)
    public void onGetFov(float tickDelta, CallbackInfoReturnable<Float> cir) {
        if (LegacyZoom.isZooming() && LegacyZoom.enabled) {
            cir.setReturnValue((float) LegacyZoom.getZoomFov(cir.getReturnValue()));
        }
    }
}
