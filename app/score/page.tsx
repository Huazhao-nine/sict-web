import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { ScoreWorkspace } from "./score-workspace";

export const metadata: Metadata = {
  title: "2027 沈计登分",
  description: "沈阳计算所考研民间登分入口，采用独立账号流程，审核后仅公开匿名样本统计。",
};

export const dynamic = "force-static";

const principles = [
  {
    index: "01",
    title: "账号独立",
    text: "使用沈计专用登录状态，不读取博客资料，也不共享博客页面权限。",
  },
  {
    index: "02",
    title: "公开匿名",
    text: "昵称、头像和邮箱不进入公开榜单；网页只展示审核后的样本统计。",
  },
  {
    index: "03",
    title: "人工审核",
    text: "提交后先进入待审核队列，异常、重复或不完整记录不会计入统计。",
  },
];

export default function ScorePage() {
  const qqAuthUrl = process.env.NEXT_PUBLIC_SICT_QQ_AUTH_URL?.trim() || null;

  return (
    <main className="score-page">
      <SiteHeader />

      <section className="score-hero">
        <div className="score-hero-grid" aria-hidden="true" />
        <div className="score-hero-copy">
          <p className="eyebrow"><span>2027</span> COMMUNITY SCORE REPORT</p>
          <h1>沈计登分</h1>
          <p>
            登录后登记初试成绩，复试阶段继续补充结果。所有数据先审核、再统计，
            <strong>不公开个人身份和单条完整记录</strong>。
          </p>
          <div className="score-hero-badges" aria-label="登分系统特点">
            <span>QQ 身份</span>
            <span>邮箱验证</span>
            <span>匿名统计</span>
          </div>
        </div>

        <aside className="score-launch-state" aria-label="登分开放状态">
          <span className="score-state-label">当前状态</span>
          <strong>前端预览</strong>
          <p>独立后端尚未接入，真实登录、验证码和提交暂不开放。</p>
          <dl>
            <div><dt>数据上传</dt><dd>关闭</dd></div>
            <div><dt>本地预览</dt><dd>可用</dd></div>
          </dl>
        </aside>
      </section>

      <div className="score-notice">
        <p><strong>非官方说明</strong> 本系统由学生维护，样本数据不代表研究所官方排名、复试线或录取结果。</p>
        <a href="#score-rules">查看登分规则 ↓</a>
      </div>

      <section className="score-principles" aria-label="登分系统原则">
        {principles.map((principle) => (
          <article key={principle.index}>
            <span>{principle.index}</span>
            <div>
              <h2>{principle.title}</h2>
              <p>{principle.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="score-workspace-section" id="score-entry">
        <div className="score-section-heading">
          <div>
            <p className="section-kicker">SCORE · WORKSPACE</p>
            <h2>从身份确认到成绩登记</h2>
          </div>
          <p>
            这一版只在当前浏览器中演示交互，<strong>不会调用博客接口，也不会保存或上传你填写的内容</strong>。
          </p>
        </div>

        <ScoreWorkspace qqAuthUrl={qqAuthUrl} />
      </section>

      <section className="score-rules-section" id="score-rules">
        <div className="score-rules-inner">
          <header>
            <p className="section-kicker">RULES · PRIVACY</p>
            <h2>提交前，请先了解边界</h2>
          </header>
          <div className="score-rule-list">
            <article>
              <span>01</span>
              <div><h3>一个账号，一年一份</h3><p>同一账号在同一考试年度只维护一条记录，后续通过登录补充复试与录取状态。</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h3>不收集准考证与截图</h3><p>不要求姓名、准考证号、学校和成绩截图，减少不必要的个人信息留存。</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h3>小样本不做细分</h3><p>分组样本不足时不公开最低分、位次等细节，避免通过成绩组合定位个人。</p></div>
            </article>
            <article>
              <span>04</span>
              <div><h3>样本不是官方排名</h3><p>登分具有自愿性和不完全性，只能观察本站样本，不能用于预测官方结果。</p></div>
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
