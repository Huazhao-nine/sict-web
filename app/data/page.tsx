import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export const metadata: Metadata = {
  title: "历年录取数据",
  description: "沈阳计算所 2024—2026 年统考录取记录、初试区间与统计口径对照。",
};

export const dynamic = "force-static";

const years = [
  {
    year: "2026",
    total: "49",
    fullTime: "49",
    partTime: "0",
    academic: "16",
    professional: "33",
    academicRange: "271–361",
    professionalRange: "323–395",
    note: <><strong>现有材料未见非全日制。</strong>48 条常规成绩记录，另含 1 名士兵专项计划考生。</>,
    coverage: "完整网页报告",
    href: "/data/2026",
    latest: true,
  },
  {
    year: "2025",
    total: "79",
    fullTime: "51",
    partTime: "28",
    academic: "15",
    professional: "64",
    academicRange: "261–361",
    professionalRange: "262–409",
    note: <><strong>全日制 51 人，非全日制 28 人。</strong>专项与士兵计划按非“非全”备注归入全日制。</>,
    coverage: "完整网页报告",
    href: "/data/2025",
    latest: false,
  },
  {
    year: "2024",
    total: "78",
    fullTime: "54",
    partTime: "24",
    academic: "14",
    professional: "64",
    academicRange: "283–369",
    professionalRange: "277–409",
    note: <><strong>全日制 54 人，非全日制 24 人。</strong>非全记录包含所内、校内调剂标注。</>,
    coverage: "完整网页报告",
    href: "/data/2024",
    latest: false,
  },
];

export default function DataArchive() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero data-page-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div>
          <p className="eyebrow"><span>2024—2026</span> DATA ARCHIVE</p>
          <h1>历年录取<br /><em>数据档案</em></h1>
          <p>把三年的记录放在同一张表里，但保留每一年真实的统计边界。<strong>数字用于理解规模，不用于制造“稳上分数线”。</strong></p>
        </div>
        <aside className="page-hero-note">
          <span>DATA RULE / 01</span>
          <strong>先看口径，再看数字</strong>
          <p>学硕与专硕试卷不同；<strong>全日制、非全日制、调剂和专项计划</strong>也不能混为一种竞争路径。</p>
        </aside>
      </section>

      <nav className="subnav" aria-label="数据页导航">
        <a href="#overview">年度概览</a><a href="#comparison">三年对照</a><a href="#method">统计口径</a><Link href="/">返回报考指南</Link>
      </nav>

      <section className="section archive-overview" id="overview">
        <div className="section-heading compact">
          <div><p className="section-kicker">YEAR BY YEAR</p><h2>三年记录，分开阅读</h2></div>
          <p><strong>2024、2025</strong> 已从复试与录取表补齐分数段和成绩统计；<strong>2026</strong> 使用年度报告补齐单科与毕业去向。</p>
        </div>
        <div className="year-card-grid">
          {years.map((item) => (
            <a href={item.href} className={item.latest ? "year-card latest" : "year-card"} key={item.year}>
              <div className="year-card-title"><span>{item.latest ? "最新年度" : "历史归档"} · {item.coverage}</span><strong>{item.year}</strong></div>
              <div className="year-total"><span>录取记录</span><strong>{item.total}<small> 人</small></strong></div>
              <dl>
                <div><dt>全日制</dt><dd>{item.fullTime}</dd></div>
                <div><dt>非全日制</dt><dd>{item.partTime}</dd></div>
                <div><dt>学硕</dt><dd>{item.academic}</dd></div>
                <div><dt>专硕</dt><dd>{item.professional}</dd></div>
              </dl>
              <p>{item.note}</p>
              <b className="year-card-link">打开年度报告 ↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="section comparison-section" id="comparison">
        <div className="section-heading compact">
          <div><p className="section-kicker">COMPARISON</p><h2>学习方式与记录规模</h2></div>
          <p><strong>全日制、非全日制按拟录取备注拆分</strong>；初试区间需进入年度页面按学习方式查看。</p>
        </div>
        <div className="archive-table" role="table" aria-label="2024 至 2026 年录取数据对照">
          <div className="archive-table-row archive-table-head" role="row">
            <span role="columnheader">年度</span><span role="columnheader">录取合计</span><span role="columnheader">全日制</span><span role="columnheader">非全日制</span><span role="columnheader">学硕记录 / 区间</span><span role="columnheader">专硕记录 / 区间</span>
          </div>
          {years.map((item) => (
            <div className="archive-table-row" role="row" key={item.year}>
              <strong role="cell">{item.year}</strong><span role="cell">{item.total}</span><span role="cell">{item.fullTime}</span><span role="cell">{item.partTime}</span><span role="cell">{item.academic} / {item.academicRange}</span><span role="cell">{item.professional} / {item.professionalRange}</span>
            </div>
          ))}
        </div>
        <div className="comparison-caveat"><span>不要这样比较</span><p><strong>不能用“2025 专硕最低 262”推出下一年 262 分可以录取。</strong>试题难度、招生类型、调剂和复试表现都在变化。</p></div>
      </section>

      <section className="data-method" id="method">
        <div className="data-method-inner">
          <div><p className="section-kicker">METHODOLOGY</p><h2>这张表是怎么来的</h2></div>
          <ol>
            <li><span>01</span><div><strong>有效记录</strong><p>复试统计要求初试字段完整；拟录取统计还要求复试和总成绩完整。<strong>页面不公开姓名。</strong></p></div></li>
            <li><span>02</span><div><strong>学习方式分开算</strong><p>只有明确标注“非全”的拟录取记录归入非全日制；其余归入全日制。<strong>复试名单没有学习方式字段，不构造独立复试率。</strong></p></div></li>
            <li><span>03</span><div><strong>来源优先级</strong><p>官方公告优先于学生整理；结构化录取表用于聚合，报告用于补充口径。</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section archive-download">
        <div><p className="section-kicker">FULL REPORTS</p><h2>三年都已网页化</h2><p>2024、2025 可查看复试、录取、分数段与成绩统计；2026 另含单科成绩和毕业去向。</p></div>
        <div className="archive-report-actions"><a href="/data/2024">2024 ↗</a><a href="/data/2025">2025 ↗</a><a className="button button-dark" href="/data/2026">2026 完整报告 <span>↗</span></a></div>
      </section>
      <SiteFooter />
    </main>
  );
}
