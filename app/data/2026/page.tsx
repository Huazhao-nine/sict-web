import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { ScoreBandReport, ScoreStatistics } from "./report-view";

export const metadata: Metadata = {
  title: "2026 年考研数据报告",
  description: "沈阳计算所 2026 年复试、拟录取、专业分布、分数段、成绩统计与毕业去向民间汇总。",
};

export const dynamic = "force-static";

const programs = [
  { name: "计算机系统结构", code: "081201", interviewed: 2, admitted: 1, rejected: 1, rate: "50.00%" },
  { name: "计算机软件与理论", code: "081202", interviewed: 10, admitted: 7, rejected: 3, rate: "70.00%" },
  { name: "计算机应用技术", code: "081203", interviewed: 18, admitted: 8, rejected: 10, rate: "44.44%" },
  { name: "计算机技术", code: "085404", interviewed: 72, admitted: 33, rejected: 39, rate: "45.83%" },
];

const outcomeYears = [
  {
    year: "2026",
    sample: 87,
    employment: 79,
    employmentRate: "90.8%",
    furtherStudy: 8,
    furtherStudyRate: "9.2%",
    highlights: ["百度 10", "京东 9", "华为 7", "美团 5", "快手 5"],
    note: "就业样本中，科技大厂 50 人，国央企、事业单位及公务员 20 人；这里只展示概览和人数较多的去向。",
  },
  {
    year: "2025",
    sample: 114,
    employment: 92,
    employmentRate: "80.7%",
    furtherStudy: 22,
    furtherStudyRate: "19.3%",
    highlights: ["国科大读博 9", "百度 6", "美团 5", "京东 5", "小米 4"],
    note: "2025 届包含非全日制样本。现有汇总未进一步拆分国央企、公务员等就业类别，因此不作推算。",
  },
];

export default function Report2026() {
  return (
    <main>
      <SiteHeader />
      <section className="report-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="report-hero-copy">
          <a href="/data">← 返回历年档案</a>
          <p className="eyebrow"><span>2026</span> ANNUAL DATA REPORT</p>
          <h1>2026 年<br />考研数据报告</h1>
          <p>基于一志愿复试名单与拟录取名单整理。<strong>先看总体竞争，再拆到学习方式、专业、分数段和成绩统计。</strong></p>
        </div>
        <div className="report-hero-ledger">
          <div><span>招录报告</span><strong>完整年度</strong></div>
          <div><span>更新日期</span><strong>2026.08.12</strong></div>
          <div><span>招录数据完整率</span><strong>100%<small>（报告口径）</small></strong></div>
        </div>
      </section>

      <nav className="subnav report-subnav" aria-label="2026 报告章节导航">
        <a href="#overview">总览</a><a href="#programs">专业</a><a href="#scores">分数段</a><a href="#statistics">成绩统计</a><a href="#outcomes">毕业去向</a><a href="#interpretation">如何解读</a><a href="/sources">来源说明 ↗</a>
      </nav>

      <section className="section report-overview" id="overview">
        <div className="report-title-row"><div><p className="section-kicker">01 · OVERVIEW</p><h2>招生规模与学习方式</h2></div><p><strong>总体录取率 48.04%，复录比约 2.08 : 1。</strong>材料中没有非全日制标注；总人数包含 1 名退役大学生士兵专项计划考生。</p></div>
        <div className="report-kpis">
          <article className="primary-kpi"><span>一志愿复试</span><strong>102<small> 人</small></strong><p>学硕 30 · 专硕 72</p></article>
          <article><span>全部拟录取</span><strong>49<small> 人</small></strong><p>学硕 16 · 专硕 33</p></article>
          <article><span>全日制拟录取</span><strong>49<small> 人</small></strong><p>含 1 名士兵专项计划</p></article>
          <article><span>非全日制拟录取</span><strong>0<small> 人</small></strong><p>现有材料未见非全标注</p></article>
        </div>
        <div className="cutoff-ledger">
          <div><span>学硕复试线</span><strong>265</strong><small>单科 35 / 53</small></div>
          <div><span>专硕复试线</span><strong>273</strong><small>单科 35 / 53</small></div>
          <p><b>总成绩：</b>初试 ÷ 5 × 50% ＋ 专业课笔试 × 20% ＋ 综合面试 × 20% ＋（听力＋口语）× 10%</p>
        </div>
      </section>

      <section className="report-dark-section" id="programs">
        <div className="report-dark-inner">
          <div className="report-title-row inverse"><div><p className="section-kicker">02 · PROGRAMS</p><h2>四个报考专业的复试结果</h2></div><p>三个学硕方向最终统一排序，因此下表更适合描述当年报考分布，不宜当成独立专业难度。</p></div>
          <div className="program-report-list">
            {programs.map((program, index) => (
              <article key={program.code}>
                <span className="program-order">{String(index + 1).padStart(2, "0")}</span>
                <div><small>{program.code}</small><h3>{program.name}</h3></div>
                <dl><div><dt>复试</dt><dd>{program.interviewed}</dd></div><div><dt>录取</dt><dd>{program.admitted}</dd></div><div><dt>未录取</dt><dd>{program.rejected}</dd></div></dl>
                <div className="rate-meter"><span style={{ width: program.rate }} /><strong>{program.rate}</strong></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section report-detail-section" id="scores">
        <div className="report-title-row"><div><p className="section-kicker">03 · SCORE BANDS</p><h2>分数段与学习方式</h2></div><p>切换总体、学硕和专硕，并按全部、全日制、非全日制查看；<strong>详细分数统计按原报告排除士兵计划。</strong></p></div>
        <ScoreBandReport />
      </section>

      <section className="section report-detail-section" id="statistics">
        <div className="report-title-row"><div><p className="section-kicker">04 · STATISTICS</p><h2>成绩统计按学习方式拆分</h2></div><p><strong>本年度没有非全日制样本。</strong>因此全部与全日制详细统计相同；非全日制切换页明确显示 0 条记录。</p></div>
        <ScoreStatistics />
      </section>

      <section className="report-outcomes" id="outcomes">
        <div className="report-outcomes-inner">
          <div className="report-title-row inverse"><div><p className="section-kicker">05 · OUTCOMES</p><h2>毕业去向概览</h2></div><p>只做年度概览，不公开个人记录和原始材料。<strong>2025、2026 使用相同版式，方便快速对照。</strong></p></div>
          <div className="outcome-disclaimer compact-outcome-disclaimer">
            <span>非官方 · 民间整理</span>
            <p>数据仅供了解大致去向，可能存在遗漏、归类误差或后续变化，<strong>不代表官方就业率、薪资水平或就业承诺。</strong></p>
            <Link href="/disclaimer">完整免责声明 →</Link>
          </div>
          <div className="outcome-year-grid">
            {outcomeYears.map((item) => (
              <article className="outcome-year-card" key={item.year}>
                <header><div><span>GRADUATE OUTCOMES</span><h3>{item.year} 届</h3></div><b>学生整理</b></header>
                <div className="outcome-year-kpis">
                  <div><span>统计样本</span><strong>{item.sample}<small> 人</small></strong></div>
                  <div><span>就业</span><strong>{item.employment}<small> 人</small></strong><p>{item.employmentRate}</p></div>
                  <div><span>读博 / 深造</span><strong>{item.furtherStudy}<small> 人</small></strong><p>{item.furtherStudyRate}</p></div>
                </div>
                <div className="outcome-year-highlights"><span>主要去向</span><ul>{item.highlights.map((entry) => <li key={entry}>{entry}</li>)}</ul></div>
                <p className="outcome-year-note">{item.note}</p>
              </article>
            ))}
          </div>
          <p className="outcome-note"><strong>阅读提示：</strong>两年的样本范围和分类粒度不同，只适合分别了解当届的大致去向，不宜直接比较就业质量。</p>
        </div>
      </section>

      <section className="interpretation-section" id="interpretation">
        <div className="interpretation-inner">
          <div><p className="section-kicker">06 · INTERPRETATION</p><h2>读完数据，应该带走什么</h2></div>
          <div className="interpretation-list">
            <article><span>01</span><div><h3>学硕方向不是三个封闭赛道</h3><p>系统结构、软件与理论、应用技术最终统一排序，单方向录取率只能描述当年分布。</p></div></article>
            <article><span>02</span><div><h3>专硕高分更稳，但不存在保证线</h3><p>本年度样本中 340 分以上表现相对稳定；这不是下一年度的录取承诺。</p></div></article>
            <article><span>03</span><div><h3>复试确实会改变结果</h3><p>总成绩中复试占 50%，低初试分考生存在逆转，高初试分也不能忽略复试准备。</p></div></article>
          </div>
        </div>
      </section>

      <section className="section report-source-card">
        <div><span>来源</span><h2>公开信息与学生整理</h2><p>招录部分来自公开名单的学生整理；毕业去向仅展示脱敏后的年度概览。相关内容均为<strong>非官方资料</strong>，可能存在遗漏或统计误差，请勿作为官方结论传播。</p></div>
        <div className="report-source-actions"><Link href="/sources">查看来源规则 →</Link><Link href="/experiences">阅读经验文章 →</Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
