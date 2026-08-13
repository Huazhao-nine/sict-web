import type { Metadata } from "next";
import Link from "./components/static-link";
import { PledgeButton } from "./components/pledge-button";
import { QQGroupLink, SiteFooter, SiteHeader } from "./components/site-shell";

export const metadata: Metadata = {
  title: "沈阳计算所报考指南｜2026 招生、初试与复试数据",
  description:
    "学生公益整理的中国科学院沈阳计算技术研究所报考指南，汇总招生专业、初试科目、复试规则与历年录取数据。",
};

export const dynamic = "force-static";

const scoreBands = [
  { label: "390+", interviewed: 1, admitted: 1 },
  { label: "380–389", interviewed: 3, admitted: 3 },
  { label: "370–379", interviewed: 2, admitted: 2 },
  { label: "360–369", interviewed: 5, admitted: 4 },
  { label: "350–359", interviewed: 7, admitted: 6 },
  { label: "340–349", interviewed: 8, admitted: 8 },
  { label: "330–339", interviewed: 11, admitted: 7 },
  { label: "320–329", interviewed: 12, admitted: 7 },
  { label: "310–319", interviewed: 4, admitted: 0 },
  { label: "300–309", interviewed: 11, admitted: 4 },
  { label: "290–299", interviewed: 13, admitted: 3 },
  { label: "280–289", interviewed: 9, admitted: 1 },
  { label: "270–279", interviewed: 11, admitted: 2 },
  { label: "260–269", interviewed: 4, admitted: 0 },
];

const experienceItems = [
  { year: "2026", title: "专硕复试全流程回忆", tag: "复试", slug: "2026-retest-recollection" },
  { year: "2025", title: "学硕 359 分复试经验", tag: "复试", slug: "2025-academic-retest-359" },
  { year: "2024", title: "沈计所复试流程回忆", tag: "复试", slug: "2024-retest-recollection" },
  { year: "2023", title: "初试 401 分备考经验", tag: "初试", slug: "2023-score-401" },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>2026</span> SICT ADMISSION GUIDE</p>
          <h1>
            沈阳计算所
            <br />
            <em>报考指南</em>
          </h1>
          <p className="hero-lead">
            从招生目录、初试科目到复试录取，把分散的信息整理成一张可以逐项核对的报考路线图。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#overview">
              开始了解 <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-ghost" href="/data/2026">
              阅读 2026 数据报告
            </a>
            <QQGroupLink className="button button-group">
              加入 2027 交流群 <span aria-hidden="true">↗</span>
            </QQGroupLink>
          </div>
          <p className="source-note">
            信息整理于 2026 年 6 月 · 请始终以研究所当年官方通知为准
          </p>
        </div>

        <aside className="snapshot" aria-label="2026 年招录数据快照">
          <div className="snapshot-head">
            <span>2026 数据快照</span>
            <span className="status-dot">资料已核对</span>
          </div>
          <div className="snapshot-primary">
            <span>一志愿复试</span>
            <strong>102<small> 人</small></strong>
            <p>学硕 30 · 专硕 72</p>
          </div>
          <div className="snapshot-stats">
            <div><span>拟录取</span><strong>49</strong><small>人</small></div>
            <div><span>总体录取率</span><strong>48.04</strong><small>%</small></div>
            <div><span>复录比</span><strong>2.08</strong><small>: 1</small></div>
          </div>
          <div className="snapshot-foot">
            <span>口径</span>
            <p>复试名单与拟录取名单；包含 1 名退役大学生士兵计划考生。</p>
          </div>
        </aside>

        <div className="hero-index" aria-hidden="true">01 / GUIDE</div>
      </section>

      <div className="notice-bar">
        <p><strong>阅读说明</strong> 本站由学生维护，不代表沈阳计算技术研究所官方立场。</p>
        <a href="#methodology">查看数据口径 →</a>
      </div>

      <section className="value-strip" aria-label="培养优势概览">
        <article><strong>A+</strong><span>国科大计算机学科评估</span><small>全国第四轮学科评估</small></article>
        <article><strong>3.3万+</strong><span>研一补助/年 · 北京</span><small>学生整理口径，含学费返还</small></article>
        <article><strong>免学费</strong><span>补助已含学费返还</span><small>具体发放以入学当年通知为准</small></article>
      </section>

      <section className="section" id="overview">
        <div className="section-heading">
          <div>
            <p className="section-kicker">01 · APPLY</p>
            <h2>报考前，先分清两条路径</h2>
          </div>
          <p>学硕与专硕采用不同的英语、数学科目，培养地点和招生类型也有区别。以下为 2026 年整理口径。</p>
        </div>

        <div className="program-grid">
          <article className="program-card academic">
            <div className="program-card-head">
              <div><span>学术型硕士</span><strong>ACADEMIC</strong></div>
              <b>0812</b>
            </div>
            <h3>计算机科学与技术</h3>
            <p>包含计算机系统结构、计算机软件与理论、计算机应用技术，三个方向统一排名。</p>
            <dl>
              <div><dt>统考计划</dt><dd>15 <small>人</small></dd></div>
              <div><dt>学习方式</dt><dd>全日制</dd></div>
              <div><dt>初试组合</dt><dd>11408</dd></div>
            </dl>
          </article>

          <article className="program-card professional">
            <div className="program-card-head">
              <div><span>专业型硕士</span><strong>PROFESSIONAL</strong></div>
              <b>085404</b>
            </div>
            <h3>计算机技术</h3>
            <p>计划包含全日制与非全日制。报考前请重点确认学习方式、培养要求及当年名额。</p>
            <dl>
              <div><dt>招生计划</dt><dd>55 <small>人</small></dd></div>
              <div><dt>全日制 / 非全</dt><dd>32 / 23</dd></div>
              <div><dt>初试组合</dt><dd>22408</dd></div>
            </dl>
          </article>
        </div>

        <div className="decision-note">
          <span>怎么选？</span>
          <p>先按英语、数学基础和培养方式筛选，再结合当年招生简章确认。不要只依据某一年的最低分做决定。</p>
        </div>
      </section>

      <section className="section subject-section" id="subjects">
        <div className="section-heading compact">
          <div>
            <p className="section-kicker">02 · EXAM</p>
            <h2>初试科目，一眼对照</h2>
          </div>
          <p>两类专业均考 408，主要差异在英语与数学。</p>
        </div>

        <div className="subject-table" role="table" aria-label="学硕和专硕初试科目对照">
          <div className="subject-row subject-header" role="row">
            <span role="columnheader">类型</span><span role="columnheader">政治</span><span role="columnheader">外语</span><span role="columnheader">数学</span><span role="columnheader">专业课</span>
          </div>
          <div className="subject-row" role="row">
            <strong role="cell"><i>01</i> 学硕</strong><span role="cell">101 思想政治理论</span><span role="cell"><b>201</b> 英语（一）</span><span role="cell"><b>301</b> 数学（一）</span><span role="cell"><b>408</b> 计算机学科专业基础</span>
          </div>
          <div className="subject-row" role="row">
            <strong role="cell"><i>02</i> 专硕</strong><span role="cell">101 思想政治理论</span><span role="cell"><b>204</b> 英语（二）</span><span role="cell"><b>302</b> 数学（二）</span><span role="cell"><b>408</b> 计算机学科专业基础</span>
          </div>
        </div>

        <div className="subject-tips">
          <div><span>01</span><p><strong>先看科目，不先看分数</strong>学硕与专硕试卷不同，裸分不适合直接横向比较。</p></div>
          <div><span>02</span><p><strong>408 是共同主线</strong>数据结构、组成原理、操作系统和计算机网络需要尽早形成复习闭环。</p></div>
          <div><span>03</span><p><strong>每年重新核对</strong>专业目录、名额与考试科目均以当年国科大招生系统为准。</p></div>
        </div>
      </section>

      <section className="data-section" id="data">
        <div className="data-inner">
          <div className="section-heading inverse">
            <div>
              <p className="section-kicker">03 · DATA</p>
              <h2>看见完整分布，<br />不迷信单个分数</h2>
            </div>
            <p>2026 年进入一志愿复试 102 人，拟录取 49 人。图表不含士兵计划，展示各初试分数段的复试与录取人数。</p>
          </div>

          <div className="data-summary">
            <article><span>学硕</span><strong>30 <small>进复试</small></strong><p>录取 16 人 · 录取率 53.33%</p></article>
            <article><span>专硕</span><strong>72 <small>进复试</small></strong><p>录取 33 人 · 录取率 45.83%</p></article>
            <article className="accent-stat"><span>全部</span><strong>49 <small>拟录取</small></strong><p>完整报告含单科、总成绩与专业拆分</p></article>
          </div>

          <article className="chart-card">
            <div className="chart-head">
              <div><span>2026 初试分数段</span><strong>复试 / 录取人数</strong></div>
              <div className="legend"><span><i className="interviewed" />复试</span><span><i className="admitted" />录取</span></div>
            </div>
            <div className="bar-chart" aria-label="2026 年各初试分数段复试及录取人数">
              {scoreBands.map((band) => (
                <div className="bar-group" key={band.label}>
                  <div className="bar-values"><span>{band.interviewed}</span><span>{band.admitted || "–"}</span></div>
                  <div className="bar-pair">
                    <i className="bar interviewed" style={{ height: `${Math.max(4, band.interviewed * 8)}px` }} />
                    <i className="bar admitted" style={{ height: `${Math.max(2, band.admitted * 8)}px` }} />
                  </div>
                  <small>{band.label}</small>
                </div>
              ))}
            </div>
            <p className="chart-caption">注：分数段数据不含专项计划；“录取”按拟录取名单统计。初试分数只是结果的一部分，复试仍会改变排序。</p>
          </article>
          <a className="data-archive-link" href="/data">
            <span><b>2024—2026</b> 打开历年录取数据档案</span><strong>查看三年对照 ↗</strong>
          </a>
        </div>
      </section>

      <section className="section reexam-section" id="reexam">
        <div className="section-heading">
          <div>
            <p className="section-kicker">04 · REEXAM</p>
            <h2>复试怎么考，成绩怎么算</h2>
          </div>
          <p>2026 年专业课笔试与面试共同计入总成绩。准备时应兼顾基础题、代码表达、项目梳理和英语输出。</p>
        </div>

        <div className="formula-card">
          <div className="formula-copy">
            <span>总成绩计算</span>
            <h3>初试折算 × 50%<br /><em>＋</em> 复试各环节 × 50%</h3>
            <p>初试成绩 ÷ 5 后参与加权。最终按总成绩排序，并经招生程序审核确定拟录取结果。</p>
          </div>
          <div className="formula-bars" aria-label="总成绩构成">
            <div className="formula-segment first"><span>初试折算</span><strong>50%</strong></div>
            <div className="formula-segment written"><span>专业课笔试</span><strong>20%</strong></div>
            <div className="formula-segment interview"><span>综合面试</span><strong>20%</strong></div>
            <div className="formula-segment english"><span>英语</span><strong>10%</strong></div>
          </div>
        </div>

        <div className="reexam-grid">
          <article>
            <div className="card-number">01</div>
            <h3>专业课笔试</h3>
            <p>2026 年整理口径：程序设计 40%、操作系统 40%、计算机网络 20%。</p>
            <span className="tag">建议用历年回忆题校准范围</span>
          </article>
          <article>
            <div className="card-number">02</div>
            <h3>综合面试</h3>
            <p>把简历上的课程、项目和技术选择讲清楚，准备追问，不把“做过”停留在功能描述。</p>
            <span className="tag">项目表达 + 专业基础</span>
          </article>
          <article>
            <div className="card-number">03</div>
            <h3>英语环节</h3>
            <p>2026 年回忆包括自我介绍、抽题回答和看图说话；形式可能随年度变化。</p>
            <span className="tag">短句准确优先于复杂表达</span>
          </article>
        </div>
      </section>

      <section className="life-section" id="life">
        <div className="life-inner">
          <div className="section-heading inverse">
            <div>
              <p className="section-kicker">05 · STUDY & LIFE</p>
              <h2>培养地点、住宿与补助</h2>
            </div>
            <p>以下来自 2026 年学生版报考指南，是了解在读生活的参考快照，不是研究所待遇承诺；入学前应再次核对。</p>
          </div>
          <div className="life-grid">
            <article><span>培养地点</span><h3>研一在国科大<br />研二回沈阳</h3><p>学生整理口径：全日制学硕研一在雁栖湖，全日制专硕研一在玉泉路，研二回到沈阳所内。</p></article>
            <article><span>实习安排</span><h3>是否实习，<br />需要和导师确认</h3><p>原指南描述所内氛围相对轻松，但能否外出实习取决于导师和课题安排，不宜提前作统一判断。</p></article>
            <article><span>住宿条件</span><h3>四人间<br />独立卫浴</h3><p>这是学生材料中的所内住宿描述，实际房型、床位与住宿政策可能随年度变化。</p></article>
            <article className="life-accent"><span>学生整理补助</span><h3>研一 2400<br />研二、研三 1800–3600</h3><p>单位为元/月，仅复述 2026 年指南记录。补助构成与金额可能因年度、课题组和考核情况变化。</p></article>
          </div>
        </div>
      </section>

      <section className="section experience-section">
        <div className="section-heading compact">
          <div>
            <p className="section-kicker">06 · EXPERIENCE</p>
            <h2>数据之外，看看亲历者怎么说</h2>
          </div>
          <p>经验内容用于理解流程和准备方法，不代替官方规则，也不代表所有考生都会遇到相同情况。</p>
        </div>
        <div className="experience-list">
          {experienceItems.map((item, index) => (
            <a href={`/experiences/${item.slug}`} key={item.slug}>
              <span className="experience-index">{String(index + 1).padStart(2, "0")}</span>
              <div><span>{item.year} · {item.tag}</span><h3>{item.title}</h3></div>
              <span className="experience-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <Link className="coming-soon" href="/experiences"><span>查看完整文章库</span><p>24 篇唯一资料均已转为网页全文，可直接在站内阅读。</p><strong>进入资料库 ↗</strong></Link>
      </section>

      <section className="community-section" id="community">
        <div className="community-grid" aria-hidden="true" />
        <div className="community-inner">
          <div className="community-copy">
            <p className="section-kicker">07 · COMMUNITY</p>
            <h2>网页解决共性问题，<br />群里交流具体情况</h2>
            <p>招生信息会变化，个人背景也各不相同。阅读完指南后，如果还有年份口径、复习安排或复试准备方面的问题，可以加入 2027 中科院沈计所考研群继续交流。</p>
          </div>
          <aside className="community-card">
            <span>QQ GROUP / 2027</span>
            <h3>2027 中科院<br />沈计所考研</h3>
            <p>交流信息、反馈勘误，也欢迎上岸同学分享新的经验材料。</p>
            <QQGroupLink className="community-button">
              加入 QQ 群 <strong aria-hidden="true">↗</strong>
            </QQGroupLink>
            <small>点击后将跳转到腾讯 QQ 加群页面</small>
          </aside>
        </div>
      </section>

      <section className="resources-section" id="resources">
        <div className="resources-inner">
          <div className="resources-copy">
            <p className="section-kicker">08 · SOURCES</p>
            <h2>核心资料，<br />都在站内阅读</h2>
            <p>指南、数据和经验文章统一使用网页呈现。重要决定仍请回到当年招生简章、复试通知和拟录取公告核对。</p>
          </div>
          <div className="resource-links">
            <a href="#overview">
              <span><i>WEB</i><b>报考指南</b><small>招生专业、考试科目、复试与培养说明</small></span><strong>阅读 ↗</strong>
            </a>
            <a href="/data/2026">
              <span><i>WEB</i><b>2026 数据报告</b><small>复试、录取、分数段与毕业去向</small></span><strong>阅读 ↗</strong>
            </a>
            <Link href="/experiences">
              <span><i>WEB</i><b>经验文章库</b><small>24 篇初试、复试与回忆题全文</small></span><strong>阅读 ↗</strong>
            </Link>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="methodology">
        <div className="section-heading compact">
          <div>
            <p className="section-kicker">READ BEFORE USE</p>
            <h2>关于口径与使用</h2>
          </div>
        </div>
        <div className="faq-list">
          <details open>
            <summary>本站是研究所官网吗？</summary>
            <p>不是。本站由学生基于公开信息与个人整理资料维护，与沈阳计算技术研究所官方无隶属关系。</p>
          </details>
          <details>
            <summary>为什么数据和当年计划人数可能不同？</summary>
            <p>招生计划、推免、专项计划、全日制与非全日制的统计口径不同。本站会在每张图表旁标注范围，最终以官方名单为准。</p>
          </details>
          <details>
            <summary>可以用某一年的最低分预测下一年吗？</summary>
            <p>不建议。分数线会受到试题难度、报考人数、招生名额和复试表现影响，应结合多个年度观察。</p>
          </details>
          <details>
            <summary>网站内容可以转载吗？</summary>
            <p>本站内容按 CC BY-NC-SA 4.0 协议开放，转载需要注明出处、不得商用，并以相同方式共享。完整边界请阅读 <Link className="inline-text-link" href="/disclaimer">免责声明</Link>。</p>
          </details>
        </div>
      </section>

      <section className="thanks-section" id="thanks">
        <div className="thanks-inner">
          <div className="thanks-heading">
            <p className="section-kicker">09 · ACKNOWLEDGEMENTS</p>
            <h2>感谢前人把路标留下</h2>
            <p>这个网站不是凭空出现的。数据、经验与页面组织都来自许多公开资料和热心分享，我们在此明确记录参考来源。</p>
          </div>
          <div className="thanks-list">
            <a href="https://iscas.cskaoyan.cn/" target="_blank" rel="noopener noreferrer">
              <span>01 / BROTHER SITE</span><div><h3>中科院软件所报考指南</h3><p>参考其一站式报考流程、交流群入口、经验分享和贡献致谢结构。</p></div><strong>访问网站 ↗</strong>
            </a>
            <a href="https://iie.cskaoyan.cn" target="_blank" rel="noopener noreferrer">
              <span>02 / BROTHER SITE</span><div><h3>信工所考研信息站</h3><p>参考其招生数据表达、文章阅读结构和信息分层方式。</p></div><strong>访问网站 ↗</strong>
            </a>
            <div className="thanks-contributors">
              <span>03 / CONTRIBUTORS</span><div><h3>历届考生与资料整理者</h3><p>感谢每一位记录初试方法、复试经历、回忆题目，以及参与录取数据整理和勘误的同学。</p></div><strong>薪火相传</strong>
            </div>
          </div>
          <p className="thanks-note">本站仅学习兄弟站的信息组织经验，沈计所的数据与文章均来自本项目资料并独立整理。一个人的经验有限，一群人的分享可以让后来者少走弯路。</p>
        </div>
      </section>

      <section className="pledge-section" aria-labelledby="pledge-title">
        <div>
          <p className="section-kicker">SICT PLEDGE</p>
          <h2 id="pledge-title">选择沈计，奔赴热爱</h2>
          <p>备考是自己的路，仪式感可以轻松一点。按下按钮，算是向未来的自己郑重报到。</p>
        </div>
        <PledgeButton />
      </section>

      <SiteFooter />
    </main>
  );
}
