package com.avalon.models;

/**
 * ⚡ MODÈLE CARTE AVALON TCG
 * 
 * @author Merlash-Technomancien
 */
public class Card {
    private String id;
    private String name;
    private String description;
    private String formula;          // Formule technomantique
    private int manaCost;
    private String type;             // SPELL, CREATURE, ARTIFACT, TEMPORAL, QUANTUM, ULTIMATE
    private String rarity;           // COMMON, RARE, EPIC, LEGENDARY
    private int attack;
    private int health;
    private String imageUrl;
    
    // Constructeurs
    public Card() {}
    
    public Card(String id, String name, String formula, int manaCost, String type) {
        this.id = id;
        this.name = name;
        this.formula = formula;
        this.manaCost = manaCost;
        this.type = type;
    }
    
    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getFormula() { return formula; }
    public void setFormula(String formula) { this.formula = formula; }
    
    public int getManaCost() { return manaCost; }
    public void setManaCost(int manaCost) { this.manaCost = manaCost; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getRarity() { return rarity; }
    public void setRarity(String rarity) { this.rarity = rarity; }
    
    public int getAttack() { return attack; }
    public void setAttack(int attack) { this.attack = attack; }
    
    public int getHealth() { return health; }
    public void setHealth(int health) { this.health = health; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    // Helpers
    public boolean isSpell() { return "SPELL".equals(type); }
    public boolean isCreature() { return "CREATURE".equals(type); }
    public boolean isTemporal() { return "TEMPORAL".equals(type); }
    public boolean isQuantum() { return "QUANTUM".equals(type); }
    public boolean isUltimate() { return "ULTIMATE".equals(type); }
}