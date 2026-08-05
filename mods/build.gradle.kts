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
    pluginManager.withPlugin("java") {
        extensions.configure<JavaPluginExtension> {
            sourceCompatibility = JavaVersion.VERSION_21
            targetCompatibility = JavaVersion.VERSION_21
        }
    }

    tasks.withType<JavaCompile> {
        options.encoding = "UTF-8"
    }
}

// drift-hud and drift-perf depend on drift-core via modImplementation(project(":drift-core"))
// Ensure compileJava waits for drift-core:remapJar
project(":drift-hud").afterEvaluate {
    tasks.named("compileJava").configure { dependsOn(project(":drift-core").tasks.named("remapJar")) }
}
project(":drift-perf").afterEvaluate {
    tasks.named("compileJava").configure { dependsOn(project(":drift-core").tasks.named("remapJar")) }
}
