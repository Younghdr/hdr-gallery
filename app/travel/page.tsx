import type { Metadata } from "next";
import NamibiaExperience from "./NamibiaExperience";
import "./travel.css";
import "./real-map.css";
import "./story.css";
import "./layout-fixes.css";
import "./visa-guide.css";

export const metadata: Metadata = {
  title: "Namibia — Into the Wild",
  description: "13 天深入納米比亞的沙漠、荒野與星空探險行程。",
};

export default function TravelPage() {
  return <NamibiaExperience />;
}
