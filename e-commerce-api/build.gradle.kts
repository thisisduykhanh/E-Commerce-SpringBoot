plugins {
	java
	id ("org.springframework.boot") version "3.4.3"
	id ("io.spring.dependency-management") version "1.1.7"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java.sourceCompatibility = JavaVersion.VERSION_21

repositories {
	mavenCentral()
}

configurations {
	compileOnly {
		extendsFrom(annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation ("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation ("org.springframework.boot:spring-boot-starter-web")
//    implementation("androidx.compose.ui:ui-android:1.7.8")
    compileOnly ("org.projectlombok:lombok")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	runtimeOnly ("com.mysql:mysql-connector-j")
	annotationProcessor ("org.projectlombok:lombok")
	testImplementation ("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly ("org.junit.platform:junit-platform-launcher")

	// https://mvnrepository.com/artifact/com.cloudinary/cloudinary-http44
	implementation ("com.cloudinary:cloudinary-http44:1.29.0")

	//json web token

	// https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-impl
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6")

	// https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-jackson
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.6")
	// https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-api
	implementation("io.jsonwebtoken:jjwt-api:0.12.6")


	// https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-security
	implementation("org.springframework.boot:spring-boot-starter-security:3.4.3")


	// https://mvnrepository.com/artifact/org.springdoc/springdoc-openapi-starter-webmvc-ui
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.6")


// https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-websocket
	implementation("org.springframework.boot:spring-boot-starter-websocket:3.4.4")

	// https://mvnrepository.com/artifact/com.github.librepdf/openpdf
	implementation("com.github.librepdf:openpdf:2.0.3")


	// https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind
//	implementation("com.fasterxml.jackson.core:jackson-databind:2.19.0-rc2")

}

tasks.named<Test>("test") {
	useJUnitPlatform()
}