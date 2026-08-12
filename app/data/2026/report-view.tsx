"use client";

import { useState } from "react";

type Program = "combined" | "academic" | "professional";
type StudyMode = "all" | "fullTime" | "partTime";

const labels: Record<Program, string> = {
  combined: "总体",
  academic: "学硕",
  professional: "专硕",
};

const studyModeLabels: Record<StudyMode, string> = {
  all: "全部",
  fullTime: "全日制",
  partTime: "非全日制",
};

const scoreBands: Record<Program, Array<{ band: string; interviewed: number; admitted: number; cumulativeRate: string }>> = {
  combined: [
    { band: "390–399", interviewed: 1, admitted: 1, cumulativeRate: "100.00%" },
    { band: "380–389", interviewed: 3, admitted: 3, cumulativeRate: "100.00%" },
    { band: "370–379", interviewed: 2, admitted: 2, cumulativeRate: "100.00%" },
    { band: "360–369", interviewed: 5, admitted: 4, cumulativeRate: "90.91%" },
    { band: "350–359", interviewed: 7, admitted: 6, cumulativeRate: "88.89%" },
    { band: "340–349", interviewed: 8, admitted: 8, cumulativeRate: "92.31%" },
    { band: "330–339", interviewed: 11, admitted: 7, cumulativeRate: "83.78%" },
    { band: "320–329", interviewed: 12, admitted: 7, cumulativeRate: "77.55%" },
    { band: "310–319", interviewed: 4, admitted: 0, cumulativeRate: "71.70%" },
    { band: "300–309", interviewed: 11, admitted: 4, cumulativeRate: "65.62%" },
    { band: "290–299", interviewed: 13, admitted: 3, cumulativeRate: "58.44%" },
    { band: "280–289", interviewed: 9, admitted: 1, cumulativeRate: "53.49%" },
    { band: "270–279", interviewed: 11, admitted: 2, cumulativeRate: "49.48%" },
    { band: "260–269", interviewed: 4, admitted: 0, cumulativeRate: "47.52%" },
  ],
  academic: [
    { band: "360–369", interviewed: 1, admitted: 1, cumulativeRate: "100.00%" },
    { band: "340–349", interviewed: 1, admitted: 1, cumulativeRate: "100.00%" },
    { band: "330–339", interviewed: 1, admitted: 1, cumulativeRate: "100.00%" },
    { band: "320–329", interviewed: 3, admitted: 3, cumulativeRate: "100.00%" },
    { band: "300–309", interviewed: 4, admitted: 4, cumulativeRate: "100.00%" },
    { band: "290–299", interviewed: 6, admitted: 3, cumulativeRate: "81.25%" },
    { band: "280–289", interviewed: 5, admitted: 1, cumulativeRate: "66.67%" },
    { band: "270–279", interviewed: 5, admitted: 2, cumulativeRate: "61.54%" },
    { band: "260–269", interviewed: 4, admitted: 0, cumulativeRate: "53.33%" },
  ],
  professional: [
    { band: "390–399", interviewed: 1, admitted: 1, cumulativeRate: "100.00%" },
    { band: "380–389", interviewed: 3, admitted: 3, cumulativeRate: "100.00%" },
    { band: "370–379", interviewed: 2, admitted: 2, cumulativeRate: "100.00%" },
    { band: "360–369", interviewed: 4, admitted: 3, cumulativeRate: "90.00%" },
    { band: "350–359", interviewed: 7, admitted: 6, cumulativeRate: "88.24%" },
    { band: "340–349", interviewed: 7, admitted: 7, cumulativeRate: "91.67%" },
    { band: "330–339", interviewed: 10, admitted: 6, cumulativeRate: "82.35%" },
    { band: "320–329", interviewed: 9, admitted: 4, cumulativeRate: "74.42%" },
    { band: "310–319", interviewed: 4, admitted: 0, cumulativeRate: "68.09%" },
    { band: "300–309", interviewed: 7, admitted: 0, cumulativeRate: "59.26%" },
    { band: "290–299", interviewed: 7, admitted: 0, cumulativeRate: "52.46%" },
    { band: "280–289", interviewed: 4, admitted: 0, cumulativeRate: "49.23%" },
    { band: "270–279", interviewed: 6, admitted: 0, cumulativeRate: "45.07%" },
  ],
};

const subjectStats = {
  academic: [
    ["政治", 65, 46, 56, 54],
    ["英语（一）", 75, 38, 56, 57],
    ["数学（一）", 123, 58, 92, 89],
    ["408", 110, 68, 91, 93],
  ],
  professional: [
    ["政治", 70, 39, 57, 56],
    ["英语（二）", 88, 40, 71, 73],
    ["数学（二）", 141, 58, 109, 110],
    ["408", 114, 58, 90, 91],
  ],
};

const admittedStats = {
  academic: [
    ["初试成绩", "361", "271", "309.69", "305.50"],
    ["复试成绩", "83.10", "67.72", "77.64", "78.13"],
    ["总成绩", "77.65", "66.46", "69.79", "68.67"],
  ],
  professional: [
    ["初试成绩", "395", "323", "351.97", "349"],
    ["复试成绩", "87.22", "70.02", "78.26", "78.97"],
    ["总成绩", "81.93", "69.99", "74.33", "73.71"],
  ],
};

function ProgramTabs({ value, onChange, includeCombined = true }: { value: Program; onChange: (value: Program) => void; includeCombined?: boolean }) {
  const options: Program[] = includeCombined ? ["combined", "academic", "professional"] : ["academic", "professional"];
  return (
    <div className="report-tabs" aria-label="培养类型切换">
      {options.map((option) => (
        <button type="button" aria-pressed={value === option} className={value === option ? "active" : ""} onClick={() => onChange(option)} key={option}>{labels[option]}</button>
      ))}
    </div>
  );
}

function StudyModeTabs({ value, onChange }: { value: StudyMode; onChange: (value: StudyMode) => void }) {
  const options: StudyMode[] = ["all", "fullTime", "partTime"];
  return (
    <div className="report-tabs study-mode-tabs" aria-label="学习方式切换">
      {options.map((option) => (
        <button type="button" aria-pressed={value === option} className={value === option ? "active" : ""} onClick={() => onChange(option)} key={option}>{studyModeLabels[option]}</button>
      ))}
    </div>
  );
}

export function ScoreBandReport() {
  const [program, setProgram] = useState<Program>("combined");
  const [studyMode, setStudyMode] = useState<StudyMode>("all");
  const data = scoreBands[program];
  const max = Math.max(...data.map((item) => item.interviewed));
  return (
    <>
      <div className="report-section-toolbar">
        <p>{labels[program]} · {studyModeLabels[studyMode]} · 不含士兵计划</p>
        <div className="report-filter-groups"><ProgramTabs value={program} onChange={setProgram} /><StudyModeTabs value={studyMode} onChange={setStudyMode} /></div>
      </div>
      {studyMode === "partTime" ? (
        <div className="report-empty-state"><strong>0 条非全日制拟录取记录</strong><p>2026 年现有复试、拟录取表和年度报告均未标注非全日制录取，因此没有可计算的分数段。</p></div>
      ) : <>
      <article className="report-chart-card">
        <div className="report-chart-legend"><span><i className="interviewed" />进入复试</span><span><i className="admitted" />拟录取</span></div>
        <div className="report-bar-chart" aria-label={`${labels[program]}各分数段复试和录取人数`}>
          {data.map((item) => (
            <div className="report-bar-group" key={item.band}>
              <div className="report-bar-values"><span>{item.interviewed}</span><span>{item.admitted || "–"}</span></div>
              <div className="report-bar-pair">
                <i className="report-bar interviewed" style={{ height: `${Math.max(3, item.interviewed / max * 150)}px` }} />
                <i className="report-bar admitted" style={{ height: `${Math.max(2, item.admitted / max * 150)}px` }} />
              </div>
              <small>{item.band}</small>
            </div>
          ))}
        </div>
      </article>
      <div className="report-table-wrap">
        <table className="report-table">
          <thead><tr><th>分数段</th><th>复试</th><th>录取</th><th>分段录取率</th><th>累计录取率</th></tr></thead>
          <tbody>{data.map((item) => <tr key={item.band}><td><strong>{item.band}</strong></td><td>{item.interviewed}</td><td>{item.admitted}</td><td>{(item.admitted / item.interviewed * 100).toFixed(2)}%</td><td>{item.cumulativeRate}</td></tr>)}</tbody>
        </table>
      </div>
      {studyMode === "fullTime" && <p className="report-mode-note">本年度材料未见非全日制标注，因此全日制详细分数段与全部相同；本表仍按原报告排除 1 名士兵计划考生。</p>}
      </>}
    </>
  );
}

export function ScoreStatistics() {
  const [program, setProgram] = useState<Program>("academic");
  const [studyMode, setStudyMode] = useState<StudyMode>("all");
  const typedProgram = program === "professional" ? "professional" : "academic";
  return (
    <>
      <div className="report-section-toolbar">
        <p>{studyModeLabels[studyMode]} · 最高、最低、平均和中位数</p>
        <div className="report-filter-groups"><ProgramTabs value={program} onChange={setProgram} includeCombined={false} /><StudyModeTabs value={studyMode} onChange={setStudyMode} /></div>
      </div>
      {studyMode === "partTime" ? (
        <div className="report-empty-state"><strong>0 条非全日制成绩记录</strong><p>原始材料没有非全日制拟录取样本，因此不显示空统计表。</p></div>
      ) : (
      <div className="statistics-grid">
        <article className="stat-table-card">
          <div><span>复试名单样本</span><h3>初试单科成绩</h3></div>
          <div className="report-table-wrap"><table className="report-table compact-table"><thead><tr><th>科目</th><th>最高</th><th>最低</th><th>平均</th><th>中位</th></tr></thead><tbody>{subjectStats[typedProgram].map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <td key={String(cell)}><strong>{cell}</strong></td> : <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
        </article>
        <article className="stat-table-card">
          <div><span>拟录取名单样本</span><h3>初试、复试与总成绩</h3></div>
          <div className="report-table-wrap"><table className="report-table compact-table"><thead><tr><th>项目</th><th>最高</th><th>最低</th><th>平均</th><th>中位</th></tr></thead><tbody>{admittedStats[typedProgram].map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <td key={String(cell)}><strong>{cell}</strong></td> : <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
        </article>
      </div>
      )}
      {studyMode !== "partTime" && <p className="report-mode-note">拟录取成绩统计覆盖 48 条常规记录；另 1 名士兵专项计划考生未进入这组详细统计。现有材料无非全日制，因此全部与全日制结果相同。</p>}
    </>
  );
}
