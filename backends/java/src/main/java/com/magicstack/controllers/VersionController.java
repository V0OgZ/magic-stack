package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ClassPathResource;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.io.InputStream;

/**
 * 🔍 Version Controller
 * Provides build and deployment information
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5176", "https://heroesoftime.online"})
public class VersionController {

    @GetMapping("/version")
    public Map<String, Object> getVersion() {
        Map<String, Object> version = new HashMap<>();
        
        // Try to get commit from git.properties
        String commit = "unknown";
        try {
            ClassPathResource resource = new ClassPathResource("git.properties");
            if (resource.exists()) {
                Properties props = new Properties();
                try (InputStream is = resource.getInputStream()) {
                    props.load(is);
                    commit = props.getProperty("git.commit.id.abbrev", 
                             props.getProperty("git.commit.id", "unknown"));
                }
            }
        } catch (Exception ignored) {
            // Fallback to environment variable
            commit = System.getenv().getOrDefault("GIT_SHA", "unknown");
        }
        
        version.put("commit", commit);
        version.put("sw", "hot-static-v4");
        version.put("ts", System.currentTimeMillis());
        
        return version;
    }
}