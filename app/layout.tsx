import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: {
      default: "沈计指南｜沈阳计算所报考信息站",
      template: "%s｜沈计指南",
    },
    description:
      "学生公益整理的中国科学院沈阳计算技术研究所报考指南、复试说明与历年录取数据。",
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "沈计指南",
      title: "沈计指南｜沈阳计算所报考信息站",
      description: "招生、初试、复试与录取数据，一页看清。",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "沈阳计算所报考指南：招生、初试、复试与录取数据",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "沈计指南｜沈阳计算所报考信息站",
      description: "招生、初试、复试与录取数据，一页看清。",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://cdn.bootcdn.net" />
        <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/lxgw-wenkai-webfont/1.6.0/style.min.css" />
        <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/lxgw-wenkai-screen-webfont/1.7.0/style.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
