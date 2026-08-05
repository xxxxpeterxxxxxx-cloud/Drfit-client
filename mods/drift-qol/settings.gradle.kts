pluginManagement {
    repositories {
        gradlePluginPortal()
        maven("https://maven.fabricmc.net") {
            name = "Fabric"
        }
    }
    plugins {
        id("fabric-loom") version "1.7.4"
        id("org.jetbrains.kotlin.jvm") version "2.0.0"
    }
    resolutionStrategy {
        eachPlugin {
            if (requested.id.id == "fabric-loom") {
                useModule("net.fabricmc:fabric-loom:1.7.4")
            }
        }
    }
}

rootProject.name = "drift-qol"
