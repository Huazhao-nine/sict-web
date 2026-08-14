import Link from "./static-link";

export const qqGroupUrl = "https://qm.qq.com/cgi-bin/qm/qr?k=r9u8RmL8tXw4jCF32Pz1tOd83sFteVW1&jump_from=webapi&authKey=Itu6in4pdGnalupvoOhfjHS5fzZsjCw0hgTiBdJh8oSiq1vSH3eiDwAenGR0UsCl";
export const githubRepoUrl = "https://github.com/Huazhao-nine/sict-web";

const primaryNav = [
  { label: "首页", href: "/" },
  { label: "报考指南", href: "/#overview" },
  { label: "历年数据", href: "/data" },
  { label: "登分", href: "/score" },
  { label: "经验归档", href: "/experiences" },
  { label: "交流与致谢", href: "/#community" },
  { label: "免责声明", href: "/disclaimer" },
];

export function QQGroupLink({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <a className={className} href={qqGroupUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

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
      <a className="header-source" href={githubRepoUrl} target="_blank" rel="noopener noreferrer">
        GitHub 项目 <span aria-hidden="true">↗</span>
      </a>
      <QQGroupLink className="header-cta header-group-cta">
        加入群聊 <span aria-hidden="true">↗</span>
      </QQGroupLink>
      <details className="mobile-menu">
        <summary aria-label="打开导航菜单"><span />菜单</summary>
        <nav aria-label="移动端导航">
          {primaryNav.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}<span>↗</span></Link>
          ))}
          <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer">GitHub 项目<span>↗</span></a>
          <QQGroupLink className="mobile-group-link">加入 2027 交流群<span>↗</span></QQGroupLink>
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
        <Link href="/score">沈计登分</Link>
        <Link href="/experiences">经验归档</Link>
        <Link href="/sources">来源说明</Link>
        <Link href="/disclaimer">免责声明</Link>
        <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer">GitHub 项目</a>
        <a href={qqGroupUrl} target="_blank" rel="noopener noreferrer">2027 交流群</a>
      </nav>
      <div className="footer-meta"><p>公益维护 · 非盈利 · 非官方网站</p><p>内容仅供参考，以官方通知为准</p></div>
    </footer>
  );
}
