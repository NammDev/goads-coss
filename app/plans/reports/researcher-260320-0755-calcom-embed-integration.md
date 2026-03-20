# Cal.com Embed Integration Research Report

## 1. NPM Packages Available

**Primary Package**: `@calcom/embed-react` (current v1.5.3)
- 61k+ weekly downloads, maintained by 8 open source contributors
- Latest version published ~1 year ago
- Includes `use client` directive for Next.js App Router compatibility

**Alternatives**:
- `@calcom/embed-core` — lower-level, JavaScript-based embed library (supports vanilla JS)
- Direct iframe/script tag embedding from public Cal.com links (no package needed)

**Known Issue**: React 18.2 peer dependency; compatibility issues reported with React 19 / Next.js 15 beta.

---

## 2. Embed Types

Cal.com provides **4 primary embed approaches**:

| Type | Use Case | Implementation |
|------|----------|-----------------|
| **Inline** | Calendar displayed directly in page layout | React component or script tag |
| **Floating Pop-up Button** | Persistent button opens booking modal on click | Script tag or component with floating UI |
| **Pop-up via Element Click** | Custom trigger (button/image) opens modal | `data-cal-link` attribute on HTML element |
| **Email Embed** | Pre-filled booking link in emails | URL query params + `mailto:` links |

All embeds are fully responsive out-of-the-box.

---

## 3. Next.js App Router Configuration

**Minimal Setup** (simple inline embed):
```tsx
'use client';
import Cal from "@calcom/embed-react";

export default function CalendarWidget() {
  return <Cal calLink="username/event-type" />;
}
```

**Advanced Setup** (with config via `getCalApi`):
```tsx
'use client';
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function AdvancedCalendar() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        brandColor: "#000000"
      });
    })();
  }, []);

  return <button data-cal-link="username/event-type">Book Now</button>;
}
```

**Key Points**:
- Mark component with `'use client'` at file top
- Child components inherit client-side context automatically
- `getCalApi` returns async Promise; use in `useEffect` for configuration
- `calLink` prop format: `"username/event-slug"`

---

## 4. Configuration Options Available

**Core Props** (Cal component):
- `calLink` — required, format: `"username/event-slug"`

**Config Object Options** (via `getCalApi` or data attributes):
- `theme` — `"light"` | `"dark"`
- `brandColor` — hex color code (e.g., `"#000000"`)
- `hideEventTypeDetails` — boolean, toggle event description visibility
- `layout` — `"month_view"` | other layout options (specific values in official docs)
- `styles.branding.brandColor` — nested branding customization
- `prefill` — object with `name`, `email`, custom field values (URL query params: `?name=John&email=john@example.com`)

**Event Handling** (via `getCalApi`):
```tsx
const cal = await getCalApi();
cal("on", { action: "*", callback: (e) => console.log(e.detail) });
```

**Limitations**: `hideDetails` config is NOT a standard option (use `hideEventTypeDetails` instead).

---

## 5. Authentication & API Keys

**Embed Requirement**: **NO API keys needed** — embeds use public Cal.com scheduling links.

**How It Works**:
1. Generate public `calLink` from Cal.com dashboard (username + event slug)
2. Link is publicly shareable; no authentication required
3. All embed types use this public link structure

**API Keys Are Only Needed For**:
- Server-side API calls (scheduling, data retrieval)
- Admin operations via Cal.com API v2
- Not required for client-side embeds

**Credentials** (if using API):
- Found in Settings > Security
- Test: prefix `cal_`, Live: prefix `cal_live_`
- Rate limit: 120 req/min (default), upgradeable

---

## 6. CSP (Content Security Policy) Headers

**Cal.com CSP Status**:
- Strict CSP enforced only on login page
- Report-only mode on SSR pages (monitors violations)
- SSG pages: CSP not yet fully implemented

**For Embedded Cal.com** (your website → cal.com iframe):
- Likely needs `frame-src` or `child-src` directive
- Add Cal.com domain: `frame-src 'self' https://app.cal.com;`
- If using custom Cal instance: adjust domain accordingly

**Recommended Headers** (Next.js `next.config.js` or middleware):
```js
headers: {
  "Content-Security-Policy":
    "frame-src 'self' https://app.cal.com; " +
    "script-src 'self' https://app.cal.com;"
}
```

**Note**: Exact CSP needs depend on embed type; test in browser DevTools console for CSP violations.

---

## 7. Responsive & Best Practices

**Built-in Responsiveness**:
- All embed types are responsive by default
- No additional CSS breakpoints or media queries needed
- Works on mobile, tablet, desktop automatically

**Implementation Best Practices**:

1. **Container Strategy**
   - For inline embeds, ensure parent has reasonable max-width (e.g., 600px)
   - Use CSS Grid/Flexbox to control embed dimensions

2. **Floating Button**
   - Automatically positions; adjust z-index if conflicts with other UI: `z-10` or higher

3. **Event Listening** (track bookings)
   ```tsx
   useEffect(() => {
     (async () => {
       const cal = await getCalApi();
       cal("on", {
         action: "eventTypeSelected",
         callback: (e) => console.log("Selected:", e.detail)
       });
     })();
   }, []);
   ```

4. **Theme Sync**
   - Use `theme: "dark"` in dark mode, `theme: "light"` for light
   - Or auto-detect: `theme: document.documentElement.classList.contains("dark") ? "dark" : "light"`

5. **Prefill Integration**
   - Prefill from user context: `?name=${user.name}&email=${user.email}`
   - Or via config object in `getCalApi` call

6. **Performance**
   - Cal.com embed loads externally; consider lazy loading for below-fold embeds
   - Use React.lazy() for code splitting if multiple embed instances

---

## Summary Table

| Aspect | Finding |
|--------|---------|
| **Package** | @calcom/embed-react v1.5.3 (61k weekly DL) |
| **Alternatives** | @calcom/embed-core, vanilla script tag |
| **Embed Types** | Inline, floating button, click-triggered popup, email |
| **Auth** | None (public links only) |
| **Config Options** | theme, brandColor, hideEventTypeDetails, layout, prefill, event handlers |
| **Next.js Setup** | `'use client'` + `getCalApi()` in useEffect |
| **CSP** | Add `frame-src https://app.cal.com` |
| **Responsive** | Yes, automatic, no setup needed |
| **Issues** | React 19 compatibility pending |

---

## Unresolved Questions

1. Exact supported values for `layout` prop beyond `"month_view"` (check official docs)
2. Full list of event actions supported in `cal("on", ...)` callback
3. Whether CSP report-only is sufficient or strict CSP needed for embeds
4. ETA for React 19 / Next.js 15 full support
5. Custom styling options beyond `brandColor` (Tailwind integration status)
