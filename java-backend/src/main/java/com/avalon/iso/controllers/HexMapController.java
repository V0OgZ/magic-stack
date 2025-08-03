package com.avalon.iso.controllers;

import com.avalon.iso.models.*;
import com.avalon.iso.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * 🎮 Contrôleur pour la gestion de la carte hexagonale ISO
 * Implémente les besoins du mode exploration HOMM3-like
 */
@RestController
@RequestMapping("/api/iso/map")
@CrossOrigin(origins = "*")
public class HexMapController {
    
    @Autowired
    private HexGridService hexGridService;
    
    @Autowired
    private PathfindingService pathfindingService;
    
    @Autowired
    private FogOfWarService fogOfWarService;
    
    /**
     * Convertit des coordonnées hexagonales en pixels
     */
    @PostMapping("/hex-to-pixel")
    public PixelCoordinate hexToPixel(@RequestBody HexToPixelRequest request) {
        return hexGridService.hexToPixel(
            request.getHex(), 
            request.getMapSize()
        );
    }
    
    /**
     * Convertit des coordonnées pixel en hexagone
     */
    @PostMapping("/pixel-to-hex")
    public HexCoordinate pixelToHex(@RequestBody PixelToHexRequest request) {
        return hexGridService.pixelToHex(
            request.getPixel(),
            request.getMapSize()
        );
    }
    
    /**
     * Calcule un chemin A* entre deux hexagones
     */
    @PostMapping("/pathfinding")
    public PathfindingResponse findPath(@RequestBody PathfindingRequest request) {
        List<HexCoordinate> path = pathfindingService.findPath(
            request.getStart(),
            request.getEnd(),
            request.getObstacles()
        );
        
        PathfindingResponse response = new PathfindingResponse();
        response.setPath(path);
        response.setDistance(path.size() - 1);
        response.setReachable(!path.isEmpty());
        
        return response;
    }
    
    /**
     * Récupère l'état du brouillard de guerre
     */
    @GetMapping("/fog-of-war/{playerId}")
    public FogOfWarState getFogOfWar(@PathVariable String playerId) {
        return fogOfWarService.getPlayerFogState(playerId);
    }
    
    /**
     * Met à jour la vision d'un joueur
     */
    @PostMapping("/update-vision")
    public FogOfWarState updateVision(@RequestBody UpdateVisionRequest request) {
        return fogOfWarService.updateVision(
            request.getPlayerId(),
            request.getPosition(),
            request.getVisionRadius()
        );
    }
    
    /**
     * Récupère les objets sur une zone de la carte
     */
    @PostMapping("/get-objects")
    public List<MapObject> getMapObjects(@RequestBody MapAreaRequest request) {
        return hexGridService.getObjectsInArea(
            request.getTopLeft(),
            request.getBottomRight()
        );
    }
    
    /**
     * Place un objet sur la carte
     */
    @PostMapping("/place-object")
    public MapObject placeObject(@RequestBody PlaceObjectRequest request) {
        return hexGridService.placeObject(
            request.getObjectType(),
            request.getPosition(),
            request.getProperties()
        );
    }
    
    /**
     * Récupère les voisins d'un hexagone
     */
    @PostMapping("/get-neighbors")
    public List<HexCoordinate> getNeighbors(@RequestBody HexCoordinate hex) {
        return hexGridService.getNeighbors(hex);
    }
    
    /**
     * Calcule la distance entre deux hexagones
     */
    @PostMapping("/distance")
    public DistanceResponse calculateDistance(@RequestBody DistanceRequest request) {
        int distance = hexGridService.distance(request.getFrom(), request.getTo());
        
        DistanceResponse response = new DistanceResponse();
        response.setDistance(distance);
        response.setInRange(distance <= request.getMaxRange());
        
        return response;
    }
    
    /**
     * Récupère tous les hexagones dans un rayon
     */
    @PostMapping("/get-range")
    public List<HexCoordinate> getHexesInRange(@RequestBody RangeRequest request) {
        return hexGridService.getHexesInRange(
            request.getCenter(),
            request.getRadius()
        );
    }
    
    /**
     * Vérifie la ligne de vue entre deux hexagones
     */
    @PostMapping("/line-of-sight")
    public LineOfSightResponse checkLineOfSight(@RequestBody LineOfSightRequest request) {
        boolean hasLOS = hexGridService.hasLineOfSight(
            request.getFrom(),
            request.getTo(),
            request.getObstacles()
        );
        
        LineOfSightResponse response = new LineOfSightResponse();
        response.setHasLineOfSight(hasLOS);
        response.setBlockingHex(hasLOS ? null : hexGridService.getBlockingHex(
            request.getFrom(),
            request.getTo(),
            request.getObstacles()
        ));
        
        return response;
    }
}