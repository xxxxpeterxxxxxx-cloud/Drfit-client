package gg.drift.hud.mixin;

import gg.drift.hud.hud.HudRenderer;
import gg.drift.hud.hud.HudConfigScreen;
import gg.drift.core.render.RenderHelper;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.client.gui.hud.InGameHud;
import net.minecraft.client.render.RenderTickCounter;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(InGameHud.class)
public class InGameHudMixin {

    @Inject(method = "render", at = @At("TAIL"))
    private void onRender(DrawContext context, RenderTickCounter tickCounter, CallbackInfo ci) {
        float tickDelta = tickCounter.getTickDelta(true);

        // Set the render context so RenderHelper can draw
        RenderHelper.setContext(context);

        HudRenderer.renderAll(tickDelta);

        if (HudConfigScreen.isOpen()) {
            int screenWidth = context.getScaledWindowWidth();
            int screenHeight = context.getScaledWindowHeight();
            int mouseX = (int) (net.minecraft.client.MinecraftClient.getInstance().mouse.getX() / net.minecraft.client.MinecraftClient.getInstance().getWindow().getScaleFactor());
            int mouseY = (int) (net.minecraft.client.MinecraftClient.getInstance().mouse.getY() / net.minecraft.client.MinecraftClient.getInstance().getWindow().getScaleFactor());
            HudConfigScreen.render(screenWidth, screenHeight, mouseX, mouseY);
        }

        RenderHelper.clearContext();
    }
}
