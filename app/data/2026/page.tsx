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

const outcomeCategories2026 = [
  { name: "互联网 / 科技大厂", count: 50, share: "57.5%", className: "technology" },
  { name: "国央企 / 事业单位 / 公务员", count: 20, share: "23.0%", className: "institutional" },
  { name: "中小厂 / 初创 / 其他企业", count: 9, share: "10.3%", className: "other" },
  { name: "读博 / 深造", count: 8, share: "9.2%", className: "education" },
];

const technologyOutcomes2026 = [
  { name: "百度", count: 10 }, { name: "京东", count: 9 }, { name: "华为系", count: 7 },
  { name: "美团", count: 5 }, { name: "快手", count: 5 }, { name: "字节跳动", count: 3 },
  { name: "好未来", count: 3 }, { name: "小红书", count: 2 }, { name: "小米", count: 2 },
  { name: "腾讯", count: 1 }, { name: "滴滴", count: 1 }, { name: "微软", count: 1 }, { name: "广联达", count: 1 },
];

const institutionalOutcomes2026 = [
  { name: "金融国央企", detail: "人保财险、农发行、工行、中行", count: 4 },
  { name: "党政机关", detail: "组织部、海关、税务系统等", count: 4 },
  { name: "中国科学院沈阳计算技术研究所有限公司", detail: "报告归类为院所转制单位", count: 3 },
  { name: "电力科研体系", detail: "中国电科院、北京科东", count: 2 },
  { name: "其他央国企与科研事业单位", detail: "自动化所、航天、航空、电网、重工及研究机构等", count: 7 },
];

const educationOutcomes2026 = [
  { name: "中国科学院大学相关培养单位", detail: "沈阳计算所、自动化所", count: 2 },
  { name: "高校深造", detail: "北大、复旦、南大、哈工大、北理工、东北大学", count: 6 },
];

const otherOutcomes2026 = [
  { name: "北京中科瑞通信息科技有限公司", detail: "报告归类为大数据 / NLP", count: 3 },
  { name: "上海思格源智能科技有限公司", detail: "报告归类为 AI + 储能", count: 1 },
  { name: "中科智禾数字科技（北京）有限公司", detail: "报告归类为教育 AI", count: 1 },
  { name: "其余名称待核企业", detail: "4 家单位存在疑似笔误，网页不作主体推断", count: 4 },
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
          <div className="report-title-row inverse"><div><p className="section-kicker">05 · OUTCOMES</p><h2>2026 届毕业去向民间汇总</h2></div><p>分析报告纳入 <strong>87 人</strong>，按集团归并并分为四类。这里只展示脱敏后的单位级聚合，不公开个人记录，也不提供内部文件下载。</p></div>
          <div className="outcome-disclaimer">
            <span>非官方 · 民间统计</span>
            <p><strong>本组数据来自学生内部汇总及其二次分析，并非研究所官方就业质量报告。</strong>它可能存在漏报、重复、归类偏差、单位名称笔误或后续去向变化，仅用于了解样本结构，不代表官方毕业人数、就业率、薪酬水平或就业承诺，也请勿据此识别个人。</p>
            <Link href="/disclaimer">阅读完整免责声明 →</Link>
          </div>
          <div className="outcome-kpis">
            <article><span>分析样本</span><strong>87<small> 人</small></strong><p>分类人数与比例均以此为分母</p></article>
            <article><span>报告标注</span><strong>56<small> 条</small></strong><p>去向记录，不区分城市、按集团合并</p></article>
            <article className="outcome-conflict-kpi"><span>原图合计栏</span><strong>116<small> 人</small></strong><p>与逐项合计相差 29 人，原因不明</p></article>
          </div>
          <div className="outcome-discrepancy">
            <span>口径冲突</span>
            <p><strong>原始截图底部标注 116 人，但分析报告逐项分类仅合计 87 人。</strong>两者相差 29 人，现有材料无法解释。所以下方比例只描述报告纳入的 87 人样本，<b>不能把 87 或 116 当作经核实的官方届别总人数。</b></p>
          </div>

          <div className="outcome-category-grid" aria-label="2026 届毕业去向样本分类">
            {outcomeCategories2026.map((item) => <article key={item.name}><span>{item.name}</span><strong>{item.count}<small> 人</small></strong><p>{item.share}</p></article>)}
          </div>
          <div className="outcome-composition" aria-label="2026 届毕业去向样本分类占比">
            {outcomeCategories2026.map((item) => <span className={item.className} style={{ width: item.share }} key={item.name}><b>{item.share}</b></span>)}
          </div>

          <div className="outcome-columns outcome-main-detail">
            <article><span>互联网 / 科技大厂 · 按集团归并</span><ol>{technologyOutcomes2026.map((item) => <li key={item.name}><b>{item.name}</b><strong>{item.count}</strong></li>)}</ol></article>
            <article className="outcome-boundaries"><span>可以得出的中性观察</span><div><p><b>头部集团较集中</b>百度、京东、华为、美团、快手合计 36 人，占 87 人样本的 41.4%，占大厂分类的 72%。</p><p><b>去向类型多元</b>样本同时包括科技企业、国央企及事业单位、深造和其他企业。</p><p><b>不能评价“就业质量”</b>材料没有岗位、薪酬、工作地点、满意度或未就业样本，不能据此判断个体就业结果。</p></div></article>
          </div>

          <div className="outcome-detail-grid">
            <article><div><span>国央企 / 事业单位 / 公务员</span><strong>20<small> 人</small></strong></div><ol>{institutionalOutcomes2026.map((item) => <li key={item.name}><p><b>{item.name}</b><small>{item.detail}</small></p><strong>{item.count}</strong></li>)}</ol></article>
            <article><div><span>读博 / 深造</span><strong>8<small> 人</small></strong></div><ol>{educationOutcomes2026.map((item) => <li key={item.name}><p><b>{item.name}</b><small>{item.detail}</small></p><strong>{item.count}</strong></li>)}</ol></article>
            <article><div><span>中小厂 / 初创 / 其他企业</span><strong>9<small> 人</small></strong></div><ol>{otherOutcomes2026.map((item) => <li key={item.name}><p><b>{item.name}</b><small>{item.detail}</small></p><strong>{item.count}</strong></li>)}</ol></article>
          </div>
          <p className="outcome-note"><strong>归并说明：</strong>百度、京东、华为等关联主体按集团合并；高校按深造统计，科研院所就业按报告分类统计。部分小微企业名称疑有笔误，网页不继续猜测或公开未经核实的主体名称。</p>

          <div className="outcome-archive-divider" />
          <div className="report-title-row inverse outcome-archive-title"><div><p className="section-kicker">2025 · ARCHIVE</p><h2>2025 届毕业去向概览</h2></div><p>共整理 114 条去向记录，包含非全日制。页面仅展示汇总结果，不公开个人记录。</p></div>
          <div className="outcome-kpis">
            <article><span>去向记录</span><strong>114<small> 条</small></strong><p>报告统计样本</p></article>
            <article><span>就业</span><strong>92<small> 人</small></strong><p>约占 80.7%</p></article>
            <article><span>继续读博</span><strong>22<small> 人</small></strong><p>约占 19.3%</p></article>
          </div>
          <div className="outcome-columns">
            <article><span>主要城市</span><ol><li><b>北京</b><strong>46</strong></li><li><b>上海</b><strong>13</strong></li><li><b>沈阳</b><strong>11</strong></li><li><b>深圳</b><strong>5</strong></li><li><b>重庆</b><strong>3</strong></li></ol></article>
            <article><span>人数较多的去向</span><ol><li><b>中国科学院大学（读博）</b><strong>9</strong></li><li><b>百度</b><strong>6</strong></li><li><b>美团</b><strong>5</strong></li><li><b>京东</b><strong>5</strong></li><li><b>北京小米</b><strong>4</strong></li></ol></article>
          </div>
          <p className="outcome-note">这组数据描述 2025 届已整理样本，不代表就业承诺，也不用于评价某一培养方向。单位名称按报告汇总口径简写。</p>
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
        <div><span>来源</span><h2>招生报告与学生去向汇总</h2><p>招录部分来自学生基于公开名单整理的《2026 年沈阳计算技术研究所考研数据报告 2.0》；毕业去向来自学生内部汇总及二次分析报告。两者均为<strong>非官方材料</strong>。内部文件仅用于核对，未上传网站或 GitHub；公开页面只保留脱敏聚合结果。</p></div>
        <div className="report-source-actions"><Link href="/sources">查看来源规则 →</Link><Link href="/experiences">阅读经验文章 →</Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
