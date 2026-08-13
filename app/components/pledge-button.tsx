"use client";

import { useEffect, useState } from "react";

const pledgeKey = "sict-guide-pledged";
const visitorKey = "sict-guide-visitor-id";
const apiBaseUrl = (
  process.env.NEXT_PUBLIC_SICT_API_BASE_URL ?? "https://flowerinfire.com/api/sict"
).replace(/\/$/, "");

let fallbackVisitorId: string | null = null;

type PledgeData = {
  count: number;
  pledged: boolean;
};

type PledgeResponse = {
  code: number;
  msg?: string;
  data?: PledgeData;
};

function createVisitorId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `sict-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function getOrCreateVisitorId() {
  try {
    const existing = window.localStorage.getItem(visitorKey);
    if (existing) return existing;

    const created = createVisitorId();
    window.localStorage.setItem(visitorKey, created);
    return created;
  } catch {
    fallbackVisitorId ??= createVisitorId();
    return fallbackVisitorId;
  }
}

function readLegacyPledge() {
  try {
    return window.localStorage.getItem(pledgeKey) === "true";
  } catch {
    return false;
  }
}

function savePledgeLocally() {
  try {
    window.localStorage.setItem(pledgeKey, "true");
  } catch {
    // 浏览器禁用本地存储时，服务端记录仍然有效。
  }
}

async function requestPledge(method: "GET" | "POST", visitorId: string) {
  const response = await fetch(`${apiBaseUrl}/pledge`, {
    method,
    headers: {
      "X-Sict-Visitor-Id": visitorId,
    },
  });
  const result = (await response.json()) as PledgeResponse;

  if (!response.ok || result.code !== 200 || !result.data) {
    throw new Error(result.msg || "暂时无法连接报到服务");
  }
  return result.data;
}

export function PledgeButton() {
  const [pledged, setPledged] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const visitorId = getOrCreateVisitorId();
    const legacyPledged = readLegacyPledge();

    async function loadStatus() {
      try {
        let data = await requestPledge("GET", visitorId);

        // 将旧版仅保存在浏览器中的报到状态幂等同步到全站计数。
        if (legacyPledged && !data.pledged) {
          data = await requestPledge("POST", visitorId);
        }

        if (!active) return;
        setPledged(data.pledged);
        setCount(data.count);
        if (data.pledged) savePledgeLocally();
      } catch (requestError) {
        if (!active) return;
        setPledged(legacyPledged);
        setError(requestError instanceof Error ? requestError.message : "全站计数暂不可用");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStatus();
    return () => {
      active = false;
    };
  }, []);

  async function pledge() {
    if (pledged || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const data = await requestPledge("POST", getOrCreateVisitorId());
      setPledged(data.pledged);
      setCount(data.count);
      savePledgeLocally();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "报到失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pledge-action" aria-busy={loading || submitting}>
      <button
        type="button"
        aria-pressed={pledged}
        disabled={loading || submitting || pledged}
        onClick={pledge}
      >
        {submitting ? "正在报到…" : pledged ? "✓ 已向沈计所报到" : "⚔ 对沈计所效忠"}
      </button>
      <p role="status" aria-live="polite" data-error={error ? "true" : undefined}>
        {error
          ? error
          : pledged
            ? "决心已收到，祝你备考顺利、成功上岸。"
            : "轻松点一下，为自己的选择留个纪念。"}
      </p>
      <small className="pledge-counter">
        {loading ? (
          "正在读取全站计数…"
        ) : count === null ? (
          "仅上传匿名浏览器标识，不收集个人资料。"
        ) : (
          <>
            全站已有 <strong>{count.toLocaleString("zh-CN")}</strong> 人完成报到 · 不收集个人资料
          </>
        )}
      </small>
    </div>
  );
}
