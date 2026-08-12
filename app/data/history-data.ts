export type ProgramKey = "combined" | "academic" | "professional";
export type StudyModeKey = "all" | "fullTime" | "partTime";

export type MetricSummary = {
  count: number;
  min: number;
  max: number;
  average: number;
  median: number;
};

export type ProgramSummary = {
  interviewed: number;
  admitted: number;
  rate: number;
  initial: MetricSummary;
  reexam: MetricSummary;
  total: MetricSummary;
  scoreBands: Array<[band: string, interviewed: number, admitted: number]>;
};

export type AdmissionSummary = {
  admitted: number;
  initial: MetricSummary | null;
  reexam: MetricSummary | null;
  total: MetricSummary | null;
  scoreBands: Array<[band: string, admitted: number]>;
};

export type HistoricalReport = {
  year: 2024 | 2025;
  updatedAt: string;
  programs: Record<ProgramKey, ProgramSummary>;
  studyModes: Record<Exclude<StudyModeKey, "all">, Record<ProgramKey, AdmissionSummary>>;
  markers: Array<{ label: string; count: number; detail: string }>;
  interpretation: Array<{ title: string; body: string }>;
};

const reports: Record<2024 | 2025, HistoricalReport> = {
  2024: {
    year: 2024,
    updatedAt: "2026.08.12",
    programs: {
      combined: {
        interviewed: 123, admitted: 78, rate: 63.41,
        initial: { count: 78, min: 277, max: 409, average: 328.82, median: 322.5 },
        reexam: { count: 78, min: 62.6, max: 91.16, average: 73.16, median: 72.6 },
        total: { count: 78, min: 60, max: 78.88, average: 69.46, median: 69.33 },
        scoreBands: [["400–409",2,2],["390–399",3,3],["380–389",2,2],["370–379",2,2],["360–369",3,3],["350–359",7,7],["340–349",9,8],["330–339",10,8],["320–329",10,6],["310–319",20,10],["300–309",21,13],["290–299",16,6],["280–289",14,7],["270–279",4,1]],
      },
      academic: {
        interviewed: 28, admitted: 14, rate: 50,
        initial: { count: 14, min: 283, max: 369, average: 318.21, median: 312 },
        reexam: { count: 14, min: 68.4, max: 80.2, average: 73.17, median: 72.98 },
        total: { count: 14, min: 62.5, max: 77, average: 68.41, median: 68.15 },
        scoreBands: [["360–369",1,1],["350–359",1,1],["340–349",0,0],["330–339",1,1],["320–329",1,1],["310–319",5,4],["300–309",7,5],["290–299",5,0],["280–289",5,1],["270–279",2,0]],
      },
      professional: {
        interviewed: 95, admitted: 64, rate: 67.37,
        initial: { count: 64, min: 277, max: 409, average: 331.14, median: 330.5 },
        reexam: { count: 64, min: 62.6, max: 91.16, average: 73.16, median: 71.92 },
        total: { count: 64, min: 60, max: 78.88, average: 69.7, median: 69.83 },
        scoreBands: [["400–409",2,2],["390–399",3,3],["380–389",2,2],["370–379",2,2],["360–369",2,2],["350–359",6,6],["340–349",9,8],["330–339",9,7],["320–329",9,5],["310–319",15,6],["300–309",14,8],["290–299",11,6],["280–289",9,6],["270–279",2,1]],
      },
    },
    studyModes: {
      fullTime: {
        combined: { admitted: 54, initial: { count: 54, min: 293, max: 409, average: 342.65, median: 339 }, reexam: { count: 54, min: 66.8, max: 91.16, average: 73.95, median: 73.44 }, total: { count: 54, min: 63.94, max: 78.88, average: 71.24, median: 70.36 }, scoreBands: [["400–409",2],["390–399",3],["380–389",2],["370–379",2],["360–369",3],["350–359",7],["340–349",8],["330–339",8],["320–329",5],["310–319",6],["300–309",7],["290–299",1],["280–289",0],["270–279",0]] },
        academic: { admitted: 13, initial: { count: 13, min: 303, max: 369, average: 320.92, median: 312 }, reexam: { count: 13, min: 68.96, max: 80.2, average: 73.54, median: 73.08 }, total: { count: 13, min: 65.68, max: 77, average: 68.86, median: 68.24 }, scoreBands: [["360–369",1],["350–359",1],["340–349",0],["330–339",1],["320–329",1],["310–319",4],["300–309",5],["290–299",0],["280–289",0],["270–279",0]] },
        professional: { admitted: 41, initial: { count: 41, min: 293, max: 409, average: 349.54, median: 347 }, reexam: { count: 41, min: 66.8, max: 91.16, average: 74.08, median: 73.72 }, total: { count: 41, min: 63.94, max: 78.88, average: 71.99, median: 71.08 }, scoreBands: [["400–409",2],["390–399",3],["380–389",2],["370–379",2],["360–369",2],["350–359",6],["340–349",8],["330–339",7],["320–329",4],["310–319",2],["300–309",2],["290–299",1],["280–289",0],["270–279",0]] },
      },
      partTime: {
        combined: { admitted: 24, initial: { count: 24, min: 277, max: 324, average: 297.71, median: 295.5 }, reexam: { count: 24, min: 62.6, max: 87, average: 71.41, median: 68.84 }, total: { count: 24, min: 60, max: 72.2, average: 65.47, median: 65.26 }, scoreBands: [["400–409",0],["390–399",0],["380–389",0],["370–379",0],["360–369",0],["350–359",0],["340–349",0],["330–339",0],["320–329",1],["310–319",4],["300–309",6],["290–299",5],["280–289",7],["270–279",1]] },
        academic: { admitted: 1, initial: { count: 1, min: 283, max: 283, average: 283, median: 283 }, reexam: { count: 1, min: 68.4, max: 68.4, average: 68.4, median: 68.4 }, total: { count: 1, min: 62.5, max: 62.5, average: 62.5, median: 62.5 }, scoreBands: [["360–369",0],["350–359",0],["340–349",0],["330–339",0],["320–329",0],["310–319",0],["300–309",0],["290–299",0],["280–289",1],["270–279",0]] },
        professional: { admitted: 23, initial: { count: 23, min: 277, max: 324, average: 298.35, median: 297 }, reexam: { count: 23, min: 62.6, max: 87, average: 71.54, median: 69.17 }, total: { count: 23, min: 60, max: 72.2, average: 65.6, median: 65.66 }, scoreBands: [["400–409",0],["390–399",0],["380–389",0],["370–379",0],["360–369",0],["350–359",0],["340–349",0],["330–339",0],["320–329",1],["310–319",4],["300–309",6],["290–299",5],["280–289",6],["270–279",1]] },
      },
    },
    markers: [
      { label: "未特别标注", count: 48, detail: "表内备注为空的拟录取记录" },
      { label: "非全日制", count: 24, detail: "所内调剂 16 人、校内调剂 8 人" },
      { label: "专项 / 士兵", count: 3, detail: "专项计划 2 人、士兵计划 1 人" },
      { label: "少于计划", count: 3, detail: "保留原表备注，不推断具体含义" },
    ],
    interpretation: [
      { title: "专硕录取规模更大", body: "表内专硕复试 95 人、拟录取 64 人，占当年拟录取记录的主要部分。" },
      { title: "高分段样本更稳定", body: "340 分及以上共 28 人进入复试、27 人录取；这只是 2024 年表内结果，不是未来保证线。" },
      { title: "非全与调剂必须单独看", body: "78 条拟录取记录中有 24 条非全日制调剂标注，不能把全部记录直接等同于全日制一志愿。" },
    ],
  },
  2025: {
    year: 2025,
    updatedAt: "2026.08.12",
    programs: {
      combined: {
        interviewed: 135, admitted: 79, rate: 58.52,
        initial: { count: 79, min: 261, max: 409, average: 329.82, median: 338 },
        reexam: { count: 79, min: 65.28, max: 84.4, average: 75.33, median: 75.28 },
        total: { count: 79, min: 60.78, max: 81.78, average: 70.65, median: 71.26 },
        scoreBands: [["400–409",3,3],["390–399",0,0],["380–389",5,5],["370–379",2,2],["360–369",9,8],["350–359",13,12],["340–349",7,6],["330–339",13,6],["320–329",13,6],["310–319",10,4],["300–309",16,5],["290–299",10,8],["280–289",9,3],["270–279",11,6],["260–269",14,5]],
      },
      academic: {
        interviewed: 24, admitted: 15, rate: 62.5,
        initial: { count: 15, min: 261, max: 361, average: 310.87, median: 306 },
        reexam: { count: 15, min: 65.28, max: 83.64, average: 74.33, median: 73.4 },
        total: { count: 15, min: 62.8, max: 75.46, average: 68.25, median: 66.22 },
        scoreBands: [["360–369",1,1],["350–359",2,2],["340–349",0,0],["330–339",1,1],["320–329",1,1],["310–319",0,0],["300–309",4,3],["290–299",3,3],["280–289",4,2],["270–279",2,1],["260–269",6,1]],
      },
      professional: {
        interviewed: 111, admitted: 64, rate: 57.66,
        initial: { count: 64, min: 262, max: 409, average: 334.27, median: 341.5 },
        reexam: { count: 64, min: 67, max: 84.4, average: 75.56, median: 75.32 },
        total: { count: 64, min: 60.78, max: 81.78, average: 71.21, median: 71.54 },
        scoreBands: [["400–409",3,3],["390–399",0,0],["380–389",5,5],["370–379",2,2],["360–369",8,7],["350–359",11,10],["340–349",7,6],["330–339",12,5],["320–329",12,5],["310–319",10,4],["300–309",12,2],["290–299",7,5],["280–289",5,1],["270–279",9,5],["260–269",8,4]],
      },
    },
    studyModes: {
      fullTime: {
        combined: { admitted: 51, initial: { count: 51, min: 284, max: 409, average: 347.53, median: 353 }, reexam: { count: 51, min: 65.28, max: 84.4, average: 74.97, median: 74.84 }, total: { count: 51, min: 63.24, max: 81.78, average: 72.24, median: 72.28 }, scoreBands: [["400–409",3],["390–399",0],["380–389",5],["370–379",2],["360–369",7],["350–359",11],["340–349",5],["330–339",6],["320–329",3],["310–319",0],["300–309",3],["290–299",3],["280–289",3],["270–279",0],["260–269",0]] },
        academic: { admitted: 13, initial: { count: 13, min: 284, max: 361, average: 317.62, median: 307 }, reexam: { count: 13, min: 65.28, max: 83.64, average: 74.22, median: 72.68 }, total: { count: 13, min: 63.24, max: 75.46, average: 68.87, median: 70.48 }, scoreBands: [["360–369",1],["350–359",2],["340–349",0],["330–339",1],["320–329",1],["310–319",0],["300–309",3],["290–299",3],["280–289",2],["270–279",0],["260–269",0]] },
        professional: { admitted: 38, initial: { count: 38, min: 285, max: 409, average: 357.76, median: 356.5 }, reexam: { count: 38, min: 67, max: 84.4, average: 75.22, median: 74.88 }, total: { count: 38, min: 65.92, max: 81.78, average: 73.39, median: 72.68 }, scoreBands: [["400–409",3],["390–399",0],["380–389",5],["370–379",2],["360–369",6],["350–359",9],["340–349",5],["330–339",5],["320–329",2],["310–319",0],["300–309",0],["290–299",0],["280–289",1],["270–279",0],["260–269",0]] },
      },
      partTime: {
        combined: { admitted: 28, initial: { count: 28, min: 261, max: 364, average: 297.57, median: 294 }, reexam: { count: 28, min: 68.36, max: 82.12, average: 75.98, median: 76.26 }, total: { count: 28, min: 60.78, max: 76.66, average: 67.75, median: 67.86 }, scoreBands: [["400–409",0],["390–399",0],["380–389",0],["370–379",0],["360–369",1],["350–359",1],["340–349",1],["330–339",0],["320–329",3],["310–319",4],["300–309",2],["290–299",5],["280–289",0],["270–279",6],["260–269",5]] },
        academic: { admitted: 2, initial: { count: 2, min: 261, max: 273, average: 267, median: 267 }, reexam: { count: 2, min: 73.4, max: 76.6, average: 75, median: 75 }, total: { count: 2, min: 62.8, max: 65.6, average: 64.2, median: 64.2 }, scoreBands: [["360–369",0],["350–359",0],["340–349",0],["330–339",0],["320–329",0],["310–319",0],["300–309",0],["290–299",0],["280–289",0],["270–279",1],["260–269",1]] },
        professional: { admitted: 26, initial: { count: 26, min: 262, max: 364, average: 299.92, median: 297.5 }, reexam: { count: 26, min: 68.36, max: 82.12, average: 76.06, median: 76.26 }, total: { count: 26, min: 60.78, max: 76.66, average: 68.02, median: 68.07 }, scoreBands: [["400–409",0],["390–399",0],["380–389",0],["370–379",0],["360–369",1],["350–359",1],["340–349",1],["330–339",0],["320–329",3],["310–319",4],["300–309",2],["290–299",5],["280–289",0],["270–279",5],["260–269",4]] },
      },
    },
    markers: [
      { label: "未特别标注", count: 47, detail: "表内备注为空的拟录取记录" },
      { label: "非全日制", count: 28, detail: "原表统一简写为“非全”" },
      { label: "专项计划", count: 2, detail: "原表文字为“专向计划”，此处按常见含义归类" },
      { label: "士兵计划", count: 2, detail: "原表备注简写为“士兵”" },
    ],
    interpretation: [
      { title: "录取记录仍以专硕为主", body: "专硕复试 111 人、拟录取 64 人；学硕复试 24 人、拟录取 15 人。" },
      { title: "330 分附近分化明显", body: "总体 330–339 分段 13 人复试、6 人录取；同一分数段内部仍存在明显淘汰。" },
      { title: "最低分不能当作目标分", body: "低分拟录取样本同时包含非全、专项和士兵等备注，必须结合路径与复试成绩阅读。" },
    ],
  },
};

export function getHistoricalReport(year: 2024 | 2025) {
  return reports[year];
}
