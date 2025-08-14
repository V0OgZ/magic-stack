import React from 'react';

export function QuickCastPanel(): React.ReactElement {
	const [formula, setFormula] = React.useState('TEMPUS::FREEZE');
	const [casterClass, setCasterClass] = React.useState<'warrior' | 'mage' | 'rogue' | 'priest' | 'temporal' | 'quantum'>('temporal');
	const [forceMode, setForceMode] = React.useState<'iconic' | 'literary' | 'runic' | 'quantum'>('quantum');
	const [useRealEngine, setUseRealEngine] = React.useState<boolean>(() => {
		try { return localStorage.getItem('useRealEngine') === 'true'; } catch { return false; }
	});

	const [health, setHealth] = React.useState<{rust?: boolean; java?: boolean; vector?: boolean}>({});
	React.useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				// @ts-ignore
				const res = await (window as any).MagicStack?.utils?.healthCheck?.();
				if (mounted && res) setHealth(res);
			} catch {}
		})();
		return () => { mounted = false; };
	}, []);

	const castWarriorCombo = async () => {
		try {
			// @ts-ignore global from CastingManager.ts
			await (window as any).CastingManager?.castWarriorCombo({ x: 120, y: 220 }, { x: 420, y: 300 });
		} catch (e) {
			console.warn('QuickCastPanel: castWarriorCombo failed', e);
		}
	};

	const castFormula = async () => {
		try {
			// @ts-ignore global from CastingManager.ts
			const CastingManager = (window as any).CastingManager;
			if (!CastingManager) {
				alert('CastingManager non disponible (ouvrez une page dist ou vérifiez le bundle)');
				return;
			}
			await CastingManager.cast(
				formula,
				{ class: casterClass, position: { x: 200, y: 180 }, level: 3 },
				{ x: 420, y: 260 },
				{ forceMode, useRealEngine }
			);
		} catch (e) {
			console.warn('QuickCastPanel: cast formula failed', e);
		}
	};

	// Raccourcis clavier
	React.useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
				e.preventDefault();
				castFormula();
			}
			if (e.shiftKey && (e.key === 'd' || e.key === 'D')) {
				e.preventDefault();
				castWarriorCombo();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	const copy111 = async () => {
		const text = `await MagicStack.utils.healthCheck();\nCastingManager.castWarriorCombo({ x: 120, y: 220 }, { x: 420, y: 300 });`;
		try {
			await navigator.clipboard.writeText(text);
			// no-op UI toast
		} catch {}
	};

	return (
		<div style={{
			position: 'absolute',
			right: 16,
			top: 84,
			width: 320,
			display: 'flex',
			flexDirection: 'column',
			gap: 12,
			background: 'linear-gradient(180deg, rgba(20, 24, 36, 0.95) 0%, rgba(26, 31, 46, 0.9) 100%)',
			border: '1px solid rgba(102, 126, 234, 0.4)',
			borderRadius: 12,
			padding: 12,
			boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
			zIndex: 5,
		}}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<h3 style={{ margin: 0, fontSize: 14, color: '#e8ecff' }}>⚡ QuickCast</h3>
				<button
					onClick={castWarriorCombo}
					style={{
						padding: '6px 10px',
						background: 'linear-gradient(135deg, #48bb78, #38a169)',
						border: 'none',
						borderRadius: 6,
						color: 'white',
						cursor: 'pointer',
						fontSize: 12,
						fontWeight: 600,
					}}
				>
					▶ Démo locale
				</button>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
				<label style={{ fontSize: 12, color: '#a0aec0' }}>Formule</label>
				<input
					value={formula}
					onChange={(e) => setFormula(e.target.value)}
					placeholder="ex: TEMPUS::FREEZE"
					style={{
						padding: '8px 10px',
						borderRadius: 8,
						border: '1px solid rgba(255,255,255,0.15)',
						background: 'rgba(255,255,255,0.06)',
						color: '#e8ecff',
						outline: 'none',
					}}
				/>
			</div>

		{/* Backend health */}
		<div style={{ display: 'flex', gap: 8, fontSize: 11, color: '#a0aec0' }}>
			<span>Rust: <span style={{ color: health.rust ? '#48bb78' : '#fc8181' }}>{health.rust ? 'OK' : 'OFF'}</span></span>
			<span>Java: <span style={{ color: health.java ? '#48bb78' : '#fc8181' }}>{health.java ? 'OK' : 'OFF'}</span></span>
			<span>Vector: <span style={{ color: health.vector ? '#48bb78' : '#fc8181' }}>{health.vector ? 'OK' : 'OFF'}</span></span>
		</div>

		{/* Engine toggle */}
		<label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#a0aec0' }}>
			<input
				type="checkbox"
				checked={useRealEngine}
				onChange={(e) => {
					setUseRealEngine(e.target.checked);
					try { localStorage.setItem('useRealEngine', String(e.target.checked)); } catch {}
				}}
			/>
			<span>Utiliser le moteur réel (/api/magic/cast)</span>
		</label>

			<div style={{ display: 'flex', gap: 10 }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
					<label style={{ fontSize: 12, color: '#a0aec0' }}>Classe</label>
					<select
						value={casterClass}
						onChange={(e) => setCasterClass(e.target.value as any)}
						style={{
							padding: '8px 10px',
							borderRadius: 8,
							border: '1px solid rgba(255,255,255,0.15)',
							background: 'rgba(255,255,255,0.06)',
							color: '#e8ecff',
							outline: 'none',
						}}
					>
						<option value="warrior">warrior</option>
						<option value="mage">mage</option>
						<option value="rogue">rogue</option>
						<option value="priest">priest</option>
						<option value="temporal">temporal</option>
						<option value="quantum">quantum</option>
					</select>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
					<label style={{ fontSize: 12, color: '#a0aec0' }}>Mode</label>
					<select
						value={forceMode}
						onChange={(e) => setForceMode(e.target.value as any)}
						style={{
							padding: '8px 10px',
							borderRadius: 8,
							border: '1px solid rgba(255,255,255,0.15)',
							background: 'rgba(255,255,255,0.06)',
							color: '#e8ecff',
							outline: 'none',
						}}
					>
						<option value="iconic">iconic</option>
						<option value="literary">literary</option>
						<option value="runic">runic</option>
						<option value="quantum">quantum</option>
					</select>
				</div>
			</div>

			<button
				onClick={castFormula}
				style={{
					padding: '10px 12px',
					background: 'linear-gradient(135deg, #4299e1, #3182ce)',
					border: 'none',
					borderRadius: 8,
					color: 'white',
					cursor: 'pointer',
					fontSize: 13,
					fontWeight: 700,
				}}
			>
				✨ Caster la formule
			</button>

			<div style={{ display: 'flex', gap: 8 }}>
				<button
					onClick={copy111}
					style={{
						padding: '6px 10px',
						background: 'rgba(255,255,255,0.08)',
						border: '1px solid rgba(255,255,255,0.2)',
						borderRadius: 6,
						color: '#e8ecff',
						cursor: 'pointer',
						fontSize: 12,
						fontWeight: 600,
					}}
				>
					📋 Copier 111
				</button>
				<div style={{ fontSize: 11, color: '#a0aec0', alignSelf: 'center' }}>
					⌘/Ctrl+Enter: cast • Shift+D: démo
				</div>
			</div>

			<div style={{ fontSize: 11, color: '#a0aec0', lineHeight: 1.4 }}>
				Astuce: si l'API Java n'est pas démarrée, utilisez la démo locale.
			</div>
		</div>
	);
}
