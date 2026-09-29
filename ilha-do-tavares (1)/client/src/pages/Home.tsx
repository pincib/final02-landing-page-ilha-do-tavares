import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Compass,
  Factory,
  Hammer,
  Leaf,
  MapPin,
  Menu,
  MoveRight,
  Navigation,
  Phone,
  Scale,
  Send,
  Ship,
  Waves,
  X,
} from "lucide-react";

const HERO_IMAGE = "/assets/hero-ilha.jpg";
const REGIONAL_IMAGE = "/assets/regional-ilha.jpg";
const MAP_IMAGE = "/assets/mapa-baia-guanabara.webp";
const LOGO_IMAGE = "/assets/logo-pinciara.png";
const CONTACT_IMAGE = "/assets/luiz-pinciara.png";

const navItems = [
  ["A oportunidade", "oportunidade"],
  ["Contexto", "contexto"],
  ["Localização", "localizacao"],
  ["Aplicações", "aplicacoes"],
  ["Contato", "contato"],
] as const;

const applicationProfiles = [
  {
    id: "offshore",
    label: "Operador offshore",
    title: "Apoio offshore e naval",
    copy: "Escala de embarcações, armazenagem temporária, apoio a inspecção, manutenção leve, ROV e mergulho profissional.",
    icon: Ship,
  },
  {
    id: "estaleiro",
    label: "Estaleiro",
    title: "Descomissionamento",
    copy: "Recebimento, triagem e armazenagem temporária de equipamentos e materiais, mediante licenciamento específico.",
    icon: Hammer,
  },
  {
    id: "investidor",
    label: "Investidor imobiliário",
    title: "Ambiental e corporativo",
    copy: "Monitorização da baía, pesquisa, treinamento, eventos corporativos e turismo náutico de baixo impacto.",
    icon: Leaf,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.15 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
  },
};

const cardHover = {
  y: -4,
  transition: { duration: 0.2 },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function trackEvent(name: string) {
  const w = window as Window & { gtag?: (...args: unknown[]) => void; umami?: { track: (event: string) => void } };
  w.gtag?.("event", name);
  w.umami?.track(name);
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand brand--compact" : "brand"} aria-label="Pinciara Imóveis Exclusivos">
      <img className="brand-logo-image" src={LOGO_IMAGE} alt="Pinciara Imóveis Exclusivos" />
    </div>
  );
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-marker">
      <span>{number} /</span>
      <span>{label}</span>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0, "aria-label": ariaLabel }: { children: React.ReactNode; className?: string; delay?: number; "aria-label"?: string }) {
  return (
    <motion.div
      className={className}
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function IconTile({ children }: { children: React.ReactNode }) {
  return <span className="icon-tile" aria-hidden="true">{children}</span>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [consentVisible, setConsentVisible] = useState(false);
  const [activeProfile, setActiveProfile] = useState("offshore");
  const [formStatus, setFormStatus] = useState<"idle" | "error" | "success">("idle");

  const activeApplication = useMemo(
    () => applicationProfiles.find((profile) => profile.id === activeProfile) ?? applicationProfiles[0],
    [activeProfile],
  );

  /* ---- 7. Scroll progress — Motion-driven ---- */
  const { scrollYProgress } = useScroll();

  /* ---- 6. Parallax ---- */
  const heroRef = useRef<HTMLElement>(null);
  const regionalRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "25%"]);

  const { scrollYProgress: regionalScrollProgress } = useScroll({
    target: regionalRef,
    offset: ["start end", "end start"],
  });
  const regionalY = useTransform(regionalScrollProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    const consent = window.localStorage.getItem("ilha-tavares-consent");
    if (!consent) setConsentVisible(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowTop(window.scrollY > 500);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setFormStatus("error");
      form.querySelector(":invalid")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const data = new FormData(form);
    const message = [
      "Olá, Luiz. Gostaria de falar sobre a Ilha do Tavares.",
      "",
      `Nome: ${data.get("name")}`,
      `Empresa: ${data.get("company")}`,
      `E-mail: ${data.get("email")}`,
      `Telefone: ${data.get("phone")}`,
    ].join("\n");
    trackEvent("whatsapp_click");
    window.open(`https://wa.me/5521995221369?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setFormStatus("success");
    form.reset();
  };

  const handleConsent = (accepted: boolean) => {
    window.localStorage.setItem("ilha-tavares-consent", accepted ? "accepted" : "declined");
    setConsentVisible(false);
  };

  return (
    <div className="site-shell">
      {/* 7. Scroll progress — Motion-driven */}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress, transformOrigin: "left" }} aria-hidden="true" />
      <a className="skip-link" href="#oportunidade">Saltar para o conteúdo</a>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="header-brand" href="#top" onClick={closeMenu}>
          <Brand />
          <span className="header-project">
            <strong>ILHA DO TAVARES</strong>
            <small>Baía de Guanabara · Gradim, São Gonçalo</small>
          </span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>
          ))}
        </nav>
        <a className="header-phone" href="tel:+5521995221369"><Phone size={15} /><span>Luiz Pinciara<small>21 99522-1369</small></span></a>
        <motion.a className="header-cta" href="#contato" onClick={closeMenu} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>Falar com responsável</motion.a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        {/* ========== HERO — 1. Staggered entrance + 6. Parallax ========== */}
        <section className="hero" ref={heroRef} aria-labelledby="hero-title">
          <motion.div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMAGE})`, y: heroY }} />
          <div className="hero-overlay" />
          <div className="hero-grid" />
          <div className="hero-content container">
            <motion.div className="hero-copy" variants={heroContainer} initial="hidden" animate="visible">
              <motion.div className="eyebrow" variants={heroItem}>ATIVO INSULAR · BAÍA DE GUANABARA · GRADIM, SÃO GONÇALO</motion.div>
              <motion.h1 id="hero-title" variants={heroItem}>Ilha do Tavares<span>.</span></motion.h1>
              <motion.p className="hero-subtitle" variants={heroItem}>Potencial logístico, naval e offshore na Baía de Guanabara.</motion.p>
              <motion.p className="hero-line" variants={heroItem}>Venda, arrendamento ou parceria estratégica.</motion.p>
              <motion.p className="hero-disclaimer" variants={heroItem}>Ativo para avaliação de investidores e operadores. <strong>Qualquer desenvolvimento depende de regularização patrimonial, viabilidade técnica e licenciamento.</strong></motion.p>
              <motion.div className="hero-actions" variants={heroItem}>
                <motion.a className="button button--gold" href="#contato" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>Solicitar conversa inicial <ArrowUpRight size={17} /></motion.a>
                <a className="text-link" href="#oportunidade">Ver enquadramento da oportunidade <ArrowDown size={16} /></a>
              </motion.div>
            </motion.div>
            <motion.div className="hero-aside" aria-label="Identificação da oportunidade" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.4, ease: [0.23, 1, 0.32, 1] }}>
              <span className="hero-aside-line" />
              <span>DOCUMENTO INSTITUCIONAL</span>
              <span>USO SUJEITO A DUE DILIGENCE</span>
            </motion.div>
          </div>
          <motion.a className="scroll-cue" href="#oportunidade" aria-label="Descer para A oportunidade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.6 }}><span>SCROLL</span><ChevronDown size={18} /></motion.a>
        </section>

        {/* ========== 01 — A OPORTUNIDADE ========== */}
        <section className="section section-dark" id="oportunidade">
          <div className="container">
            <SectionMarker number="01" label="A OPORTUNIDADE" />
            <div className="section-intro section-intro--split">
              <Reveal><h2>Uma presença insular a considerar na baía.</h2></Reveal>
              <Reveal delay={0.1}><p>Um ativo para avaliação de investidores e operadores da cadeia naval, logística e offshore, com alternativas de uso a confirmar.</p></Reveal>
            </div>
            <motion.div className="opportunity-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div className="info-block" variants={staggerItem} whileHover={cardHover}><IconTile><MapPin size={21} /></IconTile><h3>Localização</h3><p>Inserida na Baía de Guanabara, próxima ao Gradim e conectada por via marítima a Niterói e ao Rio de Janeiro.</p></motion.div>
              <motion.div className="info-block" variants={staggerItem} whileHover={cardHover}><IconTile><Compass size={21} /></IconTile><h3>Tese comercial</h3><p>Possível apoio offshore, logística, manutenção leve, armazenagem e serviços náuticos de baixo impacto.</p></motion.div>
              <motion.div className="info-block info-block--accent" variants={staggerItem} whileHover={cardHover}><IconTile><Scale size={21} /></IconTile><h3>Condição de uso</h3><p>Qualquer desenvolvimento depende de regularização patrimonial, viabilidade técnica e licenciamento.</p></motion.div>
            </motion.div>
          </div>
        </section>

        {/* ========== 02 — CONTEXTO ========== */}
        <section className="section section-gray" id="contexto">
          <div className="container">
            <SectionMarker number="02" label="CONTEXTO" />
            <div className="market-layout">
              <Reveal className="market-copy"><p className="kicker">CENÁRIO DE MERCADO</p><h2>Crescimento do petróleo offshore no Brasil.</h2><p>A expansão do Pré-Sal demanda embarcações de suprimento, bases logísticas, manutenção naval, equipamentos submarinos, inspecção, armazenagem, transporte marítimo, resposta ambiental e descomissionamento.</p><p className="market-note">A tese depende de confirmação actualizada de mercado.</p></Reveal>
              <Reveal className="metric-panel"><div className="metric-number"><span>3 , 4 </span><MoveRight size={34} /><span> 5 , 2</span></div><div className="metric-unit">milhões de barris/dia</div></Reveal>
            </div>
            <motion.div className="market-data-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={staggerItem}><h3>Investidores citados</h3><p>Petrobras, Shell, TotalEnergies, Equinor, BP, ExxonMobil, Karoon, Prio, Trident Energy.</p></motion.div>
              <motion.div variants={staggerItem}><h3>Escopo operacional</h3><p>FPSOs, poços, linhas submarinas, escoamento, reinjecção de gás e CO2, equipamentos e manutenção.</p></motion.div>
              <motion.div variants={staggerItem}><h3>Campos citados</h3><p>Búzios, Mero, Atapu, Sépia, Tupi, Itapu, Raia, Campos, cessão onerosa e novas áreas.</p></motion.div>
            </motion.div>
            <Reveal><p className="closing-line">Búzios e Mero aparecem no material como projectos relevantes para a expansão e para a cadeia de serviços.</p></Reveal>
          </div>
        </section>

        {/* ========== 03 — POLO REGIONAL — 6. Parallax ========== */}
        <section className="image-section image-section--regional" ref={regionalRef} id="polo-regional">
          <motion.div className="image-section-bg" style={{ backgroundImage: `url(${REGIONAL_IMAGE})`, y: regionalY }} />
          <div className="image-section-overlay" />
          <div className="container image-section-content">
            <Reveal><SectionMarker number="03" label="POLO REGIONAL" /><h2>Baía de Guanabara: polo naval e offshore.</h2><p>O entorno reúne estaleiros, oficinas navais, empresas de engenharia, bases de apoio, infraestrutura portuária e mão de obra especializada.</p><p>Niterói, São Gonçalo e Rio de Janeiro têm tradição em construção, reparo, conversão e manutenção de embarcações e plataformas.</p><p className="gold-note">A condição atual dos ativos, obras e contratos requer confirmação independente.</p></Reveal>
          </div>
        </section>

        {/* ========== 04 — LOCALIZAÇÃO ========== */}
        <section className="section section-dark" id="localizacao">
          <div className="container">
            <SectionMarker number="04" label="LOCALIZAÇÃO" />
            <div className="location-layout">
              <Reveal className="map-card" aria-label="Mapa esquemático da localização">
                <div className="map-card-top"><span>BAÍA DE GUANABARA</span><span>MAPA ESTÁTICO</span></div>
                <div className="map-art map-art--official"><img src={MAP_IMAGE} alt="Mapa da Baía de Guanabara com localização regional marcada" /></div>
                <div className="map-card-bottom"><Navigation size={15} /> Baía de Guanabara · Rio de Janeiro</div>
              </Reveal>
              <Reveal className="location-copy"><h2>Localização estratégica.</h2><div className="stacked-points"><div><h3>Gradim e São Gonçalo</h3><p>Conexão com áreas costeiras, oficinas, armazéns e prestadores de serviços.</p></div><div><h3>Niterói e Rio de Janeiro</h3><p>Acesso marítimo a centros navais, corporativos e de suporte industrial.</p></div><div><h3>Porto do Rio e corredores regionais</h3><p>Possibilidade de apoio complementar para suprimentos, equipamentos e transporte.</p></div></div><p className="location-note">Atracação, profundidade, infraestrutura e autorizações exigem estudos específicos.</p></Reveal>
            </div>
          </div>
        </section>

        {/* ========== 05 — BENEFÍCIOS — 2. Stagger + 4. Card hover ========== */}
        <section className="section section-gray" id="beneficios">
          <div className="container">
            <SectionMarker number="05" label="BENEFÍCIOS" />
            <Reveal><div className="section-heading"><h2>Benefícios logísticos potenciais.</h2><p>Uma leitura de complementaridade, sempre sujeita à verificação de operação e acessos.</p></div></Reveal>
            <motion.div className="cards-grid cards-grid--three" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div className="dark-card" variants={staggerItem} whileHover={cardHover}><span className="card-index">01</span><IconTile><Factory size={21} /></IconTile><h3>Gradim e cadeia naval</h3><p>Ligação com áreas terrestres, oficinas, armazéns, fornecedores e mão de obra especializada.</p></motion.div>
              <motion.div className="dark-card" variants={staggerItem} whileHover={cardHover}><span className="card-index">02</span><IconTile><Ship size={21} /></IconTile><h3>Baía e Porto do Rio</h3><p>Conexão marítima com Niterói, Rio e demais áreas da baía, com apoio complementar de suprimentos.</p></motion.div>
              <motion.div className="dark-card" variants={staggerItem} whileHover={cardHover}><span className="card-index">03</span><IconTile><MoveRight size={21} /></IconTile><h3>Integração multimodal</h3><p>Possível conexão entre transporte marítimo e rodoviário, sujeita à verificação de operação e acessos.</p></motion.div>
            </motion.div>
            <Reveal><p className="section-footnote">A área também pode ser avaliada para monitorização, pesquisa, educação ambiental e recuperação ecológica.</p></Reveal>
          </div>
        </section>

        {/* ========== 06 — APLICAÇÕES — 3. AnimatePresence ========== */}
        <section className="section section-dark" id="aplicacoes">
          <div className="container">
            <SectionMarker number="06" label="APLICAÇÕES" />
            <div className="section-heading section-heading--wide"><Reveal><h2>Aplicações em estudo.</h2></Reveal><Reveal delay={0.1}><p>Selecione um perfil de operador para reorganizar a leitura do bloco, sem substituir a etapa de estudos.</p></Reveal></div>
            <div className="profile-filter" role="tablist" aria-label="Aplicações por perfil de operador">
              {applicationProfiles.map((profile) => <button key={profile.id} type="button" role="tab" aria-selected={activeProfile === profile.id} className={activeProfile === profile.id ? "is-active" : ""} onClick={() => setActiveProfile(profile.id)}>{profile.label}</button>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeProfile} className="application-feature" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                <div className="application-feature-icon"><activeApplication.icon size={28} /></div>
                <div><span className="card-index">{activeProfile === "offshore" ? "01" : activeProfile === "estaleiro" ? "02" : "03"}</span><h3>{activeApplication.title}</h3><p>{activeApplication.copy}</p></div>
                <ArrowUpRight className="feature-arrow" size={22} />
              </motion.div>
            </AnimatePresence>
            <Reveal><p className="section-footnote">Cada aplicação requer estudo de demanda, engenharia, impacto ambiental, navegabilidade e modelo de operação.</p></Reveal>
          </div>
        </section>

        {/* ========== 07 — PROSPECÇÃO — 2. Stagger ========== */}
        <section className="section section-gray" id="prospeccao">
          <div className="container">
            <SectionMarker number="07" label="PROSPECÇÃO" />
            <Reveal><div className="section-heading"><h2>Empresas para prospecção.</h2><p>Perfis de interlocução para uma conversa comercial inicial.</p></div></Reveal>
            <motion.div className="prospecting-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={staggerItem}><span className="gold-label">Apoio marítimo</span><p>Edison Chouest, Bram, DOF, Solstad, Svitzer, Wilson Sons.</p></motion.div>
              <motion.div variants={staggerItem}><span className="gold-label">Subsea e engenharia</span><p>Oceaneering, Subsea7, Saipem, TechnipFMC, Helix, Baker Hughes, SLB, Halliburton.</p></motion.div>
              <motion.div variants={staggerItem}><span className="gold-label">Logística e conformidade</span><p>Monjasa, Blue Water Shipping, DNV, Bureau Veritas, ABS e empresas de inspecção.</p></motion.div>
            </motion.div>
            <Reveal><p className="closing-line">Operadoras como Petrobras, Shell, Equinor, TotalEnergies, BP, ExxonMobil, Prio, Trident, Enauta e PetroReconcavo podem ser clientes indirectos ou contratantes.</p></Reveal>
          </div>
        </section>

        {/* ========== 08 — DIFERENCIAIS — 2. Stagger ========== */}
        <section className="section section-dark" id="diferenciais">
          <div className="container">
            <SectionMarker number="08" label="DIFERENCIAIS" />
            <Reveal><div className="section-heading"><h2>Diferenciais competitivos.</h2></div></Reveal>
            <motion.div className="differentials-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={staggerItem}><span className="card-index">01</span><h3>Localização marítima</h3><p>Acesso directo à Baía de Guanabara e possibilidade de complementar instalações terrestres.</p></motion.div>
              <motion.div variants={staggerItem}><span className="card-index">02</span><h3>Ecossistema industrial</h3><p>Proximidade de estaleiros, fornecedores, mão de obra naval e empresas de engenharia.</p></motion.div>
              <motion.div variants={staggerItem}><span className="card-index">03</span><h3>Usos diversificados</h3><p>Apoio offshore, logística, manutenção, pesquisa, turismo e gestão ambiental, conforme viabilidade.</p></motion.div>
            </motion.div>
            <Reveal><p className="gold-statement">A demanda por inspecção, manutenção, segurança, gestão ambiental e descomissionamento pode persistir ao longo da transição energética.</p></Reveal>
          </div>
        </section>

        {/* ========== 09 — PROPOSTA — 2. Stagger ========== */}
        <section className="section section-gray value-section" id="proposta">
          <div className="container">
            <SectionMarker number="09" label="PROPOSTA" />
            <div className="value-layout">
              <Reveal><h2>Proposta de valor para investidores.</h2><p>Presença na Baía de Guanabara, próxima a um ecossistema naval e offshore consolidado.</p></Reveal>
              <motion.div className="value-points" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <motion.div variants={staggerItem}><div><span>01</span><div><h3>Localização diferenciada</h3><p>Ativo insular com potencial de acesso marítimo e proximidade de fornecedores e clientes.</p></div></div></motion.div>
                <motion.div variants={staggerItem}><div><span>02</span><div><h3>Flexibilidade comercial</h3><p>Venda, arrendamento, parceria operacional ou desenvolvimento sob medida.</p></div></div></motion.div>
                <motion.div variants={staggerItem}><div><span>03</span><div><h3>Infraestrutura especializada</h3><p>Possibilidade de desenvolver uma operação complementar, conforme estudos e aprovações.</p></div></div></motion.div>
              </motion.div>
            </div>
            <Reveal>
              <div className="investor-callout"><div><span className="gold-label">Chamada para investidores</span><h3>Uma próxima conversa pode começar por uma visita técnica.</h3></div><div className="investor-details"><p><strong>Perfis prioritários</strong> — Operadores offshore, apoio marítimo, logística, serviços submarinos, estaleiros, descomissionamento e tecnologia marítima.</p><p><strong>Formatos disponíveis</strong> — Venda, arrendamento de longo prazo, parceria operacional, joint venture e desenvolvimento sob medida.</p><p><strong>Próximo contacto</strong> — Visita técnica, definição da tese de uso e encaminhamento da diligência documental, técnica e ambiental.</p></div></div>
            </Reveal>
            <p className="micro-note">A lista de perfis representa público-alvo comercial, não interesse já manifestado.</p>
          </div>
        </section>

        {/* ========== 10 — CONTATO ========== */}
        <section className="section section-gray contact-section" id="contato">
          <div className="container">
            <SectionMarker number="10" label="CONTATO" />
            <div className="contact-layout">
              <Reveal className="contact-intro"><p className="kicker">PRÓXIMO PASSO</p><h2>Falar com responsável.</h2><div className="contact-person"><img className="contact-avatar" src={CONTACT_IMAGE} alt="Luiz Pinciara" /><div><strong>Luiz Pinciara</strong><a href="tel:+5521995221369"><Phone size={15} /> 21 99522-1369</a></div></div><p>Para agendar visita técnica ou solicitar informação adicional sobre o ativo, preencha o formulário ao lado. Ao enviar, abriremos o WhatsApp com os dados preenchidos para iniciar a conversa.</p><div className="contact-links"><a href="#contato"><Send size={18} /> Preencher formulário</a></div></Reveal>
              <Reveal className="contact-form-card" delay={0.15}><form onSubmit={handleFormSubmit} noValidate><div className="form-grid"><label>Nome*<input name="name" required aria-required="true" autoComplete="name" />{formStatus === "error" && <small className="field-error">Preencha este campo.</small>}</label><label>Empresa*<input name="company" required aria-required="true" autoComplete="organization" />{formStatus === "error" && <small className="field-error">Preencha este campo.</small>}</label><label>E-mail*<input name="email" type="email" required aria-required="true" autoComplete="email" />{formStatus === "error" && <small className="field-error">Introduza um e-mail válido.</small>}</label><label>Telefone*<input name="phone" type="tel" required aria-required="true" autoComplete="tel" />{formStatus === "error" && <small className="field-error">Preencha este campo.</small>}</label></div><label className="consent-check"><input type="checkbox" name="lgpd" required aria-required="true" /> <span>Autorizo o contacto da Pinciara Imóveis Exclusivos para fins de prospecção comercial. Posso solicitar eliminação dos dados a qualquer momento.</span></label><motion.button className="button button--gold form-submit" type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>Enviar mensagem <Send size={17} /></motion.button>{formStatus === "success" && <motion.div className="form-success" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}><Check size={18} /> O WhatsApp foi aberto com os dados preenchidos para iniciar a conversa.</motion.div>}</form></Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><Brand compact /><p>Ilha do Tavares · Gradim, São Gonçalo · Rio de Janeiro — Brasil.</p><p>© 2026 Pinciara Imóveis Exclusivos. Todos os direitos reservados.</p></div><div><p>Luiz Pinciara · <a href="tel:+5521995221369">21 99522-1369</a></p><p>Documento institucional. Uso sujeito a due diligence.</p><nav><a href="#contato">Política de Privacidade</a><a href="#contato">Termos de Uso</a><a href="#contato">Solicitar eliminação de dados</a></nav></div></div></footer>

      {/* 5. Back-to-top — AnimatePresence */}
      <AnimatePresence>
        {showTop && (
          <motion.button className="back-to-top" type="button" aria-label="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
            <ChevronUp size={19} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 5. Consent banner — AnimatePresence */}
      <AnimatePresence>
        {consentVisible && (
          <motion.aside className="consent-banner" role="dialog" aria-label="Consentimento" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.35, ease: "easeOut" }}>
            <div><span className="gold-label">PRIVACIDADE</span><p>Autorizo o contacto da Pinciara Imóveis Exclusivos para fins de prospecção comercial. Posso solicitar eliminação dos dados a qualquer momento.</p></div>
            <div className="consent-actions"><button type="button" onClick={() => handleConsent(true)}>Aceitar</button><button type="button" onClick={() => handleConsent(false)}>Agora não</button></div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
