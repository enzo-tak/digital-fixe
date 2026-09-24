import { useRef, useState } from "react"
import BotaoFluido from "./BotaoFluido"

const iconStar = "/assets/7073f.svg"
const iconChip = "/assets/9f055.svg"

const FONT_EXP = '"Special Gothic Expanded One:Regular", sans-serif'
const FONT_REG = '"Special Gothic:Regular", sans-serif'
const FONT_SEMI = '"Special Gothic:SemiBold", sans-serif'

const chips = [
  "Transparência",
  "Compromisso",
  "Dedicação",
  "Honestidade",
  "Resultados",
  "Confiança",
]

interface Member {
  photo: string
  name: string
  role: string
  subtitle: string
}

const team: Member[] = [
  {
    photo: '/assets/agencia-marketing-digital-lisboa-seo-local.webp',
    name: "Juliane Rodrigues",
    role: "Analista de Operações",
    subtitle: "Especialista em Eficiência",
  },
  {
    photo: '/assets/website-design-pequena-empresa-responsive.webp',
    name: "Pablo Lima",
    role: "Gerente de Marketing",
    subtitle: "Expert em Google desde 2019",
  },
  {
    photo: '/assets/guia-criar-website-pequena-empresa-seo.webp',
    name: "Enzo Takanashi",
    role: "Designer UI & UX",
    subtitle: "Web Designer",
  },
]

/* ── Team card (vidro) ───────────────────────────────────────
   Foto a ocupar o cartão inteiro, painel de vidro com nome e cargo
   por cima. Ao passar o rato: foto a preto e branco com tom azul,
   ligeira rotação e zoom. Sem reação ao toque em telemóveis.      */
function TeamCard({
  member,
  photoStyle,
}: {
  member: Member
  photoStyle?: React.CSSProperties
}) {
  return (
    <div
      className="sn-card"
      onTouchStart={() => {}}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        border: "1.215px solid rgba(255,255,255,0.08)",
        background: "#0a0d14",
        ...photoStyle,
      }}
    >
      <img className="sn-card-img" src={member.photo} alt={member.name} />
      <div className="sn-card-tint" aria-hidden="true" />

      {/* Painel de vidro */}
      <div className="sn-card-glass">
        <p
          style={{
            fontFamily: FONT_SEMI,
            fontWeight: 600,
            fontSize: 18,
            lineHeight: "24px",
            color: "#fff",
            margin: 0,
            fontVariationSettings: '"wdth" 100',
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontFamily: FONT_REG,
            fontWeight: 400,
            fontSize: 13,
            lineHeight: "18px",
            color: "#7FB0FF",
            margin: "2px 0 0",
            fontVariationSettings: '"wdth" 100',
          }}
        >
          {member.role}
        </p>
        <p
          style={{
            fontFamily: FONT_REG,
            fontWeight: 400,
            fontSize: 12,
            lineHeight: "16px",
            color: "rgba(255,255,255,0.55)",
            margin: "4px 0 0",
            fontVariationSettings: '"wdth" 100',
          }}
        >
          {member.subtitle}
        </p>
      </div>
    </div>
  )
}

/* ── Mobile carousel ─────────────────────────────────────── */
function MobileCarousel() {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setActive(
      max > 0 ? Math.round((el.scrollLeft / max) * (team.length - 1)) : 0,
    )
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="sn-track"
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {team.map((m, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: "min(78vw, 320px)",
              scrollSnapAlign: "start",
            }}
          >
            {/* 4:5 photo on mobile */}
            <TeamCard member={m} photoStyle={{ aspectRatio: "4/5" }} />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 20,
        }}
      >
        {team.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 9999,
              background: i === active ? "#3162E0" : "rgba(255,255,255,0.25)",
              transition: "width 0.2s ease, background 0.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────── */
export default function SobreNos() {
  return (
    <section
      id="sobre-nos"
      style={{ width: "100%", paddingTop: 100, paddingBottom: 100 }}
      className="sn-section"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: 80,
          paddingRight: 80,
        }}
        className="sn-wrap"
      >
        {/* ── Top: left + right ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 40,
            marginBottom: 64,
          }}
          className="sn-top"
        >
          {/* Left: pill + H2 */}
          <div style={{ flexShrink: 0 }} className="sn-left">
            {/* Pill */}
            <div
              className="df-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 40px",
                borderRadius: 900,
                background: "#fff",
                border: "4px solid rgba(255,255,255,0.3)",
                boxShadow: "inset 0px 0px 20px 0px rgba(76,141,255,0.3)",
                marginBottom: 50,
              }}
            >
              <img
                src={iconStar}
                alt=""
                width={26}
                height={26}
                style={{ flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: FONT_EXP,
                  fontSize: 24,
                  lineHeight: 1.1,
                  background:
                    "linear-gradient(90deg, #002E80 9%, #3162E0 82%, #002E80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  whiteSpace: "nowrap",
                }}
              >
                SOBRE NÓS
              </span>
            </div>

            {/* H2 */}
            <h2
              style={{
                fontFamily: FONT_EXP,
                fontWeight: 400,
                fontSize: 60,
                lineHeight: "63px",
                margin: 0,
                color: "#fff",
                maxWidth: 477,
              }}
              className="sn-h2"
            >
              Uma equipa
              <br />
              pequena com
              <br />
              <span
                style={{
                  background: "linear-gradient(to bottom, #FFFFFF, #002E80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                resultados grandes.
              </span>
            </h2>
          </div>

          {/* Right: paragraphs + chips */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 30,
              flex: "1 1 0",
              minWidth: 0,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              <p
                style={{
                  fontFamily: FONT_REG,
                  fontWeight: 400,
                  fontSize: 20,
                  lineHeight: "32px",
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  fontVariationSettings: '"wdth" 100',
                }}
                className="sn-body"
              >
                A Digital Fixe nasceu de uma convicção simples: as pequenas e
                médias empresas portuguesas merecem acesso a estratégias
                digitais que antes eram exclusivas das grandes marcas.
              </p>
              <p
                style={{
                  fontFamily: FONT_REG,
                  fontWeight: 400,
                  fontSize: 20,
                  lineHeight: "32px",
                  color: "rgba(255,255,255,0.55)",
                  margin: 0,
                  fontVariationSettings: '"wdth" 100',
                }}
                className="sn-body"
              >
                Não somos uma agência de escala industrial. Cada cliente tem
                atenção direta da nossa equipa, com estratégias construídas
                especificamente para o seu negócio e sector.
              </p>
            </div>

            {/* Value chips — 3 per row desktop/tablet, 2 per row mobile */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
              className="sn-chips"
            >
              {chips.map((chip) => (
                <BotaoFluido
                  key={chip}
                  estatico
                  variante="secundario"
                  tamanho="pequeno"
                  className="sn-chip"
                >
                  <img
                    src={iconChip}
                    alt=""
                    width={22}
                    height={22}
                    style={{ flexShrink: 0 }}
                  />
                  {chip}
                </BotaoFluido>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider with "A EQUIPA" label ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }}
          />
          <span
            style={{
              fontFamily: FONT_REG,
              fontWeight: 400,
              fontSize: 20,
              lineHeight: "16px",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              fontVariationSettings: '"wdth" 100',
            }}
          >
            A Equipa
          </span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }}
          />
        </div>

        {/* ── Team cards: desktop 3-col ── */}
        <div
          className="sn-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {team.map((m) => (
            <TeamCard key={m.name} member={m} photoStyle={{ height: 480 }} />
          ))}
        </div>

        {/* ── Team cards: tablet 3-col square photos ── */}
        <div
          className="sn-grid-tablet"
          style={{
            display: "none",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {team.map((m) => (
            <TeamCard
              key={m.name}
              member={m}
              photoStyle={{ aspectRatio: "3/4" }}
            />
          ))}
        </div>

        {/* ── Mobile carousel ── */}
        <div className="sn-carousel" style={{ display: "none" }}>
          <MobileCarousel />
        </div>
      </div>

      <style>{`
        /* ── Valores: mesmo efeito dos botões, sem levar a lado nenhum ── */
        .sn-chip { width: 100%; box-sizing: border-box; justify-content: flex-start !important; padding: 10px 16px !important;
          font-family: "Special Gothic:Regular", "Special Gothic", sans-serif !important; font-size: 16px !important; }
        .sn-chip > span { display: inline-flex; align-items: center; gap: 8px; }
        /* ── Cartões da equipa (vidro) ── */
        .sn-card { -webkit-tap-highlight-color: transparent; isolation: isolate; }
        .sn-card-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: top; display: block;
          transition: transform .6s cubic-bezier(.16,1,.3,1), filter .6s ease;
        }
        /* degradé azul por baixo do painel (no lugar do tom avermelhado) */
        .sn-card-tint {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to top, rgba(0,46,128,.92) 0%, rgba(49,98,224,.38) 32%, rgba(49,98,224,0) 62%);
        }
        /* tom cinzento-escuro que aparece sobre a foto a preto e branco */
        .sn-card-tint::after {
          content: ""; position: absolute; inset: 0;
          background: rgba(18,20,26,.55);
          opacity: 0; transition: opacity .6s ease;
        }
        .sn-card-glass {
          position: absolute; left: 16px; right: 16px; bottom: 16px;
          padding: 16px; border-radius: 14px; text-align: center;
          background: rgba(10,20,50,.22);
          -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.22);
          transition: border-color .5s ease, box-shadow .5s ease;
        }
        /* ao passar o rato (computador) ou ao tocar/clicar (telemóvel) */
        .sn-card:active .sn-card-img { filter: grayscale(1); transform: rotate(2deg) scale(1.1); }
        .sn-card:active .sn-card-tint::after { opacity: 1; }
        .sn-card:active .sn-card-glass { border-color: rgba(255,255,255,.4); box-shadow: 0 12px 34px -12px rgba(0,0,0,.8); }
        @media (hover: hover) and (pointer: fine) {
          .sn-card:hover .sn-card-img { filter: grayscale(1); transform: rotate(2deg) scale(1.1); }
          .sn-card:hover .sn-card-tint::after { opacity: 1; }
          .sn-card:hover .sn-card-glass { border-color: rgba(255,255,255,.4); box-shadow: 0 12px 34px -12px rgba(0,0,0,.8); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sn-card-img { transition: filter .3s ease; }
          .sn-card:hover .sn-card-img { transform: none; }
        }
        @media (max-width: 1279px) {
          .sn-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .sn-wrap  { padding-left: 40px !important; padding-right: 40px !important; }
          .sn-top   { flex-direction: column !important; gap: 28px !important; margin-bottom: 48px !important; }
          .sn-left  { width: 100% !important; }
          .sn-left > .df-pill { margin-bottom: 32px !important; }
          .sn-h2    { font-size: 42px !important; line-height: 46px !important; max-width: 100% !important; }
          .sn-body  { font-size: 18px !important; line-height: 28px !important; }
          .sn-grid  { display: none !important; }
          .sn-grid-tablet { display: grid !important; }
        }
        @media (max-width: 1023px) {
          .sn-grid-tablet { gap: 12px !important; }
          .sn-card-glass { left: 10px; right: 10px; bottom: 10px; padding: 10px 8px; border-radius: 12px; }
          .sn-card-glass p:first-child { font-size: 16px !important; line-height: 20px !important; }
        }
        @media (max-width: 767px) {
          .sn-section { padding-top: 56px !important; padding-bottom: 56px !important; }
          .sn-wrap    { padding-left: 20px !important; padding-right: 20px !important; }
          .sn-top     { gap: 24px !important; margin-bottom: 40px !important; }
          .sn-left > .df-pill { margin-bottom: 24px !important; }
          .sn-h2      { font-size: 32px !important; line-height: 36px !important; }
          .sn-body    { font-size: 16px !important; line-height: 26px !important; }
          .sn-chips   { grid-template-columns: repeat(2, 1fr) !important; }
          .sn-chip    { font-size: 14px !important; padding: 9px 12px !important; }
          .sn-grid-tablet { display: none !important; }
          .sn-carousel    { display: block !important; }
          .sn-card-glass { left: 12px; right: 12px; bottom: 12px; padding: 14px 12px; }
          .sn-card-glass p:first-child { font-size: 18px !important; line-height: 24px !important; }
          .sn-track { margin: 0 -20px; padding: 0 20px !important; scroll-padding-left: 20px; }
          .sn-track::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </section>
  )
}
