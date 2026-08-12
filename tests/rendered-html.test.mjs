import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished SICT guide", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /沈阳计算所/);
  assert.match(html, /2026 数据快照/);
  assert.match(html, /初试科目/);
  assert.match(html, /复试怎么考/);
  assert.match(html, /非官方网站/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the data archive", async () => {
  const response = await render("/data");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /历年录取/);
  assert.match(html, /2024—2026/);
  assert.match(html, /48 条常规录取记录/);
});

test("server-renders the complete 2026 annual report", async () => {
  const response = await render("/data/2026");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /2026 年.*考研数据报告/s);
  assert.match(html, /四个报考专业/);
  assert.match(html, /分数段复试与录取/);
  assert.match(html, /单科、初试、复试与总成绩/);
});

test("server-renders experience and source archives", async () => {
  const [experienceResponse, sourceResponse] = await Promise.all([
    render("/experiences"),
    render("/sources"),
  ]);
  assert.equal(experienceResponse.status, 200);
  assert.equal(sourceResponse.status, 200);
  assert.match(await experienceResponse.text(), /经验资料/);
  assert.match(await sourceResponse.text(), /三层来源/);
});
