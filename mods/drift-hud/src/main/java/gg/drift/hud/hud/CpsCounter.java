package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;

public class CpsCounter extends HudElement {
    private int cps;

    public CpsCounter() {
        super("cps", "CPS Counter");
        setPosition(new gg.drift.core.render.ScreenPosition(5, 80));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        String text = cps + " CPS";
        int color = cps >= 10 ? ColorUtils.rgb(0, 255, 0) :
                     cps >= 5 ? ColorUtils.rgb(255, 255, 0) :
                     ColorUtils.rgb(255, 100, 100);

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
        return getTextWidth(cps + " CPS") + 8;
    }

    @Override
    public int getHeight() {
        return 16;
    }

    public void setCps(int cps) {
        this.cps = cps;
    }

    private int getTextWidth(String text) {
        return gg.drift.core.render.RenderHelper.getTextWidth(text);
    }
}
