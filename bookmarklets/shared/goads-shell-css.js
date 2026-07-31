// Shared GOADS bookmarklet stylesheet — one dark modal shell + white card stage,
// used by every tool in bookmarklets/. Lifted from goads-bm-remove-admins.js so
// the whole library looks like one product; class prefix is `gbk-` (goads
// bookmarklet kit) and the root/backdrop ids are passed in by goads-shell.js.
//
// Everything is scoped under the root id so facebook.com's own styles can never
// leak in and ours can never leak out.

export function shellCss(rootId, backdropId) {
  var R = "#" + rootId
  return (
    "#" + backdropId + "{position:fixed;inset:0;background:rgba(2,3,8,.55);z-index:2147483646;animation:gbkFade .15s ease}" +
    R + "{--bg:#020308;--fg:#fff;--chrome-sub:#ffffffb3;--chrome-muted:#ffffff70;--chrome-border:#ffffff29;--chrome-surface:#ffffff14;" +
    "--card:#fff;--card-border:#e6e7ec;--ink-strong:#171920;--ink:#343642;--ink-soft:#4c505f;" +
    "--btn:#020308;--btn-hover:#24262e;--ok:#16a34a;--ok-bg:#f0fdf4;--ok-border:#bbf7d0;" +
    "--warn:#b45309;--warn-bg:#fffbeb;--warn-border:#fde68a;--danger:#dc2626;--danger-hover:#b91c1c;--err-bg:#fef2f2;--err-border:#fecaca;--err-fg:#b91c1c;" +
    "--info:#1d4ed8;--info-bg:#eff6ff;--info-border:#bfdbfe;--mute:#52525b;--mute-bg:#f4f4f5;--mute-border:#e4e4e7;" +
    "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2147483647;" +
    "width:var(--w,1000px);max-width:calc(100vw - 32px);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;" +
    "font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.5;color:var(--fg);background:var(--bg);" +
    "border:1px solid var(--chrome-border);border-radius:16px;box-shadow:0 24px 60px -16px rgba(0,0,0,.65);animation:gbkFade .2s ease;-webkit-font-smoothing:antialiased;box-sizing:border-box}" +
    "@keyframes gbkFade{from{opacity:0}to{opacity:1}}@keyframes gbkSpin{to{transform:rotate(360deg)}}" +
    R + " *{box-sizing:border-box}" +
    // Facebook styles bare tags (h2, p, span, label…) on its own pages. A direct
    // rule always beats an inherited value, so any element of ours that only
    // inherited its colour came out in FB's colour instead — the header title
    // rendered near-black on our dark chrome. Force these back to inheriting;
    // our own class rules are more specific, so they still win where they apply.
    R + " h1," + R + " h2," + R + " h3," + R + " p," + R + " span," + R + " div," +
    R + " label," + R + " li," + R + " a{color:inherit}" +
    // header
    R + " .gbk-header{display:flex;align-items:center;gap:13px;padding:16px 20px;border-bottom:1px solid var(--chrome-border);position:relative;flex-shrink:0}" +
    R + " .gbk-mark{width:46px;height:46px;flex-shrink:0;border-radius:12px;overflow:hidden;background:#000;border:1px solid var(--chrome-border);display:inline-flex;align-items:center;justify-content:center}" +
    R + " .gbk-mark svg{width:100%;height:100%;display:block}" +
    R + " .gbk-htxt{min-width:0}" +
    R + " .gbk-title{margin:0;font-size:19px;font-weight:550;line-height:24px;letter-spacing:-.0144em;color:var(--fg)}" +
    R + " .gbk-sub{margin:3px 0 0;font-size:13px;color:var(--chrome-sub);letter-spacing:-.006em}" +
    R + " .gbk-mono{font-family:'SF Mono','Fira Code',Consolas,monospace}" +
    R + " .gbk-close{position:absolute;right:14px;top:14px;width:28px;height:28px;border:0;border-radius:50%;background:var(--chrome-surface);color:var(--fg);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}" +
    R + " .gbk-close:hover{background:rgba(255,255,255,.2)}" + R + " .gbk-close svg{width:15px;height:15px}" +
    // white card stage
    R + " .gbk-stage{margin:14px;background:var(--card);border:1px solid var(--card-border);border-radius:14px;overflow:hidden;color:var(--ink);display:flex;flex-direction:column;min-height:0;flex:1}" +
    // toolbar
    R + " .gbk-toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:14px 16px;border-bottom:1px solid var(--card-border)}" +
    R + " .gbk-field{display:flex;align-items:center;gap:8px;flex:1;min-width:200px;padding:9px 12px;background:#fff;border:1px solid var(--card-border);border-radius:10px}" +
    R + " .gbk-field:focus-within{border-color:#18181b}" + R + " .gbk-field svg{width:16px;height:16px;color:var(--ink-soft);flex-shrink:0}" +
    R + " .gbk-field input{flex:1;min-width:0;border:0;outline:0;font:inherit;font-size:14px;color:var(--ink-strong);background:transparent}" +
    R + " .gbk-select{padding:9px 12px;font:inherit;font-size:14px;color:var(--ink-strong);background:#fff;border:1px solid var(--card-border);border-radius:10px;cursor:pointer;outline:none}" +
    R + " .gbk-select:focus{border-color:#18181b}" +
    R + " .gbk-icon-btn{width:40px;height:40px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid var(--card-border);border-radius:10px;color:var(--ink-strong);cursor:pointer;transition:border-color .15s}" +
    R + " .gbk-icon-btn:hover{border-color:#18181b}" + R + " .gbk-icon-btn svg{width:17px;height:17px}" +
    R + " .gbk-icon-btn:disabled{opacity:.45;cursor:not-allowed}" +
    // summary tiles (check-live style counters)
    R + " .gbk-tiles{display:flex;gap:10px;flex-wrap:wrap;padding:14px 16px;border-bottom:1px solid var(--card-border)}" +
    R + " .gbk-tile{flex:1;min-width:120px;padding:10px 13px;border:1px solid var(--card-border);border-radius:11px;background:#fff}" +
    R + " .gbk-tile-k{font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-soft)}" +
    R + " .gbk-tile-v{margin-top:3px;font-size:21px;font-weight:600;line-height:1.15;color:var(--ink-strong);font-variant-numeric:tabular-nums}" +
    R + " .gbk-tile.ok .gbk-tile-v{color:var(--ok)}" + R + " .gbk-tile.warn .gbk-tile-v{color:var(--warn)}" + R + " .gbk-tile.danger .gbk-tile-v{color:var(--danger)}" +
    // table
    R + " .gbk-tablewrap{overflow:auto;flex:1;min-height:120px}" +
    R + " table{width:100%;border-collapse:collapse;font-size:13.5px}" +
    R + " thead th{position:sticky;top:0;background:#fafafa;color:var(--ink-soft);text-align:left;font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.04em;padding:11px 12px;border-bottom:1px solid var(--card-border);white-space:nowrap;z-index:1}" +
    R + " tbody td{padding:11px 12px;border-bottom:1px solid var(--card-border);color:var(--ink-strong);vertical-align:middle}" +
    R + " tbody tr:hover{background:#fafafa}" +
    R + " tbody tr.gone{opacity:.45}" +
    R + " .gbk-name{font-weight:550;color:var(--ink-strong)}" + R + " .gbk-you{color:var(--ok);font-weight:700}" +
    R + " .gbk-soft{color:var(--ink-soft)}" + R + " .gbk-id{font-family:'SF Mono',Consolas,monospace;color:var(--ink-soft);font-size:12.5px}" +
    R + " .gbk-badge{display:inline-block;padding:2px 8px;border-radius:6px;font-size:12px;font-weight:600;border:1px solid transparent;white-space:nowrap}" +
    R + " .gbk-badge.ok{background:var(--ok-bg);border-color:var(--ok-border);color:var(--ok)}" +
    R + " .gbk-badge.warn{background:var(--warn-bg);border-color:var(--warn-border);color:var(--warn)}" +
    R + " .gbk-badge.danger{background:var(--err-bg);border-color:var(--err-border);color:var(--err-fg)}" +
    R + " .gbk-badge.info{background:var(--info-bg);border-color:var(--info-border);color:var(--info)}" +
    R + " .gbk-badge.mute{background:var(--mute-bg);border-color:var(--mute-border);color:var(--mute)}" +
    R + " .gbk-act{font-weight:600}" + R + " .gbk-act.ok{color:var(--ok)}" + R + " .gbk-act.err{color:var(--danger)}" + R + " .gbk-act.pend{color:var(--warn)}" +
    R + " .gbk-cb{width:17px;height:17px;cursor:pointer;accent-color:#18181b}" + R + " .gbk-cb:disabled{opacity:.4;cursor:not-allowed}" +
    R + " .gbk-rowbtns{display:flex;gap:6px;flex-wrap:nowrap}" +
    // state screens
    R + " .gbk-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:48px 24px;color:var(--ink-soft);text-align:center}" +
    R + " .gbk-spin{width:34px;height:34px;border:3px solid #e5e5e5;border-top-color:#18181b;border-radius:50%;animation:gbkSpin .8s linear infinite}" +
    R + " .gbk-err{max-width:460px;background:var(--err-bg);border:1px solid var(--err-border);color:var(--err-fg);padding:14px 16px;border-radius:10px;font-size:13.5px}" +
    R + " .gbk-note{max-width:520px;background:var(--info-bg);border:1px solid var(--info-border);color:var(--info);padding:12px 14px;border-radius:10px;font-size:13px;text-align:left}" +
    // progress bar (bulk actions)
    R + " .gbk-bar{height:4px;background:var(--mute-bg);border-radius:99px;overflow:hidden;flex:1;min-width:120px}" +
    R + " .gbk-bar>i{display:block;height:100%;width:0;background:#18181b;transition:width .2s}" +
    // footer
    R + " .gbk-footer{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 16px;border-top:1px solid var(--card-border);flex-shrink:0}" +
    R + " .gbk-count{font-size:13px;color:var(--ink-soft)}" + R + " .gbk-count b{color:var(--ink-strong)}" +
    R + " .gbk-grow{flex:1}" +
    R + " .gbk-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;font:inherit;font-size:14px;font-weight:600;border-radius:10px;cursor:pointer;border:1px solid transparent;transition:background .15s,border-color .15s}" +
    R + " .gbk-btn svg{width:16px;height:16px}" + R + " .gbk-btn:disabled{opacity:.45;cursor:not-allowed}" +
    R + " .gbk-btn-sm{padding:6px 11px;font-size:13px;border-radius:8px}" + R + " .gbk-btn-sm svg{width:14px;height:14px}" +
    R + " .gbk-btn-ghost{background:#fff;color:var(--ink-strong);border-color:var(--card-border)}" + R + " .gbk-btn-ghost:hover:not(:disabled){border-color:#18181b}" +
    R + " .gbk-btn-primary{background:var(--btn);color:#fff}" + R + " .gbk-btn-primary:hover:not(:disabled){background:var(--btn-hover)}" +
    R + " .gbk-btn-ok{background:var(--ok);color:#fff}" + R + " .gbk-btn-ok:hover:not(:disabled){background:#15803d}" +
    R + " .gbk-btn-danger{background:var(--danger);color:#fff}" + R + " .gbk-btn-danger:hover:not(:disabled){background:var(--danger-hover)}" +
    // brand strip
    R + " .gbk-brand{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:11px 20px;border-top:1px solid var(--chrome-border);font-size:13px;color:var(--chrome-muted);flex-shrink:0}" +
    R + " .gbk-brand a{color:var(--chrome-sub);text-decoration:none;display:inline-flex;align-items:center;gap:6px}" +
    R + " .gbk-brand a:hover{color:#fff;text-decoration:underline}" + R + " .gbk-brand svg{width:15px;height:15px}" +
    // toast (lives outside the root, so it is not scoped)
    ".gbk-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:2147483647;padding:11px 20px;border-radius:10px;font:500 14px Inter,system-ui,sans-serif;color:#fff;background:#18181b;box-shadow:0 8px 24px rgba(0,0,0,.3);opacity:0;transition:opacity .25s}" +
    ".gbk-toast.show{opacity:1}.gbk-toast.ok{background:#16a34a}.gbk-toast.err{background:#dc2626}"
  )
}
