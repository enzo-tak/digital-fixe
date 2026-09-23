import { useEffect, useRef, useState } from "react"
import CartaoInterativo from "./CartaoInterativo"

const iconStar = "/assets/7073f.svg"

const stats = [
  { value: "50+", label: "Projetos concluídos", sub: "em múltiplos sectores" },
  {
    value: "30+",
    label: "Empresas parceiras",
    sub: "com resultados comprovados",
  },
  { value: "80%", label: "Crescimento médio", sub: "de tráfego orgânico" },
  {
    value: "100+",
    label: "Orçamentos gerados",
    sub: "para os nossos clientes",
  },
]

const tagsDarkStrip = [
  "SEO",
  "Google Ads",
  "Web Design",
  "Copywriting",
  "Analytics",
  "SEO Local",
  "Link Building",
  "Estratégia Digital",
]

const tagsLightStrip = [
  "Social Media",
  "Email Marketing",
  "Branding",
  "CRO",
  "UX/UI",
  "Consultoria",
  "Google Shopping",
  "Automação",
]

/* ── Loop Strip ─────────────────────────────────────────────
   Duas faixas cruzadas em X (preta −4°, azul +4°) que
   deslizam em sentidos opostos a 100 px/s.                  */

const LOOP_VELOCITY = 100 // px por segundo

function useLoopDuration(trackRef: React.RefObject<HTMLDivElement>) {
  const [duration, setDuration] = useState(40)
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => {
      const half = el.scrollWidth / 2
      if (half > 0) setDuration(half / LOOP_VELOCITY)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [trackRef])
  return duration
}

function LoopStripBand({
  words,
  variant,
}: {
  words: string[]
  variant: "dark" | "light"
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const duration = useLoopDuration(trackRef)
  const isDark = variant === "dark"
  // Repetir para cobrir ecrãs largos; o loop desloca exatamente metade da faixa.
  const half = [...words, ...words, ...words]
  const items = [...half, ...half]

  return (
    <div
      className="ls-strip"
      style={{
        position: "absolute",
        left: "-10%",
        width: "120%",
        top: "50%",
        height: 80,
        marginTop: -40,
        background: isDark ? "#000" : "#3162E0",
        transform: `rotate(${isDark ? -4 : 4}deg)`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        zIndex: isDark ? 1 : 2,
        boxShadow: isDark ? "none" : "0 10px 40px rgba(0,0,0,0.4)",
      }}
    >
      <div
        ref={trackRef}
        className="ls-track"
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animation: `${
            isDark ? "ls-left" : "ls-right"
          } ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((w, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 20,
              paddingRight: 20,
            }}
          >
            <span
              className="ls-word"
              style={{
                fontFamily: '"Special Gothic:Medium", sans-serif',
                fontWeight: 500,
                fontSize: 22,
                lineHeight: "28px",
                color: isDark ? "rgba(255,255,255,0.85)" : "#fff",
                whiteSpace: "nowrap",
                fontVariationSettings: '"wdth" 100',
              }}
            >
              {w}
            </span>
            <span
              aria-hidden
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: isDark ? "#4C8DFF" : "rgba(255,255,255,0.8)",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

function LoopStrip({ dark, light }: { dark: string[]; light: string[] }) {
  return (
    <div
      className="ls-wrap"
      role="img"
      aria-label={[...dark, ...light].join(", ")}
      style={{
        position: "relative",
        width: "100%",
        height: 242,
        overflow: "hidden",
      }}
    >
      <LoopStripBand words={dark} variant="dark" />
      <LoopStripBand words={light} variant="light" />
    </div>
  )
}

export default function PropostaDeValor() {
  return (
    <section
      id="proposta"
      style={{ width: "100%", paddingTop: 100, paddingBottom: 0 }}
      className="pv-section"
    >
      {/* Main content area */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: 80,
          paddingRight: 80,
          display: "flex",
          alignItems: "center",
          gap: 40,
          marginBottom: 40,
        }}
        className="pv-container"
      >
        {/* Left: text */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
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
              marginBottom: 32,
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
                fontFamily: '"Special Gothic Expanded One:Regular", sans-serif',
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
              PROPOSTA DE VALOR
            </span>
          </div>

          {/* H2 */}
          <h2
            style={{
              fontFamily: '"Special Gothic Expanded One:Regular", sans-serif',
              fontWeight: 400,
              fontSize: 60,
              lineHeight: "63px",
              margin: "0 0 28px",
              color: "#fff",
            }}
            className="pv-h2"
          >
            Presença digital
            <br />
            que gera
            <br />
            <span
              style={{
                background: "linear-gradient(to bottom, #FFFFFF, #002E80)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              resultados{" "}
            </span>
            <span
              style={{
                background: "linear-gradient(to bottom, #FFFFFF, #002E80)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}
            >
              reais.
            </span>
          </h2>

          {/* Paragraph */}
          <p
            style={{
              fontFamily: '"Special Gothic:Regular", sans-serif',
              fontWeight: 400,
              fontSize: 20,
              lineHeight: "32px",
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 28px",
              maxWidth: 450,
              fontVariationSettings: '"wdth" 100',
            }}
            className="pv-body"
          >
            Não fazemos marketing pelo marketing. Cada ação que implementamos
            tem um único objetivo: trazer mais clientes ao seu negócio.
          </p>

          {/* Link */}
          <a
            href="#servicos"
            className="pv-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: '"Special Gothic:SemiBold", sans-serif',
                fontWeight: 600,
                fontSize: 20,
                lineHeight: "20px",
                color: "#4C8DFF",
                fontVariationSettings: '"wdth" 100',
                whiteSpace: "nowrap",
              }}
            >
              CONHECER OS SERVIÇOS
            </span>
            <span
              style={{
                fontFamily: '"Special Gothic:SemiBold", sans-serif',
                fontWeight: 600,
                fontSize: 14,
                lineHeight: "20px",
                color: "#4C8DFF",
                fontVariationSettings: '"wdth" 100',
              }}
            >
              →
            </span>
          </a>
        </div>

        {/* Right: 2×2 stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: 15,
            flexShrink: 0,
            width: 560,
          }}
          className="pv-grid"
        >
          {stats.map((s) => (
            <CartaoInterativo
              key={s.value}
              background="rgba(44,53,76,0.25)"
              border="1.5px solid #002E80"
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily:
                    '"Special Gothic Expanded One:Regular", sans-serif',
                  fontSize: 48,
                  lineHeight: "48px",
                  background: "linear-gradient(to bottom, #FFFFFF, #002E80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                className="pv-stat-num ci-pop"
              >
                {s.value}
              </span>
              <span
                style={{
                  fontFamily: '"Special Gothic:Medium", sans-serif',
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "20px",
                  color: "#fff",
                  fontVariationSettings: '"wdth" 100',
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontFamily: '"Special Gothic:Regular", sans-serif',
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "16px",
                  color: "rgba(255,255,255,0.55)",
                  fontVariationSettings: '"wdth" 100',
                }}
              >
                {s.sub}
              </span>
            </CartaoInterativo>
          ))}
        </div>
      </div>

      {/* Loop Strip — palavras-chave em faixas cruzadas */}
      <LoopStrip dark={tagsDarkStrip} light={tagsLightStrip} />

      {/* Bottom padding after strips */}
      <div style={{ height: 40 }} />

      <style>{`
        @keyframes ls-left  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes ls-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
          .ls-track { animation: none !important; }
        }
        @media (max-width: 1279px) {
          .pv-section { padding-top: 80px !important; }
          .pv-container {
            padding-left: 40px !important;
            padding-right: 40px !important;
            gap: 32px !important;
          }
          .pv-grid { width: 440px !important; gap: 12px !important; }
          .pv-h2 { font-size: 42px !important; line-height: 46px !important; }
          .pv-body { font-size: 18px !important; line-height: 28px !important; }
          .pv-stat-num { font-size: 40px !important; line-height: 40px !important; }
        }
        @media (max-width: 1023px) {
          .pv-container { flex-direction: column !important; align-items: stretch !important; }
          .pv-container > div:first-child { width: 100%; }
          .pv-body { max-width: 560px !important; }
          .pv-grid { width: 100% !important; gap: 15px !important; }
        }
        @media (max-width: 767px) {
          .pv-section { padding-top: 56px !important; }
          .pv-container {
            padding-left: 20px !important;
            padding-right: 20px !important;
            margin-bottom: 8px !important;
            gap: 28px !important;
          }
          .pv-h2 { font-size: 32px !important; line-height: 36px !important; }
          .pv-body { font-size: 16px !important; line-height: 26px !important; }
          .pv-link span:first-child { font-size: 16px !important; }
          .pv-grid { gap: 10px !important; }
          .pv-grid .ci-content { padding: 18px 16px !important; gap: 6px !important; }
          .pv-stat-num { font-size: 32px !important; line-height: 34px !important; }
          .ls-wrap { height: 170px !important; }
          .ls-strip { height: 52px !important; margin-top: -26px !important; }
          .ls-word { font-size: 16px !important; line-height: 20px !important; }
        }
      `}</style>
    </section>
  )
}

