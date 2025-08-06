package com.magicstack.service;

import com.magicstack.model.CombatSession;
import com.magicstack.model.CardPlay;
import com.magicstack.model.CombatResult;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🌀 COMBAT SERVICE
 * Logique métier du système de combat TCG
 * Dimension 1 Littéraire: Chaque carte raconte une histoire
 */
@Service
public class CombatService {

    private final Map<String, CombatSession> activeCombats = new ConcurrentHashMap<>();
    private final Random random = new Random();

    public CombatSession initiateCombat(Map<String, Object> combatData) {
        String combatId = "combat_" + System.currentTimeMillis();
        String hero = (String) combatData.get("hero");
        String enemy = (String) combatData.get("enemy");
        
        CombatSession session = new CombatSession();
        session.setCombatId(combatId);
        session.setHero(hero);
        session.setEnemy(enemy);
        session.setHeroHp(100);
        session.setEnemyHp(getEnemyHP(enemy));
        session.setTurn(1);
        session.setAvailableCards(getStartingCards(hero));
        session.setCombatLog(new ArrayList<>());
        session.setFinished(false);
        
        // Ajouter log narratif d'ouverture
        session.getCombatLog().add(generateCombatNarrative("combat_start", hero, enemy, null, 0));
        
        activeCombats.put(combatId, session);
        
        System.out.println("🌀 Combat initié: " + hero + " vs " + enemy);
        return session;
    }

    public CombatResult playCard(CardPlay cardPlay) {
        CombatSession session = activeCombats.get(cardPlay.getCombatId());
        if (session == null) {
            throw new RuntimeException("Combat introuvable: " + cardPlay.getCombatId());
        }
        
        if (session.isFinished()) {
            throw new RuntimeException("Combat déjà terminé");
        }
        
        // Calculer les effets de la carte
        int damage = calculateCardDamage(cardPlay.getCard());
        String narrative = generateCombatNarrative("card_play", session.getHero(), session.getEnemy(), cardPlay.getCard(), damage);
        
        // Appliquer les dégâts
        session.setEnemyHp(Math.max(0, session.getEnemyHp() - damage));
        session.getCombatLog().add(narrative);
        
        // Tour de l'ennemi (IA simple)
        boolean combatFinished = false;
        String winner = null;
        
        if (session.getEnemyHp() <= 0) {
            combatFinished = true;
            winner = session.getHero();
            session.getCombatLog().add(generateCombatNarrative("victory", session.getHero(), session.getEnemy(), null, 0));
        } else {
            // Tour ennemi
            int enemyDamage = performEnemyTurn(session);
            session.setHeroHp(Math.max(0, session.getHeroHp() - enemyDamage));
            
            if (session.getHeroHp() <= 0) {
                combatFinished = true;
                winner = session.getEnemy();
                session.getCombatLog().add(generateCombatNarrative("defeat", session.getHero(), session.getEnemy(), null, enemyDamage));
            }
        }
        
        session.setTurn(session.getTurn() + 1);
        session.setFinished(combatFinished);
        
        // Nouvelles cartes disponibles
        List<String> nextCards = combatFinished ? new ArrayList<>() : getNextCards(session);
        session.setAvailableCards(nextCards);
        
        // Créer le résultat
        CombatResult result = new CombatResult();
        result.setCombatId(cardPlay.getCombatId());
        result.setCardPlayed(cardPlay.getCard());
        result.setDamageDealt(damage);
        result.setHeroHp(session.getHeroHp());
        result.setEnemyHp(session.getEnemyHp());
        result.setCombatFinished(combatFinished);
        result.setWinner(winner);
        result.setNarrativeText(narrative);
        result.setNextAvailableCards(nextCards);
        
        return result;
    }

    public CombatSession getCombatSession(String combatId) {
        CombatSession session = activeCombats.get(combatId);
        if (session == null) {
            throw new RuntimeException("Combat introuvable: " + combatId);
        }
        return session;
    }

    public void endCombat(String combatId) {
        activeCombats.remove(combatId);
        System.out.println("🛑 Combat terminé et supprimé: " + combatId);
    }

    private int getEnemyHP(String enemy) {
        // HP selon le type d'ennemi
        switch (enemy.toLowerCase()) {
            case "dragon-rouge":
            case "dragon_rouge":
                return 150;
            case "gobelin":
                return 50;
            case "orc":
                return 80;
            case "liche":
                return 120;
            default:
                return 100;
        }
    }

    private List<String> getStartingCards(String hero) {
        // Deck de départ selon le héros
        List<String> cards = new ArrayList<>();
        cards.add("fireball");
        cards.add("shield");
        cards.add("heal");
        
        // Cartes spéciales selon le héros
        if ("jean-grofignon".equals(hero.toLowerCase())) {
            cards.add("ultimate_collapse");
            cards.add("temporal_strike");
        }
        
        return cards;
    }

    private int calculateCardDamage(String card) {
        // Dégâts selon la carte
        switch (card.toLowerCase()) {
            case "fireball":
                return 25 + random.nextInt(15); // 25-40
            case "temporal_strike":
                return 30 + random.nextInt(20); // 30-50
            case "ultimate_collapse":
                return 40 + random.nextInt(25); // 40-65
            case "shield":
                return 0; // Défense, pas d'attaque
            case "heal":
                return 0; // Soin, pas d'attaque
            default:
                return 15 + random.nextInt(10); // 15-25
        }
    }

    private int performEnemyTurn(CombatSession session) {
        // IA simple pour l'ennemi
        String enemy = session.getEnemy();
        int damage = 0;
        
        switch (enemy.toLowerCase()) {
            case "dragon-rouge":
            case "dragon_rouge":
                damage = 20 + random.nextInt(15); // 20-35
                session.getCombatLog().add("🐉 Le dragon rouge crache des flammes! " + damage + " dégâts!");
                break;
            case "gobelin":
                damage = 10 + random.nextInt(8); // 10-18
                session.getCombatLog().add("👺 Le gobelin attaque vicieusement! " + damage + " dégâts!");
                break;
            case "orc":
                damage = 15 + random.nextInt(10); // 15-25
                session.getCombatLog().add("⚔️ L'orc frappe de sa hache! " + damage + " dégâts!");
                break;
            default:
                damage = 12 + random.nextInt(8); // 12-20
                session.getCombatLog().add("👹 " + enemy + " contre-attaque! " + damage + " dégâts!");
                break;
        }
        
        return damage;
    }

    private List<String> getNextCards(CombatSession session) {
        // Nouvelles cartes selon la situation
        List<String> cards = new ArrayList<>();
        
        if (session.getHeroHp() < 30) {
            cards.add("heal");
            cards.add("greater_heal");
        }
        
        if (session.getEnemyHp() < 50) {
            cards.add("finishing_blow");
        }
        
        // Cartes standards toujours disponibles
        cards.add("fireball");
        cards.add("shield");
        
        return cards;
    }

    private String generateCombatNarrative(String eventType, String hero, String enemy, String card, int damage) {
        switch (eventType) {
            case "combat_start":
                return "⚔️ " + hero + " fait face à " + enemy + "! Le combat commence!";
                
            case "card_play":
                return generateCardNarrative(hero, card, damage);
                
            case "victory":
                return "🏆 " + hero + " triomphe! " + enemy + " est vaincu!";
                
            case "defeat":
                return "💀 " + hero + " succombe face à " + enemy + "...";
                
            default:
                return "⚡ Événement de combat: " + eventType;
        }
    }

    private String generateCardNarrative(String hero, String card, int damage) {
        switch (card.toLowerCase()) {
            case "fireball":
                return "🔥 " + hero + " lance une boule de feu! " + damage + " dégâts de flammes!";
                
            case "temporal_strike":
                return "⏰ " + hero + " frappe à travers le temps! " + damage + " dégâts temporels!";
                
            case "ultimate_collapse":
                return "🌀 " + hero + " déclenche l'Effondrement Ultime! " + damage + " dégâts cataclysmiques!";
                
            case "shield":
                return "🛡️ " + hero + " lève son bouclier, se préparant à la défense!";
                
            case "heal":
                return "✨ " + hero + " invoque une lumière curative!";
                
            default:
                return "⚡ " + hero + " utilise " + card + "! " + damage + " dégâts!";
        }
    }
}