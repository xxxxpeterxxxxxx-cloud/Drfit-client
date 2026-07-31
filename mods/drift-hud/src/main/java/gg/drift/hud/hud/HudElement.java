package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.ScreenPosition;

public abstract class HudElement {
    protected String id;
    protected String name;
    protected boolean enabled;
    protected ScreenPosition position;
    protected double scale;

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

    public void renderBackground(int width, int height) {
        int bg = ColorUtils.rgba(0, 0, 0, 120);
        int border = ColorUtils.rgb(30, 42, 66);
        gg.drift.core.render.RenderHelper.drawOutlinedRect(
            (int) position.getX(), (int) position.getY(),
            width, height, bg, border
        );
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
