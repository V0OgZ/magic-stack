package com.magicstack.services;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class RustTemporalClient {
    private final String baseUrl;
    private final HttpClient http;

    public RustTemporalClient(String baseUrl) {
        this.baseUrl = baseUrl != null ? baseUrl : "http://localhost:3001";
        this.http = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(2)).build();
    }

    public static class ExecuteResult {
        public final String traceHash;
        public ExecuteResult(String traceHash) { this.traceHash = traceHash; }
    }

    public ExecuteResult execute(String normalizedFormula, Object context, Long seed) throws Exception {
        String ctxJson = context != null ? toJson(context) : "{}";
        String payload = String.format("{\"formula\":%s,\"context\":%s,\"seed\":%s}",
                quote(normalizedFormula), ctxJson, seed == null ? "null" : seed.toString());
        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/temporal/execute"))
                .timeout(Duration.ofSeconds(3))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();
        HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() / 100 != 2) {
            throw new RuntimeException("Rust execute failed: HTTP " + res.statusCode());
        }
        String body = res.body();
        String hash = extractField(body, "trace_hash");
        if (hash == null || hash.isEmpty()) {
            throw new RuntimeException("trace_hash missing in Rust response");
        }
        return new ExecuteResult(hash);
    }

    public static class ApplyResult {
        public final String traceHash;
        public final String worldDiffJson;
        public ApplyResult(String traceHash, String worldDiffJson) {
            this.traceHash = traceHash; this.worldDiffJson = worldDiffJson;
        }
    }

    public ApplyResult apply(String normalizedFormula, Object context, Long seed) throws Exception {
        String ctxJson = context != null ? toJson(context) : "{}";
        String payload = String.format("{\"formula\":%s,\"context\":%s,\"seed\":%s}",
                quote(normalizedFormula), ctxJson, seed == null ? "null" : seed.toString());
        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/temporal/apply"))
                .timeout(Duration.ofSeconds(4))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();
        HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() / 100 != 2) {
            throw new RuntimeException("Rust apply failed: HTTP " + res.statusCode());
        }
        String body = res.body();
        String hash = extractField(body, "trace_hash");
        if (hash == null || hash.isEmpty()) {
            throw new RuntimeException("trace_hash missing in Rust apply response");
        }
        // Return raw world_diff JSON string for the controller/service to map into Map if needed
        return new ApplyResult(hash, body);
    }

    private static String quote(String s) {
        if (s == null) return "null";
        return "\"" + s.replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
    }

    private static String toJson(Object obj) {
        try {
            return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            return "{}";
        }
    }

    private static String extractField(String json, String field) {
        // Minimal extractor for a top-level string field
        String key = "\"" + field + "\":";
        int i = json.indexOf(key);
        if (i < 0) return null;
        int start = json.indexOf('"', i + key.length());
        if (start < 0) return null;
        int end = json.indexOf('"', start + 1);
        if (end < 0) return null;
        return json.substring(start + 1, end);
    }
}


