const hasControlChar = (str: string) => {
  for (let i = 0; i < str.length; i += 1) {
    const code = str.charCodeAt(i)
    if (code < 32 || code === 127) return true
  }
  return false
}

export const safeHeaderValue = (value: unknown) => {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (trimmed === "" || trimmed === "undefined" || trimmed === "null") {
    return undefined
  }
  if (hasControlChar(trimmed)) return undefined
  return trimmed
}

export const safeBearerHeader = (jwt: unknown) => {
  const safe = safeHeaderValue(jwt)
  return safe ? `Bearer ${safe}` : undefined
}
