plugins {
    id("java")
    id("fabric-loom")
}

group = "gg.drift.client"
version = "0.1.0"

val minecraftVersion = "1.8.9"
val yarnMappings = "1.8.9+build.202206171821"
val loaderVersion = "0.16.10"

dependencies {
    minecraft("com.mojang:minecraft:${minecraftVersion}")
    mappings("net.fabricmc:yarn:${yarnMappings}:v2")
    modImplementation("net.fabricmc:fabric-loader:${loaderVersion}")
}

loom {
    mixin {
        defaultRefmapName = "driftlegacy.refmap.json"
    }
}

tasks.processResources {
    inputs.property("version", project.version)
    filesMatching("fabric.mod.json") {
        expand(Pair("version", project.version))
    }
}
