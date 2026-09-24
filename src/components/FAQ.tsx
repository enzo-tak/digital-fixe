import FaqAcordeao, { FaqItem } from './FaqAcordeao';
import BotaoFluido from './BotaoFluido';

const iconStar = '/assets/9c54e.svg';

const FONT_EXP = '"Special Gothic Expanded One:Regular", sans-serif';
const FONT_REG = '"Special Gothic:Regular", sans-serif';

const itens: FaqItem[] = [
  { pergunta: 'Quanto tempo demora a ver resultados de SEO?', resposta: 'Os primeiros sinais aparecem normalmente entre o segundo e o terceiro mês: mais impressões, melhores posições e as primeiras visitas de pesquisa. Resultados sólidos, do tipo que dá para sentir no número de contactos, costumam demorar de quatro a seis meses. Depende da concorrência do seu sector, do estado atual do site e do histórico do seu domínio. No SEO Local, com o perfil do Google bem trabalhado, a diferença aparece mais depressa, por vezes em poucas semanas. Quem prometer o primeiro lugar em 30 dias não está a ser honesto consigo.' },
  { pergunta: 'Preciso de assinar um contrato de fidelização longo?', resposta: 'Não prendemos ninguém a contratos longos. O acompanhamento é mensal e pode terminá-lo quando quiser, avisando-nos com antecedência. Pedimos apenas que dê ao trabalho o tempo mínimo para produzir efeito, porque o SEO não muda resultados de um mês para o outro e não seria justo para nenhum dos dois avaliá-lo antes disso. Combinamos esse período consigo logo no início, por escrito, antes de começar. Depois, fica connosco porque quer.' },
  { pergunta: 'Quanto custa trabalhar com a Digital Fixe?', resposta: 'Depende do que o seu negócio precisa. Um acompanhamento de SEO Local para uma empresa com uma só localização não tem o mesmo custo que uma estratégia completa com criação de site e conteúdo. Por isso não trabalhamos com pacotes fechados: primeiro fazemos o diagnóstico, que é gratuito, analisamos a sua presença atual e dizemos-lhe o que faz sentido fazer. Só depois recebe um orçamento com o valor fechado e o que está incluído. Sem custos a aparecer a meio do caminho.' },
  { pergunta: 'A Digital Fixe só trabalha com empresas em Lisboa?', resposta: 'Não. Estamos sediados em Lisboa, mas trabalhamos com empresas de todo o país e também com portuguesas no estrangeiro. Praticamente tudo se faz à distância: reuniões por videochamada, relatórios por email e contacto direto por WhatsApp sempre que precisar. Para clientes na região de Lisboa, podemos fazer reuniões presenciais quando ajudar.' },
  { pergunta: 'O que é SEO Local e porque é importante para o meu negócio?', resposta: 'SEO Local é o trabalho que faz a sua empresa aparecer quando alguém procura um serviço perto de si — "canalizador em Braga", "clínica dentária perto de mim" — e nos resultados do mapa do Google. Envolve o perfil de empresa no Google, avaliações, fotos, horários, categorias e páginas do site pensadas para a sua zona. Interessa porque quem faz estas pesquisas está quase sempre a poucos minutos de decidir: procura, liga, marca. Se não aparecer nos primeiros três resultados do mapa, esse cliente vai para o concorrente que aparece.' },
  { pergunta: 'Como sei se a minha empresa precisa deste serviço?', resposta: 'Faça este teste: procure no Google o que vende, seguido da sua cidade, e veja em que posição aparece. Se não estiver na primeira página nem no mapa, os clientes que procuram o que faz estão a encontrar outra pessoa. Também vale a pena questionar-se se o site recebe visitas mas ninguém contacta, se as suas informações no Google estão desatualizadas, ou se tem poucas avaliações comparado com a concorrência. Se reconhece alguma destas situações, o diagnóstico gratuito responde-lhe em concreto, sem compromisso.' },
];

/* ── Section ─────────────────────────────────────────────── */
export default function FAQ() {
  return (
    <section
      id="faq"
      style={{ width: '100%', paddingTop: 100, paddingBottom: 100 }}
      className="faq-section"
    >
      <div
        style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 80, paddingRight: 80, display: 'flex', gap: 40, alignItems: 'flex-start' }}
        className="faq-wrap"
      >
        {/* ── Left ─────────────────────────────────── */}
        <div style={{ flexShrink: 0, width: 380 }} className="faq-left">
          {/* Pill — font-size reduced to fit within left column */}
          <div className="df-pill" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 900,
            background: '#fff', border: '4px solid rgba(255,255,255,0.3)',
            boxShadow: 'inset 0px 0px 20px 0px rgba(76,141,255,0.3)',
            marginBottom: 32,
            maxWidth: '100%',
          }}>
            <img loading="lazy" src={iconStar} alt="" width={20} height={20} style={{ flexShrink: 0 }} />
            <span style={{
              fontFamily: FONT_EXP, fontSize: 16, lineHeight: 1.1,
              background: 'linear-gradient(90deg, #002E80 9%, #3162E0 82%, #002E80)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              whiteSpace: 'nowrap',
            }}>PERGUNTAS FREQUENTES</span>
          </div>

          {/* H2 */}
          <h2 style={{
            fontFamily: FONT_EXP, fontWeight: 400,
            fontSize: 48, lineHeight: '50.4px',
            margin: '0 0 24px', color: '#fff',
          }} className="faq-h2">
            Ainda tem<br />dúvidas?
          </h2>

          {/* Paragraph */}
          <p style={{
            fontFamily: FONT_REG, fontWeight: 400,
            fontSize: 16, lineHeight: '27.2px',
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 40px',
            fontVariationSettings: '"wdth" 100',
          }} className="faq-body">
            Aqui estão as respostas às perguntas mais comuns. Se não encontrar o que procura, fale connosco.
          </p>

          {/* Button */}
          <div className="faq-btn">
            <BotaoFluido href="#contacto-section">Fale Connosco</BotaoFluido>
          </div>
        </div>

        {/* ── Right: accordion ─────────────────────── */}
        <FaqAcordeao itens={itens} />
      </div>

      <style>{`
        @media (max-width: 1279px) {
          .faq-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .faq-wrap  { padding-left: 40px !important; padding-right: 40px !important; gap: 32px !important; }
          .faq-left  { width: 320px !important; }
          .faq-h2    { font-size: 42px !important; line-height: 46px !important; }
        }
        @media (max-width: 1023px) {
          .faq-wrap  { flex-direction: column !important; align-items: stretch !important; }
          .faq-left  { width: 100% !important; }
          .faq-body  { max-width: 560px; margin-bottom: 28px !important; }
        }
        @media (max-width: 767px) {
          .faq-section { padding-top: 56px !important; padding-bottom: 56px !important; }
          .faq-wrap    { padding-left: 20px !important; padding-right: 20px !important; gap: 28px !important; }
          .faq-left > .df-pill { margin-bottom: 24px !important; }
          .faq-h2      { font-size: 32px !important; line-height: 36px !important; margin-bottom: 16px !important; }
          .faq-body    { margin-bottom: 24px !important; }
          .faq-btn     { display: flex !important; }
          .faq-btn .bfl { width: 100% !important; }
          .faqa { gap: 10px !important; }
          .faqa-titulo { font-size: 15px !important; line-height: 22px !important; }
          .faqa-num { font-size: 15px !important; }
          .faqa-pergunta { gap: 10px !important; padding: 12px 14px !important; }
          .faqa-resposta p { padding: 0 14px 14px !important; }
        }
      `}</style>
    </section>
  );
}

