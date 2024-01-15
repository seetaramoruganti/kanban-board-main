# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-ea-25-slim

# Set the working directory to /app
WORKDIR /app

# Copy the JAR file into the container at /app
COPY target/server-0.0.1-SNAPSHOT.jar /app/

# Specify the command to run on container startup
CMD ["java", "-jar", "server-0.0.1-SNAPSHOT.jar"]
