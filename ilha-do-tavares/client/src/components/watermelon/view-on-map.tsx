import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ViewOnMapProps {
  locationName: string;
  address: string;
  language: "pt-BR" | "en-US";
}

export function ViewOnMap({ locationName, address, language }: ViewOnMapProps) {
  const [loaded, setLoaded] = useState(false);
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
  const copy = language === "en-US"
    ? { loading: "Loading map", mapTitle: "Map of" }
    : { loading: "Carregando mapa", mapTitle: "Mapa de" };

  return (
    <div className="view-on-map">
      <div className="view-on-map-frame">
        {!loaded && <div className="view-on-map-loading" role="status"><Loader2 size={22} /><span>{copy.loading}</span></div>}
        <iframe title={`${copy.mapTitle} ${locationName}`} src={mapUrl} onLoad={() => setLoaded(true)} allowFullScreen loading="lazy" />
      </div>
    </div>
  );
}
