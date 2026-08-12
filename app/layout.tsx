import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sict.cskaoyan.cn";
const socialImage = `${siteUrl}/og.png`;
const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
        {isStaticExport ? (
          <script dangerouslySetInnerHTML={{ __html: `document.addEventListener("click",function(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;var a=e.target instanceof Element?e.target.closest("a[href]"):null;if(!a||a.target&&a.target!=="_self"||a.hasAttribute("download"))return;var h=a.getAttribute("href");if(!h||h[0]==="#"||h.indexOf("//")===0)return;if(h[0]==="/"){e.preventDefault();e.stopImmediatePropagation();location.assign(h.indexOf("${pagesBasePath}/")===0?h:"${pagesBasePath}"+h)}},true);` }} />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
