package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.RenderHelper;
import gg.drift.core.render.ScreenPosition;

public class CoordinatesDisplay extends HudElement {
    private int x, y, z;
    private String biome = "plains";
    private String direction = "N";

    public CoordinatesDisplay() {
        super("coordinates", "Coordinates");
        setPosition(new ScreenPosition(8, 86));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        int px = (int) getPosition().getX();
        int py = (int) getPosition().getY();
        int w = getWidth();
        int h = getHeight();

        renderCard(px, py, w, h, false);

        // XYZ with colored labels
        int labelColor = COLOR_TEXT_MUTED;
        int valColor = COLOR_TEXT;
        int accentColor = COLOR_ACCENT;

        int cy = py + 5;
        RenderHelper.drawText("X", px + 6, cy, accentColor);
        RenderHelper.drawText(String.valueOf(x), px + 6 + RenderHelper.getTextWidth("X  "), cy, valColor);
        int xEnd = px + 6 + RenderHelper.getTextWidth("X  ") + RenderHelper.getTextWidth(String.valueOf(x)) + 8;

        RenderHelper.drawText("Y", xEnd, cy, accentColor);
        RenderHelper.drawText(String.valueOf(y), xEnd + RenderHelper.getTextWidth("Y  "), cy, valColor);
        int yEnd = xEnd + RenderHelper.getTextWidth("Y  ") + RenderHelper.getTextWidth(String.valueOf(y)) + 8;

        RenderHelper.drawText("Z", yEnd, cy, accentColor);
        RenderHelper.drawText(String.valueOf(z), yEnd + RenderHelper.getTextWidth("Z  "), cy, valColor);

        // Second line: biome + direction
        int cy2 = py + 16;
        RenderHelper.drawText(biome, px + 6, cy2, labelColor);
        String dirText = "  " + direction;
        RenderHelper.drawText(dirText, px + 6 + RenderHelper.getTextWidth(biome), cy2, accentColor);
    }

    @Override
    public int getWidth() {
        return RenderHelper.getTextWidth("X  -999  Y  999  Z  -999") + 12;
    }

    @Override
    public int getHeight() {
        return 28;
    }

    public void setCoords(int x, int y, int z) {
        this.x = x; this.y = y; this.z = z;
    }

    public void setBiome(String biome) { this.biome = biome; }
    public void setDirection(String dir) { this.direction = dir; }
}
