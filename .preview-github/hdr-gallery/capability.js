(function () {
  const STORAGE_KEY = "hdrCapabilityTestResult";
  const baseResult = {
    toneMappingScore: 88,
    localDimmingScore: 72,
  };

  const requiredKeys = ["peakHighlightNits", "nearBlackVisibleFrom", "nearWhiteVisibleUntil"];

  const detailLabels = [
    ["peakBrightness", "Peak Brightness"],
    ["nearBlack", "Near Black"],
    ["nearWhite", "Near White"],
    ["contrast", "Contrast"],
    ["toneMapping", "Tone Mapping"],
    ["localDimming", "Local Dimming"],
  ];

  function readResult() {
    try {
      return { ...baseResult, ...(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}) };
    } catch {
      return { ...baseResult };
    }
  }

  function saveResult(update) {
    const next = { ...readResult(), ...update };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  }

  function isReady(result) {
    return requiredKeys.every((key) => Number.isFinite(Number(result[key])));
  }

  function createNode(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function metricCard(label, value, suffix) {
    const card = createNode("div", "capability-metric");
    card.append(
      createNode("span", "capability-metric-label", label),
      createNode("strong", "capability-metric-value", value === undefined ? "待測" : `${value}${suffix || ""}`)
    );
    return card;
  }

  function detailRow(label, score, stars, available) {
    const row = createNode("div", "capability-detail-row");
    const labelWrap = createNode("div", "capability-detail-copy");
    labelWrap.append(createNode("strong", "", label), createNode("span", "", available ? stars : "待測"));

    const meter = createNode("div", "capability-meter");
    const fill = createNode("div", "capability-meter-fill");
    fill.style.width = `${available ? score : 0}%`;
    meter.append(fill);

    row.append(labelWrap, meter, createNode("span", "capability-detail-score", available ? String(score) : "--"));
    return row;
  }

  function suitabilityLabel(score) {
    if (score >= 85) return "很適合 HDR";
    if (score >= 72) return "適合 HDR";
    if (score >= 60) return "可用於 HDR";
    return "HDR 表現有限";
  }

  function renderCapability(root, result) {
    const scoring = window.HDRScoring;
    if (!root || !scoring) return;

    const ready = isReady(result);
    const detailScores = ready ? scoring.calculateDetailScores(result) : null;
    const overallScore = ready ? scoring.calculateOverallScore(result) : null;
    const grade = overallScore !== null ? scoring.getHdrGrade(overallScore) : undefined;
    const stars = overallScore !== null ? scoring.scoreToStars(overallScore) : "待測";

    root.replaceChildren();

    const section = createNode("section", "capability-shell");
    const header = createNode("div", "capability-heading");
    header.append(
      createNode("p", "capability-eyebrow", "HDR Capability"),
      createNode("h2", "", "HDR Capability Summary"),
      createNode(
        "p",
        "",
        ready
          ? "依照 Near Black、Near White 與峰值高光估算螢幕 HDR 適性。"
          : "請先完成 Near Black、Near White 與 Peak Highlight 點選，系統會即時計算 HDR 適性。"
      )
    );

    const summary = createNode("article", "capability-summary glass");
    const hero = createNode("div", "capability-score-hero");
    hero.append(
      createNode("span", "capability-metric-label", "Overall Score"),
      createNode("strong", "capability-overall-score", overallScore === null ? "--" : String(overallScore)),
      createNode("span", "capability-stars", ready ? `${stars} · ${suitabilityLabel(overallScore)}` : "等待測試結果")
    );

    const metrics = createNode("div", "capability-metrics");
    metrics.append(
      metricCard("HDR Grade", grade),
      metricCard("Peak Highlight", result.peakHighlightNits, " nits"),
      metricCard("Near Black", result.nearBlackVisibleFrom),
      metricCard("Near White", result.nearWhiteVisibleUntil)
    );

    summary.append(hero, metrics);

    const details = createNode("article", "capability-details glass");
    const detailsTitle = createNode("div", "capability-details-title");
    detailsTitle.append(createNode("h3", "", "Detail Scores"), createNode("p", "", "Calculated from selected display test values."));
    details.append(detailsTitle);

    detailLabels.forEach(([key, label]) => {
      const score = detailScores ? detailScores[key] : 0;
      details.append(detailRow(label, score, scoring.scoreToStars(score), ready));
    });

    section.append(header, summary, details);
    root.append(section);
  }

  function initCapability() {
    const root = document.getElementById("hdr-capability-root");
    renderCapability(root, readResult());

    window.addEventListener("hdr-test-result-change", (event) => {
      renderCapability(root, saveResult(event.detail || {}));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCapability);
  } else {
    initCapability();
  }
})();
