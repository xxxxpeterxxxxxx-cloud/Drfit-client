package gg.drift.core;

public class DriftEvent {
    private final String type;
    private final Object data;

    public DriftEvent(String type, Object data) {
        this.type = type;
        this.data = data;
    }

    public String getType() { return type; }
    public Object getData() { return data; }

    @SuppressWarnings("unchecked")
    public <T> T getDataAs() { return (T) data; }
}
