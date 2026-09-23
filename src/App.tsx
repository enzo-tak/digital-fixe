import { useLayoutEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import PropostaDeValor from "./components/PropostaDeValor"
import NossosServicos from "./components/NossosServicos"
import OProblema from "./components/OProblema"
import ONossoMetodo from "./components/ONossoMetodo"
import Resultados from "./components/Resultados"
import StatsBand from "./components/StatsBand"
import Depoimentos from "./components/Depoimentos"
import SobreNos from "./components/SobreNos"
import FAQ from "./components/FAQ"
import CTAFinal from "./components/CTAFinal"
import Contacto from "./components/Contacto"
import Footer from "./components/Footer"

/* ── Mask Text Reveal ──────────────────────────────────────────
   Entrada de texto "por linha", estilo dramático, com replay:
   - títulos (h1/h2 das secções): cada linha sobe por trás de uma
     máscara, com ligeira rotação, em cascata;
   - parágrafo de introdução de cada secção: o mesmo, linha a linha;
   - pills (etiquetas por cima dos títulos): abrem-se de baixo para cima.
   Anima sempre que o bloco entra no ecrã e rearma quando sai por
   completo. Com "reduzir movimento" não faz nada (texto normal).
   O texto continua no HTML (SEO e leitores de ecrã intactos).     */

const MR_STAGGER = 0.13 // s entre linhas
const MR_DUR = 1.1 // s por linha

type MrEl = HTMLElement & {
  _mrText?: string
  _mrLead?: MrEl
  _mrT?: number
  _mrSpan?: number
  _mrW?: number
  _mrPill?: MrEl
}

function mrLine(i: number) {
  const line = document.createElement("span")
  line.className = "mr-line"
  const inner = document.createElement("span")
  inner.className = "mr-inner"
  inner.style.setProperty("--i", String(i))
  line.appendChild(inner)
  return { line, inner }
}

/* Títulos: as linhas são definidas pelos <br> e por spans em bloco. */
function splitHeading(h: MrEl) {
  const groups: Node[][] = [[]]
  Array.from(h.childNodes).forEach((n) => {
    if (n.nodeName === "BR") {
      groups.push([])
      return
    }
    const isBlock =
      n.nodeType === 1 && getComputedStyle(n as Element).display === "block"
    if (isBlock) {
      groups.push([n], [])
      return
    }
    groups[groups.length - 1].push(n)
  })
  const lines = groups.filter((g) =>
    g.some((n) => (n.textContent || "").trim() !== ""),
  )
  if (!lines.length) return 0
  const frag = document.createDocumentFragment()
  lines.forEach((nodes, i) => {
    const { line, inner } = mrLine(i)
    nodes.forEach((n) => inner.appendChild(n))
    frag.appendChild(line)
  })
  h.replaceChildren(frag)
  return lines.length
}

/* Parágrafos: mede onde cada palavra cai e agrupa por linha visual. */
function splitParagraph(p: MrEl) {
  if (p._mrText == null)
    p._mrText = (p.textContent || "").replace(/\s+/g, " ").trim()
  const words = p._mrText.split(" ")
  p.replaceChildren()
  const probes = words.map((w, i) => {
    const s = document.createElement("span")
    s.textContent = w + (i < words.length - 1 ? " " : "")
    p.appendChild(s)
    return s
  })
  const groups: string[][] = []
  let top: number | null = null
  probes.forEach((s) => {
    const t = s.offsetTop
    if (top === null || Math.abs(t - top) > 2) {
      groups.push([])
      top = t
    }
    groups[groups.length - 1].push(s.textContent || "")
  })
  const frag = document.createDocumentFragment()
  groups.forEach((g, i) => {
    const { line, inner } = mrLine(i)
    inner.textContent = g.join("").trimEnd()
    frag.appendChild(line)
  })
  p.replaceChildren(frag)
  p._mrW = p.clientWidth
  return groups.length
}

function initMaskReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return () => {}
  document.documentElement.classList.add("mr-on")

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const el = e.target as MrEl
        if (e.isIntersecting && e.intersectionRatio >= 0.15) {
          if (el.classList.contains("mr-in")) return
          // encadeia com o elemento anterior do mesmo bloco (pill → título → parágrafo)
          let base = 0
          const lead = el._mrLead
          if (lead && lead._mrT != null) {
            const since = (performance.now() - lead._mrT) / 1000
            base = Math.max(0, (lead._mrSpan || 0) - since)
          }
          // a pill (recortada, por isso não observável) acompanha o título e abre primeiro
          const pill = el._mrPill
          if (pill && !pill.classList.contains("mr-in")) {
            pill.style.setProperty("--mr-base", "0s")
            pill.classList.add("mr-in")
            base = Math.max(base, pill._mrSpan || 0)
          }
          el.style.setProperty("--mr-base", base.toFixed(2) + "s")
          el.classList.add("mr-in")
          el._mrT = performance.now() + base * 1000
        } else if (!e.isIntersecting) {
          el.classList.remove("mr-in") // saiu por completo: rearma
          el._mrPill?.classList.remove("mr-in")
        }
      })
    },
    { threshold: [0, 0.15] },
  )

  const scan = () => {
    document.querySelectorAll<MrEl>("section h1, section h2").forEach((h) => {
      if (h.dataset.mr) return
      h.dataset.mr = "h"
      const n = splitHeading(h)
      if (!n) return
      h._mrSpan = 0.35 + (n - 1) * MR_STAGGER // quando o parágrafo pode começar

      // Pill: elemento imediatamente antes do título, com cantos totalmente redondos
      const prev = h.previousElementSibling as MrEl | null
      if (
        prev &&
        !prev.dataset.mr &&
        parseFloat(getComputedStyle(prev).borderTopLeftRadius) >= 60
      ) {
        prev.dataset.mr = "pill"
        prev._mrSpan = 0.18
        h._mrPill = prev
      }
      io.observe(h)

      // Parágrafos de introdução: no mesmo bloco que o título
      const scope = h.closest("section")
      scope?.querySelectorAll<MrEl>("p").forEach((p) => {
        if (p.dataset.mr) return
        const parent = p.parentElement
        const intro =
          (parent && parent.contains(h)) || p.classList.contains("sn-body")
        if (!intro || p.children.length) return
        p.dataset.mr = "p"
        p._mrLead = h
        splitParagraph(p)
        io.observe(p)
      })
    })
    // (re)observa tudo o que já foi preparado — necessário se o efeito reiniciar
    document
      .querySelectorAll<MrEl>('[data-mr="h"], [data-mr="p"]')
      .forEach((el) => io.observe(el))
  }
  scan()

  // Depois das fontes carregarem, as quebras de linha dos parágrafos podem mudar
  const resplit = () => {
    document.querySelectorAll<MrEl>('p[data-mr="p"]').forEach((p) => {
      if (p.clientWidth === p._mrW) return
      splitParagraph(p)
    })
  }
  document.fonts?.ready.then(() => {
    document.querySelectorAll<MrEl>('p[data-mr="p"]').forEach((p) => {
      p._mrW = -1
    })
    resplit()
  })
  let rt = 0
  const onResize = () => {
    clearTimeout(rt)
    rt = window.setTimeout(resplit, 150)
  }
  window.addEventListener("resize", onResize)

  // Secções que apareçam mais tarde (ex.: recarregamentos no editor)
  let mt = 0
  const mo = new MutationObserver((records) => {
    const relevant = records.some((r) =>
      Array.from(r.addedNodes).some(
        (n) =>
          n.nodeType === 1 &&
          !(n as Element).closest?.("[data-mr]") &&
          ((n as Element).matches("h1, h2, section") ||
            !!(n as Element).querySelector?.("h1, h2")),
      ),
    )
    if (!relevant) return
    clearTimeout(mt)
    mt = window.setTimeout(scan, 200)
  })
  mo.observe(document.body, { childList: true, subtree: true })

  return () => {
    io.disconnect()
    mo.disconnect()
    window.removeEventListener("resize", onResize)
    document.documentElement.classList.remove("mr-on")
  }
}

const MR_CSS = `
  .mr-line { display: block; overflow: hidden; padding: 0 .04em .12em; margin: 0 -.04em -.12em; }
  .mr-inner { display: block; }
  .mr-on [data-mr] .mr-inner, .mr-on [data-mr="pill"] {
    transition-property: transform, opacity, clip-path;
    transition-duration: ${MR_DUR}s, ${MR_DUR * 0.7}s, ${MR_DUR}s;
    transition-timing-function: cubic-bezier(.16,1,.3,1), ease, cubic-bezier(.16,1,.3,1);
  }
  .mr-on [data-mr] .mr-inner {
    transform-origin: 0% 100%;
    transition-delay: calc(var(--mr-base, 0s) + var(--i, 0) * ${MR_STAGGER}s);
  }
  .mr-on [data-mr]:not(.mr-in) .mr-inner { transform: translateY(115%) rotate(6deg); opacity: 0; transition: none; }
  .mr-on [data-mr="pill"] { transition-delay: var(--mr-base, 0s); }
  .mr-on [data-mr="pill"]:not(.mr-in) { clip-path: inset(0 0 100% 0 round 900px); transform: translateY(45%); opacity: 0; transition: none; }
  .mr-on [data-mr="pill"].mr-in { clip-path: inset(-10px -10px -10px -10px round 900px); }
`
// Rebuild trigger - assets fix
export default function App() {
  useLayoutEffect(() => initMaskReveal(), [])

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <style>{MR_CSS}</style>
      <Navbar />
      <main>
        <Hero />
        <PropostaDeValor />
        <NossosServicos />
        <OProblema />
        <ONossoMetodo />
        <Resultados />
        <StatsBand />
        <Depoimentos />
        <SobreNos />
        <FAQ />
        <CTAFinal />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
