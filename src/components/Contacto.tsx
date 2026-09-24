import { useState, FormEvent } from 'react';
import BotaoFluido from './BotaoFluido';

const iconStar     = '/assets/9c54e.svg';
const iconEmail    = '/assets/b9477.svg';
const iconPhone    = '/assets/f202e.svg';
const iconLocation = '/assets/c5f03.svg';
const iconWA       = '/assets/58494.svg';
const iconChevron  = '/assets/ac632.svg';

const FONT_EXP  = '"Special Gothic Expanded One:Regular", sans-serif';
const FONT_REG  = '"Special Gothic:Regular", sans-serif';
const FONT_SEMI = '"Special Gothic:SemiBold", sans-serif';

const VAR100 = '"wdth" 100' as const;

/* ── Contact card ─────────────────────────────────────────── */
function ContactCard({ icon, label, value, href }: {
  icon: string; label: string; value: string; href?: string;
}) {
  const inner = (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      background: 'rgba(44,53,76,0.2)',
      border: '1.215px solid #002E80',
      borderRadius: 12, padding: 16,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        width: 40, height: 40, borderRadius: 8,
        background: 'rgba(0,46,128,0.4)',
        border: '1.215px solid #002E80',
      }}>
        <img loading="lazy" src={icon} alt="" width={20} height={20} />
      </div>
      <div>
        <p style={{
          fontFamily: FONT_REG, fontWeight: 400, fontSize: 16, lineHeight: '16px',
          color: 'rgba(255,255,255,0.55)', margin: 0,
          fontVariationSettings: VAR100,
        }}>{label}</p>
        <p style={{
          fontFamily: FONT_SEMI, fontWeight: 600, fontSize: 15, lineHeight: '20px',
          color: '#fff', margin: '2px 0 0',
          fontVariationSettings: VAR100,
        }}>{value}</p>
      </div>
    </div>
  );
  if (href) {
    return <a href={href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</a>;
  }
  return inner;
}

/* ── Form field helpers ───────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.06)',
  border: '1.4px solid rgba(255,255,255,0.1)',
  borderRadius: 14, padding: '13px 16px',
  fontFamily: FONT_REG, fontWeight: 400, fontSize: 14, lineHeight: '20px',
  color: '#fff', outline: 'none',
  fontVariationSettings: VAR100,
  transition: 'border-color 0.2s',
};

function Label({ text, htmlFor }: { text: string; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} style={{
      display: 'block',
      fontFamily: FONT_REG, fontWeight: 400, fontSize: 14, lineHeight: '18px',
      color: 'rgba(255,255,255,0.75)', margin: '0 0 8px',
      fontVariationSettings: VAR100,
    }}>{text}</label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={{
    fontFamily: FONT_REG, fontSize: 12, color: '#ff5c5c', margin: '4px 0 0',
    fontVariationSettings: VAR100,
  }}>{msg}</p>;
}

/* ── Success state ────────────────────────────────────────── */
function SuccessMessage() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: 40, flex: 1, gap: 16,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(76,141,255,0.15)',
        border: '1.4px solid #3162E0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28,
      }}>✓</div>
      <h3 style={{
        fontFamily: FONT_EXP, fontSize: 24, lineHeight: '28px',
        color: '#fff', margin: 0,
      }}>Mensagem enviada!</h3>
      <p style={{
        fontFamily: FONT_REG, fontSize: 16, lineHeight: '26px',
        color: 'rgba(255,255,255,0.5)', margin: 0,
        fontVariationSettings: VAR100, maxWidth: 360,
      }}>Recebemos a sua mensagem. Respondemos em menos de 24 horas.</p>
    </div>
  );
}

/* ── Contact form ─────────────────────────────────────────── */
function ContactForm() {
  const [fields, setFields] = useState({
    nome: '', empresa: '', email: '', telemovel: '', servico: '', mensagem: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');

  const set = (k: string, v: string) => setFields(f => ({ ...f, [k]: v }));
  const clearError = (k: string) => setErrors(e => { const n = { ...e }; delete n[k]; return n; });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.nome.trim())  e.nome  = 'Campo obrigatório';
    if (!fields.email.trim()) e.email = 'Campo obrigatório';
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = 'Email inválido';
    return e;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  const focusBorder = (name: string): React.CSSProperties =>
    focused === name ? { borderColor: '#3162E0', boxShadow: '0 0 0 3px rgba(49,98,224,0.2)' } : {};

  const services = [
    'SEO', 'Google Ads', 'Web Design', 'SEO Local', 'Copywriting',
    'Social Media', 'Estratégia Digital', 'Outro',
  ];

  if (sent) return <SuccessMessage />;

  return (
    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Row 1: Nome + Empresa */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="cf-grid">
        <div>
          <Label text="O seu nome *" htmlFor="cf-nome" />
          <input
            id="cf-nome"
            type="text" placeholder="Ex: João Silva"
            value={fields.nome}
            onChange={e => { set('nome', e.target.value); clearError('nome'); }}
            onFocus={() => setFocused('nome')} onBlur={() => setFocused('')}
            style={{ ...inputStyle, ...focusBorder('nome') }}
          />
          <FieldError msg={errors.nome} />
        </div>
        <div>
          <Label text="Empresa" htmlFor="cf-empresa" />
          <input
            id="cf-empresa"
            type="text" placeholder="Ex: Empresa Lda."
            value={fields.empresa}
            onChange={e => set('empresa', e.target.value)}
            onFocus={() => setFocused('empresa')} onBlur={() => setFocused('')}
            style={{ ...inputStyle, ...focusBorder('empresa') }}
          />
        </div>
      </div>

      {/* Row 2: Email + Telemóvel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="cf-grid">
        <div>
          <Label text="Email *" htmlFor="cf-email" />
          <input
            id="cf-email"
            type="email" placeholder="Ex: joao@empresa.pt"
            value={fields.email}
            onChange={e => { set('email', e.target.value); clearError('email'); }}
            onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
            style={{ ...inputStyle, ...focusBorder('email') }}
          />
          <FieldError msg={errors.email} />
        </div>
        <div>
          <Label text="Telemóvel" htmlFor="cf-telemovel" />
          <input
            id="cf-telemovel"
            type="tel" placeholder="Ex: (+351) 912 345 678"
            value={fields.telemovel}
            onChange={e => set('telemovel', e.target.value)}
            onFocus={() => setFocused('telemovel')} onBlur={() => setFocused('')}
            style={{ ...inputStyle, ...focusBorder('telemovel') }}
          />
        </div>
      </div>

      {/* Serviço */}
      <div>
        <Label text="Serviço de interesse" htmlFor="cf-servico" />
        <div style={{ position: 'relative' }}>
          <select
            id="cf-servico"
            value={fields.servico}
            onChange={e => set('servico', e.target.value)}
            onFocus={() => setFocused('servico')} onBlur={() => setFocused('')}
            style={{
              ...inputStyle,
              appearance: 'none', WebkitAppearance: 'none',
              cursor: 'pointer',
              color: fields.servico ? '#fff' : 'rgba(255,255,255,0.25)',
              ...focusBorder('servico'),
            }}
          >
            <option value="" disabled>Selecionar serviço...</option>
            {services.map(s => (
              <option key={s} value={s} style={{ background: '#0d1220', color: '#fff' }}>{s}</option>
            ))}
          </select>
          <img
            src={iconChevron} alt="" width={12} height={7}
            style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
        </div>
      </div>

      {/* Mensagem */}
      <div>
        <Label text="Mensagem" htmlFor="cf-mensagem" />
        <textarea
          id="cf-mensagem"
          placeholder="Conte-nos sobre o seu projeto..."
          value={fields.mensagem}
          onChange={e => set('mensagem', e.target.value)}
          onFocus={() => setFocused('mensagem')} onBlur={() => setFocused('')}
          rows={5}
          style={{
            ...inputStyle, resize: 'vertical', minHeight: 120,
            ...focusBorder('mensagem'),
          }}
        />
      </div>

      {/* Submit */}
      <BotaoFluido type="submit" disabled={loading} className="ct-submit-btn">
        {loading ? 'A enviar…' : 'ENVIAR MENSAGEM'}
      </BotaoFluido>

      {/* Privacy note */}
      <p style={{
        fontFamily: FONT_REG, fontWeight: 400, fontSize: 14, lineHeight: '18px',
        color: 'rgba(255,255,255,0.5)', margin: 0, textAlign: 'center',
        fontVariationSettings: VAR100,
      }}>
        Ao enviar, aceita a nossa Política de Privacidade. Resposta em menos de 24h.
      </p>
    </form>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function Contacto() {
  return (
    <section
      id="contacto-section"
      style={{ width: '100%', paddingTop: 100, paddingBottom: 100 }}
      className="ct-section"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 80, paddingRight: 80, display: 'flex', gap: 60, alignItems: 'flex-start' }}
           className="ct-wrap">

        {/* ── Left ──────────────────────────────────── */}
        <div style={{ flexShrink: 0, width: 474 }} className="ct-left">
          {/* Pill */}
          <div className="df-pill" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '15px 40px', borderRadius: 900,
            background: '#fff', border: '4px solid rgba(255,255,255,0.3)',
            boxShadow: 'inset 0px 0px 20px 0px rgba(76,141,255,0.3)',
            marginBottom: 40,
          }}>
            <img loading="lazy" src={iconStar} alt="" width={26} height={26} style={{ flexShrink: 0 }} />
            <span style={{
              fontFamily: FONT_EXP, fontSize: 24, lineHeight: 1.1,
              background: 'linear-gradient(90deg, #002E80 9%, #3162E0 82%, #002E80)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              whiteSpace: 'nowrap',
            }}>CONTACTO</span>
          </div>

          {/* H2 */}
          <h2 style={{
            fontFamily: FONT_EXP, fontWeight: 400,
            fontSize: 48, lineHeight: '50.4px',
            margin: '0 0 20px', color: '#fff',
          }} className="ct-h2">
            Fale<br />Connosco.<br />
            <span style={{
              background: 'linear-gradient(to bottom, #FFFFFF, #002E80)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Comece Hoje.</span>
          </h2>

          {/* Paragraph */}
          <p style={{
            fontFamily: FONT_REG, fontWeight: 400,
            fontSize: 16, lineHeight: '27.2px',
            color: 'rgba(255,255,255,0.5)',
            margin: '0 0 32px', maxWidth: 474,
            fontVariationSettings: VAR100,
          }} className="ct-body">
            Preencha o formulário ou fale connosco diretamente. Respondemos em menos de 24 horas.
          </p>

          {/* Contact cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }} className="ct-cards">
            <ContactCard icon={iconEmail}    label="Email"       value="digitalfixe@gmail.com" href="mailto:digitalfixe@gmail.com" />
            <ContactCard icon={iconPhone}    label="Telefone"    value="(+351) 939 347 863"    href="tel:+351939347863" />
            <ContactCard icon={iconLocation} label="Localização" value="Lisboa, Portugal" />
          </div>

          {/* WhatsApp button */}
          <div className="ct-wa-btn">
            <BotaoFluido href="https://wa.me/351939347863" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" src={iconWA} alt="" width={18} height={18} style={{ flexShrink: 0, marginRight: 8, verticalAlign: 'middle' }} />
              FALAR NO WHATSAPP
            </BotaoFluido>
          </div>
        </div>

        {/* ── Right: Form card ─────────────────────── */}
        <div className="ct-form" style={{
          flex: '1 1 0', minWidth: 0,
          background: 'rgba(44,53,76,0.18)',
          border: '1.4px solid #002E80',
          borderRadius: 18, padding: 40,
          display: 'flex', flexDirection: 'column',
        }}>
          <ContactForm />
        </div>
      </div>

      <style>{`
        /* Placeholder color for all inputs/selects/textareas */
        .ct-section input::placeholder,
        .ct-section textarea::placeholder { color: rgba(255,255,255,0.25); }
        .ct-section select option { background: #0d1220; }

        @media (max-width: 1279px) {
          .ct-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .ct-wrap  { padding-left: 40px !important; padding-right: 40px !important; gap: 36px !important; }
          .ct-left  { width: 360px !important; }
          .ct-left > .df-pill { margin-bottom: 28px !important; }
          .ct-h2    { font-size: 42px !important; line-height: 46px !important; }
          .ct-form  { padding: 32px !important; }
        }
        @media (max-width: 1023px) {
          .ct-wrap  { flex-direction: column !important; align-items: stretch !important; }
          .ct-left  { width: 100% !important; }
          .ct-body  { max-width: 560px !important; }
          .ct-cards { display: grid !important; grid-template-columns: 1fr 1fr; }
          .ct-cards > :first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 767px) {
          .ct-section  { padding-top: 56px !important; padding-bottom: 56px !important; }
          .ct-wrap     { padding-left: 20px !important; padding-right: 20px !important; gap: 32px !important; }
          .ct-left > .df-pill { margin-bottom: 24px !important; }
          .ct-h2       { font-size: 32px !important; line-height: 36px !important; }
          .ct-body     { max-width: 100% !important; margin-bottom: 24px !important; }
          .ct-cards    { display: flex !important; margin-bottom: 24px !important; gap: 10px !important; }
          .ct-wa-btn   { display: flex !important; }
          .ct-wa-btn .bfl, .ct-submit-btn { width: 100% !important; }
          .ct-form     { padding: 20px 16px !important; border-radius: 16px !important; }
          .cf-grid     { grid-template-columns: 1fr !important; }
          .ct-form form { gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}

