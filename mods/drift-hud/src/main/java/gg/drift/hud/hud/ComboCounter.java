package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.RenderHelper;
import gg.drift.core.render.ScreenPosition;

public class ComboCounter extends HudElement {
    private int combo;
    private long lastHitTime;
    private static final long COMBO_TIMEOUT = 3000;

    public ComboCounter() {
        super("combo", "Combo Counter");
        setPosition(new ScreenPosition(8, 120));
    }

    @Override
    public void render(float tickDelta) {
        if (!isEnabled()) return;

        long now = System.currentTimeMillis();
        if (now - lastHitTime > COMBO_TIMEOUT) {
            combo = 0;
        }

        if (combo == 0) return;

        int x = (int) getPosition().getX();
        int y = (int) getPosition().getY();
        int w = getWidth();
        int h = getHeight();

        // Pulse effect for high combos
        if (combo >= 5) {
            renderCardPulse(x, y, w, h);
        } else {
            renderCard(x, y, w, h, combo >= 3);
        }

        int color = combo >= 10 ? COLOR_BAD :
                     combo >= 5 ? COLOR_WARN :
                     combo >= 3 ? COLOR_ACCENT : COLOR_TEXT;

        String text = combo + "x COMBO";
        RenderHelper.drawText(text, x + 6, y + 5, color);

        // Timer bar
        float timeLeft = 1f - (now - lastHitTime) / (float) COMBO_TIMEOUT;
        drawProgressBar(x + 4, y + h - 3, w - 8, 1, timeLeft, color);
    }

    @Override
    public int getWidth() {
        return RenderHelper.getTextWidth("99x COMBO") + 12;
    }

    @Override
    public int getHeight() {
        return 22;
    }

    public void onHit() {
        combo++;
        lastHitTime = System.currentTimeMillis();
    }

    public void reset() { combo = 0; }
    public int getCombo() { return combo; }
}
