package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.RenderHelper;
import gg.drift.core.render.ScreenPosition;

public class ReachDisplay extends HudElement {
    private double lastReach;
    private long displayUntil;
    private static final long DISPLAY_DURATION = 2000;

    public ReachDisplay() {
        super("reach", "Reach Display");
        setPosition(new ScreenPosition(8, 146));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;
        if (System.currentTimeMillis() > displayUntil) return;

        int x = (int) getPosition().getX();
        int y = (int) getPosition().getY();
        int w = getWidth();
        int h = getHeight();

        renderCard(x, y, w, h, lastReach >= 3.0);

        int color = lastReach >= 3.5 ? COLOR_BAD :
                     lastReach >= 3.0 ? COLOR_WARN : COLOR_GOOD;

        String text = String.format("%.2f", lastReach) + "m";
        RenderHelper.drawText("Reach", x + 6, y + 4, COLOR_TEXT_MUTED);
        RenderHelper.drawText(text, x + 6 + RenderHelper.getTextWidth("Reach  "), y + 4, color);

        // Fade out animation
        float fade = Math.max(0, (displayUntil - System.currentTimeMillis()) / (float) DISPLAY_DURATION);
        drawProgressBar(x + 4, y + h - 3, w - 8, 1, fade, color);
    }

    @Override
    public int getWidth() {
        return RenderHelper.getTextWidth("Reach  9.99m") + 12;
    }

    @Override
    public int getHeight() {
        return 22;
    }

    public void onHit(double reach) {
        this.lastReach = reach;
        this.displayUntil = System.currentTimeMillis() + DISPLAY_DURATION;
    }
}
