import { useState, type ReactNode } from 'react';
import BotaoFluido from './BotaoFluido';

const iconStar = '/assets/7073f.svg';
const iconChevron = '/assets/bc522.svg';

const FONT_EXP = '"Special Gothic Expanded One:Regular", sans-serif';
const FONT_REG = '"Special Gothic:Regular", sans-serif';

interface ServiceCard {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

const services: ServiceCard[] = [
  {
    num: '01',
    title: 'SEO Local',
    description: 'Posicionamos a sua empresa nas pesquisas locais do Google para que os clientes da sua área o encontrem primeiro.',
    tags: ['Google Maps', 'Pesquisa Local', 'Citações'],
  },
  {
    num: '02',
    title: 'SEO Técnico',
    description: 'Otimizamos a estrutura técnica do seu site para que o Google o indexe e posicione corretamente.',
    tags: ['Core Web Vitals', 'Schema', 'Indexação'],
  },
  {
    num: '03',
    title: 'SEO On-Page',
    description: 'Otimizamos cada página para as palavras-chave certas, com estrutura e conteúdo que o Google valoriza.',
    tags: ['Keywords', 'Meta Tags', 'Estrutura'],
  },
  {
    num: '04',
    title: 'Conteúdo SEO',
    description: 'Criamos conteúdo estratégico que atrai visitantes qualificados e consolida a autoridade da sua marca.',
    tags: ['Blog', 'Copywriting', 'Autoridade'],
  },
  {
    num: '05',
    title: 'Google Business Profile',
    description: 'Otimizamos e gerimos o seu perfil de empresa no Google para maximizar a visibilidade e avaliações.',
    tags: ['Avaliações', 'Posts', 'Fotos'],
  },
  {
    num: '06',
    title: 'Criação de Websites',
    description: 'Desenvolvemos websites profissionais, rápidos e otimizados para conversão e motores de busca.',
    tags: ['Design', 'WordPress', 'Performance'],
  },
  {
    num: '07',
    title: 'Landing Pages',
    description: 'Criamos páginas de destino focadas num único objetivo: converter visitantes em contactos qualificados.',
    tags: ['Conversão', 'CRO', 'A/B Testing'],
  },
  {
    num: '08',
    title: 'Estratégia Digital',
    description: 'Desenvolvemos um plano de presença digital completo, alinhado com os objetivos do seu negócio.',
    tags: ['Diagnóstico', 'Roadmap', 'Analytics'],
  },
];

/* ── Cartão de serviço estilo "painel técnico" ─────────────────
   Parafusos nos cantos, luz indicadora, ícone, tabela em letra de
   máquina. Ao passar o rato (ou focar com o teclado) abre a lista
   "Inclui" e quatro feixes de luz percorrem as bordas.
   Em ecrãs tácteis a lista fica sempre visível, sem efeitos de toque. */

const FONT_MONO = 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

const SERVICE_META: Record<string, { area: string; icon: string }> = {
  '01': { area: 'SEO', icon: 'pin' },
  '02': { area: 'SEO', icon: 'code' },
  '03': { area: 'SEO', icon: 'doc' },
  '04': { area: 'Conteúdo', icon: 'pen' },
  '05': { area: 'SEO Local', icon: 'store' },
  '06': { area: 'Web', icon: 'monitor' },
  '07': { area: 'Web', icon: 'target' },
  '08': { area: 'Estratégia', icon: 'growth' },
};

function ServiceIcon({ name }: { name: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  let body: ReactNode = null;
  switch (name) {
    case 'pin': body = (<><path {...p} d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle {...p} cx="12" cy="9.5" r="2.5" /></>); break;
    case 'code': body = (<><polyline {...p} points="8 7 3 12 8 17" /><polyline {...p} points="16 7 21 12 16 17" /><line {...p} x1="14" y1="4" x2="10" y2="20" /></>); break;
    case 'doc': body = (<><path {...p} d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline {...p} points="14 3 14 9 20 9" /><line {...p} x1="8" y1="13" x2="16" y2="13" /><line {...p} x1="8" y1="17" x2="13" y2="17" /></>); break;
    case 'pen': body = (<><path {...p} d="M12 20h9" /><path {...p} d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>); break;
    case 'store': body = (<><path {...p} d="M3 9l1.5-5h15L21 9" /><path {...p} d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path {...p} d="M5 12v8h14v-8" /></>); break;
    case 'monitor': body = (<><rect {...p} x="3" y="4" width="18" height="12" rx="2" /><line {...p} x1="8" y1="20" x2="16" y2="20" /><line {...p} x1="12" y1="16" x2="12" y2="20" /></>); break;
    case 'target': body = (<><circle {...p} cx="12" cy="12" r="9" /><circle {...p} cx="12" cy="12" r="5" /><circle {...p} cx="12" cy="12" r="1.5" /></>); break;
    default: body = (<><polyline {...p} points="3 17 9 11 13 15 21 7" /><polyline {...p} points="15 7 21 7 21 13" /></>);
  }
  return <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">{body}</svg>;
}

function Card({ card }: { card: ServiceCard }) {
  const [open, setOpen] = useState(false);
  const meta = SERVICE_META[card.num] ?? { area: 'SEO', icon: 'growth' };
  const canHover = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  return (
    <article
      className={`sc${open ? ' open' : ''}`}
      tabIndex={0}
      onMouseEnter={() => { if (canHover()) setOpen(true); }}
      onMouseLeave={() => { if (canHover()) setOpen(false); }}
      onFocus={() => setOpen(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o); } }}
    >
      <i className="sc-screw tl" /><i className="sc-screw tr" /><i className="sc-screw bl" /><i className="sc-screw br" />
      <span className="sc-bm sc-bm-t" aria-hidden="true" />
      <span className="sc-bm sc-bm-r" aria-hidden="true" />
      <span className="sc-bm sc-bm-b" aria-hidden="true" />
      <span className="sc-bm sc-bm-l" aria-hidden="true" />

      <div className="sc-top">
        <span className="sc-tile"><ServiceIcon name={meta.icon} /></span>
        <span className="sc-led" aria-hidden="true" />
      </div>

      <h3 className="sc-title srv-h3" style={{ fontFamily: FONT_EXP, fontWeight: 400 }}>{card.title}</h3>
      <p className="sc-desc srv-desc" style={{ fontFamily: FONT_REG, fontVariationSettings: '"wdth" 100' }}>{card.description}</p>

      <div className="sc-spec">
        <div><small>Serviço</small><b>{card.num} / {String(services.length).padStart(2, '0')}</b></div>
        <div><small>Área</small><b>{meta.area}</b></div>
      </div>

      <div className="sc-more">
        <div className="sc-more-in">
          <div className="sc-inc"><span>Inclui</span></div>
          <ul>
            {card.tags.map((tag, i) => (
              <li key={tag}>
                <span style={{ fontFamily: '"Special Gothic:SemiBold", sans-serif', fontWeight: 600 }}>{tag}</span>
                <em>{String(i + 1).padStart(2, '0')}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a className="sc-go" href="#contacto">Pedir orçamento <span aria-hidden="true">→</span></a>
    </article>
  );
}

export default function NossosServicos() {
  return (
    <section
      id="servicos"
      style={{ width: '100%', paddingTop: 100, paddingBottom: 100 }}
      className="srv-section"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          paddingLeft: 80,
          paddingRight: 80,
        }}
        className="srv-wrap"
      >
        {/* Header: pill+H2 left, paragraph right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 40,
            marginBottom: 60,
          }}
          className="srv-header"
        >
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 50, flexShrink: 0 }}>
            {/* Pill */}
            <div className="df-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '15px 40px',
                borderRadius: 900,
                background: '#fff',
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: 'inset 0px 0px 20px 0px rgba(76,141,255,0.3)',
                alignSelf: 'flex-start',
              }}
            >
              <img src={iconStar} alt="" width={26} height={26} style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: FONT_EXP,
                  fontSize: 24,
                  lineHeight: 1.1,
                  background: 'linear-gradient(90deg, #002E80 9%, #3162E0 82%, #002E80)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  whiteSpace: 'nowrap',
                }}
              >
                NOSSOS SERVIÇOS
              </span>
            </div>

            {/* H2 */}
            <h2
              style={{
                fontFamily: FONT_EXP,
                fontWeight: 400,
                fontSize: 60,
                lineHeight: '63px',
                margin: 0,
                color: '#fff',
              }}
              className="srv-h2"
            >
              O que fazemos<br />
              <span
                style={{
                  background: 'linear-gradient(to bottom, #FFFFFF, #002E80)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                para si.
              </span>
            </h2>
          </div>

          {/* Right: paragraph */}
          <p
            style={{
              fontFamily: FONT_REG,
              fontWeight: 400,
              fontSize: 20,
              lineHeight: '32px',
              color: 'rgba(255,255,255,0.5)',
              margin: 0,
              maxWidth: 393,
              textAlign: 'center',
              fontVariationSettings: '"wdth" 100',
              flexShrink: 0,
            }}
            className="srv-para"
          >
            Cada serviço é planeado e executado com um único propósito: fazer crescer o seu negócio de forma sustentável.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 30,
            marginBottom: 60,
            alignItems: 'start',
          }}
          className="srv-grid"
        >
          {services.map((s) => (
            <Card key={s.num} card={s} />
          ))}
        </div>

        {/* CTA button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BotaoFluido href="#contacto" tamanho="grande" className="srv-btn">
            PEDIR ORÇAMENTO GRATUITO
          </BotaoFluido>
        </div>
      </div>

      <style>{`
        /* ── Cartões de serviço estilo "painel técnico" ── */
        .sc { position: relative; border-radius: 16px; padding: 28px 28px 26px; outline: none; overflow: hidden;
          background: linear-gradient(145deg, #121620 0%, #05070d 100%);
          border: 1px solid rgba(255,255,255,.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 20px 50px -30px rgba(0,0,0,.8);
          transition: border-color .25s ease, box-shadow .25s ease; -webkit-tap-highlight-color: transparent; }
        .sc:focus-visible { border-color: #4C8DFF; }
        .sc-screw { position: absolute; width: 7px; height: 7px; border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #3a3f4c 0%, #12151c 70%, #000 100%); box-shadow: 0 0 0 1px rgba(255,255,255,.05); }
        .sc-screw.tl { top: 8px; left: 8px; } .sc-screw.tr { top: 8px; right: 8px; }
        .sc-screw.bl { bottom: 8px; left: 8px; } .sc-screw.br { bottom: 8px; right: 8px; }
        .sc-bm { position: absolute; z-index: 10; pointer-events: none; opacity: 0; }
        .sc-bm-t { top: 0; left: 0; width: 70%; height: 2px; background: linear-gradient(90deg, transparent, #3162E0, #ffffff, transparent); }
        .sc-bm-r { top: 0; right: 0; width: 2px; height: 70%; background: linear-gradient(180deg, transparent, #3162E0, #ffffff, transparent); }
        .sc-bm-b { bottom: 0; right: 0; width: 70%; height: 2px; background: linear-gradient(270deg, transparent, #3162E0, #ffffff, transparent); }
        .sc-bm-l { top: 0; left: 0; width: 2px; height: 70%; background: linear-gradient(0deg, transparent, #3162E0, #ffffff, transparent); }
        @keyframes sc-x  { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @keyframes sc-y  { from { transform: translateY(-100%); } to { transform: translateY(100%); } }
        @keyframes sc-xr { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
        @keyframes sc-yr { from { transform: translateY(100%); } to { transform: translateY(-100%); } }
        .sc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
        .sc-tile { width: 48px; height: 48px; border-radius: 12px; display: grid; place-items: center; color: #4C8DFF;
          background: linear-gradient(145deg, #1a1f2b, #0b0e15); border: 1px solid rgba(255,255,255,.08);
          transition: box-shadow .4s ease, border-color .4s ease, color .4s ease; }
        .sc-led { width: 7px; height: 7px; border-radius: 50%; background: #3162E0; box-shadow: 0 0 6px rgba(49,98,224,.8); opacity: .7; margin-right: 6px; }
        .sc-title { font-size: 28px; line-height: 32px; color: #fff; margin: 0 0 10px; }
        .sc-desc { font-size: 18px; line-height: 26px; color: rgba(255,255,255,.55); margin: 0 0 22px; }
        .sc-spec { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid rgba(255,255,255,.07); border-radius: 10px; background: rgba(255,255,255,.025); margin-bottom: 20px; }
        .sc-spec > div { padding: 10px 14px; }
        .sc-spec > div + div { border-left: 1px solid rgba(255,255,255,.07); }
        .sc-spec small { display: block; font-family: ${FONT_MONO}; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #71717A; margin-bottom: 4px; }
        .sc-spec b { font-family: ${FONT_MONO}; font-size: 14px; font-weight: 600; letter-spacing: .03em; color: #e4e4e7; transition: color .4s ease; }
        .sc-more { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s cubic-bezier(.16,1,.3,1); }
        .sc-more-in { overflow: hidden; }
        .sc-inc { display: flex; align-items: center; gap: 12px; margin: 2px 0 14px; }
        .sc-inc::before, .sc-inc::after { content: ""; flex: 1; height: 1px; background: rgba(76,141,255,.25); }
        .sc-inc span { font-family: ${FONT_MONO}; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: #4C8DFF; }
        .sc ul { list-style: none; margin: 0 0 20px; padding: 0; display: grid; gap: 8px; }
        .sc li { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 14px; border-radius: 10px;
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); color: #fff; font-size: 16px;
          opacity: 0; transform: translateY(8px); transition: opacity .4s ease, transform .4s ease; }
        .sc li em { font-style: normal; font-family: ${FONT_MONO}; font-size: 11px; color: #7FB0FF; background: rgba(49,98,224,.2);
          border: 1px solid rgba(76,141,255,.35); border-radius: 6px; padding: 2px 7px; }
        .sc-go { display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px; border-radius: 10px; text-decoration: none;
          font-family: ${FONT_MONO}; font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #fff;
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
          transition: background .35s ease, border-color .35s ease, box-shadow .35s ease; }
        .sc-go:focus-visible { outline: 2px solid #4C8DFF; outline-offset: 3px; }
        .sc.open { border-color: rgba(49,98,224,.47); box-shadow: 0 20px 48px rgba(0,0,0,.95), 0 0 40px rgba(49,98,224,.21), inset 0 0 24px rgba(49,98,224,.08); }
        .sc.open .sc-bm { opacity: 1; }
        .sc.open .sc-bm-t { animation: sc-x 1.8s linear infinite; }
        .sc.open .sc-bm-r { animation: sc-y 1.8s linear .45s infinite both; }
        .sc.open .sc-bm-b { animation: sc-xr 1.8s linear .9s infinite both; }
        .sc.open .sc-bm-l { animation: sc-yr 1.8s linear 1.35s infinite both; }
        .sc.open .sc-tile { color: #fff; border-color: rgba(76,141,255,.5); box-shadow: 0 0 18px rgba(49,98,224,.55), inset 0 0 12px rgba(76,141,255,.25); }
        .sc.open .sc-led { opacity: 1; background: #4C8DFF; box-shadow: 0 0 10px #4C8DFF; animation: sc-blink 1.4s ease-in-out infinite; }
        .sc.open .sc-spec b { color: #4C8DFF; }
        .sc.open .sc-more { grid-template-rows: 1fr; }
        .sc.open li { opacity: 1; transform: none; }
        .sc.open li:nth-child(2) { transition-delay: .06s; } .sc.open li:nth-child(3) { transition-delay: .12s; }
        .sc.open .sc-go { background: #3162E0; border-color: #4C8DFF; box-shadow: 0 8px 24px -8px rgba(49,98,224,.8); }
        @keyframes sc-blink { 50% { opacity: .45; } }
        @media (hover: none) {
          .sc-more { grid-template-rows: 1fr; }
          .sc li { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sc.open .sc-bm { opacity: 0; animation: none; }
          .sc.open .sc-led { animation: none; }
          .sc-more, .sc li { transition: none; }
        }
        @media (max-width: 1279px) {
          .srv-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .srv-wrap {
            padding-left: 40px !important;
            padding-right: 40px !important;
          }
          .srv-header { margin-bottom: 48px !important; }
          .srv-header > div:first-child { gap: 32px !important; }
          .srv-para { font-size: 18px !important; line-height: 28px !important; max-width: 360px !important; text-align: left !important; }
          .srv-h2 { font-size: 42px !important; line-height: 46px !important; }
          .srv-grid { gap: 20px !important; }
          .sc { padding: 24px 22px 22px; }
          .sc-title { font-size: 24px; line-height: 28px; }
          .sc-desc { font-size: 16px; line-height: 24px; }
        }
        @media (max-width: 1023px) {
          .srv-header {
            align-items: flex-start !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          .srv-para { max-width: 560px !important; }
        }
        @media (max-width: 767px) {
          .srv-section { padding-top: 56px !important; padding-bottom: 56px !important; }
          .srv-wrap { padding-left: 20px !important; padding-right: 20px !important; }
          .srv-header { margin-bottom: 32px !important; }
          .srv-header > div:first-child { gap: 24px !important; }
          .srv-h2 { font-size: 32px !important; line-height: 36px !important; }
          .srv-para { font-size: 16px !important; line-height: 26px !important; }
          .srv-grid { grid-template-columns: 1fr !important; gap: 14px !important; margin-bottom: 36px !important; }
          .srv-btn { width: 100% !important; }
          .sc { padding: 20px 18px 18px; border-radius: 14px; }
          .sc-top { margin-bottom: 14px; }
          .sc-tile { width: 42px; height: 42px; border-radius: 10px; }
          .sc-title { font-size: 21px; line-height: 26px; margin-bottom: 8px; }
          .sc-desc { font-size: 15px; line-height: 22px; margin-bottom: 16px; }
          .sc-spec { margin-bottom: 14px; }
          .sc-spec > div { padding: 8px 12px; }
          .sc ul { margin-bottom: 14px; gap: 6px; }
          .sc li { padding: 10px 12px; font-size: 15px; }
          .sc-go { width: 100%; justify-content: center; box-sizing: border-box; padding: 13px 16px; }
        }
      `}</style>
    </section>
  );
}

