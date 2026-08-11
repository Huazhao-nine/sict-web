# 沈计指南

中国科学院沈阳计算技术研究所报考信息静态站。首版汇总 2026 年招生专业、初试科目、复试规则、录取数据和本地资料入口。

## 本地运行

```bash
npm install
npm run dev
```

访问 `http://localhost:3000`。

## 验证

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

## 数据口径

- 站内数据来自项目 `docs` 目录中的学生整理报告、录取统计表和报考指南。
- 本站不是研究所官方网站，规则与名额以当年官方通知为准。
- 本地研究资料与对照仓库不提交到站点源码；公开下载材料位于 `public/downloads`。
