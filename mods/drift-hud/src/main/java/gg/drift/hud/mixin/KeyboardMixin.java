package gg.drift.hud.mixin;

import gg.drift.hud.hud.HudConfigScreen;
import net.minecraft.client.Keyboard;
import net.minecraft.client.MinecraftClient;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(Keyboard.class)
public class KeyboardMixin {

    @Inject(method = "onKey", at = @At("TAIL"))
    private void onKey(long window, int key, int scancode, int action, int modifiers, CallbackInfo ci) {
        if (MinecraftClient.getInstance().player == null) return;
        if (action != 0) return; // Only on press

        // Right Shift = toggle HUD config
        if (key == org.lwjgl.glfw.GLFW.GLFW_KEY_RIGHT_SHIFT) {
            if (HudConfigScreen.isOpen()) {
                HudConfigScreen.close();
            } else {
                HudConfigScreen.open();
            }
        }

        // ESC closes config
        if (key == org.lwjgl.glfw.GLFW.GLFW_KEY_ESCAPE && HudConfigScreen.isOpen()) {
            HudConfigScreen.close();
        }

        // Arrow keys / WASD for navigation in config
        if (HudConfigScreen.isOpen()) {
            HudConfigScreen.onKey(key);
        }
    }
}
