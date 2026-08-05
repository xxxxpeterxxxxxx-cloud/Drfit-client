package gg.drift.core.render;

import net.minecraft.client.MinecraftClient;
import net.minecraft.client.font.TextRenderer;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.util.math.MathHelper;

public class RenderHelper {
    private static DrawContext currentContext;
    private static TextRenderer textRenderer;

    public static void setContext(DrawContext context) {
        currentContext = context;
        textRenderer = MinecraftClient.getInstance().textRenderer;
    }

    public static void clearContext() {
        currentContext = null;
    }

    public static boolean hasContext() {
        return currentContext != null;
    }

    public static void drawRect(int x, int y, int width, int height, int color) {
        if (currentContext != null) {
            currentContext.fill(x, y, x + width, y + height, color);
        }
    }

    public static void drawText(String text, int x, int y, int color) {
        if (currentContext != null && textRenderer != null) {
            currentContext.drawText(textRenderer, text, x, y, color, false);
        }
    }

    public static void drawTextWithShadow(String text, int x, int y, int color) {
        if (currentContext != null && textRenderer != null) {
            currentContext.drawText(textRenderer, text, x, y, color, true);
        }
    }

    public static void drawOutlinedRect(int x, int y, int width, int height, int fillColor, int borderColor) {
        drawRect(x, y, width, height, fillColor);
        drawRect(x, y, width, 1, borderColor);
        drawRect(x, y + height - 1, width, 1, borderColor);
        drawRect(x, y, 1, height, borderColor);
        drawRect(x + width - 1, y, 1, height, borderColor);
    }

    public static void drawRoundedRect(int x, int y, int width, int height, int radius, int color) {
        // Simple rounded rect — fill corners with transparent
        drawRect(x + radius, y, width - radius * 2, height, color);
        drawRect(x, y + radius, width, height - radius * 2, color);
        // Corners (approximate with small rects)
        for (int i = 0; i < radius; i++) {
            int w = radius - i;
            drawRect(x + i, y + radius - i - 1, 1, 1, color);
            drawRect(x + width - i - 1, y + radius - i - 1, 1, 1, color);
            drawRect(x + i, y + height - radius + i, 1, 1, color);
            drawRect(x + width - i - 1, y + height - radius + i, 1, 1, color);
        }
    }

    public static int getTextWidth(String text) {
        if (textRenderer != null) {
            return textRenderer.getWidth(text);
        }
        return text.length() * 6;
    }

    public static int getTextHeight() {
        return 9;
    }

    public static void drawCenteredText(String text, int x, int y, int width, int color) {
        int textWidth = getTextWidth(text);
        drawText(text, x + (width - textWidth) / 2, y, color);
    }
}
