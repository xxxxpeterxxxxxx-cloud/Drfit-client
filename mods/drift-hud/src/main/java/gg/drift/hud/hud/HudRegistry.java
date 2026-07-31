package gg.drift.hud.hud;

import java.util.Collection;
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

    public static Collection<HudElement> getAll() {
        return elements.values();
    }

    public static void setEnabled(String id, boolean enabled) {
        HudElement element = elements.get(id);
        if (element != null) {
            element.setEnabled(enabled);
        }
    }

    public static void toggle(String id) {
        HudElement element = elements.get(id);
        if (element != null) {
            element.setEnabled(!element.isEnabled());
        }
    }
}
