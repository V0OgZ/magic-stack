import React from 'react';

type HexGridProps = {
  cols?: number;
  rows?: number;
  size?: number; // hex size in px
  onSelect?: (x: number, y: number) => void;
};

export function HexGrid({ cols = 20, rows = 20, size = 32, onSelect }: HexGridProps): React.ReactElement {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [scale, setScale] = React.useState(1);
  const [selected, setSelected] = React.useState<{ x: number; y: number } | null>(null);

  const hexWidth = size * 2;
  const hexHeight = Math.sqrt(3) * size;

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const factor = delta > 0 ? 1.05 : 0.95;
    setScale((s) => Math.min(2, Math.max(0.5, s * factor)));
  };

  // Pan
  React.useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startOffset = offset;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startOffset = offset;
      (e.target as Element).setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setOffset({ x: startOffset.x + dx, y: startOffset.y + dy });
    };
    const onUp = () => {
      dragging = false;
    };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset.x, offset.y]);

  const hexes: Array<{ x: number; y: number; left: number; top: number }> = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const left = x * (hexWidth * 0.75);
      const top = y * hexHeight + (x % 2 ? hexHeight / 2 : 0);
      hexes.push({ x, y, left, top });
    }
  }

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 120px)', position: 'relative', overflow: 'hidden', background: '#0a0e27' }} onWheel={onWheel}>
      <div
        ref={gridRef}
        style={{
          position: 'absolute',
          left: `calc(50% + ${offset.x}px)`,
          top: `calc(50% + ${offset.y}px)`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center',
          width: cols * hexWidth,
          height: rows * hexHeight + hexHeight / 2,
        }}
      >
        {hexes.map((h) => (
          <div
            key={`${h.x}-${h.y}`}
            onClick={() => {
              setSelected({ x: h.x, y: h.y });
              onSelect?.(h.x, h.y);
            }}
            style={{
              position: 'absolute',
              left: h.left,
              top: h.top,
              width: hexWidth,
              height: hexHeight,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'rgba(255,255,255,0.06)',
              border: selected?.x === h.x && selected?.y === h.y ? '2px solid gold' : '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e8ecff',
              fontSize: 12,
              userSelect: 'none',
              cursor: 'pointer',
            }}
          >
            {h.x},{h.y}
          </div>
        ))}
      </div>
    </div>
  );
}


