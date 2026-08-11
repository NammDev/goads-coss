// Shared GOADS bookmarklet iconography — the GOADS mark plus the Lucide-style
// line icons every tool in bookmarklets/ draws from. Extracted verbatim from the
// first two tools so all five stay visually identical.
//
// Icons inherit currentColor; the logo is inline SVG (not <img>) because
// facebook.com's CSP img-src cannot block markup.

export const LOGO_SVG =
  '<svg viewBox="26 28 182 182" role="img" aria-label="GOADS">' +
  '<circle cx="132.08" cy="117.68" r="51.45" fill="#000"/>' +
  '<path fill="#fff" d="M160.57,116.22c0-.22.17-.39.39-.39l20.09-.09,20.36.09c.22,0,.39.18.39.39v67.73c0,.13-.06.26-.17.33-19.07,13.59-45.14,20.85-69.1,20.85-52.54,0-90.95-35.58-90.95-85.77s38.41-85.77,91.89-85.77c30.71,0,52.07,13.97,68.33,33.34,0,0-10.89,10.09-11.05,10.23l-14.58,13.19c-.16.14-.41.13-.55-.03-11.25-12.29-24.13-18.09-39.79-18.09-29.29,0-48.47,19.98-47.05,50.25,1.16,24.75,21.81,44.01,46.59,44,8.63,0,16.8-1.62,24.96-5.31.14-.06.23-.21.23-.36v-44.59Z"/>' +
  '<path fill="#000" d="M94.19,139.84c.01.19-.12.37-.3.41-10.77,2.57-17.76-8.85-16.71-17.08.89-6.97,5.9-13.53,14.37-15.24.23-.05.45.13.47.36l2.17,31.54Z"/>' +
  '<path fill="#000" d="M113.91,77.99c-.2.03-.39-.09-.44-.28-2.26-8.41,7.59-14.88,14.74-14.69,6.07.16,11.81,3.64,13.41,10.27.05.22-.1.44-.33.48l-27.38,4.22Z"/>' +
  '<ellipse fill="#fff" cx="134.78" cy="115.01" rx="7.07" ry="3.47" transform="translate(-38.17 153.51) rotate(-53.03)"/>' +
  '<ellipse fill="#fff" cx="113.13" cy="121.16" rx="13.67" ry="10.11" transform="translate(-51.81 137.67) rotate(-52.68)"/>' +
  '<ellipse fill="#fff" cx="134.03" cy="93.75" rx="13.67" ry="10.11" transform="translate(-21.79 143.5) rotate(-52.68)"/>' +
  '<path fill="#fff" d="M111.12,109.97l4.11-2.31c2.73-1.53,4.77-4.04,5.71-7.03l1.55-4.9c.08-.25.38-.35.59-.21l13.01,8.86c.21.14.23.44.05.61l-2.39,2.21c-3.12,2.88-5.66,6.33-7.47,10.18l-2.97,6.3c-.12.26-.46.3-.65.09l-11.64-13.21c-.17-.19-.12-.48.1-.6Z"/>' +
  '<path fill="#000" d="M132.18,88.76l1.51,2.48c.29.48.95.55,1.33.15l.46-.48c.44-.46,1.22-.29,1.41.32l.99,3.01c.29.89-.87,1.52-1.46.79h0c-.32-.4-.92-.42-1.27-.05l-.75.79c-.35.37-.94.34-1.26-.05l-3.72-4.53c-.27-.33-.25-.81.04-1.12l1.39-1.46c.38-.4,1.04-.33,1.33.15Z"/>' +
  '<path fill="#000" d="M159.82,137.07c4.71-.18,10.65,3.47,11.41,8.54.57,3.78-.74,7.65-3.38,10.4-2.11,2.2-6.32,4.76-9.33,5.95-.25.1-.53-.07-.54-.34-.14-3.25-.88-20.25-1.05-24.05-.01-.26.22-.45.47-.4.65.14,1.74.04,2.01.04.08,0,.32-.15.4-.15Z"/>' +
  "</svg>";

export const ICON_CLOSE =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'
export const ICON_USERS =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
export const ICON_SEARCH =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
export const ICON_TRASH =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6M14 11v6"/></svg>'
export const ICON_REFRESH =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>'
export const ICON_TELEGRAM =
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>'
export const ICON_ALERT =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>'

// ── Added for the 2FA / Approve / Check Live tools ───────────────────────────
export const ICON_CHECK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
export const ICON_CHECK_CIRCLE =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'
export const ICON_X_CIRCLE =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>'
export const ICON_COPY =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
export const ICON_DOWNLOAD =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>'
export const ICON_KEY =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/></svg>'
export const ICON_SHIELD =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
export const ICON_EXTERNAL =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'
export const ICON_CLOCK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'

// ── Added for the Accept BM Links tool ───────────────────────────────────────
// Ticket with a check — an invitation link, accepted.
export const ICON_TICKET =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="m9 12 2 2 4-4"/></svg>'
