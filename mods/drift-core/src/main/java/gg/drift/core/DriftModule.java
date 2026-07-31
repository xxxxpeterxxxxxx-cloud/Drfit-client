package gg.drift.core;

public abstract class DriftModule {
    private final String id;
    private final String name;
    private final String version;
    private boolean enabled = true;

    protected DriftModule(String id, String name, String version) {
        this.id = id;
        this.name = name;
        this.version = version;
    }

    public abstract void onEnable();
    public abstract void onDisable();

    public String getId() { return id; }
    public String getName() { return name; }
    public String getVersion() { return version; }
    public boolean isEnabled() { return enabled; }

    public void setEnabled(boolean enabled) {
        if (this.enabled == enabled) return;
        this.enabled = enabled;
        if (enabled) {
            onEnable();
        } else {
            onDisable();
        }
    }
}
