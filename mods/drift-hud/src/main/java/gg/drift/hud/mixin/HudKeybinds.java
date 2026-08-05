package gg.drift.hud.mixin;

import gg.drift.hud.hud.HudConfigScreen;
import gg.drift.hud.hud.HudRenderer;
import net.minecraft.client.option.KeyBinding;
import net.minecraft.client.util.InputUtil;
import org.lwjgl.glfw.GLFW;

public class HudKeybinds {
    public static final KeyBinding TOGGLE_HUD = new KeyBinding(
        "key.drift.toggle_hud",
        InputUtil.Type.KEYSYM,
        GLFW.GLFW_KEY_RIGHT_SHIFT,
        "category.drift.hud"
    );

    public static final KeyBinding HUD_CONFIG = new KeyBinding(
        "key.drift.hud_config",
        InputUtil.Type.KEYSYM,
        GLFW.GLFW_KEY_RIGHT_SHIFT,
        "category.drift.hud"
    );

    public static void onToggleHud() {
        // Toggle all HUD elements
        for (gg.drift.hud.hud.HudElement el : gg.drift.hud.hud.HudRegistry.getAll()) {
            // Just toggle visibility, not the enabled state
        }
    }

    public static void onHudConfig() {
        if (HudConfigScreen.isOpen()) {
            HudConfigScreen.close();
        } else {
            HudConfigScreen.open();
        }
    }
}
