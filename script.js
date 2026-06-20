const YOUTUBE_VIDEO = "https://youtu.be/Tji5JMn2hWs?si=bIICcPjyIuFXclzq";

function extractYouTubeId(input) {
  const value = String(input || "").trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return value;
  }

  try {
    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/").filter(Boolean)[1] || "";
    }

    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/").filter(Boolean)[1] || "";
    }

    return url.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

const videoId = extractYouTubeId(YOUTUBE_VIDEO);
const videoFrame = document.querySelector("#videoFrame");
const videoPlaceholder = document.querySelector("#videoPlaceholder");
const hdrWatchLink = document.querySelector("#hdrWatchLink");

if (videoId && videoFrame) {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}&vq=highres`;
  const iframe = document.createElement("iframe");
  const embedParams = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
    autoplay: "1",
    mute: "1",
    vq: "highres",
  });

  iframe.src = `https://www.youtube.com/embed/${videoId}?${embedParams.toString()}`;
  iframe.title = "YouTube HDR video player";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  videoPlaceholder?.remove();
  videoFrame.appendChild(iframe);

  if (hdrWatchLink) {
    hdrWatchLink.href = watchUrl;
  }
}
