import BotaoFluido from "./BotaoFluido"

const iconStar = "/assets/7073f.svg"

const FONT_EXP = '"Special Gothic Expanded One:Regular", sans-serif'
const FONT_REG = '"Special Gothic:Regular", sans-serif'

const problems = [
  "Tem um bom negócio, mas quase ninguém o encontra no Google?",
  "O seu website não gera contactos nem pedidos de orçamento?",
  "A sua presença online não reflete a qualidade do que oferece?",
  "Investe em marketing mas não sabe o que está realmente a funcionar?",
]

export default function OProblema() {
  return (
    <section
      id="problema"
      style={{ width: "100%", paddingTop: 100, paddingBottom: 100 }}
      className="prob-section"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: 80,
          paddingRight: 80,
          display: "flex",
          alignItems: "center",
          gap: 60,
        }}
        className="prob-container"
      >
        {/* Left: pill, H2, paragraph, button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            flexShrink: 0,
            width: 396,
          }}
          className="prob-left"
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
              O PROBLEMA
            </span>
          </div>

          {/* H2 */}
          <h2
            style={{
              fontFamily: FONT_EXP,
              fontWeight: 400,
              fontSize: 60,
              lineHeight: "63px",
              margin: "0 0 28px",
              color: "#fff",
            }}
            className="prob-h2"
          >
            O problema
            <br />
            não é o seu
            <br />
            <span
              style={{
                background: "linear-gradient(to bottom, #FFFFFF, #002E80)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              negócio.
            </span>
          </h2>

          {/* Paragraph */}
          <p
            style={{
              fontFamily: FONT_REG,
              fontWeight: 400,
              fontSize: 20,
              lineHeight: "32px",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 32px",
              maxWidth: 320,
              fontVariationSettings: '"wdth" 100',
            }}
            className="prob-body"
          >
            É a forma como está a ser encontrado online. E isso tem solução.
          </p>

          {/* Button */}
          <div className="prob-btn">
            <BotaoFluido href="#servicos">Ver solução</BotaoFluido>
          </div>
        </div>

        {/* Right: 4 problem rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            flex: "1 1 0",
            minWidth: 0,
          }}
          className="prob-rows"
        >
          {problems.map((text, i) => (
            <div key={i} className="prob-card">
              {/* Borda animada (igual aos cartões de Serviços) */}
              <span className="prob-bm prob-bm-t" aria-hidden="true" />
              <span className="prob-bm prob-bm-r" aria-hidden="true" />
              <span className="prob-bm prob-bm-b" aria-hidden="true" />
              <span className="prob-bm prob-bm-l" aria-hidden="true" />

              {/* Number box */}
              <div
                style={{
                  borderRadius: 8,
                  padding: "15px 8px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="prob-numbox"
              >
                <span
                  style={{
                    fontFamily: FONT_EXP,
                    fontSize: 28,
                    lineHeight: "16px",
                    whiteSpace: "nowrap",
                  }}
                  className="prob-num"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Row text */}
              <p
                style={{
                  fontFamily: FONT_REG,
                  fontWeight: 400,
                  fontSize: 20,
                  lineHeight: "26px",
                  margin: 0,
                  fontVariationSettings: '"wdth" 100',
                }}
                className="prob-row-text"
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Cartões do problema: borda animada ao passar o rato ──
           Os mesmos quatro feixes de luz dos cartões de Serviços
           percorrem as bordas. Em ecrãs tácteis fica estático. */
        .prob-card { position: relative; overflow: hidden; display: flex; align-items: center; gap: 20px;
          background: rgba(44,53,76,0.2); border: 1.215px solid #002E80; border-radius: 16px; padding: 24px;
          transition: border-color .25s ease, box-shadow .25s ease, background-color .25s ease; }
        .prob-numbox { background: rgba(76,141,255,0.1); border: 1px solid #002E80;
          transition: box-shadow .4s ease, border-color .4s ease, background-color .4s ease; }
        .prob-num { color: #4C8DFF; transition: color .4s ease; }
        .prob-row-text { color: rgba(255,255,255,0.65); transition: color .4s ease; }
        .prob-bm { position: absolute; z-index: 10; pointer-events: none; opacity: 0; }
        .prob-bm-t { top: 0; left: 0; width: 70%; height: 2px; background: linear-gradient(90deg, transparent, #3162E0, #ffffff, transparent); }
        .prob-bm-r { top: 0; right: 0; width: 2px; height: 70%; background: linear-gradient(180deg, transparent, #3162E0, #ffffff, transparent); }
        .prob-bm-b { bottom: 0; right: 0; width: 70%; height: 2px; background: linear-gradient(270deg, transparent, #3162E0, #ffffff, transparent); }
        .prob-bm-l { top: 0; left: 0; width: 2px; height: 70%; background: linear-gradient(0deg, transparent, #3162E0, #ffffff, transparent); }
        @keyframes prob-x  { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @keyframes prob-y  { from { transform: translateY(-100%); } to { transform: translateY(100%); } }
        @keyframes prob-xr { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
        @keyframes prob-yr { from { transform: translateY(100%); } to { transform: translateY(-100%); } }
        @media (hover: hover) and (pointer: fine) {
          .prob-card:hover { border-color: rgba(49,98,224,.47); background-color: rgba(44,53,76,0.28);
            box-shadow: 0 20px 48px rgba(0,0,0,.95), 0 0 40px rgba(49,98,224,.21), inset 0 0 24px rgba(49,98,224,.08); }
          .prob-card:hover .prob-bm { opacity: 1; }
          .prob-card:hover .prob-bm-t { animation: prob-x 1.8s linear infinite; }
          .prob-card:hover .prob-bm-r { animation: prob-y 1.8s linear .45s infinite both; }
          .prob-card:hover .prob-bm-b { animation: prob-xr 1.8s linear .9s infinite both; }
          .prob-card:hover .prob-bm-l { animation: prob-yr 1.8s linear 1.35s infinite both; }
          .prob-card:hover .prob-numbox { border-color: rgba(76,141,255,.5); background-color: rgba(76,141,255,.16);
            box-shadow: 0 0 18px rgba(49,98,224,.55), inset 0 0 12px rgba(76,141,255,.25); }
          .prob-card:hover .prob-num { color: #fff; }
          .prob-card:hover .prob-row-text { color: rgba(255,255,255,.9); }
        }
        @media (prefers-reduced-motion: reduce) {
          .prob-card:hover .prob-bm { opacity: 0; animation: none; }
        }
        @media (max-width: 1279px) {
          .prob-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .prob-container {
            padding-left: 40px !important;
            padding-right: 40px !important;
            gap: 40px !important;
          }
          .prob-left { width: 340px !important; }
          .prob-left > .df-pill { margin-bottom: 32px !important; }
          .prob-h2 { font-size: 42px !important; line-height: 46px !important; }
          .prob-body { font-size: 18px !important; line-height: 28px !important; }
          .prob-card { padding: 20px; gap: 16px; }
          .prob-row-text { font-size: 18px !important; line-height: 24px !important; }
        }
        @media (max-width: 1023px) {
          .prob-container {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .prob-left { width: 100% !important; }
          .prob-body { max-width: 560px !important; }
          .prob-rows { width: 100% !important; }
        }
        @media (max-width: 767px) {
          .prob-section { padding-top: 56px !important; padding-bottom: 56px !important; }
          .prob-container { padding-left: 20px !important; padding-right: 20px !important; gap: 32px !important; }
          .prob-left > .df-pill { margin-bottom: 24px !important; }
          .prob-h2 { font-size: 32px !important; line-height: 36px !important; margin-bottom: 20px !important; }
          .prob-body { font-size: 16px !important; line-height: 26px !important; margin-bottom: 24px !important; }
          .prob-btn { width: 100% !important; align-self: stretch !important; display: flex !important; }
          .prob-btn .bfl { width: 100% !important; }
          .prob-rows { gap: 10px !important; }
          .prob-card { padding: 16px; gap: 14px; border-radius: 14px; }
          .prob-numbox { padding: 12px 6px !important; }
          .prob-num { font-size: 20px !important; }
          .prob-row-text { font-size: 15px !important; line-height: 21px !important; }
        }
      `}</style>
    </section>
  )
}

