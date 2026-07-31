package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.ScreenPosition;

public class KeystrokesOverlay extends HudElement {
    private boolean w, a, s, d;
    private boolean leftClick, rightClick;
    private int leftCps, rightCps;

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
        drawKey(baseX, mouseY, mouseW / 2, keySize, "LMB " + leftCps, leftClick);
        drawKey(baseX + mouseW / 2 + gap, mouseY, mouseW / 2, keySize, "RMB " + rightCps, rightClick);
    }

    private void drawKey(int x, int y, int w, int h, String label, boolean pressed) {
        int bg = pressed ? ColorUtils.rgba(59, 130, 246, 200) : ColorUtils.rgba(0, 0, 0, 120);
        int border = pressed ? ColorUtils.rgb(96, 165, 250) : ColorUtils.rgb(30, 42, 66);
        int textColor = pressed ? ColorUtils.rgb(255, 255, 255) : ColorUtils.rgb(148, 163, 184);

        gg.drift.core.render.RenderHelper.drawOutlinedRect(x, y, w, h, bg, border);
        int textX = x + (w - gg.drift.core.render.RenderHelper.getTextWidth(label)) / 2;
        int textY = y + (h - 8) / 2;
        gg.drift.core.render.RenderHelper.drawText(label, textX, textY, textColor);
    }

    @Override
    public int getWidth() {
        return 22 * 3 + 2 * 2;
    }

    @Override
    public int getHeight() {
        return 22 * 3 + 2 * 2;
    }

    public void setKeys(boolean w, boolean a, boolean s, boolean d) {
        this.w = w; this.a = a; this.s = s; this.d = d;
    }

    public void setMouse(boolean leftClick, boolean rightClick, int leftCps, int rightCps) {
        this.leftClick = leftClick;
        this.rightClick = rightClick;
        this.leftCps = leftCps;
        this.rightCps = rightCps;
    }
}
