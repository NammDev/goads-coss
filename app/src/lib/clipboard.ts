// Robust clipboard copy. The async Clipboard API (navigator.clipboard) rejects
// when the document is not focused (e.g. DevTools focused), in some Chromium
// contexts, or outside a secure context — a very common "copy button doesn't
// work" cause. Fall back to the legacy textarea + execCommand path and report
// whether the copy actually succeeded so the UI only confirms on success.
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const ta = document.createElement("textarea")
    ta.value = text
    ta.setAttribute("readonly", "")
    ta.style.position = "fixed"
    ta.style.top = "-9999px"
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
