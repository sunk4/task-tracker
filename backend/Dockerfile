# Stage 1: Build the JAR file
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy the pom.xml and the source code
COPY pom.xml .
COPY src ./src

# Package the application and create a JAR file
RUN mvn clean package -DskipTests

# Stage 2: Build the final image
FROM amazoncorretto:17

# Copy the JAR file from the previous stage
COPY --from=build /app/target/*.jar application.jar

# Run the Java application
ENTRYPOINT ["java", "-Xmx2048M", "-jar", "/application.jar"]
