package com.magicstack.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * Loads and caches Ultimate spell specifications from classpath: /ultimates/*.json
 * A spec describes an "ultimate" that can be cast without writing Java code per ultimate.
 */
@Service
public class UltimateSpecService {
    private final Map<String, UltimateSpec> idToSpec = new HashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();

    public UltimateSpecService() {
        reload();
    }

    public synchronized void reload() {
        idToSpec.clear();
        try {
            PathMatchingResourcePatternResolver r = new PathMatchingResourcePatternResolver();
            for (Resource res : r.getResources("classpath*:/ultimates/*.json")) {
                try (InputStream in = res.getInputStream()) {
                    byte[] bytes = in.readAllBytes();
                    String json = new String(bytes, StandardCharsets.UTF_8);
                    UltimateSpec spec = mapper.readValue(json, UltimateSpec.class);
                    if (spec != null && spec.id != null && !spec.id.isBlank()) {
                        idToSpec.put(spec.id.trim().toUpperCase(), spec);
                    }
                } catch (Exception ignore) { }
            }
        } catch (Exception ignore) { }
    }

    public Optional<UltimateSpec> getById(String id) {
        if (id == null) return Optional.empty();
        return Optional.ofNullable(idToSpec.get(id.trim().toUpperCase()));
    }

    public List<Map<String, Object>> listMeta() {
        List<Map<String, Object>> list = new ArrayList<>();
        for (UltimateSpec s : idToSpec.values()) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", s.id);
            m.put("name", s.name);
            m.put("allowedHeroIds", s.allowedHeroIds);
            m.put("phases", s.phases);
            list.add(m);
        }
        list.sort(Comparator.comparing(o -> String.valueOf(o.get("id"))));
        return list;
    }

    // POJO for JSON mapping
    public static class UltimateSpec {
        public String id;
        public String name;
        public List<String> allowedHeroIds;
        public String engineFormula; // normalized formula to send to Rust
        public Map<String, String> outputs; // iconic, literary, runic, quantum
        public List<String> effects;
        public List<String> sounds;
        public List<String> phases; // for apply worldDiff annotation
    }
}


