package gg.drift.legacy.hud;

import net.minecraft.client.MinecraftClient;
import net.minecraft.client.option.KeyBinding;
import org.lwjgl.input.Keyboard;

public class LegacyKeystrokes {
    public static boolean enabled = true;
    private static final int KEY_SIZE = 20;
    private static final int KEY_GAP = 2;

    public static void render() {
        if (!enabled) return;
        MinecraftClient mc = MinecraftClient.getInstance();

        int baseX = 4;
        int baseY = 60;

        // W (top center)
        drawKey("W", isKeyDown(mc.options.forwardKey), baseX + KEY_SIZE + KEY_GAP, baseY);
        // A (middle left)
        drawKey("A", isKeyDown(mc.options.leftKey), baseX, baseY + KEY_SIZE + KEY_GAP);
        // S (middle center)
        drawKey("S", isKeyDown(mc.options.backKey), baseX + KEY_SIZE + KEY_GAP, baseY + KEY_SIZE + KEY_GAP);
        // D (middle right)
        drawKey("D", isKeyDown(mc.options.rightKey), baseX + (KEY_SIZE + KEY_GAP) * 2, baseY + KEY_SIZE + KEY_GAP);
        // LMB
        drawMouseButton("LMB", isKeyDown(mc.options.attackKey), baseX, baseY + (KEY_SIZE + KEY_GAP) * 2, KEY_SIZE);
        // RMB
        drawMouseButton("RMB", isKeyDown(mc.options.useKey), baseX + KEY_SIZE + KEY_GAP, baseY + (KEY_SIZE + KEY_GAP) * 2, KEY_SIZE);
    }

    private static boolean isKeyDown(KeyBinding key) {
        return key.isPressed();
    }

    private static void drawKey(String label, boolean pressed, int x, int y) {
        int bg = pressed ? LegacyRenderHelper.rgba(16, 185, 129, 200) : LegacyRenderHelper.rgba(10, 14, 26, 180);
        int fg = pressed ? 0xFFFFFFFF : LegacyRenderHelper.rgb(100, 116, 139);
        LegacyRenderHelper.drawRect(x, y, KEY_SIZE, KEY_SIZE, bg);
        int textX = x + (KEY_SIZE - LegacyRenderHelper.getTextWidth(label)) / 2;
        int textY = y + (KEY_SIZE - LegacyRenderHelper.getTextHeight()) / 2;
        LegacyRenderHelper.drawTextWithShadow(label, textX, textY, fg);
    }

    private static void drawMouseButton(String label, boolean pressed, int x, int y, int width) {
        int bg = pressed ? LegacyRenderHelper.rgba(16, 185, 129, 200) : LegacyRenderHelper.rgba(10, 14, 26, 180);
        int fg = pressed ? 0xFFFFFFFF : LegacyRenderHelper.rgb(100, 116, 139);
        LegacyRenderHelper.drawRect(x, y, width, KEY_SIZE, bg);
        int textX = x + (width - LegacyRenderHelper.getTextWidth(label)) / 2;
        int textY = y + (KEY_SIZE - LegacyRenderHelper.getTextHeight()) / 2;
        LegacyRenderHelper.drawTextWithShadow(label, textX, textY, fg);
    }
}
