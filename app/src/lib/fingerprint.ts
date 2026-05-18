import { browserFingerprintStorage } from "@/lib/storage/browser-storage"

// In-flight promise — prevents multiple concurrent FingerprintJS loads
let _inflight: Promise<string> | null = null

export const getFingerprint = async (): Promise<string> => {
  const cached = browserFingerprintStorage.get()
  if (cached) return cached

  // Reuse in-flight promise if already computing
  if (_inflight) return _inflight

  _inflight = (async () => {
    try {
      const FingerprintJS = await import("@fingerprintjs/fingerprintjs")
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      browserFingerprintStorage.set(result.visitorId)
      return result.visitorId
    } catch (error) {
      console.error("Failed to get fingerprint:", error)
      browserFingerprintStorage.set("ERROR")
      return "ERROR"
    } finally {
      _inflight = null
    }
  })()

  return _inflight
}

/**
 * Call this as early as possible (e.g. on page mount) to warm up FingerprintJS
 * so the visitorId is already cached when the first API call fires.
 */
export const preloadFingerprint = (): void => {
  if (typeof window === "undefined") return
  if (browserFingerprintStorage.get()) return
  void getFingerprint()
}
