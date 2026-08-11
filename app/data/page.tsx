import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export const metadata: Metadata = {
  title: "历年录取数据",
  description: "沈阳计算所 2024—2026 年统考录取记录、初试区间与统计口径对照。",
};

const years = [
  {
    year: "2026",
    total: "49",
    academic: "16",
    professional: "33",
    academicRange: "271–361",
    professionalRange: "323–395",
    note: "48 条常规录取记录，另含 1 名专项计划考生",
    latest: true,
  },
  {
    year: "2025",
    total: "79",
    academic: "15",
    professional: "64",
    academicRange: "261–361",
    professionalRange: "262–409",
    note: "表内记录含非全日制与专项计划标注",
    latest: false,
  },
  {
    year: "2024",
    total: "78",
    academic: "14",
    professional: "64",
    academicRange: "283–369",
    professionalRange: "277–409",
    note: "表内记录含非全日制、调剂与专项计划标注",
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
          <p>把三年的记录放在同一张表里，但保留每一年真实的统计边界。数字用于理解规模，不用于制造“稳上分数线”。</p>
        </div>
        <aside className="page-hero-note">
          <span>DATA RULE / 01</span>
          <strong>先看口径，再看数字</strong>
          <p>学硕与专硕试卷不同；全日制、非全日制、调剂和专项计划也不能混为一种竞争路径。</p>
        </aside>
      </section>

      <nav className="subnav" aria-label="数据页导航">
        <a href="#overview">年度概览</a><a href="#comparison">三年对照</a><a href="#method">统计口径</a><a href="/">返回报考指南</a>
      </nav>

      <section className="section archive-overview" id="overview">
        <div className="section-heading compact">
          <div><p className="section-kicker">YEAR BY YEAR</p><h2>三年记录，分开阅读</h2></div>
          <p>2024、2025 为录取表内有效记录；2026 同时使用录取表与数据报告补齐专项计划口径。</p>
        </div>
        <div className="year-card-grid">
          {years.map((item) => (
            <article className={item.latest ? "year-card latest" : "year-card"} key={item.year}>
              <div className="year-card-title"><span>{item.latest ? "最新年度" : "历史归档"}</span><strong>{item.year}</strong></div>
              <div className="year-total"><span>录取记录</span><strong>{item.total}<small> 人</small></strong></div>
              <dl>
                <div><dt>学硕</dt><dd>{item.academic}</dd></div>
                <div><dt>专硕</dt><dd>{item.professional}</dd></div>
              </dl>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section comparison-section" id="comparison">
        <div className="section-heading compact">
          <div><p className="section-kicker">COMPARISON</p><h2>初试区间与记录规模</h2></div>
          <p>区间仅描述当年表内已录取记录，不等于复试线，也不能直接解释未录取考生情况。</p>
        </div>
        <div className="archive-table" role="table" aria-label="2024 至 2026 年录取数据对照">
          <div className="archive-table-row archive-table-head" role="row">
            <span role="columnheader">年度</span><span role="columnheader">录取记录</span><span role="columnheader">学硕记录</span><span role="columnheader">学硕初试区间</span><span role="columnheader">专硕记录</span><span role="columnheader">专硕初试区间</span>
          </div>
          {years.map((item) => (
            <div className="archive-table-row" role="row" key={item.year}>
              <strong role="cell">{item.year}</strong><span role="cell">{item.total}</span><span role="cell">{item.academic}</span><span role="cell">{item.academicRange}</span><span role="cell">{item.professional}</span><span role="cell">{item.professionalRange}</span>
            </div>
          ))}
        </div>
        <div className="comparison-caveat"><span>不要这样比较</span><p>不能用“2025 专硕最低 262”推出下一年 262 分可以录取。试题难度、招生类型、调剂和复试表现都在变化。</p></div>
      </section>

      <section className="data-method" id="method">
        <div className="data-method-inner">
          <div><p className="section-kicker">METHODOLOGY</p><h2>这张表是怎么来的</h2></div>
          <ol>
            <li><span>01</span><div><strong>有效记录</strong><p>仅统计姓名、初试和总成绩等核心字段完整的行，不公开姓名。</p></div></li>
            <li><span>02</span><div><strong>专项单列</strong><p>2026 表内为 48 条常规记录，数据报告另记 1 名退役大学生士兵计划考生。</p></div></li>
            <li><span>03</span><div><strong>来源优先级</strong><p>官方公告优先于学生整理；结构化录取表用于聚合，报告用于补充口径。</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section archive-download">
        <div><p className="section-kicker">FULL REPORT</p><h2>需要更细的数据？</h2><p>2026 完整报告还包含单科统计、总成绩分布、分数段录取率和毕业去向。</p></div>
        <a className="button button-dark" href="/downloads/sict-2026-data-report.pdf">下载 2026 数据报告 <span>↗</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}

