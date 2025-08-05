# Magic Stack - High-Performance 6D Engine

## Overview

Magic Stack is a hybrid Java/Rust backend system implementing a 6-dimensional spatial-temporal search engine. It provides an efficient alternative to traditional high-dimensional embeddings for virtual world applications.

### Key Features

- **6D Positioning System**: Spatial (x,y,z), temporal (t), causal (c), and identity (ψ) dimensions
- **Q* Search Algorithm**: A* pathfinding adapted for 6D space
- **Hybrid Architecture**: Java for business logic, Rust for performance-critical operations
- **869 Magic Formulas**: Complete spell system with temporal grammar
- **Production Ready**: 1,600+ req/s throughput on commodity hardware

## Architecture

```
┌─────────────────────┐     ┌─────────────────────┐
│   Java Backend      │────▶│   Rust Backend      │
│   (Spring Boot)     │     │   (Tokio/Axum)     │
├─────────────────────┤     ├─────────────────────┤
│ • Business Logic    │     │ • Q* Search         │
│ • REST API          │     │ • 6D Calculations   │
│ • Database (H2)     │     │ • Spatial Index     │
└─────────────────────┘     └─────────────────────┘
      Port 8080                   Port 3001
```

## Quick Start

### Prerequisites
- Java 21+
- Rust 1.70+
- Maven 3.8+

### Installation

```bash
# Clone repository
git clone https://github.com/V0OgZ/magic-stack.git
cd magic-stack

# Build Java backend
cd backends/java
mvn clean package

# Build Rust backend
cd ../rust
cargo build --release
```

### Running

```bash
# Start both backends
./start-magic-autonome.sh

# Or individually:
# Java
java -jar backends/java/target/magic-stack-*.jar

# Rust
./backends/rust/target/release/magic-stack-rust
```

## API Reference

### Java Backend (Port 8080)

#### Health Check
```
GET /api/magic/health
```

#### Cast Spell
```
POST /api/magic/cast
{
  "formula": "LIGHT",
  "parameters": {}
}
```

#### Store Entity
```
POST /api/interstice/store
{
  "entityId": "sword-001",
  "entityType": "ITEM",
  "data": {"damage": 50}
}
```

### Rust Backend (Port 3001)

#### Q* Search
```
POST /api/search
{
  "query": "magic sword",
  "center_x": 0, "center_y": 0, "center_z": 0,
  "center_t": 0, "center_c": 1, "center_psi": 0,
  "radius": 100,
  "max_results": 10
}
```

## Performance

Benchmarked on Mac Mini M4:

| Operation | Traditional (1536D) | Magic Stack (6D) | Speedup |
|-----------|---------------------|------------------|---------|
| Single Search | 187ms | 5ms | 37x |
| Batch (100) | 18,700ms | 450ms | 41x |
| Memory/Entity | 12KB | 48B | 256x |

## Documentation

- [Developer Guide](docs/DEVELOPER_GUIDE.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Physics Formulas](docs/ESSENTIAL_PHYSICS_FORMULAS.md)
- [Installation Guide](docs/INSTALLATION.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

Licensed under the Honor License - 1% revenue share for commercial use.

## Contact

- GitHub: https://github.com/V0OgZ/magic-stack
- Lead: URZ-KÔM (Backend Guardian)