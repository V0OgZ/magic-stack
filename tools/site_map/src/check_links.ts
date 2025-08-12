import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from 'cheerio';

function collect(file: string, html: string): { hrefs: string[]; srcs: string[] } {
  const $ = load(html);
  const hrefs = $('a[href]').map((_, el) => $(el).attr('href') || '').get();
  const srcs = $('img[src]').map((_, el) => $(el).attr('src') || '').get();
  return { hrefs, srcs };
}

async function main() {
  const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(DIRNAME, '../../..');
  const htmlFiles = await fg(['**/*.html'], { cwd: repoRoot, ignore: ['**/node_modules/**', '**/dist/**'] });
  const missing: Array<{ file: string; target: string }> = [];

  for (const rel of htmlFiles) {
    const abs = path.join(repoRoot, rel);
    const html = await fs.readFile(abs, 'utf8');
    const { hrefs, srcs } = collect(abs, html);
    const links = [...hrefs, ...srcs].filter(x => x && !x.startsWith('http'));
    for (const link of links) {
      const target = path.normalize(path.join(path.dirname(abs), link));
      if (!await fs.pathExists(target)) {
        missing.push({ file: abs, target });
      }
    }
  }

  await fs.ensureDir(path.join(repoRoot, 'tools/site_map/out'));
  await fs.writeJson(path.join(repoRoot, 'tools/site_map/out/missing.json'), missing, { spaces: 2 });
  console.log(`🔎 Broken links: ${missing.length}`);
  if (missing.length) {
    console.log('See tools/site_map/out/missing.json');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


