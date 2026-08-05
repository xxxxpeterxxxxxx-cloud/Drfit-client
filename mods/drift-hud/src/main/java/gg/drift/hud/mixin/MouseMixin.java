package gg.drift.hud.mixin;

import gg.drift.hud.hud.HudConfigScreen;
import net.minecraft.client.Mouse;
import net.minecraft.client.MinecraftClient;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(Mouse.class)
public class MouseMixin {

    @Inject(method = "onMouseButton", at = @At("TAIL"))
    private void onMouseButton(long window, int button, int action, int mods, CallbackInfo ci) {
        if (!HudConfigScreen.isOpen()) return;
        if (action != 1) return; // Only on press

        MinecraftClient mc = MinecraftClient.getInstance();
        Mouse mouse = (Mouse) (Object) this;
        double scale = mc.getWindow().getScaleFactor();
        int x = (int) (mouse.getX() / scale);
        int y = (int) (mouse.getY() / scale);
        HudConfigScreen.onClick(x, y, button);
    }

    @Inject(method = "onMouseScroll", at = @At("TAIL"))
    private void onMouseScroll(long window, double horizontal, double vertical, CallbackInfo ci) {
        if (!HudConfigScreen.isOpen()) return;
        HudConfigScreen.onScroll(vertical);
    }
}
