package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.RenderHelper;
import gg.drift.core.render.ScreenPosition;

public class CpsCounter extends HudElement {
    private int cps;
    private int peakCps;

    public CpsCounter() {
        super("cps", "CPS Counter");
        setPosition(new ScreenPosition(8, 60));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        int width = getWidth();
        int height = getHeight();
        int x = (int) getPosition().getX();
        int y = (int) getPosition().getY();

        int color = cps >= 10 ? COLOR_GOOD :
                     cps >= 5 ? COLOR_WARN : COLOR_BAD;

        renderCard(x, y, width, height, cps >= 8);

        // Label
        RenderHelper.drawText("CPS", x + 6, y + 4, COLOR_TEXT_MUTED);
        // Value
        String valText = String.valueOf(cps);
        RenderHelper.drawText(valText, x + 6 + RenderHelper.getTextWidth("CPS  "), y + 4, color);

        // Peak indicator
        if (peakCps > 0) {
            String peak = "peak " + peakCps;
            RenderHelper.drawText(peak, x + width - RenderHelper.getTextWidth(peak) - 6, y + 4, COLOR_TEXT_MUTED);
        }

        // Toggle bar at bottom
        drawToggleBar(x + 4, y + height - 3, width - 8, cps >= 8);
    }

    @Override
    public int getWidth() {
        return RenderHelper.getTextWidth("CPS  99  peak 99") + 14;
    }

    @Override
    public int getHeight() {
        return 22;
    }

    public void setCps(int cps) {
        this.cps = cps;
        if (cps > peakCps) peakCps = cps;
    }

    public void resetPeak() { peakCps = 0; }
}
