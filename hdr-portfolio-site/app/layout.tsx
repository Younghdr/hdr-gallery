import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Young Hung — HDR Photography",description:"Young Hung HDR 攝影作品集：旅行、城市、人像與光。"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-Hant"><body>{children}</body></html>}
