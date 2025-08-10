import React from 'react';
import { vectorDB } from '../services/vectorDB';
import { useEditorStore } from '../state/useEditorStore';

interface SearchResult {
  file_path: string;
  content: string;
  score: number;
  metadata?: {
    title?: string;
    type?: string;
  };
}

export function VectorSearchPanel(): React.ReactElement {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState<'story' | 'dev'>('story');
  const [isConnected, setIsConnected] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const addObjectAt = useEditorStore(s => s.addObjectAt);
  const selected = useEditorStore(s => s.selected);
  
  React.useEffect(() => {
    vectorDB.checkConnection().then(setIsConnected);
  }, []);
  
  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await vectorDB.search(query, mode, 10);
      if (response?.results) {
        setResults(response.results);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  const insertAsObject = (result: SearchResult) => {
    if (!selected) {
      alert('Sélectionne une case sur la carte d\'abord!');
      return;
    }
    
    // Extraire le nom depuis le chemin ou le contenu
    const name = result.metadata?.title || 
                  result.file_path.split('/').pop()?.replace(/\.\w+$/, '') || 
                  'Élément mystérieux';
    
    // Créer un objet basé sur le type de contenu
    const type = result.metadata?.type || 'lore';
    
    addObjectAt(selected.x, selected.y, type, {
      name,
      description: result.content.substring(0, 200),
      source: result.file_path,
      vectorScore: result.score
    });
    
    alert(`Ajouté: ${name} à la position ${selected.x},${selected.y}`);
  };
  
  return (
    <div 
      style={{
        position: 'fixed',
        right: isExpanded ? 0 : -380,
        top: 80,
        width: 400,
        height: 'calc(100vh - 100px)',
        background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.98) 0%, rgba(26, 31, 46, 0.95) 100%)',
        border: '1px solid var(--border-secondary)',
        borderRadius: '12px 0 0 12px',
        padding: '20px',
        backdropFilter: 'blur(20px)',
        boxShadow: '-10px 0 25px rgba(0, 0, 0, 0.5)',
        transition: 'right 0.3s ease',
        zIndex: 1500,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          position: 'absolute',
          left: -40,
          top: 20,
          width: 40,
          height: 80,
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
          border: 'none',
          borderRadius: '8px 0 0 8px',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        {isExpanded ? '→' : '🔍'}
      </button>
      
      {/* Header */}
      <div>
        <h3 style={{ margin: 0, marginBottom: 8, color: 'var(--text-primary)' }}>
          🔮 Recherche Vector DB 6D
        </h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8, 
          fontSize: 12, 
          color: isConnected ? 'var(--accent-success)' : 'var(--accent-danger)' 
        }}>
          <span>{isConnected ? '✅ Connecté' : '❌ Déconnecté'}</span>
          {isConnected && <span style={{ color: 'var(--text-muted)' }}>Port 5001</span>}
        </div>
      </div>
      
      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          className={`tab ${mode === 'story' ? 'active' : ''}`}
          onClick={() => setMode('story')}
          style={{
            flex: 1,
            padding: '8px',
            background: mode === 'story' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
            color: mode === 'story' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          📖 Lore & Histoire
        </button>
        <button
          className={`tab ${mode === 'dev' ? 'active' : ''}`}
          onClick={() => setMode('dev')}
          style={{
            flex: 1,
            padding: '8px',
            background: mode === 'dev' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
            color: mode === 'dev' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          🛠️ Documentation
        </button>
      </div>
      
      {/* Search Input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={mode === 'story' ? 'Recherche héros, lieux, artefacts...' : 'Recherche API, guides...'}
          disabled={!isConnected}
          style={{
            flex: 1,
            padding: '10px',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 6,
            fontSize: 14,
          }}
        />
        <button
          onClick={handleSearch}
          disabled={!isConnected || loading}
          className="btn btn-primary"
          style={{ padding: '10px 20px' }}
        >
          {loading ? '⏳' : '🔍'}
        </button>
      </div>
      
      {/* Results */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        {results.map((result, i) => (
          <div
            key={i}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 8,
              padding: 12,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            className="search-result"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-primary)';
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'start',
              marginBottom: 8 
            }}>
              <div>
                <div style={{ 
                  fontSize: 12, 
                  color: 'var(--text-muted)',
                  marginBottom: 4 
                }}>
                  {result.file_path.split('/').slice(-2).join('/')}
                </div>
                {result.metadata?.title && (
                  <div style={{ 
                    fontWeight: 600, 
                    color: 'var(--text-primary)',
                    marginBottom: 4 
                  }}>
                    {result.metadata.title}
                  </div>
                )}
              </div>
              <div style={{
                fontSize: 11,
                padding: '2px 6px',
                background: 'var(--accent-primary)',
                color: 'white',
                borderRadius: 4,
              }}>
                {Math.round(result.score * 100)}%
              </div>
            </div>
            
            <div style={{ 
              fontSize: 13, 
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
              marginBottom: 8,
              maxHeight: 60,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {result.content.substring(0, 150)}...
            </div>
            
            <button
              onClick={() => insertAsObject(result)}
              className="btn"
              style={{
                padding: '6px 12px',
                fontSize: 12,
                width: '100%',
              }}
            >
              📍 Insérer sur la carte
            </button>
          </div>
        ))}
        
        {!loading && results.length === 0 && query && (
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--text-muted)',
            padding: 20 
          }}>
            Aucun résultat trouvé
          </div>
        )}
      </div>
      
      {/* Help Text */}
      {!isConnected && (
        <div style={{
          padding: 12,
          background: 'var(--bg-panel)',
          border: '1px solid var(--accent-warning)',
          borderRadius: 8,
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}>
          ⚠️ Vector DB non connecté. Lance <code>./h-profondeur vector</code> pour activer la recherche.
        </div>
      )}
    </div>
  );
}
