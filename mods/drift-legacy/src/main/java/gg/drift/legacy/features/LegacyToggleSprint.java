package gg.drift.legacy.features;

import net.minecraft.client.MinecraftClient;
import net.minecraft.client.option.KeyBinding;
import org.lwjgl.input.Keyboard;

public class LegacyToggleSprint {
    public static boolean enabled = true;
    private static boolean sprinting = false;
    private static boolean toggled = false;
    private static boolean lastKeyState = false;

    public static void update(MinecraftClient mc) {
        if (!enabled || mc.player == null) return;

        boolean keyDown = Keyboard.isKeyDown(Keyboard.KEY_V);
        if (keyDown && !lastKeyState) {
            toggled = !toggled;
        }
        lastKeyState = keyDown;

        sprinting = toggled || mc.options.sprintKey.isPressed();

        if (sprinting && mc.player != null) {
            mc.player.setSprinting(true);
        }
    }

    public static boolean isSprinting() {
        return sprinting;
    }

    public static boolean isToggled() {
        return toggled;
    }

    public static void reset() {
        sprinting = false;
        toggled = false;
        lastKeyState = false;
    }
}
