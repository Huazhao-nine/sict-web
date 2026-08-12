"use client";

import { useSyncExternalStore } from "react";

const pledgeKey = "sict-guide-pledged";

export function PledgeButton() {
  const pledged = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("sict-pledge", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("sict-pledge", onStoreChange);
      };
    },
    () => window.localStorage.getItem(pledgeKey) === "true",
    () => false,
  );

  function pledge() {
    window.localStorage.setItem(pledgeKey, "true");
    window.dispatchEvent(new Event("sict-pledge"));
  }

  return (
    <div className="pledge-action">
      <button type="button" aria-pressed={pledged} onClick={pledge}>
        {pledged ? "✓ 已向沈计所报到" : "⚔ 对沈计所效忠"}
      </button>
      <p role="status" aria-live="polite">
        {pledged ? "决心已收到，祝你备考顺利、成功上岸。" : "轻松点一下，为自己的选择留个纪念。"}
      </p>
      <small>状态仅保存在当前浏览器，不上传个人信息。</small>
    </div>
  );
}
