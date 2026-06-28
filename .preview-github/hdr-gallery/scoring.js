(function (root) {
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value) || 0));
  }

  function interpolate(value, points) {
    const sorted = points.slice().sort((a, b) => a[0] - b[0]);
    const input = Number(value) || 0;

    if (input <= sorted[0][0]) return sorted[0][1];
    if (input >= sorted[sorted.length - 1][0]) return sorted[sorted.length - 1][1];

    for (let index = 0; index < sorted.length - 1; index += 1) {
      const [x1, y1] = sorted[index];
      const [x2, y2] = sorted[index + 1];
      if (input >= x1 && input <= x2) {
        const ratio = (input - x1) / (x2 - x1);
        return y1 + ratio * (y2 - y1);
      }
    }

    return 0;
  }

  function calculatePeakBrightnessScore(peakHighlightNits) {
    return Math.round(
      interpolate(peakHighlightNits, [
        [300, 35],
        [600, 60],
        [1000, 84],
        [1500, 96],
        [2000, 100],
      ])
    );
  }

  function calculateSustainedWhiteScore(sustainedWhiteNits) {
    return Math.round(
      interpolate(sustainedWhiteNits, [
        [150, 35],
        [250, 56],
        [400, 82],
        [600, 96],
        [800, 100],
      ])
    );
  }

  function calculateNearBlackScore(nearBlackVisibleFrom) {
    const value = Number(nearBlackVisibleFrom);
    if (!Number.isFinite(value)) return 0;
    if (value <= 0) return 100;
    return Math.round(
      interpolate(value, [
        [1, 98],
        [3, 92],
        [8, 78],
        [16, 58],
        [24, 34],
        [31, 16],
      ])
    );
  }

  function calculateNearWhiteScore(nearWhiteVisibleUntil) {
    const value = Number(nearWhiteVisibleUntil);
    if (!Number.isFinite(value)) return 0;
    return Math.round(
      interpolate(value, [
        [224, 20],
        [240, 48],
        [248, 74],
        [252, 90],
        [255, 100],
      ])
    );
  }

  function calculateContrastScore(result) {
    const peakScore = calculatePeakBrightnessScore(result.peakHighlightNits);
    const blackScore = calculateNearBlackScore(result.nearBlackVisibleFrom);
    return Math.round(peakScore * 0.44 + blackScore * 0.56);
  }

  function calculateToneMappingScore(toneMappingScore) {
    return Math.round(clamp(toneMappingScore, 0, 100));
  }

  function calculateLocalDimmingScore(localDimmingScore) {
    return Math.round(clamp(localDimmingScore, 0, 100));
  }

  function calculateDetailScores(result) {
    return {
      peakBrightness: calculatePeakBrightnessScore(result.peakHighlightNits),
      nearBlack: calculateNearBlackScore(result.nearBlackVisibleFrom),
      nearWhite: calculateNearWhiteScore(result.nearWhiteVisibleUntil),
      contrast: calculateContrastScore(result),
      toneMapping: calculateToneMappingScore(result.toneMappingScore),
      localDimming: calculateLocalDimmingScore(result.localDimmingScore),
    };
  }

  function calculateOverallScore(result) {
    const detail = calculateDetailScores(result);
    const sustainedWhite = Number.isFinite(Number(result.sustainedWhiteNits))
      ? calculateSustainedWhiteScore(result.sustainedWhiteNits)
      : detail.peakBrightness;
    return Math.round(
      detail.peakBrightness * 0.22 +
        sustainedWhite * 0.14 +
        detail.nearBlack * 0.18 +
        detail.nearWhite * 0.14 +
        detail.contrast * 0.12 +
        detail.toneMapping * 0.12 +
        detail.localDimming * 0.08
    );
  }

  function getHdrGrade(score) {
    const value = clamp(score, 0, 100);
    if (value >= 92) return "A+";
    if (value >= 85) return "A";
    if (value >= 78) return "B+";
    if (value >= 70) return "B";
    if (value >= 62) return "C+";
    if (value >= 52) return "C";
    return "D";
  }

  function scoreToStars(score) {
    const value = clamp(score, 0, 100);
    const filled = Math.round(value / 20);
    return "★★★★★".slice(0, filled) + "☆☆☆☆☆".slice(0, 5 - filled);
  }

  root.HDRScoring = {
    calculatePeakBrightnessScore,
    calculateSustainedWhiteScore,
    calculateNearBlackScore,
    calculateNearWhiteScore,
    calculateContrastScore,
    calculateToneMappingScore,
    calculateLocalDimmingScore,
    calculateDetailScores,
    calculateOverallScore,
    getHdrGrade,
    scoreToStars,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = root.HDRScoring;
  }
})(typeof window !== "undefined" ? window : globalThis);
