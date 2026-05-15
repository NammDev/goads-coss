export const VIEWER_TOKEN_KEY = "viewerToken"
export const CURRENT_EMAIL_KEY = "currentEmail"
export const BROWSER_FINGERPRINT_KEY = "browserFingerprint"

const hasStorage = () => typeof window !== "undefined" && Boolean(window.localStorage)

export function getStoredValue(key: string) {
  if (!hasStorage()) return ""
  return window.localStorage.getItem(key) || ""
}

export function setStoredValue(key: string, value: string) {
  if (!hasStorage()) return
  if (value) {
    window.localStorage.setItem(key, value)
    return
  }
  window.localStorage.removeItem(key)
}

export const viewerTokenStorage = {
  get: () => getStoredValue(VIEWER_TOKEN_KEY),
  set: (value: string) => setStoredValue(VIEWER_TOKEN_KEY, value),
}

export const currentEmailStorage = {
  get: () => getStoredValue(CURRENT_EMAIL_KEY),
  set: (value: string) => setStoredValue(CURRENT_EMAIL_KEY, value),
}

export const browserFingerprintStorage = {
  get: () => getStoredValue(BROWSER_FINGERPRINT_KEY),
  set: (value: string) => setStoredValue(BROWSER_FINGERPRINT_KEY, value),
}
