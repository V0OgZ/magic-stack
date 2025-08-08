//! Vector Operations - High-performance 6D vector mathematics
//! 
//! Optimized vector operations for 6D space calculations, replacing
//! heavy LLM embeddings with fast 6D coordinate mathematics.

use crate::{Position6D, MagicResult, MagicError};
use nalgebra::{Vector6, Matrix6};
use serde::{Deserialize, Serialize};
use rayon::prelude::*;

/// 6D Vector for high-performance mathematical operations
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Vector6D {
    pub data: [f64; 6],
}

/// Vector operation result
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VectorOpResult {
    pub result: Vector6D,
    pub magnitude: f64,
    pub normalized: Vector6D,
}

/// Batch vector operations for parallel processing
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BatchVectorOp {
    pub operation: String,
    pub vectors: Vec<Vector6D>,
    pub parameters: serde_json::Value,
}

impl Vector6D {
    /// Create new 6D vector
    pub fn new(x: f64, y: f64, z: f64, t: f64, c: f64, psi: f64) -> MagicResult<Self> {
        // Validate causal and identity bounds
        if c < 0.0 || c > 1.0 {
            return Err(MagicError::VectorOperationFailed(
                format!("Causal component must be 0-1, got {}", c)
            ));
        }
        if psi < -1.0 || psi > 1.0 {
            return Err(MagicError::VectorOperationFailed(
                format!("Identity component must be -1 to 1, got {}", psi)
            ));
        }
        
        Ok(Vector6D {
            data: [x, y, z, t, c, psi],
        })
    }
    
    /// Create from Position6D
    pub fn from_position(pos: &Position6D) -> Self {
        Vector6D {
            data: [pos.x, pos.y, pos.z, pos.t, pos.c, pos.psi],
        }
    }
    
    /// Convert to Position6D
    pub fn to_position(&self) -> MagicResult<Position6D> {
        Position6D::new(
            self.data[0], self.data[1], self.data[2],
            self.data[3], self.data[4], self.data[5]
        )
    }
    
    /// Zero vector
    pub fn zero() -> Self {
        Vector6D { data: [0.0; 6] }
    }
    
    /// Unit vector in given dimension
    pub fn unit(dimension: usize) -> MagicResult<Self> {
        if dimension >= 6 {
            return Err(MagicError::VectorOperationFailed(
                "Dimension must be 0-5 for 6D vector".to_string()
            ));
        }
        
        let mut data = [0.0; 6];
        data[dimension] = 1.0;
        Ok(Vector6D { data })
    }
    
    /// Vector magnitude (Euclidean norm)
    pub fn magnitude(&self) -> f64 {
        self.data.iter().map(|x| x * x).sum::<f64>().sqrt()
    }
    
    /// Squared magnitude (faster than magnitude)
    pub fn magnitude_squared(&self) -> f64 {
        self.data.iter().map(|x| x * x).sum()
    }
    
    /// Normalize vector to unit length
    pub fn normalize(&self) -> MagicResult<Self> {
        let mag = self.magnitude();
        if mag == 0.0 {
            return Err(MagicError::VectorOperationFailed(
                "Cannot normalize zero vector".to_string()
            ));
        }
        
        Ok(Vector6D {
            data: [
                self.data[0] / mag,
                self.data[1] / mag,
                self.data[2] / mag,
                self.data[3] / mag,
                self.data[4] / mag,
                self.data[5] / mag,
            ],
        })
    }
    
    /// Dot product with another vector
    pub fn dot(&self, other: &Vector6D) -> f64 {
        self.data.iter()
            .zip(other.data.iter())
            .map(|(a, b)| a * b)
            .sum()
    }
    
    /// Distance to another vector
    pub fn distance_to(&self, other: &Vector6D) -> f64 {
        self.data.iter()
            .zip(other.data.iter())
            .map(|(a, b)| (a - b) * (a - b))
            .sum::<f64>()
            .sqrt()
    }
    
    /// Manhattan distance to another vector
    pub fn manhattan_distance_to(&self, other: &Vector6D) -> f64 {
        self.data.iter()
            .zip(other.data.iter())
            .map(|(a, b)| (a - b).abs())
            .sum()
    }
    
    /// Linear interpolation between two vectors
    pub fn lerp(&self, other: &Vector6D, t: f64) -> Self {
        Vector6D {
            data: [
                self.data[0] + t * (other.data[0] - self.data[0]),
                self.data[1] + t * (other.data[1] - self.data[1]),
                self.data[2] + t * (other.data[2] - self.data[2]),
                self.data[3] + t * (other.data[3] - self.data[3]),
                self.data[4] + t * (other.data[4] - self.data[4]),
                self.data[5] + t * (other.data[5] - self.data[5]),
            ],
        }
    }
    
    /// Spherical linear interpolation (slerp) for smoother interpolation
    pub fn slerp(&self, other: &Vector6D, t: f64) -> MagicResult<Self> {
        let dot = self.dot(other);
        let theta = dot.acos();
        
        if theta.abs() < f64::EPSILON {
            // Vectors are nearly identical, use linear interpolation
            return Ok(self.lerp(other, t));
        }
        
        let sin_theta = theta.sin();
        let a = ((1.0 - t) * theta).sin() / sin_theta;
        let b = (t * theta).sin() / sin_theta;
        
        Ok(Vector6D {
            data: [
                a * self.data[0] + b * other.data[0],
                a * self.data[1] + b * other.data[1],
                a * self.data[2] + b * other.data[2],
                a * self.data[3] + b * other.data[3],
                a * self.data[4] + b * other.data[4],
                a * self.data[5] + b * other.data[5],
            ],
        })
    }
    
    /// Component-wise minimum
    pub fn min(&self, other: &Vector6D) -> Self {
        Vector6D {
            data: [
                self.data[0].min(other.data[0]),
                self.data[1].min(other.data[1]),
                self.data[2].min(other.data[2]),
                self.data[3].min(other.data[3]),
                self.data[4].min(other.data[4]),
                self.data[5].min(other.data[5]),
            ],
        }
    }
    
    /// Component-wise maximum
    pub fn max(&self, other: &Vector6D) -> Self {
        Vector6D {
            data: [
                self.data[0].max(other.data[0]),
                self.data[1].max(other.data[1]),
                self.data[2].max(other.data[2]),
                self.data[3].max(other.data[3]),
                self.data[4].max(other.data[4]),
                self.data[5].max(other.data[5]),
            ],
        }
    }
    
    /// Clamp vector components to range
    pub fn clamp(&self, min_val: f64, max_val: f64) -> Self {
        Vector6D {
            data: [
                self.data[0].clamp(min_val, max_val),
                self.data[1].clamp(min_val, max_val),
                self.data[2].clamp(min_val, max_val),
                self.data[3].clamp(min_val, max_val),
                self.data[4].clamp(min_val, max_val),
                self.data[5].clamp(min_val, max_val),
            ],
        }
    }
    
    /// Get spatial components (X, Y, Z)
    pub fn spatial(&self) -> [f64; 3] {
        [self.data[0], self.data[1], self.data[2]]
    }
    
    /// Get temporal component
    pub fn temporal(&self) -> f64 {
        self.data[3]
    }
    
    /// Get causal component
    pub fn causal(&self) -> f64 {
        self.data[4]
    }
    
    /// Get identity component
    pub fn identity(&self) -> f64 {
        self.data[5]
    }
}

/// High-performance vector operations engine
pub struct VectorEngine {
    parallel_threshold: usize,
}

impl VectorEngine {
    /// Create new vector engine
    pub fn new() -> Self {
        VectorEngine {
            parallel_threshold: 1000, // Use parallel processing for 1000+ vectors
        }
    }
    
    /// Batch vector addition
    pub fn batch_add(&self, vectors_a: &[Vector6D], vectors_b: &[Vector6D]) -> MagicResult<Vec<Vector6D>> {
        if vectors_a.len() != vectors_b.len() {
            return Err(MagicError::VectorOperationFailed(
                "Vector arrays must have same length".to_string()
            ));
        }
        
        if vectors_a.len() >= self.parallel_threshold {
            // Parallel processing
            Ok(vectors_a.par_iter()
                .zip(vectors_b.par_iter())
                .map(|(a, b)| *a + *b)
                .collect())
        } else {
            // Sequential processing
            Ok(vectors_a.iter()
                .zip(vectors_b.iter())
                .map(|(a, b)| *a + *b)
                .collect())
        }
    }
    
    /// Batch vector normalization
    pub fn batch_normalize(&self, vectors: &[Vector6D]) -> MagicResult<Vec<Vector6D>> {
        if vectors.len() >= self.parallel_threshold {
            // Parallel processing
            let results: Result<Vec<_>, _> = vectors.par_iter()
                .map(|v| v.normalize())
                .collect();
            results
        } else {
            // Sequential processing
            vectors.iter()
                .map(|v| v.normalize())
                .collect()
        }
    }
    
    /// Find k-nearest neighbors in 6D space
    pub fn k_nearest_neighbors(&self, query: &Vector6D, candidates: &[Vector6D], k: usize) -> Vec<(usize, f64)> {
        let mut distances: Vec<(usize, f64)> = if candidates.len() >= self.parallel_threshold {
            // Parallel distance calculation
            candidates.par_iter()
                .enumerate()
                .map(|(i, candidate)| (i, query.distance_to(candidate)))
                .collect()
        } else {
            // Sequential distance calculation
            candidates.iter()
                .enumerate()
                .map(|(i, candidate)| (i, query.distance_to(candidate)))
                .collect()
        };
        
        // Sort by distance and take k nearest
        distances.sort_by(|a, b| a.1.partial_cmp(&b.1).unwrap());
        distances.truncate(k);
        distances
    }
    
    /// Compute centroid of vector set
    pub fn centroid(&self, vectors: &[Vector6D]) -> MagicResult<Vector6D> {
        if vectors.is_empty() {
            return Err(MagicError::VectorOperationFailed(
                "Cannot compute centroid of empty vector set".to_string()
            ));
        }
        
        let sum = if vectors.len() >= self.parallel_threshold {
            // Parallel reduction
            vectors.par_iter()
                .cloned()
                .reduce(|| Vector6D::zero(), |a, b| a + b)
        } else {
            // Sequential reduction
            vectors.iter()
                .cloned()
                .fold(Vector6D::zero(), |a, b| a + b)
        };
        
        let n = vectors.len() as f64;
        Ok(Vector6D {
            data: [
                sum.data[0] / n,
                sum.data[1] / n,
                sum.data[2] / n,
                sum.data[3] / n,
                sum.data[4] / n,
                sum.data[5] / n,
            ],
        })
    }
    
    /// Principal Component Analysis for dimensionality reduction
    pub fn pca(&self, vectors: &[Vector6D], components: usize) -> MagicResult<Vec<Vector6D>> {
        if components > 6 {
            return Err(MagicError::VectorOperationFailed(
                "Cannot extract more than 6 components from 6D vectors".to_string()
            ));
        }
        
        // Compute mean
        let mean = self.centroid(vectors)?;
        
        // Center the data
        let centered: Vec<Vector6D> = vectors.iter()
            .map(|v| *v - mean)
            .collect();
        
        // Build covariance matrix (simplified implementation)
        let mut cov_matrix = Matrix6::zeros();
        for vector in &centered {
            let v = Vector6::from_column_slice(&vector.data);
            cov_matrix += v * v.transpose();
        }
        cov_matrix /= (vectors.len() - 1) as f64;
        
        // For now, return first 'components' basis vectors
        // In production, would compute eigendecomposition
        let mut result = Vec::new();
        for i in 0..components {
            result.push(Vector6D::unit(i)?);
        }
        
        Ok(result)
    }
}

// Operator overloads for Vector6D
impl std::ops::Add for Vector6D {
    type Output = Self;
    
    fn add(self, other: Self) -> Self {
        Vector6D {
            data: [
                self.data[0] + other.data[0],
                self.data[1] + other.data[1],
                self.data[2] + other.data[2],
                self.data[3] + other.data[3],
                self.data[4] + other.data[4],
                self.data[5] + other.data[5],
            ],
        }
    }
}

impl std::ops::Sub for Vector6D {
    type Output = Self;
    
    fn sub(self, other: Self) -> Self {
        Vector6D {
            data: [
                self.data[0] - other.data[0],
                self.data[1] - other.data[1],
                self.data[2] - other.data[2],
                self.data[3] - other.data[3],
                self.data[4] - other.data[4],
                self.data[5] - other.data[5],
            ],
        }
    }
}

impl std::ops::Mul<f64> for Vector6D {
    type Output = Self;
    
    fn mul(self, scalar: f64) -> Self {
        Vector6D {
            data: [
                self.data[0] * scalar,
                self.data[1] * scalar,
                self.data[2] * scalar,
                self.data[3] * scalar,
                self.data[4] * scalar,
                self.data[5] * scalar,
            ],
        }
    }
}

impl Default for VectorEngine {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_vector_creation() {
        let v = Vector6D::new(1.0, 2.0, 3.0, 4.0, 0.5, 0.8).unwrap();
        assert_eq!(v.data, [1.0, 2.0, 3.0, 4.0, 0.5, 0.8]);
    }

    #[test]
    fn test_vector_operations() {
        let v1 = Vector6D::new(1.0, 2.0, 3.0, 4.0, 0.5, 0.8).unwrap();
        let v2 = Vector6D::new(2.0, 3.0, 4.0, 5.0, 0.3, 0.6).unwrap();
        
        let sum = v1 + v2;
        assert_eq!(sum.data, [3.0, 5.0, 7.0, 9.0, 0.8, 1.4]);
        
        let diff = v1 - v2;
        // Allow tiny float rounding differences
        let expected_diff = [-1.0, -1.0, -1.0, -1.0, 0.2, 0.2];
        for (i, (a, b)) in diff.data.iter().zip(expected_diff.iter()).enumerate() {
            assert!((a - b).abs() < 1e-12, "component {} differs: got {}, expected {}", i, a, b);
        }
        
        let scaled = v1 * 2.0;
        assert_eq!(scaled.data, [2.0, 4.0, 6.0, 8.0, 1.0, 1.6]);
    }

    #[test]
    fn test_magnitude_and_normalization() {
        let v = Vector6D::new(3.0, 4.0, 0.0, 0.0, 0.0, 0.0).unwrap();
        assert_eq!(v.magnitude(), 5.0); // 3-4-5 triangle
        
        let normalized = v.normalize().unwrap();
        assert!((normalized.magnitude() - 1.0).abs() < f64::EPSILON);
    }

    #[test]
    fn test_dot_product() {
        let v1 = Vector6D::new(1.0, 2.0, 3.0, 0.0, 0.0, 0.0).unwrap();
        let v2 = Vector6D::new(4.0, 5.0, 6.0, 0.0, 0.0, 0.0).unwrap();
        
        let dot = v1.dot(&v2);
        assert_eq!(dot, 32.0); // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
    }

    #[test]
    fn test_k_nearest_neighbors() {
        let engine = VectorEngine::new();
        let query = Vector6D::new(0.0, 0.0, 0.0, 0.0, 0.5, 0.0).unwrap();
        
        let candidates = vec![
            Vector6D::new(1.0, 0.0, 0.0, 0.0, 0.5, 0.0).unwrap(), // distance 1
            Vector6D::new(0.0, 2.0, 0.0, 0.0, 0.5, 0.0).unwrap(), // distance 2
            Vector6D::new(0.0, 0.0, 3.0, 0.0, 0.5, 0.0).unwrap(), // distance 3
        ];
        
        let neighbors = engine.k_nearest_neighbors(&query, &candidates, 2);
        assert_eq!(neighbors.len(), 2);
        assert_eq!(neighbors[0].0, 0); // First candidate (distance 1)
        assert_eq!(neighbors[1].0, 1); // Second candidate (distance 2)
    }
}