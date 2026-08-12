import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import type { HistoricalReport } from "./history-data";
import { HistoricalScoreBands, HistoricalStatistics } from "./history-report-view";

function percent(value: number) {
  return `${value.toFixed(2)}%`;
}

export function HistoricalReportPage({ report }: { report: HistoricalReport }) {
  const { combined, academic, professional } = report.programs;
  const fullTime = report.studyModes.fullTime;
  const partTime = report.studyModes.partTime;
  const ratio = combined.interviewed / combined.admitted;
  const programRows = [
    { name: "学术学位", code: "学硕", ...academic, fullTime: fullTime.academic.admitted, partTime: partTime.academic.admitted },
    { name: "专业学位", code: "专硕", ...professional, fullTime: fullTime.professional.admitted, partTime: partTime.professional.admitted },
  ];

  return (
    <main>
      <SiteHeader />
      <section className="report-hero historical-report-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="report-hero-copy">
          <a href="/data">← 返回历年档案</a>
          <p className="eyebrow"><span>{report.year}</span> ADMISSION DATA REPORT</p>
          <h1>{report.year} 年<br />考研数据报告</h1>
          <p>从复试与录取表逐行整理，不再只展示最低分和录取人数。<strong>页面保留学硕、专硕、学习方式、分数段和成绩统计的真实口径。</strong></p>
        </div>
        <div className="report-hero-ledger">
          <div><span>报告状态</span><strong>完整表格整理</strong></div>
          <div><span>网页整理</span><strong>{report.updatedAt}</strong></div>
          <div><span>覆盖字段</span><strong>初试 · 复试 · 总成绩<small>不公开姓名</small></strong></div>
        </div>
      </section>

      <nav className="subnav report-subnav" aria-label={`${report.year} 报告章节导航`}>
        <a href="#overview">总览</a><a href="#programs">类别</a><a href="#scores">分数段</a><a href="#statistics">成绩统计</a><a href="#markers">备注口径</a><a href="#interpretation">如何解读</a><a href="/sources">来源说明 ↗</a>
      </nav>

      <section className="section report-overview" id="overview">
        <div className="report-title-row"><div><p className="section-kicker">01 · OVERVIEW</p><h2>招生规模与学习方式</h2></div><p><strong>复试名单没有单列学习方式。</strong>拟录取记录按备注拆为全日制与非全日制，专项和士兵等非“非全”标注归入全日制口径。</p></div>
        <div className="report-kpis">
          <article className="primary-kpi"><span>进入复试</span><strong>{combined.interviewed}<small> 人</small></strong><p>学硕 {academic.interviewed} · 专硕 {professional.interviewed}</p></article>
          <article><span>全部拟录取</span><strong>{combined.admitted}<small> 人</small></strong><p>占复试名单 {combined.rate.toFixed(2)}%</p></article>
          <article><span>全日制拟录取</span><strong>{fullTime.combined.admitted}<small> 人</small></strong><p>学硕 {fullTime.academic.admitted} · 专硕 {fullTime.professional.admitted}</p></article>
          <article><span>非全日制拟录取</span><strong>{partTime.combined.admitted}<small> 人</small></strong><p>学硕 {partTime.academic.admitted} · 专硕 {partTime.professional.admitted}</p></article>
        </div>
        <div className="cutoff-ledger historical-ledger">
          <div><span>全日制拟录取初试</span><strong>{fullTime.combined.initial?.min}–{fullTime.combined.initial?.max}</strong><small>{fullTime.combined.admitted} 条记录</small></div>
          <div><span>非全日制拟录取初试</span><strong>{partTime.combined.initial?.min}–{partTime.combined.initial?.max}</strong><small>{partTime.combined.admitted} 条记录</small></div>
          <p><b>总体复录比：{ratio.toFixed(2)} : 1。</b>学习方式仅能按拟录取备注拆分，<strong>不能据此构造两套复试人数或独立录取率。</strong></p>
        </div>
      </section>

      <section className="report-dark-section" id="programs">
        <div className="report-dark-inner">
          <div className="report-title-row inverse"><div><p className="section-kicker">02 · PROGRAM TYPES</p><h2>学硕、专硕与学习方式</h2></div><p><strong>全日制与非全日制人数来自拟录取备注。</strong>原始表未提供可稳定核验的具体方向字段，因此不继续拆分专业名称。</p></div>
          <div className="program-report-list historical-program-list">
            {programRows.map((program, index) => (
              <article key={program.code}>
                <span className="program-order">{String(index + 1).padStart(2, "0")}</span>
                <div><small>{program.code}</small><h3>{program.name}</h3></div>
                <dl><div><dt>复试</dt><dd>{program.interviewed}</dd></div><div><dt>全日制</dt><dd>{program.fullTime}</dd></div><div><dt>非全日制</dt><dd>{program.partTime}</dd></div><div><dt>录取合计</dt><dd>{program.admitted}</dd></div></dl>
                <div className="rate-meter"><span style={{ width: percent(program.rate) }} /><strong>{percent(program.rate)}</strong></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section report-detail-section" id="scores">
        <div className="report-title-row"><div><p className="section-kicker">03 · SCORE BANDS</p><h2>分数段按学习方式拆分</h2></div><p><strong>“全部”保留复试与录取对照。</strong>切换全日制或非全日制后，查看对应拟录取记录在各初试分数段的分布。</p></div>
        <HistoricalScoreBands report={report} />
      </section>

      <section className="section report-detail-section" id="statistics">
        <div className="report-title-row"><div><p className="section-kicker">04 · STATISTICS</p><h2>初试、复试与总成绩</h2></div><p>原始表没有单科字段，因此只展示能够逐行核验的三类成绩；平均和中位数均按拟录取记录计算。</p></div>
        <HistoricalStatistics report={report} />
      </section>

      <section className="report-outcomes historical-markers" id="markers">
        <div className="report-outcomes-inner">
          <div className="report-title-row inverse"><div><p className="section-kicker">05 · DATA MARKERS</p><h2>拟录取备注口径</h2></div><p>备注分类用于提醒不同录取路径，不能据此推断未公开的培养方式、名额来源或后续政策。</p></div>
          <div className="marker-grid">
            {report.markers.map((marker) => <article key={marker.label}><span>{marker.label}</span><strong>{marker.count}<small> 人</small></strong><p>{marker.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className="interpretation-section" id="interpretation">
        <div className="interpretation-inner">
          <div><p className="section-kicker">06 · INTERPRETATION</p><h2>这组数据怎么读</h2></div>
          <div className="interpretation-list">
            {report.interpretation.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section report-source-card">
        <div><span>来源</span><h2>沈计 24–26 录取表（初试分排序修正）</h2><p>网页仅发布聚合统计，不公开姓名。该表为学生基于公开名单整理的非官方材料，可能存在录入、分类或统计误差，请以当年官方通知为准。</p></div>
        <div className="report-source-actions"><Link href="/sources">查看来源规则 →</Link><Link href="/data">返回三年对照 →</Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
