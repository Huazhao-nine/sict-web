import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export const metadata: Metadata = {
  title: "经验资料归档",
  description: "沈阳计算所 2018—2026 年初试、复试与备考经验资料目录。",
};

const groups = [
  { year: "2026", items: [
    ["复试笔试回忆", "复试"],
    ["复试试题与考核范围整理", "复试"],
  ] },
  { year: "2025", items: [
    ["学硕 359 分复试回忆", "复试"],
  ] },
  { year: "2024", items: [
    ["沈计所复试流程回忆", "复试"],
    ["数学二 132 分备考经验", "初试"],
  ] },
  { year: "2023", items: [
    ["沈计所 11408 复试经验", "复试"],
    ["初试 401 分经验贴", "初试"],
    ["11408 备考总结", "初试"],
    ["考研初试阶段总结", "初试"],
    ["408 计算机基础高分备考经验", "初试"],
  ] },
  { year: "2022", items: [
    ["专硕 342 分复试回忆", "复试"],
    ["复试笔试回忆：薪火相传", "复试"],
  ] },
  { year: "2020", items: [
    ["专硕复试笔试题目详细版", "复试"],
    ["学硕复试笔试题目", "复试"],
    ["全日制专业面试回忆", "复试"],
  ] },
  { year: "2019", items: [
    ["全日制学硕、专硕复试笔试回忆", "复试"],
    ["非全日制复试笔试回忆", "复试"],
  ] },
  { year: "2018", items: [
    ["学硕复试笔试回忆", "复试"],
  ] },
];

export default function Experiences() {
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  return (
    <main>
      <SiteHeader />
      <section className="page-hero experience-page-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div>
          <p className="eyebrow"><span>2018—2026</span> EXPERIENCE ARCHIVE</p>
          <h1>经验资料<br /><em>归档目录</em></h1>
          <p>把散落在群文件里的初试总结、复试回忆和笔试题目先整理成目录，再逐篇转为可搜索的网页。</p>
        </div>
        <aside className="page-hero-note archive-count">
          <span>已整理目录</span><strong>{total}<small> 篇</small></strong><p>原始资料仍保留在项目中；网页化时会保留年份、来源类型和非官方声明。</p>
        </aside>
      </section>

      <nav className="subnav" aria-label="经验年份导航">
        {groups.slice(0, 6).map((group) => <a href={`#year-${group.year}`} key={group.year}>{group.year}</a>)}
        <a href="/">返回报考指南</a>
      </nav>

      <section className="section experience-intro">
        <div className="archive-guide">
          <div><span>01</span><strong>看流程</strong><p>用回忆材料了解环节，不照搬具体题目。</p></div>
          <div><span>02</span><strong>看方法</strong><p>优先提炼复习节奏、项目表达和踩坑经验。</p></div>
          <div><span>03</span><strong>看年份</strong><p>越早的资料越需要用最新官方通知校正。</p></div>
        </div>
      </section>

      <section className="section archive-groups">
        {groups.map((group) => (
          <div className="archive-group" id={`year-${group.year}`} key={group.year}>
            <div className="archive-year"><strong>{group.year}</strong><span>{group.items.length} 篇资料</span></div>
            <div className="archive-items">
              {group.items.map(([title, tag], index) => (
                <article key={title}>
                  <span className="archive-item-index">{String(index + 1).padStart(2, "0")}</span>
                  <div><span>{tag} · 考生回忆</span><h2>{title}</h2></div>
                  <small>待网页化</small>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="archive-policy">
        <div><p className="section-kicker">ARCHIVE POLICY</p><h2>经验不是规则，回忆不是题库</h2></div>
        <p>本站不会把个体经历包装成普遍结论，也不会承诺题目复现。所有经验文章都应保留年份，并与当年官方复试方案并读。</p>
      </section>
      <SiteFooter />
    </main>
  );
}

