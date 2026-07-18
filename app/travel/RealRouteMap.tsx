"use client";

import { useEffect, useRef } from "react";

type RouteStop = { place: string; lat: number; lng: number };
declare global { interface Window { L?: any } }

export default function RealRouteMap({ stops, active, onSelect }: { stops: RouteStop[]; active: number; onSelect: (index: number) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    if (!document.getElementById("leaflet-travel-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-travel-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const start = () => {
      if (cancelled || !host.current || !window.L || mapRef.current) return;
      const L = window.L;
      const map = L.map(host.current, { zoomControl: true, attributionControl: true, scrollWheelZoom: false }).setView([-22.2, 17.1], 6);
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap contributors" }).addTo(map);
      markersRef.current = stops.map((stop, index) => {
        const icon = L.divIcon({ className: "route-marker-wrap", html: `<span class="route-marker${index === active ? " is-active" : ""}">${String(index + 1).padStart(2, "0")}</span>`, iconSize: [34, 34], iconAnchor: [17, 17] });
        const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map).bindTooltip(stop.place, { direction: "top", offset: [0, -18] });
        marker.on("click", () => onSelect(index));
        return marker;
      });
      const fallback = stops.map((stop) => [stop.lat, stop.lng]);
      const fallbackLine = L.polyline(fallback, { color: "#e7692e", weight: 3, opacity: .9, dashArray: "8 8" }).addTo(map);
      map.fitBounds(fallbackLine.getBounds(), { padding: [55, 55] });
      const coordinates = stops.map((stop) => `${stop.lng},${stop.lat}`).join(";");
      fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`)
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then((data) => {
          if (cancelled || !data.routes?.[0]) return;
          map.removeLayer(fallbackLine);
          const road = data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]);
          const halo = L.polyline(road, { color: "#17160f", weight: 8, opacity: .82 }).addTo(map);
          L.polyline(road, { color: "#ef7137", weight: 3.5, opacity: 1 }).addTo(map);
          map.fitBounds(halo.getBounds(), { padding: [55, 55] });
        }).catch(() => undefined);
    };
    if (window.L) start();
    else {
      const existing = document.querySelector<HTMLScriptElement>('script[data-leaflet-travel]');
      if (existing) existing.addEventListener("load", start, { once: true });
      else {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.dataset.leafletTravel = "true";
        script.onload = start;
        document.body.appendChild(script);
      }
    }
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null; markersRef.current = []; };
  }, [stops, onSelect]);

  useEffect(() => {
    const marker = markersRef.current[active];
    const map = mapRef.current;
    if (!marker || !map) return;
    marker.openTooltip();
    map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 7), { duration: .8 });
    markersRef.current.forEach((item, index) => item.getElement()?.querySelector(".route-marker")?.classList.toggle("is-active", index === active));
  }, [active]);

  return <div ref={host} className="real-route-map" aria-label="真實納米比亞互動行程地圖" />;
}
