/*
 * CaminhoMetodo.tsx — animação da linha da secção "O Nosso Método"
 *
 * <CaminhoMetodo />  → desktop: as 3 curvas da escada com a luz a percorrer 01 → 04
 * <TrilhoMetodo />   → mobile/tablet: linha vertical com a luz a descer
 *
 * Sem bibliotecas externas: SVG + CSS. Só anima quando está visível no ecrã
 * e respeita "reduzir movimento" do sistema.
 *
 * Brilho nos cartões (opcional): dê aos 4 cartões as classes
 *   "metodo-card metodo-card-1" … "metodo-card metodo-card-4"
 */
import { useEffect, useRef } from "react";

const CICLO = 6; // segundos — do passo 01 ao 04
const RASTO = 0.6; // comprimento da luz (0–1 de cada curva)

// Mesma curva do design (150.56 × 118), repetida nos 3 degraus
const CURVA = "M0 0 C 72 0 150.56 44 150.56 118";
const DEGRAUS: [number, number][] = [
  [268, 36],
  [552, 186],
  [836, 336],
];

const CSS = `
.metodo-linhas { position:absolute; inset:0; width:100%; height:100%; overflow:visible; pointer-events:none; z-index:2; }
.metodo-base  { fill:none; stroke:rgba(76,141,255,.22); stroke-width:1.2; stroke-dasharray:5 6; stroke-linecap:round; }
.metodo-halo  { fill:none; stroke:#4c8dff; stroke-width:7; stroke-linecap:round; opacity:.35; filter:blur(4px); }
.metodo-luz   { fill:none; stroke:#a9c9ff; stroke-width:2.4; stroke-dasharray:5 6; stroke-linecap:round;
                filter:drop-shadow(0 0 3px #4c8dff) drop-shadow(0 0 8px rgba(76,141,255,.8)); }
.metodo-rasto { fill:none; stroke:#fff; stroke-width:22; stroke-linecap:round;
                stroke-dasharray:${RASTO} 2; stroke-dashoffset:${RASTO}; }
.metodo-diamante { fill:#4c8dff; transform-box:fill-box; transform-origin:center; transform:rotate(45deg); }

@keyframes metodo-seg1 { 0%,5%  {stroke-dashoffset:${RASTO}} 30%,100% {stroke-dashoffset:-1} }
@keyframes metodo-seg2 { 0%,35% {stroke-dashoffset:${RASTO}} 60%,100% {stroke-dashoffset:-1} }
@keyframes metodo-seg3 { 0%,65% {stroke-dashoffset:${RASTO}} 90%,100% {stroke-dashoffset:-1} }
@keyframes metodo-pulso {
  0%,100% { transform:rotate(45deg) scale(1);   filter:none; }
  6%      { transform:rotate(45deg) scale(1.8); filter:drop-shadow(0 0 6px #4c8dff); }
  16%     { transform:rotate(45deg) scale(1);   filter:none; }
}
@keyframes metodo-brilho {
  0%,100% { border-color:rgba(255,255,255,.08); box-shadow:none; }
  5%      { border-color:rgba(76,141,255,.55);  box-shadow:0 0 32px rgba(76,141,255,.18); }
  22%     { border-color:rgba(255,255,255,.08); box-shadow:none; }
}

.metodo-anima .metodo-rasto.s1 { animation:metodo-seg1 ${CICLO}s linear infinite; }
.metodo-anima .metodo-rasto.s2 { animation:metodo-seg2 ${CICLO}s linear infinite; }
.metodo-anima .metodo-rasto.s3 { animation:metodo-seg3 ${CICLO}s linear infinite; }
.metodo-anima .metodo-diamante { animation:metodo-pulso ${CICLO}s linear infinite; }
.metodo-anima .d0  { animation-delay:${-CICLO * 0.02}s; }
.metodo-anima .d1  { animation-delay:${-CICLO * 0.76}s; }
.metodo-anima .d1b { animation-delay:${-CICLO * 0.71}s; }
.metodo-anima .d2  { animation-delay:${-CICLO * 0.46}s; }
.metodo-anima .d2b { animation-delay:${-CICLO * 0.41}s; }
.metodo-anima .d3  { animation-delay:${-CICLO * 0.16}s; }

.metodo-anima .metodo-card   { animation:metodo-brilho ${CICLO}s linear infinite; }
.metodo-anima .metodo-card-1 { animation-delay:${-CICLO * 0.02}s; }
.metodo-anima .metodo-card-2 { animation-delay:${-CICLO * 0.74}s; }
.metodo-anima .metodo-card-3 { animation-delay:${-CICLO * 0.44}s; }
.metodo-anima .metodo-card-4 { animation-delay:${-CICLO * 0.14}s; }

/* Mobile / tablet */
.metodo-trilho {
  position:absolute; left:11px; top:36px; bottom:36px; width:3px; overflow:hidden; pointer-events:none;
  background:repeating-linear-gradient(to bottom, rgba(76,141,255,.3) 0 5px, transparent 5px 11px);
  -webkit-mask:repeating-linear-gradient(to bottom, #000 0 5px, transparent 5px 11px);
          mask:repeating-linear-gradient(to bottom, #000 0 5px, transparent 5px 11px);
}
.metodo-trilho::after {
  content:""; position:absolute; left:0; right:0; top:0; height:${RASTO * 60}%;
  background:linear-gradient(to bottom, transparent, #a9c9ff 55%, #fff 70%, transparent);
  filter:drop-shadow(0 0 4px #4c8dff); transform:translateY(-100%);
}
@keyframes metodo-descer { 0%,5% {top:0; transform:translateY(-100%)} 90%,100% {top:100%; transform:translateY(0)} }
.metodo-anima .metodo-trilho::after { animation:metodo-descer ${CICLO}s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .metodo-anima *, .metodo-anima *::after { animation:none !important; }
  .metodo-rasto { stroke-dasharray:none; stroke-dashoffset:0; }
}
`;

/** Liga a classe "metodo-anima" ao contentor pai enquanto estiver visível. */
function useAnimarQuandoVisivel<T extends Element>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const pai = ref.current?.parentElement;
    if (!pai) return;
    const obs = new IntersectionObserver(
      ([e]) => pai.classList.toggle("metodo-anima", e.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(pai);
    return () => {
      obs.disconnect();
      pai.classList.remove("metodo-anima");
    };
  }, []);
  return ref;
}

/** Desktop: colocar dentro do contentor da escada (1124 × 716, position: relative). */
export function CaminhoMetodo() {
  const ref = useAnimarQuandoVisivel<SVGSVGElement>();
  return (
    <>
      <style>{CSS}</style>
      <svg ref={ref} className="metodo-linhas" viewBox="0 0 1124 716" aria-hidden="true">
        <defs>
          <path id="metodo-curva" d={CURVA} />
          <path id="metodo-curvaN" d={CURVA} pathLength={1} />
          {DEGRAUS.map(([x, y], i) => (
            <mask key={i} id={`metodo-m${i + 1}`} maskUnits="userSpaceOnUse" x={-50} y={-50} width={1224} height={816}>
              <use href="#metodo-curvaN" className={`metodo-rasto s${i + 1}`} transform={`translate(${x} ${y})`} />
            </mask>
          ))}
        </defs>

        {DEGRAUS.map(([x, y], i) => (
          <use key={`b${i}`} href="#metodo-curva" className="metodo-base" transform={`translate(${x} ${y})`} />
        ))}
        {DEGRAUS.map(([x, y], i) => (
          <g key={`l${i}`} mask={`url(#metodo-m${i + 1})`}>
            <use href="#metodo-curva" className="metodo-halo" transform={`translate(${x} ${y})`} />
            <use href="#metodo-curva" className="metodo-luz" transform={`translate(${x} ${y})`} />
          </g>
        ))}

        {/* losangos nas pontas das curvas */}
        <rect className="metodo-diamante d0" x={265} y={33} width={6} height={6} />
        <rect className="metodo-diamante d1" x={415.5} y={151} width={6} height={6} />
        <rect className="metodo-diamante d1b" x={549} y={183} width={6} height={6} />
        <rect className="metodo-diamante d2" x={699.5} y={301} width={6} height={6} />
        <rect className="metodo-diamante d2b" x={833} y={333} width={6} height={6} />
        <rect className="metodo-diamante d3" x={983.5} y={451} width={6} height={6} />
      </svg>
    </>
  );
}

/** Mobile/tablet: colocar dentro do contentor da lista de cartões (position: relative, padding-left ≈ 36px). */
export function TrilhoMetodo() {
  const ref = useAnimarQuandoVisivel<HTMLDivElement>();
  return (
    <>
      <style>{CSS}</style>
      <div ref={ref} className="metodo-trilho" aria-hidden="true" />
    </>
  );
}
