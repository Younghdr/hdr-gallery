import type { Metadata } from "next";
import { MusicPlayer } from "@/components/music-player";
import NamibiaExperience from "../NamibiaExperience";
import "../travel.css";
import "../real-map.css";
import "../story.css";
import "../layout-fixes.css";
import "../visa-guide.css";
import "../nav-contrast.css";
import "../nav-layout.css";
import "../next-expedition.css";

export const metadata: Metadata = {
  title: "Namibia｜Into the Wild",
  description: "納米比亞 16 天 HDR 攝影旅程：沙漠、野生動物、星空與一路上的故事。",
  alternates: { canonical: "/travel/namibia/" },
};

export default function NamibiaTravelPage() {
  return <><NamibiaExperience /><MusicPlayer playlist={[{ title: "沙漠 · Namibia", src: "/travel/namibia-desert-theme.mp3" }]} /></>;
}
