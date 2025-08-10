// 🌀 GEOMETRY V2 - Non-Euclidean Space Transformations
// Integration complète dans le moteur V2

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::f64::consts::PI;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum GeometryType {
    Euclidean,
    Hyperbolic,      // Negative curvature
    Spherical,       // Positive curvature
    TorusTopology,   // Wrap-around edges
    MobiusStrip,     // One-sided surface
    KleinBottle,     // Self-intersecting 4D
    Tesseract,       // 4D hypercube projection
    FractalDimension { hausdorff: f64 }, // Fractional dimensions
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GeometricTransform {
    pub geometry_type: GeometryType,
    pub curvature: f64,           // -1 to 1
    pub dimension_override: Option<u8>, // 2D, 3D, 4D...
    pub active: bool,
    pub center: [f64; 3],         // Center of transformation
    pub radius: f64,              // Effect radius
    pub intensity: f64,           // 0-1 transformation strength
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Vertex3D {
    pub x: f64,
    pub y: f64,
    pub z: f64,
    pub w: Option<f64>,  // 4th dimension for tesseract/klein
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GeometryEngine {
    pub active_transforms: Vec<GeometricTransform>,
    pub space_topology: GeometryType,
    pub portals: Vec<Portal>,
    pub gravity_wells: Vec<GravityWell>,
    pub dimension_folds: Vec<DimensionFold>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Portal {
    pub id: String,
    pub position_a: [f64; 3],
    pub position_b: [f64; 3],
    pub radius: f64,
    pub bidirectional: bool,
    pub topology: PortalType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PortalType {
    Wormhole,         // Instant travel
    QuantumTunnel,    // Probabilistic destination
    CausalLoop,       // Time loop portal
    MobiusGate,       // Flips orientation
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GravityWell {
    pub position: [f64; 3],
    pub strength: f64,  // Can be negative (anti-gravity)
    pub radius: f64,
    pub rotational: bool, // Creates vortex
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DimensionFold {
    pub fold_type: String,  // "still_3d_in_2d_iso"
    pub layers: u8,         // Height layers
    pub projection_matrix: [[f64; 4]; 4],
}

impl GeometryEngine {
    pub fn new() -> Self {
        Self {
            active_transforms: Vec::new(),
            space_topology: GeometryType::Euclidean,
            portals: Vec::new(),
            gravity_wells: Vec::new(),
            dimension_folds: Vec::new(),
        }
    }

    /// Apply hyperbolic transformation to a point
    pub fn transform_hyperbolic(&self, vertex: &Vertex3D, transform: &GeometricTransform) -> Vertex3D {
        let dx = vertex.x - transform.center[0];
        let dy = vertex.y - transform.center[1];
        let dz = vertex.z - transform.center[2];
        let dist = (dx*dx + dy*dy + dz*dz).sqrt();
        
        if dist < transform.radius {
            // Poincaré disk model transformation
            let factor = (dist / transform.radius * 2.0).tanh();
            let scale = factor / (dist + 0.001); // Avoid division by zero
            
            Vertex3D {
                x: transform.center[0] + dx * scale * transform.intensity,
                y: transform.center[1] + dy * scale * transform.intensity,
                z: transform.center[2] + dz * scale * transform.intensity,
                w: vertex.w,
            }
        } else {
            vertex.clone()
        }
    }

    /// Klein bottle topology - 4D self-intersection
    pub fn transform_klein_bottle(&self, vertex: &Vertex3D, u: f64, v: f64) -> Vertex3D {
        let (x, y, z) = if u < PI {
            let x = 3.0 * u.cos() * (1.0 + u.sin()) + 2.0 * (1.0 - u.cos()/2.0) * v.cos();
            let y = 8.0 * u.sin() + 2.0 * (1.0 - u.cos()/2.0) * v.sin() * u.cos();
            let z = 2.0 * (1.0 - u.cos()/2.0) * v.sin();
            (x, y, z)
        } else {
            let x = 3.0 * u.cos() * (1.0 + u.sin()) + 2.0 * (1.0 - u.cos()/2.0) * (v + PI).cos();
            let y = 8.0 * u.sin();
            let z = 2.0 * (1.0 - u.cos()/2.0) * v.sin();
            (x, y, z)
        };
        
        Vertex3D {
            x: vertex.x + x * 0.1, // Blend with original position
            y: vertex.y + y * 0.1,
            z: vertex.z + z * 0.1,
            w: Some((u + v) / (2.0 * PI)), // 4th dimension phase
        }
    }

    /// Tesseract projection - 4D hypercube to 3D
    pub fn project_tesseract(&self, vertex_4d: &[f64; 4], w_projection: f64) -> Vertex3D {
        // Stereographic projection from 4D to 3D
        let factor = 1.0 / (w_projection - vertex_4d[3]);
        
        Vertex3D {
            x: vertex_4d[0] * factor,
            y: vertex_4d[1] * factor,
            z: vertex_4d[2] * factor,
            w: Some(vertex_4d[3]),
        }
    }

    /// Möbius strip transformation
    pub fn transform_mobius(&self, vertex: &Vertex3D, angle: f64, radius: f64, twists: i32) -> Vertex3D {
        let twist_angle = angle * twists as f64 / 2.0;
        let r = radius + vertex.y * twist_angle.cos();
        
        Vertex3D {
            x: r * angle.cos(),
            y: r * angle.sin(),
            z: vertex.y * twist_angle.sin(),
            w: Some(twist_angle), // Store twist phase
        }
    }

    /// Calculate geodesic (shortest path) in current geometry
    pub fn calculate_geodesic(&self, start: &Vertex3D, end: &Vertex3D, steps: usize) -> Vec<Vertex3D> {
        let mut path = Vec::with_capacity(steps);
        
        match self.space_topology {
            GeometryType::Hyperbolic => {
                // Hyperbolic geodesics are arcs
                for i in 0..=steps {
                    let t = i as f64 / steps as f64;
                    let x = start.x * (1.0 - t) + end.x * t;
                    let y = start.y * (1.0 - t) + end.y * t;
                    let z = start.z * (1.0 - t) + end.z * t;
                    
                    // Add hyperbolic curvature
                    let curve = (t * PI - PI/2.0).sinh() * 0.2;
                    
                    path.push(Vertex3D {
                        x,
                        y: y + curve,
                        z,
                        w: None,
                    });
                }
            },
            GeometryType::Spherical => {
                // Spherical geodesics are great circles
                for i in 0..=steps {
                    let t = i as f64 / steps as f64;
                    
                    // Spherical linear interpolation (slerp)
                    let dot = (start.x*end.x + start.y*end.y + start.z*end.z) / 
                              ((start.x*start.x + start.y*start.y + start.z*start.z).sqrt() *
                               (end.x*end.x + end.y*end.y + end.z*end.z).sqrt());
                    let angle = dot.acos();
                    
                    let (factor_a, factor_b) = if angle > 0.001 {
                        (((1.0 - t) * angle).sin() / angle.sin(),
                         (t * angle).sin() / angle.sin())
                    } else {
                        (1.0 - t, t)
                    };
                    
                    path.push(Vertex3D {
                        x: start.x * factor_a + end.x * factor_b,
                        y: start.y * factor_a + end.y * factor_b,
                        z: start.z * factor_a + end.z * factor_b,
                        w: None,
                    });
                }
            },
            _ => {
                // Euclidean straight line
                for i in 0..=steps {
                    let t = i as f64 / steps as f64;
                    path.push(Vertex3D {
                        x: start.x * (1.0 - t) + end.x * t,
                        y: start.y * (1.0 - t) + end.y * t,
                        z: start.z * (1.0 - t) + end.z * t,
                        w: None,
                    });
                }
            }
        }
        
        path
    }

    /// Apply portal distortion between two points
    pub fn apply_portal_effect(&self, vertex: &Vertex3D, portal: &Portal) -> Vertex3D {
        let dist_a = ((vertex.x - portal.position_a[0]).powi(2) +
                     (vertex.y - portal.position_a[1]).powi(2) +
                     (vertex.z - portal.position_a[2]).powi(2)).sqrt();
        
        if dist_a < portal.radius {
            // Smooth transition through portal
            let t = 1.0 - (dist_a / portal.radius).powi(2);
            
            match portal.topology {
                PortalType::Wormhole => {
                    // Instant teleportation with smooth blend
                    Vertex3D {
                        x: vertex.x * (1.0 - t) + portal.position_b[0] * t,
                        y: vertex.y * (1.0 - t) + portal.position_b[1] * t,
                        z: vertex.z * (1.0 - t) + portal.position_b[2] * t,
                        w: Some(t), // Portal phase
                    }
                },
                PortalType::MobiusGate => {
                    // Flip orientation when passing through
                    Vertex3D {
                        x: vertex.x * (1.0 - t) + portal.position_b[0] * t,
                        y: -(vertex.y * (1.0 - t) + portal.position_b[1] * t), // Flip Y
                        z: vertex.z * (1.0 - t) + portal.position_b[2] * t,
                        w: Some(PI * t), // Rotation phase
                    }
                },
                _ => vertex.clone(),
            }
        } else {
            vertex.clone()
        }
    }

    /// Apply gravity well distortion
    pub fn apply_gravity_well(&self, vertex: &Vertex3D, well: &GravityWell) -> Vertex3D {
        let dx = vertex.x - well.position[0];
        let dy = vertex.y - well.position[1]; 
        let dz = vertex.z - well.position[2];
        let dist = (dx*dx + dy*dy + dz*dz).sqrt();
        
        if dist < well.radius && dist > 0.001 {
            let force = well.strength * (1.0 - dist / well.radius).powi(2);
            let pull_factor = force / dist;
            
            if well.rotational {
                // Create vortex effect
                let angle = force * 0.1;
                let cos_a = angle.cos();
                let sin_a = angle.sin();
                
                Vertex3D {
                    x: vertex.x - dx * pull_factor + dy * sin_a * 0.1,
                    y: vertex.y - dy * pull_factor - dx * sin_a * 0.1,
                    z: vertex.z - dz * pull_factor,
                    w: Some(angle),
                }
            } else {
                // Simple attraction/repulsion
                Vertex3D {
                    x: vertex.x - dx * pull_factor,
                    y: vertex.y - dy * pull_factor,
                    z: vertex.z - dz * pull_factor,
                    w: None,
                }
            }
        } else {
            vertex.clone()
        }
    }

    /// Master transformation function combining all effects
    pub fn transform_vertex(&self, vertex: &Vertex3D) -> Vertex3D {
        let mut result = vertex.clone();
        
        // Apply active geometric transforms
        for transform in &self.active_transforms {
            if transform.active {
                result = match transform.geometry_type {
                    GeometryType::Hyperbolic => self.transform_hyperbolic(&result, transform),
                    GeometryType::KleinBottle => {
                        // Map position to UV coordinates for Klein bottle
                        let u = (result.x / transform.radius + 1.0) * PI;
                        let v = (result.y / transform.radius + 1.0) * PI;
                        self.transform_klein_bottle(&result, u, v)
                    },
                    GeometryType::MobiusStrip => {
                        let angle = result.x.atan2(result.y);
                        self.transform_mobius(&result, angle, transform.radius, 1)
                    },
                    _ => result,
                };
            }
        }
        
        // Apply portal effects
        for portal in &self.portals {
            result = self.apply_portal_effect(&result, portal);
        }
        
        // Apply gravity wells
        for well in &self.gravity_wells {
            result = self.apply_gravity_well(&result, well);
        }
        
        result
    }

    /// Add a geometric spell effect
    pub fn cast_geometry_spell(&mut self, spell_name: &str, position: [f64; 3], params: HashMap<String, f64>) {
        match spell_name {
            "klein_bottle_reality" => {
                self.active_transforms.push(GeometricTransform {
                    geometry_type: GeometryType::KleinBottle,
                    curvature: -1.0,
                    dimension_override: Some(4),
                    active: true,
                    center: position,
                    radius: params.get("radius").copied().unwrap_or(500.0),
                    intensity: params.get("intensity").copied().unwrap_or(1.0),
                });
            },
            "hyperbolic_warp" => {
                self.active_transforms.push(GeometricTransform {
                    geometry_type: GeometryType::Hyperbolic,
                    curvature: params.get("curvature").copied().unwrap_or(-1.0),
                    dimension_override: None,
                    active: true,
                    center: position,
                    radius: params.get("radius").copied().unwrap_or(300.0),
                    intensity: params.get("intensity").copied().unwrap_or(0.8),
                });
            },
            "tesseract_prison" => {
                self.active_transforms.push(GeometricTransform {
                    geometry_type: GeometryType::Tesseract,
                    curvature: 0.0,
                    dimension_override: Some(4),
                    active: true,
                    center: position,
                    radius: params.get("radius").copied().unwrap_or(100.0),
                    intensity: 1.0,
                });
                
                // Add rotating gravity wells at tesseract vertices
                for i in 0..8 {
                    let angle = i as f64 * PI / 4.0;
                    self.gravity_wells.push(GravityWell {
                        position: [
                            position[0] + angle.cos() * 50.0,
                            position[1] + angle.sin() * 50.0,
                            position[2] + (i as f64 - 3.5) * 20.0,
                        ],
                        strength: 0.5,
                        radius: 30.0,
                        rotational: true,
                    });
                }
            },
            "mobius_battlefield" => {
                self.active_transforms.push(GeometricTransform {
                    geometry_type: GeometryType::MobiusStrip,
                    curvature: 0.0,
                    dimension_override: None,
                    active: true,
                    center: position,
                    radius: params.get("radius").copied().unwrap_or(400.0),
                    intensity: 1.0,
                });
                
                // Add möbius portal
                self.portals.push(Portal {
                    id: format!("mobius_{}", self.portals.len()),
                    position_a: position,
                    position_b: [position[0] + 200.0, position[1], position[2]],
                    radius: 50.0,
                    bidirectional: true,
                    topology: PortalType::MobiusGate,
                });
            },
            _ => {}
        }
    }
}

/// Integration with V2 Controller
impl super::multiplayer_v2_complete::MultiplayerOfficialController {
    pub fn apply_geometry_to_entity(&self, entity_id: &str, geometry_engine: &GeometryEngine) -> Result<(), String> {
        // Get entity position
        let entities = self.entities_v2.blocking_read();
        if let Some(entity) = entities.get(entity_id) {
            let position = Vertex3D {
                x: entity.position[0],
                y: entity.position[1],
                z: entity.position[2],
                w: None,
            };
            
            // Transform position through geometry engine
            let transformed = geometry_engine.transform_vertex(&position);
            
            // Update entity with transformed position
            drop(entities);
            let mut entities = self.entities_v2.blocking_write();
            if let Some(entity) = entities.get_mut(entity_id) {
                entity.position[0] = transformed.x;
                entity.position[1] = transformed.y;
                entity.position[2] = transformed.z;
                
                // Store 4D component if present
                if let Some(w) = transformed.w {
                    entity.metadata.insert("dimension_w".to_string(), serde_json::json!(w));
                }
            }
            
            Ok(())
        } else {
            Err(format!("Entity {} not found", entity_id))
        }
    }
}
