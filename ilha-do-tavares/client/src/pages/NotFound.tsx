import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.title = "404 — Página não encontrada | Ilha do Tavares";
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] text-white px-4">
      <div className="w-full max-w-lg p-8 sm:p-12 text-center border border-[rgba(255,187,0,0.35)] bg-[#121212] shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border border-[#FFBB00] flex items-center justify-center text-[#FFBB00]">
            <Compass size={32} />
          </div>
        </div>

        <span className="text-[#FFBB00] font-bold text-xs uppercase tracking-widest block mb-2 font-['Calibri']">
          Erro 404 · Navegação
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold font-['Montserrat'] mb-3 tracking-tight text-white">
          Página não encontrada
        </h1>

        <p className="text-[rgba(255,255,255,0.7)] text-base mb-8 leading-relaxed">
          O endereço que você tentou acessar não existe ou foi remanejado. Retorne para a página inicial da Ilha do Tavares.
        </p>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setLocation("/")}
            className="button button--gold inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Voltar para o início</span>
          </button>
        </div>
      </div>
    </div>
  );
}
