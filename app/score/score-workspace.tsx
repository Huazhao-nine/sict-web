"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Step = "login" | "callback" | "profile" | "score" | "review" | "done";

type AuthUser = {
  nickname: string;
  avatar?: string;
};

type ScoreForm = {
  name: string;
  school: string;
  candidateNumber: string;
  email: string;
  degreeType: "academic" | "professional";
  studyMode: "full-time" | "part-time";
  politics: string;
  english: string;
  mathematics: string;
  subjectScore: string;
};

type Submission = {
  examYear: number;
  name: string;
  school: string;
  candidateNumber: string;
  email?: string;
  degreeType: ScoreForm["degreeType"];
  studyMode: ScoreForm["studyMode"];
  politics: number;
  english: number;
  mathematics: number;
  subjectScore: number;
  totalScore: number;
  proofReceived: boolean;
  proofContentType?: string;
  status: string;
  statusLabel: string;
  submittedAt?: string;
  updatedAt?: string;
};

type ScoreStats = {
  submittedCount: number;
  approvedCount: number;
  statsReady: boolean;
  minimumSample: number;
  average?: number;
  median?: number;
  highest?: number;
  count340?: number;
};

const initialForm: ScoreForm = {
  name: "",
  school: "",
  candidateNumber: "",
  email: "",
  degreeType: "academic",
  studyMode: "full-time",
  politics: "",
  english: "",
  mathematics: "",
  subjectScore: "",
};

const steps: Array<{ key: Step; label: string }> = [
  { key: "login", label: "QQ 登录" },
  { key: "profile", label: "考生信息" },
  { key: "score", label: "成绩证明" },
  { key: "review", label: "确认提交" },
];

const oauthStateKey = "sict:qq-oauth-state";
const authTokenKey = "sict:auth-token";
const authUserKey = "sict:auth-user";
const maxProofSize = 8 * 1024 * 1024;

function numberInRange(value: string, max: number) {
  if (value.trim() === "") return false;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 && parsed <= max;
}

function scoreLabel(form: ScoreForm) {
  if (form.degreeType === "academic") return "计算机科学与技术（学硕 · 全日制）";
  return `计算机技术（专硕 · ${form.studyMode === "full-time" ? "全日制" : "非全日制"}）`;
}

function createOauthState() {
  const values = new Uint32Array(4);
  window.crypto.getRandomValues(values);
  return Array.from(values, (value) => value.toString(16).padStart(8, "0")).join("");
}

function savedAuthUser() {
  if (typeof window === "undefined") return null;
  if (!window.localStorage.getItem(authTokenKey)) {
    window.localStorage.removeItem(authUserKey);
    return null;
  }
  const value = window.localStorage.getItem(authUserKey);
  if (!value) return null;
  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    window.localStorage.removeItem(authUserKey);
    return null;
  }
}

function savedAuthToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(authTokenKey);
}

async function readResult(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(response.ok ? "服务器返回了无法识别的数据" : text || "请求未成功");
  }
}

function submissionForm(submission: Submission): ScoreForm {
  return {
    name: submission.name,
    school: submission.school,
    candidateNumber: submission.candidateNumber,
    email: submission.email ?? "",
    degreeType: submission.degreeType,
    studyMode: submission.studyMode,
    politics: String(submission.politics),
    english: String(submission.english),
    mathematics: String(submission.mathematics),
    subjectScore: String(submission.subjectScore),
  };
}

function maskedCandidateNumber(value: string) {
  if (value.length <= 8) return value;
  return `${value.slice(0, 4)}••••••${value.slice(-4)}`;
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
  const [authUser, setAuthUser] = useState<AuthUser | null>(savedAuthUser);
  const [authToken, setAuthToken] = useState<string | null>(savedAuthToken);
  const [form, setForm] = useState<ScoreForm>(initialForm);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofError, setProofError] = useState("");
  const [consented, setConsented] = useState(false);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [stats, setStats] = useState<ScoreStats | null>(null);
  const [recordLoading, setRecordLoading] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const currentIndex = step === "callback" ? 0 : step === "done" ? steps.length : steps.findIndex((item) => item.key === step);
  const total = useMemo(
    () => [form.politics, form.english, form.mathematics, form.subjectScore]
      .reduce((sum, value) => sum + (Number(value) || 0), 0),
    [form],
  );
  const profileValid = form.name.trim().length >= 2
    && form.school.trim().length >= 2
    && /^[A-Za-z0-9]{8,32}$/.test(form.candidateNumber.trim())
    && (!form.email.trim() || /^[1-9]\d{4,11}@qq\.com$/i.test(form.email.trim()));
  const scoreValid = numberInRange(form.politics, 100)
    && numberInRange(form.english, 100)
    && numberInRange(form.mathematics, 150)
    && numberInRange(form.subjectScore, 150);
  const proofRelevantFieldsChanged = Boolean(submission && (
    form.candidateNumber.trim() !== submission.candidateNumber
    || form.degreeType !== submission.degreeType
    || form.studyMode !== submission.studyMode
    || Number(form.politics) !== submission.politics
    || Number(form.english) !== submission.english
    || Number(form.mathematics) !== submission.mathematics
    || Number(form.subjectScore) !== submission.subjectScore
  ));
  const proofReady = Boolean(proofFile || (submission?.proofReceived && !proofRelevantFieldsChanged));

  useEffect(() => {
    const controller = new AbortController();
    const loadStats = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/score/stats?year=2027`, { signal: controller.signal });
        const result = await readResult(response);
        if (result?.code === 200 && result?.data) setStats(result.data as ScoreStats);
      } catch {
        // 统计卡片失败不阻断登分。
      }
    };
    void loadStats();
    return () => controller.abort();
  }, [apiBaseUrl]);

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
        setCallbackMessage("登录票据缺失或安全校验失败，请重新发起 QQ 登录。");
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/auth/session`, {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          body: JSON.stringify({ ticket, state: returnedState }),
          signal: controller.signal,
        });
        const result = await readResult(response);
        const token = result?.data?.token as string | undefined;
        const user = result?.data?.user as AuthUser | undefined;
        if (!response.ok || result?.code !== 200 || !token || !user?.nickname) {
          throw new Error(result?.msg || "服务器未能建立沈计登录状态");
        }

        window.localStorage.setItem(authTokenKey, token);
        window.localStorage.setItem(authUserKey, JSON.stringify(user));
        setAuthToken(token);
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

  useEffect(() => {
    if (!authToken) return;
    const controller = new AbortController();
    const loadMine = async () => {
      setRecordLoading(true);
      try {
        const headers = { Authorization: `Bearer ${authToken}` };
        const sessionResponse = await fetch(`${apiBaseUrl}/auth/me`, { headers, signal: controller.signal });
        const sessionResult = await readResult(sessionResponse);
        if (sessionResult?.code !== 200) throw new Error("登录状态已过期");
        const currentUser = sessionResult?.data?.user as AuthUser | undefined;
        if (currentUser?.nickname) {
          setAuthUser(currentUser);
          window.localStorage.setItem(authUserKey, JSON.stringify(currentUser));
        }

        const response = await fetch(`${apiBaseUrl}/score/me?year=2027`, { headers, signal: controller.signal });
        const result = await readResult(response);
        if (result?.code !== 200) throw new Error(result?.msg || "无法读取你的登分记录");
        const existing = result?.data?.submission as Submission | null;
        setSubmission(existing);
        if (existing) setForm(submissionForm(existing));
      } catch (error) {
        if (controller.signal.aborted) return;
        if (error instanceof Error && error.message.includes("登录状态")) clearSession();
        else setSubmitMessage(error instanceof Error ? error.message : "无法读取登分记录");
      } finally {
        if (!controller.signal.aborted) setRecordLoading(false);
      }
    };
    void loadMine();
    return () => controller.abort();
  }, [apiBaseUrl, authToken]);

  function updateField(field: keyof ScoreForm, value: string) {
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

  function selectProof(file: File | null) {
    setProofError("");
    if (!file) {
      setProofFile(null);
      return;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowed.includes(file.type)) {
      setProofError("仅支持 JPG、PNG、WebP 或 PDF 文件");
      return;
    }
    if (file.size > maxProofSize) {
      setProofError("成绩证明文件不能超过 8MB");
      return;
    }
    setProofFile(file);
  }

  function continueProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (profileValid) setStep("score");
  }

  function reviewScore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (scoreValid && proofReady && consented) setStep("review");
  }

  async function submitScore() {
    if (!authToken || submitState === "sending") return;
    setSubmitState("sending");
    setSubmitMessage("");
    try {
      const payload = {
        examYear: 2027,
        name: form.name.trim(),
        school: form.school.trim(),
        candidateNumber: form.candidateNumber.trim(),
        email: form.email.trim(),
        degreeType: form.degreeType,
        studyMode: form.studyMode,
        politics: Number(form.politics),
        english: Number(form.english),
        mathematics: Number(form.mathematics),
        subjectScore: Number(form.subjectScore),
        consented,
      };
      const body = new FormData();
      body.append("payload", new Blob([JSON.stringify(payload)], { type: "application/json" }));
      if (proofFile) body.append("proof", proofFile);

      const response = await fetch(`${apiBaseUrl}/score`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body,
      });
      const result = await readResult(response);
      if (!response.ok || result?.code !== 200 || !result?.data) {
        if (result?.code === 401) clearSession();
        throw new Error(result?.msg || "登分提交失败");
      }
      const saved = result.data as Submission;
      setSubmission(saved);
      setForm(submissionForm(saved));
      setProofFile(null);
      setSubmitState("idle");
      setSubmitMessage(result?.msg || "登分已提交");
      setStep("done");
      setStats((current) => current ? { ...current, submittedCount: current.submittedCount + (submission ? 0 : 1) } : current);
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "登分提交失败，请稍后重试");
    }
  }

  function startEntry() {
    setSubmitMessage("");
    setProofError("");
    setConsented(Boolean(submission));
    setStep("profile");
  }

  function clearSession() {
    window.localStorage.removeItem(authTokenKey);
    window.localStorage.removeItem(authUserKey);
    setAuthToken(null);
    setAuthUser(null);
    setSubmission(null);
    setForm(initialForm);
    setProofFile(null);
    setStep("login");
  }

  async function logoutSict() {
    if (authToken) {
      void fetch(`${apiBaseUrl}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      }).catch(() => undefined);
    }
    clearSession();
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
            <div>
              <p className="score-panel-kicker">STEP 01 · SIGN IN</p>
              <h3>登录后登记你的真实成绩</h3>
              <p className="score-panel-lead">QQ 仅用于识别和维护你自己的记录。这里的登录与 FlowerInFire 博客账号完全分开。</p>

              <div className={`score-separation-card${authUser ? " is-authenticated" : ""}`}>
                <span className="score-identity-mark">{authUser ? "QQ" : "沈"}</span>
                <div>
                  <strong>{authUser?.nickname ?? "尚未登录沈计登分"}</strong>
                  <small>{authUser ? "身份已确认，可以填写或更新登分记录" : "授权后只建立沈计专用会话"}</small>
                </div>
                <b>{authUser ? "VERIFIED" : "SICT ONLY"}</b>
              </div>

              {submission ? (
                <div className="score-existing-record">
                  <span>2027 已提交</span>
                  <strong>{submission.totalScore} 分 · {submission.statusLabel}</strong>
                  <p>{scoreLabel(submissionForm(submission))}</p>
                </div>
              ) : null}

              {authUser ? (
                <button className="score-primary-action" disabled={recordLoading} onClick={startEntry} type="button">
                  {recordLoading ? "正在读取记录" : submission ? "查看并更新我的登分" : "开始填写登分"}<span>→</span>
                </button>
              ) : qqClientId ? (
                <button className="score-primary-action" onClick={beginQqLogin} type="button">使用 QQ 登录 <span>↗</span></button>
              ) : (
                <button className="score-primary-action" type="button" disabled>QQ 登录暂不可用</button>
              )}
              {authUser ? <button className="score-preview-action" type="button" onClick={logoutSict}>退出沈计登录</button> : null}
              {submitMessage ? <p className="score-inline-notice">{submitMessage}</p> : null}
              <p className="score-demo-note">公开页面不会展示姓名、学校、准考证号、QQ 信息或成绩证明。</p>
            </div>
          ) : null}

          {step === "callback" ? (
            <div>
              <p className="score-panel-kicker">QQ OAUTH · CALLBACK</p>
              <h3>{callbackState === "loading" ? "正在建立沈计会话" : callbackState === "ready" ? "QQ 登录成功" : "未取得有效授权结果"}</h3>
              <p className="score-panel-lead">{callbackMessage}</p>
              <div className={`score-callback-status is-${callbackState}`}>
                <span>{callbackState === "loading" ? "…" : callbackState === "ready" ? "✓" : "!"}</span>
                <div>
                  <strong>{callbackState === "loading" ? "正在兑换一次性票据" : callbackState === "ready" ? "身份确认完成" : "授权返回未完成"}</strong>
                  <small>一次性票据不会写入博客登录状态</small>
                </div>
              </div>
              {callbackState === "ready" ? (
                <button className="score-primary-action" type="button" onClick={startEntry}>填写考生信息 <span>→</span></button>
              ) : callbackState === "error" ? (
                <button className="score-primary-action" type="button" onClick={() => setStep("login")}>返回重新登录</button>
              ) : null}
            </div>
          ) : null}

          {step === "profile" ? (
            <form className="score-form" onSubmit={continueProfile}>
              <p className="score-panel-kicker">STEP 02 · CANDIDATE</p>
              <h3>填写考生信息</h3>
              <p className="score-panel-lead">这些信息用于核对重复记录和成绩证明，只对维护者可见，不进入公开统计。</p>

              <div className="score-private-note"><strong>隐私字段已加密保存</strong><span>姓名、学校、准考证号与联系邮箱不会明文进入公开数据。</span></div>
              <div className="score-profile-grid">
                <TextField label="姓名" value={form.name} onChange={(value) => updateField("name", value)} placeholder="与成绩单一致" autoComplete="name" />
                <TextField label="本科院校" value={form.school} onChange={(value) => updateField("school", value)} placeholder="填写学校全称" />
              </div>
              <TextField label="准考证号" note="8–32 位数字或字母" value={form.candidateNumber} onChange={(value) => updateField("candidateNumber", value.replace(/\s/g, ""))} placeholder="用于核验与去重" inputMode="numeric" />
              <TextField label="QQ 邮箱（选填）" note="仅用于必要联系" value={form.email} onChange={(value) => updateField("email", value.replace(/\s/g, ""))} placeholder="例如 123456789@qq.com" inputMode="email" autoComplete="email" />

              <div className="score-form-actions">
                <button type="button" onClick={() => setStep("login")}>返回</button>
                <button className="is-primary" disabled={!profileValid} type="submit">继续填写成绩</button>
              </div>
            </form>
          ) : null}

          {step === "score" ? (
            <form className="score-form" onSubmit={reviewScore}>
              <p className="score-panel-kicker">STEP 03 · SCORE & PROOF</p>
              <h3>填写初试成绩并上传证明</h3>
              <p className="score-panel-lead">请按研招网成绩查询页面填写。总分由系统计算，证明文件仅用于人工核验。</p>

              <div className="score-option-grid">
                <div className={form.degreeType === "academic" ? "is-selected" : ""}>
                  <input checked={form.degreeType === "academic"} id="score-degree-academic" name="degreeType" onChange={() => updateField("degreeType", "academic")} type="radio" />
                  <label htmlFor="score-degree-academic"><strong>学术型硕士</strong><small>计算机科学与技术 · 全日制</small></label>
                </div>
                <div className={form.degreeType === "professional" ? "is-selected" : ""}>
                  <input checked={form.degreeType === "professional"} id="score-degree-professional" name="degreeType" onChange={() => updateField("degreeType", "professional")} type="radio" />
                  <label htmlFor="score-degree-professional"><strong>专业型硕士</strong><small>计算机技术 · 全日制或非全日制</small></label>
                </div>
              </div>

              {form.degreeType === "professional" ? (
                <label className="score-field score-mode-field">
                  <span>学习方式</span>
                  <select value={form.studyMode} onChange={(event) => updateField("studyMode", event.target.value)}>
                    <option value="full-time">全日制</option>
                    <option value="part-time">非全日制</option>
                  </select>
                </label>
              ) : null}

              <div className="score-number-grid">
                <ScoreInput label="政治" max={100} value={form.politics} onChange={(value) => updateField("politics", value)} />
                <ScoreInput label="英语" max={100} value={form.english} onChange={(value) => updateField("english", value)} />
                <ScoreInput label="数学" max={150} value={form.mathematics} onChange={(value) => updateField("mathematics", value)} />
                <ScoreInput label="408" max={150} value={form.subjectScore} onChange={(value) => updateField("subjectScore", value)} />
              </div>

              <div className="score-total-card">
                <span>系统计算总分</span>
                <strong>{total}<small> / 500</small></strong>
                <p>{scoreValid ? "分数范围检查通过" : "请完整填写四科成绩"}</p>
              </div>

              <label className={`score-file-drop${proofFile ? " has-file" : ""}`}>
                <input accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => selectProof(event.target.files?.[0] ?? null)} type="file" />
                <span className="score-file-mark">＋</span>
                <span>
                  <strong>{proofFile ? proofFile.name : proofRelevantFieldsChanged ? "成绩信息已变化，请上传新的证明" : submission?.proofReceived ? "已有成绩证明，可重新上传替换" : "上传研招网成绩截图或 PDF"}</strong>
                  <small>{proofFile ? `${(proofFile.size / 1024 / 1024).toFixed(2)} MB · 提交后进入人工核验` : "支持 JPG、PNG、WebP、PDF，文件不超过 8MB"}</small>
                </span>
              </label>
              {proofError ? <p className="score-field-error score-file-error">{proofError}</p> : null}
              {submission?.proofReceived && !proofFile && !proofRelevantFieldsChanged ? <p className="score-inline-notice">本次未修改成绩相关信息，将保留已经提交的成绩证明。</p> : null}

              <label className="score-consent">
                <input checked={consented} onChange={(event) => setConsented(event.target.checked)} type="checkbox" />
                <span>我确认以上内容真实，并同意维护者仅为重复检查、成绩核验和匿名统计处理这些信息。</span>
              </label>

              <div className="score-form-actions">
                <button type="button" onClick={() => setStep("profile")}>返回</button>
                <button className="is-primary" disabled={!scoreValid || !proofReady || !consented || Boolean(proofError)} type="submit">核对提交内容</button>
              </div>
            </form>
          ) : null}

          {step === "review" ? (
            <div>
              <p className="score-panel-kicker">STEP 04 · REVIEW</p>
              <h3>最后核对一次</h3>
              <div className="score-review-identity">
                <div><span>姓名</span><strong>{form.name}</strong></div>
                <div><span>本科院校</span><strong>{form.school}</strong></div>
                <div><span>准考证号</span><strong>{maskedCandidateNumber(form.candidateNumber)}</strong></div>
                <div><span>成绩证明</span><strong>{proofFile ? "将上传新文件" : "保留已有文件"}</strong></div>
              </div>
              <div className="score-review-total">
                <span>2027 年初试总分</span>
                <strong>{total}<small> 分</small></strong>
                <p>{scoreLabel(form)}</p>
              </div>
              <dl className="score-review-subjects">
                <div><dt>政治</dt><dd>{form.politics}</dd></div>
                <div><dt>英语</dt><dd>{form.english}</dd></div>
                <div><dt>数学</dt><dd>{form.mathematics}</dd></div>
                <div><dt>408</dt><dd>{form.subjectScore}</dd></div>
              </dl>
              <div className="score-preview-warning is-real-submit">
                <strong>提交后会真实保存</strong>
                <p>记录将进入待核验状态。再次提交会更新同一条记录，不会新增重复样本。</p>
              </div>
              {submitMessage ? <p className="score-submit-error">{submitMessage}</p> : null}
              <div className="score-form-actions">
                <button disabled={submitState === "sending"} type="button" onClick={() => setStep("score")}>返回修改</button>
                <button className="is-primary" disabled={submitState === "sending"} type="button" onClick={submitScore}>
                  {submitState === "sending" ? "正在安全提交…" : submission ? "确认更新登分" : "确认提交登分"}
                </button>
              </div>
            </div>
          ) : null}

          {step === "done" && submission ? (
            <div className="score-success-panel">
              <span className="score-success-mark">✓</span>
              <p className="score-panel-kicker">SUBMITTED · 2027</p>
              <h3>{submitMessage || "登分提交成功"}</h3>
              <p className="score-panel-lead">你的记录已安全保存，目前状态为<strong>“{submission.statusLabel}”</strong>。核验通过后才会进入匿名统计。</p>
              <div className="score-existing-record is-success">
                <span>我的初试成绩</span>
                <strong>{submission.totalScore} 分</strong>
                <p>{scoreLabel(form)} · 成绩证明已接收</p>
              </div>
              <button className="score-primary-action" type="button" onClick={startEntry}>查看或修改记录 <span>→</span></button>
              <button className="score-preview-action" type="button" onClick={() => setStep("login")}>返回登分首页</button>
            </div>
          ) : null}
        </div>
      </section>

      <aside className="score-stat-card" aria-label="2027 民间登分统计">
        <header>
          <div><span>2027 民间样本</span><strong>匿名统计</strong></div>
          <b>开放中</b>
        </header>
        <div className="score-stat-primary">
          <span>已提交样本</span>
          <strong>{stats?.submittedCount ?? "—"}</strong>
          <small>含等待核验记录</small>
        </div>
        <div className="score-stat-grid">
          <div><span>核验通过</span><strong>{stats?.approvedCount ?? "—"}</strong></div>
          <div><span>平均分</span><strong>{stats?.statsReady ? stats.average : "—"}</strong></div>
          <div><span>中位数</span><strong>{stats?.statsReady ? stats.median : "—"}</strong></div>
          <div><span>最高分</span><strong>{stats?.statsReady ? stats.highest : "—"}</strong></div>
        </div>
        <div className="score-stat-boundary">
          <strong>统计边界</strong>
          <p>核验通过不足 {stats?.minimumSample ?? 5} 份时不展示成绩分布；所有数字都只是本站自愿样本。</p>
        </div>
        <ol className="score-stat-process">
          <li><span>01</span><p><strong>实名登记</strong><small>信息加密保存</small></p></li>
          <li><span>02</span><p><strong>证明核验</strong><small>排除重复异常</small></p></li>
          <li><span>03</span><p><strong>匿名统计</strong><small>不公开单条记录</small></p></li>
        </ol>
      </aside>
    </div>
  );
}

function TextField({
  label,
  note,
  value,
  onChange,
  placeholder,
  inputMode,
  autoComplete,
}: {
  label: string;
  note?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputMode?: "text" | "email" | "numeric";
  autoComplete?: string;
}) {
  return (
    <label className="score-field">
      <span>{label}{note ? <small>{note}</small> : null}</span>
      <input autoComplete={autoComplete} inputMode={inputMode} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} value={value} />
    </label>
  );
}

function ScoreInput({ label, max, value, onChange }: { label: string; max: number; value: string; onChange: (value: string) => void }) {
  const invalid = value !== "" && !numberInRange(value, max);
  return (
    <label className={`score-field score-number-field${invalid ? " is-invalid" : ""}`}>
      <span>{label}<small>0–{max}</small></span>
      <input
        inputMode="numeric"
        maxLength={3}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, ""))}
        placeholder="—"
        value={value}
      />
    </label>
  );
}
