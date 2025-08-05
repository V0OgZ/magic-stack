//! Magic Stack Core - High-Performance Rust Backend
//! 
//! This library provides critical performance components for the Magic Stack:
//! - Q* Algorithm for 6D searches
//! - World State Graph updates
//! - Temporal Grammar parsing
//! - 6D Vector operations

pub mod position_6d;
pub mod qstar;
pub mod world_state;
pub mod temporal_grammar;
pub mod vector_ops;
pub mod java_connector;

pub use position_6d::Position6D;
pub use qstar::QStarEngine;
pub use world_state::WorldStateGraph;
pub use temporal_grammar::TemporalParser;
pub use vector_ops::Vector6D;
pub use java_connector::JavaConnector;

/// Core result type for Magic Stack operations
pub type MagicResult<T> = Result<T, MagicError>;

/// Error types for Magic Stack operations
#[derive(Debug, thiserror::Error)]
pub enum MagicError {
    #[error("6D position out of bounds: {0}")]
    Position6DOutOfBounds(String),
    
    #[error("Q* search failed: {0}")]
    QStarSearchFailed(String),
    
    #[error("World state update failed: {0}")]
    WorldStateUpdateFailed(String),
    
    #[error("Temporal grammar parsing failed: {0}")]
    TemporalGrammarFailed(String),
    
    #[error("Vector operation failed: {0}")]
    VectorOperationFailed(String),
    
    #[error("Serialization error: {0}")]
    SerializationError(#[from] serde_json::Error),
    
    #[error("I/O error: {0}")]
    IoError(#[from] std::io::Error),
}