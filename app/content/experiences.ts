import generatedArticles from "./experiences.generated.json";

export type ExperienceArticle = {
  slug: string;
  title: string;
  year: string;
  category: "初试" | "复试" | "试题" | "综合";
  sourceFile: string;
  summary: string;
  body: string;
};

export type ArticleBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export const experienceArticles = generatedArticles as ExperienceArticle[];

const chineseNumber = "一二三四五六七八九十";
const shortSectionNames = new Set([
  "写在前面", "个人情况简介", "个人介绍", "初试部分", "复试部分", "初试", "复试",
  "政治", "英语", "数学", "专业课", "英语准备", "笔试", "英语面试", "中文面试",
  "综合面试", "专业面试", "基础阶段", "强化阶段", "冲刺阶段", "复试准备", "复试流程",
  "一些感悟", "致谢", "总结", "数据结构", "程序设计", "操作系统", "计算机网络", "计组",
]);

function isHeading(line: string) {
  const value = line.trim();
  if (!value || value.length > 48) return false;
  if (shortSectionNames.has(value.replace(/[：:！!]/g, ""))) return true;
  if (new RegExp(`^[${chineseNumber}]+[、.．]\\s*`).test(value)) return true;
  if (/^第[一二三四五六七八九十\d]+[章节部分]/.test(value)) return true;
  if (/^\d+(?:[.-]\d+)+\s+\S/.test(value)) return true;
  if (/^\d+[、.．]\s*[^。；！？?]{2,32}$/.test(value)) return true;
  return /^(?:初试|复试|笔试|面试|英语|数学|政治|专业课|总结|感悟)[^。；！？?]{0,18}[：:]?$/.test(value);
}

function anchorFor(text: string, index: number) {
  const ascii = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return ascii ? `section-${ascii}-${index + 1}` : `section-${index + 1}`;
}

function joinWrappedLines(lines: string[]) {
  return lines.reduce((result, line) => {
    if (!result) return line;
    const needsSpace = /[A-Za-z0-9]$/.test(result) && /^[A-Za-z0-9]/.test(line);
    return `${result}${needsSpace ? " " : ""}${line}`;
  }, "");
}

function pushReadableParagraphs(blocks: ArticleBlock[], text: string) {
  if (text.length <= 520) {
    blocks.push({ type: "paragraph", text });
    return;
  }

  const sentences = text.split(/(?<=[。！？；!?])/).filter(Boolean);
  let current = "";
  for (const sentence of sentences) {
    if (current && current.length + sentence.length > 420) {
      blocks.push({ type: "paragraph", text: current });
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current) blocks.push({ type: "paragraph", text: current });
}

export function articleBlocks(article: ExperienceArticle): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  let headingCount = 0;

  for (const group of article.body.split(/\n\s*\n/)) {
    const lines = group.split("\n").map((line) => line.trim()).filter(Boolean);
    let paragraph: string[] = [];
    let list: string[] = [];

    const flushParagraph = () => {
      if (paragraph.length) pushReadableParagraphs(blocks, joinWrappedLines(paragraph));
      paragraph = [];
    };
    const flushList = () => {
      if (list.length) blocks.push({ type: "list", items: list });
      list = [];
    };

    for (const line of lines) {
      const bullet = line.match(/^[•·▪◦*-]\s*(.+)$/);
      const numberedItem = line.match(/^(?:\d+[、.．]|[A-D][、.．])\s*(.+)$/i);
      if (bullet) {
        flushParagraph();
        list.push(bullet[1]);
      } else if (isHeading(line)) {
        flushParagraph();
        flushList();
        blocks.push({ type: "heading", id: anchorFor(line, headingCount), text: line.replace(/[：:]$/, "") });
        headingCount += 1;
      } else if (numberedItem) {
        flushParagraph();
        list.push(line);
      } else {
        flushList();
        paragraph.push(line);
      }
    }
    flushParagraph();
    flushList();
  }

  return blocks;
}

export function findExperience(slug: string) {
  return experienceArticles.find((article) => article.slug === slug);
}

export function experienceYears() {
  return [...new Set(experienceArticles.map((article) => article.year))];
}
