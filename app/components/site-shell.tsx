import Link from "next/link";

const primaryNav = [
  { label: "首页", href: "/" },
  { label: "报考指南", href: "/#overview" },
  { label: "历年数据", href: "/data" },
  { label: "经验归档", href: "/experiences" },
  { label: "来源说明", href: "/sources" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="返回沈计指南首页">
        <span className="brand-mark">沈</span>
        <span>
          <strong>沈计指南</strong>
          <small>学生公益整理 · 非官方网站</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="主导航">
        {primaryNav.map((item) => (
          <Link href={item.href} key={item.href}>{item.label}</Link>
        ))}
      </nav>
      <Link className="header-cta" href="/data/2026">
        2026 年度报告 <span aria-hidden="true">↗</span>
      </Link>
      <details className="mobile-menu">
        <summary aria-label="打开导航菜单"><span />菜单</summary>
        <nav aria-label="移动端导航">
          {primaryNav.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}<span>↗</span></Link>
          ))}
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Link className="footer-brand" href="/">
        <span className="brand-mark">沈</span>
        <span><strong>沈计指南</strong><small>让信息透明一点，让选择从容一点。</small></span>
      </Link>
      <nav className="footer-nav" aria-label="页脚导航">
        <Link href="/data">历年数据</Link>
        <Link href="/experiences">经验归档</Link>
        <Link href="/sources">来源说明</Link>
      </nav>
      <div className="footer-meta"><p>公益维护 · 非盈利 · 非官方网站</p><p>内容仅供参考，以官方通知为准</p></div>
    </footer>
  );
}
