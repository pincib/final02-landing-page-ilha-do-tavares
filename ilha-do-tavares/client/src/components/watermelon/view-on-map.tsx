import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, Map, X } from "lucide-react";

interface ViewOnMapProps {
  locationName: string;
  address: string;
  language: "pt-BR" | "en-US";
}

export function ViewOnMap({ locationName, address, language }: ViewOnMapProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
  const copy = language === "en-US"
    ? { open: "View online map", close: "Close map", loading: "Loading map", mapTitle: "Map of" }
    : { open: "Ver no mapa online", close: "Fechar mapa", loading: "Carregando mapa", mapTitle: "Mapa de" };

  const close = () => { setOpen(false); setLoaded(false); };

  return <div className="view-on-map">
    <AnimatePresence initial={false} mode="wait">
      {!open ? <motion.button key="trigger" className="view-on-map-trigger" type="button" onClick={() => setOpen(true)} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
        <Map size={17} /><span>{copy.open}</span>
      </motion.button> : <motion.div key="map" className="view-on-map-panel" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .3, ease: [0.23, 1, 0.32, 1] }}>
        <div className="view-on-map-heading"><span>{locationName}</span><button type="button" onClick={close} aria-label={copy.close}><X size={17} /></button></div>
        <div className="view-on-map-frame">
          {!loaded && <div className="view-on-map-loading" role="status"><Loader2 size={22} /><span>{copy.loading}</span></div>}
          <iframe title={`${copy.mapTitle} ${locationName}`} src={mapUrl} onLoad={() => setLoaded(true)} allowFullScreen loading="lazy" />
        </div>
      </motion.div>}
    </AnimatePresence>
  </div>;
}
