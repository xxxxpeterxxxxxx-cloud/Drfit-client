package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.ScreenPosition;

public abstract class HudElement {
    protected String id;
    protected String name;
    protected boolean enabled;
    protected ScreenPosition position;
    protected double scale;

    // Theme colors — Drift Client brand
    protected static final int COLOR_BG = ColorUtils.rgba(8, 11, 20, 160);
    protected static final int COLOR_BG_HOVER = ColorUtils.rgba(15, 20, 34, 180);
    protected static final int COLOR_BORDER = ColorUtils.rgba(26, 35, 54, 200);
    protected static final int COLOR_BORDER_ACTIVE = ColorUtils.rgb(16, 185, 129);
    protected static final int COLOR_ACCENT = ColorUtils.rgb(16, 185, 129);
    protected static final int COLOR_ACCENT_DIM = ColorUtils.rgba(16, 185, 129, 80);
    protected static final int COLOR_TEXT = ColorUtils.rgb(241, 245, 249);
    protected static final int COLOR_TEXT_DIM = ColorUtils.rgb(148, 163, 184);
    protected static final int COLOR_TEXT_MUTED = ColorUtils.rgb(100, 116, 139);
    protected static final int COLOR_GOOD = ColorUtils.rgb(52, 211, 153);
    protected static final int COLOR_WARN = ColorUtils.rgb(251, 191, 36);
    protected static final int COLOR_BAD = ColorUtils.rgb(248, 113, 113);

    // Animation state
    protected float animProgress = 0f;
    protected long lastRenderTime = 0;

    public HudElement(String id, String name) {
        this.id = id;
        this.name = name;
        this.enabled = true;
        this.position = new ScreenPosition(5, 5);
        this.scale = 1.0;
    }

    public abstract void render(float tickDelta);
    public abstract int getWidth();
    public abstract int getHeight();

    // Animated background with rounded corners effect
    protected void renderCard(int x, int y, int width, int height, boolean active) {
        int bg = COLOR_BG;
        int border = active ? COLOR_BORDER_ACTIVE : COLOR_BORDER;
        gg.drift.core.render.RenderHelper.drawOutlinedRect(x, y, width, height, bg, border);
        // Accent line at top
        if (active) {
            gg.drift.core.render.RenderHelper.drawRect(x, y, width, 1, COLOR_ACCENT);
        }
    }

    // Animated background with pulse effect
    protected void renderCardPulse(int x, int y, int width, int height) {
        float pulse = (float) (Math.sin(System.currentTimeMillis() / 1000.0) * 0.15 + 0.85);
        int bg = ColorUtils.withAlpha(COLOR_BG, (int) (160 * pulse));
        gg.drift.core.render.RenderHelper.drawOutlinedRect(x, y, width, height, bg, COLOR_BORDER);
    }

    // Draw a toggle bar (on/off indicator)
    protected void drawToggleBar(int x, int y, int width, boolean on) {
        int barHeight = 4;
        int barBg = ColorUtils.rgba(30, 42, 66, 200);
        int barFill = on ? COLOR_ACCENT : ColorUtils.rgba(100, 116, 139, 150);
        int fillWidth = on ? width : width / 2;

        gg.drift.core.render.RenderHelper.drawRect(x, y, width, barHeight, barBg);
        gg.drift.core.render.RenderHelper.drawRect(x, y, fillWidth, barHeight, barFill);
    }

    // Draw a progress bar
    protected void drawProgressBar(int x, int y, int width, int height, float progress, int color) {
        int bg = ColorUtils.rgba(30, 42, 66, 200);
        gg.drift.core.render.RenderHelper.drawRect(x, y, width, height, bg);
        int fillWidth = (int) (width * Math.max(0, Math.min(1, progress)));
        gg.drift.core.render.RenderHelper.drawRect(x, y, fillWidth, height, color);
    }

    // Smooth animation helper
    protected float animateValue(float current, float target, float speed) {
        float diff = target - current;
        if (Math.abs(diff) < 0.01f) return target;
        return current + diff * speed;
    }

    // Update animation
    protected void updateAnimation() {
        long now = System.currentTimeMillis();
        if (lastRenderTime > 0) {
            float dt = (now - lastRenderTime) / 1000f;
            animProgress = Math.min(1f, animProgress + dt * 4f);
        }
        lastRenderTime = now;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public boolean isEnabled() { return enabled; }
    public ScreenPosition getPosition() { return position; }
    public double getScale() { return scale; }

    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public void setPosition(ScreenPosition position) { this.position = position; }
    public void setScale(double scale) { this.scale = scale; }
}
