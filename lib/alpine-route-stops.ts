export type AlpineCountryCode = "DE" | "FR" | "CH";

export type AlpineRouteStop = {
  label: string;
  labelEn: string;
  country: AlpineCountryCode;
  coordinates: readonly [longitude: number, latitude: number];
  note: string;
};

export const alpineCountryNames: Record<AlpineCountryCode, string> = {
  DE: "德國",
  FR: "法國",
  CH: "瑞士",
};

export const alpineCountryIds = new Set(["250", "276", "756"]);

export const alpineCountryLabels = [
  {label: "德國", code: "GERMANY / DE", coordinates: [9.55, 49.75]},
  {label: "法國", code: "FRANCE / FR", coordinates: [6.45, 47.55]},
  {label: "瑞士", code: "SWITZERLAND / CH", coordinates: [9.25, 46.25]},
] as const;
export const alpineRouteStops: readonly AlpineRouteStop[] = [
  {
    label: "法蘭克福",
    labelEn: "Frankfurt",
    country: "DE",
    coordinates: [8.6821, 50.1109],
    note: "由法蘭克福進入德國，從這裡展開十二日的德法瑞鐵道旅程。",
  },
  {
    label: "海德堡",
    labelEn: "Heidelberg",
    country: "DE",
    coordinates: [8.6724, 49.3988],
    note: "沿著內卡河走進舊城，城堡、石橋與大學城街道接續出現。",
  },
  {
    label: "史特拉斯堡",
    labelEn: "Strasbourg",
    country: "FR",
    coordinates: [7.7521, 48.5734],
    note: "越過德法邊境，進入亞爾薩斯的運河、木筋屋與大教堂街區。",
  },
  {
    label: "科瑪",
    labelEn: "Colmar",
    country: "FR",
    coordinates: [7.3585, 48.0794],
    note: "在小威尼斯與彩色老城之間，路線沿著水道繼續向南。",
  },
  {
    label: "伯恩",
    labelEn: "Bern",
    country: "CH",
    coordinates: [7.4474, 46.948],
    note: "進入瑞士後抵達伯恩，拱廊、石板街與阿勒河環抱著舊城。",
  },
  {
    label: "策馬特",
    labelEn: "Zermatt",
    country: "CH",
    coordinates: [7.7491, 46.0207],
    note: "抵達無車山城策馬特，馬特洪峰成為瑞士章節的主視覺。",
  },
  {
    label: "安德瑪特",
    labelEn: "Andermatt",
    country: "CH",
    coordinates: [8.5939, 46.6356],
    note: "冰河列車穿越高山峽谷，在車窗與沿線景觀之間持續移動。",
  },
  {
    label: "茵特拉根",
    labelEn: "Interlaken",
    country: "CH",
    coordinates: [7.8632, 46.6863],
    note: "以兩湖之間的茵特拉根為基地，路線轉進伯恩高地。",
  },
  {
    label: "少女峰",
    labelEn: "Jungfrau",
    country: "CH",
    coordinates: [7.9853, 46.5475],
    note: "齒軌列車與艾格快線把海拔逐段抬高，直到冰川與雪線之間。",
  },
  {
    label: "盧森",
    labelEn: "Lucerne",
    country: "CH",
    coordinates: [8.3093, 47.0502],
    note: "沿黃金列車路線抵達盧森，湖岸、木橋與山城在此交會。",
  },
  {
    label: "蘇黎世",
    labelEn: "Zurich",
    country: "CH",
    coordinates: [8.5417, 47.3769],
    note: "瑞士城市段落在湖畔收束，接著向德國黑森林方向移動。",
  },
  {
    label: "蒂蒂湖",
    labelEn: "Titisee",
    country: "DE",
    coordinates: [8.1567, 47.9026],
    note: "回到德國黑森林，湖面、森林與山區鐵道接手畫面。",
  },
  {
    label: "斯圖加特",
    labelEn: "Stuttgart",
    country: "DE",
    coordinates: [9.1829, 48.7758],
    note: "旅程最後抵達斯圖加特，再回到法蘭克福完成三國路線。",
  },
] as const;

export const alpineClosedRoute = [
  ...alpineRouteStops.map((stop) => stop.coordinates),
  alpineRouteStops[0].coordinates,
] as const;
