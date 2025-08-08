//! 6D Position System - Core spatial-temporal coordinates
//! 
//! Implements GROKÆN's 6D coordinate system:
//! - X, Y, Z: Spatial coordinates
//! - T: Temporal coordinate
//! - C: Causal probability (0.0 to 1.0)
//! - Ψ (Psi): Identity coherence (-1.0 to 1.0)

use serde::{Deserialize, Serialize};
use std::fmt;

/// 6D Position in AVALON's space-time-causality-identity continuum
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Position6D {
    /// X coordinate (spatial)
    pub x: f64,
    /// Y coordinate (spatial)
    pub y: f64,
    /// Z coordinate (spatial)
    pub z: f64,
    /// T coordinate (temporal)
    pub t: f64,
    /// C coordinate (causal probability: 0.0 to 1.0)
    pub c: f64,
    /// Ψ coordinate (identity coherence: -1.0 to 1.0)
    pub psi: f64,
}

impl Position6D {
    /// Create a new 6D position
    pub fn new(x: f64, y: f64, z: f64, t: f64, c: f64, psi: f64) -> Result<Self, crate::MagicError> {
        // Validate causal probability
        if c < 0.0 || c > 1.0 {
            return Err(crate::MagicError::Position6DOutOfBounds(
                format!("Causal coordinate C must be between 0.0 and 1.0, got {}", c)
            ));
        }
        
        // Validate identity coherence
        if psi < -1.0 || psi > 1.0 {
            return Err(crate::MagicError::Position6DOutOfBounds(
                format!("Identity coordinate Ψ must be between -1.0 and 1.0, got {}", psi)
            ));
        }
        
        Ok(Position6D { x, y, z, t, c, psi })
    }
    
    /// Origin point in 6D space
    pub fn origin() -> Self {
        Position6D {
            x: 0.0, y: 0.0, z: 0.0,
            t: 0.0, c: 1.0, psi: 0.0
        }
    }
    
    /// Calculate Euclidean distance in 6D space
    pub fn distance_to(&self, other: &Position6D) -> f64 {
        let dx = self.x - other.x;
        let dy = self.y - other.y;
        let dz = self.z - other.z;
        let dt = self.t - other.t;
        let dc = self.c - other.c;
        let dpsi = self.psi - other.psi;
        
        (dx*dx + dy*dy + dz*dz + dt*dt + dc*dc + dpsi*dpsi).sqrt()
    }
    
    /// Calculate Manhattan distance in 6D space
    pub fn manhattan_distance_to(&self, other: &Position6D) -> f64 {
        (self.x - other.x).abs() +
        (self.y - other.y).abs() +
        (self.z - other.z).abs() +
        (self.t - other.t).abs() +
        (self.c - other.c).abs() +
        (self.psi - other.psi).abs()
    }
    
    /// Check if position is within a 6D sphere
    pub fn is_within_radius(&self, center: &Position6D, radius: f64) -> bool {
        self.distance_to(center) <= radius
    }
    
    /// Get spatial coordinates only (X, Y, Z)
    pub fn spatial(&self) -> (f64, f64, f64) {
        (self.x, self.y, self.z)
    }
    
    /// Get temporal coordinate
    pub fn temporal(&self) -> f64 {
        self.t
    }
    
    /// Get causal probability
    pub fn causal(&self) -> f64 {
        self.c
    }
    
    /// Get identity coherence
    pub fn identity(&self) -> f64 {
        self.psi
    }
    
    /// Convert to vector for mathematical operations
    pub fn to_vector(&self) -> [f64; 6] {
        [self.x, self.y, self.z, self.t, self.c, self.psi]
    }
    
    /// Create from vector
    pub fn from_vector(v: [f64; 6]) -> Result<Self, crate::MagicError> {
        Self::new(v[0], v[1], v[2], v[3], v[4], v[5])
    }
}

impl fmt::Display for Position6D {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "6D({:.2}, {:.2}, {:.2}, {:.2}, {:.2}, {:.2})", 
               self.x, self.y, self.z, self.t, self.c, self.psi)
    }
}

impl Default for Position6D {
    fn default() -> Self {
        Self::origin()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_position_creation() {
        let pos = Position6D::new(1.0, 2.0, 3.0, 4.0, 0.5, 0.8).unwrap();
        assert_eq!(pos.x, 1.0);
        assert_eq!(pos.c, 0.5);
        assert_eq!(pos.psi, 0.8);
    }

    #[test]
    fn test_invalid_causal() {
        let result = Position6D::new(0.0, 0.0, 0.0, 0.0, 1.5, 0.0);
        assert!(result.is_err());
    }

    #[test]
    fn test_distance_calculation() {
        let pos1 = Position6D::origin();
        // Keep non-spatial dimensions equal to origin so distance is purely spatial (3-4-5)
        let pos2 = Position6D::new(3.0, 4.0, 0.0, 0.0, 1.0, 0.0).unwrap();
        assert_eq!(pos1.distance_to(&pos2), 5.0); // 3-4-5 triangle
    }
}