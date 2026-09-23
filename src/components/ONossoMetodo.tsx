import { CaminhoMetodo, TrilhoMetodo } from "./CaminhoMetodo"

const iconStar = "/assets/7073f.svg"
const iconCard1 = "/assets/13586.svg"
const iconCard2 = "/assets/7fdcb.svg"
const iconCard3 = "/assets/407b2.svg"
const iconCard4 = "/assets/d448d.svg"

const FONT_EXP = '"Special Gothic Expanded One:Regular", sans-serif'
const FONT_REG = '"Special Gothic:Regular", sans-serif'

const H3_GRADIENT =
  "linear-gradient(178.79deg, #002E80 34.226%, #4C8DFF 92.148%)"

const steps = [
  {
    num: "01",
    icon: iconCard1,
    iconW: 30,
    iconH: 23,
    title: "Diagnóstico Gratuito",
    body: "Analisamos a sua presença no Google, sem custo e sem compromisso. Identificamos onde está a perder oportunidades.",
  },
  {
    num: "02",
    icon: iconCard2,
    iconW: 24,
    iconH: 24,
    title: "Estratégia à Medida",
    body: "Criamos um plano de ação focado no que realmente traz resultados para o seu negócio e sector.",
  },
  {
    num: "03",
    icon: iconCard3,
    iconW: 20,
    iconH: 24,
    title: "Execução Passo a Passo",
    body: "A nossa equipa trata de tudo, do perfil às páginas locais, sempre em contacto consigo. Sem burocracia.",
  },
  {
    num: "04",
    icon: iconCard4,
    iconW: 25,
    iconH: 25,
    title: "Resultados e Acompanhamento",
    body: "Relatórios simples, sem jargão técnico, para ver a evolução mês a mês. Transparência total.",
  },
]

/* ── Card ───────────────────────────────────────────────── */
function StepCard({ step }: { step: typeof steps[0] }) {
  return (
    <div
      style={{
        background: "rgba(44,53,76,0.18)",
        border: "1.5px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Icon + Number row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            background: "rgba(0,46,128,0.4)",
            border: "1.215px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={step.icon}
            alt=""
            width={step.iconW}
            height={step.iconH}
            style={{ opacity: 0.8, display: "block" }}
          />
        </div>
        <span
          style={{
            fontFamily: FONT_EXP,
            fontSize: 30,
            lineHeight: "36px",
            background: "linear-gradient(to bottom, #FFFFFF, #002E80)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {step.num}
        </span>
      </div>

      {/* H3 */}
      <h3
        style={{
          fontFamily: FONT_EXP,
          fontWeight: 400,
          fontSize: 20,
          lineHeight: "28px",
          background: H3_GRADIENT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: 0,
        }}
      >
        {step.title}
      </h3>

      {/* Paragraph */}
      <p
        style={{
          fontFamily: FONT_REG,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "20px",
          color: "rgba(255,255,255,0.45)",
          margin: 0,
          fontVariationSettings: '"wdth" 100',
        }}
      >
        {step.body}
      </p>
    </div>
  )
}

/* ── Diamond SVG marker ─────────────────────────────────── */
function Diamond({ x, y, size = 8 }: { x: number; y: number; size?: number }) {
  return (
    <polygon
      points={`${x},${y - size / 2} ${x + size / 2},${y} ${x},${y + size / 2} ${x - size / 2},${y}`}
      fill="#3162E0"
      opacity={0.85}
    />
  )
}

/* ── Desktop staircase ──────────────────────────────────── */
const CARD_W = 272
const CARD_H = 290 // altura dos cartões (cabe o texto mais longo)
const X_STEP = 284 // horizontal offset per card
const Y_STEP = 150 // vertical offset per card
const SVG_W = X_STEP * 3 + CARD_W // 1124
const SVG_H = Y_STEP * 3 + 266 // 716 — mantém a geometria das curvas

// Connector anchor points: right-edge diamond → top-area diamond of next card
function connectorAnchors(idx: number) {
  const sx = X_STEP * idx + CARD_W // right edge of card idx
  const sy = Y_STEP * idx + 40 // 40px from card top
  const ex = X_STEP * (idx + 1) + CARD_W * 0.48 // ~middle of next card top
  const ey = Y_STEP * (idx + 1) // top of next card
  return { sx, sy, ex, ey }
}

function StaircaseSVG() {
  return (
    <svg
      width={SVG_W}
      height={SVG_H}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      overflow="visible"
    >
      {[0, 1, 2].map((i) => {
        const { sx, sy, ex, ey } = connectorAnchors(i)
        const cp1x = sx + 70,
          cp1y = sy
        const cp2x = ex - 30,
          cp2y = ey - 40
        return (
          <g key={i}>
            <path
              d={`M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`}
              fill="none"
              stroke="rgba(76,141,255,0.3)"
              strokeWidth={1.5}
            />
            <Diamond x={sx} y={sy} />
            <Diamond x={ex} y={ey} />
          </g>
        )
      })}
    </svg>
  )
}

/* ── Main component ─────────────────────────────────────── */
export default function ONossoMetodo() {
  return (
    <section
      id="metodo"
      style={{ width: "100%", paddingTop: 100, paddingBottom: 100 }}
      className="met-section"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: 80,
          paddingRight: 80,
        }}
        className="met-wrap"
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
            marginBottom: 72,
          }}
          className="met-header"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 50,
              flexShrink: 0,
            }}
          >
            {/* Pill */}
            <div className="df-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 40px",
                borderRadius: 900,
                background: "#fff",
                border: "4px solid rgba(255,255,255,0.3)",
                boxShadow: "inset 0px 0px 20px 0px rgba(76,141,255,0.3)",
                alignSelf: "flex-start",
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
                O NOSSO MÉTODO
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
              }}
              className="met-h2"
            >
              Simples, direto
              <br />
              <span
                style={{
                  background: "linear-gradient(to bottom, #FFFFFF, #002E80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                e sem surpresas.
              </span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: FONT_REG,
              fontWeight: 400,
              fontSize: 20,
              lineHeight: "32px",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              maxWidth: 384,
              fontVariationSettings: '"wdth" 100',
            }}
            className="met-para"
          >
            Do primeiro contacto aos primeiros resultados em 4 passos. Sem
            burocracia e sem complicações.
          </p>
        </div>

        {/* ── Desktop staircase ── */}
        <div
          className="met-staircase"
          style={{
            position: "relative",
            width: SVG_W,
            height: SVG_H,
            marginBottom: CARD_H - 266,
          }}
        >
          <CaminhoMetodo />
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`metodo-card metodo-card-${i + 1}`}
              style={{
                position: "absolute",
                left: X_STEP * i,
                top: Y_STEP * i,
                width: CARD_W,
                height: CARD_H,
                zIndex: 1,
              }}
            >
              <StepCard step={step} />
            </div>
          ))}
        </div>

        {/* ── Tablet 2×2 grid ── */}
        <div
          className="met-grid"
          style={{
            display: "none",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {steps.map((step, i) => (
            <div key={step.num} className={`metodo-card metodo-card-${i + 1}`}>
              <StepCard step={step} />
            </div>
          ))}
        </div>

        {/* ── Mobile timeline ── */}
        <div
          className="met-timeline"
          style={{ display: "none", position: "relative", paddingLeft: 36 }}
        >
          <TrilhoMetodo />
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`metodo-card metodo-card-${i + 1}`}
              style={{
                position: "relative",
                marginBottom: i < steps.length - 1 ? 24 : 0,
              }}
            >
              <StepCard step={step} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1279px) {
          .met-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .met-wrap   { padding-left: 40px !important; padding-right: 40px !important; }
          .met-header { margin-bottom: 48px !important; }
          .met-header > div:first-child { gap: 32px !important; }
          .met-para   { font-size: 18px !important; line-height: 28px !important; max-width: 360px !important; }
          .met-h2     { font-size: 42px !important; line-height: 46px !important; }
          .met-staircase { display: none !important; }
          .met-grid   { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 1023px) {
          .met-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .met-para   { max-width: 560px !important; }
          .met-grid   { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 767px) {
          .met-section { padding-top: 56px !important; padding-bottom: 56px !important; }
          .met-wrap    { padding-left: 20px !important; padding-right: 20px !important; }
          .met-header  { margin-bottom: 32px !important; }
          .met-header > div:first-child { gap: 24px !important; }
          .met-h2      { font-size: 32px !important; line-height: 36px !important; }
          .met-para    { font-size: 16px !important; line-height: 26px !important; }
          .met-grid    { display: none !important; }
          .met-timeline { display: block !important; padding-left: 30px !important; }
          .met-timeline .metodo-card { margin-bottom: 14px !important; }
          .met-timeline .metodo-card:last-child { margin-bottom: 0 !important; }
          .met-timeline .metodo-card > div { padding: 18px !important; gap: 12px !important; }
          .met-timeline h3 { font-size: 18px !important; line-height: 24px !important; }
          .met-timeline p { font-size: 15px !important; line-height: 21px !important; }
        }
      `}</style>
    </section>
  )
}

