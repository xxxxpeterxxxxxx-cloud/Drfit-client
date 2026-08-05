package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.RenderHelper;
import gg.drift.core.render.ScreenPosition;

public class PingDisplay extends HudElement {
    private int ping;

    public PingDisplay() {
        super("ping", "Ping Display");
        setPosition(new ScreenPosition(8, 34));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        String text = ping + "ms";
        int color = ping < 50 ? COLOR_GOOD :
                     ping < 150 ? COLOR_WARN : COLOR_BAD;

        int width = getWidth();
        int height = getHeight();
        int x = (int) getPosition().getX();
        int y = (int) getPosition().getY();

        renderCard(x, y, width, height, ping < 100);

        // Signal bars icon
        int barX = x + 6;
        int barY = y + 8;
        int[] bars = { 3, 6, 9, 12 };
        for (int i = 0; i < bars.length; i++) {
            int barH = bars[i];
            int barColor = (ping < 50 || (ping < 150 && i < 3) || (ping < 250 && i < 2) || i < 1)
                ? color : COLOR_TEXT_MUTED;
            RenderHelper.drawRect(barX + i * 3, barY + 12 - barH, 2, barH, barColor);
        }

        // Value
        RenderHelper.drawText(text, barX + 18, y + 5, color);
    }

    @Override
    public int getWidth() {
        return RenderHelper.getTextWidth("999ms") + 30;
    }

    @Override
    public int getHeight() {
        return 22;
    }

    public void setPing(int ping) { this.ping = ping; }
}
