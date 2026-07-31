package gg.drift.core.render;

public class RenderHelper {
    public static void drawRect(int x, int y, int width, int height, int color) {
        // Implementation uses Minecraft's DrawContext in 1.21+
        // This is a platform-agnostic interface — concrete rendering
        // is done in drift-hud's HudRenderer which has access to DrawContext
    }

    public static void drawText(String text, int x, int y, int color) {
        // Same as above — concrete text rendering in drift-hud
    }

    public static void drawOutlinedRect(int x, int y, int width, int height, int fillColor, int borderColor) {
        drawRect(x, y, width, height, fillColor);
        drawRect(x, y, width, 1, borderColor);
        drawRect(x, y + height - 1, width, 1, borderColor);
        drawRect(x, y, 1, height, borderColor);
        drawRect(x + width - 1, y, 1, height, borderColor);
    }

    public static int getTextWidth(String text) {
        // Override in concrete implementation
        return text.length() * 6;
    }

    public static int getTextHeight() {
        return 9;
    }
}
