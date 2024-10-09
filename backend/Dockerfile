# Build stage
FROM maven:3.8.1-openjdk-17 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY /src /build/src/
RUN mvn clean package -DskipTests

# Run stage
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.0
WORKDIR /app
COPY --from=build /build/target/task-tracker-${APP_VERSION}.jar task-tracker-${APP_VERSION}.jar
EXPOSE 8080
ENV DB_URL=jdbc:postgresql://172.19.0.2:5432/task_tracker
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} task-tracker-${JAR_VERSION}.jar