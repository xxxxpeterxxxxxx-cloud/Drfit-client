plugins {
    id("java")
}

group = "gg.drift.client"
version = "0.1.0"

allprojects {
    repositories {
        mavenCentral()
        maven("https://maven.fabricmc.net")
        maven("https://maven.legacyfabric.net")
    }
}

subprojects {
    apply(plugin = "java")

    java {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }

    tasks.withType<JavaCompile> {
        options.encoding = "UTF-8"
    }
}

// Ensure drift-core is built before dependent projects try to read its JAR
project(":drift-hud").evaluationDependsOn(":drift-core")
project(":drift-qol").evaluationDependsOn(":drift-core")
project(":drift-perf").evaluationDependsOn(":drift-core")
