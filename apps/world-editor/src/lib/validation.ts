/**
 * 🔍 Validation Helper - Messages inline avec Zod
 * Inspiré par les interfaces magiques existantes
 */

import { z } from 'zod';

export interface ValidationResult {
  success: boolean;
  error?: string;
  field?: string;
}

/**
 * Hook pour valider un champ avec message inline
 */
export function useFieldValidation<T>(
  schema: z.ZodSchema<T>,
  value: T,
  fieldName: string
): ValidationResult {
  try {
    schema.parse(value);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
        field: fieldName,
      };
    }
    return {
      success: false,
      error: 'Erreur de validation',
      field: fieldName,
    };
  }
}

/**
 * Schémas de validation courants
 */
export const ValidationSchemas = {
  // Nom de scénario
  scenarioName: z.string()
    .min(3, '🔸 Le nom doit faire au moins 3 caractères')
    .max(50, '🔸 Le nom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-Z0-9\s\-_àâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ]+$/, 
      '🔸 Caractères invalides (lettres, chiffres, espaces, tirets uniquement)'),
  
  // Description
  description: z.string()
    .max(500, '🔸 La description ne peut pas dépasser 500 caractères')
    .optional(),
  
  // Taille de carte
  mapSize: z.number()
    .int('🔸 La taille doit être un nombre entier')
    .min(10, '🔸 Taille minimum: 10x10')
    .max(200, '🔸 Taille maximum: 200x200'),
  
  // Jour d'événement
  eventDay: z.number()
    .int('🔸 Le jour doit être un nombre entier')
    .min(0, '🔸 Le jour ne peut pas être négatif')
    .max(365, '🔸 Maximum 365 jours'),
  
  // Nom d'événement
  eventName: z.string()
    .min(3, '🔸 Le nom doit faire au moins 3 caractères')
    .max(100, '🔸 Le nom ne peut pas dépasser 100 caractères'),
  
  // Ressources
  resourceAmount: z.number()
    .int('🔸 Doit être un nombre entier')
    .min(0, '🔸 Ne peut pas être négatif')
    .max(999999, '🔸 Valeur trop élevée'),
  
  // Coordonnées hexagonales
  hexCoordinate: z.number()
    .int('🔸 Coordonnée invalide')
    .min(0, '🔸 Coordonnée négative interdite'),
  
  // Difficulté
  difficulty: z.enum(['easy', 'normal', 'hard', 'nightmare'], {
    errorMap: () => ({ message: '🔸 Difficulté invalide' })
  }),
  
  // Mode de jeu
  gameMode: z.enum(['campaign', 'skirmish', 'tutorial', 'sandbox'], {
    errorMap: () => ({ message: '🔸 Mode de jeu invalide' })
  }),
  
  // Formule magique (inspiré de visual_magic.html)
  magicFormula: z.string()
    .regex(/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/, 
      '✨ Format: "Ignis Magnus" (mots capitalisés)')
    .min(5, '✨ Formule trop courte')
    .max(50, '✨ Formule trop longue'),
  
  // Paramètres temporels V2
  temporalDrift: z.number()
    .min(-10, '⚡ Dérive temporelle excessive négative')
    .max(10, '⚡ Dérive temporelle excessive positive'),
  
  temporalDebt: z.number()
    .min(0, '💸 La dette ne peut pas être négative')
    .max(100, '💸 Dette temporelle critique!'),
  
  // Énergie complexe
  energyAmplitude: z.number()
    .min(0, '⚡ L\'amplitude doit être positive')
    .max(100, '⚡ Amplitude maximale dépassée'),
  
  energyPhase: z.number()
    .min(0, '🌀 Phase minimum: 0')
    .max(2 * Math.PI, `🌀 Phase maximum: ${(2 * Math.PI).toFixed(2)}`),
};

/**
 * Composant React pour afficher les erreurs inline
 */
export function ValidationError({ error, show = true }: { 
  error?: string; 
  show?: boolean;
}): React.ReactElement | null {
  if (!show || !error) return null;
  
  return (
    <div style={{
      marginTop: 4,
      padding: '4px 8px',
      background: 'rgba(255, 100, 100, 0.1)',
      border: '1px solid rgba(255, 100, 100, 0.3)',
      borderRadius: 4,
      fontSize: 12,
      color: '#ff9999',
      animation: 'slideIn 0.2s ease-out',
    }}>
      {error}
    </div>
  );
}

/**
 * Hook pour valider un formulaire complet
 */
export function useFormValidation<T extends Record<string, any>>(
  schemas: Record<keyof T, z.ZodSchema>
) {
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});
  
  const validate = (field: keyof T, value: any) => {
    const schema = schemas[field];
    if (!schema) return true;
    
    try {
      schema.parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
        return false;
      }
      return false;
    }
  };
  
  const validateAll = (values: T): boolean => {
    let isValid = true;
    const newErrors: Partial<Record<keyof T, string>> = {};
    
    for (const field in schemas) {
      try {
        schemas[field].parse(values[field]);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors[field] = error.errors[0].message;
          isValid = false;
        }
      }
    }
    
    setErrors(newErrors);
    setTouched(Object.keys(schemas).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };
  
  const touch = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  const reset = () => {
    setErrors({});
    setTouched({});
  };
  
  return {
    errors,
    touched,
    validate,
    validateAll,
    touch,
    reset,
    getError: (field: keyof T) => touched[field] ? errors[field] : undefined,
  };
}

// CSS pour l'animation
if (typeof document !== 'undefined' && !document.getElementById('validation-styles')) {
  const style = document.createElement('style');
  style.id = 'validation-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .field-valid {
      border-color: #48bb78 !important;
    }
    
    .field-invalid {
      border-color: #fc8181 !important;
      animation: shake 0.3s;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
}

// Export pour React
import React from 'react';
export default { ValidationSchemas, ValidationError, useFormValidation, useFieldValidation };
