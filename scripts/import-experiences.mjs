import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const sourceDirectory = join(process.cwd(), "docs", "经验分享");
const outputFile = join(process.cwd(), "app", "content", "experiences.generated.json");

const records = [
  ["2026-retest-recollection", "专硕复试全流程回忆", "2026", "复试", "专硕回忆录.docx", "从笔试、英语面试到专业面试，记录 2026 年专硕复试的完整过程。"],
  ["2026-written-test-recollection", "2026 复试笔试回忆", "2026", "试题", "26复试笔试回忆.docx", "按程序设计、操作系统和计算机网络整理的 2026 年笔试考点回忆。"],
  ["2026-retest-paper", "2026 复试试题整理", "2026", "试题", "2026 中国科学院沈阳计算技术研究所复试试题.pdf", "依据现场回忆整理的 2026 年复试试题版本，题干仅供复习定位。"],
  ["2025-academic-retest-359", "学硕 359 分复试回忆", "2025", "复试", "2025沈计所复试回忆-学硕359.docx", "一篇学硕考生对笔试、英语对话与项目面试的简要复盘。"],
  ["2024-retest-recollection", "2024 沈计所复试回忆", "2024", "复试", "2024沈计所复试回忆.pdf", "整理 2024 年复试笔试、英语与专业面试中出现的考查方向。"],
  ["2024-math-132", "数学二 132 分备考经验", "2024", "初试", "24考研数二132经验贴.docx", "围绕刷题量、错题复习频率、资料选择和冲刺节奏展开的数学二经验。"],
  ["2023-retest-312", "312 分复试经验贴", "2023", "复试", "312经验贴.pdf", "低排名考生对复试流程、准备方式与心态调整的系统总结。"],
  ["2023-retest-11408", "11408 复试经验", "2023", "复试", "2023沈计所11408复试经验.pdf", "从初试边缘排名出发，复盘英语、笔试和综合面试的准备与逆转过程。"],
  ["2023-score-401", "初试 401 分经验贴", "2023", "初试", "2023沈计所初试401分经验贴.pdf", "按英语、数学、政治和专业课拆解高分初试的复习方法。"],
  ["2023-11408-summary-a", "11408 备考总结（一）", "2023", "初试", "2023考研11408总结.pdf", "二战考生围绕政治、英语、数学与 408 统考形成的完整备考复盘。"],
  ["2023-11408-summary-b", "11408 备考总结（二）", "2023", "初试", "2023考研总结（11408）.pdf", "另一位考生对 11408 科目安排、资料选择和阶段节奏的独立总结。"],
  ["2023-first-test-summary", "考研初试阶段总结", "2023", "初试", "2023考研初试总结.pdf", "一份 350 分考生按科目记录的自学备考心得与踩坑复盘。"],
  ["2023-general-experience", "考研经验与复试问题回忆", "2023", "综合", "2023考研经验.pdf", "兼顾初试计划与复试问答回忆的综合经验材料。"],
  ["2023-408-score-125", "408 初试 125 分备考经验", "2023", "初试", "陈琪-408计算机基础初试125分高分备考经验.docx", "按基础、强化和冲刺阶段梳理 408 四科的学习顺序与重点。"],
  ["2022-retest-342", "专硕 342 分复试回忆", "2022", "复试", "2022专硕342的擦边复试回忆.pdf", "一名边缘排名考生对笔试、中文面试和英语面试的具体复盘。"],
  ["2022-written-test", "复试笔试回忆：薪火相传", "2022", "试题", "沈阳计算所2022复试笔试（薪火相传）.pdf", "按题型整理 2022 年复试笔试考查内容，适合用于划定复习范围。"],
  ["2020-professional-interview", "全日制专业面试回忆", "2020", "复试", "2020复试全日制专业面试回忆.docx", "多位全日制考生记录的自我介绍、项目与专业课提问经历。"],
  ["2020-professional-written-test", "专硕复试笔试题目详细版", "2020", "试题", "2020专硕复试笔试题目-详细版.doc", "较详细地回忆程序设计、操作系统与计算机网络笔试题目。"],
  ["2020-academic-written-test", "学硕复试笔试题目", "2020", "试题", "2020复试笔试题目学硕.docx", "学硕考生记录的程序设计、组成原理、操作系统和网络题目。"],
  ["2019-professional-interview", "全日制专业面试回忆", "2019", "复试", "19复试全日制专业面试回忆.docx", "汇总多位考生的专业面试经过，呈现不同背景下的提问差异。"],
  ["2019-full-time-written-test", "全日制学硕、专硕笔试回忆", "2019", "试题", "2019复试笔试题目（全日制学硕专硕）.doc", "按程序设计、组成原理、操作系统和网络整理的笔试题目回忆。"],
  ["2019-part-time-written-test", "非全日制复试笔试回忆", "2019", "试题", "2019非全笔试回忆.docx", "一份精简的非全日制笔试考点记录。"],
  ["2018-academic-written-test", "学硕复试笔试回忆", "2018", "试题", "沈阳计算所2018学硕复试笔试（回忆）.doc", "记录算法、文件处理、数据结构和操作系统等八道大题方向。"],
  ["2006-2009-written-tests", "2006—2009 复试试题整理", "2006—2009", "试题", "2006-2009沈阳计算所复试试题.docx", "较早年份的复试试题汇编，适合观察考查范围，不宜用于预测当前命题。"],
];

function extractText(fileName) {
  const path = join(sourceDirectory, fileName);
  const extension = extname(fileName).toLowerCase();
  const command = extension === ".pdf" ? "pdftotext" : "textutil";
  const args = extension === ".pdf"
    ? ["-layout", path, "-"]
    : ["-convert", "txt", "-stdout", path];

  return execFileSync(command, args, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
}

function cleanText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/[\u200b\u200e\u200f\ufeff]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\f/g, "\n\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .filter((line) => !/^\s*\d{1,2}\s*$/.test(line))
    .join("\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

const seen = new Set();
const articles = records.map(([slug, title, year, category, sourceFile, summary]) => {
  const sourcePath = join(sourceDirectory, sourceFile);
  const digest = createHash("sha256").update(readFileSync(sourcePath)).digest("hex");
  if (seen.has(digest)) throw new Error(`Duplicate source selected: ${sourceFile}`);
  seen.add(digest);

  return {
    slug,
    title,
    year,
    category,
    sourceFile,
    summary,
    body: cleanText(extractText(sourceFile)),
  };
});

mkdirSync(join(process.cwd(), "app", "content"), { recursive: true });
writeFileSync(outputFile, `${JSON.stringify(articles, null, 2)}\n`);
console.log(`Generated ${articles.length} unique experience articles at ${outputFile}`);
