/*
 * CartaoInterativo.tsx — cartão com inclinação 3D, luz que segue o rato
 * e borda que acende do lado do cursor.
 *
 * - só reage a rato/trackpad (em ecrãs tácteis fica estático);
 * - respeita "reduzir movimento" (sem inclinação, mantém a luz);
 * - não re-renderiza ao mover o rato (usa variáveis CSS).
 *
 * Uso:
 *   <CartaoInterativo style={{ padding: 32, gap: 8 }}>…conteúdo…</CartaoInterativo>
 *   Elementos com className="ci-pop" ficam ainda mais "à frente" (profundidade extra).
 */
import { useRef, type CSSProperties, type ReactNode, type PointerEvent } from 'react';

type Props = {
  children: ReactNode;
  /** estilo do conteúdo (padding, flex, gap…) */
  style?: CSSProperties;
  /** cor de destaque da luz e da borda */
  accent?: string;
  /** fundo do cartão */
  background?: string;
  /** borda em repouso */
  border?: string;
  radius?: number;
  /** inclinação máxima em graus */
  maxTilt?: number;
  className?: string;
};

const CSS = `
.ci-persp { perspective: 900px; height: 100%; }
.ci-card {
  position: relative; height: 100%; border-radius: var(--ci-r);
  transform-style: preserve-3d;
  transform: rotateX(var(--ci-rx, 0deg)) rotateY(var(--ci-ry, 0deg));
  transition: transform .6s cubic-bezier(.16,1,.3,1), box-shadow .4s ease;
  will-change: transform;
}
.ci-persp.ci-live .ci-card { transition: transform .12s linear, box-shadow .4s ease; }
.ci-persp:hover .ci-card { box-shadow: 0 30px 80px -10px var(--ci-shadow); }
.ci-layer { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; }
.ci-bg { background: var(--ci-bg); border: var(--ci-border); box-sizing: border-box; }
.ci-beam {
  inset: -1px; padding: 1.5px;
  background: conic-gradient(from var(--ci-angle, 0deg), var(--ci-accent) 0deg, transparent 70deg, transparent 290deg, var(--ci-accent) 360deg);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  opacity: 0; transition: opacity .35s ease;
}
.ci-spot {
  background: radial-gradient(420px circle at var(--ci-x, 50%) var(--ci-y, 0%), var(--ci-glow), transparent 60%);
  opacity: 0; transition: opacity .35s ease;
}
.ci-persp:hover .ci-beam, .ci-persp:hover .ci-spot { opacity: 1; }
.ci-content { position: relative; height: 100%; box-sizing: border-box; transform: translateZ(30px); transform-style: preserve-3d; }
.ci-content .ci-pop { transform: translateZ(20px); }
@media (prefers-reduced-motion: reduce) {
  .ci-card { transform: none !important; }
  .ci-content, .ci-content .ci-pop { transform: none; }
}
`;

/** "#4C8DFF" → "rgba(76,141,255,a)" */
function withAlpha(hex: string, a: number) {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export default function CartaoInterativo({
  children,
  style,
  accent = '#4C8DFF',
  background = 'rgba(44,53,76,0.18)',
  border = '1.215px solid rgba(255,255,255,0.06)',
  radius = 16,
  maxTilt = 7,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const canTilt = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0 → 1
    const py = (e.clientY - r.top) / r.height;   // 0 → 1
    el.style.setProperty('--ci-x', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--ci-y', `${(py * 100).toFixed(1)}%`);
    // borda acende do lado do cursor (0° = topo, sentido horário)
    const ang = (Math.atan2(px - 0.5, -(py - 0.5)) * 180) / Math.PI;
    el.style.setProperty('--ci-angle', `${ang.toFixed(1)}deg`);
    if (canTilt()) {
      el.classList.add('ci-live');
      el.style.setProperty('--ci-rx', `${((0.5 - py) * 2 * maxTilt).toFixed(2)}deg`);
      el.style.setProperty('--ci-ry', `${((px - 0.5) * 2 * maxTilt).toFixed(2)}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove('ci-live');
    el.style.setProperty('--ci-rx', '0deg');
    el.style.setProperty('--ci-ry', '0deg');
  };

  const vars = {
    '--ci-r': `${radius}px`,
    '--ci-bg': background,
    '--ci-border': border,
    '--ci-accent': withAlpha(accent, 0.9),
    '--ci-glow': withAlpha(accent, 0.16),
    '--ci-shadow': withAlpha(accent, 0.22),
  } as CSSProperties;

  // Os eventos ficam no invólucro (que não roda), para a área do rato não
  // mudar quando o cartão inclina — evita tremer junto às margens.
  return (
    <div ref={ref} className="ci-persp" style={vars} onPointerMove={onMove} onPointerLeave={onLeave}>
      <style>{CSS}</style>
      <div className={`ci-card ${className}`}>
        <div className="ci-layer ci-bg" />
        <div className="ci-layer ci-spot" />
        <div className="ci-layer ci-beam" />
        <div className="ci-content" style={style}>
          {children}
        </div>
      </div>
    </div>
  );
}
