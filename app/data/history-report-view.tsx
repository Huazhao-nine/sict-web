"use client";

import { useState } from "react";
import type { HistoricalReport, ProgramKey, StudyModeKey } from "./history-data";

const labels: Record<ProgramKey, string> = {
  combined: "总体",
  academic: "学硕",
  professional: "专硕",
};

const studyModeLabels: Record<StudyModeKey, string> = {
  all: "全部",
  fullTime: "全日制",
  partTime: "非全日制",
};

function ProgramTabs({ value, onChange }: { value: ProgramKey; onChange: (value: ProgramKey) => void }) {
  const options: ProgramKey[] = ["combined", "academic", "professional"];
  return (
    <div className="report-tabs" aria-label="培养类型切换">
      {options.map((option) => (
        <button type="button" aria-pressed={value === option} className={value === option ? "active" : ""} onClick={() => onChange(option)} key={option}>
          {labels[option]}
        </button>
      ))}
    </div>
  );
}

function StudyModeTabs({ value, onChange }: { value: StudyModeKey; onChange: (value: StudyModeKey) => void }) {
  const options: StudyModeKey[] = ["all", "fullTime", "partTime"];
  return (
    <div className="report-tabs study-mode-tabs" aria-label="学习方式切换">
      {options.map((option) => (
        <button type="button" aria-pressed={value === option} className={value === option ? "active" : ""} onClick={() => onChange(option)} key={option}>
          {studyModeLabels[option]}
        </button>
      ))}
    </div>
  );
}

export function HistoricalScoreBands({ report }: { report: HistoricalReport }) {
  const [program, setProgram] = useState<ProgramKey>("combined");
  const [studyMode, setStudyMode] = useState<StudyModeKey>("all");
  const allData = report.programs[program].scoreBands;
  const modeSummary = studyMode === "all" ? null : report.studyModes[studyMode][program];
  const data = studyMode === "all"
    ? allData.map(([band, interviewed, admitted]) => ({ band, interviewed, admitted }))
    : modeSummary!.scoreBands.map(([band, admitted]) => ({ band, interviewed: null, admitted }));
  const max = Math.max(1, ...data.map((item) => Math.max(item.interviewed ?? 0, item.admitted)));
  const rows = data.map((item, index) => {
    const cumulative = data.slice(0, index + 1).reduce(
      (result, bandItem) => ({
        interviewed: result.interviewed + (bandItem.interviewed ?? 0),
        admitted: result.admitted + bandItem.admitted,
      }),
      { interviewed: 0, admitted: 0 },
    );
    return {
      ...item,
      segmentRate: item.interviewed ? `${(item.admitted / item.interviewed * 100).toFixed(2)}%` : "—",
      cumulativeRate: cumulative.interviewed ? `${(cumulative.admitted / cumulative.interviewed * 100).toFixed(2)}%` : "—",
      share: modeSummary?.admitted ? `${(item.admitted / modeSummary.admitted * 100).toFixed(2)}%` : "—",
      cumulativeShare: modeSummary?.admitted ? `${(cumulative.admitted / modeSummary.admitted * 100).toFixed(2)}%` : "—",
    };
  });

  return (
    <>
      <div className="report-section-toolbar">
        <p>{labels[program]} · {studyModeLabels[studyMode]}{studyMode === "all" ? "复试与录取" : `拟录取 ${modeSummary?.admitted ?? 0} 人`}</p>
        <div className="report-filter-groups"><ProgramTabs value={program} onChange={setProgram} /><StudyModeTabs value={studyMode} onChange={setStudyMode} /></div>
      </div>
      <article className="report-chart-card">
        <div className="report-chart-legend">{studyMode === "all" && <span><i className="interviewed" />进入复试</span>}<span><i className="admitted" />拟录取</span></div>
        <div className="report-bar-chart historical-bars" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(34px, 1fr))` }} aria-label={`${report.year} 年${labels[program]}各分数段复试和录取人数`}>
          {data.map((item) => (
            <div className="report-bar-group" key={item.band}>
              <div className="report-bar-values">{studyMode === "all" && <span>{item.interviewed || "–"}</span>}<span>{item.admitted || "–"}</span></div>
              <div className="report-bar-pair">
                {studyMode === "all" && <i className="report-bar interviewed" style={{ height: `${item.interviewed ? Math.max(3, item.interviewed / max * 150) : 0}px` }} />}
                <i className="report-bar admitted" style={{ height: `${item.admitted ? Math.max(2, item.admitted / max * 150) : 0}px` }} />
              </div>
              <small>{item.band}</small>
            </div>
          ))}
        </div>
      </article>
      <div className="report-table-wrap">
        <table className="report-table">
          {studyMode === "all" ? (
            <><thead><tr><th>分数段</th><th>复试</th><th>录取</th><th>分段录取率</th><th>累计录取率</th></tr></thead><tbody>{rows.map((item) => <tr key={item.band}><td><strong>{item.band}</strong></td><td>{item.interviewed}</td><td>{item.admitted}</td><td>{item.segmentRate}</td><td>{item.cumulativeRate}</td></tr>)}</tbody></>
          ) : (
            <><thead><tr><th>分数段</th><th>{studyModeLabels[studyMode]}录取</th><th>占该方式录取</th><th>累计占比</th></tr></thead><tbody>{rows.map((item) => <tr key={item.band}><td><strong>{item.band}</strong></td><td>{item.admitted}</td><td>{item.share}</td><td>{item.cumulativeShare}</td></tr>)}</tbody></>
          )}
        </table>
      </div>
      {studyMode !== "all" && <p className="report-mode-note">复试名单未单列学习方式，因此这里只拆分拟录取结果，不计算全日制或非全日制的独立复试录取率。</p>}
    </>
  );
}

function formatScore(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0$/, "");
}

export function HistoricalStatistics({ report }: { report: HistoricalReport }) {
  const [program, setProgram] = useState<ProgramKey>("combined");
  const [studyMode, setStudyMode] = useState<StudyModeKey>("all");
  const summary = studyMode === "all" ? report.programs[program] : report.studyModes[studyMode][program];
  const rows = [
    ["初试成绩", summary.initial],
    ["复试成绩", summary.reexam],
    ["总成绩", summary.total],
  ] as const;

  return (
    <>
      <div className="report-section-toolbar">
        <p>{labels[program]} · {studyModeLabels[studyMode]}拟录取样本 · 共 {summary.admitted} 人</p>
        <div className="report-filter-groups"><ProgramTabs value={program} onChange={setProgram} /><StudyModeTabs value={studyMode} onChange={setStudyMode} /></div>
      </div>
      <article className="stat-table-card historical-stat-card">
        <div><span>拟录取名单样本</span><h3>最高、最低、平均与中位数</h3></div>
        <div className="report-table-wrap">
          <table className="report-table compact-table">
            <thead><tr><th>项目</th><th>样本数</th><th>最高</th><th>最低</th><th>平均</th><th>中位</th></tr></thead>
            <tbody>{rows.map(([label, metric]) => <tr key={label}><td><strong>{label}</strong></td><td>{metric?.count ?? "—"}</td><td>{metric ? formatScore(metric.max) : "—"}</td><td>{metric ? formatScore(metric.min) : "—"}</td><td>{metric ? formatScore(metric.average) : "—"}</td><td>{metric ? formatScore(metric.median) : "—"}</td></tr>)}</tbody>
          </table>
        </div>
      </article>
    </>
  );
}
