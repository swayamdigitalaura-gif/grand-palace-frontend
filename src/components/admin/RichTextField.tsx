import { useRef } from "react";

type FieldEl = HTMLTextAreaElement | HTMLInputElement;

/** Wraps the current selection in `before`/`after` (or inserts at the cursor
 *  if nothing is selected), then restores focus + selection so the user can
 *  keep typing without losing their place. */
function wrapSelection(el: FieldEl, value: string, onChange: (v: string) => void, before: string, after: string, fallback = "text") {
  const start = el.selectionStart ?? value.length;
  const end = el.selectionEnd ?? value.length;
  const selected = value.slice(start, end) || fallback;
  const insert = `${before}${selected}${after}`;
  onChange(value.slice(0, start) + insert + value.slice(end));
  requestAnimationFrame(() => {
    el.focus();
    const from = start + before.length;
    el.setSelectionRange(from, from + selected.length);
  });
}

function insertLink(el: FieldEl, value: string, onChange: (v: string) => void) {
  const start = el.selectionStart ?? value.length;
  const end = el.selectionEnd ?? value.length;
  const selected = value.slice(start, end) || "link text";
  const url = window.prompt("Link to (e.g. /menu/a-la-carte or https://...)", "/");
  if (!url) return;
  const insert = `[${selected}](${url})`;
  onChange(value.slice(0, start) + insert + value.slice(end));
  requestAnimationFrame(() => {
    el.focus();
    const cursor = start + insert.length;
    el.setSelectionRange(cursor, cursor);
  });
}

// The native colour picker steals focus/selection the moment it opens, so the
// field's current selection is captured up front and reused once the user
// actually picks a colour (the picker's change event fires later, async).
function insertColor(el: FieldEl, value: string, onChange: (v: string) => void, colorInput: HTMLInputElement) {
  const start = el.selectionStart ?? value.length;
  const end = el.selectionEnd ?? value.length;
  const selected = value.slice(start, end) || "text";
  colorInput.onchange = () => {
    const insert = `{{color:${colorInput.value}}}${selected}{{/color}}`;
    onChange(value.slice(0, start) + insert + value.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + insert.length;
      el.setSelectionRange(cursor, cursor);
    });
  };
  colorInput.click();
}

const FONT_SIZES = [12, 13, 14, 16, 18, 20, 24, 28, 32, 40, 48];

function applySize(el: FieldEl, value: string, onChange: (v: string) => void, px: string) {
  wrapSelection(el, value, onChange, `{{size:${px}px}}`, "{{/size}}");
}

const toolbarBtnCls = "h-6 min-w-[24px] px-1.5 rounded border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 text-[11px] font-semibold text-stone-600 hover:text-amber-700 transition";

/** A toolbar of "Highlight" / "Link" / "Colour" / "Size" buttons that operate
 *  on the selected text of whatever field ref is passed in — select some
 *  words, click a button, done. No need to hand-type markdown-style syntax. */
function RichToolbar({ fieldRef, value, onChange }: { fieldRef: React.RefObject<FieldEl | null>; value: string; onChange: (v: string) => void }) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-1 mb-1 min-w-0 flex-wrap">
      <button type="button" title="Highlight selected text" className={`${toolbarBtnCls} shrink-0`}
        onClick={() => fieldRef.current && wrapSelection(fieldRef.current, value, onChange, "**", "**")}>
        <b>B</b>
      </button>
      <button type="button" title="Turn selected text into a link" className={`${toolbarBtnCls} shrink-0 whitespace-nowrap`}
        onClick={() => fieldRef.current && insertLink(fieldRef.current, value, onChange)}>
        🔗 Link
      </button>
      <button type="button" title="Colour selected text" className={`${toolbarBtnCls} shrink-0 whitespace-nowrap`}
        onClick={() => fieldRef.current && colorInputRef.current && insertColor(fieldRef.current, value, onChange, colorInputRef.current)}>
        🎨 Colour
      </button>
      <input ref={colorInputRef} type="color" defaultValue="#c8860a" className="sr-only" tabIndex={-1} aria-hidden />
      <select
        title="Set selected text's font size"
        defaultValue=""
        className={`${toolbarBtnCls} shrink-0 pr-0.5`}
        onChange={(e) => {
          if (!e.target.value) return;
          if (fieldRef.current) applySize(fieldRef.current, value, onChange, e.target.value);
          e.target.value = "";
        }}
      >
        <option value="" disabled>Size…</option>
        {FONT_SIZES.map((px) => <option key={px} value={px}>{px}px</option>)}
      </select>
      <span className="text-[10px] text-stone-400 truncate hidden lg:inline" title="Select text, then click a button">Select text, then click a button</span>
    </div>
  );
}

export function RichTextArea({
  value, onChange, rows = 3, placeholder, className,
}: {
  value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="min-w-0">
      <RichToolbar fieldRef={ref} value={value} onChange={onChange} />
      <textarea ref={ref} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={className} />
    </div>
  );
}

export function RichTextInput({
  value, onChange, placeholder, className,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="min-w-0">
      <RichToolbar fieldRef={ref} value={value} onChange={onChange} />
      <input ref={ref} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={className} />
    </div>
  );
}
