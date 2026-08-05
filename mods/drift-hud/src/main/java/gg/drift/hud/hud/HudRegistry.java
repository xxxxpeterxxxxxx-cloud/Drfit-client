package gg.drift.hud.hud;

import java.util.LinkedHashMap;
import java.util.Map;

public class HudRegistry {
    private static final Map<String, HudElement> elements = new LinkedHashMap<>();

    public static void register(HudElement element) {
        elements.put(element.getId(), element);
    }

    public static void unregister(String id) {
        elements.remove(id);
    }

    public static HudElement get(String id) {
        return elements.get(id);
    }

    public static java.util.Collection<HudElement> getAll() {
        return elements.values();
    }

    public static int count() {
        return elements.size();
    }

    public static void setEnabled(String id, boolean enabled) {
        HudElement el = elements.get(id);
        if (el != null) el.setEnabled(enabled);
    }

    public static void toggle(String id) {
        HudElement el = elements.get(id);
        if (el != null) el.setEnabled(!el.isEnabled());
    }
}
