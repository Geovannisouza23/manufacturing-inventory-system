# Multi-stage build - Stage 1: Build com Maven 3.6.3 e Java 11
FROM maven:3.6.3-jdk-11-slim AS build

WORKDIR /app

# Copy pom.xml and download dependencies (cache layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application (uber-jar para simplificar deployment)
RUN mvn clean package -DskipTests -Dquarkus.package.type=uber-jar

# Runtime stage - Java 11 JRE (usando eclipse-temurin que é mantido ativamente)
FROM eclipse-temurin:11-jre-alpine

# Instalar wget para healthcheck
RUN apk add --no-cache wget

WORKDIR /app

# Copy the built uber-jar
COPY --from=build /app/target/*-runner.jar app.jar

# Expose port
EXPOSE 8080

# Environment variables (can be overridden)
ENV QUARKUS_HTTP_HOST=0.0.0.0
ENV QUARKUS_HTTP_PORT=8080

# Run the application
CMD ["java", "-Dquarkus.http.host=0.0.0.0", "-jar", "app.jar"]
