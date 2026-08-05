plugins {
    id("java")
    id("fabric-loom")
}

group = "gg.drift.client"
version = "0.1.0"

val minecraftVersion = "1.21.1"
val yarnMappings = "1.21.1+build.3"
val loaderVersion = "0.15.11"
val fabricVersion = "0.102.0+1.21.1"

dependencies {
    minecraft("com.mojang:minecraft:${minecraftVersion}")
    mappings("net.fabricmc:yarn:${yarnMappings}:v2")
    modImplementation("net.fabricmc:fabric-loader:${loaderVersion}")
    modImplementation("net.fabricmc.fabric-api:fabric-api:${fabricVersion}")
    implementation(project(":drift-core"))
}

tasks.processResources {
    inputs.property("version", project.version)
    filesMatching("fabric.mod.json") {
        expand(Pair("version", project.version))
    }
}
