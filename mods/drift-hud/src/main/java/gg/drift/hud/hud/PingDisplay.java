package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;

public class PingDisplay extends HudElement {
    private int ping;

    public PingDisplay() {
        super("ping", "Ping Display");
        setPosition(new gg.drift.core.render.ScreenPosition(5, 22));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        String text = ping + "ms";
        int color = ping < 50 ? ColorUtils.rgb(0, 255, 0) :
                     ping < 150 ? ColorUtils.rgb(255, 255, 0) :
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
        return getTextWidth(ping + "ms") + 8;
    }

    @Override
    public int getHeight() {
        return 16;
    }

    public void setPing(int ping) {
        this.ping = ping;
    }

    private int getTextWidth(String text) {
        return gg.drift.core.render.RenderHelper.getTextWidth(text);
    }
}
