import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export const metadata: Metadata = {
  title: "来源与免责声明",
  description: "沈计指南的数据来源层级、更新规则、隐私处理与免责声明。",
};

export const dynamic = "force-static";

export default function Sources() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero sources-page-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div>
          <p className="eyebrow"><span>SOURCE</span> TRACEABLE BY DEFAULT</p>
          <h1>来源清楚，<br /><em>结论才有边界</em></h1>
          <p>每一类内容都标明它来自官方公告、学生整理还是考生回忆。发生冲突时，按来源层级处理。</p>
        </div>
        <aside className="page-hero-note">
          <span>LAST REVIEWED</span><strong>2026.08</strong><p>涉及招生名额、考试科目和复试办法的内容，应在新年度通知发布后重新核对。</p>
        </aside>
      </section>

      <section className="section source-layers">
        <div className="section-heading compact">
          <div><p className="section-kicker">SOURCE LEVELS</p><h2>三层来源，优先级不同</h2></div>
          <p>越接近制度和录取结果的信息，越需要依赖官方原文；经验材料只承担解释和补充作用。</p>
        </div>
        <div className="source-layer-grid">
          <article><span>LEVEL 01</span><h2>官方信息</h2><p>国科大招生目录、研究所招生简章、复试方案、复试名单与拟录取公告。</p><strong>最高优先级</strong></article>
          <article><span>LEVEL 02</span><h2>学生整理</h2><p>2024—2026 录取数据、毕业去向概览和报考指南。用于聚合、对照和解释。</p><strong>需核对口径</strong></article>
          <article><span>LEVEL 03</span><h2>考生回忆</h2><p>初试方法、复试流程、笔试题目和面试感受。只代表特定年份与个人经历。</p><strong>不可当作规则</strong></article>
        </div>
      </section>

      <section className="source-downloads">
        <div className="source-downloads-inner">
          <div><p className="section-kicker">WEB EDITIONS</p><h2>核心整理材料已经转成网页</h2></div>
          <div className="source-document-list">
            <Link href="/"><span>01 / WEB</span><div><strong>沈阳计算技术研究所报考指南</strong><small>招生、初试、复试与培养信息</small></div><b>阅读 ↗</b></Link>
            <a href="/data/2026"><span>02 / WEB</span><div><strong>2026 考研数据报告</strong><small>复试、录取、分数段与毕业去向</small></div><b>阅读 ↗</b></a>
            <Link href="/experiences"><span>03 / WEB</span><div><strong>经验文章库</strong><small>24 篇唯一资料全文网页化</small></div><b>阅读 ↗</b></Link>
          </div>
        </div>
      </section>

      <section className="section privacy-section">
        <div><p className="section-kicker">PRIVACY</p><h2>公开页面怎么处理个人信息</h2></div>
        <div className="privacy-rules">
          <p><span>01</span><strong>默认不展示姓名</strong>数据页只发布汇总结果，不公开结构化录取表中的个人行。</p>
          <p><span>02</span><strong>不公开联系方式</strong>导师资料中的电话、邮箱和未经验证的主观评价不直接上站。</p>
          <p><span>03</span><strong>毕业去向只做概览</strong>页面仅展示脱敏后的年度汇总，不公开个人记录、原始明细或可识别个人的信息。</p>
          <p><span>04</span><strong>保留纠错空间</strong>学生整理可能存在遗漏或统计误差，后续应提供明确的勘误渠道。</p>
        </div>
      </section>

      <section className="brother-sites-section">
        <div className="brother-sites-inner">
          <div className="brother-sites-copy">
            <p className="section-kicker">BROTHER SITES</p>
            <h2>也看看兄弟研究所<br />怎样整理信息</h2>
            <p>本站参考它们的信息架构、数据表达和经验文章组织方式。不同研究所的招生政策相互独立，页面之间不混用分数、名额和复试结论。</p>
          </div>
          <div className="brother-site-links">
            <a href="https://iie.cskaoyan.cn" target="_blank" rel="noopener noreferrer">
              <span>IIE</span><div><strong>信工所考研信息站</strong><small>iie.cskaoyan.cn</small></div><b>访问 ↗</b>
            </a>
            <a href="https://iscas.cskaoyan.cn/" target="_blank" rel="noopener noreferrer">
              <span>ISCAS</span><div><strong>中科院软件所报考指南</strong><small>iscas.cskaoyan.cn</small></div><b>访问 ↗</b>
            </a>
          </div>
        </div>
      </section>

      <section className="disclaimer-block">
        <span>DISCLAIMER</span><div><h2>本站不是研究所官方网站</h2><p>本站与中国科学院沈阳计算技术研究所无隶属关系。内容仅用于学习、交流和经验分享，不提供录取承诺；涉及报考与录取的重要决定，请以研究所及中国科学院大学当年发布的信息为准。</p><Link className="disclaimer-more" href="/disclaimer">阅读完整免责声明 →</Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
