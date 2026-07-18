"use client";

export default function MapSecretLink() {
  const revealStory = () => {
    const story = document.getElementById("map-secret-story") as HTMLDetailsElement | null;
    if (!story) return;
    story.open = true;
    story.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button className="map-secret-link" type="button" onClick={revealStory} aria-label="展開國土右上角狹長地帶的故事">
      <span>點擊國土右上角彩蛋 · 展開上方故事</span>
    </button>
  );
}
