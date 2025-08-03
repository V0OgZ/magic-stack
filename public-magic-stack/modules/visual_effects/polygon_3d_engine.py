#!/usr/bin/env python3
"""
🌟 POLYGON 3D ENGINE - Magic Stack Visual Module
Un vrai moteur 3D avec polygones, shaders et effets magiques !
"""

import numpy as np
import math
from typing import List, Tuple, Dict, Optional
from dataclasses import dataclass
import json

@dataclass
class Vector3:
    """Vecteur 3D pour positions et transformations"""
    x: float
    y: float
    z: float
    
    def __add__(self, other):
        return Vector3(self.x + other.x, self.y + other.y, self.z + other.z)
    
    def __mul__(self, scalar):
        return Vector3(self.x * scalar, self.y * scalar, self.z * scalar)
    
    def normalize(self):
        length = math.sqrt(self.x**2 + self.y**2 + self.z**2)
        if length > 0:
            return Vector3(self.x/length, self.y/length, self.z/length)
        return self
    
    def cross(self, other):
        return Vector3(
            self.y * other.z - self.z * other.y,
            self.z * other.x - self.x * other.z,
            self.x * other.y - self.y * other.x
        )

@dataclass
class Polygon:
    """Polygone 3D avec vertices et couleur magique"""
    vertices: List[Vector3]
    color: Tuple[float, float, float, float]  # RGBA
    magic_type: str = "neutral"
    emissive: float = 0.0  # Émission lumineuse magique

@dataclass
class MagicObject3D:
    """Objet 3D magique avec polygones"""
    name: str
    polygons: List[Polygon]
    position: Vector3
    rotation: Vector3
    scale: Vector3
    magic_properties: Dict
    
class Polygon3DEngine:
    """Moteur 3D polygonal pour Magic Stack"""
    
    def __init__(self):
        self.objects: List[MagicObject3D] = []
        self.camera_position = Vector3(0, 5, -10)
        self.camera_target = Vector3(0, 0, 0)
        self.fov = 60  # Field of view
        self.viewport_width = 800
        self.viewport_height = 600
        self.z_buffer = None
        self.frame_buffer = None
        
        # Effets magiques
        self.magic_shaders = {
            "fire": self._fire_shader,
            "ice": self._ice_shader,
            "quantum": self._quantum_shader,
            "temporal": self._temporal_shader,
            "causal": self._causal_shader
        }
        
    def create_cube(self, size: float = 1.0, magic_type: str = "neutral") -> List[Polygon]:
        """Créer un cube magique"""
        s = size / 2
        vertices = [
            Vector3(-s, -s, -s), Vector3(s, -s, -s),
            Vector3(s, s, -s), Vector3(-s, s, -s),
            Vector3(-s, -s, s), Vector3(s, -s, s),
            Vector3(s, s, s), Vector3(-s, s, s)
        ]
        
        # Couleurs selon type magique
        colors = {
            "fire": (1.0, 0.3, 0.1, 1.0),
            "ice": (0.3, 0.7, 1.0, 1.0),
            "quantum": (0.8, 0.2, 0.9, 1.0),
            "temporal": (0.5, 1.0, 0.5, 1.0),
            "causal": (1.0, 1.0, 0.3, 1.0),
            "neutral": (0.7, 0.7, 0.7, 1.0)
        }
        
        color = colors.get(magic_type, colors["neutral"])
        emissive = 0.5 if magic_type != "neutral" else 0.0
        
        # Faces du cube (quads)
        faces = [
            [0, 1, 2, 3],  # Front
            [5, 4, 7, 6],  # Back
            [4, 0, 3, 7],  # Left
            [1, 5, 6, 2],  # Right
            [3, 2, 6, 7],  # Top
            [4, 5, 1, 0]   # Bottom
        ]
        
        polygons = []
        for face in faces:
            face_vertices = [vertices[i] for i in face]
            polygons.append(Polygon(face_vertices, color, magic_type, emissive))
            
        return polygons
    
    def create_pyramid(self, size: float = 1.0, magic_type: str = "fire") -> List[Polygon]:
        """Créer une pyramide magique"""
        s = size / 2
        h = size
        
        vertices = [
            Vector3(-s, 0, -s), Vector3(s, 0, -s),
            Vector3(s, 0, s), Vector3(-s, 0, s),
            Vector3(0, h, 0)  # Sommet
        ]
        
        color = (1.0, 0.5, 0.2, 1.0) if magic_type == "fire" else (0.7, 0.7, 0.7, 1.0)
        
        # Faces triangulaires
        faces = [
            [0, 1, 4],  # Front
            [1, 2, 4],  # Right
            [2, 3, 4],  # Back
            [3, 0, 4],  # Left
            [0, 3, 2, 1]  # Base (quad)
        ]
        
        polygons = []
        for face in faces:
            if len(face) == 3:  # Triangle
                face_vertices = [vertices[i] for i in face]
                polygons.append(Polygon(face_vertices, color, magic_type, 0.8))
            else:  # Quad pour la base
                face_vertices = [vertices[i] for i in face]
                polygons.append(Polygon(face_vertices, (0.3, 0.3, 0.3, 1.0), "neutral", 0.0))
                
        return polygons
    
    def create_crystal(self, size: float = 1.0, segments: int = 6, magic_type: str = "quantum") -> List[Polygon]:
        """Créer un cristal magique complexe"""
        polygons = []
        h = size * 1.5
        r = size * 0.5
        
        # Couleur cristalline
        color = (0.7, 0.3, 0.9, 0.8)  # Semi-transparent
        
        # Générer vertices du cristal
        top_vertices = []
        bottom_vertices = []
        
        for i in range(segments):
            angle = (2 * math.pi * i) / segments
            x = r * math.cos(angle)
            z = r * math.sin(angle)
            
            top_vertices.append(Vector3(x, h * 0.3, z))
            bottom_vertices.append(Vector3(x * 0.7, -h * 0.3, z * 0.7))
        
        # Points du cristal
        top_point = Vector3(0, h, 0)
        bottom_point = Vector3(0, -h * 0.5, 0)
        
        # Faces supérieures
        for i in range(segments):
            next_i = (i + 1) % segments
            vertices = [top_vertices[i], top_vertices[next_i], top_point]
            polygons.append(Polygon(vertices, color, magic_type, 1.0))
        
        # Faces inférieures
        for i in range(segments):
            next_i = (i + 1) % segments
            vertices = [bottom_vertices[next_i], bottom_vertices[i], bottom_point]
            polygons.append(Polygon(vertices, color, magic_type, 0.8))
        
        # Faces latérales
        for i in range(segments):
            next_i = (i + 1) % segments
            vertices = [
                top_vertices[i], top_vertices[next_i],
                bottom_vertices[next_i], bottom_vertices[i]
            ]
            polygons.append(Polygon(vertices, color, magic_type, 0.5))
            
        return polygons
    
    def add_object(self, obj: MagicObject3D):
        """Ajouter un objet 3D à la scène"""
        self.objects.append(obj)
    
    def transform_vertex(self, vertex: Vector3, obj: MagicObject3D) -> Vector3:
        """Transformer un vertex selon position/rotation/scale de l'objet"""
        # Scale
        v = vertex * obj.scale.x
        
        # Rotation (simplifiée pour l'exemple)
        if obj.rotation.y != 0:
            cos_y = math.cos(obj.rotation.y)
            sin_y = math.sin(obj.rotation.y)
            x = v.x * cos_y - v.z * sin_y
            z = v.x * sin_y + v.z * cos_y
            v = Vector3(x, v.y, z)
        
        # Translation
        return v + obj.position
    
    def project_to_screen(self, vertex: Vector3) -> Tuple[int, int, float]:
        """Projeter un vertex 3D sur l'écran 2D"""
        # Vue caméra
        view = vertex + self.camera_position * -1
        
        # Projection perspective
        if view.z <= 0.1:  # Éviter division par zéro
            view.z = 0.1
            
        fov_rad = math.radians(self.fov)
        scale = 1 / math.tan(fov_rad / 2)
        
        x = (view.x * scale / view.z) * self.viewport_width / 2 + self.viewport_width / 2
        y = (-view.y * scale / view.z) * self.viewport_height / 2 + self.viewport_height / 2
        
        return (int(x), int(y), view.z)
    
    def _fire_shader(self, color: Tuple, time: float) -> Tuple:
        """Shader de feu magique"""
        r, g, b, a = color
        intensity = 0.5 + 0.5 * math.sin(time * 10)
        return (r * intensity, g * 0.5 * intensity, b * 0.1, a)
    
    def _ice_shader(self, color: Tuple, time: float) -> Tuple:
        """Shader de glace magique"""
        r, g, b, a = color
        shimmer = 0.8 + 0.2 * math.cos(time * 5)
        return (r * 0.5 * shimmer, g * 0.8 * shimmer, b * shimmer, a)
    
    def _quantum_shader(self, color: Tuple, time: float) -> Tuple:
        """Shader quantique avec effet de phase"""
        r, g, b, a = color
        phase = math.sin(time * 3) * 0.5 + 0.5
        return (r * phase, g * (1 - phase), b, a * (0.5 + 0.5 * phase))
    
    def _temporal_shader(self, color: Tuple, time: float) -> Tuple:
        """Shader temporel avec distorsion"""
        r, g, b, a = color
        distortion = math.sin(time * 2) * 0.3
        return (r + distortion, g + distortion * 0.5, b - distortion * 0.2, a)
    
    def _causal_shader(self, color: Tuple, time: float) -> Tuple:
        """Shader causal avec ondulations"""
        r, g, b, a = color
        wave = math.sin(time * 4) * math.cos(time * 2) * 0.3
        return (r + wave, g + wave * 0.7, b + wave * 0.3, a)
    
    def render_frame(self, time: float = 0.0) -> Dict:
        """Rendre une frame complète"""
        # Initialiser buffers
        self.z_buffer = [[float('inf')] * self.viewport_width for _ in range(self.viewport_height)]
        self.frame_buffer = [[(0, 0, 0, 0)] * self.viewport_width for _ in range(self.viewport_height)]
        
        rendered_polygons = 0
        
        # Rendre chaque objet
        for obj in self.objects:
            # Animer rotation si propriété magique
            if obj.magic_properties.get("auto_rotate", False):
                obj.rotation.y += 0.02
                
            for polygon in obj.polygons:
                # Transformer vertices
                transformed_vertices = []
                screen_coords = []
                
                for vertex in polygon.vertices:
                    world_vertex = self.transform_vertex(vertex, obj)
                    x, y, z = self.project_to_screen(world_vertex)
                    transformed_vertices.append(world_vertex)
                    screen_coords.append((x, y, z))
                
                # Vérifier si polygon visible
                if all(0 <= x < self.viewport_width and 0 <= y < self.viewport_height for x, y, _ in screen_coords):
                    # Appliquer shader magique
                    shader = self.magic_shaders.get(polygon.magic_type)
                    if shader:
                        color = shader(polygon.color, time)
                    else:
                        color = polygon.color
                    
                    # Rasterizer simple (pour la démo)
                    # Dans un vrai moteur, on ferait du triangle filling
                    for x, y, z in screen_coords:
                        if 0 <= x < self.viewport_width and 0 <= y < self.viewport_height:
                            if z < self.z_buffer[y][x]:
                                self.z_buffer[y][x] = z
                                self.frame_buffer[y][x] = color
                                
                    rendered_polygons += 1
        
        return {
            "frame_buffer": self.frame_buffer,
            "rendered_polygons": rendered_polygons,
            "object_count": len(self.objects),
            "resolution": (self.viewport_width, self.viewport_height)
        }
    
    def export_to_hep(self, scenario_name: str) -> str:
        """Exporter la scène 3D en format HEP"""
        hep_data = {
            "scenario": scenario_name,
            "type": "3D_POLYGON_SCENE",
            "engine": "Magic Stack Polygon 3D",
            "camera": {
                "position": {"x": self.camera_position.x, "y": self.camera_position.y, "z": self.camera_position.z},
                "target": {"x": self.camera_target.x, "y": self.camera_target.y, "z": self.camera_target.z},
                "fov": self.fov
            },
            "objects": []
        }
        
        for obj in self.objects:
            obj_data = {
                "name": obj.name,
                "position": {"x": obj.position.x, "y": obj.position.y, "z": obj.position.z},
                "rotation": {"x": obj.rotation.x, "y": obj.rotation.y, "z": obj.rotation.z},
                "scale": {"x": obj.scale.x, "y": obj.scale.y, "z": obj.scale.z},
                "magic_properties": obj.magic_properties,
                "polygon_count": len(obj.polygons),
                "polygons": []
            }
            
            for poly in obj.polygons:
                poly_data = {
                    "vertices": [{"x": v.x, "y": v.y, "z": v.z} for v in poly.vertices],
                    "color": poly.color,
                    "magic_type": poly.magic_type,
                    "emissive": poly.emissive
                }
                obj_data["polygons"].append(poly_data)
                
            hep_data["objects"].append(obj_data)
            
        return json.dumps(hep_data, indent=2)

# Fonctions helper pour créer des scènes rapidement
def create_magic_arena() -> Polygon3DEngine:
    """Créer une arène magique avec objets 3D"""
    engine = Polygon3DEngine()
    
    # Cristal central quantique
    crystal = MagicObject3D(
        name="Cristal Quantique Central",
        polygons=engine.create_crystal(2.0, 8, "quantum"),
        position=Vector3(0, 1, 0),
        rotation=Vector3(0, 0, 0),
        scale=Vector3(1, 1, 1),
        magic_properties={"auto_rotate": True, "power": 100}
    )
    engine.add_object(crystal)
    
    # Pyramides de feu autour
    for i in range(4):
        angle = (math.pi / 2) * i
        x = 5 * math.cos(angle)
        z = 5 * math.sin(angle)
        
        pyramid = MagicObject3D(
            name=f"Pyramide de Feu {i+1}",
            polygons=engine.create_pyramid(1.5, "fire"),
            position=Vector3(x, 0, z),
            rotation=Vector3(0, angle, 0),
            scale=Vector3(1, 1, 1),
            magic_properties={"element": "fire", "damage": 25}
        )
        engine.add_object(pyramid)
    
    # Cubes de glace flottants
    for i in range(6):
        angle = (math.pi / 3) * i
        x = 3 * math.cos(angle)
        z = 3 * math.sin(angle)
        y = 2 + math.sin(angle * 2) * 0.5
        
        cube = MagicObject3D(
            name=f"Cube de Glace {i+1}",
            polygons=engine.create_cube(0.8, "ice"),
            position=Vector3(x, y, z),
            rotation=Vector3(0, 0, 0),
            scale=Vector3(1, 1, 1),
            magic_properties={"element": "ice", "floating": True}
        )
        engine.add_object(cube)
    
    return engine

if __name__ == "__main__":
    # Test du moteur
    print("🌟 Test Polygon 3D Engine")
    engine = create_magic_arena()
    
    # Render une frame
    frame_data = engine.render_frame(0.0)
    print(f"✅ Rendu: {frame_data['rendered_polygons']} polygones")
    print(f"✅ Objets: {frame_data['object_count']}")
    print(f"✅ Résolution: {frame_data['resolution']}")