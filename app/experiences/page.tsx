import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { experienceArticles, experienceYears } from "../content/experiences";

export const metadata: Metadata = {
  title: "经验文章库",
  description: "沈阳计算所 2006—2026 年初试、复试与备考经验全文网页归档。",
};

const years = experienceYears();

export default function Experiences() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero experience-page-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div>
          <p className="eyebrow"><span>FULL TEXT</span> EXPERIENCE LIBRARY</p>
          <h1>不下载，<br /><em>直接读全文</em></h1>
          <p>把散落在群文件里的初试总结、复试回忆和笔试题目转成可检索、可引用、适合手机阅读的网页。</p>
        </div>
        <aside className="page-hero-note archive-count">
          <span>已网页化</span><strong>{experienceArticles.length}<small> 篇</small></strong><p>已排除 1 份重复文件；每篇均标记年份、内容类型和原始资料名称。</p>
        </aside>
      </section>

      <nav className="subnav" aria-label="经验年份导航">
        {years.slice(0, 7).map((year) => <a href={`#year-${year}`} key={year}>{year}</a>)}
        <Link href="/">返回报考指南</Link>
      </nav>

      <section className="section experience-intro">
        <div className="archive-guide">
          <div><span>01</span><strong>先看年份</strong><p>流程和规则可能变化，旧文用于建立问题清单。</p></div>
          <div><span>02</span><strong>再看方法</strong><p>重点提炼复习节奏、项目表达和踩坑经验。</p></div>
          <div><span>03</span><strong>回到官方</strong><p>报考条件与复试安排以当年通知为最终依据。</p></div>
        </div>
      </section>

      <section className="section archive-groups">
        {years.map((year) => {
          const articles = experienceArticles.filter((article) => article.year === year);
          return (
            <div className="archive-group" id={`year-${year}`} key={year}>
              <div className="archive-year"><strong>{year}</strong><span>{articles.length} 篇全文</span></div>
              <div className="archive-items">
                {articles.map((article, index) => (
                  <a className="archive-item-link" href={`/experiences/${article.slug}`} key={article.slug}>
                    <span className="archive-item-index">{String(index + 1).padStart(2, "0")}</span>
                    <div><span>{article.category} · 考生资料</span><h2>{article.title}</h2><p>{article.summary}</p></div>
                    <small>阅读全文 →</small>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="archive-policy">
        <div><p className="section-kicker">ARCHIVE POLICY</p><h2>经验不是规则，回忆不是题库</h2></div>
        <p>本站只做资料转写与结构整理，不替作者补充结论，也不承诺题目复现。涉及招生、培养和复试要求时，请以当年官方通知为准。</p>
      </section>
      <SiteFooter />
    </main>
  );
}
