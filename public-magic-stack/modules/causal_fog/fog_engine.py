"""
🌫️ Causal Fog Engine
Implementation of the "unobserved actions are mutable" principle
"""

from datetime import datetime
from typing import Dict, Any, List, Set, Optional

class CausalFogEngine:
    """
    Manages causal fog - actions remain mutable until observed
    Based on quantum principles: observation collapses possibilities
    """
    
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or {}
        self.unobserved_actions = []
        self.locked_events = set()
        self.observation_log = []
        self.temporal_layers = {}
        self.enabled = False
        self.max_unobserved = self.config.get('max_unobserved_actions', 50)
    
    def enable(self, entity_id: str) -> bool:
        """Enable causal fog for a specific entity"""
        self.enabled = True
        self.observation_log.append({
            'type': 'fog_enabled',
            'entity': entity_id,
            'timestamp': datetime.now().isoformat()
        })
        return True
    
    def record_action(self, action: Dict[str, Any]) -> str:
        """
        Record an unobserved action
        
        Args:
            action: Dictionary containing action details
            
        Returns:
            str: Action ID for future reference
        """
        if not self.enabled:
            return None
        
        # Generate unique action ID
        action_id = f"action_{len(self.unobserved_actions)}_{datetime.now().timestamp()}"
        
        # Add metadata
        action['id'] = action_id
        action['timestamp'] = datetime.now().isoformat()
        action['observed'] = False
        action['mutable'] = True
        
        # Store action
        self.unobserved_actions.append(action)
        
        # Cleanup if too many unobserved actions
        if len(self.unobserved_actions) > self.max_unobserved:
            self._cleanup_old_actions()
        
        return action_id
    
    def observe_action(self, action_id: str, observer: str) -> Dict[str, Any]:
        """
        Observe an action, making it immutable
        
        Args:
            action_id: ID of the action to observe
            observer: Entity performing the observation
            
        Returns:
            dict: Observation result
        """
        # Find the action
        action = None
        for a in self.unobserved_actions:
            if a.get('id') == action_id:
                action = a
                break
        
        if not action:
            return {
                'success': False,
                'error': 'Action not found',
                'action_id': action_id
            }
        
        if not action.get('mutable', True):
            return {
                'success': False,
                'error': 'Action already observed',
                'action_id': action_id
            }
        
        # Collapse the action
        action['observed'] = True
        action['mutable'] = False
        action['observer'] = observer
        action['observation_time'] = datetime.now().isoformat()
        
        # Lock the event
        self.locked_events.add(action_id)
        
        # Log observation
        self.observation_log.append({
            'type': 'action_observed',
            'action_id': action_id,
            'observer': observer,
            'timestamp': datetime.now().isoformat()
        })
        
        return {
            'success': True,
            'action_id': action_id,
            'action': action,
            'message': 'Action observed and locked'
        }
    
    def can_modify(self, action_id: str) -> bool:
        """Check if an action can be modified"""
        if action_id in self.locked_events:
            return False
        
        for action in self.unobserved_actions:
            if action.get('id') == action_id:
                return action.get('mutable', True)
        
        return False
    
    def modify_action(self, action_id: str, modifications: Dict[str, Any]) -> Dict[str, Any]:
        """
        Modify an unobserved action
        
        Args:
            action_id: ID of action to modify
            modifications: Changes to apply
            
        Returns:
            dict: Modification result
        """
        if not self.can_modify(action_id):
            return {
                'success': False,
                'error': 'Action cannot be modified (already observed)'
            }
        
        # Find and modify the action
        for action in self.unobserved_actions:
            if action.get('id') == action_id:
                # Apply modifications
                for key, value in modifications.items():
                    if key not in ['id', 'observed', 'mutable']:
                        action[key] = value
                
                action['last_modified'] = datetime.now().isoformat()
                
                return {
                    'success': True,
                    'action_id': action_id,
                    'modified_action': action
                }
        
        return {
            'success': False,
            'error': 'Action not found'
        }
    
    def get_fog_status(self) -> Dict[str, Any]:
        """Get current status of the causal fog"""
        unobserved_count = sum(1 for a in self.unobserved_actions if a.get('mutable', True))
        observed_count = len(self.locked_events)
        
        return {
            'enabled': self.enabled,
            'unobserved_actions': unobserved_count,
            'observed_actions': observed_count,
            'total_actions': len(self.unobserved_actions),
            'observation_log_size': len(self.observation_log),
            'temporal_layers': len(self.temporal_layers)
        }
    
    def create_temporal_layer(self, layer_id: str, base_state: Dict[str, Any] = None) -> bool:
        """Create a new temporal layer for branching timelines"""
        if layer_id in self.temporal_layers:
            return False
        
        self.temporal_layers[layer_id] = {
            'created': datetime.now().isoformat(),
            'base_state': base_state or {},
            'actions': []
        }
        
        return True
    
    def _cleanup_old_actions(self):
        """Remove oldest observed actions to save memory"""
        # Keep only recent unobserved actions and a few observed ones
        observed = [a for a in self.unobserved_actions if not a.get('mutable', True)]
        unobserved = [a for a in self.unobserved_actions if a.get('mutable', True)]
        
        # Keep all unobserved and only recent observed
        if len(observed) > 10:
            observed = observed[-10:]
        
        self.unobserved_actions = unobserved + observed