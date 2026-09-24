import { useState, useRef } from 'react';

const iconStar   = '/assets/7073f.svg';
const iconPin    = '/assets/b312a.svg';

const FONT_EXP  = '"Special Gothic Expanded One:Regular", sans-serif';
const FONT_REG  = '"Special Gothic:Regular", sans-serif';
const FONT_SEMI = '"Special Gothic:SemiBold", sans-serif';

const IMG_GRAD = 'linear-gradient(0deg, rgb(4,5,12) 0%, rgba(4,5,12,0.75) 12.5%, rgba(4,5,12,0.5) 25%, rgba(4,5,12,0.25) 37.5%, rgba(4,5,12,0) 50%, transparent 100%)';
const BADGE_GRAD = 'linear-gradient(165deg, #002E80 0%, #3162E0 60%, #4C8DFF 100%)';
const H3_GRAD   = 'linear-gradient(178.88deg, #002E80 34.226%, #4C8DFF 92.148%)';

interface Project {
  image: string;
  badge: string;
  category: string;
  title: string;
  location: string;
  tags: string[];
}

const projects: Project[] = [
  {
    image: '/assets/case-marketing-saloes-beleza-lisboa.jpg',
    badge: '+120% reservas',
    category: 'Restaurante · SEO Local',
    title: 'Restaurante',
    location: 'Lisboa, Portugal',
    tags: ['SEO Local', 'Google Business', 'Website'],
  },
  {
    image: '/assets/team-equipa-agencia-marketing-digital.jpg',
    badge: '+95% tráfego',
    category: 'B2B · SEO + Conteúdo',
    title: 'Clínica Veterinária',
    location: 'Lisboa, Portugal',
    tags: ['SEO', 'Conteúdo', 'Google Business'],
  },
  {
    image: '/assets/resultados-case-marketing-digital-metricas.jpg',
    badge: '+200% visibilidade',
    category: 'Empresa de Serviços · Estratégia Digital',
    title: 'Empresa Brownie Caseiro',
    location: 'Braga, Portugal',
    tags: ['Estratégia Digital', 'SEO Técnico', 'Conteúdo'],
  },
  {
    image: '/assets/case-seo-local-pmes-pequenas-empresas.jpg',
    badge: '+85% contactos',
    category: 'Clínica · SEO + Website',
    title: 'Empresa de Móveis',
    location: 'Porto, Portugal',
    tags: ['Website', 'SEO On-Page', 'Landing Page'],
  },
];

/* ── Single card ─────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '1.215px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image area */}
      <div className="res-img" style={{
        position: 'relative',
        height: 256,
        background: 'rgba(44,53,76,0.4)',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: 0.7,
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: IMG_GRAD }} />
        {/* Result badge */}
        <div style={{
          position: 'absolute', top: 16, right: 12,
          background: BADGE_GRAD,
          borderRadius: 8,
          padding: '6px 12px',
        }}>
          <span style={{
            fontFamily: FONT_SEMI,
            fontWeight: 600,
            fontSize: 12, lineHeight: '16px',
            color: '#fff',
            whiteSpace: 'nowrap',
            fontVariationSettings: '"wdth" 100',
          }}>{project.badge}</span>
        </div>
      </div>

      {/* Info area */}
      <div className="res-info" style={{
        background: 'rgba(44,53,76,0.18)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flex: 1,
      }}>
        {/* Category */}
        <span className="res-cat" style={{
          fontFamily: FONT_REG, fontWeight: 400,
          fontSize: 12, lineHeight: '16px',
          color: '#fff',
          fontVariationSettings: '"wdth" 100',
          whiteSpace: 'nowrap',
        }}>{project.category}</span>

        {/* H3 title */}
        <h3 className="res-title" style={{
          fontFamily: FONT_EXP, fontWeight: 400,
          fontSize: 24, lineHeight: '28px',
          background: H3_GRAD,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          margin: 0,
          whiteSpace: 'nowrap',
        }}>{project.title}</h3>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 16, height: 16, opacity: 0.5, flexShrink: 0, position: 'relative' }}>
            <img loading="lazy" src={iconPin} alt="" style={{ position: 'absolute', inset: '8.33%', width: 'calc(100% - 16.66%)', height: 'calc(100% - 16.66%)' }} />
          </div>
          <span style={{
            fontFamily: FONT_REG, fontWeight: 400,
            fontSize: 12, lineHeight: '16px',
            color: 'rgba(255,255,255,0.55)',
            fontVariationSettings: '"wdth" 100',
            whiteSpace: 'nowrap',
          }}>{project.location}</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: FONT_REG, fontWeight: 400,
              fontSize: 12, lineHeight: '16px',
              color: 'rgba(255,255,255,0.55)',
              border: '1.215px solid #002E80',
              borderRadius: 9999,
              padding: '4px 12px',
              whiteSpace: 'nowrap',
              fontVariationSettings: '"wdth" 100',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile carousel ─────────────────────────────────────── */
function MobileCarousel() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setActive(max > 0 ? Math.round((el.scrollLeft / max) * (projects.length - 1)) : 0);
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="res-track"
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 4,
        }}
      >
        {projects.map(p => (
          <div key={p.title} style={{
            flexShrink: 0,
            width: 'min(82vw, 340px)',
            scrollSnapAlign: 'start',
          }}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
        {projects.map((_, i) => (
          <div key={i} style={{
            width: i === active ? 20 : 6,
            height: 6,
            borderRadius: 9999,
            background: i === active ? '#3162E0' : 'rgba(255,255,255,0.25)',
            transition: 'width 0.2s ease, background 0.2s ease',
          }} />
        ))}
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function Resultados() {
  return (
    <section
      id="resultados"
      style={{ width: '100%', paddingTop: 100, paddingBottom: 100 }}
      className="res-section"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 80, paddingRight: 80 }}
           className="res-wrap">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                      gap: 40, marginBottom: 60 }}
             className="res-header">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 50, flexShrink: 0 }}>
            {/* Pill */}
            <div className="df-pill" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 40px', borderRadius: 900,
              background: '#fff', border: '4px solid rgba(255,255,255,0.3)',
              boxShadow: 'inset 0px 0px 20px 0px rgba(76,141,255,0.3)',
              alignSelf: 'flex-start',
            }}>
              <img loading="lazy" src={iconStar} alt="" width={26} height={26} style={{ flexShrink: 0 }} />
              <span style={{
                fontFamily: FONT_EXP, fontSize: 24, lineHeight: 1.1,
                background: 'linear-gradient(90deg, #002E80 9%, #3162E0 82%, #002E80)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                whiteSpace: 'nowrap',
              }}>PROJETOS</span>
            </div>

            {/* H2 */}
            <h2 style={{
              fontFamily: FONT_EXP, fontWeight: 400,
              fontSize: 60, lineHeight: '63px',
              margin: 0, color: '#fff',
            }} className="res-h2">
              RESULTADOS<br />
              <span style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #002E80)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>que falam.</span>
            </h2>
          </div>

          <p style={{
            fontFamily: FONT_REG, fontWeight: 400,
            fontSize: 20, lineHeight: '32px',
            color: 'rgba(255,255,255,0.5)', margin: 0,
            maxWidth: 384, fontVariationSettings: '"wdth" 100',
          }} className="res-para">
            Cada projeto é único. Aqui estão alguns exemplos do trabalho que desenvolvemos para os nossos clientes.
          </p>
        </div>

        {/* Desktop + Tablet grid */}
        <div className="res-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
          {projects.map(p => <ProjectCard key={p.title} project={p} />)}
        </div>

        {/* Mobile carousel */}
        <div className="res-carousel" style={{ display: 'none' }}>
          <MobileCarousel />
        </div>
      </div>

      <style>{`
        .res-grid img { display: block; }
        @media (max-width: 1279px) {
          .res-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .res-wrap   { padding-left: 40px !important; padding-right: 40px !important; }
          .res-header { margin-bottom: 48px !important; }
          .res-header > div:first-child { gap: 32px !important; }
          .res-para   { font-size: 18px !important; line-height: 28px !important; max-width: 360px !important; }
          .res-h2     { font-size: 42px !important; line-height: 46px !important; }
          .res-grid   { gap: 20px !important; }
          .res-title  { font-size: 20px !important; line-height: 26px !important; white-space: normal !important; }
          .res-cat    { white-space: normal !important; }
          .res-img    { height: 220px !important; }
        }
        @media (max-width: 1023px) {
          .res-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .res-para   { max-width: 560px !important; }
          .res-img    { height: 200px !important; }
          .res-info   { padding: 20px !important; }
        }
        @media (max-width: 767px) {
          .res-section  { padding-top: 56px !important; padding-bottom: 56px !important; }
          .res-wrap     { padding-left: 20px !important; padding-right: 20px !important; }
          .res-header   { margin-bottom: 32px !important; }
          .res-header > div:first-child { gap: 24px !important; }
          .res-h2       { font-size: 32px !important; line-height: 36px !important; }
          .res-para     { font-size: 16px !important; line-height: 26px !important; }
          .res-grid     { display: none !important; }
          .res-carousel { display: block !important; }
          .res-img      { height: 190px !important; }
          .res-info     { padding: 18px !important; }
          /* carrossel encostado às margens do ecrã, com o próximo cartão a espreitar */
          .res-track { margin: 0 -20px; padding: 0 20px 4px !important; scroll-padding-left: 20px; }
          .res-track::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </section>
  );
}

