package gg.drift.legacy.hud;

import net.minecraft.client.MinecraftClient;
import net.minecraft.client.network.ClientPlayerEntity;

public class LegacyPingDisplay {
    public static boolean enabled = true;

    public static void render() {
        if (!enabled) return;
        MinecraftClient mc = MinecraftClient.getInstance();
        if (mc.getNetworkHandler() == null) return;

        int ping = 0;
        if (mc.player != null && mc.getNetworkHandler().getPlayerListEntry(mc.player.getUuid()) != null) {
            ping = mc.getNetworkHandler().getPlayerListEntry(mc.player.getUuid()).getLatency();
        }

        int color;
        if (ping < 50) color = LegacyRenderHelper.rgb(16, 185, 129);
        else if (ping < 150) color = LegacyRenderHelper.rgb(245, 158, 11);
        else color = LegacyRenderHelper.rgb(239, 68, 68);

        String text = "Ping: " + ping + "ms";
        int width = LegacyRenderHelper.getTextWidth(text) + 8;
        LegacyRenderHelper.drawRect(4, 22, width, 16, LegacyRenderHelper.rgba(10, 14, 26, 180));
        LegacyRenderHelper.drawTextWithShadow(text, 8, 26, color);
    }
}
