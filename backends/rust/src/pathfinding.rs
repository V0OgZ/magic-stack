//! Simple 2D A* pathfinding for Agents planning
//!
//! Grid convention: 0 = free, 1 = obstacle. Uses 4-directional moves.

use std::cmp::Ordering;
use std::collections::{BinaryHeap, HashSet};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub struct Cell {
    pub x: i32,
    pub y: i32,
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct PathfindingOptions {
    pub allow_diagonal: bool,
}

impl Default for PathfindingOptions {
    fn default() -> Self {
        PathfindingOptions { allow_diagonal: false }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Topology {
    Plane,
    Torus,
    Mobius,
    Klein,
}

impl Topology {
    pub fn from_str(name: &str) -> Self {
        match name.to_lowercase().as_str() {
            "torus" | "tore" => Topology::Torus,
            "mobius" | "möbius" | "moebius" => Topology::Mobius,
            "klein" => Topology::Klein,
            _ => Topology::Plane,
        }
    }
}

// Keep a simple neighbors helper for classic A* (plane topology)
fn neighbors(c: Cell, allow_diagonal: bool) -> Vec<Cell> {
    let mut result = vec![
        Cell { x: c.x + 1, y: c.y },
        Cell { x: c.x - 1, y: c.y },
        Cell { x: c.x, y: c.y + 1 },
        Cell { x: c.x, y: c.y - 1 },
    ];
    if allow_diagonal {
        result.extend_from_slice(&[
            Cell { x: c.x + 1, y: c.y + 1 },
            Cell { x: c.x + 1, y: c.y - 1 },
            Cell { x: c.x - 1, y: c.y + 1 },
            Cell { x: c.x - 1, y: c.y - 1 },
        ]);
    }
    result
}

#[derive(Clone, Eq, PartialEq)]
struct Node {
    cell: Cell,
    f_score: i32,
    g_score: i32,
}

impl Ord for Node {
    fn cmp(&self, other: &Self) -> Ordering {
        // Reverse for min-heap behavior in BinaryHeap (which is max-heap)
        other
            .f_score
            .cmp(&self.f_score)
            .then_with(|| other.g_score.cmp(&self.g_score))
    }
}

impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

fn heuristic(a: Cell, b: Cell, allow_diagonal: bool) -> i32 {
    let dx = (a.x - b.x).abs();
    let dy = (a.y - b.y).abs();
    if allow_diagonal {
        // Chebyshev distance for 8-neighbors
        dx.max(dy)
    } else {
        // Manhattan distance for 4-neighbors
        dx + dy
    }
}

fn in_bounds(grid: &[Vec<u8>], c: Cell) -> bool {
    if c.y < 0 || c.x < 0 {
        return false;
    }
    let h = grid.len() as i32;
    if h == 0 { return false; }
    let w = grid[0].len() as i32;
    c.y < h && c.x < w
}

fn is_blocked(grid: &[Vec<u8>], c: Cell) -> bool {
    grid[c.y as usize][c.x as usize] != 0
}

fn neighbors_topology(c: Cell, allow_diagonal: bool, width: i32, height: i32, topology: Topology) -> Vec<Cell> {
    let mut base = vec![
        Cell { x: c.x + 1, y: c.y },
        Cell { x: c.x - 1, y: c.y },
        Cell { x: c.x, y: c.y + 1 },
        Cell { x: c.x, y: c.y - 1 },
    ];
    if allow_diagonal {
        base.extend_from_slice(&[
            Cell { x: c.x + 1, y: c.y + 1 },
            Cell { x: c.x + 1, y: c.y - 1 },
            Cell { x: c.x - 1, y: c.y + 1 },
            Cell { x: c.x - 1, y: c.y - 1 },
        ]);
    }

    base
        .into_iter()
        .map(|nb| match topology {
            Topology::Plane => nb,
            Topology::Torus => {
                let mut x = nb.x % width; if x < 0 { x += width; }
                let mut y = nb.y % height; if y < 0 { y += height; }
                Cell { x, y }
            }
            Topology::Mobius => {
                let mut x = nb.x;
                let mut y = nb.y;
                if x < 0 { x = width - 1; y = (height - 1) - (y.rem_euclid(height)); }
                else if x >= width { x = 0; y = (height - 1) - (y.rem_euclid(height)); }
                // Vertical borders are not wrapped (will be filtered by in_bounds)
                Cell { x, y }
            }
            Topology::Klein => {
                let mut x = nb.x;
                let mut y = nb.y;
                if x < 0 { x = width - 1; y = (height - 1) - (y.rem_euclid(height)); }
                else if x >= width { x = 0; y = (height - 1) - (y.rem_euclid(height)); }
                if y < 0 { y = height - 1; x = (width - 1) - (x.rem_euclid(width)); }
                else if y >= height { y = 0; x = (width - 1) - (x.rem_euclid(width)); }
                Cell { x, y }
            }
        })
        .collect()
}

/// Find a path using A* from start to goal on a grid. Returns a list of cells including goal.
pub fn a_star_path(
    grid: &[Vec<u8>],
    start: Cell,
    goal: Cell,
    options: Option<PathfindingOptions>,
) -> Option<Vec<Cell>> {
    if grid.is_empty() || grid[0].is_empty() { return None; }
    let opts = options.unwrap_or_default();

    if !in_bounds(grid, start) || !in_bounds(grid, goal) { return None; }
    if is_blocked(grid, start) || is_blocked(grid, goal) { return None; }

    let mut open_set = BinaryHeap::new();
    let mut came_from: std::collections::HashMap<Cell, Cell> = std::collections::HashMap::new();
    let mut g_score: std::collections::HashMap<Cell, i32> = std::collections::HashMap::new();
    let mut closed: HashSet<Cell> = HashSet::new();

    g_score.insert(start, 0);
    open_set.push(Node {
        cell: start,
        g_score: 0,
        f_score: heuristic(start, goal, opts.allow_diagonal),
    });

    while let Some(current) = open_set.pop() {
        if current.cell == goal {
            // reconstruct path
            let mut path = vec![goal];
            let mut cur = goal;
            while let Some(prev) = came_from.get(&cur) {
                path.push(*prev);
                cur = *prev;
            }
            path.reverse();
            return Some(path);
        }

        if closed.contains(&current.cell) { continue; }
        closed.insert(current.cell);

        for nb in neighbors(current.cell, opts.allow_diagonal) {
            if !in_bounds(grid, nb) || is_blocked(grid, nb) { continue; }
            if closed.contains(&nb) { continue; }

            let tentative_g = current.g_score + if opts.allow_diagonal && nb.x != current.cell.x && nb.y != current.cell.y { 14 } else { 10 };
            let g_best = *g_score.get(&nb).unwrap_or(&i32::MAX);
            if tentative_g < g_best {
                came_from.insert(nb, current.cell);
                g_score.insert(nb, tentative_g);
                let h = heuristic(nb, goal, opts.allow_diagonal) * 10;
                open_set.push(Node { cell: nb, g_score: tentative_g, f_score: tentative_g + h });
            }
        }
    }

    None
}

/// Weighted A* considering terrain costs, causal stability and speed.
/// Returns (path, total_cost).
///
/// If `inverted_time` is true, the causal penalty is applied on high stability
/// cells (penalize C), emulant une « marche à rebours » où les zones très stables
/// sont plus coûteuses à traverser. Sinon, on pénalise les faibles C (1-C).
pub fn a_star_path_weighted(
    obstacles: &[Vec<u8>],
    terrain_costs: Option<&[Vec<f64>]>,
    causal_c: Option<&[Vec<f64>]>,
    start: Cell,
    goal: Cell,
    options: Option<PathfindingOptions>,
    speed_multiplier: f64,
    alpha_causal: f64,
    inverted_time: bool,
    topology: Topology,
) -> Option<(Vec<Cell>, f64)> {
    if obstacles.is_empty() || obstacles[0].is_empty() { return None; }
    let opts = options.unwrap_or_default();

    if !in_bounds(obstacles, start) || !in_bounds(obstacles, goal) { return None; }
    if is_blocked(obstacles, start) || is_blocked(obstacles, goal) { return None; }

    let mut open_set = BinaryHeap::new();
    let mut came_from: std::collections::HashMap<Cell, Cell> = std::collections::HashMap::new();
    let mut g_score: std::collections::HashMap<Cell, i32> = std::collections::HashMap::new();
    let mut closed: HashSet<Cell> = HashSet::new();

    g_score.insert(start, 0);
    let h0 = heuristic(start, goal, opts.allow_diagonal) * 10; // scale heuristic
    open_set.push(Node { cell: start, g_score: 0, f_score: h0 });

    // Helper to fetch terrain and causal values
    let get_terrain = |c: Cell| -> f64 {
        terrain_costs
            .and_then(|t| t.get(c.y as usize).and_then(|row| row.get(c.x as usize)))
            .copied()
            .unwrap_or(0.0)
    };
    let get_c = |c: Cell| -> f64 {
        causal_c
            .and_then(|cc| cc.get(c.y as usize).and_then(|row| row.get(c.x as usize)))
            .copied()
            .unwrap_or(1.0)
    };

    let h_i32 = obstacles.len() as i32;
    let w_i32 = if h_i32 > 0 { obstacles[0].len() as i32 } else { 0 };

    while let Some(current) = open_set.pop() {
        if current.cell == goal {
            // reconstruct path
            let mut path = vec![goal];
            let mut cur = goal;
            while let Some(prev) = came_from.get(&cur) {
                path.push(*prev);
                cur = *prev;
            }
            path.reverse();

            // compute total cost as f64 from g_score scale
            let g_end = *g_score.get(&goal).unwrap_or(&0);
            return Some((path, (g_end as f64) / 100.0));
        }

        if closed.contains(&current.cell) { continue; }
        closed.insert(current.cell);

        for nb_raw in neighbors_topology(current.cell, opts.allow_diagonal, w_i32, h_i32, topology) {
            let nb = nb_raw;
            if !in_bounds(obstacles, nb) || is_blocked(obstacles, nb) { continue; }
            if closed.contains(&nb) { continue; }

            // base step: 10 (orthogonal) or 14 (diagonal)
            let step_base = if opts.allow_diagonal && nb.x != current.cell.x && nb.y != current.cell.y { 14 } else { 10 };
            // convert to f64, apply speed
            let mut step_cost_f = (step_base as f64) / speed_multiplier;
            // add terrain cost (weighted similarly to base step units)
            step_cost_f += get_terrain(nb) * 10.0;
            // add causal penalty
            let c_val = get_c(nb).clamp(0.0, 1.0);
            // normal time: penalize low-C (uncertain zones)
            // inverted time: penalize high-C (zones trop stables pour remonter le temps)
            let causal_penalty = if inverted_time { c_val } else { 1.0 - c_val };
            step_cost_f += alpha_causal * causal_penalty * 10.0;

            // scale to i32 for g_score
            let step_cost_i = (step_cost_f * 10.0).round() as i32; // x10 for precision
            let tentative_g = current.g_score + step_cost_i;
            let g_best = *g_score.get(&nb).unwrap_or(&i32::MAX);
            if tentative_g < g_best {
                came_from.insert(nb, current.cell);
                g_score.insert(nb, tentative_g);
                let h = heuristic(nb, goal, opts.allow_diagonal) * 10;
                open_set.push(Node { cell: nb, g_score: tentative_g, f_score: tentative_g + h });
            }
        }
    }

    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_astar_simple_corridor() {
        // 5x3 grid, wall with a gap
        // 0 0 1 0 0
        // 0 0 1 0 0
        // 0 0 0 0 0
        let grid = vec![
            vec![0,0,1,0,0],
            vec![0,0,1,0,0],
            vec![0,0,0,0,0],
        ];
        let start = Cell { x: 0, y: 0 };
        let goal = Cell { x: 4, y: 0 };
        let path = a_star_path(&grid, start, goal, None).expect("path");
        assert!(path.len() > 5);
        assert_eq!(*path.first().unwrap(), start);
        assert_eq!(*path.last().unwrap(), goal);
        // Ensure the path avoids the wall at (2,0) and (2,1)
        assert!(!path.iter().any(|c| (c.x == 2 && (c.y == 0 || c.y == 1))));
    }
}


