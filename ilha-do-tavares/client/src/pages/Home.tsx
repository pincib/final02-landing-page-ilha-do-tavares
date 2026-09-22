import { useEffect, useMemo, useRef, useState } from "react";
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
import LanguageSelectorDropdown from "@/components/ui/language-selector-dropdown";
import { ViewOnMap } from "@/components/watermelon/view-on-map";

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

const englishCopy: Record<string, string> = {
  "A oportunidade": "The opportunity", "Contexto": "Context", "Localização": "Location", "Aplicações": "Applications", "Contato": "Contact",
  "ILHA DO TAVARES": "TAVARES ISLAND", "Baía de Guanabara · Gradim, São Gonçalo": "Guanabara Bay · Gradim, São Gonçalo",
  "Falar com responsável": "Speak with the representative", "ATIVO INSULAR · BAÍA DE GUANABARA · GRADIM, SÃO GONÇALO": "ISLAND ASSET · GUANABARA BAY · GRADIM, SÃO GONÇALO",
  "Potencial logístico, naval e offshore na Baía de Guanabara.": "Logistics, naval and offshore potential in Guanabara Bay.",
  "Venda, arrendamento ou parceria estratégica.": "Sale, lease or strategic partnership.",
  "Ativo para avaliação de investidores e operadores. ": "Asset for investor and operator assessment. ",
  "Qualquer desenvolvimento depende de regularização patrimonial, viabilidade técnica e licenciamento.": "Any development depends on title regularization, technical feasibility and licensing.",
  "Solicitar conversa inicial": "Request an initial conversation", "Ver enquadramento da oportunidade": "View opportunity overview", "SCROLL": "SCROLL",
  "A OPORTUNIDADE": "THE OPPORTUNITY", "Uma presença insular a considerar na baía.": "An island presence to consider in the bay.",
  "Um ativo para avaliação de investidores e operadores da cadeia naval, logística e offshore, com alternativas de uso a confirmar.": "An asset for investors and operators in the naval, logistics and offshore value chain, with uses to be confirmed.",
  "Tese comercial": "Commercial thesis", "Condição de uso": "Conditions of use",
  "Inserida na Baía de Guanabara, próxima ao Gradim e conectada por via marítima a Niterói e ao Rio de Janeiro.": "Located in Guanabara Bay, near Gradim and connected by sea to Niterói and Rio de Janeiro.",
  "Possível apoio offshore, logística, manutenção leve, armazenagem e serviços náuticos de baixo impacto.": "Potential offshore support, logistics, light maintenance, storage and low-impact nautical services.",
  "CONTEXTO": "CONTEXT", "CENÁRIO DE MERCADO": "MARKET CONTEXT", "Crescimento do petróleo offshore no Brasil.": "Growth of offshore oil in Brazil.",
  "A tese depende de confirmação actualizada de mercado.": "The thesis depends on updated market confirmation.", "Cenário optimista descrito no material.": "Optimistic scenario described in the material.",
  "POLO REGIONAL": "REGIONAL HUB", "Baía de Guanabara: polo naval e offshore.": "Guanabara Bay: a naval and offshore hub.",
  "LOCALIZAÇÃO": "LOCATION", "Localização estratégica.": "Strategic location.", "Dados do ativo": "Asset data", "Distância do continente": "Distance from mainland", "Área da ilha": "Island area", "Base de apoio no continente": "Mainland support base",
  "BENEFÍCIOS": "BENEFITS", "Benefícios logísticos potenciais.": "Potential logistics benefits.", "APLICAÇÕES": "APPLICATIONS", "Aplicações em estudo.": "Applications under study.",
  "Operador offshore": "Offshore operator", "Estaleiro": "Shipyard", "Investidor imobiliário": "Real estate investor", "Apoio offshore e naval": "Offshore and naval support",
  "PROSPECÇÃO": "OUTREACH", "Empresas para prospecção.": "Companies for outreach.", "Perfis de interlocução para uma conversa comercial inicial.": "Potential counterparts for an initial commercial conversation.",
  "DIFERENCIAIS": "DIFFERENTIATORS", "Diferenciais competitivos.": "Competitive differentiators.", "PROPOSTA": "PROPOSITION", "Proposta de valor para investidores.": "Value proposition for investors.",
  "Condições comerciais": "Commercial terms", "Venda": "Sale", "Locação": "Lease", "Condições e prazo sob consulta.": "Terms and duration upon request.",
  "CHAMADA PARA INVESTIDORES": "INVESTOR CALL", "Uma próxima conversa pode começar por uma visita técnica.": "The next conversation can begin with a technical visit.",
  "CONTATO": "CONTACT", "PRÓXIMO PASSO": "NEXT STEP", "Falar com responsável.": "Speak with the representative.",
  "Preencher formulário": "Complete the form", "Nome*": "Name*", "Empresa*": "Company*", "Telefone*": "Phone*", "Enviar mensagem": "Send message",
  "Política de Privacidade": "Privacy Policy", "Termos de Uso": "Terms of Use", "Solicitar eliminação de dados": "Request data deletion", "PRIVACIDADE": "PRIVACY", "Aceitar": "Accept", "Agora não": "Not now",
  "Navegação principal": "Primary navigation", "Saltar para o conteúdo": "Skip to content", "Identificação da oportunidade": "Opportunity identification", "DOCUMENTO INSTITUCIONAL": "INSTITUTIONAL DOCUMENT", "USO SUJEITO A DUE DILIGENCE": "USE SUBJECT TO DUE DILIGENCE", "Descer para A oportunidade": "Go to The opportunity",
  "A expansão do Pré-Sal pode demandar embarcações de suprimento, bases logísticas, manutenção naval, equipamentos submarinos, inspecção, armazenagem, transporte marítimo, resposta ambiental e descomissionamento.": "Pre-salt expansion may require supply vessels, logistics bases, naval maintenance, subsea equipment, inspection, storage, maritime transport, environmental response and decommissioning.",
  "milhões de barris/dia": "million barrels/day", "Investidores citados": "Named investors", "Escopo operacional": "Operational scope", "Campos citados": "Named fields", "FPSOs, poços, linhas submarinas, escoamento, reinjecção de gás e CO2, equipamentos e manutenção.": "FPSOs, wells, subsea lines, production flow, gas and CO2 reinjection, equipment and maintenance.", "Búzios, Mero, Atapu, Sépia, Tupi, Itapu, Raia, Campos, cessão onerosa e novas áreas.": "Búzios, Mero, Atapu, Sépia, Tupi, Itapu, Raia, Campos, transfer-of-rights areas and new areas.", "Búzios e Mero aparecem no material como projectos relevantes para a expansão e para a cadeia de serviços.": "Búzios and Mero are described in the material as relevant projects for expansion and the services value chain.",
  "O entorno reúne estaleiros, oficinas navais, empresas de engenharia, bases de apoio, infraestrutura portuária e mão de obra especializada.": "The surrounding area includes shipyards, naval workshops, engineering companies, support bases, port infrastructure and specialized labor.", "Niterói, São Gonçalo e Rio de Janeiro têm tradição em construção, reparo, conversão e manutenção de embarcações e plataformas.": "Niterói, São Gonçalo and Rio de Janeiro have a tradition in the construction, repair, conversion and maintenance of vessels and platforms.", "A condição atual dos ativos, obras e contratos requer confirmação independente.": "The current condition of assets, works and contracts requires independent confirmation.",
  "BAÍA DE GUANABARA": "GUANABARA BAY", "MAPA ESTÁTICO": "STATIC MAP", "Baía de Guanabara · Rio de Janeiro": "Guanabara Bay · Rio de Janeiro", "Mapa esquemático da localização": "Location schematic map", "Mapa da Baía de Guanabara com localização regional marcada": "Map of Guanabara Bay with the regional location marked", "Gradim e São Gonçalo": "Gradim and São Gonçalo", "Conexão com áreas costeiras, oficinas, armazéns e prestadores de serviços.": "Connection to coastal areas, workshops, warehouses and service providers.", "Niterói e Rio de Janeiro": "Niterói and Rio de Janeiro", "Acesso marítimo a centros navais, corporativos e de suporte industrial.": "Maritime access to naval, corporate and industrial-support centers.", "Porto do Rio e corredores regionais": "Port of Rio and regional corridors", "Possibilidade de apoio complementar para suprimentos, equipamentos e transporte.": "Potential complementary support for supplies, equipment and transportation.", "0,5 milha náutica": "0.5 nautical mile", "356.750 m²": "356,750 m²", "Atracação, profundidade, infraestrutura e autorizações exigem estudos específicos.": "Berthing, depth, infrastructure and permits require specific studies.",
  "Uma leitura de complementaridade, sempre sujeita à verificação de operação e acessos.": "A complementary perspective, always subject to verification of operations and access.", "Gradim e cadeia naval": "Gradim and the naval value chain", "Ligação com áreas terrestres, oficinas, armazéns, fornecedores e mão de obra especializada.": "Connection to land areas, workshops, warehouses, suppliers and specialized labor.", "Baía e Porto do Rio": "Bay and Port of Rio", "Conexão marítima com Niterói, Rio e demais áreas da baía, com apoio complementar de suprimentos.": "Maritime connection to Niterói, Rio and other areas of the bay, with complementary supply support.", "Integração multimodal": "Multimodal integration", "Possível conexão entre transporte marítimo e rodoviário, sujeita à verificação de operação e acessos.": "Potential connection between maritime and road transportation, subject to verification of operations and access.", "A área também pode ser avaliada para monitorização, pesquisa, educação ambiental e recuperação ecológica.": "The area may also be assessed for monitoring, research, environmental education and ecological restoration.",
  "Selecione um perfil de operador para reorganizar a leitura do bloco, sem substituir a etapa de estudos.": "Select an operator profile to tailor this section without replacing the assessment phase.", "Aplicações por perfil de operador": "Applications by operator profile", "Escala de embarcações, armazenagem temporária, apoio a inspecção, manutenção leve, ROV e mergulho profissional.": "Vessel staging, temporary storage, inspection support, light maintenance, ROV and professional diving.", "Descomissionamento": "Decommissioning", "Recebimento, triagem e armazenagem temporária de equipamentos e materiais, mediante licenciamento específico.": "Receiving, sorting and temporary storage of equipment and materials, subject to specific licensing.", "Ambiental e corporativo": "Environmental and corporate", "Monitorização da baía, pesquisa, treinamento, eventos corporativos e turismo náutico de baixo impacto.": "Bay monitoring, research, training, corporate events and low-impact nautical tourism.", "Cada aplicação requer estudo de demanda, engenharia, impacto ambiental, navegabilidade e modelo de operação.": "Each application requires study of demand, engineering, environmental impact, navigability and operating model.",
  "Apoio marítimo": "Maritime support", "Subsea e engenharia": "Subsea and engineering", "Logística e conformidade": "Logistics and compliance", "Monjasa, Blue Water Shipping, DNV, Bureau Veritas, ABS e empresas de inspecção.": "Monjasa, Blue Water Shipping, DNV, Bureau Veritas, ABS and inspection companies.", "Operadoras como Petrobras, Shell, Equinor, TotalEnergies, BP, ExxonMobil, Prio, Trident, Enauta e PetroReconcavo podem ser clientes indirectos ou contratantes.": "Operators such as Petrobras, Shell, Equinor, TotalEnergies, BP, ExxonMobil, Prio, Trident, Enauta and PetroReconcavo may be indirect clients or contracting parties.",
  "Localização marítima": "Maritime location", "Acesso directo à Baía de Guanabara e possibilidade de complementar instalações terrestres.": "Direct access to Guanabara Bay and potential to complement land-based facilities.", "Ecossistema industrial": "Industrial ecosystem", "Proximidade de estaleiros, fornecedores, mão de obra naval e empresas de engenharia.": "Proximity to shipyards, suppliers, naval labor and engineering companies.", "Usos diversificados": "Diversified uses", "Apoio offshore, logística, manutenção, pesquisa, turismo e gestão ambiental, conforme viabilidade.": "Offshore support, logistics, maintenance, research, tourism and environmental management, subject to feasibility.", "A demanda por inspecção, manutenção, segurança, gestão ambiental e descomissionamento pode persistir ao longo da transição energética.": "Demand for inspection, maintenance, safety, environmental management and decommissioning may persist throughout the energy transition.",
  "Presença na Baía de Guanabara, próxima a um ecossistema naval e offshore consolidado.": "Presence in Guanabara Bay, near an established naval and offshore ecosystem.", "Localização diferenciada": "Distinctive location", "Ativo insular com potencial de acesso marítimo e proximidade de fornecedores e clientes.": "Island asset with potential maritime access and proximity to suppliers and clients.", "Flexibilidade comercial": "Commercial flexibility", "Venda, arrendamento, parceria operacional ou desenvolvimento sob medida.": "Sale, lease, operating partnership or tailored development.", "Infraestrutura especializada": "Specialized infrastructure", "Possibilidade de desenvolver uma operação complementar, conforme estudos e aprovações.": "Potential to develop a complementary operation, subject to studies and approvals.", "Perfis prioritários": "Priority profiles", "Operadores offshore, apoio marítimo, logística, serviços submarinos, estaleiros, descomissionamento e tecnologia marítima.": "Offshore operators, maritime support, logistics, subsea services, shipyards, decommissioning and maritime technology.", "Formatos disponíveis": "Available formats", "Venda, arrendamento de longo prazo, parceria operacional, joint venture e desenvolvimento sob medida.": "Sale, long-term lease, operating partnership, joint venture and tailored development.", "Próximo contacto": "Next contact", "Visita técnica, definição da tese de uso e encaminhamento da diligência documental, técnica e ambiental.": "Technical visit, definition of the use thesis and referral for documentary, technical and environmental due diligence.", "A lista de perfis representa público-alvo comercial, não interesse já manifestado.": "The list of profiles represents a commercial target audience, not already expressed interest.",
  "Para agendar visita técnica ou solicitar informação adicional sobre o ativo, preencha o formulário ao lado. Ao enviar, abriremos o WhatsApp com os dados preenchidos para iniciar a conversa.": "To schedule a technical visit or request additional information about the asset, complete the form alongside. On submission, WhatsApp will open with your details to begin the conversation.", "Preencha este campo.": "Complete this field.", "Introduza um e-mail válido.": "Enter a valid email address.", "Autorizo o contacto da Pinciara Imóveis Exclusivos para fins de prospecção comercial. Posso solicitar eliminação dos dados a qualquer momento.": "I authorize Pinciara Imóveis Exclusivos to contact me for commercial outreach. I may request deletion of my data at any time.", "O WhatsApp foi aberto com os dados preenchidos para iniciar a conversa.": "WhatsApp has opened with your details to begin the conversation.",
  "Ilha do Tavares · Gradim, São Gonçalo · Rio de Janeiro — Brasil.": "Tavares Island · Gradim, São Gonçalo · Rio de Janeiro — Brazil.", "© 2026 Pinciara Imóveis Exclusivos. Todos os direitos reservados.": "© 2026 Pinciara Imóveis Exclusivos. All rights reserved.", "Documento institucional. Uso sujeito a due diligence.": "Institutional document. Use subject to due diligence.", "Voltar ao topo": "Back to top", "Consentimento": "Consent"
  , "Ativo para avaliação de investidores e operadores.": "Asset for investor and operator assessment.", "Ver no mapa online": "View online map", "Carregando mapa": "Loading map", "Fechar mapa": "Close map", "Fechar menu": "Close menu", "Abrir menu": "Open menu", "Chamada para investidores": "INVESTOR CALL", "— Operadores offshore, apoio marítimo, logística, serviços submarinos, estaleiros, descomissionamento e tecnologia marítima.": "— Offshore operators, maritime support, logistics, subsea services, shipyards, decommissioning and maritime technology.", "— Venda, arrendamento de longo prazo, parceria operacional, joint venture e desenvolvimento sob medida.": "— Sale, long-term lease, operating partnership, joint venture and tailored development.", "— Visita técnica, definição da tese de uso e encaminhamento da diligência documental, técnica e ambiental.": "— Technical visit, definition of the use thesis and referral for documentary, technical and environmental due diligence."
};

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

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function IconTile({ children }: { children: React.ReactNode }) {
  return <span className="icon-tile" aria-hidden="true">{children}</span>;
}

export default function Home() {
  const [language, setLanguage] = useState<"pt-BR" | "en-US">("pt-BR");
  const originalText = useRef(new WeakMap<Text, string>());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [consentVisible, setConsentVisible] = useState(false);
  const [activeProfile, setActiveProfile] = useState("offshore");
  const [formStatus, setFormStatus] = useState<"idle" | "error" | "success">("idle");

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "en-US" ? "Tavares Island — Island asset in Guanabara Bay | Pinciara" : "Ilha do Tavares — Ativo insular na Baía de Guanabara | Pinciara";
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      if (node.parentElement?.closest(".language-selector, .view-on-map")) continue;
      const source = originalText.current.get(node) ?? node.nodeValue ?? "";
      originalText.current.set(node, source);
      const translated = englishCopy[source.trim()];
      const leadingSpace = source.match(/^\s*/)?.[0] ?? "";
      const trailingSpace = source.match(/\s*$/)?.[0] ?? "";
      node.nodeValue = language === "en-US" && translated ? `${leadingSpace}${translated}${trailingSpace}` : source;
    }
  }, [language, activeProfile, formStatus]);

  const activeApplication = useMemo(
    () => applicationProfiles.find((profile) => profile.id === activeProfile) ?? applicationProfiles[0],
    [activeProfile],
  );
  const t = (text: string) => language === "en-US" ? englishCopy[text] ?? text : text;

  useEffect(() => {
    const consent = window.localStorage.getItem("ilha-tavares-consent");
    if (!consent) setConsentVisible(true);

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 80);
      setShowTop(window.scrollY > 500);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
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
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <a className="skip-link" href="#oportunidade">{t("Saltar para o conteúdo")}</a>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="header-brand" href="#top" onClick={closeMenu}>
          <Brand />
          <span className="header-project">
            <strong>ILHA DO TAVARES</strong>
            <small>Baía de Guanabara · Gradim, São Gonçalo</small>
          </span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label={t("Navegação principal")}>
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>
          ))}
        </nav>
        <a className="header-phone" href="tel:+5521995221369"><Phone size={15} /><span>Luiz Pinciara<small>21 99522-1369</small></span></a>
        <LanguageSelectorDropdown language={language} onChange={setLanguage} />
        <a className="header-cta" href="#contato" onClick={closeMenu}>Falar com responsável</a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? t("Fechar menu") : t("Abrir menu")} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }} aria-labelledby="hero-title">
          <div className="hero-overlay" />
          <div className="hero-grid" />
          <div className="hero-content container">
            <Reveal className="hero-copy">
              <div className="eyebrow">ATIVO INSULAR · BAÍA DE GUANABARA · GRADIM, SÃO GONÇALO</div>
              <h1 id="hero-title">Ilha do Tavares<span>.</span></h1>
              <p className="hero-subtitle">Potencial logístico, naval e offshore na Baía de Guanabara.</p>
              <p className="hero-line">Venda, arrendamento ou parceria estratégica.</p>
              <p className="hero-disclaimer">Ativo para avaliação de investidores e operadores. <strong>Qualquer desenvolvimento depende de regularização patrimonial, viabilidade técnica e licenciamento.</strong></p>
              <div className="hero-actions">
                <a className="button button--gold" href="#contato">Solicitar conversa inicial <ArrowUpRight size={17} /></a>
                <a className="text-link" href="#oportunidade">Ver enquadramento da oportunidade <ArrowDown size={16} /></a>
              </div>
            </Reveal>
            <div className="hero-aside" aria-label={t("Identificação da oportunidade")}>
              <span className="hero-aside-line" />
              <span>DOCUMENTO INSTITUCIONAL</span>
              <span>USO SUJEITO A DUE DILIGENCE</span>
            </div>
          </div>
          <a className="scroll-cue" href="#oportunidade" aria-label={t("Descer para A oportunidade")}><span>SCROLL</span><ChevronDown size={18} /></a>
        </section>

        <section className="section section-dark" id="oportunidade">
          <div className="container">
            <SectionMarker number="01" label="A OPORTUNIDADE" />
            <div className="section-intro section-intro--split">
              <Reveal><h2>Uma presença insular a considerar na baía.</h2></Reveal>
              <Reveal><p>Um ativo para avaliação de investidores e operadores da cadeia naval, logística e offshore, com alternativas de uso a confirmar.</p></Reveal>
            </div>
            <div className="opportunity-grid">
              <Reveal className="info-block"><IconTile><MapPin size={21} /></IconTile><h3>Localização</h3><p>Inserida na Baía de Guanabara, próxima ao Gradim e conectada por via marítima a Niterói e ao Rio de Janeiro.</p></Reveal>
              <Reveal className="info-block"><IconTile><Compass size={21} /></IconTile><h3>Tese comercial</h3><p>Possível apoio offshore, logística, manutenção leve, armazenagem e serviços náuticos de baixo impacto.</p></Reveal>
              <Reveal className="info-block info-block--accent"><IconTile><Scale size={21} /></IconTile><h3>Condição de uso</h3><p>Qualquer desenvolvimento depende de regularização patrimonial, viabilidade técnica e licenciamento.</p></Reveal>
            </div>
          </div>
        </section>

        <section className="section section-gray" id="contexto">
          <div className="container">
            <SectionMarker number="02" label="CONTEXTO" />
            <div className="market-layout">
              <Reveal className="market-copy"><p className="kicker">CENÁRIO DE MERCADO</p><h2>Crescimento do petróleo offshore no Brasil.</h2><p>A expansão do Pré-Sal pode demandar embarcações de suprimento, bases logísticas, manutenção naval, equipamentos submarinos, inspecção, armazenagem, transporte marítimo, resposta ambiental e descomissionamento.</p><p className="market-note">A tese depende de confirmação actualizada de mercado.</p></Reveal>
              <Reveal className="metric-panel"><div className="metric-number"><span>3,4</span><MoveRight size={34} /><span>5,2</span></div><div className="metric-unit">milhões de barris/dia</div><p>Cenário optimista descrito no material.</p></Reveal>
            </div>
            <div className="market-data-grid">
              <div><h3>Investidores citados</h3><p>Petrobras, Shell, TotalEnergies, Equinor, BP, ExxonMobil, Karoon, Prio, Trident Energy.</p></div>
              <div><h3>Escopo operacional</h3><p>FPSOs, poços, linhas submarinas, escoamento, reinjecção de gás e CO2, equipamentos e manutenção.</p></div>
              <div><h3>Campos citados</h3><p>Búzios, Mero, Atapu, Sépia, Tupi, Itapu, Raia, Campos, cessão onerosa e novas áreas.</p></div>
            </div>
            <p className="closing-line">Búzios e Mero aparecem no material como projectos relevantes para a expansão e para a cadeia de serviços.</p>
          </div>
        </section>

        <section className="image-section" id="polo-regional" style={{ backgroundImage: `url(${REGIONAL_IMAGE})` }}>
          <div className="image-section-overlay" />
          <div className="container image-section-content">
            <Reveal><SectionMarker number="03" label="POLO REGIONAL" /><h2>Baía de Guanabara: polo naval e offshore.</h2><p>O entorno reúne estaleiros, oficinas navais, empresas de engenharia, bases de apoio, infraestrutura portuária e mão de obra especializada.</p><p>Niterói, São Gonçalo e Rio de Janeiro têm tradição em construção, reparo, conversão e manutenção de embarcações e plataformas.</p><p className="gold-note">A condição atual dos ativos, obras e contratos requer confirmação independente.</p></Reveal>
          </div>
        </section>

        <section className="section section-dark" id="localizacao">
          <div className="container">
            <SectionMarker number="04" label="LOCALIZAÇÃO" />
            <div className="location-layout">
              <Reveal className="map-card" aria-label={t("Mapa esquemático da localização")}>
                <div className="map-card-top"><span>BAÍA DE GUANABARA</span><span>MAPA ESTÁTICO</span></div>
                <div className="map-art map-art--official"><img src={MAP_IMAGE} alt={t("Mapa da Baía de Guanabara com localização regional marcada")} /></div>
                <div className="map-card-bottom"><Navigation size={15} /> Baía de Guanabara · Rio de Janeiro</div>
                <ViewOnMap locationName="Ilha do Tavares" address="-22.824233538634235, -43.09865877495924" language={language} />
              </Reveal>
              <Reveal className="location-copy"><h2>Localização estratégica.</h2><div className="stacked-points"><div><h3>Gradim e São Gonçalo</h3><p>Conexão com áreas costeiras, oficinas, armazéns e prestadores de serviços.</p></div><div><h3>Niterói e Rio de Janeiro</h3><p>Acesso marítimo a centros navais, corporativos e de suporte industrial.</p></div><div><h3>Porto do Rio e corredores regionais</h3><p>Possibilidade de apoio complementar para suprimentos, equipamentos e transporte.</p></div></div><div className="asset-facts" aria-label="Dados do ativo"><h3>Dados do ativo</h3><dl><div><dt>Distância do continente</dt><dd>0,5 milha náutica</dd></div><div><dt>Área da ilha</dt><dd>356.750 m²</dd></div><div><dt>Base de apoio no continente</dt><dd>334 m²</dd></div></dl></div><p className="location-note">Atracação, profundidade, infraestrutura e autorizações exigem estudos específicos.</p></Reveal>
            </div>
          </div>
        </section>

        <section className="section section-gray" id="beneficios">
          <div className="container">
            <SectionMarker number="05" label="BENEFÍCIOS" />
            <Reveal><div className="section-heading"><h2>Benefícios logísticos potenciais.</h2><p>Uma leitura de complementaridade, sempre sujeita à verificação de operação e acessos.</p></div></Reveal>
            <div className="cards-grid cards-grid--three">
              <Reveal className="dark-card"><span className="card-index">01</span><IconTile><Factory size={21} /></IconTile><h3>Gradim e cadeia naval</h3><p>Ligação com áreas terrestres, oficinas, armazéns, fornecedores e mão de obra especializada.</p></Reveal>
              <Reveal className="dark-card"><span className="card-index">02</span><IconTile><Ship size={21} /></IconTile><h3>Baía e Porto do Rio</h3><p>Conexão marítima com Niterói, Rio e demais áreas da baía, com apoio complementar de suprimentos.</p></Reveal>
              <Reveal className="dark-card"><span className="card-index">03</span><IconTile><MoveRight size={21} /></IconTile><h3>Integração multimodal</h3><p>Possível conexão entre transporte marítimo e rodoviário, sujeita à verificação de operação e acessos.</p></Reveal>
            </div>
            <p className="section-footnote">A área também pode ser avaliada para monitorização, pesquisa, educação ambiental e recuperação ecológica.</p>
          </div>
        </section>

        <section className="section section-dark" id="aplicacoes">
          <div className="container">
            <SectionMarker number="06" label="APLICAÇÕES" />
            <div className="section-heading section-heading--wide"><Reveal><h2>Aplicações em estudo.</h2></Reveal><Reveal><p>Selecione um perfil de operador para reorganizar a leitura do bloco, sem substituir a etapa de estudos.</p></Reveal></div>
            <div className="profile-filter" role="tablist" aria-label={t("Aplicações por perfil de operador")}>
              {applicationProfiles.map((profile) => <button key={profile.id} type="button" role="tab" aria-selected={activeProfile === profile.id} className={activeProfile === profile.id ? "is-active" : ""} onClick={() => setActiveProfile(profile.id)}>{profile.label}</button>)}
            </div>
            <Reveal className="application-feature">
              <div className="application-feature-icon"><activeApplication.icon size={28} /></div>
              <div><span className="card-index">{activeProfile === "offshore" ? "01" : activeProfile === "estaleiro" ? "02" : "03"}</span><h3>{activeApplication.title}</h3><p>{activeApplication.copy}</p></div>
              <ArrowUpRight className="feature-arrow" size={22} />
            </Reveal>
            <p className="section-footnote">Cada aplicação requer estudo de demanda, engenharia, impacto ambiental, navegabilidade e modelo de operação.</p>
          </div>
        </section>

        <section className="section section-gray" id="prospeccao">
          <div className="container">
            <SectionMarker number="07" label="PROSPECÇÃO" />
            <Reveal><div className="section-heading"><h2>Empresas para prospecção.</h2><p>Perfis de interlocução para uma conversa comercial inicial.</p></div></Reveal>
            <div className="prospecting-grid"><div><span className="gold-label">Apoio marítimo</span><p>Edison Chouest, Bram, DOF, Solstad, Svitzer, Wilson Sons.</p></div><div><span className="gold-label">Subsea e engenharia</span><p>Oceaneering, Subsea7, Saipem, TechnipFMC, Helix, Baker Hughes, SLB, Halliburton.</p></div><div><span className="gold-label">Logística e conformidade</span><p>Monjasa, Blue Water Shipping, DNV, Bureau Veritas, ABS e empresas de inspecção.</p></div></div>
            <p className="closing-line">Operadoras como Petrobras, Shell, Equinor, TotalEnergies, BP, ExxonMobil, Prio, Trident, Enauta e PetroReconcavo podem ser clientes indirectos ou contratantes.</p>
          </div>
        </section>

        <section className="section section-dark" id="diferenciais">
          <div className="container">
            <SectionMarker number="08" label="DIFERENCIAIS" />
            <Reveal><div className="section-heading"><h2>Diferenciais competitivos.</h2></div></Reveal>
            <div className="differentials-grid"><div><span className="card-index">01</span><h3>Localização marítima</h3><p>Acesso directo à Baía de Guanabara e possibilidade de complementar instalações terrestres.</p></div><div><span className="card-index">02</span><h3>Ecossistema industrial</h3><p>Proximidade de estaleiros, fornecedores, mão de obra naval e empresas de engenharia.</p></div><div><span className="card-index">03</span><h3>Usos diversificados</h3><p>Apoio offshore, logística, manutenção, pesquisa, turismo e gestão ambiental, conforme viabilidade.</p></div></div>
            <p className="gold-statement">A demanda por inspecção, manutenção, segurança, gestão ambiental e descomissionamento pode persistir ao longo da transição energética.</p>
          </div>
        </section>

        <section className="section section-gray value-section" id="proposta">
          <div className="container">
            <SectionMarker number="09" label="PROPOSTA" />
            <div className="value-layout"><Reveal><h2>Proposta de valor para investidores.</h2><p>Presença na Baía de Guanabara, próxima a um ecossistema naval e offshore consolidado.</p></Reveal><div className="value-points"><Reveal><div><span>01</span><div><h3>Localização diferenciada</h3><p>Ativo insular com potencial de acesso marítimo e proximidade de fornecedores e clientes.</p></div></div></Reveal><Reveal><div><span>02</span><div><h3>Flexibilidade comercial</h3><p>Venda, arrendamento, parceria operacional ou desenvolvimento sob medida.</p></div></div></Reveal><Reveal><div><span>03</span><div><h3>Infraestrutura especializada</h3><p>Possibilidade de desenvolver uma operação complementar, conforme estudos e aprovações.</p></div></div></Reveal></div></div>
            <div className="commercial-terms"><h3>Condições comerciais</h3><div className="commercial-terms-grid"><div><span>Venda</span><strong>R$ 140.000.000</strong></div><div><span>Locação</span><strong>R$ 2.000.000</strong><small>Condições e prazo sob consulta.</small></div></div></div>
            <div className="investor-callout"><div><span className="gold-label">Chamada para investidores</span><h3>Uma próxima conversa pode começar por uma visita técnica.</h3></div><div className="investor-details"><p><strong>Perfis prioritários</strong> — Operadores offshore, apoio marítimo, logística, serviços submarinos, estaleiros, descomissionamento e tecnologia marítima.</p><p><strong>Formatos disponíveis</strong> — Venda, arrendamento de longo prazo, parceria operacional, joint venture e desenvolvimento sob medida.</p><p><strong>Próximo contacto</strong> — Visita técnica, definição da tese de uso e encaminhamento da diligência documental, técnica e ambiental.</p></div></div>
            <p className="micro-note">A lista de perfis representa público-alvo comercial, não interesse já manifestado.</p>
          </div>
        </section>

        <section className="section section-gray contact-section" id="contato">
          <div className="container">
            <SectionMarker number="10" label="CONTATO" />
            <div className="contact-layout"><Reveal className="contact-intro"><p className="kicker">PRÓXIMO PASSO</p><h2>Falar com responsável.</h2><div className="contact-person"><img className="contact-avatar" src={CONTACT_IMAGE} alt="Luiz Pinciara" /><div><strong>Luiz Pinciara</strong><a href="tel:+5521995221369"><Phone size={15} /> 21 99522-1369</a></div></div><p>Para agendar visita técnica ou solicitar informação adicional sobre o ativo, preencha o formulário ao lado. Ao enviar, abriremos o WhatsApp com os dados preenchidos para iniciar a conversa.</p><div className="contact-links"><a href="#contato"><Send size={18} /> Preencher formulário</a></div></Reveal>
              <Reveal className="contact-form-card"><form onSubmit={handleFormSubmit} noValidate><div className="form-grid"><label>Nome*<input name="name" required aria-required="true" autoComplete="name" />{formStatus === "error" && <small className="field-error">Preencha este campo.</small>}</label><label>Empresa*<input name="company" required aria-required="true" autoComplete="organization" />{formStatus === "error" && <small className="field-error">Preencha este campo.</small>}</label><label>E-mail*<input name="email" type="email" required aria-required="true" autoComplete="email" />{formStatus === "error" && <small className="field-error">Introduza um e-mail válido.</small>}</label><label>Telefone*<input name="phone" type="tel" required aria-required="true" autoComplete="tel" />{formStatus === "error" && <small className="field-error">Preencha este campo.</small>}</label></div><label className="consent-check"><input type="checkbox" name="lgpd" required aria-required="true" /> <span>Autorizo o contacto da Pinciara Imóveis Exclusivos para fins de prospecção comercial. Posso solicitar eliminação dos dados a qualquer momento.</span></label><button className="button button--gold form-submit" type="submit">Enviar mensagem <Send size={17} /></button>{formStatus === "success" && <div className="form-success" role="status"><Check size={18} /> O WhatsApp foi aberto com os dados preenchidos para iniciar a conversa.</div>}</form></Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><Brand compact /><p>Ilha do Tavares · Gradim, São Gonçalo · Rio de Janeiro — Brasil.</p><p>© 2026 Pinciara Imóveis Exclusivos. Todos os direitos reservados.</p></div><div><p>Luiz Pinciara · <a href="tel:+5521995221369">21 99522-1369</a></p><p>Documento institucional. Uso sujeito a due diligence.</p><nav><a href="#contato">Política de Privacidade</a><a href="#contato">Termos de Uso</a><a href="#contato">Solicitar eliminação de dados</a></nav></div></div></footer>

      {showTop && <button className="back-to-top" type="button" aria-label={t("Voltar ao topo")} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ChevronUp size={19} /></button>}

      {consentVisible && <aside className="consent-banner" role="dialog" aria-label={t("Consentimento")}><div><span className="gold-label">PRIVACIDADE</span><p>Autorizo o contacto da Pinciara Imóveis Exclusivos para fins de prospecção comercial. Posso solicitar eliminação dos dados a qualquer momento.</p></div><div className="consent-actions"><button type="button" onClick={() => handleConsent(true)}>Aceitar</button><button type="button" onClick={() => handleConsent(false)}>Agora não</button></div></aside>}
    </div>
  );
}
