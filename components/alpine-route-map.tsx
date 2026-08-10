"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import type { FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import countriesTopology from "world-atlas/countries-50m.json";

type GeographicStop = {
  label: string;
  labelEn: string;
  country: "DE" | "FR" | "CH";
  coordinates: [number, number];
  note: string;
};

const geographicStops: GeographicStop[] = [
  { label: "法蘭克福", labelEn: "Frankfurt", country: "DE", coordinates: [50.1109, 8.6821], note: "預計由法蘭克福進入德國，從這裡展開十二日的德瑞法鐵道旅程。" },
  { label: "海德堡", labelEn: "Heidelberg", country: "DE", coordinates: [49.3988, 8.6724], note: "沿著內卡河走進舊城，安排城堡與河岸街景的第一組現場影像。" },
  { label: "史特拉斯堡", labelEn: "Strasbourg", country: "FR", coordinates: [48.5734, 7.7521], note: "越過德法邊境，進入亞爾薩斯的運河、木筋屋與大教堂街區。" },
  { label: "科瑪", labelEn: "Colmar", country: "FR", coordinates: [48.0794, 7.3585], note: "在小威尼斯與彩色老城之間，預留黃昏光線與水面倒影的拍攝時間。" },
  { label: "伯恩", labelEn: "Bern", country: "CH", coordinates: [46.948, 7.4474], note: "進入瑞士後先抵達伯恩，記錄拱廊、石板街與阿勒河環抱的舊城。" },
  { label: "策馬特", labelEn: "Zermatt", country: "CH", coordinates: [46.0207, 7.7491], note: "抵達無車山城策馬特，以馬特洪峰與高山聚落作為瑞士章節的主視覺。" },
  { label: "安德瑪特", labelEn: "Andermatt", country: "CH", coordinates: [46.6356, 8.5939], note: "搭乘冰河列車穿越高山路段，在車窗與沿線景觀之間完成移動影像。" },
  { label: "茵特拉根", labelEn: "Interlaken", country: "CH", coordinates: [46.6863, 7.8632], note: "以兩湖之間的茵特拉根為基地，整理伯恩高地的山岳與湖景。" },
  { label: "少女峰", labelEn: "Jungfrau", country: "CH", coordinates: [46.5475, 7.9853], note: "搭乘登山鐵道前往少女峰區域，依天候拍攝冰川、雪線與高山列車。" },
  { label: "盧森", labelEn: "Lucerne", country: "CH", coordinates: [47.0502, 8.3093], note: "沿黃金列車路線抵達盧森，記錄湖岸、木橋與山城交會的景色。" },
  { label: "蘇黎世", labelEn: "Zurich", country: "CH", coordinates: [47.3769, 8.5417], note: "在瑞士城市段落收束湖岸與街區影像，再向黑森林方向移動。" },
  { label: "蒂蒂湖", labelEn: "Titisee", country: "DE", coordinates: [47.9026, 8.1567], note: "返回德國黑森林，以森林、湖面與山區鐵道補足德國章節的自然景觀。" },
  { label: "斯圖加特", labelEn: "Stuttgart", country: "DE", coordinates: [48.7758, 9.1829], note: "旅程最後抵達斯圖加特，完成城市段落後返回法蘭克福準備返程。" },
];

const countryNames = { DE: "德國", FR: "法國", CH: "瑞士" } as const;
const countryLabels = [
  { label: "德國", code: "GERMANY / DE", className: "country-de", coordinates: [49.72, 10.05] as [number, number] },
  { label: "法國", code: "FRANCE / FR", className: "country-fr", coordinates: [47.35, 6.32] as [number, number] },
  { label: "瑞士", code: "SWITZERLAND / CH", className: "country-ch", coordinates: [46.2, 9.55] as [number, number] },
];

const countryIds = new Set(["250", "276", "756"]);
const labelPlacements: Array<{
  direction: "left" | "right" | "top" | "bottom";
  offset: [number, number];
}> = [
  { direction: "right", offset: [14, -5] },
  { direction: "right", offset: [14, 8] },
  { direction: "left", offset: [-14, -7] },
  { direction: "left", offset: [-14, 8] },
  { direction: "left", offset: [-18, -22] },
  { direction: "left", offset: [-14, 12] },
  { direction: "right", offset: [14, 10] },
  { direction: "left", offset: [-18, 10] },
  { direction: "bottom", offset: [0, 18] },
  { direction: "right", offset: [18, 12] },
  { direction: "right", offset: [18, -14] },
  { direction: "top", offset: [0, -18] },
  { direction: "right", offset: [14, -6] },
];

export function AlpineRouteMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const markers = useRef<LeafletMarker[]>([]);
  const [active, setActive] = useState(0);
  const selected = geographicStops[active];

  useEffect(() => {
    let disposed = false;

    async function renderMap() {
      const L = await import("leaflet");
      if (disposed || !mapElement.current || mapInstance.current) return;

      const map = L.map(mapElement.current, {
        attributionControl: true,
        scrollWheelZoom: false,
        zoomControl: false,
        minZoom: 5,
        maxZoom: 13,
      }).setView([48.15, 8.25], 6);
      mapInstance.current = map;

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const topology = countriesTopology as unknown as {
        objects: { countries: unknown };
      };
      const allCountries = feature(
        countriesTopology as never,
        topology.objects.countries as never,
      ) as unknown as FeatureCollection<Geometry>;
      const focusCountries: FeatureCollection<Geometry> = {
        ...allCountries,
        features: allCountries.features.filter((country) => countryIds.has(String(country.id).padStart(3, "0"))),
      };

      L.geoJSON(focusCountries, {
        interactive: false,
        style: (country) => {
          const isSwitzerland = String(country?.id).padStart(3, "0") === "756";
          return {
            color: isSwitzerland ? "#edf4ee" : "#f1e7cf",
            fillColor: isSwitzerland ? "#6cabb9" : "#a3aa8c",
            fillOpacity: isSwitzerland ? 0.13 : 0.045,
            lineCap: "round",
            lineJoin: "round",
            opacity: 0.94,
            weight: isSwitzerland ? 3 : 2,
          };
        },
      }).addTo(map);

      map.createPane("alpine-country-labels");
      const countryLabelPane = map.getPane("alpine-country-labels");
      if (countryLabelPane) {
        countryLabelPane.style.zIndex = "450";
        countryLabelPane.style.pointerEvents = "none";
      }

      countryLabels.forEach((country) => {
        L.marker(country.coordinates, {
          interactive: false,
          keyboard: false,
          pane: "alpine-country-labels",
          icon: L.divIcon({
            className: `alpine-country-label ${country.className}`,
            html: `<span><b>${country.label}</b><small>${country.code}</small></span>`,
            iconAnchor: [58, 24],
            iconSize: [116, 48],
          }),
        }).addTo(map);
      });

      const routeCoordinates = geographicStops.map((stop) => stop.coordinates);
      const closedRoute = [...routeCoordinates, geographicStops[0].coordinates];
      const compactMap = window.matchMedia("(max-width: 720px)").matches;
      const routeHalo = L.polyline(closedRoute, {
        color: "#171a16",
        lineCap: "round",
        lineJoin: "round",
        opacity: 0.92,
        weight: 8,
      }).addTo(map);

      L.polyline(closedRoute, {
        color: "#eb6b36",
        lineCap: "round",
        lineJoin: "round",
        opacity: 1,
        weight: 3.5,
      }).addTo(map);

      markers.current = geographicStops.map((stop, index) => {
        const number = String(index + 1).padStart(2, "0");
        const marker = L.marker(stop.coordinates, {
          icon: L.divIcon({
            className: "alpine-waypoint-marker-wrap",
            html: `<span class="alpine-waypoint-marker${index === 0 ? " is-active" : ""}">${number}</span>`,
            iconAnchor: [17, 17],
            iconSize: [34, 34],
          }),
          keyboard: true,
          title: `${number} ${stop.label}`,
        }).addTo(map);

        const placement = labelPlacements[index];
        marker.bindTooltip(`<b>${stop.label}</b>`, {
          className: "alpine-waypoint-tooltip",
          direction: placement.direction,
          offset: placement.offset,
          permanent: !compactMap,
        });
        marker.on("click", () => setActive(index));
        return marker;
      });

      map.fitBounds(routeHalo.getBounds(), {
        padding: [55, 55],
      });
      markers.current[active]?.openTooltip();
    }

    renderMap();

    return () => {
      disposed = true;
      mapInstance.current?.remove();
      mapInstance.current = null;
      markers.current = [];
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    const marker = markers.current[active];
    if (!map || !marker) return;

    markers.current.forEach((item, index) => {
      item.getElement()?.querySelector(".alpine-waypoint-marker")?.classList.toggle("is-active", index === active);
    });
    marker.openTooltip();
    map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 7), { animate: true, duration: 0.8 });
  }, [active]);

  return (
    <section className="alpine-waypoint-map" aria-label="德國、法國與瑞士十二日城市級路線地圖">
      <div
        ref={mapElement}
        className="alpine-waypoint-canvas"
        role="application"
        aria-label="可拖曳及縮放的德瑞法旅程地圖；點選站號可查看城市"
        tabIndex={0}
      />
      <div className="alpine-waypoint-shade" aria-hidden="true" />

      <article className="alpine-selected-waypoint" aria-live="polite">
        <p>SELECTED WAYPOINT · {String(active + 1).padStart(2, "0")}</p>
        <strong>{selected.labelEn}</strong>
        <b>{selected.label} · {countryNames[selected.country]}</b>
        <span>{selected.note}</span>
      </article>

      <div className="alpine-waypoint-compass" aria-hidden="true">
        <b>N</b><span>✦</span>
      </div>
      <div className="alpine-waypoint-scale">ALPINE ROUTE · 12 DAYS · 13 STOPS</div>
      <div className="alpine-waypoint-privacy">城市級規劃路線 · 非即時定位</div>
    </section>
  );
}
