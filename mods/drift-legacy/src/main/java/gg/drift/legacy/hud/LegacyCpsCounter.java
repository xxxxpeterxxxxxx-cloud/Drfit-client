package gg.drift.legacy.hud;

import java.util.ArrayList;
import java.util.List;

public class LegacyCpsCounter {
    public static boolean enabled = true;
    private static final List<Long> leftClicks = new ArrayList<>();
    private static final List<Long> rightClicks = new ArrayList<>();

    public static void onLeftClick() {
        leftClicks.add(System.currentTimeMillis());
    }

    public static void onRightClick() {
        rightClicks.add(System.currentTimeMillis());
    }

    public static int getLeftCps() {
        long now = System.currentTimeMillis();
        leftClicks.removeIf(t -> now - t > 1000);
        return leftClicks.size();
    }

    public static int getRightCps() {
        long now = System.currentTimeMillis();
        rightClicks.removeIf(t -> now - t > 1000);
        return rightClicks.size();
    }

    public static void render() {
        if (!enabled) return;

        int leftCps = getLeftCps();
        int rightCps = getRightCps();
        String text = "CPS: " + leftCps + " | " + rightCps;
        int color = LegacyRenderHelper.rgb(16, 185, 129);

        int width = LegacyRenderHelper.getTextWidth(text) + 8;
        LegacyRenderHelper.drawRect(4, 40, width, 16, LegacyRenderHelper.rgba(10, 14, 26, 180));
        LegacyRenderHelper.drawTextWithShadow(text, 8, 44, color);
    }
}
