import BotaoFluido from './BotaoFluido';

const iconInstagram = '/assets/777bb.svg';
const iconWebsite   = '/assets/7f536.svg';
const iconMapPin    = '/assets/9a2b3.svg';
const logoImg       = '/assets/4b6a6.png';

const FONT_EXP  = '"Special Gothic Expanded One:Regular", sans-serif';
const FONT_REG  = '"Special Gothic:Regular", sans-serif';
const FONT_SEMI = '"Special Gothic:SemiBold", sans-serif';
const VAR100    = '"wdth" 100' as const;

const COL_GRADIENT = 'linear-gradient(178deg, #002E80 34%, #4C8DFF 92%)';

const menuLinks = [
  { label: 'Início',    href: '#' },
  { label: 'Serviços',  href: '#servicos' },
  { label: 'Projetos',  href: '#resultados' },
  { label: 'Processo',  href: '#metodo' },
  { label: 'Sobre',     href: '#sobre-nos' },
  { label: 'Contacto',  href: '#contacto-section' },
];

const servicoLinks = [
  { label: 'SEO Local',            href: '#servicos' },
  { label: 'SEO Técnico',          href: '#servicos' },
  { label: 'SEO On-Page',          href: '#servicos' },
  { label: 'Criação de Websites',  href: '#servicos' },
];

function ColHeading({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily: FONT_EXP, fontSize: 24, lineHeight: '20px',
      background: COL_GRADIENT,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      margin: 0, whiteSpace: 'nowrap',
    }}>{text}</p>
  );
}

function NavLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      {links.map(l => (
        <a key={l.label} href={l.href} style={{
          fontFamily: FONT_REG, fontWeight: 400,
          fontSize: 20, lineHeight: '20px',
          color: 'rgba(255,255,255,0.6)',
          textDecoration: 'none',
          fontVariationSettings: VAR100,
          whiteSpace: 'nowrap',
        }}>{l.label}</a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{
      width: '100%', position: 'relative', overflow: 'hidden',
      paddingTop: 120, paddingBottom: 80,
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }} className="ft-root">

      {/* ── Giant "FIXE" wordmark ──────────────────────────────── */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: FONT_EXP, fontWeight: 400,
        fontSize: '38vw', lineHeight: 0.7,
        background: COL_GRADIENT,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        opacity: 0.1,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>FIXE</div>

      {/* ── Main content ──────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 80, paddingRight: 80, position: 'relative', zIndex: 1 }}
           className="ft-wrap">

        {/* Top: 4 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 60, alignItems: 'start', marginBottom: 60 }}
             className="ft-cols">

          {/* Col 1: Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'linear-gradient(135deg, #002E80 0%, #3162E0 60%, #4C8DFF 100%)',
              }}>
                <span style={{
                  fontFamily: FONT_EXP, fontSize: 12, lineHeight: '16px', color: '#fff',
                }}>DF</span>
              </div>
              <span style={{
                fontFamily: FONT_EXP, fontSize: 18, lineHeight: '28px', color: '#fff',
                whiteSpace: 'nowrap',
              }}>DIGITAL FIXE</span>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: FONT_REG, fontWeight: 400,
              fontSize: 20, lineHeight: '23.8px',
              color: '#fff', margin: 0,
              fontVariationSettings: VAR100,
              maxWidth: 365,
            }} className="ft-desc">
              Agência digital portuguesa especializada em SEO, websites e estratégia digital. Transformamos presença online em resultados reais.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 style={{ display: 'block', flexShrink: 0 }}>
                <img loading="lazy" src={iconInstagram} alt="Instagram" width={40} height={40} />
              </a>
              <a href="https://digitalfixe.pt" target="_blank" rel="noopener noreferrer"
                 style={{ display: 'block', flexShrink: 0 }}>
                <img loading="lazy" src={iconWebsite} alt="Website" width={40} height={40} />
              </a>
            </div>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="ft-loc">
              <img loading="lazy" src={iconMapPin} alt="" width={26} height={26} style={{ flexShrink: 0 }} />
              <span style={{
                fontFamily: FONT_REG, fontWeight: 400,
                fontSize: 24, lineHeight: '16px',
                color: '#fff', fontVariationSettings: VAR100,
              }}>Lisboa, Portugal</span>
            </div>
          </div>

          {/* Col 2: Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ColHeading text="MENU" />
            <NavLinks links={menuLinks} />
          </div>

          {/* Col 3: Serviços */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ColHeading text="SERVIÇOS" />
            <NavLinks links={servicoLinks} />
          </div>

          {/* Col 4: Contacto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: 244 }} className="ft-contact-col">
            <ColHeading text="CONTACTO" />
            <a href="mailto:digitalfixe@gmail.com" style={{
              fontFamily: FONT_REG, fontWeight: 400,
              fontSize: 20, lineHeight: '20px',
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              fontVariationSettings: VAR100, whiteSpace: 'nowrap',
            }}>digitalfixe@gmail.com</a>
            <a href="tel:+351939347863" style={{
              fontFamily: FONT_REG, fontWeight: 400,
              fontSize: 20, lineHeight: '20px',
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              fontVariationSettings: VAR100, whiteSpace: 'nowrap',
            }}>(+351) 939 347 863</a>
            <BotaoFluido href="#contacto-section" tamanho="pequeno" className="ft-orcamento-btn">PEDIR ORÇAMENTO</BotaoFluido>
          </div>
        </div>

        {/* Divider + bottom row */}
        <div style={{ borderTop: '1.5px solid rgba(255,255,255,0.6)', paddingTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}
               className="ft-bottom">
            <p style={{
              fontFamily: FONT_REG, fontWeight: 400,
              fontSize: 16, lineHeight: '16px',
              color: 'rgba(255,255,255,0.6)', margin: 0,
              fontVariationSettings: VAR100, whiteSpace: 'nowrap',
            }}>©2026 Digital Fixe · Todos os direitos reservados</p>

            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="ft-legal">
              {['Política de Privacidade', 'Política de Cookies', 'Termos e Condições'].map(t => (
                <a key={t} href="#" style={{
                  fontFamily: FONT_REG, fontWeight: 400,
                  fontSize: 16, lineHeight: '16px',
                  color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                  fontVariationSettings: VAR100, whiteSpace: 'nowrap',
                }}>{t}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ft-orcamento-btn { width: 100% !important; }

        @media (max-width: 1279px) {
          .ft-root { padding-top: 88px !important; padding-bottom: 64px !important; }
          .ft-wrap { padding-left: 40px !important; padding-right: 40px !important; }
          .ft-cols {
            display: grid !important;
            grid-template-columns: repeat(3, auto) !important;
            justify-content: space-between;
            gap: 40px 32px !important;
            margin-bottom: 48px !important;
          }
          .ft-cols > div:first-child { grid-column: 1 / -1; }
          .ft-contact-col { width: 244px !important; }
          .ft-desc { font-size: 18px !important; line-height: 26px !important; max-width: 520px !important; }
          .ft-bottom { flex-wrap: wrap; row-gap: 14px !important; }
          .ft-legal { flex-wrap: wrap; gap: 12px 24px !important; }
        }
        @media (max-width: 767px) {
          .ft-root { padding-top: 64px !important; padding-bottom: 48px !important; }
          .ft-wrap { padding-left: 20px !important; padding-right: 20px !important; }
          .ft-cols {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px 20px !important;
            margin-bottom: 40px !important;
          }
          .ft-cols > div:nth-child(4) { grid-column: 1 / -1; }
          .ft-contact-col { width: 100% !important; }
          .ft-desc { font-size: 16px !important; line-height: 24px !important; }
          .ft-cols > div:not(:first-child) > p { font-size: 20px !important; }
          .ft-cols > div:not(:first-child) a:not(.bfl) { font-size: 17px !important; }
          .ft-loc span { font-size: 18px !important; line-height: 22px !important; }
          .ft-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .ft-bottom p { white-space: normal !important; font-size: 14px !important; line-height: 20px !important; }
          .ft-legal  { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .ft-legal a { font-size: 14px !important; }
        }
      `}</style>
    </footer>
  );
}

