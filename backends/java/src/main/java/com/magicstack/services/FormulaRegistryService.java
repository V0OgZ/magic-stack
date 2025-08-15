package com.magicstack.services;

import org.springframework.stereotype.Service;
import java.net.http.*;
import java.net.URI;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class FormulaRegistryService {
    private static final String VECTOR_DB_URL = System.getenv().getOrDefault("VECTOR_DB_URL", "http://localhost:5001");
    private static final Duration TIMEOUT = Duration.ofSeconds(3);
    private final HttpClient http = HttpClient.newBuilder().connectTimeout(TIMEOUT).build();
    private volatile Map<String, String> cache = new ConcurrentHashMap<>();
    private volatile long lastLoad = 0L;
    private static final long TTL_MS = 60_000L;

    public synchronized void refreshIfNeeded() {
        long now = System.currentTimeMillis();
        if ((now - lastLoad) < TTL_MS && !cache.isEmpty()) return;
        try {
            HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(VECTOR_DB_URL + "/formulas"))
                .timeout(TIMEOUT)
                .GET()
                .build();
            HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
            if (res.statusCode() / 100 == 2) {
                Map<String, Object> parsed = parseJson(res.body());
                Object formulasObj = parsed.get("formulas");
                if (formulasObj instanceof Map) {
                    Map<?,?> fmap = (Map<?,?>) formulasObj;
                    Map<String, String> next = new HashMap<>();
                    for (Map.Entry<?,?> e : fmap.entrySet()) {
                        if (e.getKey() != null && e.getValue() != null) {
                            next.put(e.getKey().toString(), e.getValue().toString());
                        }
                    }
                    cache = new ConcurrentHashMap<>(next);
                    lastLoad = now;
                }
            }
        } catch (Exception ignored) { }
    }

    public String resolveFormulaText(String formulaIdOrText) {
        refreshIfNeeded();
        if (formulaIdOrText == null) return null;
        String key = formulaIdOrText.trim();
        String resolved = cache.get(key);
        return resolved != null ? resolved : key;
    }

    /**
     * Expose all cached formulas for API consumers.
     */
    public Map<String, String> getAllCachedFormulas() {
        refreshIfNeeded();
        return new HashMap<>(cache);
    }

    /**
     * Expose simple registry metrics and configuration to clients.
     */
    public Map<String, Object> getRegistryInfo() {
        Map<String, Object> info = new HashMap<>();
        long now = System.currentTimeMillis();
        boolean fresh = (now - lastLoad) < TTL_MS && !cache.isEmpty();
        info.put("status", fresh ? "FRESH" : "STALE");
        info.put("count", cache.size());
        info.put("ttlMs", TTL_MS);
        info.put("lastLoad", lastLoad);
        info.put("vectorDbUrl", VECTOR_DB_URL);
        return info;
    }

    public String getVectorDbUrl() { return VECTOR_DB_URL; }

    // Minimal JSON parser for flat objects (avoid bringing a full JSON lib here)
    @SuppressWarnings("unchecked")
    private Map<String, Object> parseJson(String json) {
        // Very naive; in a real app use Jackson. Here we keep dependencies minimal.
        try {
            return new com.fasterxml.jackson.databind.ObjectMapper().readValue(json, Map.class);
        } catch (Exception e) {
            return Collections.emptyMap();
        }
    }
}


