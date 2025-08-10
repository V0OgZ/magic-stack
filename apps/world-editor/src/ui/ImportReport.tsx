/**
 * 📊 Import Report - Rapport détaillé d'import/export
 * Montre ce qui a été mappé, ignoré, ou converti
 */

import React from 'react';

export interface ImportReportData {
  source: string;
  format: 'hsc' | 'json' | 'v1' | 'v2';
  timestamp: Date;
  stats: {
    total: number;
    imported: number;
    skipped: number;
    converted: number;
    errors: number;
  };
  details: Array<{
    field: string;
    status: 'success' | 'warning' | 'error' | 'skipped';
    message: string;
    originalValue?: any;
    convertedValue?: any;
  }>;
}

export function ImportReport({ 
  report,
  onClose
}: {
  report: ImportReportData;
  onClose: () => void;
}): React.ReactElement {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'skipped': return '⏭️';
      default: return '❓';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#48bb78';
      case 'warning': return '#f6ad55';
      case 'error': return '#fc8181';
      case 'skipped': return '#a0aec0';
      default: return '#cbd5e0';
    }
  };
  
  const successRate = Math.round((report.stats.imported / report.stats.total) * 100) || 0;
  
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: 600,
      maxHeight: '80vh',
      background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.98) 0%, rgba(26, 31, 46, 0.98) 100%)',
      border: '1px solid var(--border-secondary)',
      borderRadius: 16,
      padding: 24,
      backdropFilter: 'blur(20px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      color: '#e8ecff',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: '1px solid var(--border-primary)',
      }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>
            📊 Rapport d'Import
          </h2>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            {report.source} • Format {report.format.toUpperCase()} • {new Date(report.timestamp).toLocaleString()}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}
        >
          ×
        </button>
      </div>
      
      {/* Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 12,
        marginBottom: 20,
      }}>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 8,
          padding: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: 'var(--text-primary)' }}>
            {report.stats.total}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total</div>
        </div>
        
        <div style={{
          background: 'rgba(72, 187, 120, 0.1)',
          border: '1px solid rgba(72, 187, 120, 0.3)',
          borderRadius: 8,
          padding: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#48bb78' }}>
            {report.stats.imported}
          </div>
          <div style={{ fontSize: 11, color: '#48bb78' }}>Importés</div>
        </div>
        
        <div style={{
          background: 'rgba(246, 173, 85, 0.1)',
          border: '1px solid rgba(246, 173, 85, 0.3)',
          borderRadius: 8,
          padding: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#f6ad55' }}>
            {report.stats.converted}
          </div>
          <div style={{ fontSize: 11, color: '#f6ad55' }}>Convertis</div>
        </div>
        
        <div style={{
          background: 'rgba(160, 174, 192, 0.1)',
          border: '1px solid rgba(160, 174, 192, 0.3)',
          borderRadius: 8,
          padding: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#a0aec0' }}>
            {report.stats.skipped}
          </div>
          <div style={{ fontSize: 11, color: '#a0aec0' }}>Ignorés</div>
        </div>
        
        <div style={{
          background: 'rgba(252, 129, 129, 0.1)',
          border: '1px solid rgba(252, 129, 129, 0.3)',
          borderRadius: 8,
          padding: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#fc8181' }}>
            {report.stats.errors}
          </div>
          <div style={{ fontSize: 11, color: '#fc8181' }}>Erreurs</div>
        </div>
      </div>
      
      {/* Success Rate */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: 12,
          color: 'var(--text-muted)',
          marginBottom: 4,
        }}>
          <span>Taux de Succès</span>
          <span style={{ 
            color: successRate >= 80 ? '#48bb78' : successRate >= 50 ? '#f6ad55' : '#fc8181',
            fontWeight: 'bold',
          }}>
            {successRate}%
          </span>
        </div>
        <div style={{
          height: 8,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 4,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${successRate}%`,
            height: '100%',
            background: `linear-gradient(90deg, 
              ${successRate >= 80 ? '#48bb78' : successRate >= 50 ? '#f6ad55' : '#fc8181'} 0%, 
              ${successRate >= 80 ? '#38b2ac' : successRate >= 50 ? '#ed8936' : '#e53e3e'} 100%)`,
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>
      
      {/* Details */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 8,
        padding: 12,
      }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
          DÉTAILS DE L'IMPORT
        </div>
        
        {report.details.map((detail, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'start',
              gap: 12,
              padding: '8px 0',
              borderBottom: i < report.details.length - 1 ? '1px solid var(--border-primary)' : 'none',
            }}
          >
            <span style={{ fontSize: 16 }}>{getStatusIcon(detail.status)}</span>
            
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 4,
              }}>
                <span style={{ 
                  fontWeight: 600, 
                  color: getStatusColor(detail.status),
                  fontSize: 13,
                }}>
                  {detail.field}
                </span>
                <span style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  background: `${getStatusColor(detail.status)}20`,
                  borderRadius: 4,
                  color: getStatusColor(detail.status),
                }}>
                  {detail.status}
                </span>
              </div>
              
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {detail.message}
              </div>
              
              {(detail.originalValue !== undefined || detail.convertedValue !== undefined) && (
                <div style={{
                  marginTop: 4,
                  padding: 6,
                  background: 'var(--bg-panel)',
                  borderRadius: 4,
                  fontSize: 11,
                  fontFamily: 'monospace',
                }}>
                  {detail.originalValue !== undefined && (
                    <div style={{ color: 'var(--text-muted)' }}>
                      Original: {JSON.stringify(detail.originalValue, null, 2)}
                    </div>
                  )}
                  {detail.convertedValue !== undefined && (
                    <div style={{ color: '#48bb78', marginTop: 4 }}>
                      Converti: {JSON.stringify(detail.convertedValue, null, 2)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginTop: 20,
        paddingTop: 16,
        borderTop: '1px solid var(--border-primary)',
      }}>
        <button
          onClick={() => {
            // Copier le rapport dans le presse-papier
            const text = JSON.stringify(report, null, 2);
            navigator.clipboard.writeText(text);
            alert('Rapport copié dans le presse-papier !');
          }}
          style={{
            flex: 1,
            padding: '10px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 6,
            color: 'white',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          📋 Copier Rapport
        </button>
        
        <button
          onClick={() => {
            // Télécharger le rapport
            const text = JSON.stringify(report, null, 2);
            const blob = new Blob([text], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `import-report-${Date.now()}.json`;
            a.click();
          }}
          style={{
            flex: 1,
            padding: '10px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 6,
            color: 'white',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          💾 Télécharger
        </button>
        
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: '10px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: 6,
            color: 'white',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 'bold',
          }}
        >
          ✅ Fermer
        </button>
      </div>
    </div>
  );
}

/**
 * Hook pour générer un rapport d'import
 */
export function useImportReport() {
  const [report, setReport] = React.useState<ImportReportData | null>(null);
  
  const generateReport = (
    source: string,
    format: 'hsc' | 'json' | 'v1' | 'v2',
    originalData: any,
    importedData: any
  ): ImportReportData => {
    const details: ImportReportData['details'] = [];
    let imported = 0;
    let skipped = 0;
    let converted = 0;
    let errors = 0;
    
    // Analyser les différences
    const analyzeField = (field: string, original: any, imported: any) => {
      if (original === undefined && imported === undefined) {
        return;
      }
      
      if (original === undefined) {
        details.push({
          field,
          status: 'success',
          message: 'Nouveau champ ajouté',
          convertedValue: imported,
        });
        imported++;
      } else if (imported === undefined) {
        details.push({
          field,
          status: 'skipped',
          message: 'Champ non supporté dans le nouveau format',
          originalValue: original,
        });
        skipped++;
      } else if (JSON.stringify(original) !== JSON.stringify(imported)) {
        details.push({
          field,
          status: 'warning',
          message: 'Valeur convertie',
          originalValue: original,
          convertedValue: imported,
        });
        converted++;
      } else {
        details.push({
          field,
          status: 'success',
          message: 'Importé sans modification',
          originalValue: original,
        });
        imported++;
      }
    };
    
    // Parcourir tous les champs
    const allFields = new Set([
      ...Object.keys(originalData || {}),
      ...Object.keys(importedData || {}),
    ]);
    
    allFields.forEach(field => {
      analyzeField(field, originalData?.[field], importedData?.[field]);
    });
    
    const newReport: ImportReportData = {
      source,
      format,
      timestamp: new Date(),
      stats: {
        total: details.length,
        imported,
        skipped,
        converted,
        errors,
      },
      details,
    };
    
    setReport(newReport);
    return newReport;
  };
  
  return {
    report,
    generateReport,
    clearReport: () => setReport(null),
  };
}
