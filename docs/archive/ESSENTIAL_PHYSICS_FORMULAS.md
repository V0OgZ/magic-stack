# Essential Physics Formulas - Magic Stack

## 6D Space Calculations

### Core Distance Formula
```java
double distance6D(Position6D a, Position6D b) {
    return Math.sqrt(
        Math.pow(a.x - b.x, 2) +
        Math.pow(a.y - b.y, 2) +
        Math.pow(a.z - b.z, 2) +
        Math.pow(a.t - b.t, 2) +
        Math.pow(a.c - b.c, 2) +
        Math.pow(a.psi - b.psi, 2)
    );
}
```

### Temporal Mechanics

#### Paradox Risk Calculation
```java
double paradoxRisk = Math.min(0.95, temporalShift * 0.15 + duration * 0.05);
```

#### Temporal Stability
```java
double stability = Math.max(0.1, 1.0 - Math.abs(temporalShift) * 0.3);
```

### Spatial Effects

#### Effect Radius
```java
double radius = Math.sqrt(power * power) * scaleFactor;
```

#### Force Falloff
```java
double force = basePower / (1 + distance * 0.1);
```

### Causal Probability

#### Event Likelihood
```java
double probability = baseProb * Math.exp(-distance / decayConstant);
```

#### Reality Coefficient
```java
double reality = 1.0 / (1.0 + entropy * timeElapsed);
```

## Performance Formulas

### Cache Hit Rate
```
hitRate = cacheHits / (cacheHits + cacheMisses)
```

### Throughput
```
throughput = requestsProcessed / timeElapsed
```

### Latency Percentiles
```
P99 = sortedLatencies[floor(0.99 * sampleCount)]
```