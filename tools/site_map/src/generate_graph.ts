import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import { load } from 'cheerio';

type NodeId = string;

type Graph = {
  nodes: Record<NodeId, { file: string; type: 'html' | 'tsx' | 'jsx' | 'other' }>,
  edges: Array<{ from: NodeId; to: NodeId; label?: string }>,
};

function toId(p: string): NodeId {
  return p.replace(/[^a-zA-Z0-9_\-/\.]/g, '_');
}

function extractHtmlLinks(file: string, html: string): string[] {
  const $ = load(html);
  const links = new Set<string>();
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (!href) return;
    if (href.startsWith('http')) return;
    links.add(path.normalize(path.join(path.dirname(file), href)));
  });
  $('img[src]').each((_, el) => {
    const src = $(el).attr('src') || '';
    if (!src) return;
    if (src.startsWith('http')) return;
    links.add(path.normalize(path.join(path.dirname(file), src)));
  });
  return Array.from(links);
}

function extractTsxRoutes(file: string, code: string): string[] {
  const routes: string[] = [];
  const routeRegex = /<Route\s+path=\"([^\"]+)\"/g;
  let m: RegExpExecArray | null;
  while ((m = routeRegex.exec(code))) {
    routes.push(m[1]);
  }
  return routes;
}

async function main() {
  const repoRoot = path.resolve(__dirname, '../../..');
  const htmlFiles = await fg(['**/*.html'], { cwd: repoRoot, ignore: ['**/node_modules/**', '**/dist/**'] });
  const tsxFiles = await fg(['**/*.tsx', '**/*.jsx'], { cwd: repoRoot, ignore: ['**/node_modules/**', '**/dist/**'] });

  const graph: Graph = { nodes: {}, edges: [] };

  for (const rel of htmlFiles) {
    const abs = path.join(repoRoot, rel);
    const id = toId(abs);
    graph.nodes[id] = { file: abs, type: 'html' };
    const html = await fs.readFile(abs, 'utf8');
    const links = extractHtmlLinks(abs, html);
    for (const l of links) {
      const lid = toId(l);
      if (!graph.nodes[lid]) graph.nodes[lid] = { file: l, type: l.endsWith('.html') ? 'html' : 'other' };
      graph.edges.push({ from: id, to: lid });
    }
  }

  for (const rel of tsxFiles) {
    const abs = path.join(repoRoot, rel);
    const id = toId(abs);
    graph.nodes[id] = { file: abs, type: rel.endsWith('.tsx') ? 'tsx' : 'jsx' };
    const code = await fs.readFile(abs, 'utf8');
    const routes = extractTsxRoutes(abs, code);
    for (const r of routes) {
      graph.edges.push({ from: id, to: r, label: 'route' });
    }
  }

  // Islands detection
  const ids = Object.keys(graph.nodes);
  const adj: Record<NodeId, NodeId[]> = {};
  ids.forEach(i => adj[i] = []);
  for (const e of graph.edges) {
    if (adj[e.from]) adj[e.from].push(e.to as NodeId);
  }
  const visited = new Set<NodeId>();
  const components: NodeId[][] = [];
  function dfs(u: NodeId, comp: NodeId[]) {
    visited.add(u);
    comp.push(u);
    for (const v of adj[u] || []) {
      if (!visited.has(v)) dfs(v, comp);
    }
  }
  for (const i of ids) {
    if (!visited.has(i)) {
      const comp: NodeId[] = [];
      dfs(i, comp);
      components.push(comp);
    }
  }

  await fs.ensureDir(path.join(repoRoot, 'tools/site_map/out'));
  await fs.writeJson(path.join(repoRoot, 'tools/site_map/out/graph.json'), { graph, components }, { spaces: 2 });

  // Mermaid
  let mermaid = 'graph TD\n';
  for (const id of Object.keys(graph.nodes)) {
    const n = graph.nodes[id];
    const label = path.relative(repoRoot, n.file);
    mermaid += `${JSON.stringify(id)}["${label}"]\n`;
  }
  for (const e of graph.edges) {
    const l = e.label ? `|${e.label}|` : '';
    mermaid += `${JSON.stringify(e.from)}-->${l}${JSON.stringify(e.to)}\n`;
  }
  await fs.writeFile(path.join(repoRoot, 'tools/site_map/out/graph.mmd'), mermaid, 'utf8');

  console.log('✅ Graph generated: tools/site_map/out/{graph.json, graph.mmd}');
  console.log(`Components: ${components.length}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


