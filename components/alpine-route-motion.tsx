import {useGsapTimeline} from "@remotion/gsap";
import {geoMercator, geoPath, line} from "d3";
import type {FeatureCollection, Geometry} from "geojson";
import React, {useMemo} from "react";
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {feature} from "topojson-client";
import countriesTopology from "world-atlas/countries-50m.json";

import {routeProgressForFrame} from "@/lib/alpine-route-navigation";
import {
  roundProjectedPoint,
  type AlpineProjectedPoint,
} from "@/lib/alpine-route-geometry";
import {
  alpineClosedRoute,
  alpineCountryIds,
  alpineCountryLabels,
  alpineCountryNames,
  alpineRouteStops,
} from "@/lib/alpine-route-stops";

export const ALPINE_ROUTE_FPS = 30;
export const ALPINE_ROUTE_WIDTH = 1920;
export const ALPINE_ROUTE_HEIGHT = 1080;
export const FRAMES_PER_STOP = 24;
export const COMPLETE_FRAME = alpineRouteStops.length * FRAMES_PER_STOP;
export const ALPINE_ROUTE_DURATION = COMPLETE_FRAME + 1;

export function frameForStop(index: number): number {
  return Math.max(0, Math.min(alpineRouteStops.length - 1, index)) * FRAMES_PER_STOP;
}

function distance(a: AlpineProjectedPoint, b: AlpineProjectedPoint): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

export function AlpineRouteMotion() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const geometry = useMemo(() => {
    const topology = countriesTopology as unknown as {
      objects: {countries: unknown};
    };
    const allCountries = feature(
      countriesTopology as never,
      topology.objects.countries as never,
    ) as unknown as FeatureCollection<Geometry>;
    const countries = allCountries.features.filter((country) =>
      alpineCountryIds.has(String(country.id).padStart(3, "0")),
    );
    const routeCoordinates = alpineClosedRoute.map(
      ([longitude, latitude]) => [longitude, latitude] as [number, number],
    );
    const routeGeometry = {
      type: "LineString" as const,
      coordinates: routeCoordinates,
    };
    const projection = geoMercator().fitExtent(
      [
        [420, 92],
        [1810, 990],
      ],
      routeGeometry,
    );
    const path = geoPath(projection);
    const routePoints = routeCoordinates.map((coordinates) =>
      roundProjectedPoint(projection(coordinates) as [number, number]),
    );
    const routePath = line<AlpineProjectedPoint>()(routePoints) ?? "";
    const segmentLengths = routePoints.slice(1).map((point, index) =>
      distance(routePoints[index], point),
    );
    const totalLength = segmentLengths.reduce((sum, value) => sum + value, 0);
    const waypointProgress = [0];
    let travelled = 0;
    segmentLengths.forEach((value) => {
      travelled += value;
      waypointProgress.push(travelled / totalLength);
    });

    return {
      countryPaths: countries.map((country) => ({
        id: String(country.id).padStart(3, "0"),
        path: path(country) ?? "",
      })),
      countryLabels: alpineCountryLabels.map((country) => ({
        ...country,
        point: roundProjectedPoint(
          projection([...country.coordinates]) as [number, number],
        ),
      })),
      routePath,
      routePoints,
      waypointProgress,
    };
  }, []);

  const routeProgress = routeProgressForFrame(
    frame,
    FRAMES_PER_STOP,
    geometry.waypointProgress,
  );
  const segmentPosition = Math.min(
    alpineClosedRoute.length - 1,
    Math.max(0, frame / FRAMES_PER_STOP),
  );
  const segmentIndex = Math.min(
    geometry.routePoints.length - 2,
    Math.floor(segmentPosition),
  );
  const localSegmentProgress = segmentPosition - segmentIndex;
  const from = geometry.routePoints[segmentIndex];
  const to = geometry.routePoints[segmentIndex + 1];
  const trainX = interpolate(localSegmentProgress, [0, 1], [from[0], to[0]]);
  const trainY = interpolate(localSegmentProgress, [0, 1], [from[1], to[1]]);
  const activeStop = Math.min(
    alpineRouteStops.length - 1,
    Math.max(0, Math.round(frame / FRAMES_PER_STOP)),
  );

  const scope = useGsapTimeline<HTMLDivElement>(
    ({timeline, selector}) => {
      alpineRouteStops.forEach((_, index) => {
        const card = selector(`[data-stop-card="${index}"]`);
        timeline.set(
          card,
          {autoAlpha: index === 0 ? 1 : 0, y: 0},
          0,
        );
        if (index > 0) {
          timeline.fromTo(
            card,
            {autoAlpha: 0, y: 26},
            {
              autoAlpha: 1,
              y: 0,
              duration: 10 / fps,
              ease: "power3.out",
            },
            (index * FRAMES_PER_STOP - 10) / fps,
          );
        }
        const exitFrame =
          index === alpineRouteStops.length - 1
            ? COMPLETE_FRAME - 9
            : index * FRAMES_PER_STOP + 4;
        timeline.to(
          card,
          {
            autoAlpha: 0,
            y: -16,
            duration: 8 / fps,
            ease: "power2.in",
          },
          exitFrame / fps,
        );
      });
    },
    {dependencies: [fps]},
  );

  return (
    <AbsoluteFill ref={scope} className="alpine-motion-frame">
      <div className="alpine-motion-topline">
        <span>EXPEDITION 22</span>
        <span>GERMANY · FRANCE · SWITZERLAND</span>
        <span>12 DAYS · 13 STOPS</span>
      </div>

      <svg
        className="alpine-motion-map"
        viewBox={`0 0 ${ALPINE_ROUTE_WIDTH} ${ALPINE_ROUTE_HEIGHT}`}
        role="img"
        aria-label="德國、法國與瑞士十二日城市級鐵道路線"
      >
        <g className="alpine-motion-countries">
          {geometry.countryPaths.map((country) => (
            <path
              key={country.id}
              className={country.id === "756" ? "is-switzerland" : undefined}
              d={country.path}
            />
          ))}
        </g>

        <g className="alpine-motion-country-labels" aria-hidden="true">
          {geometry.countryLabels.map((country) => (
            <text key={country.code} x={country.point[0]} y={country.point[1]}>
              <tspan x={country.point[0]}>{country.label}</tspan>
              <tspan x={country.point[0]} dy="23">{country.code}</tspan>
            </text>
          ))}
        </g>

        <path className="alpine-motion-route-halo" d={geometry.routePath} />
        <path
          className="alpine-motion-route"
          d={geometry.routePath}
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - routeProgress}
        />

        <g className="alpine-motion-stops">
          {geometry.routePoints.slice(0, -1).map((point, index) => (
            <g
              key={alpineRouteStops[index].labelEn}
              className={index === activeStop ? "is-active" : undefined}
              transform={`translate(${point[0]} ${point[1]})`}
            >
              <circle r={index === activeStop ? 15 : 10} />
              <text y="4">{String(index + 1).padStart(2, "0")}</text>
            </g>
          ))}
        </g>

        <circle
          className="alpine-motion-train"
          cx={trainX}
          cy={trainY}
          r="14"
        />
      </svg>

      <div className="alpine-motion-cards" aria-live="polite">
        {alpineRouteStops.map((stop, index) => (
          <article
            key={stop.labelEn}
            className="alpine-motion-card"
            data-stop-card={index}
          >
            <p>
              WAYPOINT {String(index + 1).padStart(2, "0")} · {stop.country}
            </p>
            <strong>{stop.labelEn}</strong>
            <h3>
              {stop.label} · {alpineCountryNames[stop.country]}
            </h3>
            <span>{stop.note}</span>
          </article>
        ))}
      </div>

      <div className="alpine-motion-caption">
        城市級行程規劃 · 非即時定位
      </div>
    </AbsoluteFill>
  );
}
