# 沈计指南

中国科学院沈阳计算技术研究所报考信息站。汇总 2026 年招生专业、初试科目、复试规则、录取数据、毕业去向与经验文章。

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
- 本地研究资料与对照仓库不提交到站点源码；公开页面只提供网页阅读，不提供原始文档下载。
- `scripts/import-experiences.mjs` 将 `docs/经验分享` 中 24 份唯一资料转写为站内文章数据，重复文件会被排除。
