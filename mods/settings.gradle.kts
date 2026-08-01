pluginManagement {
    repositories {
        gradlePluginPortal()
        maven("https://maven.fabricmc.net") {
            name = "Fabric"
        }
    }
    resolutionStrategy {
        eachPlugin {
            if (requested.id.id == "fabric-loom") {
                useModule("net.fabricmc:fabric-loom:${requested.version}")
            }
        }
    }
}

rootProject.name = "drift-mods"

include("drift-core")
include("drift-hud")
include("drift-qol")
include("drift-perf")
include("drift-legacy")
