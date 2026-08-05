package gg.drift.hud.hud;

public class HudRenderer {
    private static boolean editMode = false;

    public static void renderAll(float tickDelta) {
        for (HudElement element : HudRegistry.getAll()) {
            if (element.isEnabled() || editMode) {
                element.updateAnimation();
                element.render(tickDelta);
            }
        }
    }

    public static boolean isEditMode() { return editMode; }
    public static void setEditMode(boolean mode) { editMode = mode; }
    public static void toggleEditMode() { editMode = !editMode; }
}
