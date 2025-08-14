import { coreStore, CoreEvent } from '../world6dCore';

export async function replayJsonl(url: string): Promise<void> {
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  for (const line of lines) {
    try {
      const obj = JSON.parse(line);
      coreStore.replay([obj as any as CoreEvent]);
    } catch {
      // ignore bad line
    }
  }
}
