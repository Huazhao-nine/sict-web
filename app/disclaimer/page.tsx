import type { Metadata } from "next";
import Link from "next/link";
import { QQGroupLink, SiteFooter, SiteHeader } from "../components/site-shell";

export const metadata: Metadata = {
  title: "免责声明",
  description: "沈计指南的非官方性质、公益原则、内容边界、外部链接与版权说明。",
};

export const dynamic = "force-static";

const sections = [
  {
    number: "01",
    title: "非官方性质",
    content: <p>本指南（含配套交流群、经验文章、复试回忆和数据报告）由历届考生及热心网友志愿整理、公益维护，与<strong>中国科学院沈阳计算技术研究所</strong>无任何隶属、授权、合作或关联关系，也不是研究所或其研究生招生部门的官方渠道。研究所名称仅用于指称报考对象，不代表任何官方背书。</p>,
  },
  {
    number: "02",
    title: "非盈利声明",
    content: <p>本站是纯公益项目，不以任何形式盈利，不接受商业赞助，不设置付费内容，也不承诺任何录取结果。指南、数据汇总与经验文章均免费提供阅读。</p>,
  },
  {
    number: "03",
    title: "内容仅供参考",
    content: <ul><li>分数线、报录数据、招生名额和复试安排整理自公开渠道与考生资料，可能随时间变化或存在误差，请以官方最新信息为准。</li><li><strong>毕业去向来自学生内部《就业去向分析报告》，属于非官方、民间统计。</strong>数据可能存在漏报、重复、归类偏差、单位名称笔误或后续变动，不代表官方毕业人数、就业质量报告、就业率、薪酬水平或就业承诺；本站仅公开科技大厂、国央企及公务员、读博深造三类脱敏汇总，不公开其他企业明细、个人记录或内部原始材料。</li><li>经验文章只代表分享者在特定年份的个人经历，不构成报考建议、结果承诺或录取保证。</li><li>培养地点、住宿、补助、实习和导师相关信息可能调整，入学与选择导师前请重新确认。</li><li>复试题目均为考生回忆或二次整理，不是官方试卷，也不用于预测下一年度命题。</li></ul>,
  },
  {
    number: "04",
    title: "外部链接与群聊",
    content: <p>本站会链接官方页面、兄弟研究所信息站、腾讯 QQ 群等外部服务。外部页面的内容、可用性、隐私与安全由相应提供方负责；本站无法保证其持续有效，也不对群内个人言论负责。</p>,
  },
  {
    number: "05",
    title: "版权与转载",
    content: <p>除另有说明的第三方材料外，本站原创整理内容采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a> 许可：转载需要注明来源、不得用于商业用途，并以相同许可方式共享。经验原文的权利仍归原作者所有。</p>,
  },
  {
    number: "06",
    title: "更正与反馈",
    content: <p>如果发现数据错误、内容遗漏、来源标注不清，或希望撤下个人经验材料，请通过 2027 考研交流群联系维护者。我们会保留勘误空间，并优先处理涉及个人信息和事实准确性的问题。</p>,
  },
];

export default function DisclaimerPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero disclaimer-page-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div>
          <p className="eyebrow"><span>NOTICE</span> READ BEFORE USE</p>
          <h1>信息有价值，<br /><em>也有边界</em></h1>
          <p>这是一份由考生共同维护的公益指南。使用网站前，请了解非官方性质、信息时效、转载规则与反馈方式。</p>
        </div>
        <aside className="page-hero-note">
          <span>CORE PRINCIPLE</span><strong>不盈利 · 不背书 · 不承诺录取</strong><p>遇到网站内容与官方通知冲突时，无条件以当年官方发布的信息为准。</p>
        </aside>
      </section>

      <nav className="subnav" aria-label="免责声明导航">
        {sections.map((section) => <a href={`#notice-${section.number}`} key={section.number}>{section.number}</a>)}
        <Link href="/sources">查看来源规则</Link>
      </nav>

      <section className="section disclaimer-intro">
        <div><p className="section-kicker">PUBLIC INTEREST PROJECT</p><h2>学生公益整理，不是招生咨询渠道</h2></div>
        <p>本站希望降低信息差，但不能替代招生简章、复试通知、拟录取公告和研究所老师的正式答复。请把它当作检索与理解资料的起点。</p>
      </section>

      <section className="section disclaimer-sections">
        {sections.map((section) => (
          <article id={`notice-${section.number}`} key={section.number}>
            <span>{section.number}</span>
            <h2>{section.title}</h2>
            <div>{section.content}</div>
          </article>
        ))}
      </section>

      <section className="disclaimer-contact">
        <div><p className="section-kicker">CORRECTION & FEEDBACK</p><h2>发现问题，欢迎指出</h2><p>反馈时请附上页面、具体内容和可核对的来源，方便维护者快速勘误。</p></div>
        <QQGroupLink className="community-button">加入 2027 交流群 <strong aria-hidden="true">↗</strong></QQGroupLink>
      </section>
      <SiteFooter />
    </main>
  );
}
