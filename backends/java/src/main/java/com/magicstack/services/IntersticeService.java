package com.magicstack.services;

import org.springframework.stereotype.Service;
import com.magicstack.models.Position6D;
import com.magicstack.models.IntersticeEntity;
import com.magicstack.dto.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Service for managing entities in 6D space
 * Stores entities with their 6D coordinates
 */
@Service
public class IntersticeService {
    
    private final Map<String, Map<String, Object>> entities = new ConcurrentHashMap<>();
    private final Map<String, Position6D> positions = new ConcurrentHashMap<>();
    private String currentWorldHash = "AVALON_" + System.currentTimeMillis();
    
    public Position6D calculateCoordinates(UploadRequest request) {
        Position6D pos = new Position6D();
        
        // Extract coordinates from request or generate based on entity properties
        Map<String, Object> data = request.getEntityData();
        
        pos.setX(data.containsKey("x") ? ((Number)data.get("x")).doubleValue() : Math.random() * 100);
        pos.setY(data.containsKey("y") ? ((Number)data.get("y")).doubleValue() : Math.random() * 100);
        pos.setZ(data.containsKey("z") ? ((Number)data.get("z")).doubleValue() : Math.random() * 100);
        pos.setT(System.currentTimeMillis() / 1000.0); // Current time
        pos.setC(data.containsKey("causal") ? ((Number)data.get("causal")).doubleValue() : 0.5);
        pos.setPsi(data.containsKey("quantum") ? ((Number)data.get("quantum")).doubleValue() : 0.5);
        
        return pos;
    }
    
    public Map<String, Double> calculateCoordinates(String identifier) {
        // Generate coordinates based on the hash of the identifier
        int hash = identifier.hashCode();
        Map<String, Double> coords = new HashMap<>();
        
        coords.put("x", (double)((hash & 0xFF) % 100));
        coords.put("y", (double)(((hash >> 8) & 0xFF) % 100));
        coords.put("z", (double)(((hash >> 16) & 0xFF) % 100));
        coords.put("t", System.currentTimeMillis() / 1000.0);
        coords.put("c", 0.5 + (((hash >> 24) & 0xFF) / 255.0) * 0.5);
        coords.put("psi", 0.5 + (((hash >> 28) & 0xF) / 15.0) * 0.5);
        
        return coords;
    }
    
    public String storeEntity(String entityId, Map<String, Object> entityData, Position6D coordinates) {
        String uploadId = "upload_" + UUID.randomUUID().toString();
        
        Map<String, Object> storedEntity = new HashMap<>(entityData);
        storedEntity.put("id", entityId);
        storedEntity.put("uploadId", uploadId);
        storedEntity.put("timestamp", System.currentTimeMillis());
        storedEntity.put("coordinates_6d", coordinates);
        
        entities.put(entityId, storedEntity);
        positions.put(entityId, coordinates);
        
        return uploadId;
    }
    
    public Map<String, Object> retrieveEntity(String entityId) {
        return entities.get(entityId);
    }
    
    public Position6D getCoordinates(String entityId) {
        return positions.get(entityId);
    }
    
    public String getCurrentWorldHash() {
        return currentWorldHash;
    }
    
    public List<String> searchNearby(Position6D center, double radius) {
        List<String> nearby = new ArrayList<>();
        
        for (Map.Entry<String, Position6D> entry : positions.entrySet()) {
            if (entry.getValue().distanceTo(center) <= radius) {
                nearby.add(entry.getKey());
            }
        }
        
        return nearby;
    }
    
    public SearchResponse searchEntities(Search6DRequest request) {
        SearchResponse response = new SearchResponse();
        
        List<Map<String, Object>> foundEntities = new ArrayList<>();
        Position6D center = request.getCenter();
        double radius = request.getRadius();
        
        for (Map.Entry<String, Position6D> entry : positions.entrySet()) {
            if (entry.getValue().distanceTo(center) <= radius) {
                Map<String, Object> entity = entities.get(entry.getKey());
                if (entity != null) {
                    foundEntities.add(entity);
                }
            }
        }
        
        response.setFoundCount(foundEntities.size());
        response.setEntities(foundEntities);
        response.setSearchId("search_" + UUID.randomUUID());
        
        return response;
    }
    
    public int getEntityCount() {
        return entities.size();
    }
    
    public List<IntersticeEntity> getAllEntities() {
        List<IntersticeEntity> allEntities = new ArrayList<>();
        
        for (Map.Entry<String, Map<String, Object>> entry : entities.entrySet()) {
            String id = entry.getKey();
            Map<String, Object> data = entry.getValue();
            Position6D pos = positions.get(id);
            
            IntersticeEntity entity = new IntersticeEntity();
            entity.setIntersticeId(id);
            entity.setName((String) data.getOrDefault("name", id));
            entity.setType((String) data.getOrDefault("entity_type", "UNKNOWN"));
            entity.setData(data);
            
            if (pos != null) {
                entity.setX(pos.getX());
                entity.setY(pos.getY());
                entity.setZ(pos.getZ());
                entity.setT(pos.getT());
                entity.setC(pos.getC());
                entity.setPsi(pos.getPsi());
            }
            
            allEntities.add(entity);
        }
        
        return allEntities;
    }
}