# 🔮 Magic Stack Framework

**A Revolutionary 6D Spatial-Temporal Engine**

[![License](https://img.shields.io/badge/license-Honor%20License-blue.svg)](LICENSE)
[![Performance](https://img.shields.io/badge/performance-37x%20faster-green.svg)](#performance)
[![Open Source](https://img.shields.io/badge/open%20source-ready-brightgreen.svg)](#contributing)

---

## 🚀 What is Magic Stack?

Magic Stack is a **hybrid Java/Rust backend system** that implements a **6-dimensional spatial-temporal search engine**. It provides a revolutionary alternative to traditional high-dimensional embeddings (1536D → 6D) with **37x better performance**.

### ⚡ Key Benefits

- **37x Faster** than traditional vector databases
- **256x Less Memory** usage per entity  
- **No GPU Required** - runs on commodity hardware
- **869 Magic Formulas** - complete spell system included
- **Production Ready** - 1,600+ req/s throughput

---

## 🏗️ Architecture

```
┌─────────────────────┐     ┌─────────────────────┐
│   Java Backend      │────▶│   Rust Backend      │
│   (Spring Boot)     │     │   (Tokio/Axum)     │
├─────────────────────┤     ├─────────────────────┤
│ • Business Logic    │     │ • Q* Search         │
│ • REST API          │     │ • 6D Calculations   │  
│ • Magic Formulas    │     │ • Spatial Index     │
└─────────────────────┘     └─────────────────────┘
      Port 8080                   Port 3001
```

---

## 📊 Performance Benchmarks

*Tested on Mac Mini M4*

| Operation | Traditional (1536D) | Magic Stack (6D) | **Improvement** |
|-----------|---------------------|------------------|-----------------|
| Single Search | 187ms | 5ms | **37x faster** |
| Batch (100 queries) | 18.7s | 450ms | **41x faster** |
| Memory per Entity | 12KB | 48B | **256x less** |

---

## 🎯 Quick Start

### Prerequisites
- Java 21+
- Rust 1.70+ 
- Maven 3.8+

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/magic-stack.git
cd magic-stack

# Build Java backend
cd backends/java
mvn clean package

# Build Rust backend  
cd ../rust
cargo build --release

# Start both backends
./start-magic-autonome.sh
```

### Basic Usage

```bash
# Test the 6D search
curl -X POST http://localhost:3001/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "magic sword",
    "center_x": 0, "center_y": 0, "center_z": 0,
    "center_t": 0, "center_c": 1, "center_psi": 0,
    "radius": 100,
    "max_results": 10
  }'
```

---

## 📚 Essential Documentation

1. **[6D System Explained](../6D_SYSTEM_EXPLAINED.md)** - Core concepts
2. **[API Reference](../API_QUICK_REFERENCE.md)** - REST endpoints
3. **[Installation Guide](../INSTALLATION.md)** - Complete setup
4. **[Developer Guide](../DEVELOPER_GUIDE.md)** - Development workflow
5. **[Technical Overview](../TECHNICAL_OVERVIEW.md)** - Architecture details

---

## 🌟 Why Magic Stack?

Traditional vector databases use **1536+ dimensions** and require expensive GPU processing. Magic Stack uses only **6 meaningful dimensions**:

- **X, Y, Z**: Spatial coordinates
- **T**: Time/temporal position  
- **C**: Causal probability (0.0-1.0)
- **Ψ**: Identity coherence (-1 to 1)

This approach is:
- ✅ **Deterministic** - same query, same results
- ✅ **Explainable** - you understand what each dimension means
- ✅ **Efficient** - no black-box embeddings
- ✅ **Scalable** - works from prototype to production

---

## 🤝 Contributing

We welcome contributions! Magic Stack is designed to be the foundation for innovative virtual world applications.

### Development Setup
```bash
# Run tests
cd backends/rust && cargo test
cd backends/java && mvn test

# Start development mode
./start-magic-autonome.sh
```

---

## 📜 License

Licensed under the **Honor License** - 1% revenue share for commercial use.

---

## 🔗 Links

- **Documentation**: [Full Documentation](../README.md)
- **Issues**: [GitHub Issues](https://github.com/your-org/magic-stack/issues)
- **Community**: [Discussions](https://github.com/your-org/magic-stack/discussions)

---

*Built with ❤️ by the AVALON team*