import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Language = "pt-BR" | "en-US";

const languages: Array<{ code: Language; label: string; flag: string }> = [
  { code: "pt-BR", label: "Português (BR)", flag: "🇧🇷" },
  { code: "en-US", label: "English (US)", flag: "🇺🇸" },
];

export default function LanguageSelectorDropdown({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = languages.find((item) => item.code === language) ?? languages[0];

  useEffect(() => {
    const close = (event: MouseEvent) => !ref.current?.contains(event.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return <div className="language-selector" ref={ref}>
    <button className="language-selector-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Select language">
      <span className="language-flag" aria-hidden="true">{selected.flag}</span>
      <span className="language-selector-label">{selected.label}</span><ChevronDown size={14} aria-hidden="true" />
    </button>
    {open && <div className="language-selector-menu" role="menu">
      {languages.map((item) => <button key={item.code} type="button" role="menuitemradio" aria-checked={item.code === language} onClick={() => { onChange(item.code); setOpen(false); }}>
        <span className="language-flag" aria-hidden="true">{item.flag}</span><span>{item.label}</span>{item.code === language && <Check size={14} aria-hidden="true" />}
      </button>)}
    </div>}
  </div>;
}
