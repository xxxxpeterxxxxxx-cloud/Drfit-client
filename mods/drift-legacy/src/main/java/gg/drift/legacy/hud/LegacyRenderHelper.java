package gg.drift.legacy.hud;

import net.minecraft.client.MinecraftClient;
import net.minecraft.client.font.TextRenderer;

public class LegacyRenderHelper {
    private static final MinecraftClient mc = MinecraftClient.getInstance();

    public static void drawRect(int x, int y, int width, int height, int color) {
        float a = (float)(color >> 24 & 255) / 255.0F;
        float r = (float)(color >> 16 & 255) / 255.0F;
        float g = (float)(color >> 8 & 255) / 255.0F;
        float b = (float)(color & 255) / 255.0F;

        org.lwjgl.opengl.GL11.glEnable(org.lwjgl.opengl.GL11.GL_BLEND);
        org.lwjgl.opengl.GL11.glDisable(org.lwjgl.opengl.GL11.GL_TEXTURE_2D);
        org.lwjgl.opengl.GL11.glBlendFunc(org.lwjgl.opengl.GL11.GL_SRC_ALPHA, org.lwjgl.opengl.GL11.GL_ONE_MINUS_SRC_ALPHA);
        org.lwjgl.opengl.GL11.glColor4f(r, g, b, a);
        org.lwjgl.opengl.GL11.glBegin(org.lwjgl.opengl.GL11.GL_QUADS);
        org.lwjgl.opengl.GL11.glVertex2f(x, y);
        org.lwjgl.opengl.GL11.glVertex2f(x + width, y);
        org.lwjgl.opengl.GL11.glVertex2f(x + width, y + height);
        org.lwjgl.opengl.GL11.glVertex2f(x, y + height);
        org.lwjgl.opengl.GL11.glEnd();
        org.lwjgl.opengl.GL11.glEnable(org.lwjgl.opengl.GL11.GL_TEXTURE_2D);
        org.lwjgl.opengl.GL11.glDisable(org.lwjgl.opengl.GL11.GL_BLEND);
    }

    public static void drawText(String text, int x, int y, int color) {
        TextRenderer tr = mc.textRenderer;
        tr.draw(text, x, y, color);
    }

    public static void drawTextWithShadow(String text, int x, int y, int color) {
        TextRenderer tr = mc.textRenderer;
        tr.drawWithShadow(text, x, y, color);
    }

    public static int getTextWidth(String text) {
        return mc.textRenderer.getWidth(text);
    }

    public static int getTextHeight() {
        return 8;
    }

    public static int rgba(int r, int g, int b, int a) {
        return (a << 24) | (r << 16) | (g << 8) | b;
    }

    public static int rgb(int r, int g, int b) {
        return rgba(r, g, b, 255);
    }
}
