package gg.drift.hud.hud;

import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.RenderHelper;

import java.util.ArrayList;
import java.util.List;

public class HudConfigScreen {
    private static boolean open = false;
    private static int selectedSlot = 0;
    private static final int ELEMENTS_PER_PAGE = 6;
    private static int scrollOffset = 0;
    private static int screenWidth = 1920;
    private static int screenHeight = 1080;

    public static void open() { open = true; selectedSlot = 0; scrollOffset = 0; }
    public static void close() { open = false; }
    public static boolean isOpen() { return open; }

    public static void render(int sw, int sh, int mouseX, int mouseY) {
        if (!open) return;
        screenWidth = sw;
        screenHeight = sh;

        // Dim background
        RenderHelper.drawRect(0, 0, screenWidth, screenHeight, ColorUtils.rgba(0, 0, 0, 120));

        // Panel
        int panelW = 280;
        int panelH = 320;
        int panelX = (screenWidth - panelW) / 2;
        int panelY = (screenHeight - panelH) / 2;

        // Panel background
        RenderHelper.drawOutlinedRect(panelX, panelY, panelW, panelH,
            ColorUtils.rgba(8, 11, 20, 240), ColorUtils.rgb(26, 35, 54));

        // Header
        RenderHelper.drawText("Drift HUD Settings", panelX + 12, panelY + 10, ColorUtils.rgb(16, 185, 129));
        RenderHelper.drawText("Click to toggle · Drag to move", panelX + 12, panelY + 22, ColorUtils.rgb(100, 116, 139));

        // Divider
        RenderHelper.drawRect(panelX + 12, panelY + 34, panelW - 24, 1, ColorUtils.rgba(26, 35, 54, 200));

        // Element list
        List<HudElement> elements = new ArrayList<>(HudRegistry.getAll());
        int listY = panelY + 42;
        int rowH = 36;

        for (int i = 0; i < Math.min(elements.size(), ELEMENTS_PER_PAGE); i++) {
            int idx = i + scrollOffset;
            if (idx >= elements.size()) break;

            HudElement el = elements.get(idx);
            int rowY = listY + i * rowH;
            int rowX = panelX + 8;
            int rowW = panelW - 16;

            boolean hovered = mouseX >= rowX && mouseX <= rowX + rowW && mouseY >= rowY && mouseY <= rowY + rowH - 2;
            boolean selected = i == selectedSlot;

            // Row background
            int rowBg = hovered ? ColorUtils.rgba(15, 20, 34, 200) : ColorUtils.rgba(0, 0, 0, 0);
            if (rowBg != 0) RenderHelper.drawRect(rowX, rowY, rowW, rowH - 2, rowBg);

            // Element name
            int nameColor = el.isEnabled() ? ColorUtils.rgb(241, 245, 249) : ColorUtils.rgb(100, 116, 139);
            RenderHelper.drawText(el.getName(), rowX + 8, rowY + 6, nameColor);

            // Status text
            String status = el.isEnabled() ? "ON" : "OFF";
            int statusColor = el.isEnabled() ? ColorUtils.rgb(52, 211, 153) : ColorUtils.rgb(100, 116, 139);
            RenderHelper.drawText(status, rowX + 8, rowY + 18, statusColor);

            // Toggle bar
            int barX = rowX + rowW - 50;
            int barY = rowY + 14;
            int barW = 40;
            int barH = 6;

            // Bar background
            RenderHelper.drawRect(barX, barY, barW, barH, ColorUtils.rgba(30, 42, 66, 200));
            // Bar fill
            int fillW = el.isEnabled() ? barW : barW / 2;
            int fillColor = el.isEnabled() ? ColorUtils.rgb(16, 185, 129) : ColorUtils.rgba(100, 116, 139, 150);
            RenderHelper.drawRect(barX, barY, fillW, barH, fillColor);

            // Border
            RenderHelper.drawOutlinedRect(rowX, rowY, rowW, rowH - 2,
                ColorUtils.rgba(0, 0, 0, 0),
                selected ? ColorUtils.rgb(16, 185, 129) : ColorUtils.rgba(26, 35, 54, 100));
        }

        // Footer
        int footerY = panelY + panelH - 30;
        RenderHelper.drawRect(panelX + 12, footerY - 4, panelW - 24, 1, ColorUtils.rgba(26, 35, 54, 200));
        RenderHelper.drawText("ESC to close · Scroll to navigate", panelX + 12, footerY, ColorUtils.rgb(100, 116, 139));

        // Page indicator
        int totalPages = (elements.size() + ELEMENTS_PER_PAGE - 1) / ELEMENTS_PER_PAGE;
        if (totalPages > 1) {
            String pageText = (scrollOffset / ELEMENTS_PER_PAGE + 1) + "/" + totalPages;
            RenderHelper.drawText(pageText, panelX + panelW - RenderHelper.getTextWidth(pageText) - 12, footerY, ColorUtils.rgb(100, 116, 139));
        }
    }

    public static void onClick(int mouseX, int mouseY, int button) {
        if (!open) return;

        int panelW = 280;
        int panelH = 320;
        int panelX = (screenWidth - panelW) / 2;
        int panelY = (screenHeight - panelH) / 2;

        int listY = panelY + 42;
        int rowH = 36;
        int rowX = panelX + 8;
        int rowW = panelW - 16;

        List<HudElement> elements = new ArrayList<>(HudRegistry.getAll());

        for (int i = 0; i < Math.min(elements.size(), ELEMENTS_PER_PAGE); i++) {
            int idx = i + scrollOffset;
            if (idx >= elements.size()) break;

            int rowY = listY + i * rowH;
            if (mouseX >= rowX && mouseX <= rowX + rowW && mouseY >= rowY && mouseY <= rowY + rowH - 2) {
                selectedSlot = i;
                HudElement el = elements.get(idx);
                el.setEnabled(!el.isEnabled());
                return;
            }
        }
    }

    public static void onScroll(double amount) {
        if (!open) return;
        List<HudElement> elements = new ArrayList<>(HudRegistry.getAll());
        int maxScroll = Math.max(0, elements.size() - ELEMENTS_PER_PAGE);
        scrollOffset = Math.max(0, Math.min(maxScroll, scrollOffset + (int) Math.signum(amount) * 1));
    }

    public static void onKey(int key) {
        if (!open) return;
        // Left/right or up/down to navigate
        if (key == 264 || key == 83) { // Down or S
            selectedSlot = Math.min(ELEMENTS_PER_PAGE - 1, selectedSlot + 1);
        } else if (key == 265 || key == 87) { // Up or W
            selectedSlot = Math.max(0, selectedSlot - 1);
        } else if (key == 257 || key == 32) { // Enter or Space
            List<HudElement> elements = new ArrayList<>(HudRegistry.getAll());
            int idx = selectedSlot + scrollOffset;
            if (idx < elements.size()) {
                elements.get(idx).setEnabled(!elements.get(idx).isEnabled());
            }
        }
    }
}
