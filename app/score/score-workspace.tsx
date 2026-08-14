"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Step = "login" | "callback" | "email" | "score" | "review";

type AuthUser = {
  nickname: string;
  avatar?: string;
};

type ScoreForm = {
  degreeType: "academic" | "professional";
  studyMode: "full-time" | "part-time";
  politics: string;
  english: string;
  mathematics: string;
  subject: string;
};

const initialForm: ScoreForm = {
  degreeType: "academic",
  studyMode: "full-time",
  politics: "",
  english: "",
  mathematics: "",
  subject: "",
};

const steps: Array<{ key: Step; label: string }> = [
  { key: "login", label: "QQ 身份" },
  { key: "email", label: "邮箱验证" },
  { key: "score", label: "填写成绩" },
  { key: "review", label: "确认提交" },
];

function numberInRange(value: string, max: number) {
  if (value.trim() === "") return false;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 && parsed <= max;
}

function scoreLabel(form: ScoreForm) {
  if (form.degreeType === "academic") return "计算机科学与技术（学硕）";
  return `计算机技术（专硕 · ${form.studyMode === "full-time" ? "全日制" : "非全日制"}）`;
}

const oauthStateKey = "sict:qq-oauth-state";
const authTokenKey = "sict:auth-token";
const authUserKey = "sict:auth-user";

function createOauthState() {
  const values = new Uint32Array(4);
  window.crypto.getRandomValues(values);
  return Array.from(values, (value) => value.toString(16).padStart(8, "0")).join("");
}

export function ScoreWorkspace({
  apiBaseUrl,
  qqCallbackUrl,
  qqClientId,
}: {
  apiBaseUrl: string;
  qqCallbackUrl: string;
  qqClientId: string | null;
}) {
  const [step, setStep] = useState<Step>("login");
  const [callbackState, setCallbackState] = useState<"loading" | "ready" | "error">("loading");
  const [callbackMessage, setCallbackMessage] = useState("正在确认 QQ 授权，请稍候。");
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    const savedUser = window.localStorage.getItem(authUserKey);
    if (!savedUser) return null;
    try {
      return JSON.parse(savedUser);
    } catch {
      window.localStorage.removeItem(authUserKey);
      return null;
    }
  });
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codePreviewed, setCodePreviewed] = useState(false);
  const [form, setForm] = useState<ScoreForm>(initialForm);
  const [consented, setConsented] = useState(false);

  const currentIndex = step === "callback" ? 0 : steps.findIndex((item) => item.key === step);
  const total = useMemo(
    () => [form.politics, form.english, form.mathematics, form.subject]
      .reduce((sum, value) => sum + (Number(value) || 0), 0),
    [form],
  );
  const scoreValid = numberInRange(form.politics, 100)
    && numberInRange(form.english, 100)
    && numberInRange(form.mathematics, 150)
    && numberInRange(form.subject, 150);
  const emailValid = /^[1-9]\d{4,11}@qq\.com$/i.test(email.trim());

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#/auth/callback")) return;

    const query = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
    const params = new URLSearchParams(query);
    const ticket = params.get("ticket");
    const returnedState = params.get("state");
    const expectedState = window.sessionStorage.getItem(oauthStateKey);
    const stateMatches = Boolean(returnedState && expectedState && returnedState === expectedState);
    window.sessionStorage.removeItem(oauthStateKey);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    const controller = new AbortController();
    const redeem = async () => {
      setStep("callback");
      if (!ticket || !stateMatches || params.has("error")) {
        setCallbackState("error");
        setCallbackMessage("登录票据缺失或 state 校验失败，请重新发起 QQ 登录。");
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/auth/session`, {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          body: JSON.stringify({ ticket, state: returnedState }),
          signal: controller.signal,
        });
        const result = await response.json();
        const token = result?.data?.token;
        const user = result?.data?.user as AuthUser | undefined;
        if (!response.ok || result?.code !== 200 || !token || !user?.nickname) {
          throw new Error(result?.msg || "服务器未能建立沈计登录状态");
        }

        window.localStorage.setItem(authTokenKey, token);
        window.localStorage.setItem(authUserKey, JSON.stringify(user));
        setAuthUser(user);
        setCallbackState("ready");
        setCallbackMessage(`已确认 QQ 身份：${user.nickname}`);
      } catch (error) {
        if (controller.signal.aborted) return;
        setCallbackState("error");
        setCallbackMessage(error instanceof Error ? error.message : "QQ 登录确认失败，请重试。");
      }
    };
    void redeem();
    return () => controller.abort();
  }, [apiBaseUrl]);

  function updateScore(field: keyof ScoreForm, value: string) {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "degreeType" && value === "academic") next.studyMode = "full-time";
      return next;
    });
  }

  function beginQqLogin() {
    if (!qqClientId) return;

    const state = createOauthState();
    window.sessionStorage.setItem(oauthStateKey, state);
    const params = new URLSearchParams({
      response_type: "code",
      client_id: qqClientId,
      redirect_uri: qqCallbackUrl,
      state,
    });
    window.location.assign(`https://graph.qq.com/oauth2.0/authorize?${params.toString()}`);
  }

  function previewEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!emailValid || !codePreviewed || !/^\d{6}$/.test(code)) return;
    setStep("score");
  }

  function previewScore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!scoreValid || !consented) return;
    setStep("review");
  }

  function resetPreview() {
    setStep("login");
    setEmail("");
    setCode("");
    setCodePreviewed(false);
    setForm(initialForm);
    setConsented(false);
  }

  function leaveCallback() {
    setStep("login");
  }

  function logoutSict() {
    window.localStorage.removeItem(authTokenKey);
    window.localStorage.removeItem(authUserKey);
    setAuthUser(null);
    setStep("login");
  }

  return (
    <div className="score-workspace">
      <section className="score-entry-card" aria-live="polite">
        <ol className="score-stepper" aria-label="登分步骤">
          {steps.map((item, index) => (
            <li className={index === currentIndex ? "is-current" : index < currentIndex ? "is-complete" : ""} key={item.key}>
              <span>{index < currentIndex ? "✓" : index + 1}</span>
              <strong>{item.label}</strong>
            </li>
          ))}
        </ol>

        <div className="score-panel">
          {step === "login" ? (
            <div className="score-login-panel">
              <p className="score-panel-kicker">STEP 01 · IDENTITY</p>
              <h3>先确认一个稳定的 QQ 身份</h3>
              <p className="score-panel-lead">
                QQ 只用于识别和管理你自己的记录。公开统计不会显示昵称、头像、邮箱或账号标识。
              </p>

              {authUser ? (
                <div className="score-separation-card is-authenticated">
                  <span className="score-identity-mark">QQ</span>
                  <div><strong>{authUser.nickname}</strong><small>已通过沈计专用 QQ 会话确认</small></div>
                  <b>VERIFIED</b>
                </div>
              ) : (
                <div className="score-separation-card">
                  <span className="score-identity-mark">沈</span>
                  <div><strong>沈计专用登录状态</strong><small>与 FlowerInFire 博客页面和权限分开</small></div>
                  <b>SICT ONLY</b>
                </div>
              )}

              {!authUser ? (
                <div className="score-auth-path" aria-label="QQ 登录授权路径">
                  <p><strong>授权完成后，经 FlowerInFire Hash 回调返回</strong><small>/#/sict/auth/callback</small></p>
                  <ol>
                    <li><span>01</span><b>沈计登分</b></li>
                    <li><span>02</span><b>QQ 授权</b></li>
                    <li><span>03</span><b>一次性票据</b></li>
                    <li><span>04</span><b>独立会话</b></li>
                  </ol>
                </div>
              ) : null}

              {authUser ? (
                <button className="score-primary-action" onClick={() => setStep("email")} type="button">
                  继续绑定 QQ 邮箱 <span>→</span>
                </button>
              ) : qqClientId ? (
                <button className="score-primary-action" onClick={beginQqLogin} type="button">使用 QQ 登录 <span>↗</span></button>
              ) : (
                <button className="score-primary-action" type="button" disabled>
                  使用 QQ 安全登录 · 待接入
                </button>
              )}
              {authUser ? (
                <button className="score-preview-action" type="button" onClick={logoutSict}>退出沈计登录</button>
              ) : (
                <button className="score-preview-action" type="button" onClick={() => setStep("email")}>
                  进入本地交互预览
                </button>
              )}
              <p className="score-demo-note">沈计会话使用独立前缀保存，不读取博客 token 或用户资料。</p>
            </div>
          ) : null}

          {step === "callback" ? (
            <div className="score-callback-panel">
              <p className="score-panel-kicker">QQ OAUTH · BRIDGE CALLBACK</p>
              <h3>{callbackState === "loading" ? "正在建立沈计会话" : callbackState === "ready" ? "QQ 登录成功" : "未取得有效授权结果"}</h3>
              <p className="score-panel-lead">
                {callbackMessage}
              </p>
              <div className={`score-callback-status ${callbackState === "ready" ? "is-ready" : callbackState === "error" ? "is-error" : "is-loading"}`}>
                <span>{callbackState === "loading" ? "…" : callbackState === "ready" ? "✓" : "!"}</span>
                <div>
                  <strong>{callbackState === "loading" ? "正在兑换一次性票据" : callbackState === "ready" ? "沈计独立会话已建立" : "独立回调链路识别失败"}</strong>
                  <small>票据只能使用一次；不会写入博客登录状态</small>
                </div>
              </div>
              {callbackState === "ready" ? (
                <button className="score-primary-action" type="button" onClick={() => setStep("email")}>继续绑定 QQ 邮箱</button>
              ) : callbackState === "error" ? (
                <button className="score-primary-action" type="button" onClick={leaveCallback}>返回沈计登录</button>
              ) : null}
            </div>
          ) : null}

          {step === "email" ? (
            <form className="score-form" onSubmit={previewEmail}>
              <p className="score-panel-kicker">STEP 02 · EMAIL</p>
              <h3>绑定并验证 QQ 邮箱</h3>
              <p className="score-panel-lead">邮箱只用于账号恢复和必要通知，不进入公开登分数据。</p>

              <label className="score-field">
                <span>QQ 邮箱</span>
                <input
                  autoComplete="email"
                  inputMode="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="例如 123456789@qq.com"
                  value={email}
                />
                {email && !emailValid ? <small className="score-field-error">请输入数字 QQ 邮箱</small> : null}
              </label>

              <div className="score-code-row">
                <label className="score-field">
                  <span>六位验证码</span>
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    value={code}
                  />
                </label>
                <button
                  className="score-code-button"
                  disabled={!emailValid || codePreviewed}
                  onClick={() => setCodePreviewed(true)}
                  type="button"
                >
                  {codePreviewed ? "演示码已生成" : "预览发送验证码"}
                </button>
              </div>
              {codePreviewed ? <p className="score-inline-notice">演示模式不会发送邮件，请输入任意六位数字继续。</p> : null}

              <div className="score-form-actions">
                <button type="button" onClick={() => setStep("login")}>返回</button>
                <button className="is-primary" disabled={!emailValid || !codePreviewed || !/^\d{6}$/.test(code)} type="submit">验证并继续</button>
              </div>
            </form>
          ) : null}

          {step === "score" ? (
            <form className="score-form" onSubmit={previewScore}>
              <p className="score-panel-kicker">STEP 03 · SCORE</p>
              <h3>登记 2027 年初试成绩</h3>
              <p className="score-panel-lead">请选择实际报考类型。总分只由系统重新计算，不接受手动填写。</p>

              <div className="score-option-grid">
                <div className={form.degreeType === "academic" ? "is-selected" : ""}>
                  <input checked={form.degreeType === "academic"} id="score-degree-academic" name="degreeType" onChange={() => updateScore("degreeType", "academic")} type="radio" />
                  <label htmlFor="score-degree-academic"><strong>学术型硕士</strong><small>计算机科学与技术 · 全日制</small></label>
                </div>
                <div className={form.degreeType === "professional" ? "is-selected" : ""}>
                  <input checked={form.degreeType === "professional"} id="score-degree-professional" name="degreeType" onChange={() => updateScore("degreeType", "professional")} type="radio" />
                  <label htmlFor="score-degree-professional"><strong>专业型硕士</strong><small>计算机技术 · 全日制或非全</small></label>
                </div>
              </div>

              {form.degreeType === "professional" ? (
                <label className="score-field score-mode-field">
                  <span>学习方式</span>
                  <select value={form.studyMode} onChange={(event) => updateScore("studyMode", event.target.value)}>
                    <option value="full-time">全日制</option>
                    <option value="part-time">非全日制</option>
                  </select>
                </label>
              ) : null}

              <div className="score-number-grid">
                <ScoreInput label="政治" max={100} value={form.politics} onChange={(value) => updateScore("politics", value)} />
                <ScoreInput label="英语" max={100} value={form.english} onChange={(value) => updateScore("english", value)} />
                <ScoreInput label="数学" max={150} value={form.mathematics} onChange={(value) => updateScore("mathematics", value)} />
                <ScoreInput label="408" max={150} value={form.subject} onChange={(value) => updateScore("subject", value)} />
              </div>

              <div className="score-total-card">
                <span>系统计算总分</span>
                <strong>{total}<small> / 500</small></strong>
                <p>{scoreValid ? "分数范围检查通过" : "请完整填写四科成绩"}</p>
              </div>

              <label className="score-consent">
                <input checked={consented} onChange={(event) => setConsented(event.target.checked)} type="checkbox" />
                <span>我已了解这是民间样本统计，填写内容会在真实系统中经过人工审核。</span>
              </label>

              <div className="score-form-actions">
                <button type="button" onClick={() => setStep("email")}>返回</button>
                <button className="is-primary" disabled={!scoreValid || !consented} type="submit">预览提交内容</button>
              </div>
            </form>
          ) : null}

          {step === "review" ? (
            <div className="score-review-panel">
              <p className="score-panel-kicker">STEP 04 · REVIEW</p>
              <h3>确认本次登记内容</h3>
              <div className="score-review-total">
                <span>初试总分</span>
                <strong>{total}<small> 分</small></strong>
                <p>{scoreLabel(form)}</p>
              </div>
              <dl className="score-review-subjects">
                <div><dt>政治</dt><dd>{form.politics}</dd></div>
                <div><dt>英语</dt><dd>{form.english}</dd></div>
                <div><dt>数学</dt><dd>{form.mathematics}</dd></div>
                <div><dt>408</dt><dd>{form.subject}</dd></div>
              </dl>
              <div className="score-preview-warning">
                <strong>本次不会真正提交</strong>
                <p>这是前端交互预览，成绩、邮箱和演示身份均未发送到服务器。</p>
              </div>
              <div className="score-form-actions">
                <button type="button" onClick={() => setStep("score")}>返回修改</button>
                <button className="is-primary" type="button" onClick={resetPreview}>结束预览</button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <aside className="score-stat-card" aria-label="民间登分统计预览">
        <header>
          <div><span>2027 民间样本</span><strong>实时统计</strong></div>
          <b>尚未开放</b>
        </header>
        <div className="score-stat-primary">
          <span>审核通过样本</span>
          <strong>—</strong>
          <small>开放后显示</small>
        </div>
        <div className="score-stat-grid">
          <div><span>中位数</span><strong>—</strong></div>
          <div><span>平均分</span><strong>—</strong></div>
          <div><span>340+</span><strong>—</strong></div>
          <div><span>最高分</span><strong>—</strong></div>
        </div>
        <div className="score-stat-boundary">
          <strong>公开边界</strong>
          <p>只统计审核通过记录；样本不足的分组不展示细分结果。</p>
        </div>
        <ol className="score-stat-process">
          <li><span>01</span><p><strong>提交</strong><small>进入待审核队列</small></p></li>
          <li><span>02</span><p><strong>核对</strong><small>排除异常与重复记录</small></p></li>
          <li><span>03</span><p><strong>统计</strong><small>仅发布匿名聚合结果</small></p></li>
        </ol>
      </aside>
    </div>
  );
}

function ScoreInput({ label, max, value, onChange }: { label: string; max: number; value: string; onChange: (value: string) => void }) {
  const invalid = value !== "" && !numberInRange(value, max);
  return (
    <label className={`score-field score-number-field${invalid ? " is-invalid" : ""}`}>
      <span>{label}<small>0–{max}</small></span>
      <input
        inputMode="numeric"
        max={max}
        min={0}
        onChange={(event) => onChange(event.target.value)}
        placeholder="—"
        type="number"
        value={value}
      />
    </label>
  );
}
