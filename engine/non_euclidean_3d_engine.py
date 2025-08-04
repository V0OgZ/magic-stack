#!/usr/bin/env python3
"""
Non-Euclidean 3D Engine for Magic Stack
Transforme la géométrie de l'espace en temps réel
"""

import numpy as np
import json
from typing import Dict, List, Tuple, Any
from dataclasses import dataclass
import math

@dataclass
class Vertex3D:
    x: float
    y: float
    z: float
    w: float = 1.0  # Pour les transformations 4D
    
    def to_array(self):
        return np.array([self.x, self.y, self.z, self.w])

class NonEuclideanEngine:
    """Moteur de géométrie non-euclidienne pour transformer les maps"""
    
    def __init__(self):
        self.active_transformations = []
        self.space_curvature = 0  # 0=flat, <0=hyperbolic, >0=spherical
        self.topology = "euclidean"
        self.dimension_count = 3
        
    def apply_hyperbolic_warp(self, vertices: List[Vertex3D], center: Tuple[float, float, float], radius: float) -> List[Vertex3D]:
        """Applique une déformation hyperbolique à l'espace"""
        warped = []
        for v in vertices:
            # Distance au centre
            dx = v.x - center[0]
            dy = v.y - center[1]
            dz = v.z - center[2]
            dist = math.sqrt(dx*dx + dy*dy + dz*dz)
            
            if dist < radius:
                # Transformation hyperbolique de Poincaré
                factor = math.tanh(dist / radius * 2)
                scale = factor / (dist + 0.001)  # Éviter division par 0
                
                new_v = Vertex3D(
                    center[0] + dx * scale,
                    center[1] + dy * scale,
                    center[2] + dz * scale
                )
                warped.append(new_v)
            else:
                warped.append(v)
        
        return warped
    
    def create_klein_bottle_surface(self, u_steps: int = 50, v_steps: int = 50) -> List[List[Vertex3D]]:
        """Génère une surface de bouteille de Klein"""
        surface = []
        
        for i in range(u_steps):
            row = []
            u = i / u_steps * 2 * math.pi
            
            for j in range(v_steps):
                v = j / v_steps * 2 * math.pi
                
                # Paramétrisation de la bouteille de Klein
                if u < math.pi:
                    x = 3 * math.cos(u) * (1 + math.sin(u)) + 2 * (1 - math.cos(u)/2) * math.cos(v)
                    y = 8 * math.sin(u) + 2 * (1 - math.cos(u)/2) * math.sin(v) * math.cos(u)
                else:
                    x = 3 * math.cos(u) * (1 + math.sin(u)) + 2 * (1 - math.cos(u)/2) * math.cos(v + math.pi)
                    y = 8 * math.sin(u)
                
                z = 2 * (1 - math.cos(u)/2) * math.sin(v)
                
                row.append(Vertex3D(x * 10, y * 10, z * 10))
            
            surface.append(row)
        
        return surface
    
    def generate_fractal_terrain(self, center: Tuple[float, float, float], 
                               size: float, iterations: int, dimension: float = 2.5) -> List[Vertex3D]:
        """Génère un terrain fractal avec dimension de Hausdorff variable"""
        points = []
        
        def mandelbrot_3d(x, y, z, max_iter):
            """Calcul de Mandelbrot en 3D"""
            c = complex(x, y)
            z_val = complex(z, 0)
            
            for n in range(max_iter):
                if abs(z_val) > 2:
                    return n
                z_val = z_val * z_val + c
            
            return max_iter
        
        # Génération de points fractals
        resolution = 50
        for i in range(resolution):
            for j in range(resolution):
                x = center[0] + (i / resolution - 0.5) * size
                y = center[1] + (j / resolution - 0.5) * size
                
                # Hauteur basée sur le fractal
                fractal_value = mandelbrot_3d(x/size*3, y/size*3, 0, iterations)
                height = center[2] + (fractal_value / iterations) * size * 0.5
                
                # Ajouter de la variation fractale
                noise = math.sin(x * dimension) * math.cos(y * dimension) * 0.1
                height += noise * size
                
                points.append(Vertex3D(x, y, height))
        
        return points
    
    def create_tesseract_projection(self, center: Tuple[float, float, float], size: float) -> Dict[str, Any]:
        """Crée une projection 3D d'un tesseract (hypercube 4D)"""
        # Sommets du tesseract en 4D
        vertices_4d = []
        for i in range(16):  # 2^4 sommets
            x = 1 if i & 1 else -1
            y = 1 if i & 2 else -1
            z = 1 if i & 4 else -1
            w = 1 if i & 8 else -1
            vertices_4d.append([x*size, y*size, z*size, w*size])
        
        # Projection stéréographique 4D -> 3D
        vertices_3d = []
        for v4 in vertices_4d:
            # Projection depuis w=2
            w_proj = 2
            factor = 1 / (w_proj - v4[3])
            
            x3 = v4[0] * factor + center[0]
            y3 = v4[1] * factor + center[1]
            z3 = v4[2] * factor + center[2]
            
            vertices_3d.append(Vertex3D(x3, y3, z3))
        
        # Arêtes du tesseract (32 arêtes)
        edges = []
        for i in range(16):
            for j in range(i+1, 16):
                # Deux sommets sont connectés s'ils diffèrent d'une seule coordonnée
                diff = bin(i ^ j).count('1')
                if diff == 1:
                    edges.append((i, j))
        
        return {
            "vertices": vertices_3d,
            "edges": edges,
            "faces": self._generate_tesseract_faces(),
            "cells": self._generate_tesseract_cells()
        }
    
    def _generate_tesseract_faces(self) -> List[List[int]]:
        """Génère les faces 2D du tesseract"""
        faces = []
        # Chaque face est un carré défini par 4 sommets
        # Il y a 24 faces dans un tesseract
        # (Implémentation simplifiée)
        return faces
    
    def _generate_tesseract_cells(self) -> List[List[int]]:
        """Génère les cellules 3D du tesseract"""
        cells = []
        # Un tesseract a 8 cellules cubiques
        # (Implémentation simplifiée)
        return cells
    
    def create_mobius_strip(self, center: Tuple[float, float, float], 
                           radius: float, width: float, twists: int = 1) -> List[List[Vertex3D]]:
        """Crée un ruban de Möbius"""
        strip = []
        u_steps = 100
        v_steps = 20
        
        for i in range(u_steps):
            row = []
            u = i / u_steps * 2 * math.pi
            
            for j in range(v_steps):
                v = (j / v_steps - 0.5) * width
                
                # Rotation selon le nombre de torsions
                angle = u * twists / 2
                
                # Position sur le ruban
                x = (radius + v * math.cos(angle)) * math.cos(u) + center[0]
                y = (radius + v * math.cos(angle)) * math.sin(u) + center[1]
                z = v * math.sin(angle) + center[2]
                
                row.append(Vertex3D(x, y, z))
            
            strip.append(row)
        
        return strip
    
    def transform_to_spherical_geometry(self, vertices: List[Vertex3D], 
                                      center: Tuple[float, float, float], 
                                      radius: float) -> List[Vertex3D]:
        """Transforme l'espace en géométrie sphérique (courbure positive)"""
        transformed = []
        
        for v in vertices:
            # Projection sur une sphère
            dx = v.x - center[0]
            dy = v.y - center[1]
            dz = v.z - center[2]
            
            dist = math.sqrt(dx*dx + dy*dy + dz*dz)
            if dist > 0:
                # Projection stéréographique inverse
                factor = radius * math.atan(dist / radius) / dist
                
                new_v = Vertex3D(
                    center[0] + dx * factor,
                    center[1] + dy * factor,
                    center[2] + dz * factor
                )
                transformed.append(new_v)
            else:
                transformed.append(v)
        
        return transformed
    
    def apply_portal_distortion(self, vertices: List[Vertex3D], 
                               portal_a: Tuple[float, float, float],
                               portal_b: Tuple[float, float, float],
                               radius: float) -> List[Vertex3D]:
        """Crée une distorsion spatiale entre deux portails"""
        distorted = []
        
        for v in vertices:
            # Distance au portail A
            dist_a = math.sqrt(
                (v.x - portal_a[0])**2 + 
                (v.y - portal_a[1])**2 + 
                (v.z - portal_a[2])**2
            )
            
            if dist_a < radius:
                # Téléportation progressive vers le portail B
                t = 1 - (dist_a / radius)**2  # Fonction de transition douce
                
                new_v = Vertex3D(
                    v.x * (1-t) + portal_b[0] * t,
                    v.y * (1-t) + portal_b[1] * t,
                    v.z * (1-t) + portal_b[2] * t
                )
                distorted.append(new_v)
            else:
                distorted.append(v)
        
        return distorted
    
    def generate_impossible_stairs(self, center: Tuple[float, float, float], 
                                 size: float) -> List[Vertex3D]:
        """Génère un escalier de Penrose (escalier impossible)"""
        stairs = []
        steps = 16
        
        for i in range(steps):
            angle = i / steps * 2 * math.pi
            
            # Position de base
            x = math.cos(angle) * size + center[0]
            y = math.sin(angle) * size + center[1]
            
            # Hauteur qui boucle de manière impossible
            z = (i % 4) * size * 0.25 + center[2]
            
            # Ajouter plusieurs points pour former la marche
            stairs.append(Vertex3D(x, y, z))
            stairs.append(Vertex3D(x * 0.8, y * 0.8, z))
            stairs.append(Vertex3D(x * 0.8, y * 0.8, z + size * 0.25))
            stairs.append(Vertex3D(x, y, z + size * 0.25))
        
        return stairs
    
    def calculate_geodesics(self, start: Vertex3D, end: Vertex3D, 
                          geometry_type: str, steps: int = 100) -> List[Vertex3D]:
        """Calcule les géodésiques (plus courts chemins) dans différentes géométries"""
        path = []
        
        if geometry_type == "hyperbolic":
            # Géodésiques hyperboliques (arcs de cercle)
            for i in range(steps + 1):
                t = i / steps
                
                # Interpolation hyperbolique
                x = start.x * (1-t) + end.x * t
                y = start.y * (1-t) + end.y * t
                z = start.z * (1-t) + end.z * t
                
                # Courbure hyperbolique
                curve = math.sinh(t * math.pi - math.pi/2) * 0.2
                y += curve
                
                path.append(Vertex3D(x, y, z))
                
        elif geometry_type == "spherical":
            # Géodésiques sphériques (grands cercles)
            for i in range(steps + 1):
                t = i / steps
                
                # Interpolation sphérique (slerp)
                angle = math.acos(min(1, max(-1, 
                    (start.x*end.x + start.y*end.y + start.z*end.z) / 
                    (math.sqrt(start.x**2 + start.y**2 + start.z**2) * 
                     math.sqrt(end.x**2 + end.y**2 + end.z**2)))))
                
                if angle > 0.001:
                    factor_a = math.sin((1-t) * angle) / math.sin(angle)
                    factor_b = math.sin(t * angle) / math.sin(angle)
                else:
                    factor_a = 1 - t
                    factor_b = t
                
                x = start.x * factor_a + end.x * factor_b
                y = start.y * factor_a + end.y * factor_b
                z = start.z * factor_a + end.z * factor_b
                
                path.append(Vertex3D(x, y, z))
                
        else:  # Euclidean
            # Ligne droite
            for i in range(steps + 1):
                t = i / steps
                x = start.x * (1-t) + end.x * t
                y = start.y * (1-t) + end.y * t
                z = start.z * (1-t) + end.z * t
                path.append(Vertex3D(x, y, z))
        
        return path

# Export pour utilisation dans le jeu
__all__ = ['NonEuclideanEngine', 'Vertex3D']