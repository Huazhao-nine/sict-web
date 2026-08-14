import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { ScoreWorkspace } from "./score-workspace";

const scoreSocialImage = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://sict.cskaoyan.cn"}/score-og.png`;

export const metadata: Metadata = {
  title: "2027 沈计考研登分",
  description: "沈阳计算所 2027 考研民间登分系统，登录后提交初试成绩与成绩证明，核验后匿名公开各科分数、总分与排名。",
  openGraph: {
    title: "沈计考研登分｜2027 成绩登记与匿名统计",
    description: "填写考生信息、初试成绩并上传成绩证明；核验后匿名公开各科分数、总分与排名。",
    images: [{ url: scoreSocialImage, width: 1200, height: 630, alt: "沈计考研登分：2027 成绩登记与匿名统计" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "沈计考研登分｜2027 成绩登记与匿名统计",
    description: "填写考生信息、初试成绩并上传成绩证明；核验后匿名公开各科分数、总分与排名。",
    images: [scoreSocialImage],
  },
};

export const dynamic = "force-static";

const principles = [
  {
    index: "01",
    title: "本人维护",
    text: "使用 QQ 登录识别本人，同一账号在 2027 年只维护一份登分记录。",
  },
  {
    index: "02",
    title: "隐私加密",
    text: "姓名、学校、准考证号与联系邮箱加密保存，公开页面不展示个人记录。",
  },
  {
    index: "03",
    title: "证明核验",
    text: "每份记录需附研招网成绩截图或 PDF，核验通过后只公开各科分数、总分与排名。",
  },
];

export default function ScorePage() {
  const qqClientId = process.env.NEXT_PUBLIC_SICT_QQ_CLIENT_ID?.trim();
  const qqCallbackUrl = process.env.NEXT_PUBLIC_SICT_QQ_CALLBACK_URL?.trim()
    || "https://flowerinfire.com/#/sict/auth/callback";
  const apiBaseUrl = (process.env.NEXT_PUBLIC_SICT_API_BASE_URL
    ?? "https://flowerinfire.com/api/sict").replace(/\/$/, "");

  return (
    <main className="score-page">
      <SiteHeader />

      <section className="score-hero">
        <div className="score-hero-grid" aria-hidden="true" />
        <div className="score-hero-copy">
          <p className="eyebrow"><span>2027</span> SICT SCORE REGISTRATION</p>
          <h1>考研登分</h1>
          <p>
            面向报考沈阳计算所的 2027 考生。登录后填写考生信息、四科成绩并上传成绩证明，
            <strong>核验后只公开各科分数、总分与排名</strong>。
          </p>
          <div className="score-hero-badges" aria-label="登分系统特点">
            <span>QQ 身份</span>
            <span>成绩证明</span>
            <span>隐私加密</span>
          </div>
        </div>

        <aside className="score-launch-state" aria-label="登分开放状态">
          <span className="score-state-label">当前状态</span>
          <strong>2027 登分开放</strong>
          <p>初试成绩可以提交和更新；每个 QQ 身份同一年只保留一条记录。</p>
          <dl>
            <div><dt>身份登录</dt><dd>QQ 登录</dd></div>
            <div><dt>提交状态</dt><dd>等待核验</dd></div>
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
            <h2>提交你的 2027 初试成绩</h2>
          </div>
          <p>
            请准备好<strong>姓名、本科院校、准考证号、四科成绩和研招网成绩截图</strong>。首次提交必须上传证明，之后可以登录更新。
          </p>
        </div>

        <ScoreWorkspace
          apiBaseUrl={apiBaseUrl}
          qqCallbackUrl={qqCallbackUrl}
          qqClientId={qqClientId ?? null}
        />
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
              <div><h3>一个账号，一年一份</h3><p>同一 QQ 身份和同一准考证号在 2027 年只能对应一条记录；重新提交会更新原记录。</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h3>只为核验收集必要信息</h3><p>姓名、学校、准考证号与成绩证明仅用于核验和去重；公开榜单只包含各科分数、总分与排名。</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h3>证明文件不公开访问</h3><p>成绩截图与 PDF 保存在静态网站目录之外，文件名随机生成，不提供公开下载地址。</p></div>
            </article>
            <article>
              <span>04</span>
              <div><h3>样本不是官方排名</h3><p>登分具有自愿性和不完全性，只能观察本站样本，不能替代官方成绩、排名、复试线或录取结果。</p></div>
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
