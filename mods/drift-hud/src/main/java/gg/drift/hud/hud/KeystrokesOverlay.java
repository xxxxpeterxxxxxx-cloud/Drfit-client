package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.RenderHelper;
import gg.drift.core.render.ScreenPosition;

public class KeystrokesOverlay extends HudElement {
    private boolean w, a, s, d;
    private boolean leftClick, rightClick;
    private int leftCps, rightCps;
    private boolean space;

    public KeystrokesOverlay() {
        super("keystrokes", "Keystrokes");
        setPosition(new ScreenPosition(10, 200));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        int baseX = (int) getPosition().getX();
        int baseY = (int) getPosition().getY();
        int keySize = 22;
        int gap = 2;

        // WASD cluster
        drawKey(baseX + keySize + gap, baseY, keySize, keySize, "W", w);
        drawKey(baseX, baseY + keySize + gap, keySize, keySize, "A", a);
        drawKey(baseX + keySize + gap, baseY + keySize + gap, keySize, keySize, "S", s);
        drawKey(baseX + (keySize + gap) * 2, baseY + keySize + gap, keySize, keySize, "D", d);

        // Mouse buttons
        int mouseY = baseY + (keySize + gap) * 2;
        int mouseW = keySize * 3 + gap * 2;
        drawKey(baseX, mouseY, mouseW / 2, keySize, "LMB " + leftCps, leftClick, leftClick ? COLOR_ACCENT : 0);
        drawKey(baseX + mouseW / 2 + gap, mouseY, mouseW / 2, keySize, "RMB " + rightCps, rightClick, rightClick ? COLOR_ACCENT : 0);

        // Space bar
        int spaceY = mouseY + keySize + gap;
        drawKey(baseX, spaceY, mouseW, keySize / 2 + 2, "", space, space ? COLOR_ACCENT : 0);
        // Space bar indicator line
        int spaceLineX = baseX + mouseW / 2 - 8;
        RenderHelper.drawRect(spaceLineX, spaceY + (keySize / 2 + 2) / 2 - 1, 16, 2,
            space ? ColorUtils.rgb(255, 255, 255) : COLOR_TEXT_MUTED);
    }

    private void drawKey(int x, int y, int w, int h, String label, boolean pressed) {
        drawKey(x, y, w, h, label, pressed, 0);
    }

    private void drawKey(int x, int y, int w, int h, String label, boolean pressed, int activeColor) {
        int bg = pressed ? ColorUtils.rgba(16, 185, 129, 200) : ColorUtils.rgba(8, 11, 20, 160);
        int border = pressed ? COLOR_ACCENT : COLOR_BORDER;
        int textColor = pressed ? ColorUtils.rgb(255, 255, 255) : COLOR_TEXT_DIM;

        RenderHelper.drawOutlinedRect(x, y, w, h, bg, border);
        if (pressed) {
            // Glow line at top
            RenderHelper.drawRect(x, y, w, 1, ColorUtils.rgb(52, 211, 153));
        }

        if (!label.isEmpty()) {
            int textX = x + (w - RenderHelper.getTextWidth(label)) / 2;
            int textY = y + (h - 8) / 2;
            RenderHelper.drawText(label, textX, textY, textColor);
        }
    }

    @Override
    public int getWidth() {
        return 22 * 3 + 2 * 2;
    }

    @Override
    public int getHeight() {
        return 22 * 3 + 2 * 2 + 22 / 2 + 2 + gap;
    }

    private static final int gap = 2;

    public void setKeys(boolean w, boolean a, boolean s, boolean d) {
        this.w = w; this.a = a; this.s = s; this.d = d;
    }

    public void setMouse(boolean leftClick, boolean rightClick, int leftCps, int rightCps) {
        this.leftClick = leftClick;
        this.rightClick = rightClick;
        this.leftCps = leftCps;
        this.rightCps = rightCps;
    }

    public void setSpace(boolean space) { this.space = space; }
}
