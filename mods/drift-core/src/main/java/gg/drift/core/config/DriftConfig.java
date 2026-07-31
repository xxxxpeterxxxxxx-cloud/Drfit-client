package gg.drift.core.config;

public class DriftConfig {
    public String version = "1";
    public ModulesConfig modules = new ModulesConfig();
    public HudConfig hud = new HudConfig();
    public QolConfig qol = new QolConfig();
    public PerfConfig perf = new PerfConfig();

    public static class ModulesConfig {
        public boolean core = true;
        public boolean hud = true;
        public boolean qol = true;
        public boolean perf = true;
        public boolean legacy = false;
    }

    public static class HudConfig {
        public String preset = "default";
        public HudElement[] elements = new HudElement[0];
    }

    public static class HudElement {
        public String id;
        public boolean enabled = true;
        public double x = 0;
        public double y = 0;
        public double scale = 1.0;
    }

    public static class QolConfig {
        public boolean toggleSprint = true;
        public boolean toggleSneak = false;
        public boolean fullbright = false;
        public boolean discordRpc = true;
        public ZoomConfig zoom = new ZoomConfig();
        public CrosshairConfig customCrosshair = new CrosshairConfig();

        public static class ZoomConfig {
            public boolean enabled = true;
            public int fov = 30;
        }

        public static class CrosshairConfig {
            public boolean enabled = false;
            public String shape = "cross";
            public String color = "#FFFFFF";
            public int size = 2;
        }
    }

    public static class PerfConfig {
        public boolean sodium = true;
        public boolean lithium = true;
        public boolean ferriteCore = true;
        public boolean iris = false;
        public int ramLimit = 4096;
        public String[] jvmArgs = new String[0];
    }
}
