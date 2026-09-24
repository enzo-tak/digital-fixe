import BotaoFluido from './BotaoFluido';

const iconStar = '/assets/9c54e.svg';

const FONT_EXP = '"Special Gothic Expanded One:Regular", sans-serif';
const FONT_REG = '"Special Gothic:Regular", sans-serif';

export default function CTAFinal() {
  return (
    <section
      id="contacto"
      style={{ width: '100%', paddingTop: 100, paddingBottom: 100, textAlign: 'center' }}
      className="cta-section vidro-sec"
    >
      {/* Luzes azuis por trás do vidro */}
      <div className="vidro-luzes" aria-hidden="true"><i /><i /><i /><i /></div>

      {/* Painel de vidro */}
      <div className="vidro-painel">
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 80, paddingRight: 80, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
           className="cta-wrap vidro-conteudo">

        {/* Pill */}
        <div className="df-pill" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '15px 40px', borderRadius: 900,
          background: '#fff', border: '4px solid rgba(255,255,255,0.3)',
          boxShadow: 'inset 0px 0px 20px 0px rgba(76,141,255,0.3)',
          marginBottom: 32,
        }}>
          <img loading="lazy" src={iconStar} alt="" width={26} height={26} style={{ flexShrink: 0 }} />
          <span style={{
            fontFamily: FONT_EXP, fontSize: 24, lineHeight: 1.1,
            background: 'linear-gradient(90deg, #002E80 9%, #3162E0 82%, #002E80)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            whiteSpace: 'nowrap',
          }}>COMECE HOJE</span>
        </div>

        {/* H2 */}
        <h2 style={{
          fontFamily: FONT_EXP, fontWeight: 400,
          fontSize: 72, lineHeight: '72px',
          margin: '0 0 32px', color: '#fff',
          maxWidth: '100%',
        }} className="cta-h2">
          <span className="cta-ln">Vamos tornar o seu</span><br />
          <span className="cta-ln">negócio mais</span><br />
          <span style={{
            background: 'linear-gradient(179deg, #002E80 34%, #4C8DFF 92%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>VISÍVEL</span>
        </h2>

        {/* Paragraph */}
        <p style={{
          fontFamily: FONT_REG, fontWeight: 400,
          fontSize: 20, lineHeight: '32px',
          color: 'rgba(255,255,255,0.5)',
          margin: '0 0 40px', maxWidth: 489,
          fontVariationSettings: '"wdth" 100',
        }} className="cta-body">
          O primeiro passo é uma conversa. Sem compromisso, sem jargão. Apenas uma análise honesta do que podemos fazer pelo seu negócio.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}
             className="cta-buttons">
          <BotaoFluido href="#contacto-section" className="cta-btn-primary">FALAR SOBRE O SEU PROJETO</BotaoFluido>
          <BotaoFluido href="#servicos" variante="secundario" className="cta-btn-secondary">VER SERVIÇOS</BotaoFluido>
        </div>

        {/* Note line */}
        <p style={{
          fontFamily: FONT_REG, fontWeight: 400,
          fontSize: 16, lineHeight: '20px',
          color: 'rgba(255,255,255,0.6)',
          margin: 0, fontVariationSettings: '"wdth" 100',
          whiteSpace: 'nowrap',
        }} className="cta-note">
          Diagnóstico gratuito · Sem compromisso · Resposta em 24h
        </p>
      </div>
      </div>

      <style>{`
        @media (min-width: 900px) { .cta-ln { white-space: nowrap; } }
        @media (max-width: 1279px) {
          .cta-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .cta-wrap { padding-left: 40px !important; padding-right: 40px !important; }
          .cta-h2   { font-size: 52px !important; line-height: 56px !important; }
          .cta-body { font-size: 18px !important; line-height: 28px !important; }
        }
        @media (max-width: 767px) {
          .cta-section       { padding-top: 56px !important; padding-bottom: 56px !important; }
          .cta-wrap          { padding-left: 16px !important; padding-right: 16px !important; }
          .cta-wrap > .df-pill { margin-bottom: 24px !important; }
          .cta-h2            { font-size: clamp(24px, 7.2vw, 34px) !important; line-height: 1.15 !important; margin-bottom: 20px !important; }
          .cta-body          { font-size: 16px !important; line-height: 26px !important; max-width: 100% !important; margin-bottom: 28px !important; }
          .cta-buttons       { flex-direction: column !important; width: 100% !important; gap: 10px !important; }
          .cta-btn-primary, .cta-btn-secondary { width: 100% !important; }
          .cta-note          { white-space: normal !important; text-align: center; font-size: 14px !important; }
        }
      `}</style>
    </section>
  );
}

