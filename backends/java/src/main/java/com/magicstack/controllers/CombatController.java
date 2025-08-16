package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ⚔️ CombatController — Endpoints TCG minimal (Jour 37 P1)
 */
@RestController
@RequestMapping("/api/combat")
@CrossOrigin(origins = {"http://localhost:5176", "https://heroesoftime.online"})
public class CombatController {

    private final Map<String, GameState> games = new ConcurrentHashMap<>();

    // ==== DTOs ====
    public static class StartRequest {
        public String player1;
        public String player2;
        public String seed;
    }

    public static class PlayCardRequest {
        public String gameId;
        public String playerId;
        public String cardId;
        public String targetId; // optional
    }

    public static class GameState {
        public String gameId;
        public int turn;
        public String activePlayer;
        public Map<String, Integer> mana = new HashMap<>();
        public List<Map<String, Object>> handP1 = new ArrayList<>();
        public List<Map<String, Object>> handP2 = new ArrayList<>();
        public Map<String, Object> board = new HashMap<>();
        public String lastAction;
    }

    public static class StartResponse {
        public String gameId;
        public String status = "OK";
    }

    public static class PlayCardResponse {
        public String status = "OK";
        public int turn;
        public String activePlayer;
        public String lastAction;
    }

    @PostMapping("/start")
    public ResponseEntity<StartResponse> start(@RequestBody StartRequest req) {
        String gid = UUID.randomUUID().toString();
        GameState st = new GameState();
        st.gameId = gid;
        st.turn = 1;
        st.activePlayer = (req.player1 != null ? req.player1 : "P1");
        st.mana.put(req.player1 != null ? req.player1 : "P1", 3);
        st.mana.put(req.player2 != null ? req.player2 : "P2", 3);
        // mains de départ minimales
        st.handP1.add(card("C_001", 1));
        st.handP1.add(card("C_002", 2));
        st.handP2.add(card("C_101", 1));
        st.board.put("ally", new ArrayList<>());
        st.board.put("enemy", new ArrayList<>());
        st.board.put("effects", new ArrayList<>());
        st.lastAction = "START";

        games.put(gid, st);

        StartResponse resp = new StartResponse();
        resp.gameId = gid;
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

    @PostMapping("/play-card")
    public ResponseEntity<PlayCardResponse> playCard(@RequestBody PlayCardRequest req) {
        GameState st = games.get(req.gameId);
        if (st == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        // règle simple: jouer une carte coûte 1 mana, puis passe le tour
        int mana = st.mana.getOrDefault(req.playerId, 0);
        st.mana.put(req.playerId, Math.max(0, mana - 1));
        st.lastAction = "PLAY_CARD:" + req.cardId + (req.targetId != null ? ("->" + req.targetId) : "");
        // changer de joueur actif (P1 <-> P2)
        st.turn += 1;
        st.activePlayer = nextPlayer(st, req.playerId);

        PlayCardResponse resp = new PlayCardResponse();
        resp.turn = st.turn;
        resp.activePlayer = st.activePlayer;
        resp.lastAction = st.lastAction;
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

    @GetMapping("/state/{gameId}")
    public ResponseEntity<GameState> state(@PathVariable String gameId) {
        GameState st = games.get(gameId);
        if (st == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(st);
    }

    private static Map<String, Object> card(String id, int cost) {
        Map<String, Object> c = new HashMap<>();
        c.put("id", id);
        c.put("cost", cost);
        return c;
    }

    private static String nextPlayer(GameState st, String current) {
        for (String k : st.mana.keySet()) {
            if (!Objects.equals(k, current)) return k;
        }
        return current;
    }
}


