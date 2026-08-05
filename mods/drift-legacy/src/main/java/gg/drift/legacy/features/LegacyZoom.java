package gg.drift.legacy.features;

import net.minecraft.client.MinecraftClient;
import org.lwjgl.input.Keyboard;

public class LegacyZoom {
    public static boolean enabled = true;
    public static double targetFov = 30.0;
    private static double defaultFov = 70.0;
    private static double currentFov = 70.0;
    private static boolean zooming = false;

    public static void update(MinecraftClient mc) {
        if (!enabled) return;

        zooming = Keyboard.isKeyDown(Keyboard.KEY_C);
        defaultFov = mc.options.getFov().getValue();

        if (zooming) {
            currentFov = animateFov(currentFov, targetFov, 0.15);
        } else {
            currentFov = animateFov(currentFov, defaultFov, 0.15);
        }
    }

    private static double animateFov(double current, double target, double speed) {
        double diff = target - current;
        if (Math.abs(diff) < 0.5) return target;
        return current + diff * speed;
    }

    public static double getZoomFov(double defaultFov) {
        if (!enabled) return defaultFov;
        return currentFov;
    }

    public static boolean isZooming() {
        return zooming;
    }

    public static void reset() {
        currentFov = defaultFov;
        zooming = false;
    }
}
