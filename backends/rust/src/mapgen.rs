//! Simple contiguous biome map generator with terrain costs and causal fog levels

use rand::Rng;
use rand::SeedableRng;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Biome { Sea, Mountain, Forest, Plain }

#[derive(Clone, Debug)]
pub struct GeneratedMap {
    pub width: usize,
    pub height: usize,
    pub obstacles: Vec<Vec<u8>>,     // 0 free, 1 blocked
    pub terrain: Vec<Vec<f64>>,      // relative cost
    pub causal_c: Vec<Vec<f64>>,     // [0,1] stability from 7 fog levels
    pub biomes: Vec<Vec<Biome>>,     // label per cell
}

#[derive(Clone, Debug)]
pub struct MapGenParams {
    pub width: usize,
    pub height: usize,
    pub seed: u64,
    pub sea_ratio: f64,       // 0..1
    pub mountain_ratio: f64,  // 0..1
    pub forest_ratio: f64,    // 0..1
}

impl Default for MapGenParams {
    fn default() -> Self {
        Self { width: 64, height: 48, seed: 1337, sea_ratio: 0.1, mountain_ratio: 0.15, forest_ratio: 0.25 }
    }
}

/// Generate contiguous zones via seeded region growth + smoothing
pub fn generate_map(params: &MapGenParams) -> GeneratedMap {
    let mut rng = rand_chacha::ChaCha8Rng::seed_from_u64(params.seed);
    let (w, h) = (params.width, params.height);

    // 1) Seed centers for each biome based on ratios
    let total_cells = (w * h) as f64;
    let sea_centers = ((params.sea_ratio * total_cells) / 400.0).max(1.0) as usize;      // ~20x20 blobs
    let mountain_centers = ((params.mountain_ratio * total_cells) / 225.0).max(1.0) as usize; // ~15x15
    let forest_centers = ((params.forest_ratio * total_cells) / 225.0).max(1.0) as usize;

    let mut biome = vec![vec![Biome::Plain; w]; h];

    // Place centers with simple circular growth
    let mut place_blob = |b: Biome, radius_range: (i32, i32), count: usize| {
        for _ in 0..count {
            let cx = rng.gen_range(0..w as i32);
            let cy = rng.gen_range(0..h as i32);
            let r = rng.gen_range(radius_range.0..=radius_range.1);
            for y in (cy - r).max(0)..=(cy + r).min(h as i32 - 1) {
                for x in (cx - r).max(0)..=(cx + r).min(w as i32 - 1) {
                    let dx = x - cx; let dy = y - cy;
                    if dx*dx + dy*dy <= r*r {
                        biome[y as usize][x as usize] = b;
                    }
                }
            }
        }
    };

    place_blob(Biome::Sea, (6, 14), sea_centers);
    place_blob(Biome::Mountain, (4, 10), mountain_centers);
    place_blob(Biome::Forest, (5, 12), forest_centers);

    // 2) Smooth with majority filter to make contiguous patches
    for _ in 0..2 {
        let mut next = biome.clone();
        for y in 0..h { for x in 0..w {
            let mut counts = [0usize; 4];
            for dy in -1i32..=1 { for dx in -1i32..=1 {
                let nx = x as i32 + dx; let ny = y as i32 + dy;
                if nx>=0 && ny>=0 && nx < w as i32 && ny < h as i32 {
                    match biome[ny as usize][nx as usize] {
                        Biome::Sea => counts[0]+=1,
                        Biome::Mountain => counts[1]+=1,
                        Biome::Forest => counts[2]+=1,
                        Biome::Plain => counts[3]+=1,
                    }
                }
            }}
            let (idx, _) = counts.iter().enumerate().max_by_key(|(_,v)| *v).unwrap();
            next[y][x] = match idx { 0=>Biome::Sea, 1=>Biome::Mountain, 2=>Biome::Forest, _=>Biome::Plain };
        }}
        biome = next;
    }

    // 3) Derive obstacles, terrain cost, and 7-level fog mapped to C
    let mut obstacles = vec![vec![0u8; w]; h];
    let mut terrain = vec![vec![0.0f64; w]; h];
    let mut causal_c = vec![vec![1.0f64; w]; h];

    for y in 0..h { for x in 0..w {
        match biome[y][x] {
            Biome::Sea => { obstacles[y][x] = 1; terrain[y][x] = 5.0; }, // mostly blocked
            Biome::Mountain => { terrain[y][x] = 3.0; },
            Biome::Forest => { terrain[y][x] = 1.5; },
            Biome::Plain => { terrain[y][x] = 0.2; },
        }
        // Fog level 0..6 → map to C in [0.2..1.0]
        let fog_level = rng.gen_range(0..=6) as f64;
        let c = 0.2 + (fog_level/6.0) * 0.8;
        causal_c[y][x] = c;
    }}

    GeneratedMap { width: w, height: h, obstacles, terrain, causal_c, biomes: biome }
}


