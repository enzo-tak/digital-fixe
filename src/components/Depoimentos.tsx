import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react"

const iconStar = "/assets/7073f.svg"

const FONT_EXP = '"Special Gothic Expanded One:Regular", sans-serif'
const FONT_REG = '"Special Gothic:Regular", sans-serif'
const FONT_SEMI = '"Special Gothic:SemiBold", sans-serif'
const FONT_MONO = 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace'

/* ── Depoimentos "pendurados" ──────────────────────────────────
   Cartões presos a um fio por baixo de um trilho. O cartão ativo
   fica ao centro; ao mudar, todos deslizam e balançam no fio até
   assentar. Avança sozinho (pausa ao passar o rato), setas,
   teclado e arrastar no telemóvel.

   ⚠ CONTEÚDO DE EXEMPLO — nomes, empresas e textos abaixo são
   fictícios. Substituir por depoimentos reais (com autorização
   dos clientes) antes de publicar o site.                        */

const EXEMPLO = true // passe a false quando os depoimentos forem reais

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  initials: string // "logo" da empresa: duas letras
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Passámos da segunda página do Google para o top 3 do mapa. Hoje, metade das reservas chega por quem nos encontrou no telemóvel.",
    name: "Daniela Jappa",
    role: "Proprietária",
    company: "Restaurante D'Jappa",
    initials: "DJ",
  },
  {
    quote:
      'Ninguém encontrava a loja fora da nossa rua. Agora aparecemos quando procuram "móveis por medida" em toda a zona.',
    name: "Miguel Félix",
    role: "Sócio-gerente",
    company: "Móveis Flix",
    initials: "MF",
  },
  {
    quote:
      "Foram sempre profissionais, rápidos e atentos aos detalhes. A nossa presença online melhorou bastante.",
    name: "João Martins",
    role: "Diretor",
    company: "Norte Concept",
    initials: "NC",
  },
  {
    quote:
      "O website ficou muito mais profissional e começámos a receber mais contactos através do Google.",
    name: "Mariana Costa",
    role: "Fundadora",
    company: "Alma Studio",
    initials: "AS",
  },
  {
    quote:
      "Perceberam logo o que precisávamos. Sem jargão, com um relatório simples todos os meses.",
    name: "Ricardo Almeida",
    role: "Gerente",
    company: "Vértice Construções",
    initials: "VC",
  },
  {
    quote:
      "As avaliações passaram de 12 para mais de 80 sem pedirmos a ninguém à força. O processo é simples.",
    name: "Sofia Andrade",
    role: "Diretora clínica",
    company: "Clínica Sorriso Atlântico",
    initials: "SA",
  },
  {
    quote:
      "Achávamos que o Google era só para grandes marcas. Hoje o telefone toca com clientes de três concelhos.",
    name: "Luís Monteiro",
    role: "Proprietário",
    company: "Oficina Motor Lusa",
    initials: "ML",
  },
  {
    quote:
      "Corrigiram horários, fotos e categorias que estavam errados há anos. Parece outra padaria no mapa.",
    name: "Graça Duarte",
    role: "Gerente",
    company: "Padaria Grão Dourado",
    initials: "GD",
  },
  {
    quote:
      "Três meses depois já recebíamos pedidos de orçamento pelo site todas as semanas. Antes era zero.",
    name: "Tiago Rebelo",
    role: "Fundador",
    company: "Rebelo Climatização",
    initials: "RC",
  },
]

const N = testimonials.length
const AUTO_MS = 5500
const pad = (n: number) => String(n).padStart(2, "0")

/** menor distância circular de i até ao ativo (−N/2 … N/2) */
function circ(i: number, active: number) {
  let d = i - active
  if (d > N / 2) d -= N
  if (d < -N / 2) d += N
  return d
}

function Stars() {
  const P =
    "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"
  return (
    <span className="th-stars" role="img" aria-label="5 estrelas">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={12}
          height={12}
          aria-hidden="true"
        >
          <path d={P} />
        </svg>
      ))}
    </span>
  )
}

export default function Depoimentos() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(0) // −1 / 1: sentido do último movimento (para o balanço)
  const [swing, setSwing] = useState(0) // muda a cada movimento para reiniciar a animação
  const [paused, setPaused] = useState(false)
  const prevOffsets = useRef<number[]>(testimonials.map((_, i) => circ(i, 0)))
  const drag = useRef<{ x: number; id: number } | null>(null)

  const go = useCallback((step: number) => {
    setActive((a) => (a + step + N) % N)
    setDir(step > 0 ? 1 : -1)
    setSwing((s) => s + 1)
  }, [])

  // avanço automático (pára com o rato por cima, com o separador escondido ou com "reduzir movimento")
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return
    const t = window.setTimeout(() => {
      if (!document.hidden) go(1)
    }, AUTO_MS)
    return () => window.clearTimeout(t)
  }, [active, paused, go])

  const offsets = testimonials.map((_, i) => circ(i, active))
  const jumps = offsets.map((o, i) => Math.abs(o - prevOffsets.current[i]) > 1) // deu a volta: teletransporta sem animação
  useEffect(() => {
    prevOffsets.current = offsets
  })

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      go(1)
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      go(-1)
    }
  }
  const onDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, id: e.pointerId }
  }
  const onUp = (e: PointerEvent) => {
    if (!drag.current || drag.current.id !== e.pointerId) return
    const dx = e.clientX - drag.current.x
    drag.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  const t = testimonials[active]

  return (
    <section
      id="depoimentos"
      style={{ width: "100%", paddingTop: 100, paddingBottom: 100 }}
      className="dep-section vidro-sec"
    >
      {/* Luzes azuis por trás do vidro */}
      <div className="vidro-luzes" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="vidro-painel">
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            paddingLeft: 80,
            paddingRight: 80,
          }}
          className="dep-wrap vidro-conteudo"
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
              DEPOIMENTOS
            </span>
          </div>

          {/* H2 */}
          <h2
            style={{
              fontFamily: FONT_EXP,
              fontWeight: 400,
              fontSize: 60,
              lineHeight: "63px",
              margin: "0 0 40px",
              color: "#fff",
            }}
            className="dep-h2"
          >
            O que dizem
            <br />
            <span
              style={{
                background: "linear-gradient(to bottom, #FFFFFF, #002E80)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              os nossos clientes.
            </span>
          </h2>

          {/* ── Estendal ── */}
          <div
            className="th"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
            tabIndex={0}
            onKeyDown={onKey}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onPointerDown={onDown}
            onPointerUp={onUp}
            onPointerCancel={() => {
              drag.current = null
            }}
          >
            <div className="th-head">
              <span style={{ fontFamily: FONT_MONO }}>Nas palavras deles</span>
              <span style={{ fontFamily: FONT_MONO }} aria-hidden="true">
                {pad(active + 1)} / {pad(N)}
              </span>
            </div>

            <div className="th-stage">
              <div className="th-rail" aria-hidden="true" />
              {testimonials.map((item, i) => {
                const o = offsets[i]
                const isActive = o === 0
                const hidden = Math.abs(o) > 3
                const rest = i % 2 ? 1.2 : -1.2 // leve inclinação em repouso
                return (
                  <div
                    key={item.company}
                    className={`th-slot${isActive ? " is-active" : ""}${
                      jumps[i] ? " no-anim" : ""
                    }`}
                    style={
                      {
                        ["--o" as string]: o,
                        opacity: hidden
                          ? 0
                          : Math.abs(o) >= 2
                            ? 0.45
                            : isActive
                              ? 1
                              : 0.7,
                      } as React.CSSProperties
                    }
                    aria-hidden={!isActive}
                    onClick={() => {
                      if (o !== 0) go(o)
                    }}
                  >
                    <i className="th-pin" />
                    <div
                      key={isActive || Math.abs(o) <= 2 ? `s${swing}` : "still"}
                      className={`th-hang${dir && !jumps[i] ? " swing" : ""}`}
                      style={
                        {
                          ["--rest" as string]: `${isActive ? 0 : rest}deg`,
                          ["--dir" as string]: dir,
                          ["--amp" as string]: isActive ? 1 : 0.7,
                        } as React.CSSProperties
                      }
                    >
                      <i className="th-string" />
                      <article className="th-card">
                        <i className="th-hole" />
                        <div className="th-card-top">
                          <span
                            className="th-num"
                            style={{ fontFamily: FONT_MONO }}
                          >
                            {pad(i + 1)}
                          </span>
                          <Stars />
                        </div>
                        <p
                          className="th-quote"
                          style={{ fontFamily: FONT_REG }}
                        >
                          {item.quote}
                        </p>
                        <div className="th-brand">
                          <span
                            className="th-logo"
                            style={{ fontFamily: FONT_EXP }}
                          >
                            {item.initials}
                          </span>
                          <span
                            className="th-company"
                            style={{ fontFamily: FONT_SEMI }}
                          >
                            {item.company}
                          </span>
                        </div>
                      </article>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Autor do depoimento ativo */}
            <div className="th-author" aria-live="polite">
              <div key={active} className="th-author-in">
                <span className="th-avatar" style={{ fontFamily: FONT_EXP }}>
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <p className="th-name" style={{ fontFamily: FONT_SEMI }}>
                  {t.name}
                </p>
                <p className="th-role" style={{ fontFamily: FONT_REG }}>
                  {t.role}, {t.company}
                </p>
              </div>
            </div>

            {/* Navegação */}
            <div className="th-nav">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Depoimento anterior"
              >
                ‹
              </button>
              <span className="th-progress" aria-hidden="true">
                <i
                  key={`${active}-${paused}`}
                  className={paused ? "" : "run"}
                  style={{ animationDuration: `${AUTO_MS}ms` }}
                />
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Depoimento seguinte"
              >
                ›
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .th { position: relative; outline: none; user-select: none; touch-action: pan-y; }
        .th:focus-visible { box-shadow: 0 0 0 2px rgba(76,141,255,.6); border-radius: 16px; }
        .th-head { display: flex; justify-content: space-between; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 14px; }
        /* trilho: linha fina contínua, como no original */
        .th-rail { position: absolute; top: 18px; left: 32px; right: 32px; height: 1px; background: rgba(255,255,255,.32); z-index: 1; }

        .th-stage { position: relative; height: 400px; margin: 0 -80px; overflow: hidden;
          -webkit-mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
        .th-slot { --w: 330px; --gap: 360px; position: absolute; top: 18px; left: 50%; width: var(--w); margin-left: calc(var(--w) / -2);
          transform: translateX(calc(var(--o) * var(--gap))) scale(1); transform-origin: 50% 0;
          transition: transform .9s cubic-bezier(.22,1,.36,1), opacity .6s ease; cursor: pointer; }
        .th-slot.is-active { cursor: default; z-index: 2; }
        .th-slot.no-anim, .th-slot.no-anim .th-hang { transition: none !important; animation: none !important; }
        /* pino: argola oca pousada no trilho */
        .th-pin { position: absolute; top: -4.5px; left: 50%; width: 9px; height: 9px; margin-left: -4.5px; border-radius: 50%; box-sizing: border-box;
          background: #141a28; border: 1.5px solid rgba(255,255,255,.55); z-index: 3; transition: border-color .5s ease, box-shadow .5s ease; }
        .th-slot.is-active .th-pin { border-color: #fff; box-shadow: 0 0 10px rgba(169,201,255,.9); }

        .th-hang { transform-origin: 50% 0; transform: rotate(var(--rest)); transition: transform .9s cubic-bezier(.22,1,.36,1); }
        .th-hang.swing { animation: th-swing 1.6s cubic-bezier(.3,.6,.3,1) both; }
        @keyframes th-swing {
          0%   { transform: rotate(calc(var(--rest) + var(--dir) * var(--amp) * 11deg)); }
          30%  { transform: rotate(calc(var(--rest) - var(--dir) * var(--amp) * 6deg)); }
          55%  { transform: rotate(calc(var(--rest) + var(--dir) * var(--amp) * 3deg)); }
          78%  { transform: rotate(calc(var(--rest) - var(--dir) * var(--amp) * 1deg)); }
          100% { transform: rotate(var(--rest)); }
        }
        /* fio: do pino até ao furo do cartão */
        .th-string { display: block; position: relative; z-index: 2; width: 1px; height: 46px; margin: 0 auto -16px; background: rgba(255,255,255,.4); }
        .th-slot.is-active .th-string { background: rgba(255,255,255,.7); }

        .th-card { position: relative; box-sizing: border-box; min-height: 238px; display: flex; flex-direction: column; padding: 22px 24px 20px; border-radius: 14px;
          background: linear-gradient(160deg, #1a1f2e 0%, #10141f 55%, #0b0e16 100%);
          border: 1px solid rgba(255,255,255,.08);
          box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 24px 50px -24px rgba(0,0,0,.9);
          transition: transform .9s cubic-bezier(.22,1,.36,1), border-color .5s ease, box-shadow .5s ease; }
        .th-slot.is-active .th-card { transform: scale(1.07); border-color: rgba(76,141,255,.45);
          box-shadow: 0 1px 0 rgba(255,255,255,.08) inset, 0 30px 70px -20px rgba(76,141,255,.45), 0 0 0 1px rgba(76,141,255,.15); }
        .th-hole { position: absolute; top: 12px; left: 50%; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: #05070d; box-shadow: inset 0 1px 2px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.12); }
        .th-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .th-num { font-size: 11px; letter-spacing: .1em; color: rgba(255,255,255,.35); }
        .th-stars { display: inline-flex; gap: 3px; }
        .th-stars svg { fill: #A9C9FF; filter: drop-shadow(0 0 3px rgba(76,141,255,.7)); }
        .th-quote { flex: 1; margin: 0 0 18px; font-size: 16px; line-height: 24px; color: rgba(255,255,255,.62); transition: color .5s ease; }
        .th-slot.is-active .th-quote { color: #fff; }
        .th-brand { display: flex; align-items: center; gap: 10px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.07); }
        .th-logo { width: 32px; height: 32px; border-radius: 9px; display: grid; place-items: center; flex-shrink: 0; font-size: 12px; letter-spacing: .02em; color: #fff;
          background: linear-gradient(145deg, #3162E0, #002E80); box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 4px 12px -4px rgba(49,98,224,.8); }
        .th-company { font-size: 14px; color: rgba(255,255,255,.8); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .th-author { display: flex; justify-content: center; min-height: 104px; margin-top: 4px; }
        .th-author-in { text-align: center; animation: th-fade .6s cubic-bezier(.16,1,.3,1) both; }
        @keyframes th-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .th-avatar { display: inline-grid; place-items: center; width: 46px; height: 46px; border-radius: 50%; font-size: 14px; color: #fff; margin-bottom: 10px;
          background: linear-gradient(145deg, #4C8DFF, #002E80); box-shadow: 0 0 0 3px rgba(76,141,255,.18), 0 8px 20px -6px rgba(76,141,255,.8); }
        .th-name { margin: 0; font-size: 16px; line-height: 22px; color: #fff; }
        .th-role { margin: 2px 0 0; font-size: 14px; color: rgba(255,255,255,.45); }

        .th-nav { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 14px; }
        .th-nav button { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.03);
          color: #fff; font-size: 22px; line-height: 1; cursor: pointer; display: grid; place-items: center; padding-bottom: 3px;
          transition: background .25s ease, border-color .25s ease, transform .15s ease; }
        .th-nav button:hover { background: rgba(76,141,255,.18); border-color: rgba(76,141,255,.5); }
        .th-nav button:active { transform: scale(.94); }
        .th-nav button:focus-visible { outline: 2px solid #4C8DFF; outline-offset: 3px; }
        .th-progress { width: 90px; height: 2px; border-radius: 2px; background: rgba(255,255,255,.12); overflow: hidden; }
        .th-progress i { display: block; height: 100%; width: 100%; background: linear-gradient(90deg, #4C8DFF, #A9C9FF); transform-origin: left; transform: scaleX(0); }
        .th-progress i.run { animation: th-prog linear forwards; }
        @keyframes th-prog { to { transform: scaleX(1); } }
        .th-note { margin: 22px 0 0; text-align: center; font-size: 12px; color: rgba(255,255,255,.28); }

        @media (max-width: 1279px) {
          .dep-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .dep-wrap { padding-left: 40px !important; padding-right: 40px !important; }
          .dep-h2   { font-size: 42px !important; line-height: 46px !important; }
          .th-stage { margin: 0 -40px; height: 350px; }
        }
        @media (max-width: 767px) {
          .dep-section { padding-top: 56px !important; padding-bottom: 56px !important; }
          .dep-wrap    { padding-left: 20px !important; padding-right: 20px !important; }
          .dep-h2      { font-size: 30px !important; line-height: 34px !important; margin-bottom: 28px !important; }
          .th-head { font-size: 11px; letter-spacing: .08em; }
          .th-stage { margin: 0 -20px; height: 336px; }
          .th-card { min-height: 0; padding: 20px 20px 18px; }
          .th-author { min-height: 96px; }
          .th-nav button { width: 44px; height: 44px; }
          .th-rail { left: 12px; right: 12px; }
          .th-slot { --w: min(78vw, 300px); --gap: min(84vw, 320px); }
          .th-slot.is-active .th-card { transform: scale(1.02); }
          .th-quote { font-size: 15px; line-height: 22px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .th-slot, .th-hang, .th-card { transition: none !important; }
          .th-hang.swing, .th-author-in { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

