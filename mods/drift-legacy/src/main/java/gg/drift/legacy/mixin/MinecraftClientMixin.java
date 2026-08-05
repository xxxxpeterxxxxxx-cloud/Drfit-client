package gg.drift.legacy.mixin;

import gg.drift.legacy.features.LegacyToggleSprint;
import gg.drift.legacy.features.LegacyZoom;
import gg.drift.legacy.hud.LegacyCpsCounter;
import net.minecraft.client.MinecraftClient;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(MinecraftClient.class)
public class MinecraftClientMixin {

    @Inject(method = "tick", at = @At("TAIL"))
    public void onTick(CallbackInfo ci) {
        MinecraftClient mc = (MinecraftClient) (Object) this;
        LegacyToggleSprint.update(mc);
        LegacyZoom.update(mc);
    }

    @Inject(method = "doAttack", at = @At("HEAD"))
    public void onAttack(CallbackInfo ci) {
        LegacyCpsCounter.onLeftClick();
    }

    @Inject(method = "doItemUse", at = @At("HEAD"))
    public void onItemUse(CallbackInfo ci) {
        LegacyCpsCounter.onRightClick();
    }
}
