import { useEffect, useMemo, useRef, useState } from "react";
import { animate, createScope, stagger } from "animejs";
import {
  AlertCircle,
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Compass,
  Factory,
  FileDown,
  Hammer,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
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
import { LegalModal, type LegalTab } from "@/components/LegalModal";

const HERO_IMAGE = "/assets/hero-ilha.jpg";
const REGIONAL_IMAGE = "/assets/regional-ilha.jpg";
const LOGO_IMAGE = "/assets/logo-pinciara.png";
const CONTACT_IMAGE = "/assets/luiz-pinciara.png";
const INFLUENCE_IMAGE = "/assets/ilha-areas-influencia.jpeg";
const TERMINAL_IMAGE = "/assets/terminal-conceitual.jpeg";
const PITCH_DECK_PT = "/assets/docs/Pitch_Deck_Institucional_Ilha_do_Tavares_Portugues.pdf";
const PITCH_DECK_EN = "/assets/docs/Pitch_Deck_Institucional_Ilha_do_Tavares_English.pdf";

const navItems = [
  ["A oportunidade", "oportunidade"],
  ["Contexto", "contexto"],
  ["Localização", "localizacao"],
  ["Aplicações", "aplicacoes"],
  ["Projetos", "projetos"],
  ["Contato", "contato"],
] as const;

const englishCopy: Record<string, string> = {
  "A oportunidade": "The opportunity", "Contexto": "Context", "Localização": "Location", "Aplicações": "Applications", "Projetos": "Projects", "Contato": "Contact",
  "ILHA DO TAVARES": "TAVARES ISLAND", "Ilha do Tavares": "Tavares Island", "Baía de Guanabara · Gradim, São Gonçalo": "Guanabara Bay · Gradim, São Gonçalo",
  "Falar com responsável": "Speak with representative", "ATIVO INSULAR · BAÍA DE GUANABARA · GRADIM, SÃO GONÇALO": "ISLAND ASSET · GUANABARA BAY · GRADIM, SÃO GONÇALO",
  "Potencial logístico, naval e offshore na Baía de Guanabara.": "Logistics, naval, and offshore potential in Guanabara Bay.",
  "Venda, arrendamento ou parceria estratégica.": "Sale, lease, or strategic partnership.",
  "Ativo para avaliação de investidores e operadores. ": "Asset for investor and operator assessment. ",
  "Ativo para avaliação de investidores e operadores.": "Asset for investor and operator assessment.",
  "Qualquer desenvolvimento depende de regularização patrimonial, viabilidade técnica e licenciamento.": "Any development depends on title regularization, technical feasibility, and licensing.",
  "Solicitar conversa inicial": "Request initial meeting", "Ver enquadramento da oportunidade": "View opportunity overview", "SCROLL": "SCROLL",
  "A OPORTUNIDADE": "THE OPPORTUNITY", "Uma presença insular a considerar na baía.": "A distinctive island asset to consider in the bay.",
  "Um ativo para avaliação de investidores e operadores da cadeia naval, logística e offshore, com alternativas de uso a confirmar.": "An asset for investors and operators in the naval, logistics, and offshore supply chain, with uses subject to confirmation.",
  "Tese comercial": "Commercial thesis", "Condição de uso": "Conditions of use",
  "Inserida na Baía de Guanabara, próxima ao Gradim e conectada por via marítima a Niterói e ao Rio de Janeiro.": "Located in Guanabara Bay, near Gradim and connected by sea to Niterói and Rio de Janeiro.",
  "Possível apoio offshore, logística, manutenção leve, armazenagem e serviços náuticos de baixo impacto.": "Potential offshore support, logistics, light maintenance, storage, and low-impact nautical services.",
  "CONTEXTO": "CONTEXT", "CENÁRIO DE MERCADO": "MARKET CONTEXT", "Crescimento do petróleo offshore no Brasil.": "Offshore oil expansion in Brazil.",
  "A tese depende de confirmação atualizada de mercado.": "The thesis depends on updated market confirmation.", "Cenário otimista descrito no material.": "Optimistic scenario described in institutional materials.",
  "POLO REGIONAL": "REGIONAL HUB", "Baía de Guanabara: polo naval e offshore.": "Guanabara Bay: naval and offshore hub.",
  "LOCALIZAÇÃO": "LOCATION", "Localização estratégica.": "Strategic location.", "Dados do ativo": "Asset data", "Distância do continente": "Distance from mainland", "Área da ilha": "Island area", "Base de apoio no continente": "Mainland support base",
  "BENEFÍCIOS": "BENEFITS", "Benefícios logísticos potenciais.": "Potential logistics advantages.", "APLICAÇÕES": "APPLICATIONS", "Aplicações em estudo.": "Applications under study.",
  "Operador offshore": "Offshore operator", "Estaleiro": "Shipyard", "Investidor imobiliário": "Real estate investor", "Apoio offshore e naval": "Offshore & naval support",
  "PROSPECÇÃO": "OUTREACH", "Empresas para prospecção.": "Target companies for outreach.", "Perfis de interlocução para uma conversa comercial inicial.": "Key industry profiles for an initial commercial discussion.",
  "DIFERENCIAIS": "DIFFERENTIATORS", "Diferenciais competitivos.": "Competitive differentiators.", "PROPOSTA": "PROPOSITION", "Proposta de valor para investidores.": "Value proposition for investors.",
  "Condições comerciais": "Commercial terms", "Venda": "Sale", "Locação": "Lease", "Condições e prazo sob consulta.": "Terms and lease duration upon request.",
  "CHAMADA PARA INVESTIDORES": "INVESTOR CALL", "Uma próxima conversa pode começar por uma visita técnica.": "The next step can begin with a site visit.",
  "CONTATO": "CONTACT", "PRÓXIMO PASSO": "NEXT STEP", "Falar com responsável.": "Speak with representative.",
  "Preencher formulário": "Fill out the form", "Nome*": "Name*", "Empresa*": "Company*", "Telefone*": "Phone*", "Enviar mensagem": "Send message",
  "Política de Privacidade": "Privacy Policy", "Termos de Uso": "Terms of Use", "Solicitar eliminação de dados": "Request data deletion", "PRIVACIDADE": "PRIVACY", "Aceitar": "Accept", "Agora não": "Not now",
  "Navegação principal": "Primary navigation", "Pular para o conteúdo": "Skip to main content", "Identificação da oportunidade": "Opportunity identification", "DOCUMENTO INSTITUCIONAL": "INSTITUTIONAL DOCUMENT", "USO SUJEITO A DUE DILIGENCE": "SUBJECT TO DUE DILIGENCE", "Descer para A oportunidade": "Scroll to The opportunity",
  "A expansão do Pré-Sal demanda embarcações de suprimento, bases logísticas, manutenção naval, equipamentos submarinos, inspeção, armazenagem, transporte marítimo, resposta ambiental e descomissionamento.": "Pre-salt oil expansion drives demand for supply vessels, logistics bases, naval maintenance, subsea equipment, inspection, warehousing, maritime transport, environmental response, and decommissioning.",
  "milhões de barris/dia": "million barrels/day", "Investidores citados": "Industry players cited", "Escopo operacional": "Operational scope", "Campos citados": "Offshore fields cited", "FPSOs, poços, linhas submarinas, escoamento, reinjeção de gás e CO2, equipamentos e manutenção.": "FPSOs, wells, subsea flowlines, gas and CO2 reinjection, specialized equipment, and maintenance.", "Búzios, Mero, Atapu, Sépia, Tupi, Itapu, Raia, Campos, cessão onerosa e novas áreas.": "Búzios, Mero, Atapu, Sépia, Tupi, Itapu, Raia, Campos, transfer-of-rights areas, and frontier blocks.", "Búzios e Mero aparecem no material como projetos relevantes para a expansão e para a cadeia de serviços.": "Búzios and Mero stand out as anchor projects driving offshore support and maritime service chains.",
  "O entorno reúne estaleiros, oficinas navais, empresas de engenharia, bases de apoio, infraestrutura portuária e mão de obra especializada.": "The surrounding area concentrates shipyards, naval workshops, engineering firms, offshore support bases, port infrastructure, and specialized labor.", "Niterói, São Gonçalo e Rio de Janeiro têm tradição em construção, reparo, conversão e manutenção de embarcações e plataformas.": "Niterói, São Gonçalo, and Rio de Janeiro have a proven legacy in shipbuilding, repair, conversion, and platform maintenance.", "A condição atual dos ativos, obras e contratos requer confirmação independente.": "The current condition of assets, site structures, and agreements requires independent due diligence.",
  "BAÍA DE GUANABARA": "GUANABARA BAY", "MAPA ONLINE": "ONLINE MAP", "Baía de Guanabara · Rio de Janeiro": "Guanabara Bay · Rio de Janeiro", "Mapa online da localização": "Interactive location map", "Gradim e São Gonçalo": "Gradim and São Gonçalo", "Conexão com áreas costeiras, oficinas, armazéns e prestadores de serviços.": "Direct link to coastal industrial zones, fabrication yards, warehouses, and marine service contractors.", "Niterói e Rio de Janeiro": "Niterói and Rio de Janeiro", "Acesso marítimo a centros navais, corporativos e de suporte industrial.": "Fast maritime access to premier naval, corporate, and offshore operations hubs.", "Porto do Rio e corredores regionais": "Port of Rio and regional freight corridors", "Possibilidade de apoio complementar para suprimentos, equipamentos e transporte.": "Capability for complementary staging of offshore supplies, heavy equipment, and crew logistics.", "0,5 milha náutica": "0.5 nautical mile", "356.750 m²": "356,750 m² (approx. 88 acres)", "Atracação, profundidade, infraestrutura e autorizações exigem estudos específicos.": "Berthing depth, draft constraints, civil infrastructure, and regulatory permits require dedicated engineering studies.",
  "Uma leitura de complementaridade, sempre sujeita à verificação de operação e acessos.": "A complementary logistics assessment, subject to maritime access and operational verification.", "Gradim e cadeia naval": "Gradim and the naval supply chain", "Ligação com áreas terrestres, oficinas, armazéns, fornecedores e mão de obra especializada.": "Direct mainland connection to industrial supply yards, specialized machine shops, and marine technicians.", "Baía e Porto do Rio": "Guanabara Bay and Port of Rio", "Conexão marítima com Niterói, Rio e demais áreas da baía, com apoio complementar de suprimentos.": "Strategic maritime link to Niterói, Rio de Janeiro, and bay terminals for supply and logistics support.", "Integração multimodal": "Multimodal connectivity", "Possível conexão entre transporte marítimo e rodoviário, sujeita à verificação de operação e acessos.": "Feasible synergy between marine freight and federal highway BR-101, subject to access studies.", "A área também pode ser avaliada para monitoramento, pesquisa, educação ambiental e recuperação ecológica.": "The site can also accommodate environmental monitoring, research stations, education, and ecological restoration.",
  "Selecione um perfil de operador para reorganizar a leitura do bloco, sem substituir a etapa de estudos.": "Select an operator profile to tailor use cases without replacing formal engineering due diligence.", "Aplicações por perfil de operador": "Use cases by operator profile", "Escala de embarcações, armazenagem temporária, apoio a inspeção, manutenção leve, ROV e mergulho profissional.": "Vessel staging, temporary equipment storage, inspection support, light maintenance, ROV operations, and commercial diving.", "Descomissionamento": "Decommissioning & recycling", "Recebimento, triagem e armazenagem temporária de equipamentos e materiais, mediante licenciamento específico.": "Receiving, sorting, and temporary staging of retired offshore subsea equipment, subject to environmental licensing.", "Ambiental e corporativo": "Environmental & corporate hub", "Monitoramento da baía, pesquisa, treinamento, eventos corporativos e turismo náutico de baixo impacto.": "Bay ecological monitoring, marine research, workforce safety training, and low-impact eco-nautical initiatives.", "Cada aplicação requer estudo de demanda, engenharia, impacto ambiental, navegabilidade e modelo de operação.": "Each use case requires demand verification, bathymetric surveys, environmental impact studies, and tailored operational models.",
  "PROJETOS": "PROJECTS", "Projetos conceituais para leitura estratégica da ilha.": "Conceptual development plans for strategic evaluation.", "Uma visão territorial para organizar possibilidades de ocupação, sempre sujeitas à diligência e aos estudos aplicáveis.": "A master planning framework organizing spatial zoning, subject to legal and technical due diligence.", "Áreas de influência da Ilha do Tavares": "Tavares Island influence zones", "Imagem aérea da Ilha do Tavares com áreas de influência": "Aerial view of Tavares Island highlighting strategic industrial influence zones", "Referências de influência": "Key logistics benchmarks", "Ilha D’Água · Transpetro": "Ilha D’Água · Transpetro", "1 milha náutica": "1 nautical mile", "Refinaria Duque de Caxias": "REDUC Refinery", "8 milhas náuticas": "8 nautical miles", "Porto do Rio": "Port of Rio", "7 milhas náuticas": "7 nautical miles", "BR-101": "BR-101 Highway", "500 m": "500 m (1,640 ft)", "GASOLUB": "GASOLUB Energy Hub", "35 km": "35 km (22 mi)", "Ilha Redonda · Transpetro": "Ilha Redonda · Transpetro", "3 milhas náuticas": "3 nautical miles", "Distâncias indicadas na imagem de referência e sujeitas a confirmação técnica.": "Distances shown in concept graphics are indicative and subject to technical verification.", "Conceito principal": "Master concept", "Terminal marítimo multidisciplinar.": "Multipurpose marine terminal.", "Uma proposta de terminal privado para integrar atracação, apoio offshore, logística e serviços operacionais em uma leitura única do ativo.": "A private offshore terminal concept integrating dedicated berths, logistics yards, supply staging, and marine support operations.", "Prancha conceitual do terminal marítimo multidisciplinar": "Concept master plan for the multipurpose marine terminal", "Cais e atracação": "Piers and vessel berthing", "Tancagem e armazenagem": "Fuel/fluid bunkering & dry storage", "Apoio offshore e reparos leves": "Offshore support & topside repairs", "Pátio, edifício operacional e segurança": "Cargo yard, administration & security", "Frentes complementares": "Complementary master plan options", "Hub náutico e de serviços": "Maritime & nautical services hub", "Apoio a embarcações, suprimentos, manutenção leve e treinamento operacional, em escala compatível com os estudos de acesso e navegabilidade.": "Support for workboats, bunkering, topside maintenance, and marine workforce training sized to navigation studies.", "Reserva operacional e ambiental": "Operational & eco-conservation zone", "Monitoramento da baía, pesquisa, educação ambiental e ocupação de baixo impacto como parte da leitura de preservação e uso responsável.": "Estuary monitoring, marine biology research, ecological education, and sustainable low-impact facilities.", "Estudos conceituais para avaliação estratégica. Qualquer implantação depende de diligência patrimonial, viabilidade técnica, ambiental, navegabilidade, licenciamento e aprovações aplicáveis.": "Conceptual master plans for strategic review. Any development is strictly conditional upon title due diligence, bathymetric feasibility, environmental impact assessment, and regulatory licensing.",
  "Apoio marítimo": "Offshore vessel operators", "Subsea e engenharia": "Subsea & engineering", "Logística e conformidade": "Logistics & classification", "Monjasa, Blue Water Shipping, DNV, Bureau Veritas, ABS e empresas de inspeção.": "Monjasa, Blue Water Shipping, DNV, Bureau Veritas, ABS, and offshore inspection agencies.", "Operadoras como Petrobras, Shell, Equinor, TotalEnergies, BP, ExxonMobil, Prio, Trident, Enauta e PetroReconcavo podem ser clientes indiretos ou contratantes.": "E&P operators such as Petrobras, Shell, Equinor, TotalEnergies, BP, ExxonMobil, Prio, Trident, and Enauta represent prospective contract demand.",
  "Localização marítima": "Strategic marine location", "Acesso direto à Baía de Guanabara e possibilidade de complementar instalações terrestres.": "Direct navigable access to Guanabara Bay with potential to complement mainland logistics infrastructure.", "Ecossistema industrial": "Established industrial cluster", "Proximidade de estaleiros, fornecedores, mão de obra naval e empresas de engenharia.": "Immediate proximity to tier-1 shipyards, offshore vendors, certified naval labor, and marine engineering contractors.", "Usos diversificados": "Multipurpose operational versatility", "Apoio offshore, logística, manutenção, pesquisa, turismo e gestão ambiental, conforme viabilidade.": "Offshore staging, warehousing, light repairs, environmental research, and eco-tourism, subject to zoning.", "A demanda por inspeção, manutenção, segurança, gestão ambiental e descomissionamento pode persistir ao longo da transição energética.": "Demand for subsea inspection, hull maintenance, HSE operations, environmental compliance, and decommissioning remains resilient throughout the energy transition.",
  "Presença na Baía de Guanabara, próxima a um ecossistema naval e offshore consolidado.": "Prime position in Guanabara Bay, anchored within Brazil's premier offshore and shipbuilding cluster.", "Localização diferenciada": "Distinctive island asset", "Ativo insular com potencial de acesso marítimo e proximidade de fornecedores e clientes.": "Private island asset with navigable maritime access and strategic proximity to operators, yards, and suppliers.", "Flexibilidade comercial": "Flexible deal structures", "Venda, arrendamento, parceria operacional ou desenvolvimento sob medida.": "Outright acquisition, long-term lease, joint venture, or build-to-suit development.", "Infraestrutura especializada": "Custom development potential", "Possibilidade de desenvolver uma operação complementar, conforme estudos e aprovações.": "Opportunity to engineer custom waterfront infrastructure in accordance with permits and licensing.", "Perfis prioritários": "Target industry profiles", "Operadores offshore, apoio marítimo, logística, serviços submarinos, estaleiros, descomissionamento e tecnologia marítima.": "Offshore fleet operators, subsea engineering contractors, logistics providers, shipyards, decommissioning firms, and marine tech companies.", "Formatos disponíveis": "Transaction models", "Venda, arrendamento de longo prazo, parceria operacional, joint venture e desenvolvimento sob medida.": "Sale, long-term maritime lease, operating partnership, equity joint venture, or bespoke build-to-suit.", "Próximo contato": "Next steps", "Visita técnica, definição da tese de uso e encaminhamento da diligência documental, técnica e ambiental.": "Technical site visit, alignment on operating thesis, and commencement of legal, environmental, and title due diligence.", "A lista de perfis representa público-alvo comercial, não interesse já manifestado.": "Target company names illustrate commercial synergy and do not imply formal commitments.",
  "Para agendar visita técnica ou solicitar informação adicional sobre o ativo, preencha o formulário ao lado. Ao enviar, abriremos o WhatsApp com os dados preenchidos para iniciar a conversa.": "To schedule a site visit or request detailed technical materials, complete the form alongside. WhatsApp will open with your pre-filled inquiry to connect directly with our representative.", "Preencha este campo.": "Please complete this field.", "Por favor, insira um e-mail válido.": "Please enter a valid email address.", "Autorizo o contato da Pinciara Imóveis Exclusivos para fins de prospecção comercial. Posso solicitar eliminação dos dados a qualquer momento.": "I authorize Pinciara Imóveis Exclusivos to contact me for commercial inquiries regarding this asset. I may revoke consent and request data deletion at any time.", "O WhatsApp foi aberto com os dados preenchidos para iniciar a conversa.": "WhatsApp was opened with your pre-filled details to begin the conversation.",
  "Ilha do Tavares · Gradim, São Gonçalo · Rio de Janeiro — Brasil.": "Tavares Island · Gradim, São Gonçalo · Rio de Janeiro — Brazil.", "© 2026 Pinciara Imóveis Exclusivos. Todos os direitos reservados.": "© 2026 Pinciara Imóveis Exclusivos. All rights reserved.", "Documento institucional. Uso sujeito a due diligence.": "Institutional document. All uses subject to due diligence.", "Voltar ao topo": "Back to top", "Consentimento": "Privacy Consent"
  , "Ver no mapa online": "View interactive map", "Carregando mapa": "Loading map...", "Fechar mapa": "Close map", "Fechar menu": "Close menu", "Abrir menu": "Open menu", "Chamada para investidores": "INVESTOR CALL", "— Operadores offshore, apoio marítimo, logística, serviços submarinos, estaleiros, descomissionamento e tecnologia marítima.": "— Offshore operators, marine support, logistics, subsea services, shipyards, decommissioning, and maritime technology.", "— Venda, arrendamento de longo prazo, parceria operacional, joint venture e desenvolvimento sob medida.": "— Sale, long-term maritime lease, operating partnership, joint venture, and build-to-suit development.", "— Visita técnica, definição da tese de uso e encaminhamento da diligência documental, técnica e ambiental.": "— Site inspection visit, commercial thesis alignment, and technical, legal, and environmental due diligence."
  , "Conversar diretamente no WhatsApp": "Chat directly on WhatsApp", "Baixar Pitch Deck Oficial (PDF)": "Download Official Pitch Deck (PDF)", "Baixar Pitch Deck": "Download Pitch Deck", "Enviar outra mensagem": "Send another message", "Mensagem pronta no WhatsApp!": "Message ready on WhatsApp!", "Abrimos o WhatsApp com seus dados preenchidos.": "WhatsApp was opened with your pre-filled details.", "Se a janela não abriu automaticamente, toque no botão abaixo para iniciar a conversa com Luiz Pinciara.": "If the window didn't open automatically, tap the button below to start the conversation with Luiz Pinciara.", "Abrir WhatsApp agora": "Open WhatsApp now", "Por favor, informe seu nome.": "Please enter your name.", "Por favor, informe sua empresa.": "Please enter your company.", "Por favor, informe seu telefone com DDD.": "Please enter your phone number.", "Telefone incompleto (mínimo 10 dígitos com DDD).": "Incomplete phone number (at least 10 digits).", "É necessário autorizar o contato para prosseguir.": "You must authorize contact to proceed.", "Abrir termos de privacidade": "Open privacy terms"
};

const applicationProfiles = [
  {
    id: "offshore",
    label: "Operador offshore",
    title: "Apoio offshore e naval",
    copy: "Escala de embarcações, armazenagem temporária, apoio a inspeção, manutenção leve, ROV e mergulho profissional.",
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
    copy: "Monitoramento da baía, pesquisa, treinamento, eventos corporativos e turismo náutico de baixo impacto.",
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
      <img
        className="brand-logo-image"
        src={LOGO_IMAGE}
        alt="Pinciara Imóveis Exclusivos"
        width={compact ? 160 : 150}
        height={34}
        decoding="async"
      />
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
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalActiveTab, setLegalActiveTab] = useState<LegalTab>("privacy");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    lgpd: false,
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    lgpd?: string;
  }>({});
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);
  const featureCardRef = useRef<HTMLDivElement>(null);

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

    let revealObserver: IntersectionObserver | null = null;

    if (rootRef.current) {
      scopeRef.current = createScope({ root: rootRef }).add(() => {
        // Hero entrance sequence
        animate(".hero-copy > *", {
          opacity: [0, 1],
          translateY: [24, 0],
          delay: stagger(100, { start: 150 }),
          duration: 850,
          ease: "outCubic",
        });

        animate(".hero-aside", {
          opacity: [0, 1],
          translateX: [24, 0],
          delay: 500,
          duration: 850,
          ease: "outCubic",
        });

        // Continuous cue motion
        animate(".scroll-cue", {
          translateY: [0, 6],
          duration: 1200,
          alternate: true,
          loop: true,
          ease: "inOutQuad",
        });

        // Scroll reveals for cards and sections
        revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              if (el.dataset.animated === "true") return;
              el.dataset.animated = "true";

              if (el.classList.contains("stagger-group")) {
                const items = el.querySelectorAll(".stagger-item");
                if (items.length > 0) {
                  animate(items, {
                    opacity: [0, 1],
                    translateY: [24, 0],
                    duration: 750,
                    delay: stagger(100),
                    ease: "outCubic",
                  });
                  return;
                }
              }

              animate(el, {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 750,
                ease: "outCubic",
              });
            });
          },
          { threshold: 0.12 }
        );

        const targets = rootRef.current?.querySelectorAll(".reveal, .stagger-group");
        targets?.forEach((target) => revealObserver?.observe(target));
      });
    }

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
      revealObserver?.disconnect();
      scopeRef.current?.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (featureCardRef.current) {
      animate(featureCardRef.current, {
        opacity: [0.35, 1],
        translateY: [12, 0],
        scale: [0.98, 1],
        duration: 400,
        ease: "outCubic",
      });
    }
  }, [activeProfile]);

  useEffect(() => {
    if (formStatus === "success") {
      animate(".form-success", {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 450,
        ease: "outBack",
      });
    }
  }, [formStatus]);

  const closeMenu = () => setMenuOpen(false);

  const openLegalModal = (tab: LegalTab) => {
    setLegalActiveTab(tab);
    setLegalModalOpen(true);
  };

  const handleFieldChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handlePhoneChange = (raw: string) => {
    if (raw.startsWith("+")) {
      handleFieldChange("phone", raw);
      return;
    }
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 2 && digits.length <= 6) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length > 6 && digits.length <= 10) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    handleFieldChange("phone", formatted);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const isEn = language === "en-US";
    if (!formData.name.trim()) {
      errors.name = isEn ? "Please enter your name." : "Por favor, informe seu nome.";
    }
    if (!formData.company.trim()) {
      errors.company = isEn ? "Please enter your company." : "Por favor, informe sua empresa.";
    }
    if (!formData.email.trim()) {
      errors.email = isEn ? "Please enter your email." : "Por favor, informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = isEn ? "Please enter a valid email address." : "Por favor, insira um e-mail válido.";
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      errors.phone = isEn ? "Please enter your phone number." : "Por favor, informe seu telefone com DDD.";
    } else if (phoneDigits.length < 10 && !formData.phone.startsWith("+")) {
      errors.phone = isEn ? "Incomplete phone number (at least 10 digits)." : "Telefone incompleto (mínimo 10 dígitos com DDD).";
    }
    if (!formData.lgpd) {
      errors.lgpd = isEn ? "You must authorize contact to proceed." : "É necessário autorizar o contato para prosseguir.";
    }
    return errors;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus("error");
      const firstError = Object.keys(errors)[0];
      const targetEl = rootRef.current?.querySelector(`[name="${firstError}"]`) as HTMLElement | null;
      targetEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      targetEl?.focus();
      return;
    }
    setFormErrors({});
    const isEn = language === "en-US";
    const message = isEn
      ? [
          "Hello, Luiz. I would like to inquire about Tavares Island.",
          "",
          `Name: ${formData.name}`,
          `Company: ${formData.company}`,
          `Email: ${formData.email}`,
          `Phone: ${formData.phone}`,
        ].join("\n")
      : [
          "Olá, Luiz. Gostaria de falar sobre a Ilha do Tavares.",
          "",
          `Nome: ${formData.name}`,
          `Empresa: ${formData.company}`,
          `E-mail: ${formData.email}`,
          `Telefone: ${formData.phone}`,
        ].join("\n");
    const waUrl = `https://wa.me/5521995221369?text=${encodeURIComponent(message)}`;
    setSubmittedWhatsAppUrl(waUrl);
    trackEvent("whatsapp_click");
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setFormStatus("success");
  };

  const handleResetForm = () => {
    setFormData({ name: "", company: "", email: "", phone: "", lgpd: false });
    setFormErrors({});
    setFormStatus("idle");
    setSubmittedWhatsAppUrl("");
  };

  const handleConsent = (accepted: boolean) => {
    window.localStorage.setItem("ilha-tavares-consent", accepted ? "accepted" : "declined");
    setConsentVisible(false);
  };

  return (
    <div className="site-shell" ref={rootRef}>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <a className="skip-link" href="#oportunidade">
        {language === "en-US" ? "Skip to main content" : "Pular para o conteúdo"}
      </a>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="header-brand" href="#top" onClick={closeMenu}>
          <Brand />
          <span className="header-project">
            <strong>{language === "en-US" ? "TAVARES ISLAND" : "ILHA DO TAVARES"}</strong>
            <small>{language === "en-US" ? "Guanabara Bay · Gradim, São Gonçalo" : "Baía de Guanabara · Gradim, São Gonçalo"}</small>
          </span>
        </a>
        <nav id="mobile-nav" className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label={language === "en-US" ? "Main navigation" : "Navegação principal"}>
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}>
              {language === "en-US" && englishCopy[label] ? englishCopy[label] : label}
            </a>
          ))}
        </nav>
        <a className="header-phone" href="tel:+5521995221369"><Phone size={15} /><span>Luiz Pinciara<small>21 99522-1369</small></span></a>
        <LanguageSelectorDropdown language={language} onChange={setLanguage} />
        <a className="header-cta" href="#contato" onClick={closeMenu}>
          {language === "en-US" ? "Contact Representative" : "Falar com responsável"}
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? t("Fechar menu") : t("Abrir menu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((value) => !value)}
        >
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
              <h1 id="hero-title">{language === "en-US" ? "Tavares Island" : "Ilha do Tavares"}<span>.</span></h1>
              <p className="hero-subtitle">Potencial logístico, naval e offshore na Baía de Guanabara.</p>
              <p className="hero-line">Venda, arrendamento ou parceria estratégica.</p>
              <p className="hero-disclaimer">Ativo para avaliação de investidores e operadores. <strong>Qualquer desenvolvimento depende de regularização patrimonial, viabilidade técnica e licenciamento.</strong></p>
              <div className="hero-actions">
                <a className="button button--gold" href="#contato">
                  {language === "en-US" ? "Request Initial Meeting" : "Solicitar conversa inicial"} <ArrowUpRight size={17} />
                </a>
                <a className="button button--outline-gold" href={language === "en-US" ? PITCH_DECK_EN : PITCH_DECK_PT} download>
                  <FileDown size={16} /> {language === "en-US" ? "Download Pitch Deck" : "Baixar Pitch Deck"}
                </a>
                <a className="text-link" href="#oportunidade">
                  {language === "en-US" ? "View opportunity overview" : "Ver enquadramento da oportunidade"} <ArrowDown size={16} />
                </a>
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
            <div className="opportunity-grid stagger-group">
              <div className="info-block stagger-item"><IconTile><MapPin size={21} /></IconTile><h3>Localização</h3><p>Inserida na Baía de Guanabara, próxima ao Gradim e conectada por via marítima a Niterói e ao Rio de Janeiro.</p></div>
              <div className="info-block stagger-item"><IconTile><Compass size={21} /></IconTile><h3>Tese comercial</h3><p>Possível apoio offshore, logística, manutenção leve, armazenagem e serviços náuticos de baixo impacto.</p></div>
              <div className="info-block info-block--accent stagger-item"><IconTile><Scale size={21} /></IconTile><h3>Condição de uso</h3><p>Qualquer desenvolvimento depende de regularização patrimonial, viabilidade técnica e licenciamento.</p></div>
            </div>
          </div>
        </section>

        <section className="section section-gray" id="contexto">
          <div className="container">
            <SectionMarker number="02" label="CONTEXTO" />
            <div className="market-layout">
              <Reveal className="market-copy"><p className="kicker">CENÁRIO DE MERCADO</p><h2>Crescimento do petróleo offshore no Brasil.</h2><p>A expansão do Pré-Sal demanda embarcações de suprimento, bases logísticas, manutenção naval, equipamentos submarinos, inspeção, armazenagem, transporte marítimo, resposta ambiental e descomissionamento.</p><p className="market-note">A tese depende de confirmação atualizada de mercado.</p></Reveal>
              <Reveal className="metric-panel"><div className="metric-number"><span>3,4</span><MoveRight size={34} /><span>5,2</span></div><div className="metric-unit">milhões de barris/dia</div><p>Cenário otimista descrito no material.</p></Reveal>
            </div>
            <div className="market-data-grid stagger-group">
              <div className="stagger-item"><h3>Investidores citados</h3><p>Petrobras, Shell, TotalEnergies, Equinor, BP, ExxonMobil, Karoon, Prio, Trident Energy.</p></div>
              <div className="stagger-item"><h3>Escopo operacional</h3><p>FPSOs, poços, linhas submarinas, escoamento, reinjeção de gás e CO2, equipamentos e manutenção.</p></div>
              <div className="stagger-item"><h3>Campos citados</h3><p>Búzios, Mero, Atapu, Sépia, Tupi, Itapu, Raia, Campos, cessão onerosa e novas áreas.</p></div>
            </div>
            <p className="closing-line">Búzios e Mero aparecem no material como projetos relevantes para a expansão e para a cadeia de serviços.</p>
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
              <Reveal className="map-card" aria-label={t("Mapa online da localização")}>
                <div className="map-card-top"><span>BAÍA DE GUANABARA</span><span>MAPA ONLINE</span></div>
                <ViewOnMap locationName="Ilha do Tavares" address="-22.824233538634235, -43.09865877495924" language={language} />
                <div className="map-card-bottom"><Navigation size={15} /> Baía de Guanabara · Rio de Janeiro</div>
              </Reveal>
              <Reveal className="location-copy"><h2>Localização estratégica.</h2><div className="stacked-points"><div><h3>Gradim e São Gonçalo</h3><p>Conexão com áreas costeiras, oficinas, armazéns e prestadores de serviços.</p></div><div><h3>Niterói e Rio de Janeiro</h3><p>Acesso marítimo a centros navais, corporativos e de suporte industrial.</p></div><div><h3>Porto do Rio e corredores regionais</h3><p>Possibilidade de apoio complementar para suprimentos, equipamentos e transporte.</p></div></div><div className="asset-facts" aria-label="Dados do ativo"><h3>Dados do ativo</h3><dl><div><dt>Distância do continente</dt><dd>0,5 milha náutica</dd></div><div><dt>Área da ilha</dt><dd>356.750 m²</dd></div><div><dt>Base de apoio no continente</dt><dd>334 m²</dd></div></dl></div><p className="location-note">Atracação, profundidade, infraestrutura e autorizações exigem estudos específicos.</p></Reveal>
            </div>
          </div>
        </section>

        <section className="section section-gray" id="beneficios">
          <div className="container">
            <SectionMarker number="05" label="BENEFÍCIOS" />
            <Reveal><div className="section-heading"><h2>Benefícios logísticos potenciais.</h2><p>Uma leitura de complementaridade, sempre sujeita à verificação de operação e acessos.</p></div></Reveal>
            <div className="cards-grid cards-grid--three stagger-group">
              <div className="dark-card stagger-item"><span className="card-index">01</span><IconTile><Factory size={21} /></IconTile><h3>Gradim e cadeia naval</h3><p>Ligação com áreas terrestres, oficinas, armazéns, fornecedores e mão de obra especializada.</p></div>
              <div className="dark-card stagger-item"><span className="card-index">02</span><IconTile><Ship size={21} /></IconTile><h3>Baía e Porto do Rio</h3><p>Conexão marítima com Niterói, Rio e demais áreas da baía, com apoio complementar de suprimentos.</p></div>
              <div className="dark-card stagger-item"><span className="card-index">03</span><IconTile><MoveRight size={21} /></IconTile><h3>Integração multimodal</h3><p>Possível conexão entre transporte marítimo e rodoviário, sujeita à verificação de operação e acessos.</p></div>
            </div>
            <p className="section-footnote">A área também pode ser avaliada para monitoramento, pesquisa, educação ambiental e recuperação ecológica.</p>
          </div>
        </section>

        <section className="section section-dark" id="aplicacoes">
          <div className="container">
            <SectionMarker number="06" label="APLICAÇÕES" />
            <div className="section-heading section-heading--wide"><Reveal><h2>Aplicações em estudo.</h2></Reveal><Reveal><p>Selecione um perfil de operador para reorganizar a leitura do bloco, sem substituir a etapa de estudos.</p></Reveal></div>
            <div className="profile-filter" role="tablist" aria-label={t("Aplicações por perfil de operador")}>
              {applicationProfiles.map((profile) => <button key={profile.id} type="button" role="tab" aria-selected={activeProfile === profile.id} className={activeProfile === profile.id ? "is-active" : ""} onClick={() => setActiveProfile(profile.id)}>{profile.label}</button>)}
            </div>
            <div ref={featureCardRef} className="reveal application-feature">
              <div className="application-feature-icon"><activeApplication.icon size={28} /></div>
              <div><span className="card-index">{activeProfile === "offshore" ? "01" : activeProfile === "estaleiro" ? "02" : "03"}</span><h3>{activeApplication.title}</h3><p>{activeApplication.copy}</p></div>
              <ArrowUpRight className="feature-arrow" size={22} />
            </div>
            <p className="section-footnote">Cada aplicação requer estudo de demanda, engenharia, impacto ambiental, navegabilidade e modelo de operação.</p>
          </div>
        </section>

        <section className="section section-projects" id="projetos">
          <div className="container">
            <SectionMarker number="07" label="PROJETOS" />
            <div className="section-intro section-intro--split projects-intro">
              <Reveal><h2>Projetos conceituais para leitura estratégica da ilha.</h2></Reveal>
              <Reveal><p>Uma visão territorial para organizar possibilidades de ocupação, sempre sujeitas à diligência e aos estudos aplicáveis.</p></Reveal>
            </div>

            <Reveal className="influence-figure">
              <img
                src={INFLUENCE_IMAGE}
                alt={t("Imagem aérea da Ilha do Tavares com áreas de influência")}
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{t("Áreas de influência da Ilha do Tavares")}</figcaption>
            </Reveal>

            <Reveal className="influence-data"><h3>Referências de influência</h3><dl><div><dt>Ilha D’Água · Transpetro</dt><dd>1 milha náutica</dd></div><div><dt>Refinaria Duque de Caxias</dt><dd>8 milhas náuticas</dd></div><div><dt>Porto do Rio</dt><dd>7 milhas náuticas</dd></div><div><dt>BR-101</dt><dd>500 m</dd></div><div><dt>GASOLUB</dt><dd>35 km</dd></div><div><dt>Ilha Redonda · Transpetro</dt><dd>3 milhas náuticas</dd></div></dl><p>Distâncias indicadas na imagem de referência e sujeitas a confirmação técnica.</p></Reveal>

            <div className="terminal-concept">
              <Reveal className="terminal-copy"><span className="gold-label">Conceito principal</span><h3>Terminal marítimo multidisciplinar.</h3><p>Uma proposta de terminal privado para integrar atracação, apoio offshore, logística e serviços operacionais em uma leitura única do ativo.</p><ul><li>Cais e atracação</li><li>Tancagem e armazenagem</li><li>Apoio offshore e reparos leves</li><li>Pátio, edifício operacional e segurança</li></ul></Reveal>
              <Reveal className="terminal-figure">
                <img
                  src={TERMINAL_IMAGE}
                  alt={t("Prancha conceitual do terminal marítimo multidisciplinar")}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
                <span>{t("Conceito principal")}</span>
              </Reveal>
            </div>

            <div className="projects-support">
              <Reveal><p className="gold-label">Frentes complementares</p><div className="projects-support-grid"><article><Ship size={24} /><h3>Hub náutico e de serviços</h3><p>Apoio a embarcações, suprimentos, manutenção leve e treinamento operacional, em escala compatível com os estudos de acesso e navegabilidade.</p></article><article><Leaf size={24} /><h3>Reserva operacional e ambiental</h3><p>Monitoramento da baía, pesquisa, educação ambiental e ocupação de baixo impacto como parte da leitura de preservação e uso responsável.</p></article></div></Reveal>
            </div>

            <Reveal className="concept-disclaimer"><Scale size={19} /><p>Estudos conceituais para avaliação estratégica. Qualquer implantação depende de diligência patrimonial, viabilidade técnica, ambiental, navegabilidade, licenciamento e aprovações aplicáveis.</p></Reveal>
          </div>
        </section>

        <section className="section section-gray" id="prospeccao">
          <div className="container">
            <SectionMarker number="08" label="PROSPECÇÃO" />
            <Reveal><div className="section-heading"><h2>Empresas para prospecção.</h2><p>Perfis de interlocução para uma conversa comercial inicial.</p></div></Reveal>
            <div className="prospecting-grid stagger-group"><div className="stagger-item"><span className="gold-label">Apoio marítimo</span><p>Edison Chouest, Bram, DOF, Solstad, Svitzer, Wilson Sons.</p></div><div className="stagger-item"><span className="gold-label">Subsea e engenharia</span><p>Oceaneering, Subsea7, Saipem, TechnipFMC, Helix, Baker Hughes, SLB, Halliburton.</p></div><div className="stagger-item"><span className="gold-label">Logística e conformidade</span><p>Monjasa, Blue Water Shipping, DNV, Bureau Veritas, ABS e empresas de inspeção.</p></div></div>
            <p className="closing-line">Operadoras como Petrobras, Shell, Equinor, TotalEnergies, BP, ExxonMobil, Prio, Trident, Enauta e PetroReconcavo podem ser clientes indiretos ou contratantes.</p>
          </div>
        </section>

        <section className="section section-dark" id="diferenciais">
          <div className="container">
            <SectionMarker number="09" label="DIFERENCIAIS" />
            <Reveal><div className="section-heading"><h2>Diferenciais competitivos.</h2></div></Reveal>
            <div className="differentials-grid stagger-group"><div className="stagger-item"><span className="card-index">01</span><h3>Localização marítima</h3><p>Acesso direto à Baía de Guanabara e possibilidade de complementar instalações terrestres.</p></div><div className="stagger-item"><span className="card-index">02</span><h3>Ecossistema industrial</h3><p>Proximidade de estaleiros, fornecedores, mão de obra naval e empresas de engenharia.</p></div><div className="stagger-item"><span className="card-index">03</span><h3>Usos diversificados</h3><p>Apoio offshore, logística, manutenção, pesquisa, turismo e gestão ambiental, conforme viabilidade.</p></div></div>
            <p className="gold-statement">A demanda por inspeção, manutenção, segurança, gestão ambiental e descomissionamento pode persistir ao longo da transição energética.</p>
          </div>
        </section>

        <section className="section section-gray value-section" id="proposta">
          <div className="container">
            <SectionMarker number="10" label="PROPOSTA" />
            <div className="value-layout">
              <Reveal>
                <h2>{language === "en-US" ? "Value proposition for investors." : "Proposta de valor para investidores."}</h2>
                <p>{language === "en-US" ? "Prime position in Guanabara Bay, anchored within Brazil's premier offshore and shipbuilding cluster." : "Presença na Baía de Guanabara, próxima a um ecossistema naval e offshore consolidado."}</p>
              </Reveal>
              <div className="value-points stagger-group">
                <div className="stagger-item">
                  <span>01</span>
                  <div>
                    <h3>{language === "en-US" ? "Distinctive island asset" : "Localização diferenciada"}</h3>
                    <p>{language === "en-US" ? "Private island asset with navigable maritime access and strategic proximity to operators, yards, and suppliers." : "Ativo insular com potencial de acesso marítimo e proximidade de fornecedores e clientes."}</p>
                  </div>
                </div>
                <div className="stagger-item">
                  <span>02</span>
                  <div>
                    <h3>{language === "en-US" ? "Flexible deal structures" : "Flexibilidade comercial"}</h3>
                    <p>{language === "en-US" ? "Outright acquisition, long-term lease, joint venture, or build-to-suit development." : "Venda, arrendamento, parceria operacional ou desenvolvimento sob medida."}</p>
                  </div>
                </div>
                <div className="stagger-item">
                  <span>03</span>
                  <div>
                    <h3>{language === "en-US" ? "Custom development potential" : "Infraestrutura especializada"}</h3>
                    <p>{language === "en-US" ? "Opportunity to engineer custom waterfront infrastructure in accordance with permits and licensing." : "Possibilidade de desenvolver uma operação complementar, conforme estudos e aprovações."}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="commercial-terms">
              <h3>{language === "en-US" ? "Commercial terms" : "Condições comerciais"}</h3>
              <div className="commercial-terms-grid stagger-group">
                <div className="stagger-item">
                  <span>{language === "en-US" ? "Acquisition" : "Venda"}</span>
                  <strong>{language === "en-US" ? "BRL 140,000,000" : "R$ 140.000.000"}</strong>
                </div>
                <div className="stagger-item">
                  <span>{language === "en-US" ? "Lease" : "Locação"}</span>
                  <strong>{language === "en-US" ? "BRL 2,000,000 / mo" : "R$ 2.000.000 / mês"}</strong>
                  <small>{language === "en-US" ? "Terms and duration upon request." : "Condições e prazo sob consulta."}</small>
                </div>
              </div>
            </div>
            <div className="investor-callout">
              <div>
                <span className="gold-label">{language === "en-US" ? "Investor Call" : "Chamada para investidores"}</span>
                <h3>{language === "en-US" ? "A next conversation can begin with a technical site visit." : "Uma próxima conversa pode começar por uma visita técnica."}</h3>
              </div>
              <div className="investor-details">
                <p><strong>{language === "en-US" ? "Target profiles" : "Perfis prioritários"}</strong> — {language === "en-US" ? "Offshore operators, marine support, logistics, subsea services, shipyards, decommissioning, and maritime technology." : "Operadores offshore, apoio marítimo, logística, serviços submarinos, estaleiros, descomissionamento e tecnologia marítima."}</p>
                <p><strong>{language === "en-US" ? "Available transaction models" : "Formatos disponíveis"}</strong> — {language === "en-US" ? "Sale, long-term maritime lease, operating partnership, joint venture, and bespoke build-to-suit." : "Venda, arrendamento de longo prazo, parceria operacional, joint venture e desenvolvimento sob medida."}</p>
                <p><strong>{language === "en-US" ? "Next steps" : "Próximo contato"}</strong> — {language === "en-US" ? "Technical site visit, operational thesis definition, and legal, technical, and environmental due diligence." : "Visita técnica, definição da tese de uso e encaminhamento da diligência documental, técnica e ambiental."}</p>
              </div>
            </div>
            <p className="micro-note">
              {language === "en-US"
                ? "Target company names illustrate commercial synergy and do not imply formal commitments."
                : "A lista de perfis representa público-alvo comercial, não interesse já manifestado."}
            </p>
          </div>
        </section>

        <section className="section section-gray contact-section" id="contato">
          <div className="container">
            <SectionMarker number="11" label="CONTATO" />
            <div className="contact-layout">
              <Reveal className="contact-intro">
                <p className="kicker">PRÓXIMO PASSO</p>
                <h2>Falar com responsável.</h2>
                <div className="contact-person">
                  <img
                    className="contact-avatar"
                    src={CONTACT_IMAGE}
                    alt="Luiz Pinciara"
                    width={58}
                    height={58}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <strong>Luiz Pinciara</strong>
                    <a href="tel:+5521995221369"><Phone size={15} /> 21 99522-1369</a>
                  </div>
                </div>
                <p>
                  Para agendar visita técnica ou solicitar informação adicional sobre o ativo, preencha o formulário ao lado. Ao enviar, abriremos o WhatsApp com os dados preenchidos para iniciar a conversa.
                </p>
                <div className="contact-quick-actions">
                  <a
                    href={language === "en-US" ? "https://wa.me/5521995221369?text=Hello%2C%20Luiz.%20I%20would%20like%20information%20regarding%20Tavares%20Island." : "https://wa.me/5521995221369?text=Ol%C3%A1%2C%20Luiz.%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Ilha%20do%20Tavares."}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-action-link highlight"
                  >
                    <MessageCircle size={18} />
                    <span>{language === "en-US" ? "Chat directly on WhatsApp" : "Conversar diretamente no WhatsApp"}</span>
                  </a>
                  <a
                    href={language === "en-US" ? PITCH_DECK_EN : PITCH_DECK_PT}
                    download
                    className="quick-action-link"
                  >
                    <FileDown size={18} />
                    <span>{language === "en-US" ? "Download Official Pitch Deck (PDF)" : "Baixar Pitch Deck Oficial (PDF)"}</span>
                  </a>
                </div>
              </Reveal>

              <Reveal className="contact-form-card">
                {formStatus === "success" ? (
                  <div className="form-success-card" role="status" aria-live="polite">
                    <div className="form-success-header">
                      <Check size={20} />
                      <span>{language === "en-US" ? "Message ready on WhatsApp!" : "Mensagem pronta no WhatsApp!"}</span>
                    </div>
                    <p className="form-success-text">
                      {language === "en-US"
                        ? "We opened WhatsApp with your details pre-filled. If it didn't open automatically, use the button below to start the conversation."
                        : "Abrimos o WhatsApp com seus dados preenchidos. Se a janela não abriu automaticamente, toque no botão abaixo para iniciar a conversa com Luiz Pinciara."}
                    </p>
                    <div className="form-submit-row">
                      {submittedWhatsAppUrl && (
                        <a
                          href={submittedWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button--gold"
                        >
                          <Send size={16} />
                          <span>{language === "en-US" ? "Open WhatsApp now" : "Abrir WhatsApp agora"}</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="button button--outline"
                      >
                        {language === "en-US" ? "Send another message" : "Enviar outra mensagem"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate>
                    <div className="form-grid">
                      <label htmlFor="contact-name">
                        {language === "en-US" ? "Name*" : "Nome*"}
                        <input
                          id="contact-name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => handleFieldChange("name", e.target.value)}
                          className={formErrors.name ? "has-error" : ""}
                          placeholder={language === "en-US" ? "Your full name" : "Seu nome completo"}
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? "contact-name-error" : undefined}
                        />
                        {formErrors.name && (
                          <span id="contact-name-error" className="field-error" role="alert">
                            <AlertCircle size={13} /> {formErrors.name}
                          </span>
                        )}
                      </label>

                      <label htmlFor="contact-company">
                        {language === "en-US" ? "Company*" : "Empresa*"}
                        <input
                          id="contact-company"
                          name="company"
                          value={formData.company}
                          onChange={(e) => handleFieldChange("company", e.target.value)}
                          className={formErrors.company ? "has-error" : ""}
                          placeholder={language === "en-US" ? "Company name" : "Nome da sua empresa"}
                          autoComplete="organization"
                          aria-required="true"
                          aria-invalid={!!formErrors.company}
                          aria-describedby={formErrors.company ? "contact-company-error" : undefined}
                        />
                        {formErrors.company && (
                          <span id="contact-company-error" className="field-error" role="alert">
                            <AlertCircle size={13} /> {formErrors.company}
                          </span>
                        )}
                      </label>

                      <label htmlFor="contact-email">
                        {language === "en-US" ? "Email*" : "E-mail*"}
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          className={formErrors.email ? "has-error" : ""}
                          placeholder="contato@empresa.com"
                          autoComplete="email"
                          aria-required="true"
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? "contact-email-error" : undefined}
                        />
                        {formErrors.email && (
                          <span id="contact-email-error" className="field-error" role="alert">
                            <AlertCircle size={13} /> {formErrors.email}
                          </span>
                        )}
                      </label>

                      <label htmlFor="contact-phone">
                        {language === "en-US" ? "Phone*" : "Telefone*"}
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className={formErrors.phone ? "has-error" : ""}
                          placeholder={language === "en-US" ? "+1 555 123-4567" : "(21) 99999-9999"}
                          autoComplete="tel"
                          aria-required="true"
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? "contact-phone-error" : undefined}
                        />
                        {formErrors.phone && (
                          <span id="contact-phone-error" className="field-error" role="alert">
                            <AlertCircle size={13} /> {formErrors.phone}
                          </span>
                        )}
                      </label>
                    </div>

                    <label htmlFor="contact-lgpd" className={`consent-check ${formErrors.lgpd ? "has-error" : ""}`}>
                      <input
                        id="contact-lgpd"
                        type="checkbox"
                        name="lgpd"
                        checked={formData.lgpd}
                        onChange={(e) => handleFieldChange("lgpd", e.target.checked)}
                        aria-required="true"
                        aria-invalid={!!formErrors.lgpd}
                        aria-describedby={formErrors.lgpd ? "contact-lgpd-error" : undefined}
                      />
                      <span>
                        {language === "en-US"
                          ? "I authorize Pinciara Imóveis Exclusivos to contact me for commercial inquiries. I may request data deletion at any time."
                          : "Autorizo o contato da Pinciara Imóveis Exclusivos para fins de prospecção comercial. Posso solicitar eliminação dos dados a qualquer momento."}
                      </span>
                    </label>
                    {formErrors.lgpd && (
                      <span id="contact-lgpd-error" className="field-error" role="alert" style={{ marginTop: "6px" }}>
                        <AlertCircle size={13} /> {formErrors.lgpd}
                      </span>
                    )}

                    <div className="form-submit-row">
                      <button className="button button--gold form-submit" type="submit">
                        {language === "en-US" ? "Send message" : "Enviar mensagem"} <Send size={17} />
                      </button>
                    </div>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Brand compact />
            <p>
              {language === "en-US"
                ? "Tavares Island · Gradim, São Gonçalo · Rio de Janeiro — Brazil."
                : "Ilha do Tavares · Gradim, São Gonçalo · Rio de Janeiro — Brasil."}
            </p>
            <p>
              {language === "en-US"
                ? "© 2026 Pinciara Imóveis Exclusivos. All rights reserved."
                : "© 2026 Pinciara Imóveis Exclusivos. Todos os direitos reservados."}
            </p>
          </div>
          <div>
            <p>Luiz Pinciara · <a href="tel:+5521995221369">21 99522-1369</a></p>
            <p>
              {language === "en-US"
                ? "Institutional document. All uses subject to due diligence."
                : "Documento institucional. Uso sujeito a due diligence."}
            </p>
            <nav>
              <button type="button" className="footer-nav-btn" onClick={() => openLegalModal("privacy")}>
                {language === "en-US" ? "Privacy Policy" : "Política de Privacidade"}
              </button>
              <button type="button" className="footer-nav-btn" onClick={() => openLegalModal("terms")}>
                {language === "en-US" ? "Terms of Use" : "Termos de Uso"}
              </button>
              <button type="button" className="footer-nav-btn" onClick={() => openLegalModal("deletion")}>
                {language === "en-US" ? "Request data deletion" : "Solicitar eliminação de dados"}
              </button>
            </nav>
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          className="back-to-top"
          type="button"
          aria-label={t("Voltar ao topo")}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp size={19} />
        </button>
      )}

      {consentVisible && (
        <aside className="consent-banner" role="dialog" aria-label={language === "en-US" ? "Privacy Consent" : "Consentimento"}>
          <div>
            <span className="gold-label">{language === "en-US" ? "PRIVACY" : "PRIVACIDADE"}</span>
            <p>
              {language === "en-US"
                ? "I authorize Pinciara Imóveis Exclusivos to contact me for commercial inquiries. I may request data deletion at any time."
                : "Autorizo o contato da Pinciara Imóveis Exclusivos para fins de prospecção comercial. Posso solicitar eliminação dos dados a qualquer momento."}
            </p>
            <button
              type="button"
              className="footer-nav-btn"
              style={{ marginTop: "6px", display: "inline-block" }}
              onClick={() => openLegalModal("privacy")}
            >
              {language === "en-US" ? "Read privacy policy" : "Ler política de privacidade"}
            </button>
          </div>
          <div className="consent-actions">
            <button type="button" onClick={() => handleConsent(true)}>
              {language === "en-US" ? "Accept" : "Aceitar"}
            </button>
            <button type="button" onClick={() => handleConsent(false)}>
              {language === "en-US" ? "Not now" : "Agora não"}
            </button>
          </div>
        </aside>
      )}

      <LegalModal
        isOpen={legalModalOpen}
        activeTab={legalActiveTab}
        language={language}
        onClose={() => setLegalModalOpen(false)}
        onTabChange={setLegalActiveTab}
      />
    </div>
  );
}
