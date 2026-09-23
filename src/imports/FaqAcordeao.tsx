/*
 * FaqAcordeao.tsx — lista animada da secção "Perguntas Frequentes"
 *
 * Círculo à esquerda (anel tracejado que roda + "+" que vira "−"),
 * cartão à direita com a pergunta, e uma linha vertical a ligar os círculos.
 * Sem bibliotecas externas: React + CSS. Respeita "reduzir movimento".
 *
 * Uso:
 *   <FaqAcordeao itens={[{ pergunta: "...", resposta: "..." }, ...]} />
 */
import { useId, useState } from "react";

export type FaqItem = { pergunta: string; resposta: string };

type Props = {
  itens: FaqItem[];
  /** permitir várias perguntas abertas ao mesmo tempo (padrão: não) */
  varias?: boolean;
  /** abrir a primeira pergunta ao carregar (padrão: sim) */
  primeiraAberta?: boolean;
};

const CSS = `
.faqa { --faqa-blue:#4c8dff; --faqa-dur:500ms; --faqa-ease:cubic-bezier(0.4,0,0.2,1);
  flex:1; min-width:0; width:100%; display:flex; flex-direction:column; gap:16px; position:relative; }
.faqa::before { content:""; position:absolute; left:23px; top:24px; bottom:24px; width:1px;
  background:rgba(255,255,255,.08); pointer-events:none; }
.faqa-item { display:grid; grid-template-columns:48px 1fr; gap:14px; align-items:start; position:relative; }

.faqa-circulo { position:relative; z-index:1; width:48px; height:48px; border-radius:50%; padding:0; cursor:pointer;
  background:#0f131c; border:1px solid rgba(255,255,255,.08); color:rgba(255,255,255,.55);
  display:grid; place-items:center;
  transition:border-color var(--faqa-dur) var(--faqa-ease), background-color var(--faqa-dur) var(--faqa-ease),
             box-shadow var(--faqa-dur) var(--faqa-ease), color var(--faqa-dur) var(--faqa-ease), transform 250ms var(--faqa-ease); }
.faqa-item:hover .faqa-circulo { transform:scale(1.05); border-color:rgba(76,141,255,.3); color:#fff; }
.faqa-aberto .faqa-circulo { background:#0f1a33; border-color:rgba(76,141,255,.55); color:var(--faqa-blue);
  box-shadow:0 0 20px rgba(76,141,255,.35); }
.faqa-circulo:focus-visible, .faqa-pergunta:focus-visible { outline:2px solid var(--faqa-blue); outline-offset:2px; }
.faqa-anel { position:absolute; inset:11px; border-radius:50%; border:1.4px dashed currentColor;
  transition:transform 700ms var(--faqa-ease); }
.faqa-aberto .faqa-anel { transform:rotate(180deg); }
.faqa-mais { position:relative; width:12px; height:12px; }
.faqa-mais::before, .faqa-mais::after { content:""; position:absolute; left:0; top:50%; width:12px; height:1.6px;
  margin-top:-.8px; border-radius:2px; background:currentColor;
  transition:transform var(--faqa-dur) var(--faqa-ease), opacity var(--faqa-dur) var(--faqa-ease); }
.faqa-mais::after { transform:rotate(90deg); }
.faqa-aberto .faqa-mais::after { transform:rotate(180deg) scaleX(0); opacity:0; }

.faqa-cartao { background:rgba(44,53,76,.18); border:1.28px solid rgba(255,255,255,.07); border-radius:16px;
  transition:border-color var(--faqa-dur) var(--faqa-ease), background-color var(--faqa-dur) var(--faqa-ease),
             box-shadow var(--faqa-dur) var(--faqa-ease), transform 250ms var(--faqa-ease); }
.faqa-item:hover .faqa-cartao { transform:translateX(3px); border-color:rgba(255,255,255,.12); }
.faqa-aberto .faqa-cartao { background:rgba(44,53,76,.3); border-color:rgba(76,141,255,.4);
  box-shadow:0 10px 40px -14px rgba(76,141,255,.35); }
.faqa-pergunta { width:100%; display:flex; align-items:center; gap:14px; min-height:46px; padding:11px 22px;
  background:none; border:0; color:rgba(255,255,255,.75); font:inherit; text-align:left; cursor:pointer;
  border-radius:16px; transition:color var(--faqa-dur) var(--faqa-ease); }
.faqa-item:hover .faqa-pergunta, .faqa-aberto .faqa-pergunta { color:#fff; }
.faqa-num { font-family:"Special Gothic Expanded One", system-ui, sans-serif; font-size:18px; line-height:1;
  color:rgba(76,141,255,.7); flex-shrink:0;
  transition:color var(--faqa-dur) var(--faqa-ease), text-shadow var(--faqa-dur) var(--faqa-ease); }
.faqa-aberto .faqa-num { color:var(--faqa-blue); text-shadow:0 0 12px rgba(76,141,255,.7); }
.faqa-titulo { font-size:16px; line-height:24px; font-weight:500; }

.faqa-resposta { display:grid; grid-template-rows:0fr; opacity:0;
  transition:grid-template-rows var(--faqa-dur) var(--faqa-ease), opacity var(--faqa-dur) var(--faqa-ease); }
.faqa-aberto .faqa-resposta { grid-template-rows:1fr; opacity:1; }
.faqa-resposta > div { overflow:hidden; }
.faqa-resposta p { margin:0; padding:0 22px 20px; font-size:15px; line-height:24px; color:rgba(255,255,255,.55);
  transform:translateY(-6px); transition:transform var(--faqa-dur) var(--faqa-ease); }
.faqa-aberto .faqa-resposta p { transform:none; }

@media (max-width:900px) {
  .faqa-item { grid-template-columns:40px 1fr; gap:10px; }
  .faqa-circulo { width:40px; height:40px; }
  .faqa-anel { inset:8px; }
  .faqa::before { left:19px; top:20px; bottom:20px; }
  .faqa-pergunta { padding:10px 16px; }
  .faqa-resposta p { padding:0 16px 16px; }
  .faqa-item:hover .faqa-cartao { transform:none; }
}
@media (prefers-reduced-motion: reduce) {
  .faqa, .faqa * , .faqa *::before, .faqa *::after { transition:none !important; }
}
`;

export default function FaqAcordeao({ itens, varias = false, primeiraAberta = true }: Props) {
  const uid = useId().replace(/:/g, "");
  const [abertos, setAbertos] = useState<number[]>(primeiraAberta && itens.length ? [0] : []);

  const alternar = (i: number) =>
    setAbertos((atual) =>
      atual.includes(i) ? atual.filter((x) => x !== i) : varias ? [...atual, i] : [i]
    );

  return (
    <>
      <style>{CSS}</style>
      <div className="faqa">
        {itens.map((item, i) => {
          const aberto = abertos.includes(i);
          const q = `faqa-${uid}-q${i}`;
          const r = `faqa-${uid}-r${i}`;
          return (
            <div key={i} className={`faqa-item${aberto ? " faqa-aberto" : ""}`}>
              <button type="button" className="faqa-circulo" tabIndex={-1} aria-hidden="true" onClick={() => alternar(i)}>
                <span className="faqa-anel" />
                <span className="faqa-mais" />
              </button>
              <div className="faqa-cartao">
                <button type="button" id={q} className="faqa-pergunta" aria-expanded={aberto} aria-controls={r} onClick={() => alternar(i)}>
                  <span className="faqa-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faqa-titulo">{item.pergunta}</span>
                </button>
                <div id={r} role="region" aria-labelledby={q} className="faqa-resposta">
                  <div>
                    <p>{item.resposta}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
