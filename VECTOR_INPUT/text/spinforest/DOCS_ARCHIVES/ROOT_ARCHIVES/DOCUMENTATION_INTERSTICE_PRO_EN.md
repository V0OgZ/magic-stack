# TECHNICAL DOCUMENTATION - MAGIC STACK API

Version 1.0.0-APOLLO

---

## OVERVIEW

Magic Stack is a 6-dimensional entity persistence system. It provides a REST API for storing, retrieving, and searching complex data structures.

### Key Features

- Java Spring Boot Backend (port 8080)
- 6-dimensional storage (X, Y, Z, T, C, Psi)
- Complete REST API
- 869 predefined formulas
- Automatic update system

---

## QUICK START

### Prerequisites

- Java 17+
- Maven 3.6+
- Port 8080 available

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd magic-stack

# Launch the backend
./LANCE_BACKEND_RESISTANT.sh
```

### Verification

```bash
# Check service status
curl http://localhost:8080/api/magic/health

# Get API documentation
curl http://localhost:8080/api
```

---

## API REFERENCE

See [API_MAGIC_DOCUMENTATION_EN.md](API_MAGIC_DOCUMENTATION_EN.md) for complete endpoint documentation.

---

## 6D COORDINATE SYSTEM

### Dimensions

| Dimension | Description | Range |
|-----------|-------------|-------|
| X | Spatial coordinate X | -∞ to +∞ |
| Y | Spatial coordinate Y | -∞ to +∞ |
| Z | Spatial coordinate Z | -∞ to +∞ |
| T | Timestamp (seconds) | 0 to +∞ |
| C | Causality coefficient | 0.0 to 1.0 |
| Psi | Quantum coefficient | -1.0 to 1.0 |

### Usage

6D coordinates allow storing entities with complex spatial, temporal, and relational metadata.

---

## ARCHITECTURE

### Project Structure

```
magic-stack/
├── backends/
│   └── java/
│       ├── src/main/java/com/magicstack/
│       │   ├── controllers/    # REST endpoints
│       │   ├── services/       # Business logic
│       │   ├── models/         # Data models
│       │   └── dto/            # Transfer objects
│       └── pom.xml
├── docs/                       # Documentation
└── scripts/                    # Utility scripts
```

### Technologies

- Java 17
- Spring Boot 3.2.0
- Maven
- H2 Database (upcoming)

---

## DEVELOPMENT

### Adding an Endpoint

1. Create the DTO in `src/main/java/com/magicstack/dto/`
2. Add the method to the appropriate controller
3. Implement the logic in the service
4. Compile with `mvn compile`
5. Test with curl or Postman

### Testing

```bash
# Compile and run tests
cd magic-stack/backends/java
mvn test
```

### Build

```bash
# Create executable JAR
mvn clean package
```

---

## DEPLOYMENT

### Production

1. Build the JAR
```bash
mvn clean package -DskipTests
```

2. Run with production configuration
```bash
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar --spring.profiles.active=prod
```

### Docker (upcoming)

```bash
docker build -t magic-stack .
docker run -p 8080:8080 magic-stack
```

---

## TROUBLESHOOTING

### Backend won't start

- Check Java version: `java -version`
- Check ports: `lsof -i :8080`
- Check logs: `tail -f magic-stack-backend.log`

### Compilation errors

- Clean Maven cache: `mvn clean`
- Update dependencies: `mvn dependency:resolve`

### Performance issues

- Increase JVM memory: `-Xmx2G`
- Enable profiling: `-Dspring.profiles.active=debug`

---

## CONTRIBUTING

Contributions are welcome. Please follow standard Java coding conventions and include tests for any new features.

---

## LICENSE

Honor License (1% for commercial use)

---

## SUPPORT

For technical questions, consult the documentation or open an issue on the repository.