# Developer Guide

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.6+
- Git

### Setup
```bash
git clone https://github.com/magic-stack/magic-stack.git
cd magic-stack/backends/java
mvn spring-boot:run
```

## Project Structure

```
magic-stack/
├── backends/java/
│   ├── src/main/java/com/magicstack/
│   │   ├── controllers/    # REST endpoints
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   └── dto/           # Data transfer objects
│   └── src/main/resources/
│       └── db/changelog/   # Database migrations
└── docs/                   # Documentation
```

## Key Components

### Controllers
- `MagicController` - Magic formula operations
- `IntersticeController` - 6D entity management
- `PanopticonController` - World state visualization
- `MageController` - Mage-specific actions

### Services
- `MagicEngineService` - 869 formulas execution
- `IntersticeService` - 6D coordinate calculations
- `FeatureLogService` - Action tracking with decay

### Models
- `Position6D` - 6-dimensional coordinates
- `FeatureLog` - Mage action logs
- `IntersticeEntity` - 6D stored entities

## Adding New Features

### 1. New Endpoint
```java
@RestController
@RequestMapping("/api/myfeature")
public class MyFeatureController {
    @PostMapping("/action")
    public ResponseEntity<?> performAction(@RequestBody MyRequest req) {
        // Implementation
    }
}
```

### 2. New Service
```java
@Service
public class MyFeatureService {
    public MyResult process(MyRequest request) {
        // Business logic
    }
}
```

### 3. Database Changes
Create new changelog in `db/changelog/changes/`:
```yaml
databaseChangeLog:
  - changeSet:
      id: 004-my-feature
      author: yourname
      changes:
        - createTable:
            tableName: my_feature
```

## Testing

### Unit Tests
```java
@SpringBootTest
class MyFeatureServiceTest {
    @Test
    void testFeature() {
        // Test implementation
    }
}
```

### Run Tests
```bash
mvn test                    # Unit tests
mvn verify                  # Integration tests
mvn test -Dtest=MyTest      # Specific test
```

## Code Style

- Use meaningful names
- Document complex logic
- Follow Spring conventions
- Keep methods focused
- Write tests for new features

## Debugging

### Enable Debug Logging
```properties
logging.level.com.magicstack=DEBUG
```

### Common Issues

1. **Port already in use**
   ```bash
   lsof -i:8080
   kill -9 <PID>
   ```

2. **Database locked**
   - Delete `magic.mv.db` and restart

3. **Compilation errors**
   ```bash
   mvn clean compile
   ```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Write/update tests
5. Submit pull request

## Support

- GitHub Issues: Report bugs
- Documentation: Check `/docs`
- API Docs: `http://localhost:8080/api`