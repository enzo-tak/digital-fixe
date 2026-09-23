import { useEffect, useRef } from "react"
import BotaoFluido from "./BotaoFluido"

/* ── Night Sky ──────────────────────────────────────────────
   Céu estrelado discreto atrás da Hero: estrelas a piscar
   (mais concentradas do lado do funil) e cometas azuis
   ocasionais que passam só do lado direito.                 */

const STAR_COUNT = 48

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const STARS = (() => {
  const rnd = seeded(20260919)
  return Array.from({ length: STAR_COUNT }, (_, i) => {
    // ~75% das estrelas do lado do funil (direita), o resto espalhado e mais ténue
    const right = i % 4 !== 0
    const x = right ? 48 + rnd() * 52 : rnd() * 48
    const y = rnd() * 92
    const size = 1 + rnd() * 1.5
    const o = (right ? 0.45 : 0.25) + rnd() * 0.35
    const dur = 2 + rnd() * 3
    const delay = -rnd() * 5
    return { x, y, size, o, dur, delay }
  })
})()

const COMETS = [
  { left: "92%", top: "6%", delay: "3s" },
  { left: "78%", top: "-2%", delay: "16s" },
]

function NightSky() {
  return (
    <div
      aria-hidden
      className="ns-sky"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: -80,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background:
          "linear-gradient(to bottom, rgba(10,14,39,0.9) 0%, rgba(10,14,39,0.35) 55%, rgba(10,13,20,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 75%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, #000 75%, transparent 100%)",
      }}
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="ns-star"
          style={
            {
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 2px rgba(255,255,255,0.8)",
              ["--o" as string]: s.o,
              opacity: s.o,
              animation: `ns-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}

      {COMETS.map((c, i) => (
        <span
          key={i}
          className="ns-comet"
          style={{
            position: "absolute",
            left: c.left,
            top: c.top,
            width: 140,
            height: 2,
            borderRadius: 2,
            background:
              "linear-gradient(to right, #4C8DFF, rgba(76,141,255,0))",
            opacity: 0,
            transformOrigin: "left center",
            animation: `ns-comet 26s linear ${c.delay} infinite`,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: -2,
              top: -1,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 10px #4C8DFF, 0 0 20px #4C8DFF",
            }}
          />
        </span>
      ))}

      <style>{`
        @keyframes ns-twinkle {
          0%, 100% { opacity: calc(var(--o) * 0.25); }
          50%      { opacity: var(--o); }
        }
        @keyframes ns-comet {
          0%   { transform: rotate(-32deg) translateX(0);      opacity: 0; }
          0.8% { opacity: 0.9; }
          3.2% { opacity: 0.9; }
          4%   { transform: rotate(-32deg) translateX(-460px); opacity: 0; }
          100% { transform: rotate(-32deg) translateX(-460px); opacity: 0; }
        }
        @media (max-width: 767px) {
          .ns-comet { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ns-star  { animation: none !important; }
          .ns-comet { display: none; }
        }
      `}</style>
    </div>
  )
}

/* ── Funil ──────────────────────────────────────────────────
   5 etapas (Visibilidade → Visita → Contacto → Cliente →
   Fidelização). Ícones e pesquisas caem no topo, descem como
   um ponto azul e saem no fundo com um selo ✓ de novo cliente. */

const SVG_NS = "http://www.w3.org/2000/svg"
const TOP_Y = 220
const BOTTOM_Y = 665

type Attrs = Record<string, string | number>
function mk(tag: string, attrs: Attrs, parent?: Element) {
  const e = document.createElementNS(SVG_NS, tag)
  for (const k in attrs) e.setAttribute(k, String(attrs[k]))
  if (parent) parent.appendChild(e)
  return e
}

const GLYPHS: Record<string, (g: SVGGElement) => void> = {
  pessoa: (g) => {
    mk("circle", { cy: -2.5, r: 6.25, fill: "#fff" }, g)
    mk(
      "path",
      { d: "M -8.75 13 Q -8.75 7 0 7 Q 8.75 7 8.75 13 Z", fill: "#fff" },
      g,
    )
  },
  lupa: (g) => {
    mk(
      "circle",
      {
        cx: -2.5,
        cy: -2.5,
        r: 6.5,
        fill: "none",
        stroke: "#fff",
        "stroke-width": 2.2,
      },
      g,
    )
    mk(
      "line",
      {
        x1: 2.5,
        y1: 2.5,
        x2: 8.5,
        y2: 8.5,
        stroke: "#fff",
        "stroke-width": 2.6,
        "stroke-linecap": "round",
      },
      g,
    )
  },
  cursor: (g) => {
    mk(
      "path",
      {
        d: "M -6 -10 L 7 1 L 1.5 2 L 4.5 8.5 L 1.5 9.8 L -1.5 3.4 L -6 7.5 Z",
        fill: "#fff",
      },
      g,
    )
  },
  telemovel: (g) => {
    mk(
      "rect",
      {
        x: -5.5,
        y: -10,
        width: 11,
        height: 20,
        rx: 2.5,
        fill: "none",
        stroke: "#fff",
        "stroke-width": 1.8,
      },
      g,
    )
    mk(
      "line",
      {
        x1: -1.8,
        y1: 6.5,
        x2: 1.8,
        y2: 6.5,
        stroke: "#fff",
        "stroke-width": 1.6,
        "stroke-linecap": "round",
      },
      g,
    )
  },
  estrela: (g) => {
    const pts: string[] = []
    for (let k = 0; k < 10; k++) {
      const r = k % 2 ? 3.6 : 8.6,
        a = -Math.PI / 2 + (k * Math.PI) / 5
      pts.push(
        (r * Math.cos(a)).toFixed(2) + "," + (r * Math.sin(a) + 0.6).toFixed(2),
      )
    }
    mk("polygon", { points: pts.join(" "), fill: "#fff" }, g)
  },
  email: (g) => {
    mk(
      "rect",
      {
        x: -8.5,
        y: -6.5,
        width: 17,
        height: 13,
        rx: 2,
        fill: "none",
        stroke: "#fff",
        "stroke-width": 1.8,
      },
      g,
    )
    mk(
      "path",
      {
        d: "M -8 -5.5 L 0 1 L 8 -5.5",
        fill: "none",
        stroke: "#fff",
        "stroke-width": 1.8,
        "stroke-linejoin": "round",
      },
      g,
    )
  },
}
const ICONS = [
  "pessoa",
  "pessoa",
  "pessoa",
  "lupa",
  "cursor",
  "telemovel",
  "estrela",
  "email",
]
const QUERIES = [
  "dentista em lisboa",
  "canalizador porto",
  "restaurante perto de mim",
  "advogado em braga",
  "clínica em faro",
  "ginásio coimbra",
  "eletricista setúbal",
]

function iconBadge(kind: string) {
  const g = mk("g", {}) as SVGGElement
  mk("circle", { r: 20, fill: "rgba(76,141,255,0.18)" }, g)
  mk(
    "circle",
    {
      r: 17.5,
      fill: "rgba(10,13,20,0.35)",
      stroke: "rgba(160,195,255,0.9)",
      "stroke-width": 1,
    },
    g,
  )
  GLYPHS[kind](g)
  return g
}
function searchPill(q: string) {
  const g = mk("g", {}) as SVGGElement
  const w = 44 + q.length * 8.4
  mk(
    "rect",
    {
      x: -w / 2,
      y: -17,
      width: w,
      height: 34,
      rx: 17,
      fill: "rgba(10,13,20,0.9)",
      stroke: "rgba(127,176,255,0.65)",
    },
    g,
  )
  const lg = mk(
    "g",
    { transform: `translate(${-w / 2 + 19} 0) scale(0.62)` },
    g,
  ) as SVGGElement
  GLYPHS.lupa(lg)
  const t = mk("text", { x: -w / 2 + 34, y: 5, class: "hf-q" }, g)
  t.textContent = q
  return g
}

/** Arranca a animação; devolve a função de limpeza. */
function startFunnel(
  people: SVGGElement,
  leads: SVGGElement,
  root: SVGSVGElement,
) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    ;([
      ["pessoa", 380, 70],
      ["lupa", 455, 112],
      ["estrela", 560, 60],
      ["pessoa", 635, 105],
    ] as const).forEach(([k, x, y]) => {
      const g = iconBadge(k)
      g.setAttribute("transform", `translate(${x} ${y})`)
      g.setAttribute("opacity", "0.9")
      people.appendChild(g)
    })
    return () => {
      people.replaceChildren()
    }
  }

  type Item = {
    g: SVGGElement
    x0: number
    y0: number
    t0: number
    pill: boolean
    hover: number
    fall: number
    drift: number
  }
  type Dot = { c: Element; t0: number; dur: number; hit: boolean }
  type Pop = { g: Element; t0: number; dur: number }
  const alive: Item[] = [],
    dots: Dot[] = [],
    pops: Pop[] = []
  const easeIn = (t: number) => t * t * t
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
  const pulse = (id: string) => {
    const p = root.querySelector("#" + id)
    if (!p) return
    p.classList.remove("on")
    void (p as SVGGraphicsElement).getBBox()
    p.classList.add("on")
  }

  let rs = 7
  const r2 = () => ((rs = (rs * 48271) % 2147483647), rs / 2147483647)
  let qi = 0,
    lastKind = ""

  const spawn = (now: number) => {
    const pills = alive.filter((p) => p.pill).length
    const isPill = pills < 2 && r2() < 0.28
    let g: SVGGElement, x0: number, y0: number
    if (isPill) {
      g = searchPill(QUERIES[qi++ % QUERIES.length])
      x0 = 450 + r2() * 120
      y0 = 34 + r2() * 36
    } else {
      let kind: string
      do {
        kind = ICONS[Math.floor(r2() * ICONS.length)]
      } while (kind === lastKind && kind !== "pessoa")
      lastKind = kind
      g = iconBadge(kind)
      x0 = 380 + r2() * 280
      y0 = 40 + r2() * 70
    }
    people.appendChild(g)
    alive.push({
      g,
      x0,
      y0,
      t0: now,
      pill: isPill,
      hover: (isPill ? 1300 : 800) + r2() * 700,
      fall: 1300,
      drift: (r2() - 0.5) * 16,
    })
  }
  const lead = (now: number) => {
    const c = mk(
      "circle",
      { cx: 500, cy: TOP_Y, r: 7, fill: "url(#hf-lead-dot)" },
      leads,
    )
    dots.push({ c, t0: now, dur: 2600, hit: false })
  }
  const clientPop = (now: number) => {
    const g = mk("g", {}, leads)
    mk(
      "circle",
      { r: 13, fill: "#3162E0", stroke: "#CFE0FF", "stroke-width": 1.2 },
      g,
    )
    mk(
      "path",
      {
        d: "M -5.5 0.5 L -1.5 4.5 L 6 -4",
        fill: "none",
        stroke: "#fff",
        "stroke-width": 2.2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      g,
    )
    pops.push({ g, t0: now, dur: 1400 })
  }

  let raf = 0
  let nextSpawn = 0
  let firstRun = true

  const frame = (now: number) => {
    if (now >= nextSpawn && alive.length < 10) {
      spawn(now)
      nextSpawn = now + 420 + r2() * 520
    }

    for (let i = alive.length - 1; i >= 0; i--) {
      const p = alive[i],
        t = now - p.t0
      let x: number,
        y: number,
        sc = 1,
        op = 1
      if (t < p.hover) {
        const k = t / p.hover
        x = p.x0 + Math.sin(k * Math.PI) * p.drift
        y = p.y0 + Math.sin(k * Math.PI * 2) * 3
        op = Math.min(1, t / 350)
      } else {
        const k = Math.min(1, (t - p.hover) / p.fall),
          e = easeIn(k)
        x = p.x0 + (500 - p.x0) * e
        y = p.y0 + (TOP_Y - p.y0) * e
        sc = 1 - (p.pill ? 0.8 : 0.7) * e
        op = 1 - Math.max(0, (k - 0.6) / 0.4)
        if (k >= 1) {
          p.g.remove()
          alive.splice(i, 1)
          pulse("hf-pulse1")
          lead(now)
          continue
        }
      }
      p.g.setAttribute(
        "transform",
        `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${sc.toFixed(3)})`,
      )
      p.g.setAttribute("opacity", op.toFixed(2))
    }

    for (let i = dots.length - 1; i >= 0; i--) {
      const d = dots[i],
        k = Math.min(1, (now - d.t0) / d.dur),
        e = easeOut(k)
      const y = TOP_Y + (BOTTOM_Y - TOP_Y) * e
      d.c.setAttribute("cy", y.toFixed(1))
      d.c.setAttribute(
        "opacity",
        (k < 0.85 ? 1 : 1 - (k - 0.85) / 0.15).toFixed(2),
      )
      if (!d.hit && y > BOTTOM_Y - 10) {
        d.hit = true
        pulse("hf-pulse5")
        clientPop(now)
      }
      if (k >= 1) {
        d.c.remove()
        dots.splice(i, 1)
      }
    }

    for (let i = pops.length - 1; i >= 0; i--) {
      const p = pops[i],
        k = Math.min(1, (now - p.t0) / p.dur)
      const y = BOTTOM_Y - 8 - 46 * easeOut(k)
      const sc = k < 0.2 ? 0.4 + 3 * k : 1
      p.g.setAttribute(
        "transform",
        `translate(500 ${y.toFixed(1)}) scale(${sc.toFixed(2)})`,
      )
      p.g.setAttribute(
        "opacity",
        (k < 0.6 ? 1 : 1 - (k - 0.6) / 0.4).toFixed(2),
      )
      if (k >= 1) {
        p.g.remove()
        pops.splice(i, 1)
      }
    }
    raf = requestAnimationFrame(frame)
  }

  const clearAll = () => {
    alive.length = 0
    dots.length = 0
    pops.length = 0
    people.replaceChildren()
    leads.replaceChildren()
  }
  const play = () => {
    if (raf) return
    raf = requestAnimationFrame((t) => {
      nextSpawn = t + (firstRun ? 2800 : 300) // na 1.ª vez espera pela entrada do funil
      firstRun = false
      frame(t)
    })
  }
  const stop = () => {
    cancelAnimationFrame(raf)
    raf = 0
    clearAll()
  }

  // Só anima quando o funil está visível no ecrã
  const io = new IntersectionObserver(([entry]) =>
    entry.isIntersecting ? play() : stop(),
  )
  io.observe(root)

  return () => {
    io.disconnect()
    stop()
  }
}

function FunnelIllustration() {
  const svgRef = useRef<SVGSVGElement>(null)
  const peopleRef = useRef<SVGGElement>(null)
  const leadsRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !peopleRef.current || !leadsRef.current) return
    return startFunnel(peopleRef.current, leadsRef.current, svgRef.current)
  }, [])

  return (
    <svg
      ref={svgRef}
      className="hf-funnel"
      viewBox="30 20 960 735"
      role="img"
      aria-label="Funil em 5 etapas: Visibilidade (SEO e Google Ads), Visita (website), Contacto (pedido de orçamento), Cliente (conversão) e Fidelização (crescimento). Pesquisas e pessoas entram no topo e saem como clientes no fundo."
    >
      <defs>
        <pattern
          id="hf-grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(127,176,255,0.07)"
            strokeWidth="0.6"
          />
        </pattern>
        <radialGradient id="hf-grid-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hf-grid-mask">
          <rect
            x="30"
            y="20"
            width="960"
            height="735"
            fill="url(#hf-grid-fade)"
          />
        </mask>
        <radialGradient id="hf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4C8DFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4C8DFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hf-lead-dot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#7FB0FF" />
          <stop offset="100%" stopColor="#4C8DFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect
        x="30"
        y="20"
        width="960"
        height="735"
        fill="url(#hf-grid)"
        mask="url(#hf-grid-mask)"
      />
      <line
        x1="500"
        y1="80"
        x2="500"
        y2="740"
        stroke="rgba(76,141,255,0.28)"
        strokeWidth="1"
        strokeDasharray="4 8"
      />

      {/* Etapa 5 · Fidelização */}
      <g className="layer l5">
        <ellipse
          cx="500"
          cy="665"
          rx="95"
          ry="30"
          fill="rgba(10,13,20,0.85)"
          stroke="rgba(113,160,255,0.6)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="500"
          cy="665"
          rx="76"
          ry="24"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
          strokeDasharray="2 4"
        />
        <ellipse
          cx="500"
          cy="665"
          rx="48"
          ry="15"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
        />
        <line
          x1="405"
          y1="665"
          x2="595"
          y2="665"
          stroke="rgba(113,160,255,0.26)"
        />
        <ellipse
          id="hf-pulse5"
          className="pulse"
          cx="500"
          cy="665"
          rx="95"
          ry="30"
          fill="url(#hf-glow)"
          stroke="#4C8DFF"
          strokeWidth="1.5"
        />
      </g>
      <g className="conn">
        <line
          x1="345"
          y1="560"
          x2="405"
          y2="665"
          stroke="rgba(113,160,255,0.35)"
        />
        <line
          x1="655"
          y1="560"
          x2="595"
          y2="665"
          stroke="rgba(113,160,255,0.35)"
        />
        <line
          x1="375"
          y1="560"
          x2="430"
          y2="665"
          stroke="rgba(113,160,255,0.2)"
          strokeDasharray="2 4"
        />
        <line
          x1="625"
          y1="560"
          x2="570"
          y2="665"
          stroke="rgba(113,160,255,0.2)"
          strokeDasharray="2 4"
        />
      </g>
      {/* Etapa 4 · Cliente */}
      <g className="layer l4">
        <ellipse
          cx="500"
          cy="560"
          rx="155"
          ry="48"
          fill="rgba(10,13,20,0.85)"
          stroke="rgba(113,160,255,0.55)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="500"
          cy="560"
          rx="130"
          ry="40"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
          strokeDasharray="2 4"
        />
        <ellipse
          cx="500"
          cy="560"
          rx="80"
          ry="25"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
        />
        <line
          x1="345"
          y1="560"
          x2="655"
          y2="560"
          stroke="rgba(113,160,255,0.26)"
        />
      </g>
      <g className="conn">
        <line
          x1="290"
          y1="450"
          x2="345"
          y2="560"
          stroke="rgba(113,160,255,0.35)"
        />
        <line
          x1="710"
          y1="450"
          x2="655"
          y2="560"
          stroke="rgba(113,160,255,0.35)"
        />
        <line
          x1="320"
          y1="450"
          x2="370"
          y2="560"
          stroke="rgba(113,160,255,0.2)"
          strokeDasharray="2 4"
        />
        <line
          x1="680"
          y1="450"
          x2="630"
          y2="560"
          stroke="rgba(113,160,255,0.2)"
          strokeDasharray="2 4"
        />
      </g>
      {/* Etapa 3 · Contacto */}
      <g className="layer l3">
        <ellipse
          cx="500"
          cy="450"
          rx="210"
          ry="65"
          fill="rgba(10,13,20,0.85)"
          stroke="rgba(113,160,255,0.5)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="500"
          cy="450"
          rx="180"
          ry="56"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
          strokeDasharray="4 4"
        />
        <ellipse
          cx="500"
          cy="450"
          rx="110"
          ry="34"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
        />
        <line
          x1="290"
          y1="450"
          x2="710"
          y2="450"
          stroke="rgba(113,160,255,0.26)"
        />
        <line
          x1="336"
          y1="418"
          x2="664"
          y2="482"
          stroke="rgba(113,160,255,0.16)"
          strokeWidth="0.5"
        />
        <line
          x1="336"
          y1="482"
          x2="664"
          y2="418"
          stroke="rgba(113,160,255,0.16)"
          strokeWidth="0.5"
        />
      </g>
      <g className="conn">
        <line
          x1="235"
          y1="335"
          x2="290"
          y2="450"
          stroke="rgba(113,160,255,0.35)"
        />
        <line
          x1="765"
          y1="335"
          x2="710"
          y2="450"
          stroke="rgba(113,160,255,0.35)"
        />
        <line
          x1="265"
          y1="335"
          x2="315"
          y2="450"
          stroke="rgba(113,160,255,0.2)"
          strokeDasharray="2 4"
        />
        <line
          x1="735"
          y1="335"
          x2="685"
          y2="450"
          stroke="rgba(113,160,255,0.2)"
          strokeDasharray="2 4"
        />
      </g>
      {/* Etapa 2 · Visita */}
      <g className="layer l2">
        <ellipse
          cx="500"
          cy="335"
          rx="265"
          ry="82"
          fill="rgba(10,13,20,0.85)"
          stroke="rgba(113,160,255,0.5)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="500"
          cy="335"
          rx="235"
          ry="73"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
        />
        <ellipse
          cx="500"
          cy="335"
          rx="155"
          ry="48"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
          strokeDasharray="2 4"
        />
        <line
          x1="235"
          y1="335"
          x2="765"
          y2="335"
          stroke="rgba(113,160,255,0.26)"
        />
      </g>
      <g className="conn">
        <line
          x1="180"
          y1="220"
          x2="235"
          y2="335"
          stroke="rgba(113,160,255,0.35)"
        />
        <line
          x1="820"
          y1="220"
          x2="765"
          y2="335"
          stroke="rgba(113,160,255,0.35)"
        />
        <line
          x1="210"
          y1="220"
          x2="260"
          y2="335"
          stroke="rgba(113,160,255,0.2)"
          strokeDasharray="2 4"
        />
        <line
          x1="790"
          y1="220"
          x2="740"
          y2="335"
          stroke="rgba(113,160,255,0.2)"
          strokeDasharray="2 4"
        />
      </g>
      {/* Etapa 1 · Visibilidade */}
      <g className="layer l1">
        <ellipse
          cx="500"
          cy="220"
          rx="320"
          ry="100"
          fill="rgba(10,13,20,0.9)"
          stroke="#CFE0FF"
          strokeWidth="2"
        />
        <ellipse
          cx="500"
          cy="220"
          rx="290"
          ry="91"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
        />
        <ellipse
          cx="500"
          cy="220"
          rx="240"
          ry="75"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
          strokeDasharray="4 4"
        />
        <ellipse
          cx="500"
          cy="220"
          rx="150"
          ry="47"
          fill="none"
          stroke="rgba(113,160,255,0.3)"
        />
        <line
          x1="180"
          y1="220"
          x2="820"
          y2="220"
          stroke="rgba(113,160,255,0.26)"
        />
        <line
          x1="250"
          y1="170"
          x2="750"
          y2="270"
          stroke="rgba(113,160,255,0.16)"
          strokeWidth="0.5"
        />
        <line
          x1="250"
          y1="270"
          x2="750"
          y2="170"
          stroke="rgba(113,160,255,0.16)"
          strokeWidth="0.5"
        />
        <line
          x1="500"
          y1="120"
          x2="500"
          y2="320"
          stroke="rgba(113,160,255,0.28)"
        />
        <ellipse
          id="hf-pulse1"
          className="pulse"
          cx="500"
          cy="220"
          rx="60"
          ry="19"
          fill="url(#hf-glow)"
          stroke="#4C8DFF"
        />
        <circle cx="500" cy="220" r="15" fill="none" stroke="#fff" />
        <circle cx="500" cy="220" r="5" fill="#4C8DFF" />
      </g>

      {/* Ícones, pesquisas e leads (desenhados por script) */}
      <g id="hf-people" ref={peopleRef} />
      <g id="hf-leads" ref={leadsRef} />

      {/* Legendas */}
      <g className="ann a1">
        <path
          className="leader"
          style={{ ["--len" as string]: 230 } as React.CSSProperties}
          d="M 255 156 L 215 92 L 70 92"
          fill="none"
          stroke="rgba(161,190,255,0.7)"
        />
        <circle className="dot" cx="255" cy="156" r="3" fill="#4C8DFF" />
        <text className="label" x="70" y="80">
          VISIBILIDADE
        </text>
        <text className="sub" x="70" y="112">
          ETAPA 1 // SEO + GOOGLE ADS
        </text>
      </g>
      <g className="ann a2">
        <path
          className="leader"
          style={{ ["--len" as string]: 250 } as React.CSSProperties}
          d="M 749 363 L 790 398 L 985 398"
          fill="none"
          stroke="rgba(161,190,255,0.7)"
        />
        <circle className="dot" cx="749" cy="363" r="3" fill="#4C8DFF" />
        <text className="label" x="985" y="386" textAnchor="end">
          VISITA
        </text>
        <text className="sub" x="985" y="420" textAnchor="end">
          ETAPA 2 // WEBSITE
        </text>
      </g>
      <g className="ann a3">
        <path
          className="leader"
          style={{ ["--len" as string]: 270 } as React.CSSProperties}
          d="M 303 472 L 262 505 L 45 505"
          fill="none"
          stroke="rgba(161,190,255,0.7)"
        />
        <circle className="dot" cx="303" cy="472" r="3" fill="#4C8DFF" />
        <text className="label" x="45" y="493">
          CONTACTO
        </text>
        <text className="sub" x="45" y="527">
          ETAPA 3 // ORÇAMENTO
        </text>
      </g>
      <g className="ann a4">
        <path
          className="leader"
          style={{ ["--len" as string]: 350 } as React.CSSProperties}
          d="M 646 576 L 700 612 L 985 612"
          fill="none"
          stroke="rgba(161,190,255,0.7)"
        />
        <circle className="dot" cx="646" cy="576" r="3" fill="#4C8DFF" />
        <text className="label" x="985" y="600" textAnchor="end">
          CLIENTE
        </text>
        <text className="sub" x="985" y="634" textAnchor="end">
          ETAPA 4 // CONVERSÃO
        </text>
      </g>
      <g className="ann a5">
        <path
          className="leader"
          style={{ ["--len" as string]: 380 } as React.CSSProperties}
          d="M 411 675 L 360 712 L 45 712"
          fill="none"
          stroke="rgba(161,190,255,0.7)"
        />
        <circle className="dot" cx="411" cy="675" r="3" fill="#4C8DFF" />
        <text className="label" x="45" y="700">
          FIDELIZAÇÃO
        </text>
        <text className="sub" x="45" y="734">
          ETAPA 5 // CRESCIMENTO
        </text>
      </g>
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      style={{
        width: "100%",
        paddingTop: 100,
        paddingBottom: 100,
        marginTop: 80,
        position: "relative",
      }}
      className="hero-section"
    >
      <NightSky />
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: 80,
          paddingRight: 80,
          display: "flex",
          alignItems: "center",
          gap: 40,
          position: "relative",
          zIndex: 1,
        }}
        className="hero-container"
      >
        {/* Left: content */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          {/* Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(76,141,255,0.2)",
              borderRadius: 90,
              padding: "10px 16px",
              marginBottom: 24,
            }}
            className="hero-pill"
          >
            <span
              style={{
                fontFamily: '"Special Gothic:Medium", sans-serif',
                fontWeight: 500,
                fontSize: 20,
                lineHeight: 1.1,
                color: "#fff",
                fontVariationSettings: '"wdth" 100',
                whiteSpace: "nowrap",
              }}
            >
              SEO Profissional · Portugal
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: '"Special Gothic Expanded One:Regular", sans-serif',
              fontWeight: 400,
              fontSize: 72,
              lineHeight: "72px",
              margin: "0 0 32px",
              color: "#fff",
            }}
            className="hero-h1"
          >
            O seu próximo
            <br />
            cliente já procura
            <br />
            <span
              style={{
                background: "linear-gradient(to bottom, #FFFFFF, #002E80)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              no Google.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: '"Special Gothic:Regular", sans-serif',
              fontWeight: 400,
              fontSize: 20,
              lineHeight: "32px",
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 40px",
              maxWidth: 620,
              fontVariationSettings: '"wdth" 100',
            }}
            className="hero-body"
          >
            Transformamos a sua presença digital em pedidos de contacto reais.
            SEO, websites e estratégia digital para empresas que levam o digital
            a sério.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginBottom: 40,
              flexWrap: "wrap",
            }}
            className="hero-buttons"
          >
            <BotaoFluido href="#contacto-section" tamanho="grande">
              Falar sobre o meu projeto
            </BotaoFluido>
            <BotaoFluido
              href="#servicos"
              variante="secundario"
              tamanho="grande"
            >
              VER SERVIÇOS
            </BotaoFluido>
          </div>

          {/* Stats */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 24 }}
            className="hero-stats"
          >
            {[
              { value: "50+", label: "Projetos" },
              { value: "30+", label: "Empresas" },
              { value: "80%", label: "Crescimento médio" },
            ].map((stat, i) => (
              <div
                key={stat.value}
                style={{ display: "flex", alignItems: "center", gap: 24 }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: 1,
                      height: 32,
                      background: "rgba(255,255,255,0.1)",
                      flexShrink: 0,
                    }}
                  />
                )}
                <div>
                  <div
                    style={{
                      fontFamily:
                        '"Special Gothic Expanded One:Regular", sans-serif',
                      fontSize: 24,
                      lineHeight: "32px",
                      background:
                        "linear-gradient(to bottom, #FFFFFF, #002E80)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      whiteSpace: "nowrap",
                    }}
                    className="stat-value"
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Special Gothic:Regular", sans-serif',
                      fontSize: 12,
                      lineHeight: "16px",
                      color: "rgba(255,255,255,0.55)",
                      fontVariationSettings: '"wdth" 100',
                      whiteSpace: "nowrap",
                      marginTop: 2,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: funil */}
        <div className="hero-funnel-wrap">
          <FunnelIllustration />
        </div>
      </div>

      <style>{`
        .hero-funnel-wrap { flex: 0 0 600px; width: 600px; max-width: 100%; }
        .hf-funnel { display: block; width: 100%; height: auto; overflow: visible; }
        .hf-funnel .label { font-family: "Special Gothic Expanded One:Regular", "Special Gothic Expanded One", sans-serif; font-size: 24px; letter-spacing: 0.06em; fill: #E6EEFF; }
        .hf-funnel .sub { font-family: "Special Gothic:Medium", sans-serif; font-weight: 500; font-size: 14px; letter-spacing: 0.14em; fill: rgba(127,176,255,0.6); }
        .hf-funnel .hf-q { font-family: "Special Gothic:Medium", sans-serif; font-weight: 500; font-size: 15px; fill: #fff; }

        /* Entrada: camadas sobem de baixo para cima, depois as legendas desenham-se */
        .hf-funnel .layer { opacity: 0; transform: translateY(30px); transform-box: fill-box; animation: hf-layer-in .9s cubic-bezier(.16,1,.3,1) forwards; }
        .hf-funnel .layer.l5 { animation-delay: .05s; } .hf-funnel .layer.l4 { animation-delay: .2s; } .hf-funnel .layer.l3 { animation-delay: .35s; }
        .hf-funnel .layer.l2 { animation-delay: .5s; }  .hf-funnel .layer.l1 { animation-delay: .65s; }
        .hf-funnel .conn { opacity: 0; animation: hf-fade-in .8s ease forwards; animation-delay: 1.1s; }
        .hf-funnel .ann .leader { stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: hf-draw .9s cubic-bezier(.65,0,.35,1) forwards; }
        .hf-funnel .ann .dot, .hf-funnel .ann text { opacity: 0; animation: hf-fade-in .6s ease forwards; }
        .hf-funnel .ann.a1 .leader { animation-delay: 1.3s; } .hf-funnel .ann.a1 .dot, .hf-funnel .ann.a1 text { animation-delay: 1.9s; }
        .hf-funnel .ann.a2 .leader { animation-delay: 1.5s; } .hf-funnel .ann.a2 .dot, .hf-funnel .ann.a2 text { animation-delay: 2.1s; }
        .hf-funnel .ann.a3 .leader { animation-delay: 1.7s; } .hf-funnel .ann.a3 .dot, .hf-funnel .ann.a3 text { animation-delay: 2.3s; }
        .hf-funnel .ann.a4 .leader { animation-delay: 1.9s; } .hf-funnel .ann.a4 .dot, .hf-funnel .ann.a4 text { animation-delay: 2.5s; }
        .hf-funnel .ann.a5 .leader { animation-delay: 2.1s; } .hf-funnel .ann.a5 .dot, .hf-funnel .ann.a5 text { animation-delay: 2.7s; }
        .hf-funnel .pulse { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .hf-funnel .pulse.on { animation: hf-pulse 1.1s ease-out; }
        @keyframes hf-layer-in { to { opacity: 1; transform: translateY(0); } }
        @keyframes hf-fade-in { to { opacity: 1; } }
        @keyframes hf-draw { to { stroke-dashoffset: 0; } }
        @keyframes hf-pulse { 0% { opacity: .9; transform: scale(.6); } 100% { opacity: 0; transform: scale(1.35); } }

        /* Tablet horizontal (1024–1279): mantém as duas colunas, mais compactas */
        @media (max-width: 1279px) {
          .hero-section { padding-top: 64px !important; padding-bottom: 72px !important; }
          .hero-container { padding-left: 40px !important; padding-right: 40px !important; gap: 20px !important; }
          .hero-funnel-wrap { flex: 0 0 38%; width: 38%; }
          .hero-h1 { font-size: 44px !important; line-height: 48px !important; }
          .hero-body { font-size: 18px !important; line-height: 28px !important; }
        }

        @media (min-width: 768px) and (max-width: 1279px) {
          .hero-buttons .bfl-grande { font-size: 17px !important; padding: 16px 26px !important; }
        }

        /* Tablet vertical: uma coluna, texto e funil centrados */
        @media (max-width: 1023px) {
          .hero-section { padding-top: 56px !important; padding-bottom: 56px !important; }
          .hero-container {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
            gap: 40px !important;
          }
          .hero-container > div:first-child { width: 100%; display: flex; flex-direction: column; align-items: center; }
          .hero-body { margin-left: auto !important; margin-right: auto !important; }
          .hero-buttons { justify-content: center; width: 100%; }
          .hero-funnel-wrap { flex: none; width: 100%; max-width: 560px; }
          .hero-h1 { font-size: 52px !important; line-height: 56px !important; }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .hero-section { padding-top: 32px !important; padding-bottom: 32px !important; }
          .hero-container {
            padding-left: 20px !important;
            padding-right: 20px !important;
            gap: 28px !important;
          }
          .hero-pill { margin-bottom: 20px !important; padding: 8px 14px !important; }
          .hero-pill > span { font-size: 15px !important; }
          .hero-h1 { font-size: clamp(30px, 9.4vw, 38px) !important; line-height: 1.12 !important; margin-bottom: 20px !important; }
          .hero-body { font-size: 16px !important; line-height: 26px !important; margin-bottom: 28px !important; }
          .hero-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100%;
            margin-bottom: 32px !important;
          }
          .hero-buttons a {
            width: 100% !important;
            text-align: center !important;
          }
          .hero-stats { gap: 16px !important; justify-content: center; }
          .hero-stats > div { gap: 16px !important; }
          .stat-value { font-size: 22px !important; }
          /* funil a toda a largura, legendas maiores e sem a linha pequena ilegível */
          .hero-funnel-wrap { width: calc(100% + 24px); max-width: none; margin: 0 -12px; }
          .hf-funnel .label { font-size: 32px; }
          .hf-funnel .sub { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hf-funnel .layer, .hf-funnel .conn, .hf-funnel .ann .dot, .hf-funnel .ann text { animation: none; opacity: 1; transform: none; }
          .hf-funnel .ann .leader { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  )
}

