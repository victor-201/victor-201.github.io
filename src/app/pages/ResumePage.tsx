import React, { useEffect } from "react";
import Particles from "@/components/Particles";

// Raw CSS from Cv.html injected scoped to this standalone page
const CV_STYLES = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  :root {
    --navy:     #0f172a;
    --navy-mid: #1e3a5f;
    --blue:     #2563eb;
    --blue-lt:  rgba(37,99,235,0.1);
    --blue-ltr: rgba(37,99,235,0.05);
    --sky:      #38bdf8;
    --text:     #1e293b;
    --sub:      #334155;
    --muted:    #64748b;
    --rule:     #e2e8f0;
    --bg:       #ffffff;
    --sidebar:  #f8fafc;
    --green:    #16a34a;
    --green-lt: rgba(22,163,74,0.1);
    --purple:   #7c3aed;
    --purple-lt:rgba(124,58,237,0.1);
    --amber:    #d97706;
    --amber-lt: rgba(217,119,6,0.1);
    --red:      #dc2626;
    --red-lt:   rgba(220,38,38,0.1);
    --teal:     #0d9488;
    --teal-lt:  rgba(13,148,136,0.1);
  }

  html { font-size: 14.6px; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }

  body {
    background: hsl(222.2deg 84% 4.9%);
    display: flex;
    justify-content: center;
    padding: 28px 20px;
    font-family: 'Inter', sans-serif;
    color: var(--text);
    font-weight: 400;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    min-height: 100vh;
  }

  @media print {
    html, body {
      width: 210mm !important;
      height: 297mm !important;
      margin: 0 !important;
      padding: 0 !important;
      background: #fff !important;
      display: block !important;
      overflow: hidden !important;
    }
    .cv-actions { display: none !important; }
    .cv-root { display: block !important; }
    .page {
      box-shadow: none !important;
      border-radius: 0 !important;
      width: 210mm !important;
      height: 297mm !important;
      max-width: 210mm !important;
      max-height: 297mm !important;
      overflow: hidden !important;
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
    .proj:hover { border-color: var(--rule) !important; box-shadow: none !important; transform: none !important; }
  }

  .cv-root { display: flex; flex-direction: column; align-items: center; width: 100%; }

  /* ─── A4 PAGE ─── */
  .page {
    width:  210mm;
    height: 297mm;
    max-width:  210mm;
    max-height: 297mm;
    overflow: hidden;
    background: var(--bg);
    box-shadow: 0 20px 40px -10px rgba(0,0,0,.15), 0 0 10px rgba(0,0,0,.02);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  /* ─── ACTION BAR ─── */
  .cv-actions {
    width: 210mm;
    max-width: 210mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 16px;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06);
  }
  .cv-actions-left { display: flex; align-items: center; gap: 10px; }
  .cv-actions-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: linear-gradient(135deg, #38bdf8, #2563eb);
    box-shadow: 0 0 8px rgba(56,189,248,0.6);
    flex-shrink: 0;
  }
  .cv-actions h1 {
    font-size: .88rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    background: linear-gradient(to right, rgba(255,255,255,0.95), rgba(148,163,184,0.8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cv-actions-badge {
    font-size: .6rem; font-weight: 500;
    padding: 2px 8px; border-radius: 20px;
    background: rgba(37,99,235,0.15);
    color: rgba(147,197,253,0.9);
    border: 1px solid rgba(37,99,235,0.25);
    letter-spacing: .04em;
  }
  .cv-actions-btns { display: flex; gap: 8px; align-items: center; }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.75);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    font-size: 0.78rem; font-weight: 500;
    cursor: pointer;
    transition: all .2s ease;
    text-decoration: none;
    backdrop-filter: blur(8px);
    font-family: 'Inter', sans-serif;
  }
  .btn-outline:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.95);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    color: #fff;
    border: 1px solid rgba(59,130,246,0.4);
    border-radius: 8px;
    font-size: 0.78rem; font-weight: 600;
    cursor: pointer;
    transition: all .2s ease;
    text-decoration: none;
    box-shadow: 0 2px 12px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::before {
    content: '';
    position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transition: left .4s ease;
  }
  .btn-primary:hover::before { left: 100%; }
  .btn-primary:hover {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    box-shadow: 0 4px 20px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
    transform: translateY(-1px);
  }

  /* ─── HEADER ─── */
  .header {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
    padding: 14px 22px 12px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-shrink: 0;
    border-bottom: 3px solid var(--blue);
  }

  .avatar {
    width: 80px; height: 106px;
    border-radius: 6px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.30);
    overflow: hidden; background: #1e3a5f;
  }
  .avatar img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    border-radius: 4px; transition: transform 0.3s ease;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .avatar:hover img { transform: scale(1.1); }

  .h-info { flex: 1; }
  .h-name {
    font-family: 'Inter', sans-serif;
    font-size: 2.1rem; font-weight: 800;
    background: linear-gradient(to right, #ffffff, #e0e7ff);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    letter-spacing: -1px; line-height: 1.1;
  }
  .h-role {
    font-family: 'Inter', sans-serif;
    font-size: .72rem; font-weight: 500;
    letter-spacing: .16em; text-transform: uppercase;
    color: var(--sky); margin-top: 6px;
    display: flex; align-items: center; gap: 5px;
  }
  .h-loc { font-size: .72rem; color: rgba(255,255,255,.6); margin-top: 4px; display: flex; align-items: center; gap: 4px; }
  .h-contacts { display: flex; flex-wrap: wrap; gap: 3px 14px; margin-top: 7px; }
  .c-item {
    display: flex; align-items: center; gap: 4px;
    font-size: .72rem; color: rgba(255,255,255,.82);
    text-decoration: none; transition: color .15s, transform .15s;
  }
  .c-item:hover { color: #38bdf8; transform: translateX(2px); }
  .c-item svg { flex-shrink: 0; opacity: .75; }

  /* ─── BODY ─── */
  .body { display: flex; flex: 1; overflow: hidden; }

  /* ─── SIDEBAR ─── */
  .sidebar {
    width: 200px; flex-shrink: 0;
    background: var(--sidebar); border-right: 1px solid var(--rule);
    padding: 14px 14px;
    display: flex; flex-direction: column; gap: 10px;
    overflow: hidden;
  }

  .s-label {
    font-family: 'Inter', sans-serif;
    font-size: .6rem; font-weight: 600;
    letter-spacing: .12em; text-transform: uppercase;
    color: var(--navy-mid);
    padding-bottom: 4px;
    border-bottom: 1.5px solid var(--blue-lt);
    margin-bottom: 8px;
  }
  .sg-title { font-size: .63rem; font-weight: 500; color: var(--sub); margin-bottom: 4px; margin-top: 7px; }
  .sg-title:first-of-type { margin-top: 0; }
  .tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 2px; }
  .tag {
    font-family: 'Inter', sans-serif;
    font-size: .57rem; font-weight: 500;
    padding: 2px 7px; border-radius: 10px;
    white-space: nowrap; border: 1px solid rgba(0,0,0,0.04); letter-spacing: 0.1px;
  }
  .t-lang  { background: var(--purple-lt); color: var(--purple); }
  .t-front { background: var(--blue-lt);   color: var(--navy-mid); }
  .t-back  { background: var(--green-lt);  color: var(--green); }
  .t-infra { background: var(--red-lt);    color: var(--red); }
  .t-db    { background: var(--amber-lt);  color: var(--amber); }
  .t-tool  { background: #f1f5f9;          color: var(--sub); }

  .edu-name { font-size: .72rem; font-weight: 600; color: var(--text); line-height: 1.3; }
  .edu-degree { font-size: .65rem; color: var(--sub); margin: 2px 0 1px; }
  .edu-year { font-family: 'Inter', sans-serif; font-size: .6rem; color: var(--blue); font-weight: 500; }

  .act-item {
    font-size: .64rem; color: var(--sub);
    padding-left: 10px; position: relative;
    line-height: 1.4; margin-bottom: 4px;
  }
  .act-item:last-child { margin-bottom: 0; }
  .act-item::before { content: '•'; position: absolute; left: 0; color: var(--blue); font-weight: 700; }
  .act-item b { color: var(--text); font-weight: 600; }

  /* ─── MAIN ─── */
  .main {
    flex: 1;
    padding: 14px 18px;
    display: flex; flex-direction: column; gap: 10px;
    overflow: hidden;
  }

  .m-label {
    display: flex; align-items: center; gap: 8px;
    font-family: 'Inter', sans-serif;
    font-size: .8rem; font-weight: 700;
    letter-spacing: -0.1px; color: var(--navy-mid);
    padding-bottom: 5px;
    border-bottom: 2px solid var(--blue-lt);
    margin-bottom: 6px;
  }
  .m-label svg { color: var(--blue); flex-shrink: 0; }

  .summary {
    font-size: .74rem; color: var(--sub); line-height: 1.65; font-weight: 400;
    border-left: 3px solid var(--blue); padding-left: 10px;
  }
  .summary strong { color: var(--text); font-weight: 600; }

  .proj {
    border: 1px solid var(--rule); border-radius: 8px;
    padding: 8px 12px; margin-bottom: 3px; background: #ffffff;
    transition: all .25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .proj:last-child { margin-bottom: 0; }
  .proj:hover { border-color: rgba(37,99,235,0.3); box-shadow: 0 2px 8px rgba(37,99,235,0.08); transform: translateY(-1px); }

  .proj-top { display: flex; justify-content: space-between; align-items: baseline; gap: 6px; margin-bottom: 3px; flex-wrap: nowrap; }
  .proj-name { font-family: 'Inter', sans-serif; font-size: .79rem; font-weight: 600; color: var(--navy-mid); line-height: 1.2; display: flex; align-items: baseline; gap: 4px; flex-wrap: nowrap; min-width: 0; overflow: hidden; }
  .proj-name > span:first-child { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-shrink: 1; }
  .proj-name > span:first-child::after { content: ' ·'; color: var(--muted); opacity: .5; margin-left: 4px; font-weight: 400; }
  .proj-name > span:last-child { white-space: nowrap; flex-shrink: 0; font-weight: 400; color: var(--muted); font-size: .72rem; }
  .proj-meta { display: flex; align-items: center; gap: 5px; flex-shrink: 0; white-space: nowrap; }

  .badge {
    font-family: 'Inter', sans-serif;
    font-size: .55rem; font-weight: 600;
    padding: 2px 7px; border-radius: 10px; letter-spacing: .02em;
    background: var(--blue-lt); color: var(--blue);
    border: 1px solid rgba(37,99,235,.18);
  }
  .badge-commits {
    font-family: 'Inter', sans-serif;
    font-size: .58rem; color: var(--muted);
    display: flex; align-items: center; gap: 3px;
  }

  .proj-desc { font-size: .69rem; color: var(--muted); margin-bottom: 4px; line-height: 1.4; }
  .proj-url {
    font-family: 'Inter', sans-serif;
    font-size: .6rem; color: var(--blue);
    text-decoration: none; display: flex; align-items: center; gap: 3px;
    margin-bottom: 5px; transition: color .15s;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .proj-url:hover { text-decoration: underline; }

  .bullets { margin: 3px 0 4px; padding-left: 12px; display: flex; flex-direction: column; gap: 4px; }
  .bullets li {
    font-size: .67rem; color: var(--sub); font-weight: 400;
    position: relative; line-height: 1.45;
    list-style: none; padding-left: 0;
  }
  .bullets li::before { content: '▸'; position: absolute; left: -11px; color: var(--blue); font-size: .55rem; top: 2px; }

  .stack { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 5px; }
  .stag {
    font-family: 'Inter', sans-serif;
    font-size: .55rem; font-weight: 500;
    padding: 2px 6px; border-radius: 4px;
    background: #f1f5f9; color: var(--sub);
    border: 1px solid var(--rule); white-space: nowrap;
  }
  .stag.s-ts  { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
  .stag.s-rn  { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
  .stag.s-ng  { background: #fef9c3; color: #854d0e; border-color: #fde68a; }
  .stag.s-inf { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
  .stag.s-db  { background: #f5f3ff; color: #6d28d9; border-color: #ddd6fe; }

  /* ─── FOOTER ─── */
  .cv-footer {
    background: var(--navy); color: rgba(255,255,255,.65);
    font-family: 'Inter', sans-serif;
    font-size: .58rem; text-align: center;
    padding: 5px 22px; letter-spacing: .04em;
    flex-shrink: 0;
  }
  .cv-footer span { margin: 0 6px; opacity: .4; }

  /* ─── PRINT ─── */
  @page { size: A4 portrait; margin: 0; }
  @media print {
    html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; background: #fff; }
    .cv-actions { display: none !important; }
    .page { box-shadow: none; border-radius: 0; width: 210mm; height: 297mm; max-width: 210mm; max-height: 297mm; overflow: hidden; }
    .proj:hover { border-color: var(--rule); box-shadow: none; transform: none; }
  }
`;

function ResumePage() {
  useEffect(() => {
    document.title = "Resume — Nguyễn Văn Thắng";

    // Inject scoped CV styles
    const style = document.createElement("style");
    style.id = "cv-page-styles";
    style.textContent = CV_STYLES;
    document.head.appendChild(style);

    // Save & override body/html so the page looks exactly like the standalone HTML
    const prevBodyStyle = document.body.getAttribute("style") || "";
    const prevHtmlFontSize = document.documentElement.style.fontSize;

    document.documentElement.style.fontSize = "14.6px";
    document.body.setAttribute("style",
      "background:hsl(222.2deg 84% 4.9%);display:flex;justify-content:center;padding:28px 20px;font-family:'Inter',sans-serif;color:#1e293b;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact;min-height:100vh;"
    );

    return () => {
      document.getElementById("cv-page-styles")?.remove();
      document.documentElement.style.fontSize = prevHtmlFontSize;
      document.body.setAttribute("style", prevBodyStyle);
    };
  }, []);

  const handlePrint = () => window.print();

  return (
    <>
      {/* Dark starry background — identical to home page */}
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div className="cv-root">
      {/* Actions bar — hidden on print */}
      <div className="cv-actions">
        <div className="cv-actions-left">
          <div className="cv-actions-dot" />
          <h1>Interactive Resume</h1>
          <span className="cv-actions-badge">2026</span>
        </div>
        <div className="cv-actions-btns">
          <button onClick={handlePrint} className="btn-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
          <a
            href="https://drive.google.com/file/d/1O97WCk2DrO9x6SHOqf7LvRbmHkMgGIb4/view?usp=sharing"
            target="_blank" rel="noopener noreferrer" className="btn-primary"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            PDF Version
          </a>
        </div>
      </div>

      {/* A4 Page */}
      <div className="page">

        {/* HEADER */}
        <div className="header">
          <div className="avatar">
            <img src="/assets/cv/avatar.png" alt="Nguyen Van Thang"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div className="h-info">
            <div className="h-name">Nguyen Van Thang</div>
            <div className="h-role" style={{display:'flex', alignItems:'center', gap:5, flexWrap:'nowrap'}}>
              <span>Full-Stack Developer</span>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" style={{opacity:.6, flexShrink:0, minWidth:8}}>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>Web &amp; Mobile</span>
            </div>
            <div className="h-loc" style={{display:'flex', alignItems:'center', gap:4, flexWrap:'nowrap'}}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0, minWidth:11, opacity:.8}}>
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Ho Chi Minh City, Vietnam</span>
            </div>
            <div className="h-contacts">
              <a className="c-item" href="mailto:4.victor.201@gmail.com">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                4.victor.201@gmail.com
              </a>
              <a className="c-item" href="tel:+84867652947">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
                </svg>
                +84 867 652 947
              </a>
              <a className="c-item" href="https://github.com/Victor-201" target="_blank" rel="noreferrer">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
                github.com/victor-201
              </a>
              <a className="c-item" href="https://victorfolio.pages.dev" target="_blank" rel="noreferrer">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
                </svg>
                victorfolio.pages.dev
              </a>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="body">

          {/* SIDEBAR */}
          <div className="sidebar">

            {/* TECH STACK */}
            <div>
              <div className="s-label">Tech Stack</div>
              <div className="sg-title">Languages</div>
              <div className="tags">
                <span className="tag t-lang">JavaScript</span>
                <span className="tag t-lang">TypeScript</span>
                <span className="tag t-lang">Dart</span>
              </div>
              <div className="sg-title">Frontend</div>
              <div className="tags">
                <span className="tag t-front">Next.js</span>
                <span className="tag t-front">React.js</span>
                <span className="tag t-front">Redux Toolkit</span>
                <span className="tag t-front">Tailwind CSS</span>
                <span className="tag t-front">Vite</span>
              </div>
              <div className="sg-title">Mobile</div>
              <div className="tags">
                <span className="tag t-front">React Native</span>
                <span className="tag t-front">Flutter</span>
              </div>
              <div className="sg-title">Backend</div>
              <div className="tags">
                <span className="tag t-back">Node.js</span>
                <span className="tag t-back">Express.js</span>
                <span className="tag t-back">NestJS</span>
              </div>
              <div className="sg-title">Infra &amp; DevOps</div>
              <div className="tags">
                <span className="tag t-infra">AWS</span>
                <span className="tag t-infra">GitHub Actions</span>
                <span className="tag t-infra">Docker</span>
                <span className="tag t-infra">Kubernetes</span>
                <span className="tag t-infra">RabbitMQ</span>
                <span className="tag t-infra">Kong Gateway</span>
              </div>
              <div className="sg-title">Databases &amp; BaaS</div>
              <div className="tags">
                <span className="tag t-db">PostgreSQL</span>
                <span className="tag t-db">MongoDB</span>
                <span className="tag t-db">Supabase</span>
                <span className="tag t-db">MySQL</span>
                <span className="tag t-db">Prisma</span>
                <span className="tag t-db">Sequelize</span>
              </div>
              <div className="sg-title">Security &amp; Tools</div>
              <div className="tags">
                <span className="tag t-tool">Jest / Testing</span>
                <span className="tag t-tool">JWT / OAuth2</span>
                <span className="tag t-tool">RBAC</span>
                <span className="tag t-tool">Git / GitHub</span>
                <span className="tag t-tool">Chrome APIs</span>
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <div className="s-label">Education</div>
              <div className="edu-name" style={{whiteSpace:'nowrap', fontSize:'.68rem'}}>HCMC University of Transport</div>
              <div className="edu-year">2022 → 2026</div>
              <div className="edu-degree">B.Sc. Information Technology</div>
              <div className="edu-degree">Expected Graduation: 2026</div>
            </div>

            {/* ACTIVITIES */}
            <div>
              <div className="s-label">Activities</div>
              <div className="act-item"><b>Hackathon Participant</b> — rapid full-stack prototyping under time constraints</div>
              <div className="act-item"><b>IT Club Member</b> — cross-functional teamwork &amp; event coordination</div>
              <div className="act-item"><b>Competitive Programmer</b> — algorithmic problem solving &amp; optimization</div>
              <div className="act-item"><b>Volunteer</b> — community &amp; university outreach programs</div>
            </div>

            {/* INTERESTS */}
            <div>
              <div className="s-label">Interests</div>
              <div className="act-item">Distributed systems &amp; cloud architecture</div>
              <div className="act-item">UI/UX &amp; product thinking</div>
              <div className="act-item">Open-source contribution</div>
            </div>

          </div>{/* /sidebar */}

          {/* MAIN */}
          <div className="main">

            {/* PROFESSIONAL SUMMARY */}
            <div>
              <div className="m-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                Professional Summary
              </div>
              <p className="summary">
                Full-Stack Developer and IT graduate of <strong>Ho Chi Minh City University of Transport</strong>, with <strong>2+ years of freelance project delivery</strong>. Proven ability to architect and ship end-to-end systems — from responsive web UIs to microservices backends and cross-platform mobile apps. Delivered <strong>4 production-grade projects</strong> across distributed microservices, social learning platforms, e-commerce, and developer tooling. Proficient in <strong>Next.js, React, Node.js, TypeScript, PostgreSQL, AWS, Docker, Kubernetes, and automated testing (Jest)</strong>.
              </p>
            </div>

            {/* EXPERIENCE */}
            <div>
              <div className="m-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                </svg>
                Experience
              </div>
              <div className="proj" style={{background:"#f8fafc"}}>
                <div className="proj-top">
                  <div className="proj-name">Freelance Full-Stack Developer</div>
                  <div className="proj-meta">
                    <span className="badge">Independent</span>
                    <span className="badge-commits">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>
                      </svg>
                      Jan 2023 → Present · 2+ years
                    </span>
                  </div>
                </div>
                <p className="proj-desc">End-to-end ownership across architecture, backend, frontend, and deployment.</p>
                <ul className="bullets">
                  <li>Delivered <strong>4 full-stack products</strong> independently, scaling to <strong>10k+ MAU</strong>.</li>
                  <li>Managed full project lifecycle with <strong>90%+ test coverage</strong> using <strong>Jest/Supertest</strong> and automated <strong>CI/CD</strong>.</li>
                </ul>
                <div className="stack">
                  <span className="stag s-ts">React</span>
                  <span className="stag s-rn">Node.js</span>
                  <span className="stag s-ts">TypeScript</span>
                  <span className="stag s-db">PostgreSQL</span>
                  <span className="stag s-inf">Docker / K8s</span>
                </div>
              </div>
            </div>

            {/* FEATURED PROJECTS */}
            <div>
              <div className="m-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Featured Projects
              </div>

              {/* EV Charging */}
              <div className="proj">
                <div className="proj-top">
                  <div className="proj-name">
                    <span>EV Charging Orchestration Platform</span>
                    <span>IoT Orchestration Platform</span>
                  </div>
                  <div className="proj-meta">
                    <span className="badge">Capstone Project</span>
                    <span className="badge-commits">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>
                      </svg>
                      2024 → 2025
                    </span>
                  </div>
                </div>
                <p className="proj-desc">Cloud-native EV charging platform spanning a Flutter mobile app, React web portal, and 5+ distributed microservices for intelligent station scheduling and session lifecycle management.</p>
                <a className="proj-url" href="https://github.com/Victor-201/ev-charging-orchestration-platform" target="_blank" rel="noreferrer">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{flexShrink:0}}>
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                  github.com/Victor-201/ev-charging-orchestration-platform
                </a>
                <ul className="bullets">
                  <li>Architected a <strong>race-condition-safe booking engine</strong> with distributed priority-queue logic and <strong>Redis-backed session state</strong> across 5+ microservices.</li>
                  <li>Designed <strong>event-driven inter-service communication</strong> via <strong>RabbitMQ</strong> with <strong>Kong API Gateway</strong> enforcing JWT auth and rate-limiting policies.</li>
                  <li>Automated <strong>CI/CD to AWS EKS</strong> (Docker + Kubernetes) via <strong>GitHub Actions</strong>, achieving <strong>90%+ test coverage</strong> with <strong>Jest &amp; Supertest</strong>.</li>
                </ul>
                <div className="stack">
                  <span className="stag s-rn">Flutter / Dart</span>
                  <span className="stag s-ts">React</span>
                  <span className="stag s-ts">TypeScript</span>
                  <span className="stag s-db">PostgreSQL / PL/pgSQL</span>
                  <span className="stag s-inf">RabbitMQ</span>
                  <span className="stag s-inf">Kong</span>
                  <span className="stag s-inf">Docker / K8s</span>
                </div>
              </div>

              {/* StudyHub */}
              <div className="proj">
                <div className="proj-top">
                  <div className="proj-name">
                    <span>StudyHub</span>
                    <span>Social Learning Platform</span>
                  </div>
                  <div className="proj-meta">
                    <span className="badge">Full-Stack Project</span>
                    <span className="badge-commits">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>
                      </svg>
                      2023
                    </span>
                  </div>
                </div>
                <p className="proj-desc">Full-stack social learning platform with real-time collaborative study rooms, resource sharing, and group chat — built end-to-end from DB schema to deployed UI.</p>
                <a className="proj-url" href="https://github.com/Victor-201/studyhub-platform" target="_blank" rel="noreferrer">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{flexShrink:0}}>
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                  github.com/Victor-201/studyhub-platform
                </a>
                <ul className="bullets">
                  <li>Implemented <strong>bidirectional WebSocket communication</strong> with <strong>Socket.IO room isolation</strong>, sustaining <strong>500+ concurrent connections</strong> without message loss.</li>
                  <li>Re-architected frontend to <strong>Next.js 14 (SSR + ISR)</strong>, reducing <strong>TTFB by 40%</strong> and boosting <strong>Lighthouse performance score from 62 to 91</strong>.</li>
                  <li>Designed <strong>RESTful API</strong> with <strong>JWT authentication</strong> and <strong>PostgreSQL-backed RBAC</strong> for secure, multi-role resource access control.</li>
                </ul>
                <div className="stack">
                  <span className="stag s-rn">Node.js</span>
                  <span className="stag s-rn">Express.js</span>
                  <span className="stag s-ng">Next.js</span>
                  <span className="stag s-db">PostgreSQL</span>
                  <span className="stag">Socket.IO</span>
                </div>
              </div>

              {/* WebDev Toolkit */}
              <div className="proj">
                <div className="proj-top">
                  <div className="proj-name">
                    <span>WebDev Toolkit</span>
                    <span>Chrome Extension</span>
                  </div>
                  <div className="proj-meta">
                    <span className="badge">Side Project</span>
                    <span className="badge-commits">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>
                      </svg>
                      2023
                    </span>
                  </div>
                </div>
                <p className="proj-desc">Chrome Extension (Manifest V3) bundling 6 developer inspection tools — color picker, font detector, CSS inspector, image downloader, page ruler, and productivity overlay.</p>
                <a className="proj-url" href="https://github.com/Victor-201/webdev-toolkit" target="_blank" rel="noreferrer">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{flexShrink:0}}>
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                  github.com/Victor-201/webdev-toolkit
                </a>
                <ul className="bullets">
                  <li>Built <strong>6 DOM-integrated tools</strong> via <strong>Chrome Manifest V3 content scripts</strong> with sandboxed injection and zero render-blocking overhead.</li>
                  <li>Persisted user preferences cross-session via <strong>Chrome Storage API</strong> with real-time sync across browser tabs.</li>
                </ul>
                <div className="stack">
                  <span className="stag">JavaScript</span>
                  <span className="stag">Chrome Extension APIs</span>
                  <span className="stag">HTML / CSS</span>
                </div>
              </div>

            </div>

          </div>{/* /main */}

        </div>{/* /body */}

        {/* FOOTER */}
        <div className="cv-footer">
          Nguyen Van Thang <span>|</span> Full-Stack Developer <span>|</span> 4.victor.201@gmail.com <span>|</span> Ho Chi Minh City, Vietnam
        </div>

      </div>{/* /page */}
    </div>
    </>
  );
}

export default ResumePage;
