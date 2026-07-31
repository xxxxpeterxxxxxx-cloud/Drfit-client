package gg.drift.core;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class EventBus {
    private final List<Consumer<DriftEvent>> listeners = new ArrayList<>();

    public void subscribe(Consumer<DriftEvent> listener) {
        listeners.add(listener);
    }

    public void publish(DriftEvent event) {
        for (Consumer<DriftEvent> listener : listeners) {
            try {
                listener.accept(event);
            } catch (Exception e) {
                DriftCore.LOGGER.error("Event listener error", e);
            }
        }
    }
}
