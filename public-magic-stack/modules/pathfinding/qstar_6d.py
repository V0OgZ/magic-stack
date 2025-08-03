"""
🌟 Q* 6D Pathfinding Module
Advanced pathfinding in 6-dimensional space for magical entities
"""

class QStar6D:
    """
    Q* (A* variant) pathfinding algorithm for 6-dimensional navigation
    Dimensions: Causal, Temporal, Spatial, Quantum, Identity, Narrative
    """
    
    def __init__(self):
        # 6 Dimensions configuration
        self.dimensions = {
            'D1_CAUSAL': {'weight': 0.20, 'name': 'Causal chains'},
            'D2_TEMPORAL': {'weight': 0.20, 'name': 'Temporal flow'},
            'D3_SPATIAL': {'weight': 0.15, 'name': 'Spatial coordinates'},
            'D4_QUANTUM': {'weight': 0.25, 'name': 'Quantum states'},
            'D5_IDENTITY': {'weight': 0.10, 'name': 'Identity matrix'},
            'D6_NARRATIVE': {'weight': 0.10, 'name': 'Narrative coherence'}
        }
        
        # Object detection probabilities
        self.searchable_objects = {
            'temporal_gear': {
                'D3_SPATIAL': 0.40,
                'D1_CAUSAL': 0.25,
                'default': 0.10
            },
            'time_crystal': {
                'D2_TEMPORAL': 0.60,
                'D4_QUANTUM': 0.30,
                'default': 0.05
            },
            'identity_fragment': {
                'D5_IDENTITY': 0.45,
                'D6_NARRATIVE': 0.25,
                'default': 0.08
            }
        }
    
    def find_path(self, start, goal, search_object=None):
        """
        Find optimal path through 6D space
        
        Args:
            start: Starting node
            goal: Target node
            search_object: Optional object to search for
            
        Returns:
            dict: Path result with route, cost, and found objects
        """
        open_set = {start: True}
        closed_set = set()
        g_score = {start: 0}
        f_score = {start: self._heuristic(start, goal)}
        came_from = {}
        found_objects = []
        
        while open_set:
            current = min(open_set.keys(), key=lambda n: f_score.get(n, float('inf')))
            
            if current == goal:
                path = self._reconstruct_path(came_from, current)
                return {
                    'success': True,
                    'path': path,
                    'cost': g_score[current],
                    'found_objects': found_objects
                }
            
            del open_set[current]
            closed_set.add(current)
            
            # Explore neighbors in all 6 dimensions
            for dim in self.dimensions:
                neighbor = f"{current}_{dim}"
                
                if neighbor in closed_set:
                    continue
                
                # Check for objects
                if search_object and self._check_object(neighbor, search_object):
                    found_objects.append({
                        'object': search_object,
                        'location': neighbor,
                        'dimension': dim
                    })
                
                # Calculate costs
                tentative_g = g_score[current] + self._edge_cost(current, neighbor)
                
                if neighbor not in open_set or tentative_g < g_score.get(neighbor, float('inf')):
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = tentative_g + self._heuristic(neighbor, goal)
                    open_set[neighbor] = True
        
        return {
            'success': False,
            'path': [],
            'cost': float('inf'),
            'found_objects': found_objects
        }
    
    def _heuristic(self, node, goal):
        """Calculate heuristic distance in 6D space"""
        # Simplified heuristic based on node names
        return len(set(node) ^ set(goal)) * 0.5
    
    def _edge_cost(self, from_node, to_node):
        """Calculate cost of moving between nodes"""
        base_cost = 1.0
        
        # Extract dimension from node name
        if '_D' in to_node:
            dim = to_node.split('_D')[-1].split('_')[0]
            if dim == '4':  # Quantum dimension
                return base_cost + 0.5
            elif dim == '2':  # Temporal dimension
                return base_cost + 0.3
            elif dim == '1':  # Causal dimension
                return base_cost + 0.4
        
        return base_cost
    
    def _check_object(self, node, object_type):
        """Check if object exists at node (probabilistic)"""
        import random
        
        if object_type not in self.searchable_objects:
            return False
        
        # Extract dimension from node
        dim = None
        for d in self.dimensions:
            if d in node:
                dim = d
                break
        
        # Get probability
        obj_config = self.searchable_objects[object_type]
        probability = obj_config.get(dim, obj_config.get('default', 0.1))
        
        return random.random() < probability
    
    def _reconstruct_path(self, came_from, current):
        """Reconstruct path from start to goal"""
        path = [current]
        while current in came_from:
            current = came_from[current]
            path.append(current)
        path.reverse()
        return path