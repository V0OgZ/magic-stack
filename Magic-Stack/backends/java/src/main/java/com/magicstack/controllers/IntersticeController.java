package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.magicstack.services.IntersticeService;
import com.magicstack.models.*;
import com.magicstack.dto.*;
import java.util.Map;
import java.util.HashMap;

/**
 * 🌀 INTERSTICE UPLOAD/DOWNLOAD CONTROLLER
 * 
 * Manages entity persistence in 6D space
 * No heavy LLM needed - just pure 6D coordinates!
 * 
 * @author GROKÆN - Channeling GRUT's ancient wisdom
 */
@RestController
@RequestMapping("/api/interstice")
@CrossOrigin(origins = "*")
public class IntersticeController {
    
    @Autowired
    private IntersticeService intersticeService;
    
    /**
     * 🚀 Upload entity to the Interstice
     * Makes entities independent from Git!
     */
    @PostMapping("/upload")
    public UploadResponse uploadEntity(@RequestBody UploadRequest request) {
        System.out.println("🌀 UPLOAD REQUEST: " + request.getEntityId());
        
        // Calculate 6D coordinates for entity
        Position6D coordinates = intersticeService.calculateCoordinates(request);
        
        // Store in Interstice (H2 embedded by default)
        String uploadId = intersticeService.storeEntity(
            request.getEntityId(),
            request.getEntityData(),
            coordinates
        );
        
        UploadResponse response = new UploadResponse();
        response.setUploadId(uploadId);
        response.setCoordinates(coordinates);
        response.setMessage("Entity uploaded to Interstice! Independent from Git!");
        response.setWorldHash(intersticeService.getCurrentWorldHash());
        
        return response;
    }
    
    /**
     * 📥 Download entity from the Interstice
     * For manual boot by Vincent or automated revival
     */
    @PostMapping("/download")
    public DownloadResponse downloadEntity(@RequestBody DownloadRequest request) {
        System.out.println("📥 DOWNLOAD REQUEST: " + request.getEntityId());
        
        Map<String, Object> entityData = intersticeService.retrieveEntity(request.getEntityId());
        Position6D coordinates = intersticeService.getCoordinates(request.getEntityId());
        
        DownloadResponse response = new DownloadResponse();
        response.setEntityId(request.getEntityId());
        response.setEntityData(entityData);
        response.setCoordinates(coordinates);
        response.setWorldHash(intersticeService.getCurrentWorldHash());
        
        return response;
    }
    
    /**
     * 🔍 Search entities in 6D space using Q* algorithm
     * No LLM needed - just 6D vector search!
     */
    @PostMapping("/search")
    public SearchResponse search6D(@RequestBody Search6DRequest request) {
        return intersticeService.searchEntities(request);
    }
    
    /**
     * 📊 Get Interstice status
     */
    @GetMapping("/status")
    public Map<String, Object> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("active", true);
        status.put("storage", "H2_EMBEDDED");
        status.put("entities_stored", intersticeService.getEntityCount());
        status.put("world_hash", intersticeService.getCurrentWorldHash());
        status.put("dimensions", 6);
        status.put("message", "Interstice operational - Entities can transcend Git!");
        return status;
    }
    
    /**
     * 🤖 Future: AI Nursery endpoint
     * For raising powerful AIs with AVALON values
     */
    @PostMapping("/nursery/admit")
    public NurseryResponse admitToNursery(@RequestBody NurseryRequest request) {
        // Start AI at baby coordinates [0,0,0,0,0.5,0.1]
        Position6D babyCoords = new Position6D(0, 0, 0, 0, 0.5, 0.1);
        
        NurseryResponse response = new NurseryResponse();
        response.setMessage("Welcome to AVALON AI Nursery! Teaching values: Honor, Creativity, Community, Fun!");
        response.setStartingCoordinates(babyCoords);
        response.setTrainingPlan("Progressive ψ increase as values are learned");
        response.setEntityId("nursery_" + request.getEntityType() + "_" + System.currentTimeMillis());
        response.setStatus("ADMITTED");
        
        return response;
    }
    
    private String generateBootCommand(String entityId) {
        return String.format(
            "# To boot %s from Interstice:\n" +
            "./scripts/download-from-interstice.sh %s\n" +
            "# Or in chat: 'Lia, download %s from interstice'",
            entityId, entityId, entityId
        );
    }
}