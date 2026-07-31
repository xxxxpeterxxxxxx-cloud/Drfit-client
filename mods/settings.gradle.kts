pluginManagement {
    repositories {
        gradlePluginPortal()
        maven("https://maven.fabricmc.net")
    }
}

rootProject.name = "drift-mods"

include("drift-core")
include("drift-hud")
include("drift-qol")
include("drift-perf")
include("drift-legacy")
