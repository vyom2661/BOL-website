// BackOfficeLabs — site restyled in the THROUGHPUT design language.
// CONTENT IS FROZEN (v2 offer, verbatim from the Ledger build). Visuals only.
const { useState, useRef, useEffect } = React;

const TS = {
  black: "#16130E",
  paper: "#F7F2E9",
  white: "#FFFFFF",
  accent: "oklch(0.68 0.19 45)",   // tangerine
  accent2: "oklch(0.62 0.16 152)", // green
  danger: "oklch(0.55 0.19 30)",
  ink60: "rgba(22,19,14,0.62)"
};
function TsShadow(color) { return `6px 6px 0 ${color}`; }
function TsShadowSm(color) { return `4px 4px 0 ${color}`; }

function TsSectionLabel({ n, children, invert }) {
  const c = invert ? TS.black : TS.accent;
  const t = TS.black;
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 12 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: c }}>({n})</span>
      <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: t }}>{children}</span>
    </div>);

}

function TsNav() {
  const [open, setOpen] = useState(false);
  const links = [["What we build", "#tracks"], ["The Audit", "#audit"], ["How we work", "#process"], ["The Work", "#work"], ["Founders", "#founders"]];
  const close = () => setOpen(false);
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: TS.paper, borderBottom: `2px solid ${TS.black}` }}>
      <nav className="ts-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14 }}>
        <a href="#top" onClick={close} className="ts-btn" style={{ gap: 11 }}>
          <span style={{ width: 28, height: 28, background: TS.accent, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(45deg)", flexShrink: 0 }}><span style={{ width: 10, height: 10, background: TS.black }} /></span>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.03em", color: TS.black }}>BackOfficeLabs</span>
        </a>
        <div className="ts-navlinks" style={{ alignItems: "center", gap: 28 }}>
          {links.map(([t, h]) => <a key={t} className="ts-link" href={h}>{t}</a>)}
        </div>
        <a href="#contact" className="ts-btn ts-nav-cta" style={{ background: TS.black, color: TS.paper, fontSize: 15, fontWeight: 700, padding: "11px 20px", boxShadow: TsShadowSm(TS.accent) }}>Book the audit</a>
        <button aria-label="Menu" className="ts-burger" onClick={() => setOpen((o) => !o)} style={{ background: "none", border: `2px solid ${TS.black}`, width: 42, height: 42, cursor: "pointer", flexDirection: "column", gap: 4, justifyContent: "center", alignItems: "center", padding: 0 }}>
          <span style={{ width: 18, height: 2, background: TS.black, transition: "transform .2s", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ width: 18, height: 2, background: TS.black, opacity: open ? 0 : 1, transition: "opacity .2s" }} />
          <span style={{ width: 18, height: 2, background: TS.black, transition: "transform .2s", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>
      {open &&
      <div style={{ borderTop: `2px solid ${TS.black}`, background: TS.paper, padding: "10px clamp(20px,5vw,40px) 22px", display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map(([t, h]) => <a key={t} href={h} onClick={close} style={{ textDecoration: "none", color: TS.black, fontSize: 18, fontWeight: 700, padding: "13px 0", borderBottom: `2px solid rgba(22,19,14,0.15)` }}>{t}</a>)}
          <a href="#contact" onClick={close} className="ts-btn" style={{ justifyContent: "center", background: TS.black, color: TS.paper, fontSize: 16, fontWeight: 700, padding: "14px", marginTop: 12, boxShadow: TsShadowSm(TS.accent) }}>Book the audit</a>
        </div>
      }
    </header>);

}

function TsContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", note: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Please add your name.";
    if (!form.email.trim()) err.email = "Please add your email.";else
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "That email doesn't look right.";
    if (!form.company.trim()) err.company = "Please add your company.";
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  };
  const fieldStyle = (k) => ({ background: TS.white, border: `2px solid ${errors[k] ? TS.danger : TS.black}`, padding: "12px 14px", fontSize: 15, color: TS.black, outline: "none", fontFamily: "inherit", fontWeight: 500, width: "100%" });
  if (sent) {
    return (
      <div style={{ background: TS.paper, border: `2px solid ${TS.black}`, boxShadow: TsShadow(TS.black), padding: 34, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14, minHeight: 280, justifyContent: "center" }}>
        <span style={{ width: 48, height: 48, background: TS.accent2, border: `2px solid ${TS.black}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#fff", fontWeight: 700 }}>✓</span>
        <h3 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: 0, color: TS.black }}>Thanks, {form.name.split(" ")[0]}.</h3>
        <p style={{ fontSize: 16, lineHeight: 1.55, fontWeight: 500, color: TS.ink60, margin: 0 }}>We'll be in touch within one business day to set up your audit. No spam, no drip campaign — just us.</p>
        <button onClick={() => {setSent(false);setForm({ name: "", email: "", company: "", note: "" });}} className="ts-btn" style={{ background: TS.paper, color: TS.black, border: `2px solid ${TS.black}`, fontSize: 14, fontWeight: 700, padding: "10px 16px", cursor: "pointer", marginTop: 4 }}>Send another →</button>
      </div>);

  }
  return (
    <form onSubmit={submit} noValidate style={{ background: TS.paper, border: `2px solid ${TS.black}`, boxShadow: TsShadow(TS.black), padding: "clamp(22px,4vw,30px)", display: "flex", flexDirection: "column", gap: 14 }}>
      {[["name", "Name", "Jane Doe"], ["email", "Work email", "jane@company.com"], ["company", "Company", "Company Inc."]].map(([k, l, p]) =>
      <label key={k} style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: TS.black }}>
          {l}
          <input value={form[k]} onChange={set(k)} placeholder={p} style={fieldStyle(k)} />
          {errors[k] && <span style={{ fontSize: 12.5, fontWeight: 600, textTransform: "none", letterSpacing: 0, color: TS.danger }}>{errors[k]}</span>}
        </label>
      )}
      <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: TS.black }}>
        What would you point AI at first? <span style={{ opacity: 0.55, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
        <textarea value={form.note} onChange={set("note")} rows={3} placeholder="e.g. one operating picture, lead response, getting found in search…" style={{ ...fieldStyle("note"), resize: "vertical", lineHeight: 1.5 }} />
      </label>
      <button type="submit" className="ts-btn" style={{ justifyContent: "center", background: TS.black, color: TS.paper, fontSize: 16, fontWeight: 700, padding: "15px", border: "none", cursor: "pointer", marginTop: 4, boxShadow: TsShadowSm(TS.accent2) }}>Book my audit →</button>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: TS.ink60, textAlign: "center" }}>Written audit in 5 working days · from £750 · credited in full against any build</span>
    </form>);

}

function TsFaq() {
  const items = [
  ["Why fixed price? Everyone else bills hourly or monthly.", "Because AI-native delivery makes scope predictable for us — so the risk shouldn't sit with you. You know the full price before we start. If we over-deliver (we usually do), it's not billed."],
  ["What if the build doesn't pay back?", "Then we won't recommend it. The audit shows the payback number — in time, cost, or revenue — before any build is proposed, and includes what we're NOT recommending. If nothing pays back, the audit says so and you've spent £750 to avoid a £15k mistake."],
  ["Who owns the system afterwards?", "You do. Every engagement ends with a documented handover — architecture, workflows node-by-node, troubleshooting — so your team runs it in-house. No dependency on us by design."],
  ["Then what's the monthly retainer for?", "System Operations is optional and offered only at handover: monitoring, iteration, and new modules as you grow. Monthly, cancel any time — each month is a decision point, same as our build phases. It exists because systems compound when someone keeps improving them, not because you can't run yours."],
  ["You're fast and fixed-price. Is this AI slop?", "The opposite — verification is the product. Our systems check their own claims against the source of truth, integrations self-heal instead of duplicating, and every deliverable passes QA gates before you see it. Fast is a property of the delivery model, not of the quality bar."],
  ["Where are you based?", "London and India. Engagements are fronted from London; delivery runs on our systems and playbooks. It's part of how team-scale output ships at these prices."]];

  const [open, setOpen] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: `2px solid ${TS.black}` }}>
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} style={{ borderBottom: `2px solid ${TS.black}` }}>
            <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 18, background: "none", border: "none", cursor: "pointer", padding: "22px 4px", textAlign: "left", fontFamily: "inherit" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: TS.accent, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: "clamp(17px,2vw,19px)", fontWeight: 700, color: TS.black, letterSpacing: "-0.01em", flex: 1 }}>{q}</span>
              <span style={{ flexShrink: 0, width: 28, height: 28, border: `2px solid ${TS.black}`, background: isOpen ? TS.accent : TS.paper, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: TS.black, transition: "transform .25s, background .25s", transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            <div style={{ overflow: "hidden", maxHeight: isOpen ? 520 : 0, opacity: isOpen ? 1 : 0, transition: "max-height .35s ease, opacity .3s ease" }}>
              <p style={{ fontSize: 16.5, lineHeight: 1.6, fontWeight: 500, color: TS.ink60, margin: 0, padding: "0 46px 26px 32px", maxWidth: 660 }}>{a}</p>
            </div>
          </div>);

      })}
    </div>);

}

function TsHeroCollapse() {
  const chips = [
  ["Payments", -4], ["Spreadsheets", 18], ["Calendar", -10],
  ["Email platform", 12], ["Slack", -6], ["Database", 22]];

  const rows = [
  { t: "Customer 360°", s: "", tag: "risk 82 · never logged in", tone: "risk" },
  { t: "Refund saved", s: "", tag: "verified against source", tone: "ok" },
  { t: "Today's priorities → Slack", s: "", tag: "sent 09:00", tone: "mute" }];

  const wrapRef = useRef(null);
  const [flow, setFlow] = useState(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const mq = window.matchMedia("(max-width: 640px)");
    const measure = () => {
      if (!mq.matches) {setFlow(null);return;}
      const chipEls = Array.from(wrap.querySelectorAll(".ts-toolchip"));
      const panel = wrap.querySelector(".ts-osurface");
      if (!chipEls.length || !panel) return;
      const cx = panel.offsetLeft + panel.offsetWidth / 2;
      const cy = panel.offsetTop;
      const pts = chipEls.map((el) => ({ x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight - 1 }));
      setFlow({ w: wrap.offsetWidth, h: wrap.offsetHeight, cx, cy, pts });
    };
    measure();
    const t1 = setTimeout(measure, 350);
    const t2 = setTimeout(measure, 1600);
    window.addEventListener("resize", measure);
    return () => {clearTimeout(t1);clearTimeout(t2);window.removeEventListener("resize", measure);};
  }, []);

  return (
    <div className="ts-collapse" ref={wrapRef}>
      <div className="ts-chipcol">
        {chips.map(([label, dx], i) =>
        <span key={label} className="ts-toolchip" style={{ marginLeft: Math.max(0, dx), animationDelay: `${i * 0.12}s` }}>
            <span className="ts-chipdot" />{label}
          </span>
        )}
      </div>
      <svg className="ts-cvg" viewBox="0 0 60 260" preserveAspectRatio="none" aria-hidden="true">
        {[26, 74, 108, 150, 186, 232].map((y, i) =>
        <path key={i} d={`M0 ${y} C 34 ${y}, 30 130, 56 130`} fill="none" stroke="oklch(0.68 0.19 45 / 0.55)" strokeWidth="2" />
        )}
        <path d="M48 122 L60 130 L48 138 Z" fill={TS.black} />
      </svg>
      {flow &&
      <svg className="ts-flowm" width={flow.w} height={flow.h} viewBox={`0 0 ${flow.w} ${flow.h}`} aria-hidden="true">
          {flow.pts.map((p, i) =>
        <path key={i} d={`M${p.x} ${p.y} C ${p.x} ${p.y + 44}, ${flow.cx} ${flow.cy - 48}, ${flow.cx} ${flow.cy - 8}`} fill="none" stroke="oklch(0.68 0.19 45 / 0.55)" strokeWidth="2" />
        )}
          <path d={`M${flow.cx - 8} ${flow.cy - 13} L${flow.cx} ${flow.cy} L${flow.cx + 8} ${flow.cy - 13} Z`} fill={TS.black} />
        </svg>
      }
      <div className="ts-osurface">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 8 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.03em", color: TS.ink60 }}>
            <span className="ts-livedot" />your-business · live
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", background: TS.accent2, padding: "4px 9px", flexShrink: 0 }}>
            <span className="ts-refreshdot" />self-refreshing
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {rows.map((r, i) => {
            const tone = r.tone === "risk" ? { c: TS.danger, bg: "oklch(0.55 0.19 30 / 0.12)" } : r.tone === "ok" ? { c: TS.accent2, bg: "oklch(0.62 0.16 152 / 0.14)" } : { c: "rgba(22,19,14,0.5)", bg: "transparent" };
            return (
              <div key={r.t} className="ts-osrow" style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 2px", borderTop: i ? `2px solid rgba(22,19,14,0.12)` : "none", animationDelay: `${1 + i * 2.4}s` }}>
                <span style={{ width: 9, height: 9, background: tone.c, flexShrink: 0, opacity: r.tone === "mute" ? 0.5 : 1 }} />
                <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: TS.black, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.t}{r.s && <span style={{ color: TS.ink60, fontWeight: 500 }}> — {r.s}</span>}</span>
                </span>
                <span className="ts-ostag" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: tone.c, background: tone.bg, padding: "4px 9px", flexShrink: 0, whiteSpace: "nowrap" }}>
                  {r.tone === "ok" && <span style={{ fontSize: 12 }}>✓</span>}{r.tag}
                </span>
              </div>);

          })}
        </div>
      </div>
    </div>);

}

window.TsNav = TsNav;
window.TsContactForm = TsContactForm;
window.TsFaq = TsFaq;
window.TsHeroCollapse = TsHeroCollapse;
window.TsSectionLabel = TsSectionLabel;
window.TS = TS;
window.TsShadow = TsShadow;
window.TsShadowSm = TsShadowSm;
