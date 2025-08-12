import fs from 'fs-extra';
import path from 'path';

async function main() {
  const repoRoot = path.resolve(__dirname, '../../..');
  const outDir = path.join(repoRoot, 'tools/site_map/out');
  const graphPath = path.join(outDir, 'graph.json');
  const { components } = await fs.readJson(graphPath).catch(() => ({ components: [] }));

  const urls = new Set<string>();
  // Heuristic: test HTML files and SPA routes
  for (const comp of components as string[][]) {
    for (const node of comp) {
      if (node.endsWith('.html')) {
        const rel = path.relative(repoRoot, node).replace(/\\/g, '/');
        urls.add('/' + rel);
      }
      if (node.includes('/apps/magic-stack-unified/src/App.tsx')) {
        urls.add('http://localhost:5175/game');
        urls.add('http://localhost:5175/unified');
        urls.add('http://localhost:5175/start-tcg');
      }
    }
  }

  const spec = `import { test, expect } from '@playwright/test';\n\n${Array.from(urls).map(u => `test('open ${u}', async ({ page }) => {\n  await page.goto('${u}', { waitUntil: 'domcontentloaded' });\n  await page.screenshot({ path: 'screenshots_${u.replace(/\\W+/g, '_')}.png', fullPage: true });\n  expect(await page.locator('body').count()).toBeGreaterThan(0);\n});`).join('\n\n')}\n`;

  const target = path.join(repoRoot, 'tests/e2e/specs/generated_from_graph.spec.ts');
  await fs.writeFile(target, spec, 'utf8');
  console.log('✅ Generated Playwright spec:', path.relative(repoRoot, target));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


