"use client";

import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const gaId = process.env.NEXT_PUBLIC_GA_ID || "";
const trackingEndpoint = process.env.NEXT_PUBLIC_TRACKING_ENDPOINT || "";

function visitorId() {
  const key = "young_hung_hdr_visitor";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const id = crypto.randomUUID();
  window.localStorage.setItem(key, id);
  return id;
}

function sendToTrackingBackend(eventName: string, params: Record<string, string | number | boolean | undefined>) {
  if (!trackingEndpoint || typeof window === "undefined") return;

  const payload = {
    event: eventName,
    path: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer || "",
    visitorId: visitorId(),
    timestamp: new Date().toISOString(),
    params,
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    navigator.sendBeacon(trackingEndpoint, new Blob([body], { type: "application/json" }));
    return;
  }

  fetch(trackingEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export function trackEvent(eventName: string, params: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  sendToTrackingBackend(eventName, params);
  if (gaId && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    sendToTrackingBackend("page_view", {
      page_path: pagePath,
    });

    if (gaId && window.gtag) {
      window.gtag("config", gaId, { page_path: pagePath });
    }
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  return (
    <>
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
