/**
 * 👤 HeroProfileView - Vue complète du profil du héros
 * 
 * L'expérience joueur centrale : voir son héros, ses stats, son inventaire
 */

import React, { useState } from 'react';
import { Hero } from '../../data/heroes';
import { Artifact } from '../../data/artifacts';
import { Spell } from '../../data/spells';

interface HeroProfile extends Hero {
  level: number;
  experience: number;
  experienceToNext: number;
  inventory: Artifact[];
  equippedItems: {
    weapon?: Artifact;
    armor?: Artifact;
    accessory1?: Artifact;
    accessory2?: Artifact;
  };
  learnedSpells: Spell[];
  achievements: Achievement[];
  temporalStats: {
    paradoxesResolved: number;
    timelinesVisited: number;
    temporalDebt: number;
  };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

interface Props {
  hero: HeroProfile;
  onEquipItem?: (item: Artifact, slot: string) => void;
  onUnequipItem?: (slot: string) => void;
  onCastSpell?: (spell: Spell) => void;
}

export function HeroProfileView({ 
  hero, 
  onEquipItem, 
  onUnequipItem,
  onCastSpell 
}: Props): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'stats' | 'inventory' | 'spells' | 'achievements'>('stats');
  const [selectedItem, setSelectedItem] = useState<Artifact | null>(null);
  
  // Calculer les stats totales avec l'équipement
  const getTotalStats = () => {
    let totalAttack = hero.stats.attack;
    let totalDefense = hero.stats.defense;
    let totalHealth = hero.stats.health;
    let totalMana = hero.stats.mana;
    
    // Ajouter les bonus d'équipement
    Object.values(hero.equippedItems).forEach(item => {
      if (item?.effects.attack_bonus) totalAttack += item.effects.attack_bonus;
      if (item?.effects.defense_bonus) totalDefense += item.effects.defense_bonus;
      if (item?.effects.health_bonus) totalHealth += item.effects.health_bonus;
      if (item?.effects.mana_bonus) totalMana += item.effects.mana_bonus;
    });
    
    return { totalAttack, totalDefense, totalHealth, totalMana };
  };
  
  const stats = getTotalStats();

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      {/* Panneau gauche - Héros et stats principales */}
      <div style={{
        width: 400,
        background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
        padding: 30,
        borderRight: '3px solid #764ba2',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        {/* Portrait et infos basiques */}
        <div style={{
          textAlign: 'center',
          padding: 20,
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: 16,
          border: '2px solid ' + hero.theme_color,
        }}>
          <div style={{
            fontSize: 80,
            marginBottom: 20,
            filter: `drop-shadow(0 0 20px ${hero.theme_color})`,
            animation: 'pulse 2s infinite',
          }}>
            {hero.icon_id}
          </div>
          <h1 style={{
            fontSize: 28,
            marginBottom: 5,
            background: `linear-gradient(135deg, ${hero.theme_color}, #fff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {hero.name}
          </h1>
          <div style={{ color: '#a0aec0', marginBottom: 10 }}>{hero.title}</div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            marginTop: 15,
          }}>
            <span style={{
              padding: '5px 15px',
              background: hero.theme_color,
              borderRadius: 20,
              fontSize: 14,
            }}>
              Niveau {hero.level}
            </span>
            <span style={{
              padding: '5px 15px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: 20,
              fontSize: 14,
            }}>
              {hero.tier}
            </span>
          </div>
        </div>

        {/* Barre d'XP */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          padding: 15,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            fontSize: 14,
          }}>
            <span>Expérience</span>
            <span>{hero.experience} / {hero.experienceToNext}</span>
          </div>
          <div style={{
            height: 8,
            background: 'rgba(0,0,0,0.5)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${(hero.experience / hero.experienceToNext) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              transition: 'width 0.3s',
            }}/>
          </div>
        </div>

        {/* Stats de combat */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          padding: 15,
        }}>
          <h3 style={{ marginBottom: 15, fontSize: 16 }}>⚔️ Stats de Combat</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <StatBar 
              icon="⚔️" 
              label="Attaque" 
              value={stats.totalAttack} 
              baseValue={hero.stats.attack}
              color="#ff6b6b" 
            />
            <StatBar 
              icon="🛡️" 
              label="Défense" 
              value={stats.totalDefense}
              baseValue={hero.stats.defense} 
              color="#4ecdc4" 
            />
            <StatBar 
              icon="❤️" 
              label="Santé" 
              value={stats.totalHealth}
              baseValue={hero.stats.health} 
              color="#95e77e" 
            />
            <StatBar 
              icon="💫" 
              label="Mana" 
              value={stats.totalMana}
              baseValue={hero.stats.mana} 
              color="#bb85ff" 
            />
          </div>
        </div>

        {/* Stats temporelles */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          padding: 15,
        }}>
          <h3 style={{ marginBottom: 15, fontSize: 16 }}>⏳ Stats Temporelles</h3>
          <div style={{ fontSize: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Paradoxes résolus</span>
              <span style={{ color: '#667eea' }}>{hero.temporalStats.paradoxesResolved}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Timelines visitées</span>
              <span style={{ color: '#764ba2' }}>{hero.temporalStats.timelinesVisited}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Dette temporelle</span>
              <span style={{ color: '#ff6b6b' }}>{hero.temporalStats.temporalDebt}</span>
            </div>
          </div>
        </div>

        {/* Équipement rapide */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          padding: 15,
        }}>
          <h3 style={{ marginBottom: 15, fontSize: 16 }}>🗡️ Équipement</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <EquipmentSlot 
              slot="weapon" 
              item={hero.equippedItems.weapon}
              icon="⚔️"
              onUnequip={() => onUnequipItem?.('weapon')}
            />
            <EquipmentSlot 
              slot="armor" 
              item={hero.equippedItems.armor}
              icon="🛡️"
              onUnequip={() => onUnequipItem?.('armor')}
            />
            <EquipmentSlot 
              slot="accessory1" 
              item={hero.equippedItems.accessory1}
              icon="💍"
              onUnequip={() => onUnequipItem?.('accessory1')}
            />
            <EquipmentSlot 
              slot="accessory2" 
              item={hero.equippedItems.accessory2}
              icon="📿"
              onUnequip={() => onUnequipItem?.('accessory2')}
            />
          </div>
        </div>
      </div>

      {/* Panneau droit - Tabs pour inventaire, sorts, etc */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(20, 24, 36, 0.8)',
          borderBottom: '2px solid #764ba2',
        }}>
          {(['stats', 'inventory', 'spells', 'achievements'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '15px 20px',
                background: activeTab === tab 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)'
                  : 'transparent',
                border: 'none',
                color: 'white',
                fontSize: 16,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {tab === 'stats' && '📊 Détails'}
              {tab === 'inventory' && '🎒 Inventaire'}
              {tab === 'spells' && '🔮 Sorts'}
              {tab === 'achievements' && '🏆 Succès'}
            </button>
          ))}
        </div>

        {/* Contenu des tabs */}
        <div style={{
          flex: 1,
          padding: 30,
          overflowY: 'auto',
        }}>
          {activeTab === 'stats' && (
            <StatsDetails hero={hero} />
          )}

          {activeTab === 'inventory' && (
            <InventoryGrid 
              items={hero.inventory}
              onSelectItem={setSelectedItem}
              selectedItem={selectedItem}
              onEquipItem={(item) => {
                // Logique pour équiper selon le type
                const slot = item.type === 'weapon' ? 'weapon' :
                           item.type === 'armor' ? 'armor' :
                           !hero.equippedItems.accessory1 ? 'accessory1' : 'accessory2';
                onEquipItem?.(item, slot);
              }}
            />
          )}

          {activeTab === 'spells' && (
            <SpellsGrid 
              spells={hero.learnedSpells}
              onCastSpell={onCastSpell}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementsGrid 
              achievements={hero.achievements}
            />
          )}
        </div>
      </div>

      {/* Panneau flottant pour item sélectionné */}
      {selectedItem && (
        <ItemDetail 
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onEquip={() => {
            const slot = selectedItem.type === 'weapon' ? 'weapon' :
                       selectedItem.type === 'armor' ? 'armor' :
                       !hero.equippedItems.accessory1 ? 'accessory1' : 'accessory2';
            onEquipItem?.(selectedItem, slot);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}

// Composants auxiliaires

function StatBar({ icon, label, value, baseValue, color }: any) {
  const bonus = value - baseValue;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: 4,
          fontSize: 14,
        }}>
          <span>{label}</span>
          <span>
            {value}
            {bonus > 0 && (
              <span style={{ color: '#4CAF50', marginLeft: 5 }}>
                (+{bonus})
              </span>
            )}
          </span>
        </div>
        <div style={{
          height: 6,
          background: 'rgba(0,0,0,0.5)',
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${Math.min(100, (value / 200) * 100)}%`,
            height: '100%',
            background: color,
          }}/>
        </div>
      </div>
    </div>
  );
}

function EquipmentSlot({ slot, item, icon, onUnequip }: any) {
  return (
    <div style={{
      padding: 10,
      background: item ? 'rgba(102, 126, 234, 0.2)' : 'rgba(0,0,0,0.5)',
      borderRadius: 8,
      border: `2px solid ${item ? '#667eea' : 'transparent'}`,
      textAlign: 'center',
      cursor: item ? 'pointer' : 'default',
      position: 'relative',
    }}
    onClick={onUnequip}
    title={item?.name || `Emplacement ${slot}`}
    >
      <div style={{ fontSize: 24 }}>
        {item?.icon_id || icon}
      </div>
      {item && (
        <div style={{
          fontSize: 10,
          marginTop: 5,
          color: '#a0aec0',
        }}>
          {item.name}
        </div>
      )}
    </div>
  );
}

function StatsDetails({ hero }: { hero: HeroProfile }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 12,
        padding: 20,
      }}>
        <h3 style={{ marginBottom: 20 }}>📈 Statistiques détaillées</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {hero.abilities.map(ability => (
            <div key={ability.id} style={{
              padding: 15,
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: 8,
              borderLeft: `3px solid ${hero.theme_color}`,
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
                <span style={{ fontWeight: 'bold' }}>{ability.name}</span>
                <span style={{ color: '#bb85ff' }}>💫 {ability.cost}</span>
              </div>
              <div style={{ fontSize: 14, color: '#a0aec0' }}>
                {ability.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 12,
        padding: 20,
      }}>
        <h3 style={{ marginBottom: 20 }}>🌟 Caractéristiques spéciales</h3>
        <div style={{ fontSize: 14, lineHeight: 1.8 }}>
          <div style={{ marginBottom: 15 }}>
            <strong>Classe:</strong> {hero.class}
          </div>
          <div style={{ marginBottom: 15 }}>
            <strong>Description:</strong>
            <div style={{ color: '#a0aec0', marginTop: 5 }}>
              {hero.output_modes.literary}
            </div>
          </div>
          {hero.flavor && (
            <div style={{
              padding: 15,
              background: 'rgba(118, 75, 162, 0.1)',
              borderRadius: 8,
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: 20,
            }}>
              "{hero.flavor}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InventoryGrid({ items, onSelectItem, selectedItem, onEquipItem }: any) {
  return (
    <div>
      <h3 style={{ marginBottom: 20 }}>🎒 Inventaire ({items.length} objets)</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: 15,
      }}>
        {items.map((item: Artifact) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            onDoubleClick={() => onEquipItem(item)}
            style={{
              padding: 15,
              background: selectedItem?.id === item.id 
                ? 'rgba(102, 126, 234, 0.3)'
                : 'rgba(0,0,0,0.3)',
              borderRadius: 8,
              border: `2px solid ${selectedItem?.id === item.id ? '#667eea' : 'transparent'}`,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s',
            }}
            title={`${item.name} - Double-clic pour équiper`}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>
              {item.icon_id}
            </div>
            <div style={{ fontSize: 12, color: '#a0aec0' }}>
              {item.name}
            </div>
            <div style={{
              fontSize: 10,
              marginTop: 5,
              padding: '2px 8px',
              background: item.tier === 'mythic' ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                        item.tier === 'legendary' ? '#9932CC' :
                        item.tier === 'epic' ? '#4169E1' :
                        item.tier === 'rare' ? '#32CD32' : '#808080',
              borderRadius: 10,
              display: 'inline-block',
            }}>
              {item.tier}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpellsGrid({ spells, onCastSpell }: any) {
  return (
    <div>
      <h3 style={{ marginBottom: 20 }}>🔮 Sorts appris ({spells.length})</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 15,
      }}>
        {spells.map((spell: Spell) => (
          <div
            key={spell.id}
            onClick={() => onCastSpell?.(spell)}
            style={{
              padding: 15,
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 8,
              border: '2px solid transparent',
              borderImage: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderImageSlice: 1,
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 24 }}>{spell.icon || '✨'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{spell.name}</div>
                <div style={{ fontSize: 12, color: '#bb85ff' }}>
                  💫 {spell.cost.mana} mana
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#a0aec0' }}>
              {spell.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsGrid({ achievements }: any) {
  return (
    <div>
      <h3 style={{ marginBottom: 20 }}>
        🏆 Succès ({achievements.filter((a: Achievement) => a.unlockedAt).length}/{achievements.length})
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 15,
      }}>
        {achievements.map((achievement: Achievement) => (
          <div
            key={achievement.id}
            style={{
              padding: 15,
              background: achievement.unlockedAt 
                ? 'rgba(76, 175, 80, 0.1)'
                : 'rgba(0,0,0,0.3)',
              borderRadius: 8,
              border: `2px solid ${achievement.unlockedAt ? '#4CAF50' : 'transparent'}`,
              opacity: achievement.unlockedAt ? 1 : 0.5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 32 }}>{achievement.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{achievement.name}</div>
                <div style={{ fontSize: 12, color: '#a0aec0', marginTop: 5 }}>
                  {achievement.description}
                </div>
                {achievement.unlockedAt && (
                  <div style={{ fontSize: 10, color: '#4CAF50', marginTop: 5 }}>
                    ✅ Débloqué le {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemDetail({ item, onClose, onEquip }: any) {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      padding: 30,
      borderRadius: 16,
      border: '2px solid #764ba2',
      boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
      zIndex: 1000,
      minWidth: 400,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>{item.name}</h2>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: 24,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 64 }}>{item.icon_id}</div>
        <div style={{
          padding: '5px 15px',
          background: item.tier === 'mythic' ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                    item.tier === 'legendary' ? '#9932CC' :
                    item.tier === 'epic' ? '#4169E1' :
                    item.tier === 'rare' ? '#32CD32' : '#808080',
          borderRadius: 20,
          display: 'inline-block',
          marginTop: 10,
        }}>
          {item.tier}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ color: '#a0aec0', marginBottom: 10 }}>{item.description}</div>
        {item.flavor && (
          <div style={{ fontStyle: 'italic', color: '#667eea' }}>
            "{item.flavor}"
          </div>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <h4 style={{ marginBottom: 10 }}>Effets:</h4>
        <div style={{ 
          padding: 15, 
          background: 'rgba(0,0,0,0.3)', 
          borderRadius: 8,
          fontSize: 14,
        }}>
          {Object.entries(item.effects).map(([key, value]) => (
            <div key={key} style={{ marginBottom: 5 }}>
              • {key}: {JSON.stringify(value)}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onEquip}
        style={{
          width: '100%',
          padding: 15,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          border: 'none',
          borderRadius: 8,
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Équiper
      </button>
    </div>
  );
}

// Animation pulse
const styles = `
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
