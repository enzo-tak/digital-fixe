import { useEffect, useRef, useState } from "react"
import CartaoInterativo from "./CartaoInterativo"

const FONT_EXP = '"Special Gothic Expanded One:Regular", sans-serif'
const FONT_REG = '"Special Gothic:Regular", sans-serif'

/* ── Stats "Glow" ──────────────────────────────────────────────
   4 cartões de vidro com halo azul e a mesma interação 3D dos
   cartões da Proposta de Valor (CartaoInterativo). Cada número
   tem um mini-gráfico que se desenha quando a faixa entra no ecrã. */

interface Stat {
  eyebrow: string
  prefix: string
  value: number
  suffix: string
  decimals: number
  label: string
  viz: "cols" | "comet" | "dots" | "stars"
}

const stats: Stat[] = [
  {
    eyebrow: "Tráfego",
    prefix: "+",
    value: 80,
    suffix: "%",
    decimals: 0,
    label: "Aumento médio de tráfego",
    viz: "cols",
  },
  {
    eyebrow: "Visibilidade",
    prefix: "+",
    value: 110,
    suffix: "%",
    decimals: 0,
    label: "Visibilidade de marca",
    viz: "comet",
  },
  {
    eyebrow: "Orçamentos",
    prefix: "",
    value: 100,
    suffix: "+",
    decimals: 0,
    label: "Pedidos de orçamento gerados",
    viz: "dots",
  },
  {
    eyebrow: "Avaliação",
    prefix: "",
    value: 4.9,
    suffix: "★",
    decimals: 1,
    label: "Avaliação média pelos clientes",
    viz: "stars",
  },
]

function useCountUp(target: number, decimals: number, active: boolean) {
  const [display, setDisplay] = useState(0)
  const raf = useRef<number | null>(null)
  useEffect(() => {
    if (!active) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target)
      return
    }
    const duration = 1500
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(parseFloat((eased * target).toFixed(decimals)))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [active, target, decimals])
  return display
}

/* ── Mini-gráficos ─────────────────────────────────────────── */

function VizCols() {
  const W = 260,
    H = 112,
    vals = [22, 30, 38, 34, 52, 72],
    n = vals.length,
    gap = 10
  const bw = (W - gap * (n - 1)) / n
  const pts = vals.map((v, i) => {
    const h = (v / 80) * (H - 30)
    return {
      x: i * (bw + gap),
      y: H - h,
      h,
      cx: i * (bw + gap) + bw / 2,
      cy: H - h - 12 - (i === n - 1 ? 4 : 0),
    }
  })
  const d = "M" + pts.map((p) => `${p.cx} ${p.cy}`).join(" L")
  const last = pts[n - 1]
  return (
    <>
      <div className="sb-viz">
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          {pts.map((p, i) => (
            <rect
              key={i}
              x={p.x}
              y={p.y}
              width={bw}
              height={p.h}
              rx={6}
              className={`sb-col${i === n - 1 ? " hi" : ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            />
          ))}
          <path d={d} className="sb-line" pathLength={1} />
          <circle cx={last.cx} cy={last.cy} r={5} className="sb-dot" />
          <g
            className="sb-tip"
            transform={`translate(${last.cx} ${last.cy - 12})`}
          >
            <rect x={-26} y={-22} width={52} height={22} rx={7} />
            <text x={0} y={-7} textAnchor="middle">
              +80%
            </text>
          </g>
        </svg>
      </div>
      <div className="sb-axis">
        <span>M1</span>
        <span>M2</span>
        <span>M3</span>
        <span>M4</span>
        <span>M5</span>
        <span className="hi">M6</span>
      </div>
    </>
  )
}

function VizComet() {
  const d = "M4 96 C 60 94, 90 84, 130 74 S 200 46, 240 30 S 250 20, 256 16"
  return (
    <>
      <div className="sb-viz">
        <svg viewBox="0 0 260 112" aria-hidden="true">
          <defs>
            <linearGradient id="sb-comet-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4C8DFF" stopOpacity="0.35" />
              <stop offset="1" stopColor="#4C8DFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[52, 104, 156, 208].map((x) => (
            <line
              key={x}
              x1={x}
              y1={0}
              x2={x}
              y2={112}
              stroke="rgba(255,255,255,0.05)"
            />
          ))}
          <path
            d={`${d} L256 112 L4 112 Z`}
            fill="url(#sb-comet-fill)"
            className="sb-area"
          />
          <path d={d} className="sb-line" pathLength={1} />
          <circle
            r={4}
            className="sb-comet"
            style={{ offsetPath: `path("${d}")` } as React.CSSProperties}
          />
        </svg>
      </div>
      <div className="sb-axis">
        <span>ANTES</span>
        <span className="hi">DEPOIS</span>
      </div>
    </>
  )
}

function VizDots() {
  return (
    <div className="sb-dots" aria-hidden="true">
      {Array.from({ length: 80 }, (_, i) => (
        <i key={i} style={{ transitionDelay: `${300 + i * 12}ms` }} />
      ))}
    </div>
  )
}

const STAR_PATH =
  "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"
function VizStars() {
  return (
    <>
      <div className="sb-stars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, 4.9 - i))
          return (
            <span key={i} className="sb-star">
              <svg viewBox="0 0 24 24">
                <path
                  d={STAR_PATH}
                  fill="rgba(255,255,255,0.07)"
                  stroke="rgba(169,201,255,0.35)"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                className="sb-star-f"
                style={
                  {
                    ["--sb-fill" as string]: `${100 - fill * 100}%`,
                    transitionDelay: `${300 + i * 140}ms`,
                  } as React.CSSProperties
                }
              >
                <defs>
                  <linearGradient id={`sb-sg${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fff" />
                    <stop offset="1" stopColor="#7FA8FF" />
                  </linearGradient>
                </defs>
                <path d={STAR_PATH} fill={`url(#sb-sg${i})`} />
              </svg>
            </span>
          )
        })}
      </div>
      <div className="sb-reviews">
        <span className="sb-avs">
          <i />
          <i />
          <i />
        </span>
        Clientes reais no Google
      </div>
    </>
  )
}

/* ── Cartão ─────────────────────────────────────────────────── */

function StatCard({
  stat,
  active,
  idx,
}: {
  stat: Stat
  active: boolean
  idx: number
}) {
  const count = useCountUp(stat.value, stat.decimals, active)
  const formatted =
    stat.decimals > 0
      ? count.toFixed(stat.decimals)
      : Math.round(count).toString()

  return (
    <div className="sb-halo">
      <CartaoInterativo
        radius={24}
        background="radial-gradient(120% 80% at 85% -10%, rgba(169,201,255,0.16), transparent 55%), linear-gradient(160deg, #1a1f2e 0%, #0e121c 45%, #0a0d14 100%)"
        border="1px solid rgba(169,201,255,0.18)"
        style={{
          padding: "22px 22px 18px",
          display: "flex",
          flexDirection: "column",
          minHeight: 300,
        }}
      >
        <div className="sb-twinkle" aria-hidden="true">
          <i style={{ top: "16%", left: `${74 + idx * 3}%` }} />
          <i
            style={{
              top: "30%",
              left: `${88 - idx * 2}%`,
              animationDelay: `${-1.2 * (idx + 1)}s`,
            }}
          />
        </div>

        <span className="sb-eyebrow">{stat.eyebrow}</span>
        <span className="sb-num ci-pop" style={{ fontFamily: FONT_EXP }}>
          {stat.prefix}
          {formatted}
          {stat.suffix}
        </span>
        <span className="sb-label" style={{ fontFamily: FONT_REG }}>
          {stat.label}
        </span>

        <div className="sb-bottom">
          {stat.viz === "cols" && <VizCols />}
          {stat.viz === "comet" && <VizComet />}
          {stat.viz === "dots" && <VizDots />}
          {stat.viz === "stars" && <VizStars />}
        </div>
      </CartaoInterativo>
    </div>
  )
}

export default function StatsBand() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      style={{ width: "100%", paddingTop: 20, paddingBottom: 100 }}
      className="sb-section"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: 80,
          paddingRight: 80,
          position: "relative",
        }}
        className={`sb-wrap${active ? " sb-in" : ""}`}
        ref={ref}
      >
        <div className="sb-gridbg" aria-hidden="true" />
        <div className="sb-cards">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} active={active} idx={i} />
          ))}
        </div>
      </div>

      <style>{`
        .sb-gridbg { position: absolute; inset: -60px 0; pointer-events: none;
          background-image: linear-gradient(rgba(127,176,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(127,176,255,.05) 1px, transparent 1px);
          background-size: 64px 64px;
          -webkit-mask: radial-gradient(ellipse at center, #000 30%, transparent 75%); mask: radial-gradient(ellipse at center, #000 30%, transparent 75%); }
        .sb-cards { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .sb-halo { position: relative; }
        .sb-halo::before { content: ""; position: absolute; inset: -24px -10px -40px; border-radius: 40px; z-index: -1; pointer-events: none;
          background: radial-gradient(60% 55% at 50% 60%, rgba(76,141,255,.35), transparent 70%); filter: blur(24px); }
        .sb-halo .ci-card { box-shadow: 0 1px 0 rgba(255,255,255,.08) inset, 0 30px 80px -20px rgba(76,141,255,.45); }
        .sb-halo .ci-bg { overflow: hidden; }

        .sb-twinkle { position: absolute; inset: 0; pointer-events: none; }
        .sb-twinkle i { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #fff; opacity: .2; animation: sb-tw 3.4s ease-in-out infinite; }
        @keyframes sb-tw { 50% { opacity: .9; } }

        .sb-eyebrow { font-family: "Special Gothic:SemiBold", sans-serif; font-weight: 600; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: #A9C9FF; }
        .sb-num { display: block; font-size: 52px; line-height: 1; margin: 12px 0 8px; white-space: nowrap;
          background: linear-gradient(180deg, #fff 30%, #9dbcff 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .sb-label { font-size: 15px; line-height: 20px; color: rgba(255,255,255,.45); }
        .sb-bottom { margin-top: auto; padding-top: 18px; }

        .sb-viz { height: 112px; }
        .sb-viz svg { display: block; width: 100%; height: 100%; overflow: visible; }
        .sb-axis { display: flex; justify-content: space-between; margin-top: 8px; font-family: "Special Gothic:SemiBold", sans-serif; font-weight: 600; font-size: 10px; letter-spacing: .1em; color: rgba(255,255,255,.3); }
        .sb-axis .hi { color: #fff; }

        .sb-col { fill: rgba(255,255,255,.04); stroke: rgba(255,255,255,.08); transform-box: fill-box; transform-origin: bottom; transform: scaleY(0);
          transition: transform 1s cubic-bezier(.16,1,.3,1); }
        .sb-col.hi { fill: rgba(169,201,255,.16); stroke: rgba(169,201,255,.5); }
        .sb-line { fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
          filter: drop-shadow(0 0 4px rgba(169,201,255,.9)) drop-shadow(0 0 10px rgba(76,141,255,.7));
          stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.6s cubic-bezier(.65,0,.35,1) .35s; }
        .sb-dot { fill: #0a0d14; stroke: #fff; stroke-width: 2; opacity: 0; transition: opacity .4s 1.7s; }
        .sb-tip { opacity: 0; transition: opacity .4s 1.8s; }
        .sb-tip rect { fill: #a9c6ff; filter: drop-shadow(0 0 6px rgba(76,141,255,.9)); }
        .sb-tip text { font-family: "Special Gothic:SemiBold", sans-serif; font-weight: 600; font-size: 12px; fill: #0a1440; }
        .sb-area { opacity: 0; transition: opacity 1s .9s; }
        .sb-comet { fill: #fff; filter: drop-shadow(0 0 6px #fff) drop-shadow(0 0 14px #4C8DFF); opacity: 0; offset-rotate: 0deg; }

        .sb-dots { display: grid; grid-template-columns: repeat(20, 1fr); gap: 5px; padding: 6px 0 4px; }
        .sb-dots i { aspect-ratio: 1; border-radius: 50%; background: rgba(255,255,255,.08); transition: background .3s ease, box-shadow .3s ease; }

        .sb-stars { display: flex; gap: 8px; margin-bottom: 12px; }
        .sb-star { position: relative; width: 34px; height: 34px; }
        .sb-star svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .sb-star-f { clip-path: inset(0 100% 0 0); transition: clip-path .7s cubic-bezier(.16,1,.3,1); filter: drop-shadow(0 0 6px rgba(169,201,255,.9)); }
        .sb-reviews { display: flex; align-items: center; gap: 10px; font-family: "Special Gothic:Regular", sans-serif; font-size: 12px; color: rgba(255,255,255,.45); }
        .sb-avs { display: flex; }
        .sb-avs i { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #0e121c; margin-left: -6px; background: linear-gradient(135deg, #3162E0, #A9C9FF); }
        .sb-avs i:first-child { margin-left: 0; }
        .sb-avs i:nth-child(2) { background: linear-gradient(135deg, #002E80, #4C8DFF); }
        .sb-avs i:nth-child(3) { background: linear-gradient(135deg, #4C8DFF, #fff); }

        .sb-note { position: relative; margin: 28px 0 0; text-align: center; font-size: 12px; color: rgba(255,255,255,.25); }

        /* estado "entrou no ecrã" */
        .sb-in .sb-col { transform: scaleY(1); }
        .sb-in .sb-line { stroke-dashoffset: 0; }
        .sb-in .sb-dot, .sb-in .sb-tip, .sb-in .sb-area { opacity: 1; }
        .sb-in .sb-comet { animation: sb-comet 2.4s cubic-bezier(.65,0,.35,1) .3s forwards; }
        .sb-in .sb-dots i { background: #A9C9FF; box-shadow: 0 0 6px rgba(76,141,255,.9); }
        .sb-in .sb-star-f { clip-path: inset(0 var(--sb-fill) 0 0); }
        @keyframes sb-comet { 0% { opacity: 0; offset-distance: 0%; } 8% { opacity: 1; } 100% { opacity: 1; offset-distance: 100%; } }

        @media (max-width: 1279px) {
          .sb-section { padding-bottom: 80px !important; }
          .sb-wrap { padding-left: 40px !important; padding-right: 40px !important; }
          .sb-cards { grid-template-columns: 1fr 1fr; gap: 24px; }
          .sb-halo .ci-content { min-height: 260px !important; }
        }
        @media (max-width: 767px) {
          .sb-wrap { padding-left: 20px !important; padding-right: 20px !important; }
          .sb-cards { grid-template-columns: 1fr; gap: 20px; }
          .sb-section { padding-top: 8px !important; padding-bottom: 56px !important; }
          .sb-cards { gap: 16px; }
          .sb-num { font-size: 42px; }
          .sb-halo .ci-content { min-height: 0 !important; padding: 20px 18px 16px !important; }
          .sb-viz { height: 92px; }
          .sb-dots { gap: 4px; max-width: 320px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-col, .sb-line, .sb-dot, .sb-tip, .sb-area, .sb-dots i, .sb-star-f { transition: none !important; }
          .sb-twinkle i { animation: none; }
          .sb-in .sb-comet { animation: none; opacity: 1; offset-distance: 100%; }
        }
      `}</style>
    </section>
  )
}

