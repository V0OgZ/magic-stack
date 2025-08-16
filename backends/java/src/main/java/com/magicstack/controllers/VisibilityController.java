package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.magicstack.services.MagicEngineService;
import java.util.Map;

@RestController
@RequestMapping("/api/visibility")
@CrossOrigin(origins = {"http://localhost:5176", "https://heroesoftime.online"})
public class VisibilityController {

    @Autowired
    private MagicEngineService magicEngine;

    /**
     * Reads the latest world diff snapshot (in-memory only) aggregated from recent apply calls.
     * Response shape: { ts: <ms>, diffs: [...], bbox: {xMin,xMax,yMin,yMax}|null }
     */
    @GetMapping("/worldDiff")
    public Map<String, Object> getWorldDiff() {
        return magicEngine.getLatestWorldDiffSnapshot();
    }
}