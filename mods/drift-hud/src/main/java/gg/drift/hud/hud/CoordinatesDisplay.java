package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;

public class CoordinatesDisplay extends HudElement {
    private int x, y, z;
    private String biome;

    public CoordinatesDisplay() {
        super("coordinates", "Coordinates");
        setPosition(new gg.drift.core.render.ScreenPosition(5, 40));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        String[] lines = {
            String.format("XYZ: %d / %d / %d", x, y, z),
            "Biome: " + biome
        };

        int maxWidth = 0;
        for (String line : lines) {
            int w = gg.drift.core.render.RenderHelper.getTextWidth(line);
            if (w > maxWidth) maxWidth = w;
        }

        int width = maxWidth + 8;
        int height = lines.length * 12 + 4;

        renderBackground(width, height);

        int textColor = ColorUtils.rgb(226, 232, 240);
        for (int i = 0; i < lines.length; i++) {
            gg.drift.core.render.RenderHelper.drawText(
                lines[i],
                (int) getPosition().getX() + 4,
                (int) getPosition().getY() + 4 + i * 12,
                textColor
            );
        }
    }

    @Override
    public int getWidth() {
        return gg.drift.core.render.RenderHelper.getTextWidth(
            String.format("XYZ: %d / %d / %d", x, y, z)
        ) + 8;
    }

    @Override
    public int getHeight() {
        return 2 * 12 + 4;
    }

    public void setCoords(int x, int y, int z) {
        this.x = x; this.y = y; this.z = z;
    }

    public void setBiome(String biome) {
        this.biome = biome;
    }
}
