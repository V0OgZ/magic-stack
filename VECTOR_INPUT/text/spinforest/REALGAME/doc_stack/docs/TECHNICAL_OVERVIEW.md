# Technical Overview - Magic Stack

## System Architecture

### Core Components

1. **Position6D Engine**
   - 6-dimensional coordinate system
   - Euclidean distance calculations
   - Validation and normalization

2. **Q* Search Algorithm**
   - A* pathfinding adapted for 6D
   - Spatial indexing with grid cells
   - O(log n) query complexity

3. **Magic Formula System**
   - 869 pre-defined formulas
   - Temporal grammar parsing
   - Effect calculation engine

4. **Persistence Layer**
   - H2 embedded database
   - Entity storage with 6D positions
   - Feature logging system

## Technology Stack

### Java Backend
- **Framework**: Spring Boot 3.x
- **Build**: Maven
- **Database**: H2 (embedded)
- **JDK**: 21+ (optimized for Apple Silicon)

### Rust Backend
- **Framework**: Axum + Tokio
- **Features**: SIMD operations, parallel processing
- **FFI**: Optional Java integration

## Key Algorithms

### Distance Calculation
```java
public double distanceTo(Position6D other) {
    double dx = this.x - other.x;
    double dy = this.y - other.y;
    double dz = this.z - other.z;
    double dt = this.t - other.t;
    double dc = this.c - other.c;
    double dpsi = this.psi - other.psi;
    return Math.sqrt(dx*dx + dy*dy + dz*dz + dt*dt + dc*dc + dpsi*dpsi);
}
```

### Spatial Index Query
```rust
fn query_radius(&self, center: &Position6D, radius: f64) -> Vec<EntityId> {
    let min_cell = self.position_to_cell(center - radius);
    let max_cell = self.position_to_cell(center + radius);
    
    let mut results = Vec::new();
    for cell in cells_in_range(min_cell, max_cell) {
        if let Some(entities) = self.grid.get(&cell) {
            results.extend(entities);
        }
    }
    results
}
```

## Performance Optimizations

1. **Caching**
   - LRU cache for frequent queries
   - Distance matrix for hot paths
   - Compiled formula cache

2. **Parallel Processing**
   - ForkJoinPool for Java operations
   - Rayon for Rust parallel iterators
   - Async I/O throughout

3. **Memory Management**
   - Object pooling for Position6D
   - Zero-copy serialization
   - Compressed storage format

## Deployment

### Docker
```dockerfile
FROM openjdk:21-slim
COPY target/magic-stack.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: magic-stack
spec:
  replicas: 3
  selector:
    matchLabels:
      app: magic-stack
  template:
    metadata:
      labels:
        app: magic-stack
    spec:
      containers:
      - name: java-backend
        image: magic-stack:latest
        ports:
        - containerPort: 8080
      - name: rust-backend
        image: magic-stack-rust:latest
        ports:
        - containerPort: 3001
```

## Monitoring

- **Metrics**: Prometheus endpoints
- **Logging**: SLF4J + Logback
- **Tracing**: OpenTelemetry support
- **Health**: Spring Actuator

## Security

- JWT authentication ready
- CORS configuration
- Rate limiting
- Input validation