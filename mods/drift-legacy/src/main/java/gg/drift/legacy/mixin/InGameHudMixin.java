package gg.drift.legacy.mixin;

import gg.drift.legacy.hud.*;
import net.minecraft.client.gui.hud.InGameHud;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(InGameHud.class)
public class InGameHudMixin {

    @Inject(method = "render", at = @At("TAIL"))
    public void onRender(float tickDelta, CallbackInfo ci) {
        LegacyFpsCounter.render();
        LegacyPingDisplay.render();
        LegacyCpsCounter.render();
        LegacyKeystrokes.render();
    }
}
