package gg.drift.legacy.hud;

import net.minecraft.client.MinecraftClient;

public class LegacyFpsCounter {
    private static final MinecraftClient mc = MinecraftClient.getInstance();
    public static boolean enabled = true;

    public static void render() {
        if (!enabled) return;

        int fps = mc.currentFps;
        int color;
        if (fps >= 60) color = LegacyRenderHelper.rgb(16, 185, 129);
        else if (fps >= 30) color = LegacyRenderHelper.rgb(245, 158, 11);
        else color = LegacyRenderHelper.rgb(239, 68, 68);

        String text = "FPS: " + fps;
        int width = LegacyRenderHelper.getTextWidth(text) + 8;
        LegacyRenderHelper.drawRect(4, 4, width, 16, LegacyRenderHelper.rgba(10, 14, 26, 180));
        LegacyRenderHelper.drawTextWithShadow(text, 8, 8, color);
    }
}
