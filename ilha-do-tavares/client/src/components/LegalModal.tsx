import { useEffect } from "react";
import { ShieldCheck, FileText, Trash2, X, Send } from "lucide-react";

export type LegalTab = "privacy" | "terms" | "deletion";

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  language: "pt-BR" | "en-US";
  onClose: () => void;
  onTabChange: (tab: LegalTab) => void;
}

export function LegalModal({
  isOpen,
  activeTab,
  language,
  onClose,
  onTabChange,
}: LegalModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEn = language === "en-US";

  const deletionMessage = isEn
    ? "Hello, Luiz. In accordance with data privacy regulations (LGPD), I would like to request the deletion of my contact data from your records."
    : "Olá, Luiz. Com base na LGPD, gostaria de solicitar a eliminação dos meus dados cadastrais da base da Pinciara Imóveis Exclusivos.";

  const deletionUrl = `https://wa.me/5521995221369?text=${encodeURIComponent(deletionMessage)}`;

  return (
    <div
      className="legal-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="legal-modal-container">
        <div className="legal-modal-header">
          <div className="legal-modal-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "privacy"}
              className={`legal-tab-btn ${activeTab === "privacy" ? "is-active" : ""}`}
              onClick={() => onTabChange("privacy")}
            >
              <ShieldCheck size={16} />
              <span>{isEn ? "Privacy Policy" : "Política de Privacidade"}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "terms"}
              className={`legal-tab-btn ${activeTab === "terms" ? "is-active" : ""}`}
              onClick={() => onTabChange("terms")}
            >
              <FileText size={16} />
              <span>{isEn ? "Terms of Use" : "Termos de Uso"}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "deletion"}
              className={`legal-tab-btn ${activeTab === "deletion" ? "is-active" : ""}`}
              onClick={() => onTabChange("deletion")}
            >
              <Trash2 size={16} />
              <span>{isEn ? "Data Deletion" : "Eliminação de Dados"}</span>
            </button>
          </div>
          <button
            type="button"
            className="legal-modal-close"
            onClick={onClose}
            aria-label={isEn ? "Close modal" : "Fechar modal"}
          >
            <X size={20} />
          </button>
        </div>

        <div className="legal-modal-body">
          {activeTab === "privacy" && (
            <div className="legal-content">
              <h2 id="legal-modal-title">
                {isEn ? "Privacy Policy & LGPD" : "Política de Privacidade e LGPD"}
              </h2>
              <p className="legal-updated">
                {isEn ? "Last updated: September 2026" : "Última atualização: Setembro de 2026"}
              </p>
              <p>
                {isEn
                  ? "Pinciara Imóveis Exclusivos is committed to safeguarding your privacy and protecting your personal data in full compliance with the Brazilian General Data Protection Law (LGPD - Law 13,709/2018)."
                  : "A Pinciara Imóveis Exclusivos tem o compromisso de resguardar a privacidade e a segurança dos dados pessoais de investidores, operadores e visitantes, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei 13.709/2018)."}
              </p>
              <h3>{isEn ? "1. Data Collection & Purpose" : "1. Coleta e Finalidade dos Dados"}</h3>
              <p>
                {isEn
                  ? "We only collect information voluntarily submitted through our initial contact form: Name, Company, Email, and Phone number. These details are used exclusively for institutional presentation, commercial outreach, and scheduling technical visits regarding Tavares Island."
                  : "Coletamos exclusivamente os dados fornecidos voluntariamente por meio do formulário de contato inicial: Nome, Empresa, E-mail e Telefone. Essas informações são utilizadas unicamente para apresentação do ativo insular Ilha do Tavares, agendamento de visitas técnicas e relacionamento comercial qualificado."}
              </p>
              <h3>{isEn ? "2. Non-sharing Guarantee" : "2. Não compartilhamento com terceiros"}</h3>
              <p>
                {isEn
                  ? "Your information is never sold, leased, or distributed to unauthorized third parties. Access is restricted strictly to the commercial representatives responsible for Tavares Island."
                  : "Seus dados não são vendidos, alugados ou compartilhados com terceiros não autorizados. O acesso é restrito aos responsáveis comerciais e consultores credenciados para a negociação da Ilha do Tavares."}
              </p>
              <h3>{isEn ? "3. Your Rights as Data Subject" : "3. Seus Direitos como Titular"}</h3>
              <p>
                {isEn
                  ? "Under the LGPD, you have the right to confirm the existence of data processing, access your data, correct incomplete details, or request total deletion at any time."
                  : "Nos termos da LGPD, você tem o direito de solicitar a confirmação de tratamento, o acesso aos seus dados, a correção de inconsistências ou a revogação do consentimento e eliminação definitiva de seus registros a qualquer momento."}
              </p>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="legal-content">
              <h2 id="legal-modal-title">
                {isEn ? "Terms of Use & Institutional Scope" : "Termos de Uso e Escopo Institucional"}
              </h2>
              <p className="legal-updated">
                {isEn ? "Last updated: September 2026" : "Última atualização: Setembro de 2026"}
              </p>
              <p>
                {isEn
                  ? "This landing page and accompanying institutional documents are prepared strictly for informational assessment by prospective investors, naval operators, and offshore industry players."
                  : "Esta página e os materiais institucionais foram elaborados exclusivamente para avaliação prévia por investidores, operadores da cadeia naval, offshore e de logística portuária."}
              </p>
              <h3>{isEn ? "1. Due Diligence Disclaimer" : "1. Sujeição a Due Diligence Técnica e Regulatória"}</h3>
              <p>
                {isEn
                  ? "All data, metrics, area measurements, nautical distances, and conceptual applications presented represent preliminary feasibility studies. Any transaction, commercial lease, or development depends on independent legal, patrimonial, environmental, and maritime due diligence, as well as competent licensing."
                  : "Todas as dimensões, distâncias náuticas, estimativas de mercado e conceitos arquitetônicos apresentados constituem estudos conceituais. Qualquer formalização de venda, arrendamento ou parceria estratégica está expressamente sujeita à due diligence documental, técnica, ambiental e aprovações pelas autoridades competentes."}
              </p>
              <h3>{isEn ? "2. Intellectual Property" : "2. Propriedade Intelectual"}</h3>
              <p>
                {isEn
                  ? "All trademarks, visual assets, aerial images, and structural concepts are the property of Pinciara Imóveis Exclusivos or their respective rights holders. Reproduction without express authorization is prohibited."
                  : "A marca Pinciara, fotografias aéreas, pranchas conceituais e textos são protegidos pelas leis de propriedade intelectual. É vedada a reprodução comercial sem anuência prévia."}
              </p>
            </div>
          )}

          {activeTab === "deletion" && (
            <div className="legal-content">
              <h2 id="legal-modal-title">
                {isEn ? "Request Data Deletion (LGPD)" : "Solicitação de Eliminação de Dados (LGPD)"}
              </h2>
              <p className="legal-updated">
                {isEn ? "Self-service Data Privacy Rights" : "Canal Direto de Atendimento ao Titular"}
              </p>
              <p>
                {isEn
                  ? "You may request the immediate deletion of your contact records and communication history at any time, with no bureaucracy."
                  : "Você tem o direito de solicitar a eliminação imediata de seus dados de contato e histórico de interações de nossa base a qualquer momento, sem qualquer burocracia."}
              </p>
              <div className="deletion-action-card">
                <div>
                  <strong>{isEn ? "Direct request via WhatsApp" : "Solicitação direta via WhatsApp"}</strong>
                  <p>
                    {isEn
                      ? "Send an automated privacy request directly to Luiz Pinciara (Representative):"
                      : "Envie um comunicado direto de exclusão para o responsável Luiz Pinciara:"}
                  </p>
                </div>
                <a
                  href={deletionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--gold deletion-btn"
                >
                  <Send size={16} />
                  <span>{isEn ? "Send Deletion Request" : "Solicitar Exclusão via WhatsApp"}</span>
                </a>
              </div>
              <p className="legal-note">
                {isEn
                  ? "You can also contact our team directly at +55 21 99522-1369."
                  : "Você também pode entrar em contato diretamente pelo telefone +55 (21) 99522-1369."}
              </p>
            </div>
          )}
        </div>

        <div className="legal-modal-footer">
          <button type="button" className="button button--outline" onClick={onClose}>
            {isEn ? "Close" : "Fechar"}
          </button>
        </div>
      </div>
    </div>
  );
}
