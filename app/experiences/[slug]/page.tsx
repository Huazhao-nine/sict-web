import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { articleBlocks, experienceArticles, findExperience } from "../../content/experiences";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";

export function generateStaticParams() {
  return experienceArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = findExperience((await params).slug);
  return article
    ? { title: article.title, description: article.summary }
    : { title: "文章未找到" };
}

export default async function ExperienceArticlePage({ params }: ArticlePageProps) {
  const article = findExperience((await params).slug);
  if (!article) notFound();

  const blocks = articleBlocks(article);
  const headings = blocks.filter((block): block is Extract<typeof block, { type: "heading" }> => block.type === "heading").slice(0, 12);
  const currentIndex = experienceArticles.findIndex((item) => item.slug === article.slug);
  const previous = experienceArticles[currentIndex - 1];
  const next = experienceArticles[currentIndex + 1];

  return (
    <main>
      <SiteHeader />
      <header className="article-hero">
        <div className="article-hero-inner">
          <Link href="/experiences">← 返回经验文章库</Link>
          <p className="eyebrow"><span>{article.year}</span> {article.category.toUpperCase()} / EXPERIENCE</p>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          <dl>
            <div><dt>年份</dt><dd>{article.year}</dd></div>
            <div><dt>类型</dt><dd>{article.category}</dd></div>
            <div><dt>阅读方式</dt><dd>站内全文</dd></div>
          </dl>
        </div>
      </header>

      <div className="article-layout">
        <aside className="article-toc">
          <span>本文目录</span>
          {headings.length ? (
            <nav>{headings.map((heading) => <a href={`#${heading.id}`} key={heading.id}>{heading.text}</a>)}</nav>
          ) : <p>原始材料未设置分节，可直接顺序阅读。</p>}
          <Link className="article-toc-back" href="/experiences">查看全部 24 篇 →</Link>
        </aside>

        <article className="article-prose">
          <div className="article-notice">
            <strong>阅读边界</strong>
            <p>本文由考生个人材料转写。时间、流程和题目均可能变化；试题类内容属于回忆整理，不等同于官方试卷。</p>
          </div>
          {blocks.map((block, index) => {
            if (block.type === "heading") return <h2 id={block.id} key={`${block.id}-${index}`}>{block.text}</h2>;
            if (block.type === "list") return <ul key={`list-${index}`}>{block.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}</ul>;
            return <p key={`paragraph-${index}`}>{block.text}</p>;
          })}
          <footer className="article-source">
            <span>原始资料</span>
            <strong>{article.sourceFile}</strong>
            <p>原文件仅作为站内转写依据，不再提供公开下载。网页内容尽量忠实保留原文，仅处理换行、目录与阅读版式。</p>
          </footer>
        </article>
      </div>

      <nav className="article-pagination" aria-label="相邻文章">
        {previous ? <a href={`/experiences/${previous.slug}`}><span>上一篇</span><strong>{previous.title}</strong></a> : <span />}
        {next ? <a href={`/experiences/${next.slug}`}><span>下一篇</span><strong>{next.title}</strong></a> : <Link href="/experiences"><span>返回</span><strong>经验文章库</strong></Link>}
      </nav>
      <SiteFooter />
    </main>
  );
}
