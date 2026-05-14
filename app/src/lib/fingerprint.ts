import { browserFingerprintStorage } from "@/lib/storage/browser-storage"

export const getFingerprint = async (): Promise<string> => {
  const cached = browserFingerprintStorage.get()
  if (cached) return cached

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
  }
}
