// Shared Facebook session readers for the GOADS bookmarklets.
//
// Every value below is read out of the page the user is already logged into —
// the tools run on the user's own session and never transmit anything anywhere.
// Each reader tries FB's internal require() module first (exact, stable while
// the user is on a real FB surface) and falls back to scraping the server-
// rendered HTML / cookies, because require() is missing on some FB surfaces.

/** Graph API access token — used by the Graph + graphql GET calls. */
export function readAccessToken() {
  try {
    var t = window.require("WebApiApplication").getAccessToken()
    if (t) return t
  } catch (e) {}
  try {
    var html = document.documentElement.innerHTML
    var m = html.match(/"accessToken":"([^"]+)"/)
    if (m) return m[1]
    m = html.match(/EAAG[a-zA-Z0-9]+/)
    if (m) return m[0]
  } catch (e) {}
  return null
}

/** Logged-in user id (c_user). */
export function readUserId() {
  try {
    var id = window.require("CurrentUserInitialData").USER_ID
    if (id) return String(id)
  } catch (e) {}
  try {
    var m = document.cookie.match(/c_user=(\d+)/)
    if (m) return m[1]
  } catch (e) {}
  return null
}

/** Business Manager id of the BM page currently open. */
export function readBusinessId() {
  try {
    var id = window.require("BusinessUnifiedNavigationContext").businessID
    if (id) return String(id)
  } catch (e) {}
  try {
    var u = new URL(location.href).searchParams.get("business_id")
    if (u) return u
  } catch (e) {}
  try {
    var html = document.documentElement.innerHTML
    var m = html.match(/"businessId":"([^"]+)"/) || html.match(/"businessID":(\d+)/)
    if (m) return m[1]
  } catch (e) {}
  return null
}

/** CSRF token required by Account Center / www mutations. */
export function readDtsg() {
  try {
    var t = window.require("DTSGInitialData").token
    if (t) return t
  } catch (e) {}
  try {
    var html = document.documentElement.innerHTML
    var m =
      html.match(/"DTSGInitialData"[^}]*"token":"([^"]+)"/) ||
      html.match(/name="fb_dtsg" value="([^"]+)"/) ||
      html.match(/"fb_dtsg":"([^"]+)"/)
    if (m) return m[1]
  } catch (e) {}
  return null
}

/** LSD token — paired with fb_dtsg on Account Center requests. */
export function readLsd() {
  try {
    var html = document.documentElement.innerHTML
    var m =
      html.match(/"LSD"[^}]*"token":"([^"]+)"/) ||
      html.match(/name="lsd" value="([^"]+)"/) ||
      html.match(/"lsd":"([^"]+)"/)
    if (m) return m[1]
  } catch (e) {}
  return null
}
