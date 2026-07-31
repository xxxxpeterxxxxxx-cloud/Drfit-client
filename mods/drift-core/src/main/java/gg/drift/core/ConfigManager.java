package gg.drift.core;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import net.fabricmc.loader.api.FabricLoader;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

public class ConfigManager {
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private static final Path CONFIG_DIR = FabricLoader.getInstance().getConfigDir().resolve("drift");

    private final Map<String, Object> configs = new HashMap<>();

    public void load() {
        try {
            Files.createDirectories(CONFIG_DIR);
        } catch (IOException e) {
            DriftCore.LOGGER.error("Failed to create config directory", e);
        }
    }

    public <T> T loadConfig(String name, Class<T> configClass, T defaultValue) {
        Path configPath = CONFIG_DIR.resolve(name + ".json");

        if (Files.exists(configPath)) {
            try {
                String content = Files.readString(configPath);
                T config = GSON.fromJson(content, configClass);
                configs.put(name, config);
                return config;
            } catch (IOException e) {
                DriftCore.LOGGER.error("Failed to load config: {}", name, e);
            }
        }

        saveConfig(name, defaultValue);
        configs.put(name, defaultValue);
        return defaultValue;
    }

    public void saveConfig(String name, Object config) {
        Path configPath = CONFIG_DIR.resolve(name + ".json");
        try {
            Files.writeString(configPath, GSON.toJson(config));
            configs.put(name, config);
        } catch (IOException e) {
            DriftCore.LOGGER.error("Failed to save config: {}", name, e);
        }
    }

    @SuppressWarnings("unchecked")
    public <T> T getConfig(String name, Class<T> configClass) {
        return (T) configs.get(name);
    }

    public Path getConfigDir() {
        return CONFIG_DIR;
    }
}
