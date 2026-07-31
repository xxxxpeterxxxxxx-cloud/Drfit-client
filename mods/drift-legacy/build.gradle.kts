plugins {
    id("java")
    id("fabric-loom") version "1.7.0"
}

group = "gg.drift.client"
version = "0.1.0"

// Legacy Fabric for 1.8.9
val minecraftVersion = "1.8.9"
val yarnMappings = "1.8.9+build.202106161454"
val loaderVersion = "0.16.10"
val fabricVersion = "0.40.1+1.8.9"

dependencies {
    minecraft("com.mojang:minecraft:${minecraftVersion}")
    mappings("net.fabricmc:yarn:${yarnMappings}:v2")
    modImplementation("net.fabricmc:fabric-loader:${loaderVersion}")
    modImplementation("net.fabricmc.legacy-fabric-api:fabric-api:${fabricVersion}")
    modImplementation(project(":drift-core"))
}

tasks.processResources {
    inputs.property("version", project.version)
    filesMatching("fabric.mod.json") {
        expand(Pair("version", project.version))
    }
}
