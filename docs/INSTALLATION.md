# Installation Guide

## Prerequisites

### Required
- **Java 17** or higher
- **Maven 3.6+**
- **Git**

### Optional
- **Node.js** (for Playwright tests)
- **Python 3** (for frontend server)
- **Supervisor** (for production deployment)

## Quick Install

### 1. Clone Repository
```bash
git clone https://github.com/magic-stack/magic-stack.git
cd magic-stack
```

### 2. Backend Setup
```bash
cd backends/java
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Verify Installation
```bash
curl http://localhost:8080/api/interstice/status
```

Expected response:
```json
{
  "status": "operational",
  "entityCount": 0,
  "worldHash": "AVALON_..."
}
```

## Detailed Setup

### macOS
```bash
# Install prerequisites
brew install openjdk@17 maven

# Set JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Clone and run
git clone https://github.com/magic-stack/magic-stack.git
cd magic-stack/backends/java
mvn spring-boot:run
```

### Ubuntu/Debian
```bash
# Install prerequisites
sudo apt update
sudo apt install openjdk-17-jdk maven git

# Clone and run
git clone https://github.com/magic-stack/magic-stack.git
cd magic-stack/backends/java
mvn spring-boot:run
```

### Windows
```powershell
# Install prerequisites via Chocolatey
choco install openjdk17 maven git

# Clone and run
git clone https://github.com/magic-stack/magic-stack.git
cd magic-stack\backends\java
mvn spring-boot:run
```

## Configuration

### Application Properties
Edit `src/main/resources/application.properties`:

```properties
# Server port
server.port=8080

# Database (H2 embedded)
spring.datasource.url=jdbc:h2:file:./data/magic
spring.h2.console.enabled=true

# Logging
logging.level.com.magicstack=INFO
```

### Memory Settings
For large deployments:
```bash
java -Xmx2G -Xms1G -jar target/magic-stack-backend-*.jar
```

## Frontend Setup (Optional)

### Simple HTTP Server
```bash
cd frontend
python3 -m http.server 3000
# or
npx http-server -p 3000
```

### Panopticon Visualization
```bash
cd assets
python3 -m http.server 8001
```

Access at:
- Static: `http://localhost:8001/panopticon-6d-grut.html`
- Dynamic: `http://localhost:8001/panopticon-6d-dynamic.html`

## Production Deployment

### Using Supervisor
```bash
# Install supervisor
brew install supervisor  # macOS
sudo apt install supervisor  # Ubuntu

# Copy configuration
sudo cp supervisor/magic-stack.conf /etc/supervisor/conf.d/

# Start service
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start magic-stack
```

### Using Systemd
```bash
# Create service file
sudo nano /etc/systemd/system/magic-stack.service

# Add configuration (see systemd/magic-stack.service)

# Enable and start
sudo systemctl enable magic-stack
sudo systemctl start magic-stack
```

## Troubleshooting

### Port Already in Use
```bash
# Find process
lsof -i:8080

# Kill process
kill -9 <PID>
```

### Maven Build Failures
```bash
# Clear cache
mvn clean
rm -rf ~/.m2/repository/com/magicstack

# Rebuild
mvn clean install -U
```

### Database Issues
```bash
# Reset database
rm -rf data/magic.mv.db
mvn spring-boot:run
```

### Java Version Issues
```bash
# Check version
java -version

# Switch version (macOS)
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Switch version (Linux)
sudo update-alternatives --config java
```

## Using the Menu

We provide an interactive menu:
```bash
./pop-menu.sh
```

Options include:
- Launch all services
- Run tests
- View logs
- Compile backend
- And more!

## Next Steps

1. Check API documentation: `http://localhost:8080/api`
2. Read the [Developer Guide](DEVELOPER_GUIDE.md)
3. Explore the [API Reference](API_QUICK_REFERENCE.md)
4. Try the Panopticon visualization

## Support

- GitHub Issues for bugs
- Discussions for questions
- Check existing documentation first

---

*Happy spell casting! 🔮*