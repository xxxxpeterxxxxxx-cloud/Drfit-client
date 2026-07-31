package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.ScreenPosition;

public class FpsCounter extends HudElement {
    private int fps;

    public FpsCounter() {
        super("fps", "FPS Counter");
        setPosition(new ScreenPosition(5, 5));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        String text = fps + " FPS";
        int color = fps >= 60 ? ColorUtils.rgb(0, 255, 0) :
                     fps >= 30 ? ColorUtils.rgb(255, 255, 0) :
                     ColorUtils.rgb(255, 0, 0);

        int width = getTextWidth(text) + 8;
        int height = 16;

        renderBackground(width, height);
        gg.drift.core.render.RenderHelper.drawText(
            text,
            (int) getPosition().getX() + 4,
            (int) getPosition().getY() + 4,
            color
        );
    }

    @Override
    public int getWidth() {
        return getTextWidth(fps + " FPS") + 8;
    }

    @Override
    public int getHeight() {
        return 16;
    }

    public void setFps(int fps) {
        this.fps = fps;
    }

    private int getTextWidth(String text) {
        return gg.drift.core.render.RenderHelper.getTextWidth(text);
    }
}
