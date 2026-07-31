package gg.drift.hud.hud;

public class HudRenderer {
    public static void renderAll(float tickDelta) {
        for (HudElement element : HudRegistry.getAll()) {
            if (element.isEnabled()) {
                element.render(tickDelta);
            }
        }
    }
}
