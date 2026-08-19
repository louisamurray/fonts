import { useState, useEffect, useMemo, useRef } from "react";

const FONTS = [
  // ---- Sans-serif ----
  { name: "Segoe UI", stack: `'Segoe UI', system-ui, sans-serif`, cat: "sans", ships: "Windows" },
  { name: "Segoe UI Light", stack: `'Segoe UI Light', 'Segoe UI', sans-serif`, cat: "sans", ships: "Windows" },
  { name: "Segoe UI Semibold", stack: `'Segoe UI Semibold', 'Segoe UI', sans-serif`, cat: "sans", ships: "Windows" },
  { name: "Segoe UI Black", stack: `'Segoe UI Black', 'Segoe UI', sans-serif`, cat: "sans", ships: "Windows" },
  { name: "Aptos", stack: `Aptos, sans-serif`, cat: "sans", ships: "Office" },
  { name: "Calibri", stack: `Calibri, sans-serif`, cat: "sans", ships: "Office" },
  { name: "Calibri Light", stack: `'Calibri Light', Calibri, sans-serif`, cat: "sans", ships: "Office" },
  { name: "Arial", stack: `Arial, Helvetica, sans-serif`, cat: "sans", ships: "Core" },
  { name: "Arial Black", stack: `'Arial Black', Arial, sans-serif`, cat: "sans", ships: "Core" },
  { name: "Arial Narrow", stack: `'Arial Narrow', Arial, sans-serif`, cat: "sans", ships: "Office" },
  { name: "Tahoma", stack: `Tahoma, sans-serif`, cat: "sans", ships: "Windows" },
  { name: "Verdana", stack: `Verdana, sans-serif`, cat: "sans", ships: "Core" },
  { name: "Trebuchet MS", stack: `'Trebuchet MS', sans-serif`, cat: "sans", ships: "Core" },
  { name: "Candara", stack: `Candara, sans-serif`, cat: "sans", ships: "Office" },
  { name: "Corbel", stack: `Corbel, sans-serif`, cat: "sans", ships: "Office" },
  { name: "Century Gothic", stack: `'Century Gothic', sans-serif`, cat: "sans", ships: "Office" },
  { name: "Franklin Gothic Medium", stack: `'Franklin Gothic Medium', sans-serif`, cat: "sans", ships: "Windows" },
  { name: "Franklin Gothic Book", stack: `'Franklin Gothic Book', sans-serif`, cat: "sans", ships: "Office" },
  { name: "Bahnschrift", stack: `Bahnschrift, sans-serif`, cat: "sans", ships: "Win 10+" },
  { name: "Microsoft Sans Serif", stack: `'Microsoft Sans Serif', sans-serif`, cat: "sans", ships: "Windows" },
  { name: "Gill Sans MT", stack: `'Gill Sans MT', 'Gill Sans', sans-serif`, cat: "sans", ships: "Office" },
  { name: "Gill Sans Nova", stack: `'Gill Sans Nova', sans-serif`, cat: "sans", ships: "Office" },
  { name: "Tw Cen MT", stack: `'Tw Cen MT', sans-serif`, cat: "sans", ships: "Office" },
  { name: "Lucida Sans", stack: `'Lucida Sans', 'Lucida Sans Unicode', sans-serif`, cat: "sans", ships: "Windows" },
  { name: "Lucida Sans Unicode", stack: `'Lucida Sans Unicode', sans-serif`, cat: "sans", ships: "Windows" },
  { name: "News Gothic MT", stack: `'News Gothic MT', sans-serif`, cat: "sans", ships: "Office" },
  { name: "Maiandra GD", stack: `'Maiandra GD', sans-serif`, cat: "sans", ships: "Office" },
  { name: "Eras Medium ITC", stack: `'Eras Medium ITC', sans-serif`, cat: "sans", ships: "Office" },
  { name: "Berlin Sans FB", stack: `'Berlin Sans FB', sans-serif`, cat: "sans", ships: "Office" },
  { name: "Bauhaus 93", stack: `'Bauhaus 93', sans-serif`, cat: "sans", ships: "Office" },

  // ---- Serif ----
  { name: "Aptos Serif", stack: `'Aptos Serif', serif`, cat: "serif", ships: "Office" },
  { name: "Cambria", stack: `Cambria, serif`, cat: "serif", ships: "Office" },
  { name: "Georgia", stack: `Georgia, serif`, cat: "serif", ships: "Core" },
  { name: "Times New Roman", stack: `'Times New Roman', Times, serif`, cat: "serif", ships: "Core" },
  { name: "Constantia", stack: `Constantia, serif`, cat: "serif", ships: "Office" },
  { name: "Book Antiqua", stack: `'Book Antiqua', Palatino, serif`, cat: "serif", ships: "Office" },
  { name: "Palatino Linotype", stack: `'Palatino Linotype', Palatino, serif`, cat: "serif", ships: "Windows" },
  { name: "Garamond", stack: `Garamond, serif`, cat: "serif", ships: "Office" },
  { name: "Bookman Old Style", stack: `'Bookman Old Style', serif`, cat: "serif", ships: "Office" },
  { name: "Century Schoolbook", stack: `'Century Schoolbook', serif`, cat: "serif", ships: "Office" },
  { name: "Century", stack: `Century, serif`, cat: "serif", ships: "Office" },
  { name: "Bell MT", stack: `'Bell MT', serif`, cat: "serif", ships: "Office" },
  { name: "Bodoni MT", stack: `'Bodoni MT', serif`, cat: "serif", ships: "Office" },
  { name: "Baskerville Old Face", stack: `'Baskerville Old Face', serif`, cat: "serif", ships: "Office" },
  { name: "Calisto MT", stack: `'Calisto MT', serif`, cat: "serif", ships: "Office" },
  { name: "Centaur", stack: `Centaur, serif`, cat: "serif", ships: "Office" },
  { name: "Footlight MT Light", stack: `'Footlight MT Light', serif`, cat: "serif", ships: "Office" },
  { name: "Goudy Old Style", stack: `'Goudy Old Style', serif`, cat: "serif", ships: "Office" },
  { name: "High Tower Text", stack: `'High Tower Text', serif`, cat: "serif", ships: "Office" },
  { name: "Perpetua", stack: `Perpetua, serif`, cat: "serif", ships: "Office" },
  { name: "Modern No. 20", stack: `'Modern No. 20', serif`, cat: "serif", ships: "Office" },
  { name: "Rockwell", stack: `Rockwell, serif`, cat: "serif", ships: "Office" },
  { name: "Rockwell Nova", stack: `'Rockwell Nova', serif`, cat: "serif", ships: "Office" },
  { name: "Lucida Bright", stack: `'Lucida Bright', serif`, cat: "serif", ships: "Office" },
  { name: "Lucida Fax", stack: `'Lucida Fax', serif`, cat: "serif", ships: "Office" },
  { name: "Sitka Text", stack: `'Sitka Text', Sitka, serif`, cat: "serif", ships: "Win 10+" },
  { name: "Sylfaen", stack: `Sylfaen, serif`, cat: "serif", ships: "Windows" },

  // ---- Monospace ----
  { name: "Cascadia Code", stack: `'Cascadia Code', 'Cascadia Mono', monospace`, cat: "mono", ships: "Win 11" },
  { name: "Cascadia Mono", stack: `'Cascadia Mono', monospace`, cat: "mono", ships: "Win 11" },
  { name: "Aptos Mono", stack: `'Aptos Mono', monospace`, cat: "mono", ships: "Office" },
  { name: "Consolas", stack: `Consolas, monospace`, cat: "mono", ships: "Office" },
  { name: "Courier New", stack: `'Courier New', Courier, monospace`, cat: "mono", ships: "Core" },
  { name: "Lucida Console", stack: `'Lucida Console', monospace`, cat: "mono", ships: "Windows" },
  { name: "Lucida Sans Typewriter", stack: `'Lucida Sans Typewriter', monospace`, cat: "mono", ships: "Office" },
  { name: "OCR A Extended", stack: `'OCR A Extended', monospace`, cat: "mono", ships: "Office" },

  // ---- Display ----
  { name: "Impact", stack: `Impact, sans-serif`, cat: "display", ships: "Core" },
  { name: "Haettenschweiler", stack: `Haettenschweiler, sans-serif`, cat: "display", ships: "Office" },
  { name: "Cooper Black", stack: `'Cooper Black', serif`, cat: "display", ships: "Office" },
  { name: "Bernard MT Condensed", stack: `'Bernard MT Condensed', serif`, cat: "display", ships: "Office" },
  { name: "Britannic Bold", stack: `'Britannic Bold', sans-serif`, cat: "display", ships: "Office" },
  { name: "Broadway", stack: `Broadway, serif`, cat: "display", ships: "Office" },
  { name: "Wide Latin", stack: `'Wide Latin', serif`, cat: "display", ships: "Office" },
  { name: "Elephant", stack: `Elephant, serif`, cat: "display", ships: "Office" },
  { name: "Goudy Stout", stack: `'Goudy Stout', serif`, cat: "display", ships: "Office" },
  { name: "Castellar", stack: `Castellar, serif`, cat: "display", ships: "Office" },
  { name: "Colonna MT", stack: `'Colonna MT', serif`, cat: "display", ships: "Office" },
  { name: "Copperplate Gothic Bold", stack: `'Copperplate Gothic Bold', serif`, cat: "display", ships: "Office" },
  { name: "Copperplate Gothic Light", stack: `'Copperplate Gothic Light', serif`, cat: "display", ships: "Office" },
  { name: "Engravers MT", stack: `'Engravers MT', serif`, cat: "display", ships: "Office" },
  { name: "Felix Titling", stack: `'Felix Titling', serif`, cat: "display", ships: "Office" },
  { name: "Perpetua Titling MT", stack: `'Perpetua Titling MT', serif`, cat: "display", ships: "Office" },
  { name: "Forte", stack: `Forte, cursive`, cat: "display", ships: "Office" },
  { name: "Harrington", stack: `Harrington, serif`, cat: "display", ships: "Office" },
  { name: "Imprint MT Shadow", stack: `'Imprint MT Shadow', serif`, cat: "display", ships: "Office" },
  { name: "Jokerman", stack: `Jokerman, cursive`, cat: "display", ships: "Office" },
  { name: "Playbill", stack: `Playbill, serif`, cat: "display", ships: "Office" },
  { name: "Onyx", stack: `Onyx, serif`, cat: "display", ships: "Office" },
  { name: "Stencil", stack: `Stencil, serif`, cat: "display", ships: "Office" },
  { name: "Showcard Gothic", stack: `'Showcard Gothic', sans-serif`, cat: "display", ships: "Office" },
  { name: "Snap ITC", stack: `'Snap ITC', sans-serif`, cat: "display", ships: "Office" },
  { name: "Ravie", stack: `Ravie, cursive`, cat: "display", ships: "Office" },
  { name: "Magneto", stack: `Magneto, cursive`, cat: "display", ships: "Office" },
  { name: "Algerian", stack: `Algerian, serif`, cat: "display", ships: "Office" },
  { name: "Chiller", stack: `Chiller, cursive`, cat: "display", ships: "Office" },
  { name: "Niagara Solid", stack: `'Niagara Solid', sans-serif`, cat: "display", ships: "Office" },
  { name: "Niagara Engraved", stack: `'Niagara Engraved', sans-serif`, cat: "display", ships: "Office" },
  { name: "Poor Richard", stack: `'Poor Richard', serif`, cat: "display", ships: "Office" },
  { name: "Papyrus", stack: `Papyrus, fantasy`, cat: "display", ships: "Office" },
  { name: "Comic Sans MS", stack: `'Comic Sans MS', cursive`, cat: "display", ships: "Core" },

  // ---- Script / handwriting ----
  { name: "Segoe Script", stack: `'Segoe Script', cursive`, cat: "script", ships: "Windows" },
  { name: "Segoe Print", stack: `'Segoe Print', cursive`, cat: "script", ships: "Windows" },
  { name: "Ink Free", stack: `'Ink Free', cursive`, cat: "script", ships: "Win 10+" },
  { name: "Gabriola", stack: `Gabriola, cursive`, cat: "script", ships: "Windows" },
  { name: "MV Boli", stack: `'MV Boli', cursive`, cat: "script", ships: "Windows" },
  { name: "Brush Script MT", stack: `'Brush Script MT', cursive`, cat: "script", ships: "Office" },
  { name: "Freestyle Script", stack: `'Freestyle Script', cursive`, cat: "script", ships: "Office" },
  { name: "French Script MT", stack: `'French Script MT', cursive`, cat: "script", ships: "Office" },
  { name: "Edwardian Script ITC", stack: `'Edwardian Script ITC', cursive`, cat: "script", ships: "Office" },
  { name: "Kunstler Script", stack: `'Kunstler Script', cursive`, cat: "script", ships: "Office" },
  { name: "Palace Script MT", stack: `'Palace Script MT', cursive`, cat: "script", ships: "Office" },
  { name: "Monotype Corsiva", stack: `'Monotype Corsiva', cursive`, cat: "script", ships: "Office" },
  { name: "Lucida Calligraphy", stack: `'Lucida Calligraphy', cursive`, cat: "script", ships: "Office" },
  { name: "Lucida Handwriting", stack: `'Lucida Handwriting', cursive`, cat: "script", ships: "Office" },
  { name: "Mistral", stack: `Mistral, cursive`, cat: "script", ships: "Office" },
  { name: "Rage Italic", stack: `'Rage Italic', cursive`, cat: "script", ships: "Office" },
  { name: "Pristina", stack: `Pristina, cursive`, cat: "script", ships: "Office" },
  { name: "Vladimir Script", stack: `'Vladimir Script', cursive`, cat: "script", ships: "Office" },
  { name: "Vivaldi", stack: `Vivaldi, cursive`, cat: "script", ships: "Office" },
  { name: "Viner Hand ITC", stack: `'Viner Hand ITC', cursive`, cat: "script", ships: "Office" },
  { name: "Tempus Sans ITC", stack: `'Tempus Sans ITC', cursive`, cat: "script", ships: "Office" },
  { name: "Kristen ITC", stack: `'Kristen ITC', cursive`, cat: "script", ships: "Office" },
  { name: "Juice ITC", stack: `'Juice ITC', cursive`, cat: "script", ships: "Office" },
  { name: "Informal Roman", stack: `'Informal Roman', cursive`, cat: "script", ships: "Office" },
  { name: "Blackadder ITC", stack: `'Blackadder ITC', cursive`, cat: "script", ships: "Office" },
  { name: "Old English Text MT", stack: `'Old English Text MT', cursive`, cat: "script", ships: "Office" },
  { name: "Parchment", stack: `Parchment, cursive`, cat: "script", ships: "Office" },
  { name: "Curlz MT", stack: `'Curlz MT', cursive`, cat: "script", ships: "Office" },
  { name: "Gigi", stack: `Gigi, cursive`, cat: "script", ships: "Office" },
  { name: "Harlow Solid Italic", stack: `'Harlow Solid Italic', cursive`, cat: "script", ships: "Office" },

  // ---- Symbol / dingbat ----
  { name: "Wingdings", stack: `Wingdings`, cat: "symbol", ships: "Core" },
  { name: "Wingdings 2", stack: `'Wingdings 2'`, cat: "symbol", ships: "Office" },
  { name: "Wingdings 3", stack: `'Wingdings 3'`, cat: "symbol", ships: "Office" },
  { name: "Webdings", stack: `Webdings`, cat: "symbol", ships: "Core" },
  { name: "Symbol", stack: `Symbol`, cat: "symbol", ships: "Core" },
  { name: "Bookshelf Symbol 7", stack: `'Bookshelf Symbol 7'`, cat: "symbol", ships: "Office" },
  { name: "MT Extra", stack: `'MT Extra'`, cat: "symbol", ships: "Office" },

  // ---- Global / UI (ship with Windows, render Latin) ----
  { name: "Segoe UI Symbol", stack: `'Segoe UI Symbol', sans-serif`, cat: "global", ships: "Windows" },
  { name: "Segoe UI Emoji", stack: `'Segoe UI Emoji', sans-serif`, cat: "global", ships: "Windows" },
  { name: "Nirmala UI", stack: `'Nirmala UI', sans-serif`, cat: "global", ships: "Windows" },
  { name: "Leelawadee UI", stack: `'Leelawadee UI', sans-serif`, cat: "global", ships: "Windows" },
  { name: "Ebrima", stack: `Ebrima, sans-serif`, cat: "global", ships: "Windows" },
  { name: "Gadugi", stack: `Gadugi, sans-serif`, cat: "global", ships: "Windows" },
  { name: "Yu Gothic UI", stack: `'Yu Gothic UI', sans-serif`, cat: "global", ships: "Windows" },
  { name: "Yu Gothic", stack: `'Yu Gothic', sans-serif`, cat: "global", ships: "Windows" },
  { name: "Yu Mincho", stack: `'Yu Mincho', serif`, cat: "global", ships: "Windows" },
  { name: "Meiryo", stack: `Meiryo, sans-serif`, cat: "global", ships: "Windows" },
  { name: "Malgun Gothic", stack: `'Malgun Gothic', sans-serif`, cat: "global", ships: "Windows" },
  { name: "Microsoft YaHei", stack: `'Microsoft YaHei', sans-serif`, cat: "global", ships: "Windows" },
  { name: "Microsoft JhengHei", stack: `'Microsoft JhengHei', sans-serif`, cat: "global", ships: "Windows" },
  { name: "MS Gothic", stack: `'MS Gothic', sans-serif`, cat: "global", ships: "Windows" },
  { name: "MS Mincho", stack: `'MS Mincho', serif`, cat: "global", ships: "Windows" },
  { name: "SimSun", stack: `SimSun, serif`, cat: "global", ships: "Windows" },
];

const PRESETS = {
  Pangram: "The quick brown fox jumps over the lazy dog",
  Paragraph:
    "Typography is the craft of arranging letters so they are read without friction. Good type is invisible; bad type is all you see.",
  Glyphs: "0123456789  $ € £ ¥ ₿  & @ # % *  ( ) { } [ ]  “ ” ‘ ’ — –",
  Alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz",
};

const CATS = [
  { id: "all", label: "All" },
  { id: "sans", label: "Sans" },
  { id: "serif", label: "Serif" },
  { id: "mono", label: "Mono" },
  { id: "display", label: "Display" },
  { id: "script", label: "Script" },
  { id: "symbol", label: "Symbol" },
  { id: "global", label: "Global" },
];

function detectFont(ctx, font, baseWidths, baseFonts, test, size) {
  for (const b of baseFonts) {
    ctx.font = `${size} "${font}", ${b}`;
    if (ctx.measureText(test).width !== baseWidths[b]) return true;
  }
  return false;
}

export default function SystemTypeSpecimen() {
  const [text, setText] = useState(PRESETS.Pangram);
  const [size, setSize] = useState(56);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [avail, setAvail] = useState(null);
  const [copied, setCopied] = useState("");
  const copyTimer = useRef(null);

  useEffect(() => {
    const baseFonts = ["monospace", "serif", "sans-serif"];
    const test = "mmmmmmmmmmlliWQ0123";
    const s = "72px";
    const ctx = document.createElement("canvas").getContext("2d");
    const baseWidths = {};
    baseFonts.forEach((b) => {
      ctx.font = `${s} ${b}`;
      baseWidths[b] = ctx.measureText(test).width;
    });
    const map = {};
    FONTS.forEach((f) => {
      map[f.name] = detectFont(ctx, f.name, baseWidths, baseFonts, test, s);
    });
    setAvail(map);
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FONTS.filter(
      (f) => (cat === "all" || f.cat === cat) && (!q || f.name.toLowerCase().includes(q))
    );
  }, [cat, query]);

  const availCount = avail ? Object.values(avail).filter(Boolean).length : null;

  const copy = (f) => {
    const css = `font-family: ${f.stack};`;
    navigator.clipboard?.writeText(css);
    setCopied(f.name);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(""), 1400);
  };

  return (
    <div className="stx-root">
      <style>{CSS}</style>

      <header className="stx-head">
        <div className="stx-head-main">
          <h1>System Type</h1>
          <p>
            Type anything and watch it render live across the typefaces that ship with Windows and
            Microsoft&nbsp;Office. Faces missing from this device fall back to a generic and are
            flagged below.
          </p>
        </div>
        <div className="stx-meter" aria-live="polite">
          <span className="stx-meter-num">
            {availCount === null ? "··" : availCount}
            <span className="stx-meter-den">/{FONTS.length}</span>
          </span>
          <span className="stx-meter-label">on this device</span>
        </div>
      </header>

      <div className="stx-controls">
        <div className="stx-field stx-field-text">
          <label htmlFor="stx-sample">Sample text</label>
          <textarea
            id="stx-sample"
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here"
            spellCheck={false}
          />
          <div className="stx-presets">
            {Object.keys(PRESETS).map((k) => (
              <button
                key={k}
                type="button"
                className="stx-chip stx-chip-ghost"
                onClick={() => setText(PRESETS[k])}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="stx-field stx-field-tune">
          <div className="stx-tune-row">
            <label htmlFor="stx-size">Size</label>
            <output className="stx-mono">{size}px</output>
          </div>
          <input
            id="stx-size"
            type="range"
            min={12}
            max={160}
            step={1}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <div className="stx-toggles">
            <button
              type="button"
              aria-pressed={bold}
              className={`stx-toggle ${bold ? "on" : ""}`}
              onClick={() => setBold((v) => !v)}
              style={{ fontWeight: 700 }}
            >
              Bold
            </button>
            <button
              type="button"
              aria-pressed={italic}
              className={`stx-toggle ${italic ? "on" : ""}`}
              onClick={() => setItalic((v) => !v)}
              style={{ fontStyle: "italic" }}
            >
              Italic
            </button>
          </div>
        </div>
      </div>

      <div className="stx-filters">
        <div className="stx-cats" role="tablist" aria-label="Filter by category">
          {CATS.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              className={`stx-chip ${cat === c.id ? "active" : ""}`}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <input
          className="stx-search stx-mono"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="filter fonts…"
          aria-label="Filter fonts by name"
        />
      </div>

      <main className="stx-list">
        {shown.map((f) => {
          const isAvail = avail ? avail[f.name] : true;
          return (
            <article key={f.name} className="stx-spec">
              <div className="stx-spec-meta">
                <span className="stx-spec-name" style={{ fontFamily: f.stack }}>
                  {f.name}
                </span>
                <span className="stx-tags stx-mono">
                  <span className="stx-tag">{f.cat}</span>
                  <span className="stx-tag">{f.ships}</span>
                  <span className={`stx-avail ${isAvail ? "yes" : "no"}`}>
                    <span className="stx-dot" aria-hidden="true" />
                    {avail === null ? "checking" : isAvail ? "installed" : "fallback"}
                  </span>
                </span>
                <button
                  type="button"
                  className="stx-copy stx-mono"
                  onClick={() => copy(f)}
                >
                  {copied === f.name ? "copied ✓" : "copy css"}
                </button>
              </div>
              <p
                className="stx-spec-text"
                style={{
                  fontFamily: f.stack,
                  fontSize: size,
                  fontWeight: bold ? 700 : 400,
                  fontStyle: italic ? "italic" : "normal",
                }}
              >
                {text || "\u00A0"}
              </p>
            </article>
          );
        })}
        {shown.length === 0 && (
          <div className="stx-empty">
            No fonts match “{query}”. Clear the filter to see the full set.
          </div>
        )}
      </main>
    </div>
  );
}

const CSS = `
.stx-root{
  --paper:#E7E8EA; --panel:#FCFCFD; --ink:#17181A; --sub:#71767C;
  --line:#D6D8DB; --accent:#1D63ED; --accent-soft:#E7EEFD; --good:#1D8F5B;
  background:var(--paper); color:var(--ink); min-height:100vh;
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  padding:clamp(16px,4vw,40px); box-sizing:border-box; line-height:1.4;
}
.stx-root *{box-sizing:border-box;}
.stx-mono{font-family:ui-monospace,"Cascadia Code",Consolas,"SF Mono",monospace;
  font-variant-numeric:tabular-nums; letter-spacing:-.01em;}

.stx-head{display:flex; justify-content:space-between; align-items:flex-start;
  gap:24px; max-width:1100px; margin:0 auto 22px; flex-wrap:wrap;}
.stx-head-main{max-width:640px;}
.stx-head h1{font-size:clamp(26px,4vw,38px); font-weight:650; letter-spacing:-.02em; margin:0 0 8px;}
.stx-head p{margin:0; color:var(--sub); font-size:14px; max-width:60ch;}
.stx-meter{display:flex; flex-direction:column; align-items:flex-end; gap:2px;
  border-left:2px solid var(--accent); padding-left:14px;}
.stx-meter-num{font-family:ui-monospace,Consolas,monospace; font-size:34px;
  font-weight:600; line-height:1; letter-spacing:-.03em;}
.stx-meter-den{color:var(--sub); font-size:18px;}
.stx-meter-label{font-size:11px; text-transform:uppercase; letter-spacing:.09em; color:var(--sub);}

.stx-controls{display:grid; grid-template-columns:1.4fr 1fr; gap:14px;
  max-width:1100px; margin:0 auto 14px;}
.stx-field{background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:14px 16px;}
.stx-field label{display:block; font-size:11px; text-transform:uppercase;
  letter-spacing:.09em; color:var(--sub); margin-bottom:8px;}
.stx-field textarea{width:100%; border:none; resize:vertical; background:transparent;
  color:var(--ink); font:inherit; font-size:16px; outline:none; min-height:44px;}
.stx-presets{display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;}

.stx-tune-row{display:flex; justify-content:space-between; align-items:baseline;}
.stx-tune-row output{font-size:15px; color:var(--ink);}
.stx-field-tune input[type=range]{width:100%; margin:14px 0 16px; -webkit-appearance:none;
  appearance:none; height:4px; border-radius:2px; background:var(--line); outline:none;}
.stx-field-tune input[type=range]::-webkit-slider-thumb{-webkit-appearance:none; appearance:none;
  width:18px; height:18px; border-radius:50%; background:var(--accent);
  border:3px solid var(--panel); box-shadow:0 0 0 1px var(--accent); cursor:pointer;}
.stx-field-tune input[type=range]::-moz-range-thumb{width:14px; height:14px; border-radius:50%;
  background:var(--accent); border:3px solid var(--panel); box-shadow:0 0 0 1px var(--accent); cursor:pointer;}
.stx-toggles{display:flex; gap:8px;}
.stx-toggle{flex:1; padding:9px 0; border:1px solid var(--line); background:var(--paper);
  border-radius:8px; color:var(--ink); font-size:14px; cursor:pointer; transition:background .12s,border-color .12s;}
.stx-toggle.on{background:var(--accent-soft); border-color:var(--accent); color:var(--accent);}

.stx-filters{display:flex; justify-content:space-between; align-items:center; gap:12px;
  max-width:1100px; margin:0 auto 6px; flex-wrap:wrap; position:sticky; top:0; z-index:5;
  background:var(--paper); padding:10px 0;}
.stx-cats{display:flex; gap:6px; flex-wrap:wrap;}
.stx-chip{border:1px solid var(--line); background:var(--panel); color:var(--sub);
  padding:6px 13px; border-radius:20px; font-size:13px; cursor:pointer; transition:.12s;}
.stx-chip:hover{color:var(--ink);}
.stx-chip.active{background:var(--ink); border-color:var(--ink); color:#fff;}
.stx-chip-ghost{padding:4px 10px; font-size:12px; border-radius:6px;}
.stx-search{border:1px solid var(--line); background:var(--panel); border-radius:8px;
  padding:7px 12px; font-size:13px; color:var(--ink); min-width:150px; outline:none;}
.stx-search:focus{border-color:var(--accent);}

.stx-list{max-width:1100px; margin:0 auto;}
.stx-spec{border-top:1px solid var(--line); padding:22px 0;}
.stx-spec:first-child{border-top:none;}
.stx-spec-meta{display:flex; align-items:center; gap:14px; margin-bottom:12px; flex-wrap:wrap;}
.stx-spec-name{font-size:19px; line-height:1; margin-right:auto;}
.stx-tags{display:flex; gap:8px; align-items:center; font-size:11px;}
.stx-tag{text-transform:uppercase; letter-spacing:.06em; color:var(--sub);
  border:1px solid var(--line); border-radius:4px; padding:2px 6px;}
.stx-avail{display:inline-flex; align-items:center; gap:5px; text-transform:uppercase; letter-spacing:.05em;}
.stx-avail .stx-dot{width:7px; height:7px; border-radius:50%; display:inline-block;}
.stx-avail.yes{color:var(--good);}
.stx-avail.yes .stx-dot{background:var(--good);}
.stx-avail.no{color:var(--sub);}
.stx-avail.no .stx-dot{background:transparent; border:1.5px solid var(--sub);}
.stx-copy{border:1px solid var(--line); background:var(--panel); color:var(--sub);
  border-radius:6px; padding:5px 10px; font-size:11px; cursor:pointer; transition:.12s; text-transform:uppercase; letter-spacing:.05em;}
.stx-copy:hover{color:var(--accent); border-color:var(--accent);}
.stx-spec-text{margin:0; line-height:1.12; overflow-wrap:anywhere; word-break:normal;
  color:var(--ink);}

.stx-empty{padding:60px 0; text-align:center; color:var(--sub); font-size:14px;}

button:focus-visible, textarea:focus-visible, input:focus-visible, [role=tab]:focus-visible{
  outline:2px solid var(--accent); outline-offset:2px;}

@media (max-width:760px){
  .stx-controls{grid-template-columns:1fr;}
  .stx-meter{border-left:none; border-top:2px solid var(--accent); padding:8px 0 0; align-items:flex-start;}
  .stx-head{margin-bottom:16px;}
  .stx-spec-name{margin-right:0; width:100%;}
}
@media (prefers-reduced-motion:reduce){.stx-root *{transition:none !important;}}
`;