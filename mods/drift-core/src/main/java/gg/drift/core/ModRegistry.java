package gg.drift.core;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

public class ModRegistry {
    private final Map<String, DriftModule> modules = new LinkedHashMap<>();

    public void register(DriftModule module) {
        modules.put(module.getId(), module);
        DriftCore.LOGGER.info("Registered Drift module: {} v{}", module.getId(), module.getVersion());
    }

    public void registerCoreModules() {
        // Core modules are registered by their respective entrypoints
        // This is called during DriftCore initialization
    }

    public DriftModule getModule(String id) {
        return modules.get(id);
    }

    public Collection<DriftModule> getModules() {
        return modules.values();
    }

    public int getModuleCount() {
        return modules.size();
    }

    public boolean isModuleEnabled(String id) {
        DriftModule module = modules.get(id);
        return module != null && module.isEnabled();
    }

    public void setModuleEnabled(String id, boolean enabled) {
        DriftModule module = modules.get(id);
        if (module != null) {
            module.setEnabled(enabled);
        }
    }
}
