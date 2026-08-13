import type { AnchorHTMLAttributes } from "react";
import NextLink, { type LinkProps } from "next/link";

type StaticLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

/**
 * GitHub Pages 使用完整静态导出，不需要 RSC 路由预取。
 * 关闭预取可以避免 Vinext 在静态部署中初始化 RSC prefetch 时产生异常。
 */
export default function StaticLink(props: StaticLinkProps) {
  return <NextLink {...props} prefetch={false} />;
}
