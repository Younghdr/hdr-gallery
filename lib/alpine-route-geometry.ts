export type AlpineProjectedPoint = readonly [number, number];

export function roundProjectedPoint(
  point: AlpineProjectedPoint,
): AlpineProjectedPoint {
  return [Number(point[0].toFixed(3)), Number(point[1].toFixed(3))];
}
