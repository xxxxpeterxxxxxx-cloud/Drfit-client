package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.RenderHelper;
import gg.drift.core.render.ScreenPosition;

public class FpsCounter extends HudElement {
    private int fps;
    private int maxFps = 60;

    public FpsCounter() {
        super("fps", "FPS Counter");
        setPosition(new ScreenPosition(8, 8));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        String text = fps + " FPS";
        int color = fps >= 60 ? COLOR_GOOD :
                     fps >= 30 ? COLOR_WARN : COLOR_BAD;

        int width = getWidth();
        int height = getHeight();
        int x = (int) getPosition().getX();
        int y = (int) getPosition().getY();

        renderCard(x, y, width, height, fps >= 60);

        // Label
        RenderHelper.drawText("FPS", x + 6, y + 4, COLOR_TEXT_MUTED);
        // Value
        RenderHelper.drawText(text, x + 6 + RenderHelper.getTextWidth("FPS  "), y + 4, color);

        // Mini progress bar at bottom
        float progress = Math.min(1f, fps / (float) maxFps);
        drawProgressBar(x + 4, y + height - 3, width - 8, 1, progress, color);
    }

    @Override
    public int getWidth() {
        return RenderHelper.getTextWidth("FPS  999 FPS") + 12;
    }

    @Override
    public int getHeight() {
        return 22;
    }

    public void setFps(int fps) { this.fps = fps; }
    public void setMaxFps(int max) { this.maxFps = max; }
}
