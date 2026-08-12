import type { Metadata } from "next";
import { getHistoricalReport } from "../history-data";
import { HistoricalReportPage } from "../history-report";

export const metadata: Metadata = {
  title: "2024 年考研数据报告",
  description: "沈阳计算所 2024 年复试、拟录取、分数段与初复试成绩统计。",
};

export const dynamic = "force-static";

export default function Report2024() {
  return <HistoricalReportPage report={getHistoricalReport(2024)} />;
}
