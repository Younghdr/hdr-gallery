import type { Metadata } from "next";
import { MusicPlayer } from "@/components/music-player";
import NamibiaExperience from "./NamibiaExperience";
import "./travel.css";
import "./real-map.css";
import "./story.css";
import "./layout-fixes.css";
import "./visa-guide.css";

export const metadata: Metadata = {
  title: "Namibia — Into the Wild",
  description: "從台灣出發約 16 天，包含 13 天深入納米比亞沙漠、荒野與星空的探險行程。",
};

export default function TravelPage() {
  return <>
    <NamibiaExperience />
    <MusicPlayer playlist={[{ title: "砂漠 · Namibia", src: "/travel/namibia-desert-theme.mp3" }]} />
  </>;
}
