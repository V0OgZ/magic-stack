import React from 'react';

type ClippyProps = { messages?: string[] };

export function Clippy({ messages = [] }: ClippyProps): React.ReactElement {
  const tips = React.useMemo(() => (
    messages.length ? messages : [
      'Bienvenue! Ajoute une région avec le panneau de gauche',
      'Pince pour zoomer, glisse pour te déplacer',
      'Export JSON conforme au format officiel',
      'Hexagon is the bestagon — la carte adore les hexagones!',
      "Vincent (Chef Créateur): 'Les bugs n’existent pas, seulement des quêtes non documentées.'",
    ]
  ), [messages]);

  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % tips.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 3500);
    }, 16000);
    return () => clearInterval(id);
  }, [tips.length]);

  return (
    <>
      <div style={{ position: 'fixed', bottom: 20, right: 20, fontSize: 56, cursor: 'pointer', zIndex: 2000 }} onClick={() => { setVisible(true); setTimeout(() => setVisible(false), 3500); }}>📎</div>
      <div style={{ position: 'fixed', bottom: 100, right: 20, background: 'linear-gradient(135deg, #fff, #f0f0f0)', color: '#333', padding: '10px 14px', borderRadius: 14, border: '2px solid #333', maxWidth: 320, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', display: visible ? 'block' : 'none', zIndex: 2000 }}>{tips[index]}</div>
    </>
  );
}


